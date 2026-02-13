"use client";

import { supabase } from "@/lib/supabaseClient";
import {
  Check,
  Copy,
  ExternalLink,
  Pencil,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BookmarkItem({
  bookmark,
  refreshBookmarks,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);

  const deleteBookmark = async () => {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);

    toast.success("Deleted");
    refreshBookmarks();
  };

  const toggleFavorite = async () => {
    await supabase
      .from("bookmarks")
      .update({ is_favorite: !bookmark.is_favorite })
      .eq("id", bookmark.id);

    refreshBookmarks();
  };

  const saveEdit = async () => {
    await supabase
      .from("bookmarks")
      .update({ title, url })
      .eq("id", bookmark.id);

    toast.success("Updated");
    setEditing(false);
    refreshBookmarks();
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {bookmark.favicon && (
          <img
            src={bookmark.favicon}
            className="w-6 h-6 rounded"
          />
        )}

        {editing ? (
          <div className="flex flex-col gap-1">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-2"
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border rounded px-2 text-sm"
            />
          </div>
        ) : (
          <div>
            <h3 className="font-semibold">{bookmark.title}</h3>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-sm text-indigo-600 flex gap-1"
            >
              Open <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        {editing ? (
          <>
            <button onClick={saveEdit}>
              <Check size={18} />
            </button>
            <button onClick={() => setEditing(false)}>
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <Star
              size={18}
              onClick={toggleFavorite}
              className={
                bookmark.is_favorite
                  ? "text-yellow-500 fill-yellow-400"
                  : "text-gray-400"
              }
            />

            <Pencil
              size={18}
              className="text-gray-400"
              onClick={() => setEditing(true)}
            />

            <Copy
              size={18}
              onClick={() => {
                navigator.clipboard.writeText(bookmark.url);
                toast.success("Copied");
              }}
            />

            <Trash2
              size={18}
              className="text-gray-400 hover:text-red-500"
              onClick={deleteBookmark}
            />
          </>
        )}
      </div>
    </div>
  );
}
