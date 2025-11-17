import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FolderKanban,
  FileCheck,
  MessageSquare,
  Brain,
  Settings,
  Shield,
} from "lucide-react";
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
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Donors", url: "/admin/donors", icon: Users },
  { title: "Volunteers", url: "/admin/volunteers", icon: UserCheck },
  { title: "Projects", url: "/admin/projects", icon: FolderKanban },
  { title: "Evidence", url: "/admin/evidence", icon: FileCheck },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
  { title: "AI Panel", url: "/admin/ai", icon: Brain },
  { title: "Security", url: "/admin/security", icon: Shield },
  { title: "GDPR", url: "/admin/gdpr", icon: Shield },
  { title: "Testing", url: "/admin/testing", icon: Settings },
  { title: "Settings", url: "/admin/settings", icon: Settings },
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
        backgroundColor: "hsl(219, 71%, 9%)", // Deep Navy #05152F
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
                      <item.icon className={`${isCollapsed ? "" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>{item.title}</span>}
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
