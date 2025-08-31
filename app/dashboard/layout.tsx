// app/dashboard/layout.tsx
import Sidebar from "./sidebar/page";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" />
    </div>
  );
}
