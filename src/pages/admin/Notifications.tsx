// // src/pages/finance-area/Notifications.tsx
// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { notificationAPI } from '@/services/api'
// import { useAuth } from '@/contexts/AuthContext'
// import { 
//   Bell, 
//   CheckCircle, 
//   AlertCircle, 
//   Info, 
//   XCircle,
//   ArrowLeft,
//   Check,
//   Trash2,
//   LogOut
// } from 'lucide-react'

// interface Notification {
//   notification_id: number
//   type: 'success' | 'info' | 'warning' | 'error'
//   title: string
//   message: string
//   link?: string
//   is_read: boolean
//   created_at: string
// }

// export default function FinanceAreaNotifications() {
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [filter, setFilter] = useState<'all' | 'unread'>('all')

//   useEffect(() => {
//     loadNotifications()
//   }, [])

//   const loadNotifications = async () => {
//     try {
//       setIsLoading(true)
//       const response = await notificationAPI.getAll()
//       setNotifications(response.data.data || [])
//     } catch (error) {
//       console.error('Failed to load notifications:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const markAsRead = async (notificationId: number) => {
//     try {
//       await notificationAPI.markAsRead(notificationId)
//       setNotifications(notifications.map(n => 
//         n.notification_id === notificationId ? { ...n, is_read: true } : n
//       ))
//     } catch (error) {
//       console.error('Failed to mark as read:', error)
//     }
//   }

//   const markAllAsRead = async () => {
//     try {
//       await notificationAPI.markAllAsRead()
//       setNotifications(notifications.map(n => ({ ...n, is_read: true })))
//     } catch (error) {
//       console.error('Failed to mark all as read:', error)
//     }
//   }

//   const deleteNotification = async (notificationId: number) => {
//     try {
//       await notificationAPI.delete(notificationId)
//       setNotifications(notifications.filter(n => n.notification_id !== notificationId))
//     } catch (error) {
//       console.error('Failed to delete notification:', error)
//     }
//   }

//   const getNotificationIcon = (type: string) => {
//     const icons = {
//       success: <CheckCircle className="w-5 h-5 text-green-600" />,
//       info: <Info className="w-5 h-5 text-blue-600" />,
//       warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
//       error: <XCircle className="w-5 h-5 text-red-600" />
//     }
//     return icons[type as keyof typeof icons] || icons.info
//   }

//   const getNotificationBgColor = (type: string, isRead: boolean) => {
//     const opacity = isRead ? '50' : '100'
//     const colors = {
//       success: `bg-green-${opacity}/10`,
//       info: `bg-blue-${opacity}/10`,
//       warning: `bg-yellow-${opacity}/10`,
//       error: `bg-red-${opacity}/10`
//     }
//     return colors[type as keyof typeof colors] || colors.info
//   }

//   const formatTimeAgo = (dateString: string) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

//     if (diffInSeconds < 60) return 'Just now'
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
//     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
//     return date.toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   const filteredNotifications = filter === 'unread' 
//     ? notifications.filter(n => !n.is_read)
//     : notifications

//   const unreadCount = notifications.filter(n => !n.is_read).length

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-red-600 border-b shadow-soft">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img 
//               src="/logo-telkom-akses.png" 
//               alt="Telkom Akses" 
//               className="h-10 w-auto bg-white rounded px-2 py-1"
//               onError={(e) => { e.currentTarget.style.display = 'none' }}
//             />
//             <div>
//               <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
//               <p className="text-sm text-white/90">Notifications</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="text-right">
//               <p className="text-sm font-medium text-white">{user?.name}</p>
//               <p className="text-xs text-white/70">{user?.role?.replace('_', ' ').toUpperCase()}</p>
//             </div>
//             <Button 
//               variant="secondary" 
//               size="sm"
//               onClick={() => {
//                 logout()
//                 navigate('/login')
//               }}
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container max-w-4xl mx-auto px-4 py-8">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/finance-area')}
//           className="mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Dashboard
//         </Button>

//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-3xl font-bold flex items-center gap-2">
//               <Bell className="w-8 h-8" />
//               Notifications
//             </h2>
//             <p className="text-muted-foreground mt-1">
//               {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
//             </p>
//           </div>

//           {unreadCount > 0 && (
//             <Button
//               variant="outline"
//               onClick={markAllAsRead}
//               className="flex items-center gap-2"
//             >
//               <Check className="w-4 h-4" />
//               Mark all as read
//             </Button>
//           )}
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex gap-2 mb-6">
//           <Button
//             variant={filter === 'all' ? 'default' : 'outline'}
//             onClick={() => setFilter('all')}
//             size="sm"
//           >
//             All ({notifications.length})
//           </Button>
//           <Button
//             variant={filter === 'unread' ? 'default' : 'outline'}
//             onClick={() => setFilter('unread')}
//             size="sm"
//           >
//             Unread ({unreadCount})
//           </Button>
//         </div>

