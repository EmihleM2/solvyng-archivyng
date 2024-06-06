import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NavBar from "../pages/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { BookmarkX, Search } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";


const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const removeBookmark = (url) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== url);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    toast.success("Bookmark removed", {
      position: "bottom-right",
      autoClose: 4000,
    });
  };

  // Filter bookmarks based on the search term
  const filteredBookmarks = bookmarks.filter((url) =>
    url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="relative w-full md:w-[200px] lg:w-[336px]">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <div className="flex justify-center items-center p-6 ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((url) => (
              <Card key={url} className="rounded-lg">
                <CardHeader> </CardHeader>

                <CardContent>
                  <img
                    src={url}
                    alt="Bookmarked File"
                    className="w-full h-50 aspect-square rounded-md object-cover"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">
                      {url.split("/").pop().split("?")[0]}
                    </p>
                    <BookmarkX
                      onClick={() => removeBookmark(url)}
                      fill="white"
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No bookmarks found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
