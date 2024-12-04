// app/layout.js
"use client"
import "./globals.css";
import { usePathname } from 'next/navigation';
import StoreProvider from './storeProvider';
import Navbar from "@/components/navbar";
import ProtectedLayout from "@/components/protectedLayout";

const publicRoutes = ['/login', '/signup'];
const routesWithNavbar = ["/blogs", "/categories", "/anotherRoute"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);
  const showNavbar = routesWithNavbar.some(route => pathname.includes(route));




  return (
    <html lang="en">
      <body>
        <StoreProvider>
        {showNavbar && <Navbar />} 
          {isPublicRoute ? children : <ProtectedLayout>{children}</ProtectedLayout>}
        </StoreProvider>
      </body>
    </html>
  );
}
