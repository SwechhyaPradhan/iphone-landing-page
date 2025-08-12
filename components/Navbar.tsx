'use client'
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [{id:1, label:"Products"}, {id: 2, label:"About Us"}, {id:3, label:"Blog"}, {id:4, label:"Contact Us"}];

  return (
    <header className=" sticky top-0 z-50 md:mx-10 mb-10 flex justify-center mt-4 px-2 ">
      <div className="w-full  bg-white rounded-3xl shadow-md px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/">
        <h4 className="text-black">E-Product</h4>
        </Link>

        {/* Center - Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link,index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-gray-700 hover:text-black font-medium transition "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right - Cart Icon */}
        <div className="hidden md:block">
          <ShoppingCart className="w-6 h-6 text-gray-800 cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] bg-white rounded-3xl shadow-md p-6 md:hidden">
          <ul className="space-y-4 text-gray-700 font-medium text-center">
            {navLinks.map((link,index) => (
              <li key={link.id}>
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-gray-700 hover:text-black font-medium transition "
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex justify-center pt-2">
              <ShoppingCart className="w-5 h-5 text-gray-800" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
