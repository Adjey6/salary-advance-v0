import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Home } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useEffect, useState } from "react";

const AdvanceSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Simulate processing delay
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Adelanto confirmado</h1>
          <button onClick={() => navigate("/")} className="p-2 hover:bg-primary/80 rounded-lg transition-colors">
            <Home className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            ¡Adelanto confirmado!
          </h2>
          <p className="text-muted-foreground">
            Tu solicitud ha sido procesada exitosamente
          </p>
        </div>

        <Card className="p-6 text-center border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
          <p className="text-sm text-muted-foreground mb-2">Importe adelantado</p>
          <p className="text-5xl font-bold text-accent mb-4">
            {amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </p>
        </Card>

        {!showDetails ? (
          <Card className="p-6 bg-muted/50 animate-pulse">
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-primary animate-spin" />
              <div>
                <p className="text-sm font-medium text-foreground">Procesando transferencia...</p>
                <p className="text-xs text-muted-foreground">Por favor espera un momento</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 border-primary/20 bg-primary/5 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  Transferencia iniciada
                </p>
                <p className="text-xs text-muted-foreground">
                  Los fondos estarán disponibles en tu cuenta en aproximadamente <span className="font-semibold text-primary">2 minutos</span>
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          <Card className="p-4 bg-card">
            <h3 className="font-medium text-sm mb-3 text-foreground">Próximos pasos</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">1.</span>
                <span>Recibirás una notificación cuando el dinero esté disponible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">2.</span>
                <span>El importe se descontará automáticamente de tu próxima nómina</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">3.</span>
                <span>Puedes consultar el estado en "Mis beneficios"</span>
              </li>
            </ul>
          </Card>
        </div>

        <Button 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </Button>
      </div>

      <BottomNavigation activeTab="benefits" />
    </div>
  );
};

export default AdvanceSuccess;
