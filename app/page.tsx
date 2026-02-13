"use client";

import GoogleLogin from "@/components/auth/GoogleLogin";
import useAuth from "@/hooks/useAuth";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading...
      </p>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px] text-center animate-fadeIn border border-gray-100">
        
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-3 rounded-xl">
            <Bookmark size={32} className="text-indigo-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-indigo-600">
          MarkIt
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          Save. Organize. Access anywhere.
        </p>

        {/* GOOGLE LOGIN */}
        <GoogleLogin />

        <p className="text-xs text-gray-400 mt-6">
          Sign in using your Google account
        </p>
      </div>
    </main>
  );
}
