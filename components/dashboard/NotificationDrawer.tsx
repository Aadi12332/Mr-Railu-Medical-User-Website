import { useState } from "react"
import { Bell, X } from "lucide-react"

type Notification = {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

const initialData: Notification[] = [
  {
    id: 1,
    title: "Appointment Confirmed",
    description: "Your session with Dr. Emily Chen is confirmed for today at 2 PM",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Prescription Updated",
    description: "Your prescription has been updated by Dr. Michael Ross",
    time: "10 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Session Completed",
    description: "Your therapy session was successfully completed",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "New Message",
    description: "You have received a message from your therapist",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 5,
    title: "Payment Successful",
    description: "Your payment of $50 has been successfully processed",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 6,
    title: "Upcoming Reminder",
    description: "Reminder: You have an appointment tomorrow at 10 AM",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 7,
    title: "Therapy Plan Updated",
    description: "Your mental health plan has been updated",
    time: "Yesterday",
    read: true,
  },
  {
    id: 8,
    title: "Video Session Link Ready",
    description: "Your video session link is now available",
    time: "Yesterday",
    read: false,
  },
  {
    id: 9,
    title: "Profile Updated",
    description: "Your profile information has been successfully updated",
    time: "2 days ago",
    read: true,
  },
  {
    id: 10,
    title: "New Provider Available",
    description: "A new specialist is available based on your preferences",
    time: "2 days ago",
    read: false,
  },
  {
    id: 11,
    title: "Session Rescheduled",
    description: "Your session has been moved to a new time slot",
    time: "3 days ago",
    read: true,
  },
]

export default function NotificationDrawer() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
  const [notifications, setNotifications] = useState(initialData)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  const filtered =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-md p-2 hover:bg-muted/50 transition-colors"
      >
        <Bell className="size-5 text-foreground" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-0.5 flex h-5 w-5 items-center justify-center rounded-xl bg-gradient-dash text-[11px] font-semibold text-white ring-2 ring-background">
            {unreadCount}
          </span>
        )}
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      <div
        className={`fixed top-0 right-0 h-full pb-5 max-w-[400px] w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>



          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 text-xs rounded-md ${activeTab === "all"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`px-3 py-1 text-xs rounded-md ${activeTab === "unread"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              Unread
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="p-4 pt-0 space-y-3 overflow-y-auto h-[calc(100%-100px)]">
          {filtered.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No notifications
            </p>
          )}

          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => !item.read && handleMarkAsRead(item.id)}
              className={`p-3 rounded-lg border cursor-pointer transition ${item.read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-green-50 border-green-200"
                }`}
            >
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{item.title}</h4>

                {!item.read && (
                  <span className="text-[10px] px-2 py-0.5 bg-green-600 text-white rounded-full">
                    New
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-1">
                {item.description}
              </p>

              <p className="text-[10px] text-gray-400 mt-2">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}