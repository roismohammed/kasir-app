import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';

type SelectInputProps = {
    children?: React.ReactNode;
    name?: string;
    errors?: string;
    placeholder?: string;
    help?: string;
    className?: string;
    onSelect: (value: string) => void;
    variant?: 'simple' | 'select2';
    options: Array<{ value: string; label: string }>;
    value: string;
    label?: string;
    disabled?: boolean;
};

const SelectInput: React.FC<SelectInputProps> = ({ options = [], onSelect, label, ...props }) => {
    const handleSelect = (value: string) => {
        onSelect(value);
    };

    return (
        <div className={'grid min-w-full items-end gap-1.5'}>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            <Select onValueChange={(value) => handleSelect(value)} value={String(props.value)} defaultValue={String(props.value)}>
                <SelectTrigger
                    className={cn(
                        'w-full cursor-pointer focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-3 data-[state=open]:border-blue-500 data-[state=open]:ring-3 data-[state=open]:ring-blue-500/20 data-[state=open]:outline-3',
                        props.errors &&
                        'border-rose-500 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/20 focus:outline-3 data-[state=open]:border-rose-500 data-[state=open]:ring-3 data-[state=open]:ring-rose-500/20',
                        props.className,
                    )}
                >
                    <SelectValue placeholder={props.value || props.placeholder} />
                </SelectTrigger>
                <SelectContent className={'border-b-2 shadow-sm'} aria-modal={false}>
                    {options.length > 0 && (
                        <SelectGroup>
                            <SelectLabel className={'font-normal text-gray-500'}>{props.placeholder}</SelectLabel>
                            {options.map((option) => (
                                <SelectItem value={String(option.value)} key={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>
            {props.errors && <div className="text-xs font-normal text-rose-500">{props.errors}</div>}
            {props.help && <div className="text-xs text-slate-500">{props.help}</div>}
        </div>
    );
};

export default SelectInput;
