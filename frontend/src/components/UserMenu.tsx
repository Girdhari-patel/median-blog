 // components/UserMenu.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avator } from "./BlogCard";

export default function UserMenu({ user }: { user: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile Image */}
    <Avator name={user} />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Settings
          </button>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
