import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react';
import { forwardRef, TextareaHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    isFocused?: boolean;
    error?: string;
    icon?: HugeiconsIconProps['icon'];
    iconPosition?: 'start' | 'end';
};

export default forwardRef(function TextareaInput({ className = '', isFocused = false, ...props }: Props, ref) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="grid w-full items-center gap-1.5">
            {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
            <div
                className={cn(
                    'peer relative flex w-full items-center gap-2 rounded-md border border-gray-200 px-0 shadow-xs transition-transform focus-within:border-blue-500 focus-within:ring-0 focus-within:ring-blue-500 focus-within:outline-3 focus-within:outline-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus-within:border-blue-600 dark:focus-within:ring-blue-600',
                    props.error &&
                        'border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500 focus-within:outline focus-within:outline-rose-500/20 focus:ring-1 dark:border-rose-500 dark:focus-within:border-rose-500 dark:focus-within:ring-rose-500',
                    className,
                )}
            >
                <Textarea
                    {...props}
                    className={cn(
                        'rounded-md w-full border-0 font-normal shadow-none focus:bg-white focus-visible:border-0 focus-visible:bg-white focus-visible:ring-0 focus-visible:outline-0',
                        props.error ? 'text-rose-500 focus:text-rose-500' : '',
                    )}
                    ref={localRef}
                />
                {props.error && <HugeiconsIcon icon={InformationCircleIcon} size={16} className={'absolute top-0 right-0 m-3 text-rose-400'} />}
            </div>
            {props.error && <span className={'text-xs font-medium text-rose-400'}>{props.error}</span>}
        </div>
    );
});
