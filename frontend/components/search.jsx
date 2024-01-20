import Link from "next/link"
import { Input } from "@/components/ui/input"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"

export function search() {
  return (
    (<div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav
          className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#">
            <FuelIcon className="w-6 h-6" />
            <span className="sr-only">Gas Station Finder</span>
          </Link>
          <Link className="font-bold" href="#">
            Home
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Favorites
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Recent Searches
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Profile
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search for gas stations..."
                type="search" />
            </div>
          </form>
        </div>
      </header>
      <main
        className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Search Results</CardTitle>
              <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">Shell</div>
                <HeartIcon className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Location: 1.2 miles away</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Diesel: Available</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gasoline: Available</p>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">Chevron</div>
                <HeartIcon className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Location: 2.5 miles away</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Diesel: Available</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gasoline: Available</p>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">Exxon</div>
                <HeartIcon className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Location: 3.1 miles away</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Diesel: Available</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gasoline: Available</p>
            </CardContent>
          </Card>
          <div className="w-full h-full lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Map View</CardTitle>
                <MapIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="w-full h-full">
                  <BarChart className="w-full aspect-[4/3]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>)
  );
}


function FuelIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0-2-2H6a2 0-2 2v18" />
      <path d="M14 13h2a2 2 0 1 2v2a2 2h0a2 2-2V9.83a2 0-.59-1.42L18 5" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function HeartIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>)
  );
}


function MapIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="3 6 9 15 21 18" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>)
  );
}


function BarChart(props) {
  return (
    (<div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data" />
    </div>)
  );
}
export default search;