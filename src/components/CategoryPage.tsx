import { Link, useLocation } from "react-router-dom";
import { BookUser, GraduationCap, Landmark, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { categoryPathMap, categoryMap, sidebarSections } from "./layout/Sidebar";

export function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const categoryKey = categoryPathMap[location.pathname];

  if (!categoryKey) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Category Not Found</h2>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  let title = "";
  let description = "";
  let Icon = BookUser;

  switch (categoryKey) {
    case "hr":
      title = "HR Topics";
      description = "Standard procedures, compliance, and employee relations.";
      Icon = BookUser;
      break;
    case "learning":
      title = "Learning & Development";
      description = "Training materials, LMS guides, and development paths.";
      Icon = GraduationCap;
      break;
    case "payroll":
      title = "Payroll & Compensation";
      description = "Payroll cycles, tax information, and banking details.";
      Icon = Landmark;
      break;
  }

  // Aggregate all links relevant to this category
  const validPrefixes = categoryMap[categoryKey] || [];
  const relevantLinks: Array<{ to: string; label: string; icon: LucideIcon; section: string }> = [];

  sidebarSections.forEach((section) => {
    section.links.forEach((link) => {
      // Skip dashboard link in content area
      if (link.to === "/dashboard") return;
      
      const isRelevant = validPrefixes.some((prefix) => link.to.startsWith(prefix));
      if (isRelevant) {
        relevantLinks.push({ to: link.to, label: link.label, icon: link.icon as LucideIcon, section: section.title });
      }
    });
  });

  // Filter links based on search query
  const filteredLinks = relevantLinks.filter(link =>
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-10 flex items-center gap-5 p-6 bg-card rounded-xl border shadow-sm">
        <div className="p-4 bg-primary/10 rounded-full">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search in ${title}...`}
          className="w-full md:w-1/2 lg:w-1/3 pl-10 pr-4 py-2 rounded-lg border bg-card focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link) => {
          const LinkIcon = link.icon;
          const isExternal = link.to.startsWith("http");
          
          const Content = (
             <>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <LinkIcon className="h-6 w-6" />
                  </div>
                  {isExternal && <ArrowRight className="h-4 w-4 text-muted-foreground -rotate-45" />}
                </div>
                <h3 className="font-semibold text-lg mb-2">{link.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Found in {link.section}
                </p>
                <div className="text-sm font-medium text-primary mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                  Access Resource <ArrowRight className="h-4 w-4" />
                </div>
             </>
          );

          if (isExternal) {
            return (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                {Content}
              </a>
            );
          }

          return (
            <Link
              key={link.to}
              to={link.to}
              state={{ from: location.pathname, fromLabel: title }}
              className="group flex flex-col p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {Content}
            </Link>
          );
        })}
      </div>
      
      {filteredLinks.length === 0 && (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg shadow-sm">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold">No Results Found</h3>
          <p className="mt-2">Your search for "<span className="font-medium text-foreground">{searchQuery}</span>" did not return any results in {title}.</p>
          <p className="mt-1 text-sm">Try a different search term or browse the links.</p>
        </div>
      )}
    </div>
  );
}