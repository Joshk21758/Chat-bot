"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schema";
import { errors } from "jose";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

//Register server action
export async function register(state, formData) {
  //Validate form data
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  //check if email already exists
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        email: "Error retrieving user collection",
      },
    };
  }

  //check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "Email already in use",
      },
    };
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save user to database
  const savedUser = await userCollection.insertOne({
    email: validatedFields.data.email,
    password: hashedPassword,
  });

  //redirect
  redirect("/");
}

//Login server action
export async function login(state, formData) {
  //Validate form data
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check if validation is success
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Extract form data
  const { email, password } = validatedFields.data;

  redirect("/");
}
