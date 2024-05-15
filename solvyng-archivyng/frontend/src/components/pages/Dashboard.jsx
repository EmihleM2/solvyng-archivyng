import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useNavigate } from 'react-router-dom';

import {
  ArrowUpRight,
  File,
  Home,
  ListFilter,
  Package2,
  PanelLeft,
  Search,
  Settings,
  AudioLines,
  Bell,
  CameraIcon,
  Clock,
  Folder,
  MoreHorizontal,
  Share2,
  Share2Icon,
  Star,
  VideoIcon,
  UploadCloudIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import useMutation from '../../hooks/useMutation';
import useQuery from '../../hooks/useQuery';
import axiosClient from "../../config/axios";
import { signOut } from 'aws-amplify/auth';

const ErrorText = ({ children, ...props }) => (
  <p className="text-lg text-red-300" {...props}>
    {children}
  </p>
);

export function Dashboard() {
  const [uploadProgress, setUploadProgress] = useState(0);


  // const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const URL = "/images";
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await signOut()
      console.log("Logout works");
      navigate("/login");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  {/* Handle delete Function */ }

  const handleDelete = async (key) => {
    try {
      const response = await axiosClient.delete(`/images/${key}`);
      console.log(response.data);
      // Here you can add code to remove the deleted image from the UI
    } catch (error) {
      console.error(error);
    }
  };



  {/* Handle Upload Function */ }
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL, onUploadProgress: setUploadProgress });

  const [refetch, setRefetch] = useState(0);
  const [error, setError] = useState("");
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const handleUpload = async e => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);

    //  if (!validFileTypes.find((type) => type === file.type)) {
    //    setError("File must be in JPG/PNG format");
    //    return;
    //  }

    const form = new FormData();
    form.append("image", file);

    await uploadImage(form);
  };



  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <LayoutDashboardIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Solvyng Archivyng</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/files"
                  className="flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Folder className="h-5 w-5" />
                  <span className="sr-only"> Files</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Files</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/NotificationEmails"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Notifications</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Star className="h-5 w-5" />
                  <span className="sr-only">Favourites</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Favourites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Clock className="h-5 w-5" />
                  <span className="sr-only">Recent Files</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Recent Files</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Share2Icon className="h-5 w-5" />
                  <span className="sr-only">Shared Files</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Shared Files</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="teal" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Solvyng Archivyng</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Folder className="h-5 w-5" />
                    Files
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Bell className="h-5 w-5" />
                    Notifications
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Star className="h-5 w-5" />
                    Favourites
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Clock className="h-5 w-5" />
                    Recent Files
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={Logo}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {/* Upload Starts here*/}

          <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 text-white">
                <Card
                  x-chunk="dashboard-01-chunk-0"
                  style={{ backgroundColor: "#003366", color: "#ffffff" }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Videos
                    </CardTitle>
                    <VideoIcon className="h-4 w-4 text-muted-foreground text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">350</div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-01-chunk-1"
                  style={{ backgroundColor: "#003366", color: "#ffffff" }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Audios
                    </CardTitle>
                    <AudioLines className="h-4 w-4 text-muted-foreground text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">150</div>
                  </CardContent>
                </Card>
                <Card
                  className="text-white"
                  x-chunk="dashboard-01-chunk-2"
                  style={{ backgroundColor: "#003366", color: "#ffffff" }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Documents
                    </CardTitle>
                    <File className="h-4 w-4 text-muted-foreground text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1000</div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-01-chunk-3"
                  style={{ backgroundColor: "#003366", color: "#ffffff" }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Photos
                    </CardTitle>
                    <CameraIcon className="h-4 w-4 text-muted-foreground text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">65</div>
                  </CardContent>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="teal"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Video
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Audio
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Document
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Photo
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="flex flex-row items-center px-7 ">
                      <CardTitle>Recent Uploads</CardTitle>
                      <Button
                        variant="teal"
                        asChild
                        size="sm"
                        className="ml-auto gap-1"
                      >
                        <Link to="/">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">img</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Options
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {imageUrls?.length > 0 ? (
                            imageUrls.map((url) => (
                              <TableRow key={url}>
                                <TableCell className="hidden sm:table-cell">
                                  <img
                                    alt="image"
                                    className="aspect-square rounded-md object-cover"
                                    src={url}
                                    width="64"
                                    height="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {url.split("/").pop().split("?")[0]}{" "}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="teal"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleDelete(
                                            url.split("/").pop().split("?")[0]
                                          )
                                        }
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  alt="Dummy img"
                                  className="aspect-square rounded-md object-cover"
                                  src="https://placehold.co/600x400" // Replace with your dummy image path
                                  width="64"
                                  height="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                No images available
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-30vh md:h-90vh"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Upload your files here
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can drag and drop your files.
                </p>
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                />
                <label
                  htmlFor="imageInput"
                  variant="teal"
                  className="mt-4 cursor-pointer isLoading={uploading} h-9 rounded-md px-3 inline-block text-primary-foreground hover:bg-primary/90 text-white py-2"
                  style={{ backgroundColor: "#FFA500" }}
                >
                  Upload
                </label>
                {error && <ErrorText>{error}</ErrorText>}
                {uploadError && <ErrorText>{uploadError}</ErrorText>}
                {uploading && <div>Upload progress: {uploadProgress}%</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Dashboard;
