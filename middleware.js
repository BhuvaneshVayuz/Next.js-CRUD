import { jwtVerify } from "jose";  // Correct import from `jose`
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req) => {
  const token = req.cookies.get("token");

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Authorization token is missing" }),
      { status: 401 }
    );
  }

  try {
    // Convert SECRET_KEY to a Uint8Array for jose's verify method
    const secret = new TextEncoder().encode(SECRET_KEY);

    // Verify the token with `jose` using jwtVerify (this is asynchronous)
    const { payload } = await jwtVerify(token.value, secret);

    // Add decoded user info to a custom header
    const response = NextResponse.next();
    response.headers.set("X-User", JSON.stringify(payload));  // Set the user info in a custom header
    
    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid or expired token" }),
      { status: 401 }
    );
  }
};

export default authMiddleware;

export const config = {
  matcher: ['/api/categories/:path', '/api/categories/add'   , '/api/blogs/:path/delete','/api/blogs/:path/edit','/api/blogs/add', '/api/auth/getUser'], // specify the paths where this middleware applies
};
