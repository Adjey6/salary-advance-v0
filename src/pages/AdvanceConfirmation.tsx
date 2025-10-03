import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, CreditCard, TrendingDown, CheckCircle } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

const AdvanceConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const amount = location.state?.amount || 0;
  
  // Calculate repayment date (next month, 1st day)
  const today = new Date();
  const repaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const formattedDate = repaymentDate.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  const handleConfirm = async () => {
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para continuar",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const { error } = await supabase
      .from("salary_advances")
      .insert({
        user_id: user.id,
        amount,
        repayment_date: repaymentDate.toISOString(),
        status: "active",
      });

    if (error) {
      toast({
        title: "Error al procesar el adelanto",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    navigate("/success", { state: { amount } });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-secondary text-secondary-foreground p-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button onClick={() => navigate("/amount")} className="p-2 hover:bg-secondary/80 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Confirmar adelanto</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
        <Card className="p-8 text-center border-0 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">Recibirás</p>
          <p className="text-5xl font-bold text-accent mb-2">
            {amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </p>
          <p className="text-xs text-muted-foreground">
            Sin comisiones ni intereses
          </p>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Fecha de devolución</p>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Deducción en nómina</p>
                <p className="text-sm text-muted-foreground">
                  {amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Método de pago</p>
                <p className="text-sm text-muted-foreground">Transferencia bancaria instantánea</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-medium text-sm mb-2 text-foreground">Resumen</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Importe solicitado</span>
              <span className="font-medium text-foreground">
                {amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comisiones</span>
              <span className="font-medium text-primary">0,00 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Intereses</span>
              <span className="font-medium text-primary">0,00 €</span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-medium text-foreground">Total a devolver</span>
              <span className="font-bold text-foreground">
                {amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleConfirm}
              disabled={loading}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {loading ? "Procesando..." : "Confirmar adelanto"}
            </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/amount")}
          >
            Modificar importe
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground px-4">
          Al confirmar, aceptas que el importe será descontado de tu próxima nómina. 
          El adelanto no genera intereses ni comisiones.
        </p>
      </div>

      <BottomNavigation activeTab="benefits" />
    </div>
  );
};

export default AdvanceConfirmation;
