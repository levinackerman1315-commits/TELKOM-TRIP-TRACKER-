// // // // src/components/employee/AdvanceStatusTracker.tsx

// // // import { CheckCircle2, Circle, XCircle } from 'lucide-react';

// // // // ✅ GUNAKAN TIPE YANG SESUAI DATABASE
// // // interface Advance {
// // //   advance_id: number;
// // //   advance_number: string;
// // //   trip_id: number;
// // //   request_type: string;
// // //   requested_amount: number;
// // //   approved_amount?: number;
// // //   status: string;
// // //   request_reason?: string;
// // //   transfer_date?: string;
// // //   transfer_reference?: string;
// // //   requested_at: string;
// // //   approved_at_area?: string;
// // //   approved_at_regional?: string;
// // //   approved_by_area?: number;
// // //   approved_by_regional?: number;
// // //   created_at: string;
// // //   updated_at: string;
// // // }

// // // interface AdvanceStatusTrackerProps {
// // //   advances: Advance[];
// // // }

// // // // ✅ PINDAHKAN formatCurrency KE DALAM COMPONENT ATAU BUAT UTIL
// // // const formatCurrency = (amount: number): string => {
// // //   return new Intl.NumberFormat('id-ID', {
// // //     style: 'currency',
// // //     currency: 'IDR',
// // //     minimumFractionDigits: 0,
// // //   }).format(amount);
// // // };

// // // export function AdvanceStatusTracker({ advances }: AdvanceStatusTrackerProps) {
// // //   // Jika tidak ada advance, tampilkan pesan kosong
// // //   if (advances.length === 0) {
// // //     return (
// // //       <div className="text-center py-8 text-muted-foreground">
// // //         No advance requests yet
// // //       </div>
// // //     );
// // //   }

// // //   // Ambil advance terakhir (yang paling baru)
// // //   const latestAdvance = advances[advances.length - 1];

// // //   // Tentukan status terkini
// // //   const currentStatus = latestAdvance.status;

// // //   // Definisikan langkah-langkah status
// // //   const statusSteps = [
// // //     { status: 'pending', label: 'Pending' },
// // //     { status: 'approved_area', label: 'Approved by Area' },
// // //     { status: 'approved_regional', label: 'Approved by Regional' },
// // //     { status: 'transferred', label: 'Transferred' },
// // //   ];

// // //   // Cek apakah advance ditolak
// // //   const isRejected = currentStatus === 'rejected';

// // //   // Dapatkan indeks status saat ini
// // //   const getCurrentStepIndex = () => {
// // //     if (isRejected) return -1;
// // //     return statusSteps.findIndex(step => step.status === currentStatus);
// // //   };

// // //   const currentStepIndex = getCurrentStepIndex();

// // //   // Periksa apakah langkah sudah selesai
// // //   const isStepCompleted = (stepIndex: number) => {
// // //     if (isRejected) return false;
// // //     return stepIndex < currentStepIndex || currentStatus === 'transferred';
// // //   };

// // //   // Periksa apakah langkah saat ini
// // //   const isStepCurrent = (stepIndex: number) => {
// // //     if (isRejected) return false;
// // //     return stepIndex === currentStepIndex && currentStatus !== 'transferred';
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Progress Bar */}
// // //       <div className="relative">
// // //         {isRejected ? (
// // //           // Rejected Status
// // //           <div className="flex items-center justify-center gap-3 p-6 bg-red-50 border border-red-200 rounded-lg">
// // //             <XCircle className="h-6 w-6 text-red-600" />
// // //             <div>
// // //               <p className="font-semibold text-red-900">Advance Rejected</p>
// // //               <p className="text-sm text-red-700">
// // //                 {latestAdvance.request_reason || 'Please check the reason and resubmit if needed'}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           // Normal Progress Steps
// // //           <div className="flex items-center justify-between">
// // //             {statusSteps.map((step, index) => {
// // //               const completed = isStepCompleted(index);
// // //               const current = isStepCurrent(index);
// // //               const isLast = index === statusSteps.length - 1;

