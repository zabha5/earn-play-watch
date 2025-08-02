import { Button } from "@/components/ui/button";
import { Coins, Play, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">WatchEarner</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coins className="w-4 h-4 text-accent" />
              <span>Earn while you watch</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-success" />
              <span>Track your progress</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;