import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/3fa6f999-491e-425c-8394-a740a242bc58.png" 
        alt="BudBites Logo" 
        className="h-8 w-8"
      />
      <Link to="/" className="text-sage-500 font-semibold text-xl">
        BudBites
      </Link>
    </div>
  );
};