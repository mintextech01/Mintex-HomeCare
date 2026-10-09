import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <Card className="w-full max-w-md rounded-[28px] border-0 shadow-sm p-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-accent flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl font-serif">MintexCare Admin</CardTitle>
          <p className="text-sm text-muted-foreground font-sans">Sign in to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Admin Email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} className="font-sans h-12 rounded-xl" />
            <Input type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} className="font-sans h-12 rounded-xl" />
            {error && <p className="text-sm text-destructive font-sans">{error}</p>}
            <Button type="submit" className="w-full h-12 rounded-full font-sans font-semibold bg-foreground text-background hover:bg-foreground/85">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
