import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  createRootRoute,
  createRootRouteWithContext,
  Link,
  Outlet,
  useChildMatches,
  useMatch,
  useMatches,
  useRouteContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarRight } from "@/components/sidebar-right";
import { AnyAgent } from "@daydreamsai/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  agent: AnyAgent;
  queryClient: QueryClient;
}>()({
  async loader(ctx) {
    await ctx.context.agent.start();
  },

  component: () => {
    const { queryClient } = Route.useRouteContext();
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SidebarProvider className="font-body">
              <AppSidebar className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
              <SidebarInset className="bg-transparent bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] relative">
                {/* <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-t border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2 px-4">
                  <ModeToggle />
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header> */}
                <Outlet />
              </SidebarInset>
              {/* {matches && (
              <matches.context.SideBar {...matches.context.sidebarProps} />
            )} */}
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>

        {/* <div className="p-2 flex gap-2">
                  {/* <div className="p-2 flex gap-2">
                      <Link to="/" className="[&.active]:font-bold">
                          Home
                      </Link>{" "}
                  </div>
                  <hr />
                  <Outlet />
                  <TanStackRouterDevtools /> */}
      </>
    );
  },
});
