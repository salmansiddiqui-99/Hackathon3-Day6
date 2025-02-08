import { ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-gray-50 text-green-600 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo/Text */}
        <h1 className="text-2xl font-bold font-sans">Q-FURNITURES</h1>

        {/* Right side - Icons */}
        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
