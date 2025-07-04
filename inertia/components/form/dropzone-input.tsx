import { useRef, useState } from "react";
import { cn } from "@/lib/utils"; // pastikan punya helper cn untuk merge className
import { UploadCloud } from "lucide-react";

interface DropzoneInputProps {
    onFileChange: (file: File) => void;
    error?: string;
}

export default function DropzoneInput({ onFileChange, error }: DropzoneInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            setFileName(file.name);
            onFileChange(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
            onFileChange(e.target.files[0]);
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
                dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
                "py-10 px-6 text-center hover:bg-gray-50"
            )}
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <UploadCloud className="w-8 h-8 mb-3 text-gray-500" />
            <p className="text-gray-600 text-sm">
                Seret dan jatuhkan file di sini, atau <span className="underline text-blue-600">klik untuk upload</span>
            </p>
            {fileName && <p className="mt-2 text-sm text-gray-700 font-medium">{fileName}</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleChange}
            />
        </div>
    );
}
