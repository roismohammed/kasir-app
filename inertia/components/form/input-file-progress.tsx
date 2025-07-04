import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckmarkCircle02Icon, CloudUploadIcon, Delete02Icon, DocumentValidationIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import ChunkedUploady, { useAbortItem, useChunkFinishListener, useChunkStartListener } from '@rpldy/chunked-uploady';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import { useItemProgressListener, useItemStartListener } from '@rpldy/uploady';
import { filesize } from 'filesize';
import { forwardRef, Fragment, useState } from 'react';

type FileInputProps = {
    className?: string;
    variant?: 'simple' | 'dropzone';
    placeholder?: string;
    onChange: (value: any) => void;
    name: string;
    value?: string;
    label?: string;
    errors?: string;
};

interface FileProps {
    name: string;
    preview: string;
    type?: string;
    size: number;
    lastModified?: number;
    lastModifiedDate?: Date;
    webkitRelativePath?: string;
    uid?: string;
    batchId: string;
}

[];

const InputFileProgress = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
    const [progress, setProgess] = useState(0);
    const progressData = useItemProgressListener();
    const [item, setItem] = useState<any | null>(null);
    if (progressData && progressData.completed > progress) {
        setProgess(() => progressData.completed);
    }
    const abortItem = useAbortItem();
    useChunkStartListener((data) => {
        setProgess(0);
    });
    useItemStartListener((data: any) => {
        setItem(data);
        setProgess(0);
    });

    const handleDeleteItem = (id: string) => {
        setItem(null);
        abortItem(id);
    };

    useChunkFinishListener((data) => {
        onSuccess(data.uploadData.response.data);
    });
    return (
        progressData &&
        item && (
            <>
                {/* File Uploading Progress Form */}
                <div>
                    {/* Uploading File Content */}
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <span className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 dark:border-neutral-700 dark:text-neutral-500">
                                <HugeiconsIcon icon={DocumentValidationIcon} className="size-6" strokeWidth={1.25} />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">{item.file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-neutral-500">{filesize(item.file.size)}</p>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-x-2">
                            {progress === 100 && (
                                <Button
                                    type="button"
                                    variant={'link'}
                                    size={'icon'}
                                    className="relative border-none text-gray-500 hover:text-gray-800 focus:text-gray-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                >
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className={'rounded-full bg-teal-500 text-neutral-50'} size={16} />
                                    <span className="sr-only">Pause</span>
                                </Button>
                            )}
                            <Button
                                onClick={() => handleDeleteItem(item.id)}
                                type="button"
                                variant={'outline'}
                                size={'icon'}
                                className="relative rounded-full border hover:text-gray-800 focus:text-gray-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                            >
                                <HugeiconsIcon icon={Delete02Icon} size={14} />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </div>
                    {/* End Uploading File Content */}
                    {/* Progress Bar */}
                    <div className="flex items-center gap-x-3 whitespace-nowrap">
                        <div
                            className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <div
                                className={cn(
                                    'flex flex-col justify-center overflow-hidden rounded-full text-center text-xs whitespace-nowrap text-white transition duration-500 dark:bg-blue-500',
                                    progress === 100 && 'bg-teal-500',
                                    progress < 100 && 'bg-orange-500',
                                )}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="w-6 text-end">
                            <span className="text-sm text-gray-800 dark:text-white">{progress.toFixed()}%</span>
                        </div>
                    </div>
                    {/* End Progress Bar */}
                </div>
                {/* End File Uploading Progress Form */}
            </>
        )
    );
};

// Styled DropZone Button menggunakan Tailwind CSS
const DropZoneButton = asUploadButton((props: any) => (
    <button type={'button'} {...props} className="mt-4 flex flex-col items-center gap-2 rounded border-none bg-transparent px-4 py-2 text-slate-500">
        <HugeiconsIcon icon={CloudUploadIcon} />
        <span>Klik untuk Upload atau Drop File di Sini</span>
    </button>
));

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(props, ref) {
    const { className, variant = 'simple', onChange } = props;
    const [value, setValue] = useState(props.value || '');
    const handleUploadData = (data: any) => {
        setValue('');
        onChange(data);
    };

    return (
        <Fragment>
            {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
            {variant == 'simple' ? (
                <Fragment>
                    <ChunkedUploady
                        method="POST"
                        destination={{ url: route('files.upload') }}
                        chunkSize={512 * 1024}
                        inputFieldName={'file'}
                        fileInputId={props.name}
                    >
                        <UploadDropZone
                            onDragOverClassName="drag-over"
                            className={
                                'border-primary/40 flex min-h-32 cursor-pointer items-center justify-center rounded-md border border-dashed bg-slate-50/80'
                            }
                            grouped
                            maxGroupSize={3}
                        >
                            <DropZoneButton />
                        </UploadDropZone>
                        <div style={{ marginTop: 20 }} className="cursor-pointer">
                            <InputFileProgress onSuccess={(data) => handleUploadData(data)} />
                            {value && (
                                <div className="flex items-center gap-x-3 rounded-md border p-2">
                                    <span className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 dark:border-neutral-700 dark:text-neutral-500">
                                        <HugeiconsIcon icon={DocumentValidationIcon} className="size-6" strokeWidth={1.25} />
                                    </span>
                                    <div className={'flex-1'}>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{value}</p>
                                    </div>
                                    <Button
                                        onClick={() => setValue('')}
                                        type="button"
                                        variant={'outline'}
                                        size={'icon'}
                                        className="relative rounded-full border hover:text-gray-800 focus:text-gray-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    >
                                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </ChunkedUploady>
                </Fragment>
            ) : (
                <Input type={'file'} placeholder={props.placeholder} />
            )}
            {props.errors && <div className="text-xs font-normal text-rose-500">{props.errors}</div>}
        </Fragment>
    );
});

export default FileInput;
