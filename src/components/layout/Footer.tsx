import { Link } from "react-router-dom";
import { Logo } from "./navigation/Logo";

const Footer = () => {
  return (
    <footer className="bg-sage-50 border-t border-sage-200 relative">
      {/* Wave SVG at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180 -mt-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[120px] text-[#4d3232] fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Logo />
            </div>
            <p className="text-sage-400 text-sm">
              Discover perfect cannabis and cuisine pairings for an elevated dining experience.
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sage-400 hover:text-sage-500 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sage-500 mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/calculator" className="text-sage-400 hover:text-sage-500 text-sm">
                  Dosing Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/budget" className="text-sage-400 hover:text-sage-500 text-sm">
                  Budget Planner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sage-500 mb-4">Games</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/games/tycoon" className="text-sage-400 hover:text-sage-500 text-sm">
                  Cannabis Tycoon
                </Link>
              </li>
              <li>
                <Link to="/games/wordle" className="text-sage-400 hover:text-sage-500 text-sm">
                  Canna Wordle
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage-200">
          <p className="text-center text-sage-400 text-sm">
            © {new Date().getFullYear()} BudBites. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;