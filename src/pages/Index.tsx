import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SalaryAdvanceCard } from "@/components/SalaryAdvanceCard";
import { AdvanceHistory } from "@/components/AdvanceHistory";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Info, TrendingUp, CheckCircle, History, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEligible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [earnedSalary, setEarnedSalary] = useState(0);
  const [advanceHistory, setAdvanceHistory] = useState<any[]>([]);
  
  const availableAdvance = earnedSalary * 0.5; // 50% max

  useEffect(() => {
    checkAuth();
    loadUserData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const loadUserData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/login");
      return;
    }

    // Load profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("earned_salary")
      .eq("id", user.id)
      .single();

    if (profile) {
      setEarnedSalary(profile.earned_salary || 0);
    }

    // Load advance history
    const { data: advances } = await supabase
      .from("salary_advances")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (advances) {
      setAdvanceHistory(advances.map(adv => ({
        id: adv.id,
        amount: adv.amount,
        requestDate: adv.request_date,
        repaymentDate: adv.repayment_date,
        status: adv.status
      })));
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleAdvanceRequest = () => {
    if (isEligible) {
      navigate("/amount");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-secondary text-secondary-foreground p-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pluxee</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary/80 rounded-full transition-colors">
              <Info className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-secondary/80 rounded-full transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        ) : (
          <>
            <div className="animate-fade-in">
              <SalaryAdvanceCard 
                earnedSalary={earnedSalary}
                availableAdvance={availableAdvance}
              />
            </div>

        <div className="space-y-4 animate-slide-up">
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleAdvanceRequest}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Solicitar adelanto
          </Button>

          <Card className="p-5 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              Beneficios del adelanto
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Sin intereses ni comisiones ocultas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Transferencia instantánea en minutos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Hasta el 50% de tu salario devengado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Descuento automático en tu próxima nómina</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5 bg-muted/50">
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              ¿Cómo funciona?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Solicita tu adelanto</p>
                  <p className="text-xs text-muted-foreground">Elige el importe que necesitas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Recibe el dinero</p>
                  <p className="text-xs text-muted-foreground">En tu cuenta en minutos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Devolución automática</p>
                  <p className="text-xs text-muted-foreground">Se descuenta de tu próxima nómina</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Historial de adelantos</h2>
          </div>
          <AdvanceHistory advances={advanceHistory} />
        </div>
          </>
        )}
      </div>

      <BottomNavigation activeTab="benefits" />
    </div>
  );
};

export default Index;
