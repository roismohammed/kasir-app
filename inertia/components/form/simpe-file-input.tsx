import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    help?: string;
};

const SimpleFileInput = forwardRef<HTMLInputElement, FileInputProps>(({ label, error, help, className, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (props.autoFocus) {
            localRef.current?.focus();
        }
    }, [props.autoFocus]);

    return (
        <div className="grid w-full gap-1.5">
            {label && <Label htmlFor={props.name}>{label}</Label>}
            <div
                className={cn(
                    'relative flex w-full items-center gap-2 rounded-md border border-gray-200 p-2 shadow-xs transition-transform focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
                    error && 'border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/20',
                    className,
                )}
            >
                <input
                    {...props}
                    type="file"
                    ref={localRef}
                    className={cn(
                        'w-full border-0 bg-transparent p-0 text-sm text-gray-900 focus:ring-0 dark:text-gray-300',
                        error ? 'text-rose-500' : '',
                    )}
                />
                {error && <HugeiconsIcon icon={InformationCircleIcon} size={16} className="text-rose-400" />}
            </div>
            {error && <span className="text-xs font-medium text-rose-400">{error}</span>}
            {help && <span className="text-xs text-gray-500">{help}</span>}
        </div>
    );
});

SimpleFileInput.displayName = 'SimpleFileInput';

export default SimpleFileInput;
