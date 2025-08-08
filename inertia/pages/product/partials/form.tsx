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
        <form onSubmit={submit} className="space-y-2">
            <div>
                <TextInput
                    label="Image"
                    className="mt-1"
                    type="file"
                    onChange={(e) => setData("image", e.target.files?.[0] || data.image)}
                    error={errors.image}    
                />
                {product?.image && (
                    <img src={`/storage/products/${product?.image}`} className="mt-2 rounded-lg w-60" />
                )}
            </div>
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
                <Label>Harga</Label>
                <CurrencyInput
                    id="price-input"
                    name="price"
                    placeholder="Masukan harga"
                    defaultValue={data.price}
                    decimalsLimit={2}
                    onValueChange={(value: any) => setData("price", value)}
                    className="mt-1 border border-gray-300 shadow-xm rounded-sm py-2 px-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                    prefix="Rp "
                />
            </div>
            <SelectInput
                label="Satuan"
                value={data.unit_id}
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
                value={data.category_id}
                placeholder="Pilih Kategori"
                onSelect={(value) => setData("category_id", value)}
                options={categories.map((category: CategoriesProps) => ({
                    value: String(category.id),
                    label: category.name
                }))}
                errors={errors.category_id}
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