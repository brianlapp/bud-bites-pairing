import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sage-50 border-t border-sage-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sage-500 font-semibold text-lg">CannaPair</h3>
            <p className="text-sage-400 text-sm">
              Discover perfect cannabis and cuisine pairings for an elevated dining experience.
            </p>
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

          <div>
            <h4 className="font-medium text-sage-500 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-sage-400 hover:text-sage-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-sage-400 hover:text-sage-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-sage-400 hover:text-sage-500">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage-200">
          <p className="text-center text-sage-400 text-sm">
            © {new Date().getFullYear()} CannaPair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;