// // //               return (
// // //                 <div key={step.status} className="flex items-center flex-1">
// // //                   {/* Step Circle */}
// // //                   <div className="flex flex-col items-center">
// // //                     <div
// // //                       className={`
// // //                         flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
// // //                         ${completed 
// // //                           ? 'bg-green-500 border-green-500 text-white' 
// // //                           : current
// // //                           ? 'bg-blue-500 border-blue-500 text-white'
// // //                           : 'bg-white border-gray-300 text-gray-400'
// // //                         }
// // //                       `}
// // //                     >
// // //                       {completed ? (
// // //                         <CheckCircle2 className="h-5 w-5" />
// // //                       ) : (
// // //                         <Circle className="h-5 w-5" />
// // //                       )}
// // //                     </div>
// // //                     <p
// // //                       className={`
// // //                         mt-2 text-xs font-medium text-center max-w-[120px]
// // //                         ${completed || current ? 'text-gray-900' : 'text-gray-500'}
// // //                       `}
// // //                     >
// // //                       {step.label}
// // //                     </p>
// // //                     {/* Show timestamp if step is completed */}
// // //                     {completed && (
// // //                       <p className="mt-1 text-xs text-gray-500">
// // //                         {step.status === 'approved_area' && latestAdvance.approved_at_area
// // //                           ? new Date(latestAdvance.approved_at_area).toLocaleDateString('id-ID', {
// // //                               day: 'numeric',
// // //                               month: 'short',
// // //                               year: 'numeric',
// // //                             })
// // //                           : step.status === 'approved_regional' && latestAdvance.approved_at_regional
// // //                           ? new Date(latestAdvance.approved_at_regional).toLocaleDateString('id-ID', {
// // //                               day: 'numeric',
// // //                               month: 'short',
// // //                               year: 'numeric',
// // //                             })
// // //                           : step.status === 'transferred' && latestAdvance.transfer_date
// // //                           ? new Date(latestAdvance.transfer_date).toLocaleDateString('id-ID', {
// // //                               day: 'numeric',
// // //                               month: 'short',
// // //                               year: 'numeric',
// // //                             })
// // //                           : ''}
// // //                       </p>
// // //                     )}
// // //                   </div>

// // //                   {/* Connecting Line */}
// // //                   {!isLast && (
// // //                     <div
// // //                       className={`
// // //                         flex-1 h-0.5 mx-4 transition-all
// // //                         ${completed ? 'bg-green-500' : 'bg-gray-300'}
// // //                       `}
// // //                     />
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* History Notes Table */}
// // //       <div className="border rounded-lg overflow-hidden">
// // //         <div className="bg-gray-50 px-4 py-3 border-b">
// // //           <h3 className="font-semibold text-gray-900">Advance History</h3>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead className="bg-gray-50 border-b">
// // //               <tr>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   No
// // //                 </th>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   Advance Number
// // //                 </th>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   Status
// // //                 </th>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   Requested
// // //                 </th>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   Approved
// // //                 </th>
// // //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// // //                   Date
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-200">
// // //               {advances.map((advance, index) => (
// // //                 <tr key={advance.advance_id} className="hover:bg-gray-50">
// // //                   <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
// // //                   <td className="px-4 py-3 text-sm font-medium text-gray-900">
// // //                     {advance.advance_number}
// // //                   </td>
// // //                   <td className="px-4 py-3 text-sm">
// // //                     <span
// // //                       className={`
// // //                         inline-flex px-2 py-1 text-xs font-semibold rounded-full
// // //                         ${advance.status === 'pending'
// // //                           ? 'bg-yellow-100 text-yellow-800'
// // //                           : advance.status === 'approved_area'
// // //                           ? 'bg-blue-100 text-blue-800'
// // //                           : advance.status === 'approved_regional'
// // //                           ? 'bg-purple-100 text-purple-800'
// // //                           : advance.status === 'transferred'
// // //                           ? 'bg-green-100 text-green-800'
// // //                           : 'bg-red-100 text-red-800'
// // //                         }
// // //                       `}
// // //                     >
// // //                       {advance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
// // //                     </span>
// // //                   </td>
// // //                   <td className="px-4 py-3 text-sm text-gray-600">
// // //                     {formatCurrency(advance.requested_amount)}
// // //                   </td>
// // //                   <td className="px-4 py-3 text-sm text-gray-600">
// // //                     {advance.approved_amount ? formatCurrency(advance.approved_amount) : '-'}
// // //                   </td>
// // //                   <td className="px-4 py-3 text-sm text-gray-500">
// // //                     {new Date(advance.created_at).toLocaleString('id-ID', {
// // //                       day: 'numeric',
// // //                       month: 'short',
// // //                       year: 'numeric',
// // //                       hour: '2-digit',
// // //                       minute: '2-digit',
// // //                     })}
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // src/components/employee/AdvanceStatusTracker.tsx

// // import { CheckCircle2, Circle, XCircle } from 'lucide-react';

// // interface Advance {
// //   advance_id: number;
// //   advance_number: string;
// //   trip_id: number;
// //   request_type: string;
// //   requested_amount: number;
// //   approved_amount?: number;
// //   status: string;
// //   request_reason?: string;
// //   transfer_date?: string;
// //   transfer_reference?: string;
// //   requested_at: string;
// //   approved_at_area?: string;
// //   approved_at_regional?: string;
// //   approved_by_area?: number;
// //   approved_by_regional?: number;
// //   created_at: string;
// //   updated_at: string;
// // }

