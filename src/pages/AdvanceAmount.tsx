import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const AdvanceAmount = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const maxAmount = 840.00; // 50% of earned salary
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (parseFloat(value) <= maxAmount || value === "") {
      setAmount(value);
    }
  };

  const handleContinue = () => {
    if (amount && parseFloat(amount) > 0) {
      navigate("/confirm", { state: { amount: parseFloat(amount) } });
    }
  };

  const setQuickAmount = (percentage: number) => {
    const quickAmount = (maxAmount * percentage / 100).toFixed(2);
    setAmount(quickAmount);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-secondary text-secondary-foreground p-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary/80 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Solicitar adelanto</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
        <Card className="p-6 bg-primary/5 border-2 border-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Adelanto disponible</p>
              <p className="text-4xl font-bold text-primary">
                {maxAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Hasta el 50% de tu salario devengado
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              ¿Cuánto necesitas?
            </label>
            <div className="relative">
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="text-3xl font-bold h-16 pr-12 text-center"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                €
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={() => setQuickAmount(25)}
              className="h-12"
            >
              25%
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setQuickAmount(50)}
              className="h-12"
            >
              50%
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setAmount(maxAmount.toString())}
              className="h-12"
            >
              Máximo
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium text-sm mb-3 text-foreground">Información importante</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Sin comisiones ni intereses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Transferencia instantánea en minutos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Se descontará de tu próxima nómina</span>
            </li>
          </ul>
        </Card>

        <Button 
          size="lg" 
          className="w-full"
          onClick={handleContinue}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Continuar
        </Button>
      </div>

      <BottomNavigation activeTab="benefits" />
    </div>
  );
};

export default AdvanceAmount;
