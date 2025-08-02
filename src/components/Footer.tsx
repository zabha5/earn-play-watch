import { Play, Mail, Shield, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">WatchEarner</span>
            </div>
            <p className="text-background/70 text-sm">
              Turn your viewing time into earning time with our secure and rewarding platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Referral Program</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm text-background/70">
          <p>&copy; 2024 WatchEarner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;