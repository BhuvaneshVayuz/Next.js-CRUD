// "use client";
import "./globals.css";
import StoreProvider from './storeProvider';
import Navbar from "@/components/navbar";
import AuthProvider from "@/components/authProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            <Navbar /> {/* Always show the Navbar */}
            {children} {/* Children will be rendered based on authentication */}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
