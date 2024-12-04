import { serialize } from "cookie"; // Install `cookie` package if you haven't
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose"; // Correct imports for `jose`
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET;

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid password" }),
        { status: 400 }
      );
    }

    // Encode the secret key to Uint8Array as required by `jose`
    const secret = new TextEncoder().encode(SECRET_KEY);

    // Create a new JWT with `SignJWT` from `jose`
    const token = await new SignJWT({ userId: user._id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7 day')
      .sign(secret);

    // Create the cookie with the JWT token
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use cookies securely in production
      sameSite: "Strict",
      maxAge: 3600*24, // 1 hour
      path: "/",
    });

    const response = new NextResponse(
      JSON.stringify({ message: "Login successful" }),
      { status: 200 }
    );

    // Set the cookie in the response headers
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error during login", error: error.message }),
      { status: 500 }
    );
  }
};
