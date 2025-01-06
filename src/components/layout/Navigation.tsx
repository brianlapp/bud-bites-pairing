import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./navigation/Logo";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <nav 
      className="fixed top-0 w-full bg-white/80 dark:bg-sage-900/80 backdrop-blur-md z-50 border-b border-sage-200 dark:border-sage-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          {/* Mobile menu button - positioned absolutely */}
          <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sage-500 dark:text-sage-400 hover:text-sage-600 dark:hover:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 rounded-md"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
          
          {/* Logo centered container */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Logo />
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <DesktopNav user={user} handleLogout={handleLogout} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <MobileNav 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navigation;