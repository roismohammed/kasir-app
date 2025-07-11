import { router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import SelectInput from "~/components/form/select-input";
import TextareaInput from "~/components/form/textarea-input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ProductProps, SupplierProps } from "~/types";
import { DialogTitle } from "@radix-ui/react-dialog";

interface StockInProps {
    url: string;
    method: "POST" | "PUT";
    stockIn?: {
        date?: string;
        product_id?: number;
        supplier_id?: number;
        description?: string;
        quantity?: number;
    };
    supplier: SupplierProps[];
    products: ProductProps[];
}

export default function FormStockIn({ url, method, stockIn, supplier, products }: StockInProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        date: stockIn?.date || "",
        product_id: stockIn?.product_id || "",
        supplier_id: stockIn?.supplier_id || "",
        description: stockIn?.description || "",
        quantity: stockIn?.quantity ? String(stockIn.quantity) : "",
    });


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

    useEffect(() => {
        if (data.product_id) {
            const p = products.find((p) => p.id === Number(data.product_id));
            setSelectedProduct(p || null);
        }
    }, [data.product_id]);

    const handleProductSelect = (product: ProductProps) => {
        setData("product_id", String(product.id));
        setModalOpen(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitQuery = new Promise((resolve, reject) => {
            const options = {
                onSuccess: (props: any) => resolve(props),
                onError: (errors: any) => reject(errors),
            };

            if (method === "PUT") {
                router.put(url, data, options);
            } else {
                post(url, options);
            }
        });

        toast.promise(submitQuery, {
            loading: "Sedang Mengirim",
            success: "Data berhasil disimpan",
            error: "Kesalahan saat menyimpan data",
        });
    };

    return (
        <form onSubmit={submit} className="space-y-2">
            <TextInput
                type="date"
                label="Tanggal"
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
                error={errors.date}
            />

            <div className="relative">
                <TextInput
                    label="Pilih Produk (Barcode)"
                    readOnly
                    value={selectedProduct ? `${selectedProduct.barcode} - ${selectedProduct.name}` : ""}
                    onClick={() => setModalOpen(true)}
                    placeholder="Klik untuk memilih produk"
                    error={errors.product_id}
                />
            </div>

            <div>
                <TextInput
                    label="Nama Produk"
                    value={selectedProduct ? selectedProduct.name : ""}
                    readOnly />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <TextInput label="Satuan" value={selectedProduct ? selectedProduct.unit.name || "-" : "-"} readOnly />
                <TextInput label="Stok Saat Ini" value={selectedProduct ? String(selectedProduct.stock ?? 0) : "0"} readOnly />
            </div>

            <TextareaInput
                label="Deskripsi"
                value={data.description}
                onChange={(e) => setData("description", e.currentTarget.value)}
                placeholder="Masukan deskripsi"
                error={errors.description}
            />

            <div className="grid grid-cols-2 gap-2">
                <SelectInput
                    label="Pilih Supplier"
                    options={supplier.map((s:SupplierProps) => ({
                        value: String(s.id),
                        label: s.name,
                    }))}
                    value={data.supplier_id}
                    onSelect={(value) => setData("supplier_id", value)}
                    placeholder="Pilih supplier"
                    errors={errors.supplier_id}
                />

                <TextInput
                    type="number"
                    label="Quantity"
                    value={data.quantity}
                    onChange={(e) => setData("quantity", e.currentTarget.value)}
                    placeholder="Masukan Quantity"
                    error={errors.quantity}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" disabled={processing}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    Simpan
                </Button>
            </div>

            {/* MODAL */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogTitle>Pilih Produk</DialogTitle>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductSelect(product)}
                                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 border"
                            >
                                <p className="font-medium">{product.barcode} - {product.name}</p>
                                <p className="text-sm text-gray-500">Stok: {product.stock} • Satuan: {product.unit?.name}</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}

