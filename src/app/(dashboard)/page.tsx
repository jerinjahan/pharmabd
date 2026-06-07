import { formatBDT } from "@/src/lib/utils"
import {
  TrendingUp,
  ShoppingCart,
  Package,
  AlertTriangle,
  Clock,
  CreditCard,
  Banknote,
} from "lucide-react"

const kpis = [
  {
    label: "Today's Sales",
    value: 84500,
    isBDT: true,
    change: "+12% from yesterday",
    up: true,
    icon: ShoppingCart,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    label: "Today's Profit",
    value: 18200,
    isBDT: true,
    change: "+8% from yesterday",
    up: true,
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Receivables (AR)",
    value: 342000,
    isBDT: true,
    change: "3 overdue accounts",
    up: false,
    icon: CreditCard,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Payables (AP)",
    value: 128000,
    isBDT: true,
    change: "Due in 7 days",
    up: false,
    icon: Banknote,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Low Stock Alerts",
    value: 14,
    isBDT: false,
    change: "items below reorder level",
    up: false,
    icon: Package,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Expiry Alerts",
    value: 7,
    isBDT: false,
    change: "batches within 30 days",
    up: false,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
]

const recentSales = [
  { id: "INV-1042", customer: "Walk-in", type: "Retail", amount: 1250, time: "10 min ago", status: "Paid" },
  { id: "INV-1041", customer: "Dhaka Pharma Ltd", type: "Wholesale", amount: 38500, time: "1 hr ago", status: "Credit" },
  { id: "INV-1040", customer: "Walk-in", type: "Retail", amount: 780, time: "2 hr ago", status: "Paid" },
  { id: "INV-1039", customer: "MedTrade BD", type: "Wholesale", amount: 62000, time: "3 hr ago", status: "Paid" },
  { id: "INV-1038", customer: "Walk-in", type: "Retail", amount: 450, time: "4 hr ago", status: "Paid" },
]

const lowStock = [
  { name: "Napa 500mg", stock: 12, reorder: 50, unit: "strips" },
  { name: "Amlodipine 5mg", stock: 8, reorder: 30, unit: "strips" },
  { name: "Metformin 500mg", stock: 5, reorder: 40, unit: "strips" },
  { name: "Omeprazole 20mg", stock: 18, reorder: 50, unit: "strips" },
  { name: "Azithromycin 500mg", stock: 3, reorder: 20, unit: "strips" },
]

const expiryAlerts = [
  { name: "Amoxicillin 250mg Syrup", batch: "BT-2291", expiry: "2026-07-10", qty: 24 },
  { name: "Insulin Mixtard 30", batch: "BT-2187", expiry: "2026-07-22", qty: 8 },
  { name: "Ceftriaxone 1g Inj", batch: "BT-2304", expiry: "2026-08-01", qty: 15 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Sunday, 7 June 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {kpi.label}
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {kpi.isBDT ? formatBDT(kpi.value) : kpi.value}
                </p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${
                  kpi.up ? "text-green-600" : "text-gray-400"
                }`}>
                  {kpi.up && <TrendingUp className="w-3 h-3" />}
                  {kpi.change}
                </p>
              </div>
              <div className={`${kpi.bg} p-2.5 rounded-lg`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Tables */}
      <div className="grid grid-cols-3 gap-4">

        {/* Recent Sales */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Recent Sales</h2>
            <span className="text-xs text-teal-600 cursor-pointer hover:underline">View all</span>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSales.map((s) => (
              <div key={s.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">{s.id}</p>
                  <p className="text-xs text-gray-500">{s.customer} · {s.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-900">{formatBDT(s.amount)}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    s.status === "Paid"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Low Stock</h2>
            <span className="text-xs text-teal-600 cursor-pointer hover:underline">View all</span>
          </div>
          <div className="divide-y divide-gray-50">
            {lowStock.map((item) => (
              <div key={item.name} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">Reorder at {item.reorder} {item.unit}</p>
                </div>
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Expiry Alerts</h2>
            <span className="text-xs text-teal-600 cursor-pointer hover:underline">View all</span>
          </div>
          <div className="divide-y divide-gray-50">
            {expiryAlerts.map((item) => (
              <div key={item.batch} className="px-5 py-3">
                <div className="flex items-start justify-between">
                  <p className="text-xs font-medium text-gray-900">{item.name}</p>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full ml-2 shrink-0">
                    {item.qty} units
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    Batch {item.batch} · Expires {item.expiry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}