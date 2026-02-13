"use client";

import { supabase } from "@/lib/supabaseClient";

export default function GoogleLogin() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="
        w-full
        flex items-center justify-center gap-3
        border border-gray-300
        rounded-lg
        py-3
        font-medium
        bg-white
        hover:bg-gray-50
        transition
        shadow-sm
      "
    >
      {/* Google SVG */}
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.85-6.85C35.91 2.7 30.37 0 24 0 14.64 0 6.4 5.48 2.56 13.44l7.98 6.2C12.4 13.3 17.73 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9h12.69c-.55 2.98-2.22 5.5-4.73 7.18l7.32 5.69C43.99 37.43 46.5 31.52 46.5 24.5z"
        />
        <path
          fill="#FBBC05"
          d="M10.54 28.64A14.5 14.5 0 019.5 24c0-1.6.27-3.15.74-4.6l-7.98-6.2A23.98 23.98 0 000 24c0 3.87.93 7.52 2.56 10.72l7.98-6.08z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.37 0 11.72-2.1 15.63-5.72l-7.32-5.69c-2.03 1.37-4.64 2.17-8.31 2.17-6.27 0-11.6-3.8-13.46-9.14l-7.98 6.08C6.4 42.52 14.64 48 24 48z"
        />
      </svg>

      Continue with Google
    </button>
  );
}
