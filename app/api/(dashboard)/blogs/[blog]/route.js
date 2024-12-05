import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";


export const GET = async (request, context) => {
  const blogId = context.params.blog; // Get the blogId from the URL parameters
  try {
    // Validate the blogId
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing blogId" }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connect();

    // Fetch the blog directly by blogId
    const blog = await Blog.findById(blogId).populate('category', 'title');

    // Check if the blog exists
    if (!blog) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ blog }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching the blog: " + error.message, {
      status: 500,
    });
  }
};
