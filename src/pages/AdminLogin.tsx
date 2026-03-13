import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-bg p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">MintexCare Admin</CardTitle>
          <p className="text-sm text-muted-foreground font-sans">Sign in to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Username" value={username} onChange={e => { setUsername(e.target.value); setError(""); }} className="font-sans" />
            <Input type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} className="font-sans" />
            {error && <p className="text-sm text-destructive font-sans">{error}</p>}
            <Button type="submit" className="w-full font-sans">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
