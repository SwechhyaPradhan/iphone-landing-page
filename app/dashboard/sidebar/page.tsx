'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* Navigation Buttons */}
      <div className="flex flex-col space-y-2 flex-1 overflow-y-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home size={18} /> Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/form">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <PlusCircle size={18} /> Add Product
          </Button>
        </Link>

        <Link href="/dashboard/postdetail">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <PlusCircle size={18} /> Add Post
          </Button>
        </Link>
      </div>

      {/* Logout Button */}
      {user && (
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 mt-auto"
        >
          <LogOut size={18} /> Logout
        </Button>
      )}
    </aside>
  );
};

export default Sidebar;
