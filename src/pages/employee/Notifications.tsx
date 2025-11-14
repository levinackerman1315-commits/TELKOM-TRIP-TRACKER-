import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, ArrowLeft, Check, Clock } from 'lucide-react'
import { notificationAPI } from '@/services/api'

type Notif = {
  id: number
  title?: string
  message?: string
  created_at: string
  is_read: boolean
  link?: string | null
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
    setItems(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
  }

  const markAll = async () => {
    await notificationAPI.markAllAsRead()
    setItems(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  const unread = items.filter(i => !i.is_read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <Link to="/employee/dashboard" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <Button variant="secondary" onClick={markAll} disabled={unread === 0}>
              Mark all as read
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-3 max-w-3xl">
        {items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">No notifications</CardContent>
          </Card>
        ) : items.map(n => (
          <Card key={n.id} className={`border ${n.is_read ? '' : 'bg-primary/5 border-primary/20'}`}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="w-4 h-4" />
                {n.title || 'Notification'}
                {!n.is_read && <Badge className="ml-2">New</Badge>}
              </CardTitle>
              {!n.is_read && (
                <Button size="sm" variant="outline" onClick={() => markRead(n.id)}>
                  <Check className="w-4 h-4 mr-1" /> Mark read
                </Button>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm">{n.message || '-'}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <Clock className="w-3 h-3" />
                {new Date(n.created_at).toLocaleString('id-ID')}
              </p>
              {n.link && (
                <div className="pt-3">
                  <Button size="sm" onClick={() => navigate(n.link!)}>Open</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}