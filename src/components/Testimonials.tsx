import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Kigali, Rwanda",
      rating: 5,
      text: "I've earned over $200 just watching videos in my spare time. WatchEarner is amazing!",
      initials: "SJ",
      earnings: "$247"
    },
    {
      name: "Michael Chen",
      location: "United States",
      rating: 5,
      text: "The referral program is fantastic. I've invited 20 friends and we're all earning together.",
      initials: "MC",
      earnings: "$156"
    },
    {
      name: "Aisha Uwimana",
      location: "Kigali, Rwanda", 
      rating: 5,
      text: "Quick payouts and great customer support. This platform is completely legitimate.",
      initials: "AU",
      earnings: "$89"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who are already earning with WatchEarner
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-border bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-hero text-white font-medium">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{testimonial.earnings}</div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;