import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

import {
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

export function Dashboard() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
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
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Folder className="h-5 w-5" />
                  <span className="sr-only"> My Drive</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">My Drive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
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
                <Button size="icon" variant="outline" className="sm:hidden">
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
                    <span className="sr-only">Solvyng Archibvyng</span>
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
                    My Drive
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
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Videos
                    </CardTitle>
                    <VideoIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">350</div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Audios
                    </CardTitle>
                    <AudioLines className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">150</div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Documents
                    </CardTitle>
                    <File className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1000</div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Photos
                    </CardTitle>
                    <CameraIcon className="h-4 w-4 text-muted-foreground" />
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
                          variant="outline"
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
                    <CardHeader className="px-7">
                      <CardTitle>Recent Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Format
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Share
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Size
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              Audio_009.mp3
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {/* {" "} */}
                                <AudioLines />
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Share2 />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              3 MB
                            </TableCell>
                            <TableCell className="h-5 w-5">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="plain"
                                    size="none"
                                    className="h-5 w-5"
                                  >
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                  <DropdownMenuCheckboxItem checked>
                                    Video
                                  </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              Video_009.mp4
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {/* {" "} */}
                                <VideoIcon />
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Share2 />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              12 MB
                            </TableCell>
                            <TableCell className="h-5 w-5">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="plain"
                                    size="none"
                                    className="h-5 w-5"
                                  >
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuCheckboxItem checked>
                                    Video
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              solvyng.pdf
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {/* {" "} */}
                                <File />
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Share2 />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              3 MB
                            </TableCell>
                            <TableCell className="h-5 w-5">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="plain"
                                    size="none"
                                    className="h-5 w-5"
                                  >
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuCheckboxItem checked>
                                    Video
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              Video_009.mp4
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {/* {" "} */}
                                <VideoIcon />
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Share2 />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              12 MB
                            </TableCell>
                            <TableCell className="h-5 w-5">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="plain"
                                    size="none"
                                    className="h-5 w-5"
                                  >
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  {" "}
                                  <div className="flex flex-col">
                                    {" "}
                                    <DropdownMenuCheckboxItem checked>
                                      Video
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                    <DropdownMenuItem>View</DropdownMenuItem>
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {/* Upload Starts here*/}
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row justify-center bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg ">
                    Upload Files
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm flex items-center justify-center min-h-64">
                <button
                  type="button"
                  className="px-4 py-2 bg-custom-blue text-white font-bold rounded hover:bg-blue-600 p-5"
                >
                  <UploadCloudIcon />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Dashboard;
