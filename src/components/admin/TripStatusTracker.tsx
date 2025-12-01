
import { CheckCircle2, Circle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface TripStatusHistory {
  history_id?: number
  trip_id?: number
  old_status?: string | null
  new_status: string
  changed_by?: number
  changed_at: string
  notes?: string
  changer?: {
    user_id: number
    name: string
    email: string
  }
}

interface TripStatusTrackerProps {
  currentStatus: string;
  history?: TripStatusHistory[];
}

// ✅ Status steps sesuai BACKEND (TripController.php)
const statusSteps: { status: string; label: string }[] = [
  { status: 'active', label: 'Active Trip' },
  { status: 'awaiting_review', label: 'Awaiting Review (Finance Area)' },
  { status: 'under_review_regional', label: 'Regional Review' },
  { status: 'completed', label: 'Completed' },
];

export function TripStatusTracker({ currentStatus, history = [] }: TripStatusTrackerProps) {
  // Check if trip is cancelled/rejected
  const isCancelled = currentStatus === 'cancelled';
  const isRejected = currentStatus === 'rejected';

  // Get current step index
  const getCurrentStepIndex = () => {
    if (isCancelled || isRejected) return -1;
    return statusSteps.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  // Check if step is completed
  const isStepCompleted = (stepIndex: number) => {
    if (isCancelled || isRejected) return false;
    return stepIndex < currentStepIndex;
  };

  // Check if step is current
  const isStepCurrent = (stepIndex: number) => {
    if (isCancelled || isRejected) return false;
    return stepIndex === currentStepIndex;
  };

  // ✅ Get step color based on status
  const getStepColor = (stepIndex: number) => {
    const step = statusSteps[stepIndex];
    const completed = isStepCompleted(stepIndex);
    const current = isStepCurrent(stepIndex);

    if (completed) {
      return 'bg-green-500 border-green-500 text-white'; // ✅ GREEN - Step selesai
    }

    if (current) {
      if (step.status === 'active') {
        return 'bg-blue-500 border-blue-500 text-white'; // 🔵 BLUE
      }
      if (step.status === 'awaiting_review') {
        return 'bg-yellow-500 border-yellow-500 text-white'; // 🟡 YELLOW - Waiting Finance Area
      }
      if (step.status === 'under_review_regional') {
        return 'bg-orange-500 border-orange-500 text-white'; // 🟠 ORANGE - Waiting Regional
      }
      if (step.status === 'completed') {
        return 'bg-green-500 border-green-500 text-white'; // ✅ GREEN
      }
    }

    return 'bg-white border-gray-300 text-gray-400'; // ⚪ GREY - Belum sampai
  };

  // ✅ Get connecting line color
  const getLineColor = (stepIndex: number) => {
    if (isStepCompleted(stepIndex)) {
      return 'bg-green-500'; // ✅ GREEN
    }
    return 'bg-gray-300'; // Grey
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative">
        {isCancelled ? (
          // ❌ Cancelled Status
          <div className="flex items-center justify-center gap-3 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <XCircle className="h-6 w-6 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Trip Cancelled</p>
              <p className="text-sm text-gray-700">
                {history.length > 0 && history[history.length - 1]?.notes
                  ? history[history.length - 1].notes
                  : 'This trip has been cancelled'}
              </p>
            </div>
          </div>
        ) : isRejected ? (
          // ❌ Rejected Status
          <div className="flex items-center justify-center gap-3 p-6 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Settlement Rejected</p>
              <p className="text-sm text-red-700">
                {history.length > 0 && history[history.length - 1]?.notes
                  ? history[history.length - 1].notes
                  : 'Please upload correct receipts and resubmit'}
              </p>
              <p className="text-xs text-red-600 mt-2 font-medium">
                💡 You can upload new receipts and submit for review again
              </p>
            </div>
          </div>
        ) : (
          // ✅ Normal Progress Steps
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const completed = isStepCompleted(index);
              const current = isStepCurrent(index);
              const isLast = index === statusSteps.length - 1;

              return (
                <div key={step.status} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                        ${getStepColor(index)}
                      `}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : current ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    <p
                      className={`
                        mt-2 text-xs font-medium text-center max-w-[120px]
                        ${completed || current ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {step.label}
                    </p>
                    {/* Show timestamp if step is completed */}
                    {completed && history.find(h => h.new_status === step.status) && (
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          history.find(h => h.new_status === step.status)!.changed_at
                        ).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div
                      className={`
                        flex-1 h-0.5 mx-4 transition-all
                        ${getLineColor(index)}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History Notes Table */}
      {history.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">History Notes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Changed By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status Change
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((item, index) => (
                  <tr key={item.history_id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.changer?.name || 'System'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-col gap-1">
                        {item.old_status && (
                          <span className="text-xs text-gray-500">
                            From: <span className="font-medium">{item.old_status}</span>
                          </span>
                        )}
                        <span className="text-xs">
                          To: <span className="font-medium text-blue-600">{item.new_status}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.notes || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(item.changed_at).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}