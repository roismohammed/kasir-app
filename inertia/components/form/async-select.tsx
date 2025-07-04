import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/hooks/use-debouce';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
    icon?: React.ReactNode;
}

export interface AsyncSelectProps<T> {
    /** Async function to fetch options */
    fetcher: (query: string) => Promise<T[]>;
    /** Preload all data ahead of time */
    preload?: boolean;
    /** Function to filter options */
    filterFn?: (option: T, query: string) => boolean;
    /** Function to render each option */
    renderOption: (option: T) => React.ReactNode;
    /** Function to get the value from an option */
    getOptionValue: (option: T) => string;
    /** Function to get the display value for the selected option */
    getDisplayValue: (option: T) => React.ReactNode;
    /** Custom not found message */
    notFound?: React.ReactNode;
    /** Custom loading skeleton */
    loadingSkeleton?: React.ReactNode;
    /** Currently selected value */
    value: string;
    /** Callback when selection changes */
    onChange: (value: string) => void;
    /** Label for the select field */
    label: string;
    /** Placeholder text when no selection */
    placeholder?: string;
    /** Disable the entire select */
    disabled?: boolean;
    /** Custom width for the popover */
    width?: string | number;
    /** Custom class names */
    className?: string;
    /** Custom trigger button class names */
    triggerClassName?: string;
    /** Custom no results message */
    noResultsMessage?: string;
    /** Allow clearing the selection */
    clearable?: boolean;
    name?: string;
    errors?: string | undefined;
}

export function AsyncSelect<T>({
    fetcher,
    preload,
    filterFn,
    renderOption,
    getOptionValue,
    getDisplayValue,
    notFound,
    loadingSkeleton,
    label,
    name,
    placeholder = 'Select...',
    value,
    onChange,
    disabled = false,
    width = 'full',
    className,
    triggerClassName,
    noResultsMessage,
    clearable = true,
    errors,
}: AsyncSelectProps<T>) {
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedOption, setSelectedOption] = useState<T | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, preload ? 0 : 300);
    const [originalOptions, setOriginalOptions] = useState<T[]>([]);

    useEffect(() => {
        setMounted(true);
        setSelectedValue(value);
    }, [value]);

    // Initialize selectedOption when options are loaded and value exists
    useEffect(() => {
        if (value && options.length > 0) {
            const option = options.find((opt) => getOptionValue(opt) === value);
            if (option) {
                setSelectedOption(option);
            }
        }
    }, [value, options, getOptionValue]);

    // Effect for initial fetch
    useEffect(() => {
        const initializeOptions = async () => {
            try {
                setLoading(true);
                setError(null);
                // If we have a value, use it for the initial search
                const data = await fetcher(value);
                setOriginalOptions(data);
                setOptions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch options');
            } finally {
                setLoading(false);
            }
        };

        if (!mounted) {
            initializeOptions();
        }
    }, [mounted, fetcher, value]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetcher(debouncedSearchTerm);
                setOriginalOptions(data);
                setOptions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch options');
            } finally {
                setLoading(false);
            }
        };

        if (!mounted) {
            fetchOptions();
        } else if (!preload) {
            fetchOptions();
        } else if (preload) {
            if (debouncedSearchTerm) {
                setOptions(originalOptions.filter((option) => (filterFn ? filterFn(option, debouncedSearchTerm) : true)));
            } else {
                setOptions(originalOptions);
            }
        }
    }, [fetcher, debouncedSearchTerm, mounted, preload, filterFn]);

    const handleSelect = useCallback(
        (currentValue: string) => {
            const newValue = clearable && currentValue === selectedValue ? '' : currentValue;
            setSelectedValue(newValue);
            setSelectedOption(options.find((option) => getOptionValue(option) === newValue) || null);
            onChange(newValue);
            setOpen(false);
        },
        [selectedValue, onChange, clearable, options, getOptionValue],
    );

    return (
        <div className={'grid min-w-full items-end gap-1.5'}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Popover open={open} modal={true} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            'w-full cursor-pointer border-slate-200 bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-3 data-[state=open]:border data-[state=open]:border-blue-500 data-[state=open]:ring-3 data-[state=open]:ring-blue-500/20 data-[state=open]:outline-3',
                            errors
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 focus:outline focus:outline-rose-500/20 data-[state=closed]:border-rose-500 data-[state=closed]:ring-rose-500/20 data-[state=closed]:outline-rose-500/20 data-[state=open]:border-rose-500 data-[state=open]:ring-rose-500/20 data-[state=open]:outline-rose-500/20'
                                : '',
                            className,
                        )}
                        disabled={disabled}
                    >
                        <div className={'flex w-full items-center justify-between text-gray-500'}>
                            {selectedOption ? getDisplayValue(selectedOption) : placeholder}
                            <ChevronsUpDown className="opacity-50" size={10} />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn('p-0 popover-content', className)}>
                    <Command shouldFilter={false}>
                        <div className="relative w-full border-b">
                            <CommandInput
                                placeholder={`Ketik untuk pencarian...`}
                                value={searchTerm}
                                onValueChange={(value) => {
                                    setSearchTerm(value);
                                }}
                            />
                            {loading && options.length > 0 && (
                                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 transform items-center">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                        </div>
                        <CommandList>
                            {error && <div className="text-destructive p-4 text-center">{error}</div>}
                            {loading && options.length === 0 && (loadingSkeleton || <DefaultLoadingSkeleton />)}
                            {!loading &&
                                !error &&
                                options.length === 0 &&
                                (notFound || <CommandEmpty>{noResultsMessage ?? `No ${label.toLowerCase()} found.`}</CommandEmpty>)}
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem key={getOptionValue(option)} value={getOptionValue(option)} onSelect={handleSelect}>
                                        {renderOption(option)}
                                        <Check
                                            className={cn('ml-auto h-3 w-3', selectedValue === getOptionValue(option) ? 'opacity-100' : 'opacity-0')}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {errors && <span className={'text-xs font-medium text-rose-400'}>{errors}</span>}
        </div>
    );
}

function DefaultLoadingSkeleton() {
    return (
        <CommandGroup>
            {[1, 2, 3].map((i) => (
                <CommandItem key={i} disabled>
                    <div className="flex w-full items-center gap-2">
                        <div className="bg-muted h-6 w-6 animate-pulse rounded-full" />
                        <div className="flex flex-1 flex-col gap-1">
                            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                            <div className="bg-muted h-3 w-16 animate-pulse rounded" />
                        </div>
                    </div>
                </CommandItem>
            ))}
        </CommandGroup>
    );
}
