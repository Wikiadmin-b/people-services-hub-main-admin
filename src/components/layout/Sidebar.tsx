import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { categoryPathMap, categoryMap, sidebarSections, SidebarLink, SidebarSection } from "./sidebarConfig"; 
export { categoryPathMap, categoryMap, sidebarSections };
export type { SidebarLink, SidebarSection };

function SidebarSectionComponent({ section }: { section: SidebarSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);
  const location = useLocation();

  const category = categoryPathMap[location.pathname];

  let links = section.links;

  if (category && categoryMap[category]) {
    if (section.title === "Main Categories" || section.title === "Quick Links") {
      links = section.links.filter((link) => {
        return categoryMap[category].some((catLink) =>
          link.to.startsWith(catLink)
        );
      });
    } else if (section.title === "Country Filters") {
      // Hide country filters when a category is selected for now
      links = [];
    }
  }


  // Hide section if no links are visible after filtering
  if (links.length === 0) return null;

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2 hover:text-foreground transition-colors"
      >
        {section.title}
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-1 animate-fade-in">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            const isExternal = link.to.startsWith("http");

            if (isExternal) {
              return (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all",
                    "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{link.label}</span>
                  {link.count !== undefined && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                </a>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{link.label}</span>
                {link.count !== undefined && (
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-[57px] md:top-[57px] left-0 h-[calc(100vh-57px)] w-72 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-sidebar-border">
          <span className="font-semibold">Menu</span>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {sidebarSections.map((section) => (
            <SidebarSectionComponent key={section.title} section={section} />
          ))}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 left-4 md:hidden z-30 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
