import { router, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import SelectInput from "~/components/form/select-input";
import { RoleProps } from "~/types";

interface UserProps {
    url: string;
    method: "POST" | "PUT";
    user?: {
        name?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
        role_id?: string[];
    };
    roles: RoleProps[]
}

export default function FormUser({ url, method, user, roles }: UserProps) {
    const { data, setData, post, errors, processing } = useForm({
        _method: method,
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
        password_confirmation: user?.password_confirmation || "",
        role_id: user?.role_id || [],
    });
    console.log(data);


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
                    label="Nama"
                    className="mt-1"
                    placeholder="Masukan nama user"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                />
            </div>
            <div>
                <TextInput
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.currentTarget.value)}
                    placeholder="Masukan email user"
                    error={errors.email}
                />
            </div>
            <div>
                <TextInput
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.currentTarget.value)}
                    placeholder="password "
                    error={errors.password}
                />
            </div>

            <div>
                <SelectInput
                    label="Level Users"
                    value={data.role_id}
                    onSelect={(value) => setData("role_id", value)}
                    options={roles.map(role => ({
                        label: role.name,
                        value: role.id.toString()
                    }))}
                    placeholder="Pilih role"
                    errors={errors.role_id}
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

