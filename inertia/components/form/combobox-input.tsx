'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Tick02FreeIcons, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';
import { useEffect } from 'react';

type StatusItem = {
    value: string;
    label: string;
};

type Status = StatusItem[];

type Props = {
    placeholder: string;
    label?: string;
    name: string;
    options: Status;
    onChange: (status: string) => void;
    value: string;
    errors?: string
};

export default function ComboboxInput({ placeholder, name, label, options, onChange, value, ...props }: Props) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [selectedStatus, setSelectedStatus] = React.useState<StatusItem | null>(null);

    useEffect(() => {
        const data = options.find((item) => String(item.value) === String(value));
        setSelectedStatus(data || null);
    }, []);

    useEffect(() => {
        onChange(selectedStatus?.value || '');
    }, [selectedStatus]);

    if (isDesktop) {
        return (
            <div className={'grid w-full gap-1.5'}>
                {label && <Label htmlFor={name}>{label}</Label>}
                <Popover modal={true} open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id={name}
                            variant="outline"
                            className={cn(
                                'flex w-full min-w-full items-center justify-between bg-white px-3 font-normal hover:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-3 data-[state=open]:border-blue-500 data-[state=open]:ring-3 data-[state=open]:ring-blue-500/20 data-[state=open]:outline',
                                props.errors &&
                                'border-rose-500 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/20 focus:outline-3 data-[state=open]:border-rose-500 data-[state=open]:ring-3 data-[state=open]:ring-rose-500/20',

                            )}
                        >
                            {selectedStatus ? (
                                <div className={'flex w-full items-center justify-between text-gray-700'}>
                                    <div>{selectedStatus.label}</div>
                                    <HugeiconsIcon icon={UnfoldMoreIcon} />
                                </div>
                            ) : (
                                <div className={'flex w-full items-center justify-between text-gray-500'}>
                                    <div>{placeholder}</div>
                                    <HugeiconsIcon icon={UnfoldMoreIcon} />
                                </div>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border-b-2 p-0 shadow-sm popover-content" align="start">
                        <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} options={options} />
                    </PopoverContent>
                </Popover>
                {props.errors && <span className={'text-xs font-medium text-rose-400'}>{props.errors}</span>}
            </div>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start data-[state=open]:border">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent className={'min-h-[50vh] w-full'}>
                <div className="mt-4 mb-8 border-t">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} options={options} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function StatusList({
    setOpen,
    setSelectedStatus,
    selectedStatus,
    options,
}: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: StatusItem | null) => void;
    selectedStatus: StatusItem | null;
    options: Status;
}) {
    return (
        <Command>
            <CommandInput className={'border-0 focus:ring-0'} placeholder="Pencarian ..." />
            <CommandList>
                <CommandEmpty>Tidak ada pilihan</CommandEmpty>
                <CommandGroup>
                    {options.map((item) => (
                        <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={() => {
                                setSelectedStatus(item);
                                setOpen(false);
                            }}
                        >
                            {item.label}
                            <HugeiconsIcon
                                icon={Tick02FreeIcons}
                                className={cn('ml-auto', selectedStatus?.value === item.value ? 'opacity-100' : 'opacity-0')}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
