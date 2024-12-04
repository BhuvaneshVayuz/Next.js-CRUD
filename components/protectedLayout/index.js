// components/ProtectedLayout.js
"use client";

import AuthProvider from "../authProvider";


export default function ProtectedLayout({ children }) {
  
  return (
    <AuthProvider>
      {children}   {/* Only protected routes go here */}
    </AuthProvider>
  );
}
