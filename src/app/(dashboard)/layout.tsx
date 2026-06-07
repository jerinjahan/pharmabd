"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  Pill,
  Users,
  Truck,
  CreditCard,
  BarChart3,
  Building2,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "POS",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    label: "Wholesale",
    href: "/wholesale",
    icon: ClipboardList,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Package,
    children: [
      { label: "Stock Overview", href: "/inventory" },
      { label: "Batches", href: "/inventory/batches" },
      { label: "Adjustments", href: "/inventory/adjustments" },
    ],
  },
  {
    label: "Procurement",
    href: "/procurement",
    icon: Truck,
    children: [
      { label: "Purchase Orders", href: "/procurement" },
      { label: "New Order", href: "/procurement/new" },
    ],
  },
  {
    label: "Medicines",
    href: "/medicines",
    icon: Pill,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Suppliers",
    href: "/suppliers",
    icon: Building2,
  },
  {
    label: "Accounts",
    href: "/accounts/receivables",
    icon: CreditCard,
    children: [
      { label: "Receivables", href: "/accounts/receivables" },
      { label: "Payables", href: "/accounts/payables" },
    ],
  },
  {
    label: "Reports",
    href: "/reports/sales",
    icon: BarChart3,
    children: [
      { label: "Sales Report", href: "/reports/sales" },
      { label: "Profit & Loss", href: "/reports/profit" },
      { label: "Expiry Report", href: "/reports/expiry" },
      { label: "Mushak / VAT", href: "/reports/mushak" },
    ],
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const isParentActive = (item: (typeof navItems)[0]) => {
    if (isActive(item.href)) return true
    if (item.children) {
      return item.children.some((c) => pathname.startsWith(c.href))
    }
    return false
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0">

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Pill className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-lg">PharmaBD</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isParentActive(item)
            const open = openMenus.includes(item.label) || active

            return (
              <div key={item.label}>
                {item.children ? (
                  // Parent with children — toggle open
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 ml-auto transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  // Single link
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                )}

                {/* Sub items */}
                {item.children && open && (
                  <div className="mt-0.5 ml-4 pl-3 border-l border-gray-100 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                          pathname === child.href
                            ? "text-teal-700 bg-teal-50"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom user area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-semibold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-72">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines, invoices..."
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-semibold">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}