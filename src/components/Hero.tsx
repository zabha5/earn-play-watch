import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Coins, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Watch Videos,
                <span className="block text-accent-glow">Earn Rewards</span>
              </h1>
              <p className="text-xl text-white/80 max-w-xl">
                Turn your viewing time into earning time. Watch engaging videos from social media and earn real rewards in RWF, USD, or points.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="success" size="xl" className="group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Earning Now
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm">Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm">Instant payouts</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-3xl animate-float"></div>
            <img 
              src={heroImage} 
              alt="WatchEarner Platform" 
              className="relative z-10 w-full h-auto rounded-2xl shadow-glow"
            />
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <Coins className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">$50K+</div>
              <div className="text-sm text-white/80">Paid Out</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <Play className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm text-white/80">Videos Watched</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <Users className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">15s</div>
              <div className="text-sm text-white/80">Per Video</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;