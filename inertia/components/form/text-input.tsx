import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react';
import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    isFocused?: boolean;
    error?: string;
    icon?: HugeiconsIconProps['icon'];
    iconPosition?: 'start' | 'end';
};

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & Props & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="grid w-full  gap-1.5">
            {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
            <div
                className={cn(
                    'peer relative flex w-full items-center gap-2 rounded-md border border-gray-200 p-0 shadow-xs transition-transform focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20 focus-within:outline-0 focus-within:outline-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus-within:border-blue-600 dark:focus-within:ring-blue-600',
                    props.error &&
                        'border-rose-500 pe-2 focus-within:border-rose-500 focus-within:ring-rose-500/20 focus-within:outline focus-within:outline-rose-500/20 focus:ring-1 dark:border-rose-500 dark:focus-within:border-rose-500 dark:focus-within:ring-rose-500',
                    className,
                )}
            >
                {props.icon && props.iconPosition === 'start' && <HugeiconsIcon icon={props.icon} size={18} />}
                <Input
                    {...props}
                    type={type}
                    className={cn(
                        'w-full rounded-md border-0 font-normal shadow-none focus-visible:border-0 focus-visible:bg-blue-500/5 focus-visible:ring-0 focus-visible:outline-0',
                        props.error ? ' text-rose-500 focus:text-rose-500 ' : '',
                    )}
                    ref={localRef}
                />
                {props.icon && props.iconPosition === 'end' && <HugeiconsIcon icon={props.icon} size={18} />}
                {props.error && <HugeiconsIcon icon={InformationCircleIcon} size={16} className={'text-rose-400'} />}
            </div>
            {props.error && <span className={'text-xs font-medium text-rose-400'}>{props.error}</span>}
        </div>
    );
});
