"use client";

import BookmarkItem from "./BookmarkItem";

export default function BookmarkList({
  bookmarks,
  refreshBookmarks,
}) {
  if (!bookmarks.length) {
    return <p>No bookmarks yet.</p>;
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          refreshBookmarks={refreshBookmarks}
        />
      ))}
    </div>
  );
}
