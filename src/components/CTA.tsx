import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <Card className="bg-white/10 border-white/20 backdrop-blur-lg max-w-4xl mx-auto">
          <CardContent className="p-12 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join WatchEarner today and turn your video watching time into real rewards. 
              It's completely free to get started!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="success" size="xl" className="group shadow-success">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="text-sm text-white/70">
                No credit card required • Start earning immediately
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-accent">10</div>
                <div className="text-sm text-white/80">Videos per day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">15s</div>
                <div className="text-sm text-white/80">Minimum watch time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-white/80">Earning opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;