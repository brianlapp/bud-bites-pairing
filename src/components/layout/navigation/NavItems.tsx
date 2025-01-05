import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavItemsProps {
  mobile?: boolean;
  onClick?: () => void;
}

export const NavItems = ({ mobile, onClick }: NavItemsProps) => {
  if (mobile) {
    return (
      <>
        <Link
          to="/tools/calculator"
          className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
          onClick={onClick}
        >
          Calculator
        </Link>
        <Link
          to="/tools/budget"
          className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
          onClick={onClick}
        >
          Budget Planner
        </Link>
        <Link
          to="/games/wordle"
          className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
          onClick={onClick}
        >
          Wordle
        </Link>
        <Link
          to="/games/tycoon"
          className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
          onClick={onClick}
        >
          Tycoon
        </Link>
        <Link
          to="/contact"
          className="block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
          onClick={onClick}
        >
          Contact
        </Link>
      </>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sage-500 hover:text-sage-600 transition-colors">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[200px]">
              <NavigationMenuLink asChild>
                <Link
                  to="/tools/calculator"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                  onClick={onClick}
                >
                  Calculator
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/tools/budget"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                  onClick={onClick}
                >
                  Budget Planner
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sage-500 hover:text-sage-600 transition-colors">
            Games
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[200px]">
              <NavigationMenuLink asChild>
                <Link
                  to="/games/wordle"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                  onClick={onClick}
                >
                  Wordle
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to="/games/tycoon"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
                  onClick={onClick}
                >
                  Tycoon
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/contact"
              className="text-sage-500 hover:text-sage-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              onClick={onClick}
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};