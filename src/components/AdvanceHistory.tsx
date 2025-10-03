import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, Clock, CheckCircle } from "lucide-react";

interface Advance {
  id: string;
  amount: number;
  requestDate: string;
  repaymentDate: string;
  status: "completed" | "pending" | "active";
}

interface AdvanceHistoryProps {
  advances: Advance[];
}

export const AdvanceHistory = ({ advances }: AdvanceHistoryProps) => {
  const getStatusBadge = (status: Advance["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completado
          </Badge>
        );
      case "active":
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <Clock className="w-3 h-3 mr-1" />
            Activo
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  if (advances.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <ArrowDownCircle className="w-12 h-12 opacity-50" />
          <p className="text-sm">No has solicitado ningún adelanto aún</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {advances.map((advance) => (
        <Card key={advance.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ArrowDownCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg text-accent">
                  {advance.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </p>
                <p className="text-xs text-muted-foreground">
                  Solicitado el {formatDate(advance.requestDate)}
                </p>
              </div>
            </div>
            {getStatusBadge(advance.status)}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Devolución</span>
            <span className="text-xs font-medium text-foreground">
              {formatDate(advance.repaymentDate)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
