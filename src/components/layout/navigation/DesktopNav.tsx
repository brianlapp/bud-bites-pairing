import { Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DesktopNavProps {
  user: any;
  handleLogout: () => void;
}

export const DesktopNav = ({ user, handleLogout }: DesktopNavProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        const { data: adminRole } = await supabase
          .from('admin_roles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        setIsAdmin(!!adminRole);
      };

      checkAdminStatus();
    }
  }, [user]);

  return (
    <div 
      className="hidden md:flex items-center space-x-8"
      role="navigation"
      aria-label="Desktop navigation"
    >
      <NavItems />
      {user ? (
        <div className="flex items-center space-x-4" role="menu">
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sage-500 hover:text-sage-600 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sage-500"
              role="menuitem"
            >
              <LayoutDashboard size={16} aria-hidden="true" />
              <span>Admin</span>
            </Link>
          )}
          <Link
            to="/profile"
            className="text-sage-500 hover:text-sage-600 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sage-500"
            role="menuitem"
          >
            <User size={16} aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-sage-500 hover:text-sage-600 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sage-500"
            role="menuitem"
          >
            <LogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </Button>
        </div>
      ) : (
        <Link to="/auth">
          <Button 
            variant="default" 
            size="sm" 
            className="bg-sage-500 hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-500"
          >
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};