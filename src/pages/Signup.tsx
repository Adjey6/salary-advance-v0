import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast({
        title: "Error al crear cuenta",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada correctamente",
      });
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Pluxee</h1>
          <p className="text-muted-foreground">Crea tu cuenta</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <UserPlus className="w-4 h-4 mr-2" />
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
