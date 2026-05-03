import { Link, usePage } from '@inertiajs/react';
import { FolderKanban, Globe2, Images, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import { index as adminProjectsIndex } from '@/routes/admin/projects';
import { index as publicProjectsIndex } from '@/routes/projects';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Projects',
        href: adminProjectsIndex(),
        icon: FolderKanban,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Website',
        href: home(),
        icon: Globe2,
    },
    {
        title: 'Portfolio',
        href: publicProjectsIndex(),
        icon: Images,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const navItems = auth.user?.is_admin ? adminNavItems : mainNavItems;
    const homeHref = auth.user?.is_admin ? adminProjectsIndex() : dashboard();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
