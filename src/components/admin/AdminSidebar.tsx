import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard" },
  { title: "Donors", url: "/admin/donors" },
  { title: "Volunteers", url: "/admin/volunteers" },
  { title: "Projects", url: "/admin/projects" },
  { title: "Agreements", url: "/admin/agreements" },
  { title: "Legal Centre", url: "/admin/legal" },
  { title: "Payments", url: "/admin/payments" },
  { title: "High-Value Agreements", url: "/admin/high-value-agreements" },
  { title: "Service Console", url: "/admin/service-console" },
  { title: "Contacts", url: "/admin/contacts" },
  { title: "Evidence", url: "/admin/evidence" },
  { title: "Messages", url: "/admin/messages" },
  { title: "AI Panel", url: "/admin/ai" },
  { title: "Presentations", url: "/admin/presentations" },
  { title: "System Health", url: "/admin/system-health" },
  { title: "Documentation", url: "/admin/documentation" },
  { title: "Security", url: "/admin/security" },
  { title: "Privacy & Records", url: "/admin/gdpr" },
  { title: "Branding", url: "/admin/branding" },
  { title: "Testing", url: "/admin/testing" },
  { title: "Launch Prep", url: "/admin/launch-checklist" },
  { title: "System Manual", url: "/admin/manual" },
  { title: "Settings", url: "/admin/settings" },
];

export const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={isCollapsed ? "w-14" : "w-60"}
      collapsible="icon"
      style={{
        backgroundColor: "hsl(219, 71%, 9%)",
      }}
    >
      <div className="p-4 border-b border-white/10">
        <SidebarTrigger className="text-white hover:text-[#C2A878]" />
        {!isCollapsed && (
          <h2 className="mt-4 font-serif text-xl text-white">Admin Console</h2>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-white/70 text-xs uppercase tracking-wider">
              Operations
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      hover:bg-white/10 transition-colors
                      ${isActive(item.url) 
                        ? "bg-[#C2A878]/20 text-[#C2A878] font-medium" 
                        : "text-white"
                      }
                    `}
                  >
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
