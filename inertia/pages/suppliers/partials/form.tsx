
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function FormSupplier() {
    return (
        <form className="space-y-2">
            <div>
                <Label>Phone</Label>
                <Input className="mt-1" />
            </div>
            <div>
                <Label>Phone</Label>
                <Input className="mt-1" />
            </div>
            <div>
                <Label>Address</Label>
                <Input className="mt-1" />
            </div>

            <div>
                <Label>Description</Label>
                <Input className="mt-1" />
            </div>

            <div className="flex justify-end gap-2">
                <Button variant={'outline'}>Batal</Button>
                <Button>Simpan</Button>
            </div>
        </form>
    )
}