// // interface AdvanceStatusTrackerProps {
// //   advances: Advance[];
// // }

// // const formatCurrency = (amount: number): string => {
// //   return new Intl.NumberFormat('id-ID', {
// //     style: 'currency',
// //     currency: 'IDR',
// //     minimumFractionDigits: 0,
// //   }).format(amount);
// // };

// // export function AdvanceStatusTracker({ advances }: AdvanceStatusTrackerProps) {
// //   // ✅ FIX 1: Filter hanya advance yang BUKAN rejected
// //   const validAdvances = advances.filter(adv => adv.status !== 'rejected');

// //   // Jika tidak ada advance yang valid, tampilkan pesan
// //   if (validAdvances.length === 0) {
// //     return (
// //       <div className="text-center py-8 text-muted-foreground">
// //         No active advance requests
// //       </div>
// //     );
// //   }

// //   // ✅ FIX 2: Ambil advance terakhir yang valid (bukan rejected)
// //   const latestAdvance = validAdvances[validAdvances.length - 1];
// //   const currentStatus = latestAdvance.status;

// //   const statusSteps = [
// //     { status: 'pending', label: 'Pending' },
// //     { status: 'approved_area', label: 'Approved by Area' },
// //     { status: 'approved_regional', label: 'Approved by Regional' },
// //     { status: 'transferred', label: 'Transferred' },
// //   ];

// //   const getCurrentStepIndex = () => {
// //     return statusSteps.findIndex(step => step.status === currentStatus);
// //   };

// //   const currentStepIndex = getCurrentStepIndex();

// //   const isStepCompleted = (stepIndex: number) => {
// //     return stepIndex < currentStepIndex || currentStatus === 'transferred';
// //   };

// //   const isStepCurrent = (stepIndex: number) => {
// //     return stepIndex === currentStepIndex && currentStatus !== 'transferred';
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Progress Bar */}
// //       <div className="relative">
// //         <div className="flex items-center justify-between">
// //           {statusSteps.map((step, index) => {
// //             const completed = isStepCompleted(index);
// //             const current = isStepCurrent(index);
// //             const isLast = index === statusSteps.length - 1;

// //             return (
// //               <div key={step.status} className="flex items-center flex-1">
// //                 {/* Step Circle */}
// //                 <div className="flex flex-col items-center">
// //                   <div
// //                     className={`
// //                       flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
// //                       ${completed 
// //                         ? 'bg-green-500 border-green-500 text-white' 
// //                         : current
// //                         ? 'bg-blue-500 border-blue-500 text-white'
// //                         : 'bg-white border-gray-300 text-gray-400'
// //                       }
// //                     `}
// //                   >
// //                     {completed ? (
// //                       <CheckCircle2 className="h-5 w-5" />
// //                     ) : (
// //                       <Circle className="h-5 w-5" />
// //                     )}
// //                   </div>
// //                   <p
// //                     className={`
// //                       mt-2 text-xs font-medium text-center max-w-[120px]
// //                       ${completed || current ? 'text-gray-900' : 'text-gray-500'}
// //                     `}
// //                   >
// //                     {step.label}
// //                   </p>
// //                   {/* Timestamp */}
// //                   {completed && (
// //                     <p className="mt-1 text-xs text-gray-500">
// //                       {step.status === 'approved_area' && latestAdvance.approved_at_area
// //                         ? new Date(latestAdvance.approved_at_area).toLocaleDateString('id-ID', {
// //                             day: 'numeric',
// //                             month: 'short',
// //                             year: 'numeric',
// //                           })
// //                         : step.status === 'approved_regional' && latestAdvance.approved_at_regional
// //                         ? new Date(latestAdvance.approved_at_regional).toLocaleDateString('id-ID', {
// //                             day: 'numeric',
// //                             month: 'short',
// //                             year: 'numeric',
// //                           })
// //                         : step.status === 'transferred' && latestAdvance.transfer_date
// //                         ? new Date(latestAdvance.transfer_date).toLocaleDateString('id-ID', {
// //                             day: 'numeric',
// //                             month: 'short',
// //                             year: 'numeric',
// //                           })
// //                         : ''}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Connecting Line */}
// //                 {!isLast && (
// //                   <div
// //                     className={`
// //                       flex-1 h-0.5 mx-4 transition-all
// //                       ${completed ? 'bg-green-500' : 'bg-gray-300'}
// //                     `}
// //                   />
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Advance History Table */}
// //       <div className="border rounded-lg overflow-hidden">
// //         <div className="bg-gray-50 px-4 py-3 border-b">
// //           <h3 className="font-semibold text-gray-900">Advance History</h3>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50 border-b">
// //               <tr>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   NO
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   ADVANCE NUMBER
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   STATUS
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   REQUESTED
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   APPROVED
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                   DATE
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {/* ✅ FIX 3: Tampilkan SEMUA advances (termasuk rejected) di history table */}
// //               {advances.map((advance, index) => (
// //                 <tr key={advance.advance_id} className="hover:bg-gray-50">
// //                   <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
// //                   <td className="px-4 py-3 text-sm font-medium text-gray-900">
// //                     {advance.advance_number}
// //                   </td>
// //                   <td className="px-4 py-3 text-sm">
// //                     <span
// //                       className={`
// //                         inline-flex px-2 py-1 text-xs font-semibold rounded-full
// //                         ${advance.status === 'pending'
// //                           ? 'bg-yellow-100 text-yellow-800'
// //                           : advance.status === 'approved_area'
// //                           ? 'bg-green-100 text-green-800'
// //                           : advance.status === 'approved_regional'
// //                           ? 'bg-green-100 text-green-800'
// //                           : advance.status === 'transferred'
// //                           ? 'bg-green-100 text-green-800'
// //                           : 'bg-red-100 text-red-800'
// //                         }
// //                       `}
// //                     >
// //                       {advance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
// //                     </span>
// //                   </td>
// //                   <td className="px-4 py-3 text-sm text-gray-600">
// //                     {formatCurrency(advance.requested_amount)}
// //                   </td>
// //                   <td className="px-4 py-3 text-sm text-gray-600">
// //                     {advance.approved_amount ? formatCurrency(advance.approved_amount) : '-'}
// //                   </td>
// //                   <td className="px-4 py-3 text-sm text-gray-500">
// //                     {new Date(advance.created_at).toLocaleString('id-ID', {
// //                       day: 'numeric',
// //                       month: 'short',
// //                       year: 'numeric',
// //                       hour: '2-digit',
// //                       minute: '2-digit',
// //                     })}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // src/components/employee/AdvanceStatusTracker.tsx
// //stabil
// import { CheckCircle2, Circle, XCircle } from 'lucide-react';

