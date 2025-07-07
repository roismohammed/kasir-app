import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import TextareaInput from "~/components/form/textarea-input";

interface CustomersProps {
    url: string;
    method: "POST" | "PUT";
    category?: {
        id: number
        name?: string;
        description?: string;
    }| null;
    onSuccess?: () => void;
}

export default function FormCategory({ url, method, category, onSuccess }: CustomersProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        name: category?.name || "",
        description: category?.description || "",
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
                    label="Category Name"
                    className="mt-1"
                    placeholder="Masukan nama category"
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
                    placeholder="Masukan descripsi category"
                    error={errors.description}
                />
            </div>

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
