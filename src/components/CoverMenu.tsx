import { Link } from "react-router-dom";
import { BookUser, GraduationCap, Landmark, Lock } from "lucide-react";

const categories = [
  {
    title: "HR Topics",
    description: "Standard procedures and compliance.",
    icon: BookUser,
    path: "/hr-topics",
  },
  {
    title: "Learning",
    description: "Training, LMS, and development guides.",
    icon: GraduationCap,
    path: "/learning",
  },
  {
    title: "Payroll",
    description: "Compensation, tax queries, and banking scripts.",
    icon: Landmark,
    path: "/payroll",
  },
];

export function CoverMenu() {
  return (
    <div className="bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to HR ScriptWiki</h1>
        <p className="text-lg text-muted-foreground">Your departmental gateway for HR resources.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              to={category.path}
              key={category.title}
              className="group bg-card p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-left border"
            >
              <Icon className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-card-foreground mb-2">{category.title}</h2>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <span className="font-semibold text-primary group-hover:underline">
                Explore Section &rarr;
              </span>
            </Link>
          );
        })}
      </div>
      <Link to="/admin" className="fixed bottom-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-50">
        <Lock className="h-4 w-4" />
        Admin Access
      </Link>
    </div>
  );
}