// interface Advance {
//   advance_id: number;
//   advance_number: string;
//   trip_id: number;
//   request_type: string;
//   requested_amount: number;
//   approved_amount?: number;
//   status: string;
//   request_reason?: string;
//   rejection_reason?: string;
//   transfer_date?: string;
//   transfer_reference?: string;
//   requested_at: string;
//   approved_at_area?: string;
//   approved_at_regional?: string;
//   approved_by_area?: number;
//   approved_by_regional?: number;
//   created_at: string;
//   updated_at: string;
// }

// interface AdvanceStatusTrackerProps {
//   advances: Advance[];
// }

// const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//   }).format(amount);
// };

// export function AdvanceStatusTracker({ advances }: AdvanceStatusTrackerProps) {
//   // Filter hanya advance yang BUKAN rejected
//   const validAdvances = advances.filter(adv => adv.status !== 'rejected' && adv.status !== 'voided');

//   // Jika tidak ada advance yang valid
//   if (validAdvances.length === 0) {
//     // Cek apakah ada yang rejected
//     const hasRejected = advances.some(adv => adv.status === 'rejected');
    
//     return (
//       <div className="text-center py-8">
//         {hasRejected ? (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
//             <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
//             <p className="font-medium text-red-900">Latest advance request was rejected</p>
//             <p className="text-sm text-red-700 mt-1">
//               {advances.find(adv => adv.status === 'rejected')?.rejection_reason || 'Please submit a new request'}
//             </p>
//           </div>
//         ) : (
//           <p className="text-muted-foreground">No advance requests yet</p>
//         )}
//       </div>
//     );
//   }

//   // Ambil advance terakhir yang valid
//   const latestAdvance = validAdvances[validAdvances.length - 1];
//   const currentStatus = latestAdvance.status;

//   const statusSteps = [
//     { status: 'pending', label: 'Pending' },
//     { status: 'approved_area', label: 'Approved by Area' },
//     { status: 'approved_regional', label: 'Approved by Regional' },
//     { status: 'transferred', label: 'Transferred' },
//   ];

//   // ✅ LOGIC BENAR: Tentukan step completed
//   const isStepCompleted = (stepIndex: number) => {
//     // Kalau sudah transferred, semua hijau
//     if (currentStatus === 'transferred') {
//       return true;
//     }
    
//     // Kalau approved_regional, step 0,1,2 hijau
//     if (currentStatus === 'approved_regional') {
//       return stepIndex <= 2; // pending, approved_area, approved_regional
//     }
    
//     // Kalau approved_area, step 0,1 hijau
//     if (currentStatus === 'approved_area') {
//       return stepIndex <= 1; // pending, approved_area
//     }
    
