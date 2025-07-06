import React, { Fragment } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { BreadcrumbProps } from "~/types"; 

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbProps[];
}

export default function AppLayout({
  children,
  breadcrumbs,
}: AppLayoutProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="-mr-3 data-[orientation=vertical]:h-4"
            />
          </div>

          {hasBreadcrumbs && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item:any, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <Fragment key={item.url || index}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Toaster position="top-center" richColors />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}