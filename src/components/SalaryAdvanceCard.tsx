import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface SalaryAdvanceCardProps {
  earnedSalary: number;
  availableAdvance: number;
}

export const SalaryAdvanceCard = ({ earnedSalary, availableAdvance }: SalaryAdvanceCardProps) => {
  return (
    <Card className="p-6 bg-card border-0 shadow-lg animate-scale-in">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Salario devengado</p>
          <p className="text-3xl font-bold text-accent">
            {earnedSalary.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Acumulado hasta hoy
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-foreground font-medium">Adelanto disponible</span>
          <span className="text-xl font-bold text-primary">
            {availableAdvance.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Máximo 50% del salario devengado
        </p>
      </div>
    </Card>
  );
};
