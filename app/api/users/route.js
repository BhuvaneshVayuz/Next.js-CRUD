import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";
const { ObjectId } = require("mongoose").Types;
import bcrypt from "bcryptjs";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error.message, {
      status: 500,
    });
  }
};
export const POST = async (request) => {
  try {
    const body = await request.json();

    // Check if the body contains a password
    if (!body.password) {
      return new NextResponse(JSON.stringify({ message: "Password is required" }), {
        status: 400,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds

    // Create a new user object with the hashed password
    const newUser = new User({
      ...body,
      password: hashedPassword, // Replace the plain password with the hashed password
    });

    // Connect to the database and save the user
    await connect();
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in creating user: " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connect();
    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new username not found" }),
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  try {
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");
    const userHeader = JSON.parse(request.headers.get("X-User"));

    const userId = userHeader.userId;

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "ID not found" }), {
        status: 400,
      });
    }

    if (!ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete(
      new ObjectId(userId)
    );

    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is deleted", user: deletedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting user" + error.message, {
      status: 500,
    });
  }
};
