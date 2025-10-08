import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
// import { Badge } from './ui/badge'
import { Clock, Target, Calendar, TrendingUp } from 'lucide-react'

export function Sidebar() {
  const stats = [
    {
      label: 'Total Items',
      value: '142',
      icon: <Target className="h-4 w-4 text-blue-600" />,
      change: '+12 this week'
    },
    {
      label: 'Deadlines This Week',
      value: '8',
      icon: <Calendar className="h-4 w-4 text-red-600" />,
      change: '3 urgent'
    },
    {
      label: 'Active Buckets',
      value: '5',
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      change: '+1 new'
    }
  ]

  const recentActivity = [
    {
      action: 'Added "Frontend Developer at Vercel"',
      bucket: 'Software Engineering Jobs',
      time: '2 hours ago',
      color: 'bg-blue-500'
    },
    {
      action: 'Updated status to "Interview Scheduled"',
      bucket: 'Software Engineering Jobs',
      time: '4 hours ago',
      color: 'bg-blue-500'
    },
    {
      action: 'Added "React Advanced Patterns Course"',
      bucket: 'Learning Resources',
      time: '1 day ago',
      color: 'bg-orange-500'
    },
    {
      action: 'Created new bucket "Investment Opportunities"',
      bucket: 'General',
      time: '2 days ago',
      color: 'bg-gray-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div className={`w-2 h-2 rounded-full ${activity.color} mt-2 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{activity.bucket}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-gray-900">
            <div>
              <p className="text-sm font-medium text-gray-900">Frontend Developer at Vercel</p>
              <p className="text-xs text-gray-500">Application deadline</p>
            </div>
              2 days
            
          </div>
          <div className="flex items-center justify-between text-gray-900">
            <div>
              <p className="text-sm font-medium text-gray-900">Stanford CS PhD</p>
              <p className="text-xs text-gray-500">Application deadline</p>
            </div>
              2 weeks
            
          </div>
          <div className="flex items-center justify-between text-gray-900">
            <div>
              <p className="text-sm font-medium text-gray-900">React Course Final Project</p>
              <p className="text-xs text-gray-500">Submission deadline</p>
            </div>
              2 weeks
          </div>
        </CardContent>
      </Card>
    </div>
  )
}