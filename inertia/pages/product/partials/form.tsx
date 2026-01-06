import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import SelectInput from "~/components/form/select-input";
import { CategoriesProps, UnitsProps } from "~/types";
import CurrencyInput from 'react-currency-input-field';
import { Label } from "~/components/ui/label";
interface ProductFormProps {
    url: string;
    method: "POST" | "PUT";
    product?: {
        id: number
        image: string
        barcode?: string;
        name?: string;
        price?: number;
        unit_id?: number;
        category_id?: number;
        unit: { id: string }
        category: { id: string }
    };
    onSuccess?: () => void;
    categories: CategoriesProps[]
    unit: UnitsProps[];
}

export default function FormProduct({ url, method, product, onSuccess, categories, unit }: ProductFormProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        image: product?.image || "",
        barcode: product?.barcode || "",
        name: product?.name || "",
        price: product?.price?.toString() || "",
        category_id: product?.category_id?.toString() ?? product?.category?.id?.toString() ?? "",
        unit_id: product?.unit_id?.toString() ?? product?.unit?.id?.toString() ?? "",
    });
    console.log(data);



    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitQuery = new Promise((resolve, reject) => {
            const options = {
                onSuccess: (props: any) => {
                    resolve(props);
                    router.reload();
                    if (onSuccess) {
                        onSuccess();
                    }
                },
                onError: (errors: any) => {
                    reject(errors)
                },
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
        <form onSubmit={submit} className="space-y-6 mt-4">
            <div>
                <Label className="mb-2 block">Product Image</Label>

                <div className="relative w-full h-44 border-2 border-dashed rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                            setData("image", e.target.files?.[0] || data.image)
                        }
                    />

                    {data.image ? (
                        <img
                            src={
                                typeof data.image === "string"
                                    ? `/storage/products/${data.image}`
                                    : URL.createObjectURL(data.image)
                            }
                            className="w-full h-full object-cover rounded-2xl"
                            alt="Preview"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mb-2"
                            >
                                <path d="M12 16V4" />
                                <path d="M8 8l4-4 4 4" />
                                <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                            </svg>

                            <p className="text-sm font-medium">Upload product image</p>
                            <span className="text-xs">PNG, JPG, JPEG</span>
                        </div>
                    )}
                </div>

                {errors.image && (
                    <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                )}
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                    label="Barcode"
                    placeholder="Masukkan barcode"
                    value={data.barcode}
                    onChange={(e) => setData("barcode", e.target.value)}
                    error={errors.barcode}
                />

                <TextInput
                    label="Product Name"
                    placeholder="Masukkan nama produk"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />
            </div>

            {/* PRICE */}
            <div>
                <Label>Harga</Label>
                <CurrencyInput
                    name="price"
                    placeholder="Masukkan harga"
                    defaultValue={data.price}
                    decimalsLimit={2}
                    onValueChange={(value) => setData("price", value)}
                    prefix="Rp "
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.price && (
                    <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                )}
            </div>

            {/* SELECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput
                    label="Satuan"
                    value={data.unit_id}
                    placeholder="Pilih satuan"
                    onSelect={(value) => setData("unit_id", value)}
                    options={unit.map((u) => ({
                        value: String(u.id),
                        label: u.name
                    }))}
                    errors={errors.unit_id}
                />

                <SelectInput
                    label="Kategori"
                    value={data.category_id}
                    placeholder="Pilih kategori"
                    onSelect={(value) => setData("category_id", value)}
                    options={categories.map((c) => ({
                        value: String(c.id),
                        label: c.name
                    }))}
                    errors={errors.category_id}
                />
            </div>

            <div className="flex justify-end gap-3 pt- ">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.back()}
                >
                    Batal
                </Button>

                <Button type="submit" disabled={processing}>
                    {processing ? "Menyimpan..." : "Simpan"}
                </Button>
            </div>

        </form>

    );
}