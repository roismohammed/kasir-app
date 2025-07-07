import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import TextareaInput from "~/components/form/textarea-input";
import SelectInput from "~/components/form/select-input";

interface ProductProps {
    url: string;
    method: "POST" | "PUT";
    product?: {
        id: number
        barcode?: string;
        name?: string;
        description?: string;
        price?: number;
        unit_id?: number;
        category_id?: number;
    } | null;
    onSuccess?: () => void;
}

export default function FormProduct({ url, method, product, onSuccess }: ProductProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        barcode: product?.barcode || "",
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price?.toString() || "",
        unit_id: product?.unit_id?.toString() || "",
        category_id: product?.category_id?.toString() || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitQuery = new Promise((resolve, reject) => {
            const options = {
                onSuccess: (props: any) => {
                    resolve(props);
                    router.reload(); // Reload the page
                    if (onSuccess) {
                        onSuccess();
                    }
                },
                onError: (errors: any) => reject(errors),
            };

            if (method === 'PUT') {
                router.put(url, data, options)
            } else {
                post(url, options)
            }
        })


        toast.promise(submitQuery, {
            loading: 'Sedang Mengirim',
            success: 'Data berhasil disimpan',
            error: 'Kesalahan saat menyimpan data',
        });
    };

    return (
        <form onSubmit={submit} className="space-y-2">
            <div>
                <TextInput
                    label="Barcode"
                    className="mt-1"
                    placeholder="Masukan barcode"
                    value={data.barcode}
                    onChange={(e) => setData("barcode", e.target.value)}
                    error={errors.barcode}
                />
            </div>
            <div>
                <TextInput
                    label="Product Name"
                    className="mt-1"
                    placeholder="Masukan nama product"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />
            </div>
            <div>
                <TextareaInput
                    label="Deskripsi"
                    value={data.description}
                    onChange={(e) => setData("description", e.currentTarget.value)}
                    placeholder="Masukan descripsi product"
                    error={errors.description}
                />
            </div>
            <div>
                <TextInput
                    label="Harga"
                    className="mt-1"
                    placeholder="Masukan harga"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    error={errors.price}
                />
            </div>
            <SelectInput
                label="Satuan"
                value={data.unit_id}
                placeholder="Pilih Satuan"
                onSelect={(value) => setData("unit_id", value)}
                options={[
                    { value: "1", label: "PCS" },
                    { value: "2", label: "BOX" },
                    { value: "3", label: "PACK" },
                ]}
                errors={errors.unit_id}
            />

            <SelectInput
                label="Kategori"
                value={data.category_id}
                placeholder="Pilih Kategori"
                onSelect={(value) => setData("category_id", value)}
                options={[
                    { value: "1", label: "Makanan" },
                    { value: "2", label: "Minuman" },
                    { value: "3", label: "Snack" },
                ]}
            />


            <div className="flex justify-end gap-2">
                <Button variant={"outline"} type="button" onClick={() => { }}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    Simpan
                </Button>
            </div>
        </form>
    );
}

