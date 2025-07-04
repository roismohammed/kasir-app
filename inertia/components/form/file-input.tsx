import { Label } from '@/components/ui/label';
import { Upload02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import ChunkedUploady, { useAbortItem, useChunkFinishListener, useChunkStartListener } from '@rpldy/chunked-uploady';
import { asUploadButton } from '@rpldy/upload-button';
import UploadDropZone from '@rpldy/upload-drop-zone';
import { useItemProgressListener, useItemStartListener } from '@rpldy/uploady';
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

const DropZoneButton = asUploadButton((props: any) => (
    <button
        type={'button'}
        {...props}
        className="inline-flex h-8 items-center justify-start gap-2 rounded-sm bg-slate-100 px-4 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-0 focus:outline-none"
    >
        <HugeiconsIcon icon={Upload02Icon} size={18} />
        <span>Pilih File</span>
    </button>
));

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(props, ref) {
    const handleUploadData = (data: { path: string; name: string; mime_type: string; size: number }) => {
        props.onChange(data);
    };

    return (
        <Fragment>
            {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
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
                        'border-input flex w-full items-center gap-2 rounded-md border border-solid bg-transparent px-1 py-1 text-sm shadow-xs'
                    }
                    grouped={false}
                    maxGroupSize={3}
                >
                    <DropZoneButton />
                    <UploadProgress onSuccess={(data) => handleUploadData(data)} />
                </UploadDropZone>
                <div style={{ marginTop: 20 }}>{props.errors && <div className="text-xs font-normal text-rose-500">{props.errors}</div>}</div>
            </ChunkedUploady>
        </Fragment>
    );
});

const UploadProgress = ({ onSuccess }: { onSuccess: (data: { path: string; name: string; mime_type: string; size: number }) => void }) => {
    const [progress, setProgess] = useState(0);
    const progressData = useItemProgressListener();
    const [item, setItem] = useState<{
        file: {
            name: string;
        };
    } | null>(null);
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
                <p className="text-sm font-medium text-gray-800 dark:text-white">{item.file.name}</p>
            </>
        )
    );
};

export default FileInput;
