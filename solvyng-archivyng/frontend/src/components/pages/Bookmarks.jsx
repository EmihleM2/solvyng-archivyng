import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "../pages/Navbar";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  if (!bookmarks || bookmarks.length === 0) {
    return <p>No bookmarks found</p>;
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookmarks.map((url) => (
            <Card key={url} className="rounded-lg">
              <CardContent>
                <img
                  src={url}
                  alt="Bookmarked File"
                  className="w-full h-50 aspect-square rounded-md object-cover"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm">
                    {url.split("/").pop().split("?")[0]}
                  </p>{" "}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