//     // Kalau pending, semua abu-abu (tidak ada yang completed)
//     return false;
//   };

//   // ✅ LOGIC BENAR: Tentukan step current (BIRU)
//   const isStepCurrent = (stepIndex: number) => {
//     // Hanya pending yang bisa biru (step 0)
//     return currentStatus === 'pending' && stepIndex === 0;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Progress Bar */}
//       <div className="relative">
//         <div className="flex items-center justify-between">
//           {statusSteps.map((step, index) => {
//             const completed = isStepCompleted(index);
//             const current = isStepCurrent(index);
//             const isLast = index === statusSteps.length - 1;

//             return (
//               <div key={step.status} className="flex items-center flex-1">
//                 {/* Step Circle */}
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`
//                       flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
//                       ${completed 
//                         ? 'bg-green-500 border-green-500 text-white' 
//                         : current
//                         ? 'bg-blue-500 border-blue-500 text-white'
//                         : 'bg-white border-gray-300 text-gray-400'
//                       }
//                     `}
//                   >
//                     {completed ? (
//                       <CheckCircle2 className="h-5 w-5" />
//                     ) : (
//                       <Circle className="h-5 w-5" />
//                     )}
//                   </div>
//                   <p
//                     className={`
//                       mt-2 text-xs font-medium text-center max-w-[120px]
//                       ${completed || current ? 'text-gray-900' : 'text-gray-500'}
//                     `}
//                   >
//                     {step.label}
//                   </p>
//                   {/* Timestamp */}
//                   {completed && (
//                     <p className="mt-1 text-xs text-gray-500">
//                       {step.status === 'approved_area' && latestAdvance.approved_at_area
//                         ? new Date(latestAdvance.approved_at_area).toLocaleDateString('id-ID', {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric',
//                           })
//                         : step.status === 'approved_regional' && latestAdvance.approved_at_regional
//                         ? new Date(latestAdvance.approved_at_regional).toLocaleDateString('id-ID', {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric',
//                           })
//                         : step.status === 'transferred' && latestAdvance.transfer_date
//                         ? new Date(latestAdvance.transfer_date).toLocaleDateString('id-ID', {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric',
//                           })
//                         : step.status === 'pending' && currentStatus !== 'pending'
//                         ? new Date(latestAdvance.created_at).toLocaleDateString('id-ID', {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric',
//                           })
//                         : ''}
//                     </p>
//                   )}
//                 </div>

