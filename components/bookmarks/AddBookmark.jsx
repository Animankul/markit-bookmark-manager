"use client";

import { supabase } from "@/lib/supabaseClient";
import { Link2, Type } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddBookmark({ user, refreshBookmarks }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      return toast.error("All fields required");
    }

    setLoading(true);

    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: user.id }]);

    setLoading(false);

    if (error) return toast.error("Failed to add");

    toast.success("Bookmark added");

    setTitle("");
    setUrl("");
    refreshBookmarks();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mb-6
        p-4
        bg-white
        border border-gray-100
        rounded-xl
        shadow-sm
        flex flex-col md:flex-row gap-3
      "
    >
      {/* TITLE INPUT */}
      <div className="flex items-center gap-2 border rounded-lg px-3 flex-1 focus-within:ring-2 focus-within:ring-indigo-500">
        <Type size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-2 outline-none"
        />
      </div>

      {/* URL INPUT */}
      <div className="flex items-center gap-2 border rounded-lg px-3 flex-1 focus-within:ring-2 focus-within:ring-indigo-500">
        <Link2 size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full py-2 outline-none"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          bg-indigo-600
          text-white
          px-6
          rounded-lg
          hover:bg-indigo-700
          transition
          disabled:opacity-60
        "
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
