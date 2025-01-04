import { Link } from "react-router-dom";

interface NavItemsProps {
  mobile?: boolean;
  onClick?: () => void;
}

export const NavItems = ({ mobile, onClick }: NavItemsProps) => {
  const items = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Games", path: "/games" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={
            mobile
              ? "block px-3 py-2 rounded-md text-base font-medium text-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-colors"
              : "text-sage-500 hover:text-sage-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
          }
          onClick={onClick}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};