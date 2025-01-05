import { Link } from "react-router-dom";
import { NavItems } from "./NavItems";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
  handleLogout: () => void;
}

export const MobileNav = ({ isOpen, setIsOpen, user, handleLogout }: MobileNavProps) => {
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

  if (!isOpen) return null;

  return (
    <div 
      id="mobile-menu"
      className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavItems mobile onClick={() => setIsOpen(false)} />
        {user ? (
          <>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              role="menuitem"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};