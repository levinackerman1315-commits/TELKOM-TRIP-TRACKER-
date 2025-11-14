import { TripStatus, TripStatusHistory } from '@/types/trips'
import { CheckCircle2, Circle, XCircle } from 'lucide-react'

interface TripStatusTrackerProps {
  currentStatus: TripStatus;
  history: TripStatusHistory[];
}

const statusSteps: { status: TripStatus; label: string }[] = [
  { status: 'submitted', label: 'Submitted' },
  { status: 'area_review', label: 'Finance Area Review' },
  { status: 'regional_review', label: 'Finance Regional Review' },
  { status: 'completed', label: 'Completed' },
];

export function TripStatusTracker({ currentStatus, history }: TripStatusTrackerProps) {
  const isRejected = currentStatus === 'rejected'
  const currentStepIndex = isRejected ? -1 : statusSteps.findIndex(s => s.status === currentStatus)
  const isStepCompleted = (i: number) => !isRejected && (i < currentStepIndex || currentStatus === 'completed')
  const isStepCurrent = (i: number) => !isRejected && i === currentStepIndex && currentStatus !== 'completed'

  return (
    <div className="space-y-6">
      <div className="relative">
        {isRejected ? (
          <div className="flex items-center justify-center gap-3 p-6 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Trip Rejected</p>
              <p className="text-sm text-red-700">
                {history[history.length - 1]?.notes || 'No reason provided'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const completed = isStepCompleted(index)
              const current = isStepCurrent(index)
              const isLast = index === statusSteps.length - 1

              return (
                <div key={step.status} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${completed ? 'bg-green-500 border-green-500 text-white'
                        : current ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'}`}>
                      {completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </div>
                    <p className={`mt-2 text-xs font-medium text-center max-w-[120px]
                      ${completed || current ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                    {completed && history.find(h => h.status === step.status) && (
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(history.find(h => h.status === step.status)!.created_at)
                          .toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  {!isLast && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all ${completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">History Notes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {history.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.user_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                      ${item.action_type === 'approve' || item.action_type === 'complete'
                        ? 'bg-green-100 text-green-800'
                        : item.action_type === 'reject'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'}`}>
                      {item.action_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.notes}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}