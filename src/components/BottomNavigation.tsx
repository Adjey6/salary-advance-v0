import { User, Grid, Mail } from "lucide-react";

interface BottomNavigationProps {
  activeTab?: "account" | "benefits" | "contact";
}

export const BottomNavigation = ({ activeTab = "benefits" }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around h-20">
        <button 
          className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
            activeTab === "account" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Mi cuenta</span>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
            activeTab === "benefits" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <div className={`flex flex-col items-center gap-1 ${
            activeTab === "benefits" ? "bg-primary/10 rounded-lg px-8 py-2" : ""
          }`}>
            <Grid className="w-6 h-6" />
            <span className="text-xs font-medium">Mis beneficios</span>
          </div>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
            activeTab === "contact" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <Mail className="w-6 h-6" />
          <span className="text-xs font-medium">Contacto</span>
        </button>
      </div>
    </nav>
  );
};
