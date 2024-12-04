// components/ProtectedLayout.js
"use client";

import AuthProvider from "./authProvider";

export default function ProtectedLayout({ children }) {
  console.log('rannnn');
  
  return (
    <AuthProvider>
      {children}   {/* Only protected routes go here */}
    </AuthProvider>
  );
}
