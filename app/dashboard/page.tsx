"use client";

import AddBookmark from "@/components/bookmarks/AddBookmark";
import BookmarkList from "@/components/bookmarks/BookmarkList";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState([]);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*");

    if (error) return toast.error("Failed to fetch");

    let sorted = data || [];

    if (sort === "newest")
      sorted.sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );

    if (sort === "oldest")
      sorted.sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );

    if (sort === "az")
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    setBookmarks(sorted);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium">Logout from MarkIt?</p>
        <div className="flex gap-2">
          <button
            className="bg-indigo-600 text-white px-3 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              await supabase.auth.signOut();
              router.push("/");
            }}
          >
            Yes
          </button>

          <button
            className="border px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading]);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user, sort]);

  if (loading) return <p>Loading...</p>;

  // ================= FILTER =================
  const filtered = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const favorites = filtered.filter((b) => b.is_favorite);
  const normal = filtered.filter((b) => !b.is_favorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* HEADER */}
      <header className="backdrop-blur bg-white/70 border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2 text-indigo-600">
            <Bookmark size={22} />
            <h1 className="text-xl font-bold">MarkIt</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-5 rounded-xl shadow">
            <p className="text-sm opacity-80">Total Bookmarks</p>
            <p className="text-3xl font-bold">{bookmarks.length}</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-5 rounded-xl shadow">
            <p className="text-sm opacity-80">Favorites</p>
            <p className="text-3xl font-bold">{favorites.length}</p>
          </div>
        </div>

        {/* SEARCH + SORT */}
        <div className="flex gap-3 mb-5">
          <div className="flex items-center gap-2 px-4 bg-white rounded-xl shadow-sm flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search bookmarks..."
              className="w-full py-3 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-white rounded-xl px-4 shadow-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        <AddBookmark
          user={user}
          refreshBookmarks={fetchBookmarks}
        />

        {/* FAVORITES */}
        {favorites.length > 0 && (
          <>
            <h3 className="font-semibold mb-3 text-yellow-600">
              ⭐ Favorites
            </h3>
            <BookmarkList
              bookmarks={favorites}
              refreshBookmarks={fetchBookmarks}
            />
          </>
        )}

        {/* ALL */}
        <h3 className="font-semibold mt-6 mb-3">
          All Bookmarks
        </h3>

        <BookmarkList
          bookmarks={normal}
          refreshBookmarks={fetchBookmarks}
        />
      </main>
    </div>
  );
}
