import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Coins, Shield, Users, Timer, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Play,
      title: "Watch & Earn",
      description: "Watch short videos from Instagram, Facebook, and TikTok to earn rewards",
      badge: "Core Feature",
      color: "text-primary"
    },
    {
      icon: Coins,
      title: "Multiple Rewards",
      description: "Earn in RWF, USD, or points - choose what works best for you",
      badge: "Flexible",
      color: "text-accent"
    },
    {
      icon: Timer,
      title: "Quick Earnings",
      description: "Just 15 seconds per video to qualify for rewards",
      badge: "Fast",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Referral Program",
      description: "Invite friends and earn bonus rewards for each successful referral",
      badge: "Bonus",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Advanced security measures to protect your earnings and data",
      badge: "Trusted",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your daily earnings and watch history in real-time",
      badge: "Analytics",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose WatchEarner?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and rewarding. Start earning today with our easy-to-use platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-border bg-gradient-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/5 flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;