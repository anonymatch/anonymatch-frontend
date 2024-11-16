// components/BottomNavigation.jsx
import Link from "next/link";
import { Home, MessageSquare, User } from "lucide-react";

const BottomNavigation = ({ activePath }) => {
  const navLinks = [
    {
      label: "Home",

      icon: <Home className="h-6 w-6" />,

      path: "/main-home",
    },
    {
      label: "Chats",
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/main-chats",
    },
    {
      label: "Profile",
      icon: <User className="h-6 w-6" />,
      path: "/main-profile",
    },
  ];

  return (
    <div className="sticky bottom-0 bg-white border-t">
      <div className="flex justify-around p-3">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`flex flex-col items-center ${
              activePath === link.path
                ? "text-[#FF4081]"
                : "text-gray-500 hover:text-[#FF4081]"
            }`}
          >
            {link.icon}
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
