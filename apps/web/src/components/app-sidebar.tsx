import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBot,
  IconCloud,
  IconRocket,
  IconTerminal,
} from "@/components/icons";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavAgents } from "@/components/nav-agents";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Brand } from "./brand";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Agents",
      url: "/dashboard/agents",
      icon: IconBot,
    },
    {
      title: "Agent Builder",
      url: "/dashboard/agents/builder",
      icon: IconRocket,
    },
    {
      title: "Deployments",
      url: "/dashboard/deployments",
      icon: IconCloud,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: IconUsers,
    },
  ],
  navAgents: [
    {
      title: "Agent Builder",
      icon: IconBot,
      isActive: true,
      url: "/dashboard/agents/builder",
      items: [
        {
          title: "Create New Agent",
          url: "/dashboard/agents/builder",
        },
        {
          title: "View All Agents",
          url: "/dashboard/agents",
        },
      ],
    },
    {
      title: "Deployments",
      icon: IconRocket,
      url: "/dashboard/deployments",
      items: [
        {
          title: "Active Deployments",
          url: "/dashboard/deployments/active",
        },
        {
          title: "Deploy History",
          url: "/dashboard/deployments/history",
        },
      ],
    },
    {
      title: "Monitoring",
      icon: IconTerminal,
      url: "/dashboard/monitoring",
      items: [
        {
          title: "Logs",
          url: "/dashboard/monitoring/logs",
        },
        {
          title: "Performance",
          url: "/dashboard/monitoring/performance",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Brand />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAgents items={data.navAgents} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
