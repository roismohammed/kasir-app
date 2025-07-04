
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function FormSupplier() {
    return (
        <form className="space-y-2">
            <div>
                <Label>Suppliers Name</Label>
                <Input className="mt-1" placeholder="Masukan nama suppliers" />
            </div>
            <div>
                <Label>Phone</Label>
                <Input className="mt-1" placeholder="Masukan nomor telepon" />
            </div>
            <div>
                <Label>Address</Label>
                <Textarea className="mt-1" placeholder="Masukan alamat suppliers" />
            </div>

            <div>
                <Label>Description</Label>
                <Textarea className="mt-1" placeholder="Masukan deskripsi suppliers" />
            </div>

            <div className="flex justify-end gap-2">
                <Button variant={'outline'}>Batal</Button>
                <Button>Simpan</Button>
            </div>
        </form>
    )
}
