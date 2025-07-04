import { cn } from '~/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';


const buttonVariants = cva(
    'inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    {
        variants: {
            variant: {
                default: 'bg-radial-[at_52%_-52%] **:[text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 dark:inset-shadow-white dark:from-primary dark:to-primary/70 dark:hover:to-primary border text-sm shadow-md shadow-zinc-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-0',
                destructive: 'from-destructive/85 to-destructive text-destructive-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-destructive/75 dark:bg-linear-to-t border border-destructive/70 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50',
                outline: 'bg-muted hover:bg-background dark:bg-muted/25 dark:hover:bg-muted/50 dark:border-border inset-shadow-2xs inset-shadow-white dark:inset-shadow-transparent relative flex border border-zinc-300 shadow-sm shadow-zinc-950/5 ring-0 duration-150',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                teal: 'bg-radial-[at_52%_-52%] **:[text-shadow:0_1px_0_var(--color-primary)] border-teal-600/80 from-teal-600/70 to-teal-600/95 text-primary-foreground inset-shadow-2xs inset-shadow-teal-300/25 dark:inset-shadow-white dark:from-primary dark:to-primary/70 dark:hover:to-primary border text-sm shadow-md shadow-zinc-700/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-0',
                orange: 'bg-radial-[at_52%_-52%] **:[text-shadow:0_1px_0_var(--color-primary)] border-orange-600/80 from-orange-600/70 to-orange-600/95 text-primary-foreground inset-shadow-2xs inset-shadow-orange-300/25 dark:inset-shadow-white dark:from-primary dark:to-primary/70 dark:hover:to-primary border text-sm shadow-md shadow-zinc-700/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-0'
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md px-2 has-[>svg]:px-2.5 text-xs',
                xs: 'h-7 [&_svg:not([class*=\'size-\'])]:size-3 rounded-md px-1.5 has-[>svg]:px-2',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
