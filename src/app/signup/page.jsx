"use client";

import { useActionState, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { register } from "@/actions/auth";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form action={action}>
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-3xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="m@example.com" />
              {state?.errors?.email && (
                <p className="text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-600">{state.errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
              />
              {state?.errors?.confirmPassword && (
                <p className="text-sm text-red-600">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-password"
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              <Label htmlFor="show-password">Show password</Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="reg-btn" disabled={isPending}>
              {isPending ? "Loading..." : "Sign Up"}
            </button>
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
