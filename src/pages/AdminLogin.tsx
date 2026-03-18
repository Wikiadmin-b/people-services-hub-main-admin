import { Layout } from "@/components/layout/Layout";
import { Lock, User, Key, LogIn, Edit, Save, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const location = useLocation();
  const { from, fromLabel } = location.state || { from: "/", fromLabel: "Home" };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editableContent, setEditableContent] = useState("Welcome to People Services Hub. How can we help you today?");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - in a real app, this would validate against a backend
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      toast({ title: "Login Successful", description: "Welcome back, Admin." });
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials.", variant: "destructive" });
    }
  };

  const handleSave = () => {
    // Mock save logic - in a real app, this would persist to a backend
    toast({ title: "Saved", description: "Content updated successfully." });
  };

  return (
    <Layout>
      <Link to={from} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {fromLabel}
      </Link>
      
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-card rounded-lg shadow-md p-8 border border-border">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
              <p className="text-muted-foreground text-center mt-2">
                Please sign in to manage content
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-success-light p-3 rounded-full">
                <Edit className="h-6 w-6 text-success" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
                <p className="text-muted-foreground">Edit website content and configurations</p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Log Out
            </button>
          </div>

          <div className="grid gap-6">
            <div className="bg-card rounded-lg shadow-md p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Homepage Text</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="welcome-text">
                    Welcome Message
                  </label>
                  <textarea
                    id="welcome-text"
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminLogin;