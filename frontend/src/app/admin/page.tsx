"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye,
  MoreHorizontal,
  Plus,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin", active: true },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders", badge: "12" },
  { name: "Products", icon: Package, href: "/admin/products" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

const stats = [
  {
    name: "Total Revenue",
    value: "$124,592",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Total Orders",
    value: "1,429",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Active Users",
    value: "8,942",
    change: "+22.4%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Conversion Rate",
    value: "3.24%",
    change: "-1.2%",
    trend: "down",
    icon: TrendingUp,
  },
]

const recentOrders = [
  {
    id: "ORD-7823",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "MacBook Pro 16\" M3 Max",
    amount: "$3,499",
    status: "Delivered",
    date: "May 21, 2026",
  },
  {
    id: "ORD-7822",
    customer: "Michael Chen",
    email: "michael@example.com",
    product: "iPhone 16 Pro Max",
    amount: "$1,199",
    status: "Processing",
    date: "May 21, 2026",
  },
  {
    id: "ORD-7821",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "AirPods Pro 2nd Gen",
    amount: "$249",
    status: "Shipped",
    date: "May 20, 2026",
  },
  {
    id: "ORD-7820",
    customer: "James Wilson",
    email: "james@example.com",
    product: "PlayStation 5 Slim",
    amount: "$449",
    status: "Pending",
    date: "May 20, 2026",
  },
  {
    id: "ORD-7819",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    product: "Apple Watch Ultra 2",
    amount: "$799",
    status: "Delivered",
    date: "May 19, 2026",
  },
]

const topProducts = [
  { name: "MacBook Pro 16\"", sales: 234, revenue: "$818,466" },
  { name: "iPhone 16 Pro Max", sales: 521, revenue: "$624,879" },
  { name: "AirPods Pro 2", sales: 892, revenue: "$222,108" },
  { name: "PlayStation 5 Slim", sales: 156, revenue: "$70,044" },
  { name: "Apple Watch Ultra 2", sales: 203, revenue: "$162,197" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <span className="text-sm font-bold text-sidebar-primary-foreground">T</span>
              </div>
              <span className="font-bold">TechVault</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge className="bg-sidebar-primary text-sidebar-primary-foreground">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@techvault.com</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 rounded-lg pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">View Store</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here&apos;s an overview of your store.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="7d">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Revenue Chart Placeholder */}
            <div className="lg:col-span-2 rounded-xl border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Revenue Overview</h2>
                <Select defaultValue="revenue">
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="visitors">Visitors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Chart Placeholder */}
              <div className="flex h-64 items-end justify-between gap-2">
                {[40, 65, 45, 75, 55, 85, 70, 90, 60, 80, 95, 75].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-primary/20 transition-all hover:bg-primary/40"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>

            {/* Top Products */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Top Products</h2>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sold
                      </p>
                    </div>
                    <span className="text-sm font-medium">{product.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                      <TableCell className="font-medium">{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Processing"
                              ? "outline"
                              : "destructive"
                          }
                          className={
                            order.status === "Delivered"
                              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                              : ""
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
