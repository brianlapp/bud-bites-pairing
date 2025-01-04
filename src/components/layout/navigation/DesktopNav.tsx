import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";

interface DesktopNavProps {
  user: any;
  handleLogout: () => void;
}

export const DesktopNav = ({ user, handleLogout }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavItems />
      {user ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className="text-sage-500 hover:text-sage-600 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <User size={16} />
            Profile
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-sage-500 hover:text-sage-600 flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth">
          <Button variant="default" size="sm" className="bg-sage-500 hover:bg-sage-600">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};