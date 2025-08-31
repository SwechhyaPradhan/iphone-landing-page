// app/dashboard/layout.tsx
import Sidebar from "./sidebar/page";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" />
    </div>
  );
}
