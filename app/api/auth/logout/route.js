import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Remove the token by clearing the cookie
    const response = new NextResponse(
      JSON.stringify({ message: "Logout successful" }),
      { status: 200 }
    );

    // Clear JWT token stored in cookie (assuming it's stored in 'token' cookie)
    response.headers.set("Set-Cookie", "token=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict; Secure");

    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error during logout", error: error.message }),
      { status: 500 }
    );
  }
};
