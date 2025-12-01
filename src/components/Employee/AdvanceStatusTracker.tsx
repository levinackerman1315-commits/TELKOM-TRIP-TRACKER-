
import { CheckCircle2, Circle, XCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Advance {
  advance_id: number;
  advance_number: string;
  trip_id: number;
  request_type: string;
  requested_amount: number;
  approved_amount?: number;
  status: string;
  request_reason?: string;
  rejection_reason?: string;
  transfer_date?: string;
  transfer_reference?: string;
  requested_at: string;
  approved_at_area?: string;
  approved_at_regional?: string;
  approved_by_area?: number;
  approved_by_regional?: number;
  created_at: string;
  updated_at: string;
}

interface AdvanceStatusTrackerProps {
  advances: Advance[];
  tripStatus?: string;
  tripExtended?: boolean;
  extensionDate?: string;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export function AdvanceStatusTracker({ 
  advances, 
  tripStatus, 
  tripExtended = false,
  extensionDate 
}: AdvanceStatusTrackerProps) {
  // Filter hanya advance yang BUKAN rejected/voided
  const validAdvances = advances.filter(adv => 
    adv.status !== 'rejected' && adv.status !== 'voided'
  );

  // Jika tidak ada advance yang valid
  if (validAdvances.length === 0) {
    const hasRejected = advances.some(adv => adv.status === 'rejected');
    
    return (
      <div className="text-center py-8">
        {hasRejected ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="font-medium text-red-900">Latest advance request was rejected</p>
            <p className="text-sm text-red-700 mt-1">
              {advances.find(adv => adv.status === 'rejected')?.rejection_reason || 'Please submit a new request'}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">No advance requests yet</p>
        )}
      </div>
    );
  }

  const pendingAdvance = validAdvances.find(adv => adv.status === 'pending');
  const latestAdvance = pendingAdvance || validAdvances[validAdvances.length - 1];
  const currentStatus = latestAdvance.status;
  
  const hasRejected = advances.some(adv => adv.status === 'rejected');
  const latestRejected = advances.filter(adv => adv.status === 'rejected').pop();
  
  const hasApprovedAfterRejected = () => {
    if (!hasRejected || !latestRejected) return false;
    const advancesAfterRejected = advances.filter(adv => 
      new Date(adv.created_at) > new Date(latestRejected.created_at) &&
      (adv.status === 'approved_area' || adv.status === 'pending')
    );
    return advancesAfterRejected.length > 0;
  };

  // ✅ FIX: Dinamis - Show Extension step HANYA kalau ada extension
  const statusSteps = tripExtended 
    ? [
        { status: 'pending', label: 'Pending' },
        { status: 'approved_area', label: 'Approved by Area', labelFailed: 'Rejected by Area' },
        { status: 'extension_trip', label: 'Extension Trip' },
        { status: 'completed', label: 'Completed' },
      ]
    : [
        { status: 'pending', label: 'Pending' },
        { status: 'approved_area', label: 'Approved by Area', labelFailed: 'Rejected by Area' },
        { status: 'completed', label: 'Completed' },
      ];

  // ✅ FIX: LOGIC BARU - Hijau semua saat Submit for Review
  const isStepCompleted = (stepIndex: number) => {
    const step = statusSteps[stepIndex];
    
    // ✅ CRITICAL: Jika trip awaiting_review/under_review/completed → SEMUA HIJAU!
    if (['awaiting_review', 'under_review_regional', 'completed'].includes(tripStatus || '')) {
      return true; // Semua step hijau karena sudah Submit for Review
    }
    
    // ✅ Jika masih active → Logic normal
    if (tripStatus === 'active') {
      // Kalau completed → semua hijau
      if (currentStatus === 'completed') {
        return true;
      }
      
      // Kalau approved_area → step 0,1 hijau
      if (currentStatus === 'approved_area') {
        return stepIndex <= 1; // pending, approved_area
      }
      
      // Kalau pending → TIDAK ADA yang hijau
      return false;
    }
    
    return false;
  };
  
  const isStepFailed = (stepIndex: number) => {
    const step = statusSteps[stepIndex];
    
    // ✅ Step failed HANYA kalau:
    // 1. Masih active (belum submit)
    // 2. Ada rejected
    // 3. Tidak ada pending/approved baru
    if (tripStatus === 'active' && hasRejected && !pendingAdvance && !hasApprovedAfterRejected() && step.status === 'approved_area') {
      return true;
    }
    
    return false;
  };

  const isStepCurrent = (stepIndex: number) => {
    const step = statusSteps[stepIndex];
    
    // ✅ Current step HANYA kalau masih active
    if (tripStatus !== 'active') {
      return false; // Tidak ada "current" kalau sudah submit
    }
    
    if (currentStatus === 'pending') {
      return stepIndex === 0;
    }
    
    // Extension Trip = current kalau approved tapi ada extension
    if (step.status === 'extension_trip' && currentStatus === 'approved_area') {
      return true;
    }
    
    return false;
  };

  const getStepColor = (stepIndex: number) => {
    const step = statusSteps[stepIndex];
    const completed = isStepCompleted(stepIndex);
    const current = isStepCurrent(stepIndex);
    const failed = isStepFailed(stepIndex);

    if (failed) {
      return 'bg-red-500 border-red-500 text-white';
    }

    // ✅ Extension Trip tetap kuning kalau current (masih active + ada extension)
    if (step.status === 'extension_trip' && current) {
      return 'bg-yellow-500 border-yellow-500 text-white';
    }

    if (current) {
      return 'bg-blue-500 border-blue-500 text-white';
    }

    if (completed) {
      return 'bg-green-500 border-green-500 text-white';
    }

    return 'bg-white border-gray-300 text-gray-400';
  };

  const getStepTimestamp = (step: { status: string }, stepIndex: number): string => {
    const completed = isStepCompleted(stepIndex);
    const current = isStepCurrent(stepIndex);
    const failed = isStepFailed(stepIndex);

    if (!completed && !current && !failed) {
      return '';
    }
    
    if (failed && latestRejected) {
      return formatDate(latestRejected.updated_at);
    }

    if (step.status === 'pending' && (completed || current)) {
      const latestApproved = validAdvances
        .filter(adv => ['approved_area', 'completed'].includes(adv.status))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      return latestApproved ? formatDate(latestApproved.created_at) : formatDate(latestAdvance.created_at);
    }

    if (step.status === 'approved_area' && completed) {
      const latestApproved = validAdvances
        .filter(adv => ['approved_area', 'completed'].includes(adv.status))
        .sort((a, b) => new Date(b.approved_at_area || b.created_at).getTime() - new Date(a.approved_at_area || a.created_at).getTime())[0];
      if (latestApproved?.approved_at_area) {
        return formatDate(latestApproved.approved_at_area);
      }
    }

    if (step.status === 'extension_trip' && extensionDate && (completed || current)) {
      return formatDate(extensionDate);
    }

    if (step.status === 'completed' && completed && latestAdvance.transfer_date) {
      return formatDate(latestAdvance.transfer_date);
    }

    return '';
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => {
            const completed = isStepCompleted(index);
            const current = isStepCurrent(index);
            const failed = isStepFailed(index);
            const isLast = index === statusSteps.length - 1;
            const timestamp = getStepTimestamp(step, index);
            const stepColor = getStepColor(index);

            return (
              <div key={step.status} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${stepColor}
                    `}
                  >
                    {failed ? (
                      <XCircle className="h-5 w-5" />
                    ) : completed || current ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  
                  <p
                    className={`
                      mt-2 text-xs font-medium text-center max-w-[120px]
                      ${completed || current || failed ? 'text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {failed && step.labelFailed ? step.labelFailed : step.label}
                  </p>
                  
                  {timestamp && (
                    <p className="mt-1 text-xs text-gray-500">
                      {timestamp}
                    </p>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-4 transition-all
                      ${failed
                        ? 'bg-red-500'
                        : step.status === 'extension_trip' && current
                        ? 'bg-yellow-500'
                        : completed 
                        ? 'bg-green-500' 
                        : current 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info: Rejected Alert */}
      {hasRejected && !pendingAdvance && !hasApprovedAfterRejected() && tripStatus === 'active' && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">Request Rejected by Finance Area</p>
            <p className="text-sm mt-1">
              {latestRejected?.rejection_reason || 'Your advance request has been rejected. Please submit a new request.'}
            </p>
          </AlertDescription>
        </Alert>
      )}
{/* Info: Extension Trip */}
{tripExtended && tripStatus === 'active' && (
  <Alert className="bg-yellow-50 border-yellow-200">
    <Info className="h-4 w-4 text-yellow-600" />
    <AlertDescription>
      <p className="font-medium text-yellow-900">Trip Extended</p>
      <p className="text-sm text-yellow-700 mt-1">
        This trip has been extended. Finance has been notified.
      </p>
    </AlertDescription>
  </Alert>
)}

      {/* Info: Submitted for Review */}
      {['awaiting_review', 'under_review_regional', 'completed'].includes(tripStatus || '') && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <p className="font-medium text-green-900">
              {tripStatus === 'completed' ? 'Trip Completed' : 'Submitted for Review'}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {tripStatus === 'completed' 
                ? 'All advances have been processed and trip is completed.'
                : 'Trip submitted for review. All advance steps are locked.'}
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Advance History Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">Advance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NO</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TYPE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">REQUESTED</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">APPROVED</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {advances.map((advance, index) => (
                <tr 
                  key={advance.advance_id} 
                  className={`
                    hover:bg-gray-50 transition-colors
                    ${advance.status === 'rejected' ? 'bg-red-50 border-l-4 border-l-red-500' : ''}
                  `}
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`
                      inline-flex px-2 py-1 text-xs font-semibold rounded-full
                      ${advance.request_type === 'initial' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-orange-100 text-orange-800'}
                    `}>
                      {advance.request_type === 'initial' ? 'Initial' : 'Additional'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`
                        inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full
                        ${advance.status === 'pending'
                          ? 'bg-blue-100 text-blue-800'
                          : advance.status === 'approved_area'
                          ? 'bg-green-100 text-green-800'
                          : advance.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : advance.status === 'voided'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {advance.status === 'rejected' && <XCircle className="h-3 w-3" />}
                      {advance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatCurrency(advance.requested_amount)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {advance.approved_amount ? formatCurrency(advance.approved_amount) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(advance.created_at).toLocaleString('id-ID', {
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
    </div>
  );
}