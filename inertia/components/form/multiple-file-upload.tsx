'use client';

import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import { Upload, X } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HugeiconsIcon } from '@hugeicons/react';
import { CloudUploadFreeIcons } from '@hugeicons/core-free-icons';
import { Label } from '@/components/ui/label';

export interface FileInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onValueChange?: (files: File[]) => void;
  onFileReject?: (file: File, message: string) => void;
  error?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      name,
      label,
      disabled,
      multiple,
      maxSize,
      maxFiles,
      onValueChange,
      onFileReject,
      error,
    },
    ref // ← penting agar tidak error warning
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [open, setOpen] = useState(false);

    const handleFileReject = React.useCallback(
      (file: File, message: string) => {
        if (onFileReject) {
          onFileReject(file, message);
        } else {
          toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
          });
        }
      },
      [onFileReject]
    );

    const onFileValidate = React.useCallback(
      (file: File): string | null => {
        if (files.length >= (maxFiles || 10)) {
          return `Anda hanya dapat mengunggah hingga ${maxFiles || 10} file`;
        }

        const MAX_SIZE = maxSize || 5 * 1024 * 1024; // default 5MB
        if (file.size > MAX_SIZE) {
          return `Ukuran file harus kurang dari ${MAX_SIZE / (1024 * 1024)}MB`;
        }

        return null;
      },
      [files, maxFiles, maxSize]
    );

    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <Popover defaultOpen={open} open={open} onOpenChange={(open) => setOpen(open)}>
          <PopoverTrigger asChild>
            <Button
              className="border-slate-150 flex w-full min-w-[400px] justify-start bg-white p-0.5 sm:max-w-[400px]"
              variant="outline"
            >
              <div className="flex gap-2 truncate">
                <div className="inline-flex items-center gap-2 rounded bg-slate-200/50 px-4 py-1.5">
                  <HugeiconsIcon icon={CloudUploadFreeIcons} />
                  Pilih File
                </div>
                {files.length > 0 && (
                  <div className="inline-flex items-center gap-2 truncate">
                    {files.length > 1 ? (
                      <span className="text-sm font-medium text-slate-600">{files.length} files</span>
                    ) : (
                      <span className="truncate text-sm font-medium text-slate-600">{files[0].name}</span>
                    )}
                  </div>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-[500px] sm:min-w-[500px]">
            <FileUpload
              name={name}
              label={label}
              disabled={disabled}
              multiple={multiple}
              maxSize={maxSize}
              maxFiles={maxFiles}
              value={files}
              onValueChange={(newFiles) => {
                setFiles(newFiles);
                onValueChange?.(newFiles);
                setOpen(false);
              }}
              onFileReject={handleFileReject}
              onFileValidate={onFileValidate}
            >
              <FileUploadDropzone>
                <div className="flex min-w-[400px] flex-col items-center gap-1 text-center">
                  <div className="flex items-center justify-center rounded-full border p-2.5">
                    <Upload className="text-muted-foreground size-6" />
                  </div>
                  <p className="text-sm font-medium">Seret & letakkan file di sini</p>
                  <p className="text-muted-foreground text-xs">
                    Atau klik untuk mencari {maxFiles ? `(maks ${maxFiles} file)` : ''}{' '}
                    {maxSize ? `(hingga ${maxSize / 1024 / 1024} MB)` : ''}
                  </p>
                </div>
                <FileUploadTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-150 mt-2 w-fit rounded-full bg-white px-6 font-light shadow-sm"
                  >
                    Cari file
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>

              <FileUploadList className="max-h-[300px] overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </PopoverContent>
        </Popover>
        {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
