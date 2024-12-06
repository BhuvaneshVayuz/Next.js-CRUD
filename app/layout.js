// "use client";
import "./globals.css";
import StoreProvider from './storeProvider';
import Navbar from "@/components/navbar";
import AuthProvider from "@/components/authProvider";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <meta name="google-site-verification" content="M4NDef8uGEJSAOCGy9FAX1iPf_djAw_e2Ntn7GIm_as" />
      </Head>
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
