import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface SupplierProps {
    url: string;
    method: "POST" | "PUT";
    supplier?: {
        name?: string;
        phone?: string;
        address?: string;
        description?: string;
    };
}

export default function FormSupplier({ url, method, supplier }: SupplierProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        name: supplier?.name || "",
        phone: supplier?.phone || "",
        address: supplier?.address || "",
        description: supplier?.description || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitQuery = new Promise((resolve, reject) => {
            const options = {
                onSuccess: (props: any) => resolve(props),
                onError: (errors: any) => reject(errors),
            }

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
                    label="Supplier Name"
                    className="mt-1"
                    placeholder="Masukan nama supplier"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />
            </div>
            <div>
                <Label>Phone</Label>
                <TextInput
                    className="mt-1"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.currentTarget.value)}
                    placeholder="Masukan nomor telepon"
                    error={errors.phone}
                />
            </div>
            <div>
                <Label>Address</Label>
                <Textarea
                    className="mt-1"
                    value={data.address}
                    onChange={(e) => setData("address", e.currentTarget.value)}
                    placeholder="Masukan alamat suppliers"
                />
                {errors.address && <div className="text-red-600">{errors.address}</div>}
            </div>
            <div>
                <Label>Description</Label>
                <Textarea
                    className="mt-1"
                    value={data.description}
                    onChange={(e) => setData("description", e.currentTarget.value)}
                    placeholder="Masukan deskripsi suppliers"
                />
                {errors.description && (
                    <div className="text-red-600">{errors.description}</div>
                )}
            </div>
            <div className="flex justify-end gap-2">
                <Button variant={"outline"} disabled={processing}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    Simpan
                </Button>
            </div>
        </form>
    );
}

