import React, { useState, useEffect } from "react";
import useQuery from "../../hooks/useQuery.js";
import NavBar from "../pages/Navbar.jsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Share2,
  Share2Icon,
  MoreVertical,
  Bookmark,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axiosClient from "../../config/axios";

const URL = "/images";

const handleDelete = async (key) => {
  try {
    const response = await axiosClient.delete(`/images/${key}`);
    console.log(response.data);
    // Remove the deleted image from the state
    setRefetch((prevRefetch) => prevRefetch + 1);
  } catch (error) {
    console.error(error);
  }
};

const Files = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [refetch, setRefetch] = useState(0);
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const clearBookmarks = () => {
    setBookmarks([]); // Clear the bookmarks state
    localStorage.setItem("bookmarks", JSON.stringify([])); // Update the local storage
  };

  if (imagesLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError.message}</div>;

  const toggleBookmark = (url) => {
    if (!bookmarks.includes(url)) {
      setBookmarks([...bookmarks, url]); // Add bookmark only if it's not already bookmarked
    }
  };

  const removeBookmark = (url) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== url)); // Remove bookmark
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center p-6 ml-10">
        <Button onClick={clearBookmarks}>Clear all bookmarks</Button>
      </div>
      <div className="flex justify-center items-center p-6 ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.length > 0 ? (
            imageUrls.map((url) => (
              <Card key={url} className="rounded-lg">
                <CardHeader></CardHeader>
                <CardContent>
                  <img
                    src={url}
                    alt="Uploaded File"
                    className="w-full h-50 aspect-square rounded-md object-cover"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">
                      {url.split("/").pop().split("?")[0]}
                    </p>{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(url); // Toggle bookmark for this URL
                      }}
                    >
                      <Bookmark
                        fill={bookmarks.includes(url) ? "blue" : "white"}
                        className="h-4 w-4 m-4"
                      />
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(url); // Remove bookmark for this URL
                      }}
                    >
                      <Trash className="h-4 w-4 m-4" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          className="bg-transparent hover:bg-transparent"
                        >
                          <MoreVertical className="h-4 w-4 text-black" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(url.split("/").pop().split("?")[0])
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No files found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