//         {/* Notifications List */}
//         {isLoading ? (
//           <Card>
//             <CardContent className="p-12 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading notifications...</p>
//             </CardContent>
//           </Card>
//         ) : filteredNotifications.length === 0 ? (
//           <Card>
//             <CardContent className="p-12 text-center">
//               <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground text-lg font-medium">
//                 {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
//               </p>
//               <p className="text-sm text-muted-foreground mt-2">
//                 {filter === 'unread' 
//                   ? 'All notifications have been read'
//                   : 'Notifications will appear here when you have updates'
//                 }
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="space-y-3">
//             {filteredNotifications.map((notification) => (
//               <Card 
//                 key={notification.notification_id}
//                 className={`transition-all hover:shadow-md ${
//                   !notification.is_read ? 'border-l-4 border-l-primary' : ''
//                 }`}
//               >
//                 <CardContent className="p-4">
//                   <div className="flex items-start gap-4">
//                     {/* Icon */}
//                     <div className={`p-2 rounded-lg ${getNotificationBgColor(notification.type, notification.is_read)}`}>
//                       {getNotificationIcon(notification.type)}
//                     </div>

//                     {/* Content */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2 mb-1">
//                         <h3 className={`font-semibold ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
//                           {notification.title}
//                         </h3>
//                         {!notification.is_read && (
//                           <Badge variant="default" className="shrink-0">New</Badge>
//                         )}
//                       </div>
                      
//                       <p className={`text-sm mb-2 ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
//                         {notification.message}
//                       </p>
                      
//                       <div className="flex items-center gap-3 text-xs text-muted-foreground">
//                         <span>{formatTimeAgo(notification.created_at)}</span>
                        
//                         {notification.link && (
//                           <>
//                             <span>•</span>
//                             {/* <Link 
//                               to={notification.link}
//                               className="text-primary hover:underline"
//                               onClick={() => !notification.is_read && markAsRead(notification.notification_id)}
//                             >
//                               View details
//                             </Link> */}
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       {!notification.is_read && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => markAsRead(notification.notification_id)}
//                           title="Mark as read"
//                         >
//                           <Check className="w-4 h-4" />
//                         </Button>
//                       )}
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => deleteNotification(notification.notification_id)}
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4 text-destructive" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }




// src/pages/finance-area/Notifications.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notificationAPI } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle,
  ArrowLeft,
  Check,
  Trash2,
  LogOut,
  Eye
} from 'lucide-react'

interface Notification {
  notification_id: number
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message: string
  link?: string
  is_read: boolean
  created_at: string
}

export default function FinanceAreaNotifications() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await notificationAPI.getAll()
      setNotifications(response.data.data || [])
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: number) => {
    try {
      await notificationAPI.markAsRead(notificationId)
      setNotifications(notifications.map(n => 
        n.notification_id === notificationId ? { ...n, is_read: true } : n
      ))
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead()
      setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  const deleteNotification = async (notificationId: number) => {
    try {
      await notificationAPI.delete(notificationId)
      setNotifications(notifications.filter(n => n.notification_id !== notificationId))
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  const handleViewDetails = async (notification: Notification) => {
    // Mark as read if unread
    if (!notification.is_read) {
      await markAsRead(notification.notification_id)
    }
    
    // Navigate to link
    if (notification.link) {
      navigate(notification.link)
    }
  }

  const getNotificationIcon = (type: string) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-600" />,
      info: <Info className="w-5 h-5 text-blue-600" />,
      warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
      error: <XCircle className="w-5 h-5 text-red-600" />
    }
    return icons[type as keyof typeof icons] || icons.info
  }

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    const opacity = isRead ? '50' : '100'
    const colors = {
      success: `bg-green-${opacity}/10`,
      info: `bg-blue-${opacity}/10`,
      warning: `bg-yellow-${opacity}/10`,
      error: `bg-red-${opacity}/10`
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.is_read)
    : notifications

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-red-600 border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Akses" 
              className="h-10 w-auto bg-white rounded px-2 py-1"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
              <p className="text-sm text-white/90">Notifications</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/70">{user?.role?.replace('_', ' ').toUpperCase()}</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/finance-area')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
            </h2>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            size="sm"
          >
            Unread ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading notifications...</p>
            </CardContent>
          </Card>
        ) : filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {filter === 'unread' 
                  ? 'All notifications have been read'
                  : 'Notifications will appear here when you have updates'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.notification_id}
                className={`transition-all hover:shadow-md ${
                  !notification.is_read ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${getNotificationBgColor(notification.type, notification.is_read)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        {!notification.is_read && (
                          <Badge variant="default" className="shrink-0">New</Badge>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatTimeAgo(notification.created_at)}</span>
                        
                        {notification.link && (
                          <>
                            <span>•</span>
                            <button 
                              onClick={() => handleViewDetails(notification)}
                              className="text-primary hover:underline font-medium"
                            >
                              View details →
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ✅ Actions - UPDATED */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* PRIMARY: View Details Button */}
                      {notification.link && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleViewDetails(notification)}
                          className="text-xs gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      )}
                      
                      {/* SECONDARY: Mark as Read (only if unread) */}
                      {!notification.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.notification_id)}
                          title="Mark as read"
                          className="text-xs"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.notification_id)}
                        title="Delete notification"
                        className="text-xs hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}