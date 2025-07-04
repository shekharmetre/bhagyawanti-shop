// app/login/page.tsx
import Link from "next/link";
import { LogIn, Mail, Lock } from "lucide-react";
import { SigninButton, GoogleSubmitButton } from "@/lib/client-component";
import { login } from "../action";
import { redirect } from "next/navigation";
import Form from "next/form";
export default function LoginPage({ searchParams }: { searchParams?: { redirect?: string } }) {
  const redirectTo = searchParams?.redirect || '/';

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md h-full">
        <div className="text-center mb-20">
          <Link href="/" className="inline-block">
            <LogIn className="h-12 w-12 text-blue-500" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Please sign in to your account</p>
        </div>

        <Form action={login}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 space-y-6"
        >
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 mr-2"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
              Forgot password?
            </Link>
          </div>

          <SigninButton />
        </Form>

        <div className="mt-6">
          <GoogleSubmitButton />
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-400 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