//                 {/* Connecting Line */}
//                 {!isLast && (
//                   <div
//                     className={`
//                       flex-1 h-0.5 mx-4 transition-all
//                       ${completed ? 'bg-green-500' : 'bg-gray-300'}
//                     `}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Advance History Table */}
//       <div className="border rounded-lg overflow-hidden">
//         <div className="bg-gray-50 px-4 py-3 border-b">
//           <h3 className="font-semibold text-gray-900">Advance History</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   NO
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   ADVANCE NUMBER
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   STATUS
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   REQUESTED
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   APPROVED
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   DATE
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {advances.map((advance, index) => (
//                 <tr key={advance.advance_id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                     {advance.advance_number}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     <span
//                       className={`
//                         inline-flex px-2 py-1 text-xs font-semibold rounded-full
//                         ${advance.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : advance.status === 'approved_area'
//                           ? 'bg-green-100 text-green-800'
//                           : advance.status === 'approved_regional'
//                           ? 'bg-green-100 text-green-800'
//                           : advance.status === 'transferred'
//                           ? 'bg-green-100 text-green-800'
//                           : advance.status === 'voided'
//                           ? 'bg-gray-100 text-gray-800'
//                           : 'bg-red-100 text-red-800'
//                         }
//                       `}
//                     >
//                       {advance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {formatCurrency(advance.requested_amount)}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {advance.approved_amount ? formatCurrency(advance.approved_amount) : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-500">
//                     {new Date(advance.created_at).toLocaleString('id-ID', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

//tsabli
// src/components/employee/AdvanceStatusTracker.tsx
// import { CheckCircle2, Circle, XCircle, Info } from 'lucide-react';
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface Advance {
//   advance_id: number;
//   advance_number: string;
//   trip_id: number;
//   request_type: string;
//   requested_amount: number;
//   approved_amount?: number;
//   status: string;
//   request_reason?: string;
//   rejection_reason?: string;
//   transfer_date?: string;
//   transfer_reference?: string;
//   requested_at: string;
//   approved_at_area?: string;
//   approved_at_regional?: string;
//   approved_by_area?: number;
//   approved_by_regional?: number;
//   created_at: string;
//   updated_at: string;
// }

// interface AdvanceStatusTrackerProps {
//   advances: Advance[];
// }

// const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//   }).format(amount);
// };

// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString('id-ID', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });
// };

// export function AdvanceStatusTracker({ advances }: AdvanceStatusTrackerProps) {
//   // Filter hanya advance yang BUKAN rejected/voided
//   const validAdvances = advances.filter(adv => 
//     adv.status !== 'rejected' && adv.status !== 'voided'
//   );

//   // Jika tidak ada advance yang valid
//   if (validAdvances.length === 0) {
//     const hasRejected = advances.some(adv => adv.status === 'rejected');
    
//     return (
//       <div className="text-center py-8">
//         {hasRejected ? (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
//             <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
//             <p className="font-medium text-red-900">Latest advance request was rejected</p>
//             <p className="text-sm text-red-700 mt-1">
//               {advances.find(adv => adv.status === 'rejected')?.rejection_reason || 'Please submit a new request'}
//             </p>
//           </div>
//         ) : (
//           <p className="text-muted-foreground">No advance requests yet</p>
//         )}
//       </div>
//     );
//   }

//   // ✅ Ambil advance terakhir yang valid
//   const latestAdvance = validAdvances[validAdvances.length - 1];
//   const currentStatus = latestAdvance.status;

//   // ✅ NEW: 4 steps dengan Extension Trip
//   const statusSteps = [
//     { status: 'pending', label: 'Pending' },
//     { status: 'approved_area', label: 'Approved by Area' },
//     { status: 'extension_requested', label: 'Extension Trip' }, // ← NEW!
//     { status: 'completed', label: 'Completed' }, // ← CHANGED dari 'transferred'
//   ];

//   // ✅ LOGIC: Tentukan step completed
//   const isStepCompleted = (stepIndex: number) => {
//     // Kalau completed, semua hijau
//     if (currentStatus === 'completed') {
//       return true;
//     }
    
//     // Kalau extension_requested, step 0,1,2 completed
//     if (currentStatus === 'extension_requested') {
//       return stepIndex <= 2; // pending, approved_area, extension_requested
//     }
    
//     // Kalau approved_area, step 0,1 completed
//     if (currentStatus === 'approved_area') {
//       return stepIndex <= 1; // pending, approved_area
//     }
    
//     // ✅ PENTING: Kalau pending, TIDAK ADA yang completed (semua abu-abu kecuali pending yang biru)
//     return false;
//   };

//   // ✅ LOGIC: Tentukan step current (BIRU atau KUNING)
//   const isStepCurrent = (stepIndex: number) => {
//     const step = statusSteps[stepIndex];
    
//     // Step 0 (Pending): BIRU kalau status memang pending
//     if (step.status === 'pending' && currentStatus === 'pending') {
//       return true;
//     }
    
//     // Step 2 (Extension Trip): KUNING kalau status extension_requested
//     if (step.status === 'extension_requested' && currentStatus === 'extension_requested') {
//       return true;
//     }
    
//     return false;
//   };

//   // ✅ LOGIC: Tentukan warna step
//   const getStepColor = (stepIndex: number) => {
//     const step = statusSteps[stepIndex];
//     const completed = isStepCompleted(stepIndex);
//     const current = isStepCurrent(stepIndex);

//     // Current step
//     if (current) {
//       // Extension Trip = KUNING
//       if (step.status === 'extension_requested') {
//         return 'bg-yellow-500 border-yellow-500 text-white';
//       }
//       // Pending = BIRU
//       return 'bg-blue-500 border-blue-500 text-white';
//     }

//     // Completed step
//     if (completed) {
//       // Extension Trip tetap KUNING (informational, bukan approval)
//       if (step.status === 'extension_requested') {
//         return 'bg-yellow-500 border-yellow-500 text-white';
//       }
//       // Lainnya = HIJAU
//       return 'bg-green-500 border-green-500 text-white';
//     }

//     // Not reached yet = ABU-ABU
//     return 'bg-white border-gray-300 text-gray-400';
//   };

//   // ✅ NEW: Get timestamp untuk setiap step
//   const getStepTimestamp = (step: { status: string }, stepIndex: number): string => {
//     const completed = isStepCompleted(stepIndex);
//     const current = isStepCurrent(stepIndex);

//     // Kalau step belum reached, return kosong
//     if (!completed && !current) {
//       return '';
//     }

//     // Step 0 (Pending): Tampilkan created_at kalau sudah approved
//     if (step.status === 'pending' && currentStatus !== 'pending') {
//       return formatDate(latestAdvance.created_at);
//     }

//     // Step 1 (Approved Area)
//     if (step.status === 'approved_area' && latestAdvance.approved_at_area) {
//       return formatDate(latestAdvance.approved_at_area);
//     }

//     // Step 2 (Extension Trip) - tampilkan kalau memang ada extension
//     if (step.status === 'extension_requested' && currentStatus === 'extension_requested') {
//       return formatDate(latestAdvance.updated_at);
//     }

//     // Step 3 (Completed)
//     if (step.status === 'completed' && latestAdvance.transfer_date) {
//       return formatDate(latestAdvance.transfer_date);
//     }

//     return '';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Progress Bar */}
//       <div className="relative">
//         <div className="flex items-center justify-between">
//           {statusSteps.map((step, index) => {
//             const completed = isStepCompleted(index);
//             const current = isStepCurrent(index);
//             const isLast = index === statusSteps.length - 1;
//             const timestamp = getStepTimestamp(step, index);
//             const stepColor = getStepColor(index);

//             return (
//               <div key={step.status} className="flex items-center flex-1">
//                 {/* Step Circle */}
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`
//                       flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
//                       ${stepColor}
//                     `}
//                   >
//                     {completed || current ? (
//                       <CheckCircle2 className="h-5 w-5" />
//                     ) : (
//                       <Circle className="h-5 w-5" />
//                     )}
//                   </div>
                  
//                   {/* Label */}
//                   <p
//                     className={`
//                       mt-2 text-xs font-medium text-center max-w-[120px]
//                       ${completed || current ? 'text-gray-900' : 'text-gray-500'}
//                     `}
//                   >
//                     {step.label}
//                   </p>
                  
//                   {/* Timestamp */}
//                   {timestamp && (
//                     <p className="mt-1 text-xs text-gray-500">
//                       {timestamp}
//                     </p>
//                   )}
//                 </div>

//                 {/* Connecting Line */}
//                 {!isLast && (
//                   <div
//                     className={`
//                       flex-1 h-0.5 mx-4 transition-all
//                       ${completed ? 'bg-green-500' : 'bg-gray-300'}
//                     `}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ✅ NEW: Info Box untuk Extension Trip */}
//       {currentStatus === 'extension_requested' && (
//         <Alert className="bg-yellow-50 border-yellow-200">
//           <Info className="h-4 w-4 text-yellow-600" />
//           <AlertDescription>
//             <p className="font-medium text-yellow-900">Extension Trip Requested</p>
//             <p className="text-sm text-yellow-700 mt-1">
//               Finance has been notified. No approval required, this is informational only.
//             </p>
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Advance History Table */}
//       <div className="border rounded-lg overflow-hidden">
//         <div className="bg-gray-50 px-4 py-3 border-b">
//           <h3 className="font-semibold text-gray-900">Advance History</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   NO
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   ADVANCE NUMBER
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   STATUS
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   REQUESTED
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   APPROVED
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   DATE
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {advances.map((advance, index) => (
//                 <tr key={advance.advance_id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                     {advance.advance_number}
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     <span
//                       className={`
//                         inline-flex px-2 py-1 text-xs font-semibold rounded-full
//                         ${advance.status === 'pending'
//                           ? 'bg-blue-100 text-blue-800'
//                           : advance.status === 'approved_area'
//                           ? 'bg-green-100 text-green-800'
//                           : advance.status === 'extension_requested'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : advance.status === 'completed'
//                           ? 'bg-green-100 text-green-800'
//                           : advance.status === 'voided'
//                           ? 'bg-gray-100 text-gray-800'
//                           : 'bg-red-100 text-red-800'
//                         }
//                       `}
//                     >
//                       {advance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {formatCurrency(advance.requested_amount)}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {advance.approved_amount ? formatCurrency(advance.approved_amount) : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-500">
//                     {new Date(advance.created_at).toLocaleString('id-ID', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


//stabil

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
    tripExtended?: boolean; // ✅ NEW: untuk cek apakah trip ada extension
    extensionDate?: string; // ✅ NEW: tanggal extension
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

    // ✅ Ambil advance terakhir yang valid
    const latestAdvance = validAdvances[validAdvances.length - 1];
    const currentStatus = latestAdvance.status;

    // ✅ 4 Steps (Extension Trip tetap ada sebagai informasi)
    const statusSteps = [
      { status: 'pending', label: 'Pending' },
      { status: 'approved_area', label: 'Approved by Area' },
      { status: 'extension_trip', label: 'Extension Trip' }, // ✅ Informational step
      { status: 'completed', label: 'Completed' },
    ];

    // ✅ LOGIC: Tentukan step completed
    const isStepCompleted = (stepIndex: number) => {
      const step = statusSteps[stepIndex];
      
      // ✅ Kalau trip ended → SEMUA HIJAU (termasuk extension)
      if (tripStatus === 'completed' || tripStatus === 'awaiting_review') {
        const hasCompletedAdvance = validAdvances.some(adv => adv.status === 'completed');
        if (hasCompletedAdvance) {
          return true;
        }
      }
      
      // Kalau status = completed, semua hijau (kecuali extension kalau tidak pernah ada)
      if (currentStatus === 'completed') {
        // Extension step hanya hijau kalau memang pernah ada extension
        if (step.status === 'extension_trip') {
          return tripExtended;
        }
        return true;
      }
      
      // Kalau approved_area, step 0,1 hijau
      if (currentStatus === 'approved_area') {
        return stepIndex <= 1; // pending, approved_area
      }
      
      // ✅ Kalau pending → TIDAK ADA yang hijau
      return false;
    };

    // ✅ LOGIC: Tentukan step current (BIRU atau KUNING)
    const isStepCurrent = (stepIndex: number) => {
      const step = statusSteps[stepIndex];
      
      // ✅ Kalau status = pending, step 0 DAN 1 jadi BIRU
      if (currentStatus === 'pending') {
        return stepIndex === 0 || stepIndex === 1;
      }
      
      // ✅ Extension Trip = KUNING kalau trip memang ada extension
      if (step.status === 'extension_trip' && tripExtended) {
        return true;
      }
      
      return false;
    };

    // ✅ LOGIC: Tentukan warna step
    const getStepColor = (stepIndex: number) => {
      const step = statusSteps[stepIndex];
      const completed = isStepCompleted(stepIndex);
      const current = isStepCurrent(stepIndex);

      // Extension Trip = KUNING (kalau ada extension)
      if (step.status === 'extension_trip' && (current || (completed && tripExtended))) {
        return 'bg-yellow-500 border-yellow-500 text-white';
      }

      // Current step (Pending atau Approved Area saat request baru) = BIRU
      if (current) {
        return 'bg-blue-500 border-blue-500 text-white';
      }

      // Completed step = HIJAU
      if (completed) {
        return 'bg-green-500 border-green-500 text-white';
      }

      // Not reached yet = ABU-ABU
      return 'bg-white border-gray-300 text-gray-400';
    };

    // ✅ Get timestamp untuk setiap step
    const getStepTimestamp = (step: { status: string }, stepIndex: number): string => {
      const completed = isStepCompleted(stepIndex);
      const current = isStepCurrent(stepIndex);

      // Kalau step belum reached DAN bukan current, return kosong
      if (!completed && !current) {
        return '';
      }

      // Step 0 (Pending): Tampilkan created_at kalau sudah approved
      if (step.status === 'pending' && currentStatus !== 'pending') {
        return formatDate(latestAdvance.created_at);
      }

      // Step 1 (Approved Area)
      if (step.status === 'approved_area' && latestAdvance.approved_at_area) {
        return formatDate(latestAdvance.approved_at_area);
      }

      // Step 2 (Extension Trip) - tampilkan kalau memang ada extension
      if (step.status === 'extension_trip' && tripExtended && extensionDate) {
        return formatDate(extensionDate);
      }

      // Step 3 (Completed)
      if (step.status === 'completed' && latestAdvance.transfer_date) {
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
              const isLast = index === statusSteps.length - 1;
              const timestamp = getStepTimestamp(step, index);
              const stepColor = getStepColor(index);

              return (
                <div key={step.status} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                        ${stepColor}
                      `}
                    >
                      {completed || current ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    
                    {/* Label */}
                    <p
                      className={`
                        mt-2 text-xs font-medium text-center max-w-[120px]
                        ${completed || current ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {step.label}
                    </p>
                    
                    {/* Timestamp */}
                    {timestamp && (
                      <p className="mt-1 text-xs text-gray-500">
                        {timestamp}
                      </p>
                    )}
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div
                      className={`
                        flex-1 h-0.5 mx-4 transition-all
                        ${step.status === 'extension_trip' && (current || (completed && tripExtended))
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

        {/* ✅ Info Box: Extension Trip (kalau ada) */}
        {tripExtended && (
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

        {/* ✅ Info Box: Request Additional Alert */}
        {currentStatus === 'pending' && validAdvances.length > 1 && (
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <p className="font-medium text-blue-900">Additional Advance Requested</p>
              <p className="text-sm text-blue-700 mt-1">
                Your additional advance request is being processed by Finance Area.
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    NO
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    TYPE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    REQUESTED
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    APPROVED
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {advances.map((advance, index) => (
                  <tr key={advance.advance_id} className="hover:bg-gray-50">
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
                        {advance.status === 'rejected' && (
                          <XCircle className="h-3 w-3" />
                        )}
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

        {/* ✅ Show Rejection Reason di bawah table */}
        {advances.some(adv => adv.status === 'rejected') && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">Previous Request Rejected</p>
              <p className="text-sm mt-1">
                {advances.find(adv => adv.status === 'rejected')?.rejection_reason}
              </p>
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }