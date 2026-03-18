import { Home, Phone, Mail, AlertTriangle, Shield, Book, FileText, Layout, Globe } from "lucide-react";

export interface SidebarLink {
  to: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
  defaultOpen?: boolean;
}

export const categoryPathMap: Record<string, string> = {
  "/hr-topics": "hr",
  "/learning": "learning",
  "/payroll": "payroll",
};

export const categoryMap: Record<string, string[]> = {
  hr: [
    "/phone-scripts",
    "/email-templates",
    "/jira-responses",
    "/security",
    "/glossary",
    "/security-protocol",
  ],
  learning: [
    "/ec-sf-workflows",
    "/call-flow",
    "/decision-tree",
    "/glossary",
    "/phone-scripts",
    "/email-templates",
    "/jira-responses",
    "/security",
  ],
  payroll: ["/payroll-scripts"],
};

export const sidebarSections: SidebarSection[] = [
  {
    title: "Main Categories",
    defaultOpen: true,
    links: [
      { to: "/phone-scripts", label: "Phone Scripts", icon: Phone, count: 24 },
      { to: "/email-templates", label: "Email Templates", icon: Mail, count: 18 },
      { to: "/jira-responses", label: "JIRA Responses", icon: AlertTriangle, count: 32 },
      { to: "/security", label: "Security & Compliance", icon: Shield },
      { to: "/glossary", label: "HR Glossary", icon: Book },
    ],
  },
  {
    title: "Quick Links",
    defaultOpen: true,
    links: [
      { to: "/ec-sf-workflows", label: "EC & SF Workflows", icon: Layout },
      { to: "/call-flow", label: "Call Flow Guide", icon: Phone },
      { to: "/security-protocol", label: "Security Protocol", icon: Shield },
      { to: "/decision-tree", label: "Decision Tree", icon: Layout },
    ],
  },
  {
    title: "Country Filters",
    defaultOpen: false,
    links: [
      { to: "/country/us", label: "United States", icon: Globe },
      { to: "/country/uk", label: "United Kingdom", icon: Globe },
      { to: "/country/de", label: "Germany", icon: Globe },
      { to: "/country/es", label: "Spain", icon: Globe },
    ],
  },
];