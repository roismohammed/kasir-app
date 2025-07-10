import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import SelectInput from "~/components/form/select-input";
import { CategoriesProps, UnitsProps } from "~/types";

interface ProductProps {
    url: string;
    method: "POST" | "PUT";
    product?: {
        id: number
        barcode?: string;
        name?: string;
        price?: number;
        unit_id?: number;
        category_id?: number;
        unit:{id:string}
        category:{id:string}
    } ;
    onSuccess?: () => void;
    categories: CategoriesProps[]
    unit: UnitsProps[];
}

export default function FormProduct({ url, method, product, onSuccess, categories, unit }: ProductProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        barcode: product?.barcode || "",
        name: product?.name || "",
        price: product?.price?.toString() || "",
        category_id: product?.category_id?.toString() ?? product?.category?.id?.toString() ?? "",
        unit_id: product?.unit_id?.toString() ?? product?.unit?.id?.toString() ?? "",
    });


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
                    console.log(data); // It's good to log 'errors' directly here for debugging
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
        <form onSubmit={submit} className="space-y-2">
            <div>
                <TextInput
                    label="Barcode"
                    className="mt-1"
                    placeholder="Masukan barcode"
                    value={data.barcode}
                    onChange={(e) => setData("barcode", e.target.value)}
                    error={errors.barcode }
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
                value={data.unit_id} // This is already a string due to the change in useForm
                placeholder="Pilih Satuan"
                onSelect={(value) => setData("unit_id", value)}
                options={unit.map((unit: UnitsProps) => ({
                    value: String(unit.id),
                    label: unit.name
                }))}
                errors={errors.unit_id}
            />

            <SelectInput
                label="Kategori"
                value={data.category_id} // This is already a string due to the change in useForm
                placeholder="Pilih Kategori"
                onSelect={(value) => setData("category_id", value)}
                options={categories.map((category: CategoriesProps) => ({
                    value: String(category.id),
                    label: category.name
                }))}
                errors={errors.category_id}
            />


            <div className="flex justify-end gap-2">
                <Button variant={"outline"} type="button" onClick={() => { /* Consider adding a clear way to close or cancel the form here */ }}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    Simpan
                </Button>
            </div>
        </form>
    );
}