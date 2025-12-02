
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  ArrowLeft, 
  Check, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react'
import { notificationAPI } from '@/services/api'

type Notif = {
  notification_id: number
  title?: string
  message?: string
  created_at: string
  is_read: boolean
  link?: string | null
  type?: 'success' | 'error' | 'warning' | 'info'
}

export default function Notifications() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Notif[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      setLoading(true)
      const res = await notificationAPI.getAll()
      setItems(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  const markRead = async (id: number) => {
    await notificationAPI.markAsRead(id)
    setItems(prev => prev.map(n => n.notification_id === id ? { ...n, is_read: true } : n))
  }

  const markAll = async () => {
    await notificationAPI.markAllAsRead()
    setItems(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const getNotificationIcon = (notif: Notif) => {
    const title = notif.title?.toLowerCase() || ''
    
    if (title.includes('approved') || title.includes('completed') || title.includes('transferred')) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    }
    if (title.includes('rejected') || title.includes('cancelled')) {
      return <XCircle className="w-5 h-5 text-red-600" />
    }
    if (title.includes('extension') || title.includes('pending')) {
      return <AlertCircle className="w-5 h-5 text-amber-600" />
    }
    if (title.includes('advance') || title.includes('transfer')) {
      return <DollarSign className="w-5 h-5 text-blue-600" />
    }
    if (title.includes('trip')) {
      return <Calendar className="w-5 h-5 text-purple-600" />
    }
    if (title.includes('receipt') || title.includes('settlement')) {
      return <FileText className="w-5 h-5 text-teal-600" />
    }
    
    return <Bell className="w-5 h-5 text-gray-600" />
  }

  const getBorderColor = (notif: Notif) => {
    const title = notif.title?.toLowerCase() || ''
    
    if (title.includes('approved') || title.includes('completed') || title.includes('transferred')) {
      return 'border-l-4 border-l-green-500'
    }
    if (title.includes('rejected') || title.includes('cancelled')) {
      return 'border-l-4 border-l-red-500'
    }
    if (title.includes('extension') || title.includes('pending')) {
      return 'border-l-4 border-l-amber-500'
    }
    
    return 'border-l-4 border-l-blue-500'
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading notifications...</p>
      </div>
    </div>
  )
}

  const unread = items.filter(i => !i.is_read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/employee/dashboard" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Notifications
              </h1>
              {unread > 0 && (
                <p className="text-sm text-white/80 mt-1">
                  You have {unread} unread notification{unread > 1 ? 's' : ''}
                </p>
              )}
            </div>
            {unread > 0 && (
              <Button variant="secondary" onClick={markAll} size="sm">
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-3 max-w-3xl">
        {items.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground mb-1">No notifications</p>
              <p className="text-sm text-muted-foreground">
                You're all caught up! Check back later for updates.
              </p>
            </CardContent>
          </Card>
        ) : (
          items.map(n => (
            <Card 
              key={n.notification_id}
              className={`
                shadow-soft transition-all hover:shadow-md
                ${!n.is_read ? 'bg-primary/5 border-primary/20' : ''}
                ${getBorderColor(n)}
              `}
            >
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3 flex-1">
                  {getNotificationIcon(n)}
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2 mb-1">
                      {n.title || 'Notification'}
                      {!n.is_read && (
                        <Badge variant="default" className="ml-1">
                          New
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {n.message || '-'}
                    </p>
                  </div>
                </div>
                {!n.is_read && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => markRead(n.notification_id)}
                    className="ml-2"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(n.created_at)}
                  </p>
                  {n.link && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        markRead(n.notification_id)
                        navigate(n.link!)
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}