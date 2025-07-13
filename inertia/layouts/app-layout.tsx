import React, { Fragment } from 'react'
import { Toaster } from 'sonner'
import { AppSidebar } from '~/components/app-sidebar'
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

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbProps[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 px-4">
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
                            <BreadcrumbPage className="truncate max-w-[200px] sm:max-w-none">{item.title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={item.url} className="truncate max-w-[150px] sm:max-w-none hover:text-blue-600 dark:hover:text-blue-400">{item.title}</BreadcrumbLink>
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
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full p-4 sm:p-6">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  )
}
