import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { CoverMenu } from "../CoverMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isCategoryPage = ["/hr-topics", "/learning", "/payroll"].includes(location.pathname);

  // The cover menu is shown on the root path, and it has a different layout.
  if (location.pathname === "/") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <CoverMenu />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {isCategoryPage && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              &larr; Back to Home
            </Link>
          )}
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
