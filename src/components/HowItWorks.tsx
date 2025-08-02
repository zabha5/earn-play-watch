import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Play, Eye, DollarSign } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Sign Up",
      description: "Create your free account with email or Google in seconds"
    },
    {
      icon: Play,
      step: "02", 
      title: "Watch Videos",
      description: "Browse and watch engaging videos from social media platforms"
    },
    {
      icon: Eye,
      step: "03",
      title: "Earn Points",
      description: "Watch for at least 15 seconds to earn rewards for each video"
    },
    {
      icon: DollarSign,
      step: "04",
      title: "Cash Out",
      description: "Request payouts after referring 10 friends to unlock withdrawals"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in 4 simple steps and begin earning rewards today
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center group hover:shadow-medium transition-all duration-300 bg-background border-border">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="hero" size="xl" className="shadow-glow">
            <Play className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;