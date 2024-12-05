import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const searchKeywords = searchParams.get("keywords");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Connect to the database
    await connect();

    // Initialize the filter without user-related conditions
    const filter = {};

    // Add category filter if categoryId is provided and valid
    if (categoryId) {
      if (!Types.ObjectId.isValid(categoryId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid categoryId" }),
          { status: 400 }
        );
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        return new NextResponse(
          JSON.stringify({ message: "Category not found" }),
          { status: 404 }
        );
      }

      filter.category = new Types.ObjectId(categoryId);
    }

    // Add search keyword filter
    if (searchKeywords) {
      filter.$or = [
        {
          title: { $regex: searchKeywords, $options: "i" },
        },
        {
          description: { $regex: searchKeywords, $options: "i" },
        },
      ];
    }

    // Add date range filter
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }

    // Pagination logic
    const skip = (page - 1) * limit;

    // Fetch blogs and populate the category details (specifically the title)
    const blogs = await Blog.find(filter)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(limit)
      .populate('category', 'title'); // Populate category title

    return new NextResponse(JSON.stringify({ blogs }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching blogs: " + error.message, {
      status: 500,
    });
  }
};




// export const POST = async (request) => {
//   try {
//     const { searchParams } = new URL(request.url);
//     // const userId = searchParams.get("userId");
//     const categoryId = searchParams.get("categoryId");

//     const userHeader = JSON.parse(request.headers.get("X-User"));

//     const userId = userHeader.userId;


//     const body = await request.json();
//     const { title, description } = body;

//     if (!userId || !Types.ObjectId.isValid(userId)) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invalid or missing userId" }),
//         { status: 400 }
//       );
//     }

//     if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invalid or missing categoryId" }),
//         { status: 400 }
//       );
//     }

//     await connect();

//     const user = await User.findById(userId);
//     if (!user) {
//       return new NextResponse(JSON.stringify({ message: "User not found" }), {
//         status: 404,
//       });
//     }
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return new NextResponse(
//         JSON.stringify({ message: "Category not found" }),
//         {
//           status: 404,
//         }
//       );
//     }

//     const newBlog = new Blog({
//       title,
//       description,
//       user: new Types.ObjectId(userId),
//       category: new Types.ObjectId(categoryId),
//     });

//     await newBlog.save();
//     return new NextResponse(
//       JSON.stringify({ message: "Blog is created", blog: newBlog }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new NextResponse("Error in fetching blogs" + error.message, {
//       status: 500,
//     });
//   }
// };
