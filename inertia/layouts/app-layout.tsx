import { HugeiconsIcon } from '@hugeicons/react';
import { HugeiconsFreeIcons, Notification01FreeIcons } from '@hugeicons/core-free-icons'
import React, { Fragment } from 'react'
import { Toaster } from 'sonner'
import { AppSidebar } from '~/components/app-sidebar'
import { ModeToggle } from '~/components/mode-toggle'
import { ThemeProvider } from '~/components/theme-provider'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { BreadcrumbProps } from '~/types'
import { Head } from '@inertiajs/react';

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbProps[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0

  return (
    <SidebarProvider>
      <Head>
        <script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
        />
      </Head>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 px-4 justify-between">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="-mr-3 data-[orientation=vertical]:h-4" />

          </div>

          {hasBreadcrumbs && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <Breadcrumb>
                <BreadcrumbList className="flex-wrap">
                  {breadcrumbs.map((item: any, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    return (
                      <Fragment key={item.url || index}>
                        <BreadcrumbItem className="flex items-center">
                          {isLast ? (
                            <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">
                              {item.title}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={item.url}
                              className="truncate max-w-[150px] sm:max-w-none hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {item.title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator className="shrink-0" />}
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          <div className='px-4 flex items-center gap-3'>
            <div className='relative bg-gray-100 border px-1.5 py-1.5 rounded-md'>
              <HugeiconsIcon
                icon={Notification01FreeIcons}
                className=" h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer transition-colors"
              />
            </div>
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full p-4 bg-slate-100  ">
         <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        {children}
      </div>
    </ThemeProvider>
            </div>
          </div>
        </main>
      </SidebarInset>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  )
}
