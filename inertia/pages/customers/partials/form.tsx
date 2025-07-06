import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SelectInput from "~/components/form/select-input";
import TextareaInput from "~/components/form/textarea-input";

interface CustomersProps {
    url: string;
    method: "POST" | "PUT";
    customers?: {
        name?: string;
        phone?: string;
        address?: string;
        gender?: string;
    };
}

export default function FormCustomers({ url, method, customers }: CustomersProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        name: customers?.name || "",
        phone: customers?.phone || "",
        address: customers?.address || "",
        gender: customers?.gender || "",
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
                    label="Customer Name"
                    className="mt-1"
                    placeholder="Masukan nama supplier"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />
            </div>
            <div>
                <SelectInput
                    label="Pilih Jenis Kelamin"
                    options={[
                        { value: "male", label: "Laki-laki" },
                        { value: "female", label: "Perempuan" }
                    ]}
                    value={data.gender}
                    onSelect={(value) => setData("gender", value)}
                    placeholder="Pilih jenis kelamin"
                    errors={errors.gender}
                />
            </div>
            <div>
                <TextInput
                    label="Phone"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.currentTarget.value)}
                    placeholder="Masukan nomor telepon"
                    error={errors.phone}
                />
            </div>
            <div>

                <TextareaInput
                    label="Alamat"
                    value={data.address}
                    onChange={(e) => setData("address", e.currentTarget.value)}
                    placeholder="Masukan alamat suppliers"
                    error={errors.address}
                />
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

