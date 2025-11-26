// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { 
// // // // // // //   PlusCircle, 
// // // // // // //   Plane, 
// // // // // // //   Receipt, 
// // // // // // //   DollarSign, 
// // // // // // //   Clock,
// // // // // // //   CheckCircle2,
// // // // // // //   XCircle,
// // // // // // //   AlertCircle
// // // // // // // } from "lucide-react";
// // // // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // // // import { useAuth } from '@/contexts/AuthContext';
// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api';
// // // // // // // import { Trip, DashboardStats } from '@/types';

// // // // // // // // Mock data - in real app, this would come from API
// // // // // // // const trips = [
// // // // // // //   {
// // // // // // //     id: 1,
// // // // // // //     destination: "Jakarta",
// // // // // // //     purpose: "Client Meeting",
// // // // // // //     startDate: "2024-02-15",
// // // // // // //     endDate: "2024-02-17",
// // // // // // //     status: "approved",
// // // // // // //     advance: 5000000,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 2,
// // // // // // //     destination: "Surabaya",
// // // // // // //     purpose: "Network Installation",
// // // // // // //     startDate: "2024-02-20",
// // // // // // //     endDate: "2024-02-22",
// // // // // // //     status: "pending",
// // // // // // //     advance: 3500000,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 3,
// // // // // // //     destination: "Bandung",
// // // // // // //     purpose: "Training Session",
// // // // // // //     startDate: "2024-01-10",
// // // // // // //     endDate: "2024-01-12",
// // // // // // //     status: "completed",
// // // // // // //     advance: 2500000,
// // // // // // //   },
// // // // // // // ];

// // // // // // // const getStatusBadge = (status: string) => {
// // // // // // //   switch (status) {
// // // // // // //     case "approved":
// // // // // // //       return <Badge className="bg-success text-success-foreground"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
// // // // // // //     case "pending":
// // // // // // //       return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
// // // // // // //     case "rejected":
// // // // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
// // // // // // //     case "completed":
// // // // // // //       return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
// // // // // // //     default:
// // // // // // //       return <Badge variant="outline">{status}</Badge>;
// // // // // // //   }
// // // // // // // };

// // // // // // // const EmployeeDashboard = () => {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { user, logout } = useAuth();

// // // // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
// // // // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // // // //     total_trips: 0,
// // // // // // //     active_trips: 0,
// // // // // // //     completed_trips: 0,
// // // // // // //     pending_advances: 0,
// // // // // // //     total_advance_amount: 0,
// // // // // // //     total_expense_amount: 0
// // // // // // //   });
// // // // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0);
// // // // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     fetchDashboardData();
// // // // // // //   }, []);

// // // // // // //   const fetchDashboardData = async () => {
// // // // // // //     try {
// // // // // // //       setIsLoading(true);
      
// // // // // // //       // Fetch trips
// // // // // // //       const tripsResponse = await tripAPI.getAll();
// // // // // // //       const trips = tripsResponse.data.data || [];
      
// // // // // // //       // Find active trip
// // // // // // //       const active = trips.find((t: Trip) => t.status === 'active');
// // // // // // //       setActiveTrip(active || null);
      
// // // // // // //       // Calculate stats
// // // // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length;
      
// // // // // // //       // Fetch advances
// // // // // // //       const advancesResponse = await advanceAPI.getAll();
// // // // // // //       const advances = advancesResponse.data.data || [];
// // // // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length;
// // // // // // //       const totalAdvance = advances
// // // // // // //         .filter((a: any) => a.status === 'transferred')
// // // // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0);
      
// // // // // // //       // Fetch notifications
// // // // // // //       const notifResponse = await notificationAPI.getUnreadCount();
// // // // // // //       setUnreadNotifications(notifResponse.data.unread_count || 0);
      
// // // // // // //       setStats({
// // // // // // //         total_trips: trips.length,
// // // // // // //         active_trips: active ? 1 : 0,
// // // // // // //         completed_trips: completed,
// // // // // // //         pending_advances: pending,
// // // // // // //         total_advance_amount: totalAdvance,
// // // // // // //         total_expense_amount: active?.total_expenses || 0
// // // // // // //       });
      
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Failed to fetch dashboard data:', error);
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatCurrency = (amount: number) => {
// // // // // // //     return new Intl.NumberFormat('id-ID', {
// // // // // // //       style: 'currency',
// // // // // // //       currency: 'IDR',
// // // // // // //       minimumFractionDigits: 0
// // // // // // //     }).format(amount);
// // // // // // //   };

// // // // // // //   const formatDate = (dateString: string) => {
// // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // // // //       day: 'numeric',
// // // // // // //       month: 'long',
// // // // // // //       year: 'numeric'
// // // // // // //     });
// // // // // // //   };

// // // // // // //   if (isLoading) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // //         <div className="text-center">
// // // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // // // // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // //       {/* Header */}
// // // // // // //       <div className="bg-white shadow">
// // // // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // // // //           <div className="flex items-center justify-between">
// // // // // // //             <div>
// // // // // // //               <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
// // // // // // //               <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
// // // // // // //             </div>
// // // // // // //             <div className="flex items-center gap-4">
// // // // // // //               {/* Notifications */}
// // // // // // //               <Link
// // // // // // //                 to="/employee/notifications"
// // // // // // //                 className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// // // // // // //               >
// // // // // // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// // // // // // //                 </svg>
// // // // // // //                 {unreadNotifications > 0 && (
// // // // // // //                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
// // // // // // //                     {unreadNotifications}
// // // // // // //                   </span>
// // // // // // //                 )}
// // // // // // //               </Link>
              
// // // // // // //               {/* Logout */}
// // // // // // //               <button
// // // // // // //                 onClick={logout}
// // // // // // //                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
// // // // // // //               >
// // // // // // //                 Logout
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // // // //         {/* Stats Cards */}
// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // // //             <div className="flex items-center justify-between">
// // // // // // //               <div>
// // // // // // //                 <p className="text-sm font-medium text-gray-600">Total Trips</p>
// // // // // // //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_trips}</p>
// // // // // // //               </div>
// // // // // // //               <div className="p-3 bg-blue-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // // //             <div className="flex items-center justify-between">
// // // // // // //               <div>
// // // // // // //                 <p className="text-sm font-medium text-gray-600">Active Trip</p>
// // // // // // //                 <p className="text-3xl font-bold text-green-600 mt-2">{stats.active_trips}</p>
// // // // // // //               </div>
// // // // // // //               <div className="p-3 bg-green-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // // //             <div className="flex items-center justify-between">
// // // // // // //               <div>
// // // // // // //                 <p className="text-sm font-medium text-gray-600">Completed</p>
// // // // // // //                 <p className="text-3xl font-bold text-purple-600 mt-2">{stats.completed_trips}</p>
// // // // // // //               </div>
// // // // // // //               <div className="p-3 bg-purple-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // // //             <div className="flex items-center justify-between">
// // // // // // //               <div>
// // // // // // //                 <p className="text-sm font-medium text-gray-600">Pending Advances</p>
// // // // // // //                 <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending_advances}</p>
// // // // // // //               </div>
// // // // // // //               <div className="p-3 bg-orange-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Active Trip Card */}
// // // // // // //         {activeTrip ? (
// // // // // // //           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
// // // // // // //             <div className="flex items-start justify-between">
// // // // // // //               <div className="flex-1">
// // // // // // //                 <div className="flex items-center gap-2 mb-2">
// // // // // // //                   <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
// // // // // // //                     Active Trip
// // // // // // //                   </span>
// // // // // // //                   <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // // // //                 </div>
// // // // // // //                 <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // // // //                 <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // // //                   <div>
// // // // // // //                     <p className="text-sm opacity-75">Duration</p>
// // // // // // //                     <p className="font-semibold">{activeTrip.duration} days</p>
// // // // // // //                   </div>
// // // // // // //                   <div>
// // // // // // //                     <p className="text-sm opacity-75">Start Date</p>
// // // // // // //                     <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // // // //                   </div>
// // // // // // //                   <div>
// // // // // // //                     <p className="text-sm opacity-75">End Date</p>
// // // // // // //                     <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // // // //                   </div>
// // // // // // //                 </div>

// // // // // // //                 <div className="flex gap-4 pt-4 border-t border-white border-opacity-20">
// // // // // // //                   <div>
// // // // // // //                     <p className="text-sm opacity-75">Total Advance</p>
// // // // // // //                     <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // // // //                   </div>
// // // // // // //                   <div>
// // // // // // //                     <p className="text-sm opacity-75">Total Expenses</p>
// // // // // // //                     <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <Link
// // // // // // //                 to={`/employee/trips/${activeTrip.trip_id}`}
// // // // // // //                 className="ml-4 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
// // // // // // //               >
// // // // // // //                 View Details →
// // // // // // //               </Link>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="bg-white rounded-lg shadow p-8 mb-8 text-center">
// // // // // // //             <div className="max-w-md mx-auto">
// // // // // // //               <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // // // // // //               </svg>
// // // // // // //               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Trip</h3>
// // // // // // //               <p className="text-gray-600 mb-6">You don't have any active business trip at the moment.</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Quick Actions */}
// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // //           <Link
// // // // // // //             to="/employee/trips/new"
// // // // // // //             className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition ${
// // // // // // //               activeTrip ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             <div className="flex items-center gap-4">
// // // // // // //               <div className="p-3 bg-blue-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //               <div>
// // // // // // //                 <h3 className="font-semibold text-gray-900">Create New Trip</h3>
// // // // // // //                 <p className="text-sm text-gray-600">
// // // // // // //                   {activeTrip ? 'Complete active trip first' : 'Start planning your business trip'}
// // // // // // //                 </p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </Link>

// // // // // // //           <Link
// // // // // // //             to="/employee/trips"
// // // // // // //             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
// // // // // // //           >
// // // // // // //             <div className="flex items-center gap-4">
// // // // // // //               <div className="p-3 bg-green-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //               <div>
// // // // // // //                 <h3 className="font-semibold text-gray-900">My Trips</h3>
// // // // // // //                 <p className="text-sm text-gray-600">View all your business trips</p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </Link>

// // // // // // //           <Link
// // // // // // //             to="/employee/history"
// // // // // // //             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
// // // // // // //           >
// // // // // // //             <div className="flex items-center gap-4">
// // // // // // //               <div className="p-3 bg-purple-100 rounded-lg">
// // // // // // //                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //               <div>
// // // // // // //                 <h3 className="font-semibold text-gray-900">Trip History</h3>
// // // // // // //                 <p className="text-sm text-gray-600">View completed trips</p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </Link>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default EmployeeDashboard;


// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // // import { Button } from "@/components/ui/button"
// // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // import { 
// // // // // //   PlusCircle, 
// // // // // //   Plane, 
// // // // // //   Receipt, 
// // // // // //   DollarSign, 
// // // // // //   Clock,
// // // // // //   CheckCircle2,
// // // // // //   XCircle,
// // // // // //   AlertCircle,
// // // // // //   Bell
// // // // // // } from "lucide-react"
// // // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // // import { useState, useEffect } from 'react'
// // // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // // import { Trip, DashboardStats } from '@/types'

// // // // // // const getStatusBadge = (status: string) => {
// // // // // //   switch (status) {
// // // // // //     case "active":
// // // // // //     case "approved":
// // // // // //       return <Badge className="bg-success text-success-foreground"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>
// // // // // //     case "pending":
// // // // // //     case "submitted":
// // // // // //       return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
// // // // // //     case "rejected":
// // // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // // //     case "completed":
// // // // // //       return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // // //     default:
// // // // // //       return <Badge variant="outline">{status}</Badge>
// // // // // //   }
// // // // // // }

// // // // // // const EmployeeDashboard = () => {
// // // // // //   const navigate = useNavigate()
// // // // // //   const { user, logout } = useAuth()

// // // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // // //     total_trips: 0,
// // // // // //     active_trips: 0,
// // // // // //     completed_trips: 0,
// // // // // //     pending_advances: 0,
// // // // // //     total_advance_amount: 0,
// // // // // //     total_expense_amount: 0
// // // // // //   })
// // // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // // //   useEffect(() => {
// // // // // //     fetchDashboardData()
// // // // // //   }, [])

// // // // // //   const fetchDashboardData = async () => {
// // // // // //     try {
// // // // // //       setIsLoading(true)
      
// // // // // //       // Fetch trips
// // // // // //       const tripsResponse = await tripAPI.getAll()
// // // // // //       const trips = tripsResponse.data.data || []
      
// // // // // //       // Find active trip
// // // // // //       const active = trips.find((t: Trip) => t.status === 'active')
// // // // // //       setActiveTrip(active || null)
      
// // // // // //       // Calculate stats
// // // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // // //       // Fetch advances
// // // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // // //       const advances = advancesResponse.data.data || []
// // // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
// // // // // //       const totalAdvance = advances
// // // // // //         .filter((a: any) => a.status === 'transferred')
// // // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
      
// // // // // //       // Fetch notifications
// // // // // //       const notifResponse = await notificationAPI.getUnreadCount()
// // // // // //       setUnreadNotifications(notifResponse.data.unread_count || 0)
      
// // // // // //       setStats({
// // // // // //         total_trips: trips.length,
// // // // // //         active_trips: active ? 1 : 0,
// // // // // //         completed_trips: completed,
// // // // // //         pending_advances: pending,
// // // // // //         total_advance_amount: totalAdvance,
// // // // // //         total_expense_amount: active?.total_expenses || 0
// // // // // //       })
      
// // // // // //     } catch (error) {
// // // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // // //     } finally {
// // // // // //       setIsLoading(false)
// // // // // //     }
// // // // // //   }

// // // // // //   const formatCurrency = (amount: number) => {
// // // // // //     return new Intl.NumberFormat('id-ID', {
// // // // // //       style: 'currency',
// // // // // //       currency: 'IDR',
// // // // // //       minimumFractionDigits: 0
// // // // // //     }).format(amount)
// // // // // //   }

// // // // // //   const formatDate = (dateString: string) => {
// // // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // // //       day: 'numeric',
// // // // // //       month: 'long',
// // // // // //       year: 'numeric'
// // // // // //     })
// // // // // //   }

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="text-center">
// // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     )
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-background">
// // // // // //       {/* Header */}
// // // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // // //         <div className="container mx-auto px-4 py-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <img 
// // // // // //                 src="/logo-telkom-akses.png" 
// // // // // //                 alt="Telkom Akses" 
// // // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // // //               />
// // // // // //               <div>
// // // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               {/* Notifications */}
// // // // // //               <Link
// // // // // //                 to="/employee/notifications"
// // // // // //                 className="relative"
// // // // // //               >
// // // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // // //                   <Bell className="w-5 h-5" />
// // // // // //                 </Button>
// // // // // //                 {unreadNotifications > 0 && (
// // // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // // //                     {unreadNotifications}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </Link>
              
// // // // // //               {/* Logout */}
// // // // // //               <Button 
// // // // // //                 variant="secondary" 
// // // // // //                 size="sm"
// // // // // //                 onClick={logout}
// // // // // //               >
// // // // // //                 Logout
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // //         {/* Stats Cards */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // // //           <Card>
// // // // // //             <CardHeader className="pb-3">
// // // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // // //             </CardContent>
// // // // // //           </Card>

// // // // // //           <Card>
// // // // // //             <CardHeader className="pb-3">
// // // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Active Trip</CardTitle>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="text-2xl font-bold text-success">{stats.active_trips}</div>
// // // // // //             </CardContent>
// // // // // //           </Card>

// // // // // //           <Card>
// // // // // //             <CardHeader className="pb-3">
// // // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="text-2xl font-bold">{stats.completed_trips}</div>
// // // // // //             </CardContent>
// // // // // //           </Card>

// // // // // //           <Card>
// // // // // //             <CardHeader className="pb-3">
// // // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Pending Advances</CardTitle>
// // // // // //             </CardHeader>
// // // // // //             <CardContent>
// // // // // //               <div className="text-2xl font-bold text-warning">{stats.pending_advances}</div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         </div>

// // // // // //         {/* Active Trip Card */}
// // // // // //         {activeTrip ? (
// // // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // // //             <CardContent className="p-6">
// // // // // //               <div className="flex items-start justify-between">
// // // // // //                 <div className="flex-1">
// // // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // // //                     <Badge className="bg-white/20 text-white hover:bg-white/30">Active Trip</Badge>
// // // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // // //                   </div>
// // // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // //                     <div>
// // // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // // //                     <div>
// // // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <Button 
// // // // // //                   variant="secondary"
// // // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // // //                   className="ml-4"
// // // // // //                 >
// // // // // //                   View Details →
// // // // // //                 </Button>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ) : (
// // // // // //           <Card className="mb-8 shadow-soft">
// // // // // //             <CardContent className="p-8 text-center">
// // // // // //               <div className="max-w-md mx-auto">
// // // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // // //               </div>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         )}

// // // // // //         {/* Quick Actions */}
// // // // // //         <Card className="mb-8 shadow-soft">
// // // // // //           <CardHeader>
// // // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // // //           </CardHeader>
// // // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // //             <Button 
// // // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // // //               className="h-auto py-6 flex-col gap-2"
// // // // // //               disabled={!!activeTrip}
// // // // // //             >
// // // // // //               <PlusCircle className="w-6 h-6" />
// // // // // //               <span>New Trip Request</span>
// // // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // // //             </Button>

// // // // // //             <Button 
// // // // // //               variant="outline"
// // // // // //               onClick={() => navigate("/employee/trips")}
// // // // // //               className="h-auto py-6 flex-col gap-2"
// // // // // //             >
// // // // // //               <Plane className="w-6 h-6" />
// // // // // //               <span>My Trips</span>
// // // // // //             </Button>

// // // // // //             <Button 
// // // // // //               variant="outline"
// // // // // //               onClick={() => navigate("/employee/history")}
// // // // // //               className="h-auto py-6 flex-col gap-2"
// // // // // //             >
// // // // // //               <Clock className="w-6 h-6" />
// // // // // //               <span>Trip History</span>
// // // // // //             </Button>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default EmployeeDashboard


// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Receipt, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell,
// // // // //   TrendingUp,
// // // // //   Calendar
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // // //     case "awaiting_review":
// // // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // // //     case "under_review_area":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // // //     case "approved_area":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // // //     case "under_review_regional":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // // //     case "approved_regional":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // // //     case "completed":
// // // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "cancelled":
// // // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip (status: active atau awaiting_review)
// // // // //       const active = trips.find((t: Trip) => 
// // // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // // //       )
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
      
// // // // //       // Total advance yang sudah approved (bukan pending/rejected)
// // // // //       const totalAdvance = advances
// // // // //         .filter((a: any) => ['approved_area', 'approved_regional', 'transferred'].includes(a.status))
// // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || a.requested_amount || 0), 0)
      
// // // // //       // Fetch notifications
// // // // //       try {
// // // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // // //       } catch (error) {
// // // // //         console.log('Notifications not available')
// // // // //       }
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: totalAdvance,
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah dimulai
// // // // //   const isTripStarted = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const startDate = new Date(trip.start_date)
// // // // //     return today >= startDate
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah selesai
// // // // //   const isTripEnded = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const endDate = new Date(trip.end_date)
// // // // //     return today > endDate
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* Notifications */}
// // // // //               <Link
// // // // //                 to="/employee/notifications"
// // // // //                 className="relative"
// // // // //               >
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
              
// // // // //               {/* Logout */}
// // // // //               <Button 
// // // // //                 variant="secondary" 
// // // // //                 size="sm"
// // // // //                 onClick={logout}
// // // // //               >
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Plane className="w-4 h-4 mr-2" />
// // // // //                 Total Trips
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Clock className="w-4 h-4 mr-2" />
// // // // //                 Active Trip
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                 Completed
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // // //                 Pending Advances
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     {getStatusBadge(activeTrip.status)}
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   {/* ✅ Trip Progress Info */}
// // // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <TrendingUp className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip is in progress</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         You can upload receipts until the trip ends
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Trip Ended Info */}
// // // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <AlertCircle className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip has ended</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Please submit for review to complete settlement
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Awaiting Review Info */}
// // // // //                   {activeTrip.status === 'awaiting_review' && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <Clock className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Under Review</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Your trip settlement is being reviewed by Finance Area
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Balance</p>
// // // // //                       <p className={`text-lg font-bold ${
// // // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // // //                           ? 'text-white'
// // // // //                           : 'text-red-300'
// // // // //                       }`}>
// // // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //                 <Button 
// // // // //                   onClick={() => navigate("/employee/trips/new")}
// // // // //                   size="lg"
// // // // //                 >
// // // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // // //                   Create New Trip
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ Financial Summary */}
// // // // //         {stats.total_advance_amount > 0 && (
// // // // //           <Card className="shadow-soft">
// // // // //             <CardHeader>
// // // // //               <CardTitle className="flex items-center">
// // // // //                 <TrendingUp className="w-5 h-5 mr-2" />
// // // // //                 Financial Summary
// // // // //               </CardTitle>
// // // // //               <CardDescription>Overview of your advances and expenses</CardDescription>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Advance Received</p>
// // // // //                   <p className="text-2xl font-bold text-green-600">
// // // // //                     {formatCurrency(stats.total_advance_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // // //                   <p className="text-2xl font-bold text-blue-600">
// // // // //                     {formatCurrency(stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // // //                   <p className={`text-2xl font-bold ${
// // // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // // //                       ? 'text-green-600'
// // // // //                       : 'text-red-600'
// // // // //                   }`}>
// // // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard


// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { 
// // // // // //   PlusCircle, 
// // // // // //   Plane, 
// // // // // //   Receipt, 
// // // // // //   DollarSign, 
// // // // // //   Clock,
// // // // // //   CheckCircle2,
// // // // // //   XCircle,
// // // // // //   AlertCircle
// // // // // // } from "lucide-react";
// // // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // // import { useAuth } from '@/contexts/AuthContext';
// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api';
// // // // // // import { Trip, DashboardStats } from '@/types';

// // // // // // // Mock data - in real app, this would come from API
// // // // // // const trips = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     destination: "Jakarta",
// // // // // //     purpose: "Client Meeting",
// // // // // //     startDate: "2024-02-15",
// // // // // //     endDate: "2024-02-17",
// // // // // //     status: "approved",
// // // // // //     advance: 5000000,
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     destination: "Surabaya",
// // // // // //     purpose: "Network Installation",
// // // // // //     startDate: "2024-02-20",
// // // // // //     endDate: "2024-02-22",
// // // // // //     status: "pending",
// // // // // //     advance: 3500000,
// // // // // //   },
// // // // // //   {
// // // // // //     id: 3,
// // // // // //     destination: "Bandung",
// // // // // //     purpose: "Training Session",
// // // // // //     startDate: "2024-01-10",
// // // // // //     endDate: "2024-01-12",
// // // // // //     status: "completed",
// // // // // //     advance: 2500000,
// // // // // //   },
// // // // // // ];

// // // // // // const getStatusBadge = (status: string) => {
// // // // // //   switch (status) {
// // // // // //     case "approved":
// // // // // //       return <Badge className="bg-success text-success-foreground"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
// // // // // //     case "pending":
// // // // // //       return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
// // // // // //     case "rejected":
// // // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
// // // // // //     case "completed":
// // // // // //       return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
// // // // // //     default:
// // // // // //       return <Badge variant="outline">{status}</Badge>;
// // // // // //   }
// // // // // // };

// // // // // // const EmployeeDashboard = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const { user, logout } = useAuth();

// // // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
// // // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // // //     total_trips: 0,
// // // // // //     active_trips: 0,
// // // // // //     completed_trips: 0,
// // // // // //     pending_advances: 0,
// // // // // //     total_advance_amount: 0,
// // // // // //     total_expense_amount: 0
// // // // // //   });
// // // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0);
// // // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     fetchDashboardData();
// // // // // //   }, []);

// // // // // //   const fetchDashboardData = async () => {
// // // // // //     try {
// // // // // //       setIsLoading(true);
      
// // // // // //       // Fetch trips
// // // // // //       const tripsResponse = await tripAPI.getAll();
// // // // // //       const trips = tripsResponse.data.data || [];
      
// // // // // //       // Find active trip
// // // // // //       const active = trips.find((t: Trip) => t.status === 'active');
// // // // // //       setActiveTrip(active || null);
      
// // // // // //       // Calculate stats
// // // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length;
      
// // // // // //       // Fetch advances
// // // // // //       const advancesResponse = await advanceAPI.getAll();
// // // // // //       const advances = advancesResponse.data.data || [];
// // // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length;
// // // // // //       const totalAdvance = advances
// // // // // //         .filter((a: any) => a.status === 'transferred')
// // // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0);
      
// // // // // //       // Fetch notifications
// // // // // //       const notifResponse = await notificationAPI.getUnreadCount();
// // // // // //       setUnreadNotifications(notifResponse.data.unread_count || 0);
      
// // // // // //       setStats({
// // // // // //         total_trips: trips.length,
// // // // // //         active_trips: active ? 1 : 0,
// // // // // //         completed_trips: completed,
// // // // // //         pending_advances: pending,
// // // // // //         total_advance_amount: totalAdvance,
// // // // // //         total_expense_amount: active?.total_expenses || 0
// // // // // //       });
      
// // // // // //     } catch (error) {
// // // // // //       console.error('Failed to fetch dashboard data:', error);
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const formatCurrency = (amount: number) => {
// // // // // //     return new Intl.NumberFormat('id-ID', {
// // // // // //       style: 'currency',
// // // // // //       currency: 'IDR',
// // // // // //       minimumFractionDigits: 0
// // // // // //     }).format(amount);
// // // // // //   };

// // // // // //   const formatDate = (dateString: string) => {
// // // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // // //       day: 'numeric',
// // // // // //       month: 'long',
// // // // // //       year: 'numeric'
// // // // // //     });
// // // // // //   };

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="text-center">
// // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // // // //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // //       {/* Header */}
// // // // // //       <div className="bg-white shadow">
// // // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
// // // // // //               <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
// // // // // //             </div>
// // // // // //             <div className="flex items-center gap-4">
// // // // // //               {/* Notifications */}
// // // // // //               <Link
// // // // // //                 to="/employee/notifications"
// // // // // //                 className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// // // // // //               >
// // // // // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// // // // // //                 </svg>
// // // // // //                 {unreadNotifications > 0 && (
// // // // // //                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
// // // // // //                     {unreadNotifications}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </Link>
              
// // // // // //               {/* Logout */}
// // // // // //               <button
// // // // // //                 onClick={logout}
// // // // // //                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
// // // // // //               >
// // // // // //                 Logout
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // // //         {/* Stats Cards */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // //             <div className="flex items-center justify-between">
// // // // // //               <div>
// // // // // //                 <p className="text-sm font-medium text-gray-600">Total Trips</p>
// // // // // //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_trips}</p>
// // // // // //               </div>
// // // // // //               <div className="p-3 bg-blue-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // //             <div className="flex items-center justify-between">
// // // // // //               <div>
// // // // // //                 <p className="text-sm font-medium text-gray-600">Active Trip</p>
// // // // // //                 <p className="text-3xl font-bold text-green-600 mt-2">{stats.active_trips}</p>
// // // // // //               </div>
// // // // // //               <div className="p-3 bg-green-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // //             <div className="flex items-center justify-between">
// // // // // //               <div>
// // // // // //                 <p className="text-sm font-medium text-gray-600">Completed</p>
// // // // // //                 <p className="text-3xl font-bold text-purple-600 mt-2">{stats.completed_trips}</p>
// // // // // //               </div>
// // // // // //               <div className="p-3 bg-purple-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="bg-white rounded-lg shadow p-6">
// // // // // //             <div className="flex items-center justify-between">
// // // // // //               <div>
// // // // // //                 <p className="text-sm font-medium text-gray-600">Pending Advances</p>
// // // // // //                 <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending_advances}</p>
// // // // // //               </div>
// // // // // //               <div className="p-3 bg-orange-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Active Trip Card */}
// // // // // //         {activeTrip ? (
// // // // // //           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
// // // // // //             <div className="flex items-start justify-between">
// // // // // //               <div className="flex-1">
// // // // // //                 <div className="flex items-center gap-2 mb-2">
// // // // // //                   <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
// // // // // //                     Active Trip
// // // // // //                   </span>
// // // // // //                   <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // // //                 </div>
// // // // // //                 <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // // //                 <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // //                   <div>
// // // // // //                     <p className="text-sm opacity-75">Duration</p>
// // // // // //                     <p className="font-semibold">{activeTrip.duration} days</p>
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <p className="text-sm opacity-75">Start Date</p>
// // // // // //                     <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <p className="text-sm opacity-75">End Date</p>
// // // // // //                     <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="flex gap-4 pt-4 border-t border-white border-opacity-20">
// // // // // //                   <div>
// // // // // //                     <p className="text-sm opacity-75">Total Advance</p>
// // // // // //                     <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <p className="text-sm opacity-75">Total Expenses</p>
// // // // // //                     <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <Link
// // // // // //                 to={`/employee/trips/${activeTrip.trip_id}`}
// // // // // //                 className="ml-4 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
// // // // // //               >
// // // // // //                 View Details →
// // // // // //               </Link>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="bg-white rounded-lg shadow p-8 mb-8 text-center">
// // // // // //             <div className="max-w-md mx-auto">
// // // // // //               <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// // // // // //               </svg>
// // // // // //               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Trip</h3>
// // // // // //               <p className="text-gray-600 mb-6">You don't have any active business trip at the moment.</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Quick Actions */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // //           <Link
// // // // // //             to="/employee/trips/new"
// // // // // //             className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition ${
// // // // // //               activeTrip ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
// // // // // //             }`}
// // // // // //           >
// // // // // //             <div className="flex items-center gap-4">
// // // // // //               <div className="p-3 bg-blue-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <h3 className="font-semibold text-gray-900">Create New Trip</h3>
// // // // // //                 <p className="text-sm text-gray-600">
// // // // // //                   {activeTrip ? 'Complete active trip first' : 'Start planning your business trip'}
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </Link>

// // // // // //           <Link
// // // // // //             to="/employee/trips"
// // // // // //             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
// // // // // //           >
// // // // // //             <div className="flex items-center gap-4">
// // // // // //               <div className="p-3 bg-green-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <h3 className="font-semibold text-gray-900">My Trips</h3>
// // // // // //                 <p className="text-sm text-gray-600">View all your business trips</p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </Link>

// // // // // //           <Link
// // // // // //             to="/employee/history"
// // // // // //             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
// // // // // //           >
// // // // // //             <div className="flex items-center gap-4">
// // // // // //               <div className="p-3 bg-purple-100 rounded-lg">
// // // // // //                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <h3 className="font-semibold text-gray-900">Trip History</h3>
// // // // // //                 <p className="text-sm text-gray-600">View completed trips</p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default EmployeeDashboard;


// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Receipt, 
// // // // //   DollarSign, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //     case "approved":
// // // // //       return <Badge className="bg-success text-success-foreground"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>
// // // // //     case "pending":
// // // // //     case "submitted":
// // // // //       return <Badge className="bg-warning text-warning-foreground"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "completed":
// // // // //       return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip
// // // // //       const active = trips.find((t: Trip) => t.status === 'active')
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
// // // // //       const totalAdvance = advances
// // // // //         .filter((a: any) => a.status === 'transferred')
// // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
      
// // // // //       // Fetch notifications
// // // // //       const notifResponse = await notificationAPI.getUnreadCount()
// // // // //       setUnreadNotifications(notifResponse.data.unread_count || 0)
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: totalAdvance,
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* Notifications */}
// // // // //               <Link
// // // // //                 to="/employee/notifications"
// // // // //                 className="relative"
// // // // //               >
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
              
// // // // //               {/* Logout */}
// // // // //               <Button 
// // // // //                 variant="secondary" 
// // // // //                 size="sm"
// // // // //                 onClick={logout}
// // // // //               >
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card>
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Active Trip</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-success">{stats.active_trips}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.completed_trips}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground">Pending Advances</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-warning">{stats.pending_advances}</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     <Badge className="bg-white/20 text-white hover:bg-white/30">Active Trip</Badge>
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard


// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Receipt, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell,
// // // // //   TrendingUp,
// // // // //   Calendar
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // // //     case "awaiting_review":
// // // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // // //     case "under_review_area":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // // //     case "approved_area":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // // //     case "under_review_regional":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // // //     case "approved_regional":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // // //     case "completed":
// // // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "cancelled":
// // // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip (status: active atau awaiting_review)
// // // // //       const active = trips.find((t: Trip) => 
// // // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // // //       )
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
      
// // // // //       // Total advance yang sudah approved (bukan pending/rejected)
// // // // //     const totalAdvance = advances
// // // // //       .filter((a: any) => ['approved_area', 'approved_regional', 'transferred'].includes(a.status))
// // // // //       .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
// // // // //       // Fetch notifications
// // // // //       try {
// // // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // // //       } catch (error) {
// // // // //         console.log('Notifications not available')
// // // // //       }
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: totalAdvance,
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah dimulai
// // // // //   const isTripStarted = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const startDate = new Date(trip.start_date)
// // // // //     return today >= startDate
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah selesai
// // // // //   const isTripEnded = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const endDate = new Date(trip.end_date)
// // // // //     return today > endDate
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* Notifications */}
// // // // //               <Link
// // // // //                 to="/employee/notifications"
// // // // //                 className="relative"
// // // // //               >
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
              
// // // // //               {/* Logout */}
// // // // //               <Button 
// // // // //                 variant="secondary" 
// // // // //                 size="sm"
// // // // //                 onClick={logout}
// // // // //               >
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Plane className="w-4 h-4 mr-2" />
// // // // //                 Total Trips
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Clock className="w-4 h-4 mr-2" />
// // // // //                 Active Trip
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                 Completed
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // // //                 Pending Advances
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     {getStatusBadge(activeTrip.status)}
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   {/* ✅ Trip Progress Info */}
// // // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <TrendingUp className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip is in progress</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         You can upload receipts until the trip ends
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Trip Ended Info */}
// // // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <AlertCircle className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip has ended</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Please submit for review to complete settlement
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Awaiting Review Info */}
// // // // //                   {activeTrip.status === 'awaiting_review' && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <Clock className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Under Review</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Your trip settlement is being reviewed by Finance Area
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Balance</p>
// // // // //                       <p className={`text-lg font-bold ${
// // // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // // //                           ? 'text-white'
// // // // //                           : 'text-red-300'
// // // // //                       }`}>
// // // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //                 <Button 
// // // // //                   onClick={() => navigate("/employee/trips/new")}
// // // // //                   size="lg"
// // // // //                 >
// // // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // // //                   Create New Trip
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ Financial Summary */}
// // // // //         {stats.total_advance_amount > 0 && (
// // // // //           <Card className="shadow-soft">
// // // // //             <CardHeader>
// // // // //               <CardTitle className="flex items-center">
// // // // //                 <TrendingUp className="w-5 h-5 mr-2" />
// // // // //                 Financial Summary
// // // // //               </CardTitle>
// // // // //               <CardDescription>Overview of your advances and expenses</CardDescription>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Advance Received</p>
// // // // //                   <p className="text-2xl font-bold text-green-600">
// // // // //                     {formatCurrency(stats.total_advance_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // // //                   <p className="text-2xl font-bold text-blue-600">
// // // // //                     {formatCurrency(stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // // //                   <p className={`text-2xl font-bold ${
// // // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // // //                       ? 'text-green-600'
// // // // //                       : 'text-red-600'
// // // // //                   }`}>
// // // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard


// // // // // // src/pages/employee/Dashboard.tsx
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell,
// // // // //   TrendingUp
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // // //     case "awaiting_review":
// // // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // // //     case "under_review_area":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // // //     case "approved_area":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // // //     case "under_review_regional":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // // //     case "approved_regional":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // // //     case "completed":
// // // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "cancelled":
// // // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip (status: active atau awaiting_review)
// // // // //       const active = trips.find((t: Trip) => 
// // // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // // //       )
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
      
// // // // //       // ✅ APPROVED ADVANCE: Yang sudah approved (uang akan/sudah ditransfer via bank)
// // // // //      // Ganti 'transferred' dengan 'completed'
// // // // // const approvedAdvance = advances
// // // // //   .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // // //   .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
// // // // //       // Fetch notifications
// // // // //       try {
// // // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // // //       } catch (error) {
// // // // //         console.log('Notifications not available')
// // // // //       }
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: approvedAdvance, // ✅ Approved advance
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah dimulai
// // // // //   const isTripStarted = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const startDate = new Date(trip.start_date)
// // // // //     return today >= startDate
// // // // //   }

// // // // //   // ✅ Cek apakah trip sudah selesai
// // // // //   const isTripEnded = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const endDate = new Date(trip.end_date)
// // // // //     return today > endDate
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* Notifications */}
// // // // //               <Link
// // // // //                 to="/employee/notifications"
// // // // //                 className="relative"
// // // // //               >
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
              
// // // // //               {/* Logout */}
// // // // //               <Button 
// // // // //                 variant="secondary" 
// // // // //                 size="sm"
// // // // //                 onClick={logout}
// // // // //               >
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Plane className="w-4 h-4 mr-2" />
// // // // //                 Total Trips
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Clock className="w-4 h-4 mr-2" />
// // // // //                 Active Trip
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                 Completed
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // // //                 Pending Advances
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     {getStatusBadge(activeTrip.status)}
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   {/* ✅ Trip Progress Info */}
// // // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <TrendingUp className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip is in progress</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         You can upload receipts until the trip ends
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Trip Ended Info */}
// // // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <AlertCircle className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip has ended</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Please submit for review to complete settlement
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* ✅ Awaiting Review Info */}
// // // // //                   {activeTrip.status === 'awaiting_review' && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <Clock className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Under Review</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Your trip settlement is being reviewed by Finance Area
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Balance</p>
// // // // //                       <p className={`text-lg font-bold ${
// // // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // // //                           ? 'text-white'
// // // // //                           : 'text-red-300'
// // // // //                       }`}>
// // // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //                 <Button 
// // // // //                   onClick={() => navigate("/employee/trips/new")}
// // // // //                   size="lg"
// // // // //                 >
// // // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // // //                   Create New Trip
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ Financial Summary - APPROVED ADVANCE */}
// // // // //         {stats.total_advance_amount > 0 && (
// // // // //           <Card className="shadow-soft">
// // // // //             <CardHeader>
// // // // //               <CardTitle className="flex items-center">
// // // // //                 <TrendingUp className="w-5 h-5 mr-2" />
// // // // //                 Financial Summary
// // // // //               </CardTitle>
// // // // //               <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // // //                   <p className="text-2xl font-bold text-green-600">
// // // // //                     {formatCurrency(stats.total_advance_amount)}
// // // // //                   </p>
// // // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // // //                     Will be/has been transferred via bank
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // // //                   <p className="text-2xl font-bold text-blue-600">
// // // // //                     {formatCurrency(stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // // //                   <p className={`text-2xl font-bold ${
// // // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // // //                       ? 'text-green-600'
// // // // //                       : 'text-red-600'
// // // // //                   }`}>
// // // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard


// // // // // // src/pages/employee/Dashboard.tsx
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell,
// // // // //   TrendingUp
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // // //     case "awaiting_review":
// // // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // // //     case "under_review_area":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // // //     case "approved_area":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // // //     case "under_review_regional":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // // //     case "approved_regional":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // // //     case "completed":
// // // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "cancelled":
// // // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip (status: active atau awaiting_review)
// // // // //       const active = trips.find((t: Trip) => 
// // // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // // //       )
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
      
// // // // //       // ✅ APPROVED ADVANCE: Yang sudah approved (uang akan ditransfer via bank)
// // // // //       const approvedAdvance = advances
// // // // //         .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
      
// // // // //       // Fetch notifications
// // // // //       try {
// // // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // // //       } catch (error) {
// // // // //         console.log('Notifications not available')
// // // // //       }
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: approvedAdvance,
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   const isTripStarted = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const startDate = new Date(trip.start_date)
// // // // //     return today >= startDate
// // // // //   }

// // // // //   const isTripEnded = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const endDate = new Date(trip.end_date)
// // // // //     return today > endDate
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               <Link to="/employee/notifications" className="relative">
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
// // // // //               <Button variant="secondary" size="sm" onClick={logout}>
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Plane className="w-4 h-4 mr-2" />
// // // // //                 Total Trips
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Clock className="w-4 h-4 mr-2" />
// // // // //                 Active Trip
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                 Completed
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // // //                 Pending Advances
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     {getStatusBadge(activeTrip.status)}
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <TrendingUp className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip is in progress</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         You can upload receipts until the trip ends
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <AlertCircle className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip has ended</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Please submit for review to complete settlement
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {activeTrip.status === 'awaiting_review' && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <Clock className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Under Review</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Your trip settlement is being reviewed by Finance Area
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Balance</p>
// // // // //                       <p className={`text-lg font-bold ${
// // // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // // //                           ? 'text-white'
// // // // //                           : 'text-red-300'
// // // // //                       }`}>
// // // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //                 <Button 
// // // // //                   onClick={() => navigate("/employee/trips/new")}
// // // // //                   size="lg"
// // // // //                 >
// // // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // // //                   Create New Trip
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ Financial Summary - APPROVED ADVANCE */}
// // // // //         {stats.total_advance_amount > 0 && (
// // // // //           <Card className="shadow-soft">
// // // // //             <CardHeader>
// // // // //               <CardTitle className="flex items-center">
// // // // //                 <TrendingUp className="w-5 h-5 mr-2" />
// // // // //                 Financial Summary
// // // // //               </CardTitle>
// // // // //               <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // // //                   <p className="text-2xl font-bold text-green-600">
// // // // //                     {formatCurrency(stats.total_advance_amount)}
// // // // //                   </p>
// // // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // // //                     Finance will transfer to your account
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // // //                   <p className="text-2xl font-bold text-blue-600">
// // // // //                     {formatCurrency(stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // // //                   <p className={`text-2xl font-bold ${
// // // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // // //                       ? 'text-green-600'
// // // // //                       : 'text-red-600'
// // // // //                   }`}>
// // // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard



// // // // // // src/pages/employee/Dashboard.tsx
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   Plane, 
// // // // //   Clock,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   AlertCircle,
// // // // //   Bell,
// // // // //   TrendingUp
// // // // // } from "lucide-react"
// // // // // import { useNavigate, Link } from "react-router-dom"
// // // // // import { useAuth } from '@/contexts/AuthContext'
// // // // // import { useState, useEffect } from 'react'
// // // // // import { tripAPI, advanceAPI, notificationAPI } from '@/services/api'
// // // // // import { Trip, DashboardStats } from '@/types'

// // // // // const getStatusBadge = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "active":
// // // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // // //     case "awaiting_review":
// // // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // // //     case "under_review_area":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // // //     case "approved_area":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // // //     case "under_review_regional":
// // // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // // //     case "approved_regional":
// // // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // // //     case "completed":
// // // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // // //     case "rejected":
// // // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // // //     case "cancelled":
// // // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // // //     default:
// // // // //       return <Badge variant="outline">{status}</Badge>
// // // // //   }
// // // // // }

// // // // // const EmployeeDashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user, logout } = useAuth()

// // // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // // //   const [stats, setStats] = useState<DashboardStats>({
// // // // //     total_trips: 0,
// // // // //     active_trips: 0,
// // // // //     completed_trips: 0,
// // // // //     pending_advances: 0,
// // // // //     total_advance_amount: 0,
// // // // //     total_expense_amount: 0
// // // // //   })
// // // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     fetchDashboardData()
// // // // //   }, [])

// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       setIsLoading(true)
      
// // // // //       // Fetch trips
// // // // //       const tripsResponse = await tripAPI.getAll()
// // // // //       const trips = tripsResponse.data.data || []
      
// // // // //       // Find active trip (status: active atau awaiting_review)
// // // // //       const active = trips.find((t: Trip) => 
// // // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // // //       )
// // // // //       setActiveTrip(active || null)
      
// // // // //       // Calculate stats
// // // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // // //       // Fetch advances
// // // // //       const advancesResponse = await advanceAPI.getAll()
// // // // //       const advances = advancesResponse.data.data || []
// // // // //       const pending = advances.filter((a: any) => a.status === 'pending').length
      
// // // // //       // ✅ APPROVED ADVANCE: Yang sudah approved (uang akan ditransfer via bank)
// // // // //       const approvedAdvance = advances
// // // // //         .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // // //         .reduce((sum: number, a: any) => sum + (a.approved_amount || 0), 0)
      
// // // // //       // Fetch notifications
// // // // //       try {
// // // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // // //       } catch (error) {
// // // // //         console.log('Notifications not available')
// // // // //       }
      
// // // // //       setStats({
// // // // //         total_trips: trips.length,
// // // // //         active_trips: active ? 1 : 0,
// // // // //         completed_trips: completed,
// // // // //         pending_advances: pending,
// // // // //         total_advance_amount: approvedAdvance,
// // // // //         total_expense_amount: active?.total_expenses || 0
// // // // //       })
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch dashboard data:', error)
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const formatCurrency = (amount: number) => {
// // // // //     return new Intl.NumberFormat('id-ID', {
// // // // //       style: 'currency',
// // // // //       currency: 'IDR',
// // // // //       minimumFractionDigits: 0
// // // // //     }).format(amount)
// // // // //   }

// // // // //   const formatDate = (dateString: string) => {
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // //       day: 'numeric',
// // // // //       month: 'long',
// // // // //       year: 'numeric'
// // // // //     })
// // // // //   }

// // // // //   const isTripStarted = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const startDate = new Date(trip.start_date)
// // // // //     return today >= startDate
// // // // //   }

// // // // //   const isTripEnded = (trip: Trip) => {
// // // // //     const today = new Date()
// // // // //     const endDate = new Date(trip.end_date)
// // // // //     return today > endDate
// // // // //   }

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       {/* Header */}
// // // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // // //         <div className="container mx-auto px-4 py-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               <Link to="/employee/notifications" className="relative">
// // // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // // //                   <Bell className="w-5 h-5" />
// // // // //                 </Button>
// // // // //                 {unreadNotifications > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // // //                     {unreadNotifications}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </Link>
// // // // //               <Button variant="secondary" size="sm" onClick={logout}>
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         {/* Stats Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Plane className="w-4 h-4 mr-2" />
// // // // //                 Total Trips
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <Clock className="w-4 h-4 mr-2" />
// // // // //                 Active Trip
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                 Completed
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card className="hover:shadow-lg transition-shadow">
// // // // //             <CardHeader className="pb-3">
// // // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // // //                 Pending Advances
// // // // //               </CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* Active Trip Card */}
// // // // //         {activeTrip ? (
// // // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-start justify-between">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="flex items-center gap-2 mb-2">
// // // // //                     {getStatusBadge(activeTrip.status)}
// // // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // // //                   </div>
// // // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <TrendingUp className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip is in progress</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         You can upload receipts until the trip ends
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <AlertCircle className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Trip has ended</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Please submit for review to complete settlement
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {activeTrip.status === 'awaiting_review' && (
// // // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <Clock className="w-5 h-5" />
// // // // //                         <span className="font-semibold">Under Review</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm opacity-90 mt-1">
// // // // //                         Your trip settlement is being reviewed by Finance Area
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}
                  
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Duration</p>
// // // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">End Date</p>
// // // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-sm opacity-75">Balance</p>
// // // // //                       <p className={`text-lg font-bold ${
// // // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // // //                           ? 'text-white'
// // // // //                           : 'text-red-300'
// // // // //                       }`}>
// // // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <Button 
// // // // //                   variant="secondary"
// // // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // // //                   className="ml-4"
// // // // //                 >
// // // // //                   View Details →
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         ) : (
// // // // //           <Card className="mb-8 shadow-soft">
// // // // //             <CardContent className="p-8 text-center">
// // // // //               <div className="max-w-md mx-auto">
// // // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // // //                 <Button 
// // // // //                   onClick={() => navigate("/employee/trips/new")}
// // // // //                   size="lg"
// // // // //                 >
// // // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // // //                   Create New Trip
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         )}

// // // // //         {/* Quick Actions */}
// // // // //         <Card className="mb-8 shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle>Quick Actions</CardTitle>
// // // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //             <Button 
// // // // //               onClick={() => navigate("/employee/trips/new")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //               disabled={!!activeTrip}
// // // // //             >
// // // // //               <PlusCircle className="w-6 h-6" />
// // // // //               <span>New Trip Request</span>
// // // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/trips")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Plane className="w-6 h-6" />
// // // // //               <span>My Trips</span>
// // // // //             </Button>

// // // // //             <Button 
// // // // //               variant="outline"
// // // // //               onClick={() => navigate("/employee/history")}
// // // // //               className="h-auto py-6 flex-col gap-2"
// // // // //             >
// // // // //               <Clock className="w-6 h-6" />
// // // // //               <span>Trip History</span>
// // // // //             </Button>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* ✅ FIXED: Financial Summary - SELALU TAMPIL! */}
// // // // //         <Card className="shadow-soft">
// // // // //           <CardHeader>
// // // // //             <CardTitle className="flex items-center">
// // // // //               <TrendingUp className="w-5 h-5 mr-2" />
// // // // //               Financial Summary
// // // // //             </CardTitle>
// // // // //             <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {stats.total_advance_amount > 0 ? (
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // // //                   <p className="text-2xl font-bold text-green-600">
// // // // //                     {formatCurrency(stats.total_advance_amount)}
// // // // //                   </p>
// // // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // // //                     Finance will transfer to your account
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // // //                   <p className="text-2xl font-bold text-blue-600">
// // // // //                     {formatCurrency(stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // // //                   <p className={`text-2xl font-bold ${
// // // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // // //                       ? 'text-green-600'
// // // // //                       : 'text-red-600'
// // // // //                   }`}>
// // // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="text-center py-8">
// // // // //                 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
// // // // //                 <h3 className="text-lg font-semibold mb-2">No Approved Advances Yet</h3>
// // // // //                 <p className="text-muted-foreground">
// // // // //                   Your advance requests will appear here once they are approved by Finance.
// // // // //                 </p>
// // // // //               </div>
// // // // //             )}
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default EmployeeDashboard



// // // // // src/pages/employee/Dashboard.tsx
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { 
// // // //   PlusCircle, 
// // // //   Plane, 
// // // //   Clock,
// // // //   CheckCircle2,
// // // //   XCircle,
// // // //   AlertCircle,
// // // //   Bell,
// // // //   LogOut,  // ✅ TAMBAHKAN INI!
// // // //   TrendingUp
// // // // } from "lucide-react"
// // // // import { useNavigate, Link } from "react-router-dom"
// // // // import { useAuth } from '@/contexts/AuthContext'
// // // // import { useState, useEffect } from 'react'
// // // // import { tripAPI, notificationAPI } from '@/services/api'
// // // // import { Trip, DashboardStats } from '@/types'

// // // // const getStatusBadge = (status: string) => {
// // // //   switch (status) {
// // // //     case "active":
// // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // //     case "awaiting_review":
// // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // //     case "under_review_area":
// // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Area)</Badge>
// // // //     case "approved_area":
// // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Area)</Badge>
// // // //     case "under_review_regional":
// // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // //     case "approved_regional":
// // // //       return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Approved (Regional)</Badge>
// // // //     case "completed":
// // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // //     case "rejected":
// // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // //     case "cancelled":
// // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // //     default:
// // // //       return <Badge variant="outline">{status}</Badge>
// // // //   }
// // // // }

// // // // const EmployeeDashboard = () => {
// // // //   const navigate = useNavigate()
// // // //   const { user, logout } = useAuth()

// // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // //   const [stats, setStats] = useState<DashboardStats>({
// // // //     total_trips: 0,
// // // //     active_trips: 0,
// // // //     completed_trips: 0,
// // // //     pending_advances: 0,
// // // //     total_advance_amount: 0,
// // // //     total_expense_amount: 0
// // // //   })
// // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // //   const [isLoading, setIsLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     fetchDashboardData()
// // // //   }, [])

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       setIsLoading(true)
      
// // // //       // Fetch trips
// // // //       const tripsResponse = await tripAPI.getAll()
// // // //       const trips = tripsResponse.data.data || []
      
// // // //       // Find active trip (status: active atau awaiting_review)
// // // //       const active = trips.find((t: Trip) => 
// // // //         t.status === 'active' || t.status === 'awaiting_review'
// // // //       )
// // // //       setActiveTrip(active || null)
      
// // // //       // Calculate stats
// // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // //       // ✅ FIX: Fetch advances ONLY for active trip (if exists)
// // // //       let approvedAdvance = 0
// // // //       let pending = 0
      
// // // //       if (active) {
// // // //         try {
// // // //           // ✅ Fetch advances for the active trip specifically
// // // //           const advancesResponse = await tripAPI.getAdvances(active.trip_id)
// // // //           const advances = advancesResponse.data.data || []
          
// // // //           console.log('📊 Fetched advances for active trip:', advances)
          
// // // //           // Count pending advances
// // // //           pending = advances.filter((a: any) => a.status === 'pending').length
          
// // // //           // ✅ APPROVED ADVANCE: Yang sudah approved (uang akan ditransfer via bank)
// // // //           approvedAdvance = advances
// // // //             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // //             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
          
// // // //           console.log('✅ Approved advance total:', approvedAdvance)
// // // //           console.log('⏳ Pending advances count:', pending)
// // // //         } catch (error) {
// // // //           console.error('Failed to fetch advances for active trip:', error)
// // // //         }
// // // //       } else {
// // // //         console.log('ℹ️ No active trip found')
// // // //       }
      
// // // //       // Fetch notifications
// // // //       try {
// // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // //       } catch (error) {
// // // //         console.log('Notifications not available')
// // // //       }
      
// // // //       setStats({
// // // //         total_trips: trips.length,
// // // //         active_trips: active ? 1 : 0,
// // // //         completed_trips: completed,
// // // //         pending_advances: pending,
// // // //         total_advance_amount: approvedAdvance,
// // // //         total_expense_amount: active?.total_expenses || 0
// // // //       })
      
// // // //       console.log('📈 Dashboard stats:', {
// // // //         total_trips: trips.length,
// // // //         active_trips: active ? 1 : 0,
// // // //         completed_trips: completed,
// // // //         pending_advances: pending,
// // // //         total_advance_amount: approvedAdvance,
// // // //         total_expense_amount: active?.total_expenses || 0
// // // //       })
      
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch dashboard data:', error)
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const formatCurrency = (amount: number) => {
// // // //     return new Intl.NumberFormat('id-ID', {
// // // //       style: 'currency',
// // // //       currency: 'IDR',
// // // //       minimumFractionDigits: 0
// // // //     }).format(amount)
// // // //   }

// // // //   const formatDate = (dateString: string) => {
// // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // //       day: 'numeric',
// // // //       month: 'long',
// // // //       year: 'numeric'
// // // //     })
// // // //   }

// // // //   const isTripStarted = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const startDate = new Date(trip.start_date)
// // // //     return today >= startDate
// // // //   }

// // // //   const isTripEnded = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const endDate = new Date(trip.end_date)
// // // //     return today > endDate
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //      {/* Header */}
// // // // <header className="bg-gradient-primary border-b shadow-soft">
// // // //   <div className="container mx-auto px-4 py-4">
// // // //     <div className="flex items-center justify-between">
// // // //       <div className="flex items-center gap-3">
// // // //         <img 
// // // //           src="/logo-telkom-akses.png" 
// // // //           alt="Telkom Akses" 
// // // //           className="h-10 w-auto bg-white rounded px-2 py-1"
// // // //           onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // //         />
// // // //         <div>
// // // //           <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // //           <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // //         </div>
// // // //       </div>
// // // //       <div className="flex items-center gap-3">
// // // //         <Link to="/employee/notifications" className="relative">
// // // //           <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // //             <Bell className="w-5 h-5" />
// // // //           </Button>
// // // //           {unreadNotifications > 0 && (
// // // //             <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // //               {unreadNotifications}
// // // //             </span>
// // // //           )}
// // // //         </Link>
// // // //         {/* ✅ LOGOUT BUTTON DENGAN ICON */}
// // // //         <Button variant="secondary" size="sm" onClick={logout}>
// // // //           <LogOut className="w-4 h-4 mr-2" />
// // // //           Logout
// // // //         </Button>
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // </header>

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Stats Cards */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Plane className="w-4 h-4 mr-2" />
// // // //                 Total Trips
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Clock className="w-4 h-4 mr-2" />
// // // //                 Active Trip
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // //                 Completed
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // //                 Pending Advances
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>

// // // //         {/* Active Trip Card */}
// // // //         {activeTrip ? (
// // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // //             <CardContent className="p-6">
// // // //               <div className="flex items-start justify-between">
// // // //                 <div className="flex-1">
// // // //                   <div className="flex items-center gap-2 mb-2">
// // // //                     {getStatusBadge(activeTrip.status)}
// // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // //                   </div>
// // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // //                   {isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <TrendingUp className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip is in progress</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         You can upload receipts until the trip ends
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {isTripEnded(activeTrip) && activeTrip.status === 'active' && (
// // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <AlertCircle className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip has ended</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Please submit for review to complete settlement
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {activeTrip.status === 'awaiting_review' && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Clock className="w-5 h-5" />
// // // //                         <span className="font-semibold">Under Review</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Your trip settlement is being reviewed by Finance Area
// // // //                       </p>
// // // //                     </div>
// // // //                   )}
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Duration</p>
// // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">End Date</p>
// // // //                       <p className="font-semibold">{formatDate(activeTrip.end_date)}</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Balance</p>
// // // //                       <p className={`text-lg font-bold ${
// // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // //                           ? 'text-white'
// // // //                           : 'text-red-300'
// // // //                       }`}>
// // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <Button 
// // // //                   variant="secondary"
// // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // //                   className="ml-4"
// // // //                 >
// // // //                   View Details →
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ) : (
// // // //           <Card className="mb-8 shadow-soft">
// // // //             <CardContent className="p-8 text-center">
// // // //               <div className="max-w-md mx-auto">
// // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // //                 <Button 
// // // //                   onClick={() => navigate("/employee/trips/new")}
// // // //                   size="lg"
// // // //                 >
// // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // //                   Create New Trip
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         )}

// // // //         {/* Quick Actions */}
// // // //         <Card className="mb-8 shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle>Quick Actions</CardTitle>
// // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //             <Button 
// // // //               onClick={() => navigate("/employee/trips/new")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //               disabled={!!activeTrip}
// // // //             >
// // // //               <PlusCircle className="w-6 h-6" />
// // // //               <span>New Trip Request</span>
// // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/trips")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Plane className="w-6 h-6" />
// // // //               <span>My Trips</span>
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/history")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Clock className="w-6 h-6" />
// // // //               <span>Trip History</span>
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* ✅ FIXED: Financial Summary - SELALU TAMPIL! */}
// // // //         <Card className="shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle className="flex items-center">
// // // //               <TrendingUp className="w-5 h-5 mr-2" />
// // // //               Financial Summary
// // // //             </CardTitle>
// // // //             <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             {stats.total_advance_amount > 0 ? (
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // //                   <p className="text-2xl font-bold text-green-600">
// // // //                     {formatCurrency(stats.total_advance_amount)}
// // // //                   </p>
// // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // //                     Finance will transfer to your account
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // //                   <p className="text-2xl font-bold text-blue-600">
// // // //                     {formatCurrency(stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // //                   <p className={`text-2xl font-bold ${
// // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // //                       ? 'text-green-600'
// // // //                       : 'text-red-600'
// // // //                   }`}>
// // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="text-center py-8">
// // // //                 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Approved Advances Yet</h3>
// // // //                 <p className="text-muted-foreground">
// // // //                   Your advance requests will appear here once they are approved by Finance.
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default EmployeeDashboard





// // // // // src/pages/employee/Dashboard.tsx
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { 
// // // //   PlusCircle, 
// // // //   Plane, 
// // // //   Clock,
// // // //   CheckCircle2,
// // // //   XCircle,
// // // //   AlertCircle,
// // // //   Bell,
// // // //   LogOut,
// // // //   TrendingUp
// // // // } from "lucide-react"
// // // // import { useNavigate, Link } from "react-router-dom"
// // // // import { useAuth } from '@/contexts/AuthContext'
// // // // import { useState, useEffect } from 'react'
// // // // import { tripAPI, notificationAPI } from '@/services/api'
// // // // import { Trip, DashboardStats } from '@/types'

// // // // const getStatusBadge = (status: string) => {
// // // //   switch (status) {
// // // //     case "active":
// // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // //     case "awaiting_review":
// // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // //     case "under_review_regional":
// // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // //     case "completed":
// // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // //     case "rejected":
// // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // //     case "cancelled":
// // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // //     default:
// // // //       return <Badge variant="outline">{status}</Badge>
// // // //   }
// // // // }

// // // // const EmployeeDashboard = () => {
// // // //   const navigate = useNavigate()
// // // //   const { user, logout } = useAuth()

// // // //   const [activeTrip, setActiveTrip] = useState<Trip | null>(null)
// // // //   const [stats, setStats] = useState<DashboardStats>({
// // // //     total_trips: 0,
// // // //     active_trips: 0,
// // // //     completed_trips: 0,
// // // //     pending_advances: 0,
// // // //     total_advance_amount: 0,
// // // //     total_expense_amount: 0
// // // //   })
// // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // //   const [isLoading, setIsLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     fetchDashboardData()
// // // //   }, [])

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       setIsLoading(true)
      
// // // //       // Fetch trips
// // // //       const tripsResponse = await tripAPI.getAll()
// // // //       const trips = tripsResponse.data.data || []
      
// // // //       // ✅ FIX: Find active trip (active, awaiting_review, ATAU under_review_regional)
// // // //       const active = trips.find((t: Trip) => 
// // // //         ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
// // // //       )
// // // //       setActiveTrip(active || null)
      
// // // //       // Calculate stats
// // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
      
// // // //       // ✅ Fetch advances ONLY for active trip (if exists)
// // // //       let approvedAdvance = 0
// // // //       let pending = 0
      
// // // //       if (active) {
// // // //         try {
// // // //           const advancesResponse = await tripAPI.getAdvances(active.trip_id)
// // // //           const advances = advancesResponse.data.data || []
          
// // // //           // Count pending advances
// // // //           pending = advances.filter((a: any) => a.status === 'pending').length
          
// // // //           // ✅ APPROVED ADVANCE: Yang sudah approved
// // // //           approvedAdvance = advances
// // // //             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // //             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
// // // //         } catch (error) {
// // // //           console.error('Failed to fetch advances for active trip:', error)
// // // //         }
// // // //       }
      
// // // //       // Fetch notifications
// // // //       try {
// // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // //       } catch (error) {
// // // //         console.log('Notifications not available')
// // // //       }
      
// // // //       setStats({
// // // //         total_trips: trips.length,
// // // //         active_trips: active ? 1 : 0,
// // // //         completed_trips: completed,
// // // //         pending_advances: pending,
// // // //         total_advance_amount: approvedAdvance,
// // // //         total_expense_amount: active?.total_expenses || 0
// // // //       })
      
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch dashboard data:', error)
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const formatCurrency = (amount: number) => {
// // // //     return new Intl.NumberFormat('id-ID', {
// // // //       style: 'currency',
// // // //       currency: 'IDR',
// // // //       minimumFractionDigits: 0
// // // //     }).format(amount)
// // // //   }

// // // //   const formatDate = (dateString: string) => {
// // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // //       day: 'numeric',
// // // //       month: 'long',
// // // //       year: 'numeric'
// // // //     })
// // // //   }

// // // //   const isTripStarted = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const startDate = new Date(trip.start_date)
// // // //     return today >= startDate
// // // //   }

// // // //   const isTripEnded = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const endDate = new Date(trip.extended_end_date || trip.end_date)
// // // //     return today > endDate
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       {/* Header */}
// // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // //         <div className="container mx-auto px-4 py-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center gap-3">
// // // //               <img 
// // // //                 src="/logo-telkom-akses.png" 
// // // //                 alt="Telkom Akses" 
// // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // //               />
// // // //               <div>
// // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex items-center gap-3">
// // // //               <Link to="/employee/notifications" className="relative">
// // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // //                   <Bell className="w-5 h-5" />
// // // //                 </Button>
// // // //                 {unreadNotifications > 0 && (
// // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // //                     {unreadNotifications}
// // // //                   </span>
// // // //                 )}
// // // //               </Link>
// // // //               <Button variant="secondary" size="sm" onClick={logout}>
// // // //                 <LogOut className="w-4 h-4 mr-2" />
// // // //                 Logout
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Stats Cards */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Plane className="w-4 h-4 mr-2" />
// // // //                 Total Trips
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Clock className="w-4 h-4 mr-2" />
// // // //                 Active Trip
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // //                 Completed
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // //                 Pending Advances
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>

// // // //         {/* Active Trip Card */}
// // // //         {activeTrip ? (
// // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // //             <CardContent className="p-6">
// // // //               <div className="flex items-start justify-between">
// // // //                 <div className="flex-1">
// // // //                   <div className="flex items-center gap-2 mb-2">
// // // //                     {getStatusBadge(activeTrip.status)}
// // // //                     <span className="text-sm opacity-90">{activeTrip.trip_number}</span>
// // // //                   </div>
// // // //                   <h2 className="text-2xl font-bold mb-2">{activeTrip.destination}</h2>
// // // //                   <p className="opacity-90 mb-4">{activeTrip.purpose}</p>
                  
// // // //                   {/* ✅ ACTIVE: Trip is in progress */}
// // // //                   {activeTrip.status === 'active' && isTripStarted(activeTrip) && !isTripEnded(activeTrip) && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <TrendingUp className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip is in progress</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         You can upload receipts until the trip ends
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ ACTIVE: Trip has ended */}
// // // //                   {activeTrip.status === 'active' && isTripEnded(activeTrip) && (
// // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <AlertCircle className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip has ended</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Please submit for review to complete settlement
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ AWAITING REVIEW: Under review by Finance Area */}
// // // //                   {activeTrip.status === 'awaiting_review' && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Clock className="w-5 h-5" />
// // // //                         <span className="font-semibold">Under Review (Finance Area)</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Your trip settlement is being reviewed by Finance Area. They will check your receipts physically.
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ UNDER REVIEW REGIONAL: Under review by Finance Regional */}
// // // //                   {activeTrip.status === 'under_review_regional' && (
// // // //                     <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Clock className="w-5 h-5" />
// // // //                         <span className="font-semibold">Under Review (Finance Regional)</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Finance Regional is reviewing your trip settlement for final approval.
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

                 
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Duration</p>
// // // //                       <p className="font-semibold">{activeTrip.duration} days</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // //                       <p className="font-semibold">{formatDate(activeTrip.start_date)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">End Date</p>
// // // //                       <p className="font-semibold">{formatDate(activeTrip.extended_end_date || activeTrip.end_date)}</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_advance || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(activeTrip.total_expenses || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Balance</p>
// // // //                       <p className={`text-lg font-bold ${
// // // //                         (activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0) >= 0
// // // //                           ? 'text-white'
// // // //                           : 'text-red-300'
// // // //                       }`}>
// // // //                         {formatCurrency((activeTrip.total_advance || 0) - (activeTrip.total_expenses || 0))}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <Button 
// // // //                   variant="secondary"
// // // //                   onClick={() => navigate(`/employee/trips/${activeTrip.trip_id}`)}
// // // //                   className="ml-4"
// // // //                 >
// // // //                   View Details →
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ) : (
// // // //           <Card className="mb-8 shadow-soft">
// // // //             <CardContent className="p-8 text-center">
// // // //               <div className="max-w-md mx-auto">
// // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Active Trip</h3>
// // // //                 <p className="text-muted-foreground mb-6">You don't have any active business trip at the moment.</p>
// // // //                 <Button 
// // // //                   onClick={() => navigate("/employee/trips/new")}
// // // //                   size="lg"
// // // //                 >
// // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // //                   Create New Trip
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         )}

// // // //         {/* Quick Actions */}
// // // //         <Card className="mb-8 shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle>Quick Actions</CardTitle>
// // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //             <Button 
// // // //               onClick={() => navigate("/employee/trips/new")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //               disabled={!!activeTrip}
// // // //             >
// // // //               <PlusCircle className="w-6 h-6" />
// // // //               <span>New Trip Request</span>
// // // //               {activeTrip && <span className="text-xs opacity-75">Complete active trip first</span>}
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/trips")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Plane className="w-6 h-6" />
// // // //               <span>My Trips</span>
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/history")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Clock className="w-6 h-6" />
// // // //               <span>Trip History</span>
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Financial Summary */}
// // // //         <Card className="shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle className="flex items-center">
// // // //               <TrendingUp className="w-5 h-5 mr-2" />
// // // //               Financial Summary
// // // //             </CardTitle>
// // // //             <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             {stats.total_advance_amount > 0 ? (
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // //                   <p className="text-2xl font-bold text-green-600">
// // // //                     {formatCurrency(stats.total_advance_amount)}
// // // //                   </p>
// // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // //                     Finance will transfer to your account
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // //                   <p className="text-2xl font-bold text-blue-600">
// // // //                     {formatCurrency(stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // //                   <p className={`text-2xl font-bold ${
// // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // //                       ? 'text-green-600'
// // // //                       : 'text-red-600'
// // // //                   }`}>
// // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="text-center py-8">
// // // //                 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Approved Advances Yet</h3>
// // // //                 <p className="text-muted-foreground">
// // // //                   Your advance requests will appear here once they are approved by Finance.
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default EmployeeDashboard




// // // // // src/pages/employee/Dashboard.tsx
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { 
// // // //   PlusCircle, 
// // // //   Plane, 
// // // //   Clock,
// // // //   CheckCircle2,
// // // //   XCircle,
// // // //   AlertCircle,
// // // //   Bell,
// // // //   LogOut,
// // // //   TrendingUp
// // // // } from "lucide-react"
// // // // import { useNavigate, Link } from "react-router-dom"
// // // // import { useAuth } from '@/contexts/AuthContext'
// // // // import { useState, useEffect } from 'react'
// // // // import { tripAPI, notificationAPI } from '@/services/api'
// // // // import { Trip, DashboardStats } from '@/types'

// // // // const getStatusBadge = (status: string) => {
// // // //   switch (status) {
// // // //     case "active":
// // // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // // //     case "awaiting_review":
// // // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // // //     case "under_review_regional":
// // // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // // //     case "completed":
// // // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // // //     case "rejected":
// // // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // // //     case "cancelled":
// // // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // // //     default:
// // // //       return <Badge variant="outline">{status}</Badge>
// // // //   }
// // // // }

// // // // const EmployeeDashboard = () => {
// // // //   const navigate = useNavigate()
// // // //   const { user, logout } = useAuth()

// // // //   const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
// // // //   const [stats, setStats] = useState<DashboardStats>({
// // // //     total_trips: 0,
// // // //     active_trips: 0,
// // // //     completed_trips: 0,
// // // //     pending_advances: 0,
// // // //     total_advance_amount: 0,
// // // //     total_expense_amount: 0
// // // //   })
// // // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // // //   const [isLoading, setIsLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     fetchDashboardData()
// // // //   }, [])

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       setIsLoading(true)
      
// // // //       // Fetch trips
// // // //       const tripsResponse = await tripAPI.getAll()
// // // //       const trips = tripsResponse.data.data || []
      
// // // //       // ✅ UBAH: Cari trip terbaru (prioritas: active -> completed -> cancelled -> lainnya)
// // // //       const sortedTrips = [...trips].sort((a, b) => 
// // // //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// // // //       )
      
// // // //       const current = sortedTrips.find((t: Trip) => 
// // // //         ['active', 'awaiting_review', 'under_review_regional', 'completed', 'cancelled'].includes(t.status)
// // // //       )
// // // //       setCurrentTrip(current || null)
      
// // // //       // Calculate stats
// // // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
// // // //       const active = trips.filter((t: Trip) => 
// // // //         ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
// // // //       ).length
      
// // // //       // ✅ Fetch advances ONLY untuk trip yang active/under review
// // // //       let approvedAdvance = 0
// // // //       let pending = 0
      
// // // //       if (current && ['active', 'awaiting_review', 'under_review_regional'].includes(current.status)) {
// // // //         try {
// // // //           const advancesResponse = await tripAPI.getAdvances(current.trip_id)
// // // //           const advances = advancesResponse.data.data || []
          
// // // //           // Count pending advances
// // // //           pending = advances.filter((a: any) => a.status === 'pending').length
          
// // // //           // ✅ APPROVED ADVANCE: Yang sudah approved
// // // //           approvedAdvance = advances
// // // //             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // // //             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
// // // //         } catch (error) {
// // // //           console.error('Failed to fetch advances for current trip:', error)
// // // //         }
// // // //       }
      
// // // //       // Fetch notifications
// // // //       try {
// // // //         const notifResponse = await notificationAPI.getUnreadCount()
// // // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // // //       } catch (error) {
// // // //         console.log('Notifications not available')
// // // //       }
      
// // // //       setStats({
// // // //         total_trips: trips.length,
// // // //         active_trips: active,
// // // //         completed_trips: completed,
// // // //         pending_advances: pending,
// // // //         total_advance_amount: approvedAdvance,
// // // //         total_expense_amount: current?.total_expenses || 0
// // // //       })
      
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch dashboard data:', error)
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const formatCurrency = (amount: number) => {
// // // //     return new Intl.NumberFormat('id-ID', {
// // // //       style: 'currency',
// // // //       currency: 'IDR',
// // // //       minimumFractionDigits: 0
// // // //     }).format(amount)
// // // //   }

// // // //   const formatDate = (dateString: string) => {
// // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // //       day: 'numeric',
// // // //       month: 'long',
// // // //       year: 'numeric'
// // // //     })
// // // //   }

// // // //   const isTripStarted = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const startDate = new Date(trip.start_date)
// // // //     return today >= startDate
// // // //   }

// // // //   const isTripEnded = (trip: Trip) => {
// // // //     const today = new Date()
// // // //     const endDate = new Date(trip.extended_end_date || trip.end_date)
// // // //     return today > endDate
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       {/* Header */}
// // // //       <header className="bg-gradient-primary border-b shadow-soft">
// // // //         <div className="container mx-auto px-4 py-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center gap-3">
// // // //               <img 
// // // //                 src="/logo-telkom-akses.png" 
// // // //                 alt="Telkom Akses" 
// // // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // // //               />
// // // //               <div>
// // // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex items-center gap-3">
// // // //               <Link to="/employee/notifications" className="relative">
// // // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // // //                   <Bell className="w-5 h-5" />
// // // //                 </Button>
// // // //                 {unreadNotifications > 0 && (
// // // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // // //                     {unreadNotifications}
// // // //                   </span>
// // // //                 )}
// // // //               </Link>
// // // //               <Button variant="secondary" size="sm" onClick={logout}>
// // // //                 <LogOut className="w-4 h-4 mr-2" />
// // // //                 Logout
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Stats Cards */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Plane className="w-4 h-4 mr-2" />
// // // //                 Total Trips
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <Clock className="w-4 h-4 mr-2" />
// // // //                 Active Trip
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // // //                 Completed
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card className="hover:shadow-lg transition-shadow">
// // // //             <CardHeader className="pb-3">
// // // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // // //                 Pending Advances
// // // //               </CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>

// // // //         {/* Current Trip Card - TAMPIL UNTUK SEMUA STATUS */}
// // // //         {currentTrip ? (
// // // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // // //             <CardContent className="p-6">
// // // //               <div className="flex items-start justify-between">
// // // //                 <div className="flex-1">
// // // //                   <div className="flex items-center gap-2 mb-2">
// // // //                     {getStatusBadge(currentTrip.status)}
// // // //                     <span className="text-sm opacity-90">{currentTrip.trip_number}</span>
// // // //                   </div>
// // // //                   <h2 className="text-2xl font-bold mb-2">{currentTrip.destination}</h2>
// // // //                   <p className="opacity-90 mb-4">{currentTrip.purpose}</p>
                  
// // // //                   {/* ✅ ACTIVE: Trip is in progress */}
// // // //                   {currentTrip.status === 'active' && isTripStarted(currentTrip) && !isTripEnded(currentTrip) && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <TrendingUp className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip is in progress</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         You can upload receipts until the trip ends
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ ACTIVE: Trip has ended */}
// // // //                   {currentTrip.status === 'active' && isTripEnded(currentTrip) && (
// // // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <AlertCircle className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip has ended</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Please submit for review to complete settlement
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ AWAITING REVIEW: Under review by Finance Area */}
// // // //                   {currentTrip.status === 'awaiting_review' && (
// // // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Clock className="w-5 h-5" />
// // // //                         <span className="font-semibold">Under Review (Finance Area)</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Your trip settlement is being reviewed by Finance Area. They will check your receipts physically.
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ UNDER REVIEW REGIONAL: Under review by Finance Regional */}
// // // //                   {currentTrip.status === 'under_review_regional' && (
// // // //                     <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Clock className="w-5 h-5" />
// // // //                         <span className="font-semibold">Under Review (Finance Regional)</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Finance Regional is reviewing your trip settlement for final approval.
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ COMPLETED: Trip has been completed */}
// // // //                   {currentTrip.status === 'completed' && (
// // // //                     <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <CheckCircle2 className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip Completed</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         Your trip has been completed and settled. Thank you!
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* ✅ CANCELLED: Trip has been cancelled */}
// // // //                   {currentTrip.status === 'cancelled' && (
// // // //                     <div className="bg-gray-500/20 border border-gray-300 rounded-lg p-3 mb-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <XCircle className="w-5 h-5" />
// // // //                         <span className="font-semibold">Trip Cancelled</span>
// // // //                       </div>
// // // //                       <p className="text-sm opacity-90 mt-1">
// // // //                         This trip has been cancelled.
// // // //                       </p>
// // // //                     </div>
// // // //                   )}
                  
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Duration</p>
// // // //                       <p className="font-semibold">{currentTrip.duration} days</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Start Date</p>
// // // //                       <p className="font-semibold">{formatDate(currentTrip.start_date)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">End Date</p>
// // // //                       <p className="font-semibold">{formatDate(currentTrip.extended_end_date || currentTrip.end_date)}</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Advance</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_advance || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // // //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_expenses || 0)}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-sm opacity-75">Balance</p>
// // // //                       <p className={`text-lg font-bold ${
// // // //                         (currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0) >= 0
// // // //                           ? 'text-white'
// // // //                           : 'text-red-300'
// // // //                       }`}>
// // // //                         {formatCurrency((currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0))}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <Button 
// // // //                   variant="secondary"
// // // //                   onClick={() => navigate(`/employee/trips/${currentTrip.trip_id}`)}
// // // //                   className="ml-4"
// // // //                 >
// // // //                   View Details →
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ) : (
// // // //           <Card className="mb-8 shadow-soft">
// // // //             <CardContent className="p-8 text-center">
// // // //               <div className="max-w-md mx-auto">
// // // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Recent Trip</h3>
// // // //                 <p className="text-muted-foreground mb-6">You don't have any recent business trip.</p>
// // // //                 <Button 
// // // //                   onClick={() => navigate("/employee/trips/new")}
// // // //                   size="lg"
// // // //                 >
// // // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // // //                   Create New Trip
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         )}

// // // //         {/* Quick Actions */}
// // // //         <Card className="mb-8 shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle>Quick Actions</CardTitle>
// // // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //             <Button 
// // // //               onClick={() => navigate("/employee/trips/new")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //               disabled={currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status)}
// // // //             >
// // // //               <PlusCircle className="w-6 h-6" />
// // // //               <span>New Trip Request</span>
// // // //               {currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status) && (
// // // //                 <span className="text-xs opacity-75">Complete active trip first</span>
// // // //               )}
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/trips")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Plane className="w-6 h-6" />
// // // //               <span>My Trips</span>
// // // //             </Button>

// // // //             <Button 
// // // //               variant="outline"
// // // //               onClick={() => navigate("/employee/history")}
// // // //               className="h-auto py-6 flex-col gap-2"
// // // //             >
// // // //               <Clock className="w-6 h-6" />
// // // //               <span>Trip History</span>
// // // //             </Button>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Financial Summary */}
// // // //         <Card className="shadow-soft">
// // // //           <CardHeader>
// // // //             <CardTitle className="flex items-center">
// // // //               <TrendingUp className="w-5 h-5 mr-2" />
// // // //               Financial Summary
// // // //             </CardTitle>
// // // //             <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             {stats.total_advance_amount > 0 ? (
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // // //                   <p className="text-2xl font-bold text-green-600">
// // // //                     {formatCurrency(stats.total_advance_amount)}
// // // //                   </p>
// // // //                   <p className="text-xs text-muted-foreground mt-1">
// // // //                     Finance will transfer to your account
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // // //                   <p className="text-2xl font-bold text-blue-600">
// // // //                     {formatCurrency(stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // // //                   <p className={`text-2xl font-bold ${
// // // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // // //                       ? 'text-green-600'
// // // //                       : 'text-red-600'
// // // //                   }`}>
// // // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="text-center py-8">
// // // //                 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
// // // //                 <h3 className="text-lg font-semibold mb-2">No Approved Advances Yet</h3>
// // // //                 <p className="text-muted-foreground">
// // // //                   Your advance requests will appear here once they are approved by Finance.
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default EmployeeDashboard





// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Badge } from "@/components/ui/badge"
// // // import { 
// // //   PlusCircle, 
// // //   Plane, 
// // //   Clock,
// // //   CheckCircle2,
// // //   XCircle,
// // //   AlertCircle,
// // //   Bell,
// // //   LogOut,
// // //   TrendingUp
// // // } from "lucide-react"
// // // import { useNavigate, Link } from "react-router-dom"
// // // import { useAuth } from '@/contexts/AuthContext'
// // // import { useState, useEffect } from 'react'
// // // import { tripAPI, notificationAPI } from '@/services/api'
// // // import { Trip, DashboardStats } from '@/types'

// // // const getStatusBadge = (status: string) => {
// // //   switch (status) {
// // //     case "active":
// // //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// // //     case "awaiting_review":
// // //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// // //     case "under_review_regional":
// // //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// // //     case "completed":
// // //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// // //     case "rejected":
// // //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// // //     case "cancelled":
// // //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// // //     default:
// // //       return <Badge variant="outline">{status}</Badge>
// // //   }
// // // }

// // // const EmployeeDashboard = () => {
// // //   const navigate = useNavigate()
// // //   const { user, logout } = useAuth()

// // //   const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
// // //   const [stats, setStats] = useState<DashboardStats>({
// // //     total_trips: 0,
// // //     active_trips: 0,
// // //     completed_trips: 0,
// // //     pending_advances: 0,
// // //     total_advance_amount: 0,
// // //     total_expense_amount: 0
// // //   })
// // //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// // //   const [isLoading, setIsLoading] = useState(true)

// // //   useEffect(() => {
// // //     fetchDashboardData()
// // //   }, [])

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       setIsLoading(true)
      
// // //       // Fetch trips
// // //       const tripsResponse = await tripAPI.getAll()
// // //       const trips = tripsResponse.data.data || []
      
// // //       // ✅ UBAH: Cari trip terbaru (prioritas: active -> completed -> cancelled -> lainnya)
// // //       const sortedTrips = [...trips].sort((a, b) => 
// // //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// // //       )
      
// // //       const current = sortedTrips.find((t: Trip) => 
// // //         ['active', 'awaiting_review', 'under_review_regional', 'completed', 'cancelled'].includes(t.status)
// // //       )
// // //       setCurrentTrip(current || null)
      
// // //       // Calculate stats
// // //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
// // //       const active = trips.filter((t: Trip) => 
// // //         ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
// // //       ).length
      
// // //       // ✅ Fetch advances ONLY untuk trip yang active/under review
// // //       let approvedAdvance = 0
// // //       let pending = 0
      
// // //       if (current && ['active', 'awaiting_review', 'under_review_regional'].includes(current.status)) {
// // //         try {
// // //           const advancesResponse = await tripAPI.getAdvances(current.trip_id)
// // //           const advances = advancesResponse.data.data || []
          
// // //           // Count pending advances
// // //           pending = advances.filter((a: any) => a.status === 'pending').length
          
// // //           // ✅ APPROVED ADVANCE: Yang sudah approved
// // //           approvedAdvance = advances
// // //             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// // //             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
// // //         } catch (error) {
// // //           console.error('Failed to fetch advances for current trip:', error)
// // //         }
// // //       }
      
// // //       // Fetch notifications
// // //       try {
// // //         const notifResponse = await notificationAPI.getUnreadCount()
// // //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// // //       } catch (error) {
// // //         console.log('Notifications not available')
// // //       }
      
// // //       setStats({
// // //         total_trips: trips.length,
// // //         active_trips: active,
// // //         completed_trips: completed,
// // //         pending_advances: pending,
// // //         total_advance_amount: approvedAdvance,
// // //         total_expense_amount: current?.total_expenses || 0
// // //       })
      
// // //     } catch (error) {
// // //       console.error('Failed to fetch dashboard data:', error)
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const formatCurrency = (amount: number) => {
// // //     return new Intl.NumberFormat('id-ID', {
// // //       style: 'currency',
// // //       currency: 'IDR',
// // //       minimumFractionDigits: 0
// // //     }).format(amount)
// // //   }

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // //       day: 'numeric',
// // //       month: 'long',
// // //       year: 'numeric'
// // //     })
// // //   }

// // //   const isTripStarted = (trip: Trip) => {
// // //     const today = new Date()
// // //     const startDate = new Date(trip.start_date)
// // //     return today >= startDate
// // //   }

// // //   const isTripEnded = (trip: Trip) => {
// // //   const today = new Date()
// // //   today.setHours(0, 0, 0, 0)  // ✅ TAMBAH INI!
  
// // //   const endDate = new Date(trip.extended_end_date || trip.end_date)
// // //   endDate.setHours(0, 0, 0, 0)  // ✅ TAMBAH INI!
  
// // //   return today > endDate
// // // }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// // //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       {/* Header */}
// // //       <header className="bg-gradient-primary border-b shadow-soft">
// // //         <div className="container mx-auto px-4 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-3">
// // //               <img 
// // //                 src="/logo-telkom-akses.png" 
// // //                 alt="Telkom Akses" 
// // //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// // //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// // //               />
// // //               <div>
// // //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// // //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center gap-3">
// // //               <Link to="/employee/notifications" className="relative">
// // //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// // //                   <Bell className="w-5 h-5" />
// // //                 </Button>
// // //                 {unreadNotifications > 0 && (
// // //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// // //                     {unreadNotifications}
// // //                   </span>
// // //                 )}
// // //               </Link>
// // //               <Button variant="secondary" size="sm" onClick={logout}>
// // //                 <LogOut className="w-4 h-4 mr-2" />
// // //                 Logout
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-4 py-8">
// // //         {/* Stats Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // //           <Card className="hover:shadow-lg transition-shadow">
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // //                 <Plane className="w-4 h-4 mr-2" />
// // //                 Total Trips
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// // //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="hover:shadow-lg transition-shadow">
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // //                 <Clock className="w-4 h-4 mr-2" />
// // //                 Active Trip
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// // //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="hover:shadow-lg transition-shadow">
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// // //                 Completed
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// // //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="hover:shadow-lg transition-shadow">
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// // //                 <AlertCircle className="w-4 h-4 mr-2" />
// // //                 Pending Advances
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// // //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* Current Trip Card - TAMPIL UNTUK SEMUA STATUS */}
// // //         {currentTrip ? (
// // //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// // //             <CardContent className="p-6">
// // //               <div className="flex items-start justify-between">
// // //                 <div className="flex-1">
// // //                   <div className="flex items-center gap-2 mb-2">
// // //                     {getStatusBadge(currentTrip.status)}
// // //                     <span className="text-sm opacity-90">{currentTrip.trip_number}</span>
// // //                   </div>
// // //                   <h2 className="text-2xl font-bold mb-2">{currentTrip.destination}</h2>
// // //                   <p className="opacity-90 mb-4">{currentTrip.purpose}</p>
                  
// // //                   {/* ✅ ACTIVE: Trip is in progress */}
// // //                   {currentTrip.status === 'active' && isTripStarted(currentTrip) && !isTripEnded(currentTrip) && (
// // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <TrendingUp className="w-5 h-5" />
// // //                         <span className="font-semibold">Trip is in progress</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         You can upload receipts until the trip ends
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ✅ ACTIVE: Trip has ended */}
// // //                   {currentTrip.status === 'active' && isTripEnded(currentTrip) && (
// // //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <AlertCircle className="w-5 h-5" />
// // //                         <span className="font-semibold">Trip has ended</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         Please submit for review to complete settlement
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ✅ AWAITING REVIEW: Under review by Finance Area */}
// // //                   {currentTrip.status === 'awaiting_review' && (
// // //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <Clock className="w-5 h-5" />
// // //                         <span className="font-semibold">Under Review (Finance Area)</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         Your trip settlement is being reviewed by Finance Area. They will check your receipts physically.
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ✅ UNDER REVIEW REGIONAL: Under review by Finance Regional */}
// // //                   {currentTrip.status === 'under_review_regional' && (
// // //                     <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <Clock className="w-5 h-5" />
// // //                         <span className="font-semibold">Under Review (Finance Regional)</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         Finance Regional is reviewing your trip settlement for final approval.
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ✅ COMPLETED: Trip has been completed */}
// // //                   {currentTrip.status === 'completed' && (
// // //                     <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <CheckCircle2 className="w-5 h-5" />
// // //                         <span className="font-semibold">Trip Completed</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         Your trip has been completed and settled. Thank you!
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* ✅ CANCELLED: Trip has been cancelled */}
// // //                   {currentTrip.status === 'cancelled' && (
// // //                     <div className="bg-gray-500/20 border border-gray-300 rounded-lg p-3 mb-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <XCircle className="w-5 h-5" />
// // //                         <span className="font-semibold">Trip Cancelled</span>
// // //                       </div>
// // //                       <p className="text-sm opacity-90 mt-1">
// // //                         This trip has been cancelled.
// // //                       </p>
// // //                     </div>
// // //                   )}
                  
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // //                     <div>
// // //                       <p className="text-sm opacity-75">Duration</p>
// // //                       <p className="font-semibold">{currentTrip.duration} days</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm opacity-75">Start Date</p>
// // //                       <p className="font-semibold">{formatDate(currentTrip.start_date)}</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm opacity-75">End Date</p>
// // //                       <p className="font-semibold">{formatDate(currentTrip.extended_end_date || currentTrip.end_date)}</p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// // //                     <div>
// // //                       <p className="text-sm opacity-75">Total Advance</p>
// // //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_advance || 0)}</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm opacity-75">Total Expenses</p>
// // //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_expenses || 0)}</p>
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-sm opacity-75">Balance</p>
// // //                       <p className={`text-lg font-bold ${
// // //                         (currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0) >= 0
// // //                           ? 'text-white'
// // //                           : 'text-red-300'
// // //                       }`}>
// // //                         {formatCurrency((currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0))}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <Button 
// // //                   variant="secondary"
// // //                   onClick={() => navigate(`/employee/trips/${currentTrip.trip_id}`)}
// // //                   className="ml-4"
// // //                 >
// // //                   View Details →
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         ) : (
// // //           <Card className="mb-8 shadow-soft">
// // //             <CardContent className="p-8 text-center">
// // //               <div className="max-w-md mx-auto">
// // //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// // //                 <h3 className="text-lg font-semibold mb-2">No Recent Trip</h3>
// // //                 <p className="text-muted-foreground mb-6">You don't have any recent business trip.</p>
// // //                 <Button 
// // //                   onClick={() => navigate("/employee/trips/new")}
// // //                   size="lg"
// // //                 >
// // //                   <PlusCircle className="w-5 h-5 mr-2" />
// // //                   Create New Trip
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         )}

// // //         {/* Quick Actions */}
// // //         <Card className="mb-8 shadow-soft">
// // //           <CardHeader>
// // //             <CardTitle>Quick Actions</CardTitle>
// // //             <CardDescription>Manage your business trips and expenses</CardDescription>
// // //           </CardHeader>
// // //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //             <Button 
// // //               onClick={() => navigate("/employee/trips/new")}
// // //               className="h-auto py-6 flex-col gap-2"
// // //               disabled={currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status)}
// // //             >
// // //               <PlusCircle className="w-6 h-6" />
// // //               <span>New Trip Request</span>
// // //               {currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status) && (
// // //                 <span className="text-xs opacity-75">Complete active trip first</span>
// // //               )}
// // //             </Button>

// // //             <Button 
// // //               variant="outline"
// // //               onClick={() => navigate("/employee/trips")}
// // //               className="h-auto py-6 flex-col gap-2"
// // //             >
// // //               <Plane className="w-6 h-6" />
// // //               <span>My Trips</span>
// // //             </Button>

// // //             <Button 
// // //               variant="outline"
// // //               onClick={() => navigate("/employee/history")}
// // //               className="h-auto py-6 flex-col gap-2"
// // //             >
// // //               <Clock className="w-6 h-6" />
// // //               <span>Trip History</span>
// // //             </Button>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Financial Summary */}
// // //         <Card className="shadow-soft">
// // //           <CardHeader>
// // //             <CardTitle className="flex items-center">
// // //               <TrendingUp className="w-5 h-5 mr-2" />
// // //               Financial Summary
// // //             </CardTitle>
// // //             <CardDescription>Overview of your approved advances and expenses</CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             {stats.total_advance_amount > 0 ? (
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground mb-1">Approved Advance</p>
// // //                   <p className="text-2xl font-bold text-green-600">
// // //                     {formatCurrency(stats.total_advance_amount)}
// // //                   </p>
// // //                   <p className="text-xs text-muted-foreground mt-1">
// // //                     Finance will transfer to your account
// // //                   </p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
// // //                   <p className="text-2xl font-bold text-blue-600">
// // //                     {formatCurrency(stats.total_expense_amount)}
// // //                   </p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground mb-1">Balance</p>
// // //                   <p className={`text-2xl font-bold ${
// // //                     stats.total_advance_amount - stats.total_expense_amount >= 0
// // //                       ? 'text-green-600'
// // //                       : 'text-red-600'
// // //                   }`}>
// // //                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="text-center py-8">
// // //                 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
// // //                 <h3 className="text-lg font-semibold mb-2">No Approved Advances Yet</h3>
// // //                 <p className="text-muted-foreground">
// // //                   Your advance requests will appear here once they are approved by Finance.
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default EmployeeDashboard




// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { 
// //   PlusCircle, 
// //   Plane, 
// //   Clock,
// //   CheckCircle2,
// //   XCircle,
// //   AlertCircle,
// //   Bell,
// //   LogOut,
// //   TrendingUp,
// //   Settings // ✅ TAMBAH INI
// // } from "lucide-react"
// // import { useNavigate, Link } from "react-router-dom"
// // import { useAuth } from '@/contexts/AuthContext'
// // import { useState, useEffect } from 'react'
// // import { tripAPI, notificationAPI } from '@/services/api'
// // import { Trip, DashboardStats } from '@/types'

// // const getStatusBadge = (status: string) => {
// //   switch (status) {
// //     case "active":
// //       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
// //     case "awaiting_review":
// //       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
// //     case "under_review_regional":
// //       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
// //     case "completed":
// //       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
// //     case "rejected":
// //       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
// //     case "cancelled":
// //       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
// //     default:
// //       return <Badge variant="outline">{status}</Badge>
// //   }
// // }

// // const EmployeeDashboard = () => {
// //   const navigate = useNavigate()
// //   const { user, logout } = useAuth()

// //   const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
// //   const [stats, setStats] = useState<DashboardStats>({
// //     total_trips: 0,
// //     active_trips: 0,
// //     completed_trips: 0,
// //     pending_advances: 0,
// //     total_advance_amount: 0,
// //     total_expense_amount: 0
// //   })
// //   const [unreadNotifications, setUnreadNotifications] = useState(0)
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     fetchDashboardData()
// //   }, [])

// //   const fetchDashboardData = async () => {
// //     try {
// //       setIsLoading(true)
      
// //       // Fetch trips
// //       const tripsResponse = await tripAPI.getAll()
// //       const trips = tripsResponse.data.data || []
      
// //       // ✅ UBAH: Cari trip terbaru (prioritas: active -> completed -> cancelled -> lainnya)
// //       const sortedTrips = [...trips].sort((a, b) => 
// //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// //       )
      
// //       const current = sortedTrips.find((t: Trip) => 
// //         ['active', 'awaiting_review', 'under_review_regional', 'completed', 'cancelled'].includes(t.status)
// //       )
// //       setCurrentTrip(current || null)
      
// //       // Calculate stats
// //       const completed = trips.filter((t: Trip) => t.status === 'completed').length
// //       const active = trips.filter((t: Trip) => 
// //         ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
// //       ).length
      
// //       // ✅ Fetch advances ONLY untuk trip yang active/under review
// //       let approvedAdvance = 0
// //       let pending = 0
      
// //       if (current && ['active', 'awaiting_review', 'under_review_regional'].includes(current.status)) {
// //         try {
// //           const advancesResponse = await tripAPI.getAdvances(current.trip_id)
// //           const advances = advancesResponse.data.data || []
          
// //           // Count pending advances
// //           pending = advances.filter((a: any) => a.status === 'pending').length
          
// //           // ✅ APPROVED ADVANCE: Yang sudah approved
// //           approvedAdvance = advances
// //             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
// //             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
// //         } catch (error) {
// //           console.error('Failed to fetch advances for current trip:', error)
// //         }
// //       }
      
// //       // Fetch notifications
// //       try {
// //         const notifResponse = await notificationAPI.getUnreadCount()
// //         setUnreadNotifications(notifResponse.data.unread_count || 0)
// //       } catch (error) {
// //         console.log('Notifications not available')
// //       }
      
// //       setStats({
// //         total_trips: trips.length,
// //         active_trips: active,
// //         completed_trips: completed,
// //         pending_advances: pending,
// //         total_advance_amount: approvedAdvance,
// //         total_expense_amount: current?.total_expenses || 0
// //       })
      
// //     } catch (error) {
// //       console.error('Failed to fetch dashboard data:', error)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('id-ID', {
// //       style: 'currency',
// //       currency: 'IDR',
// //       minimumFractionDigits: 0
// //     }).format(amount)
// //   }

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('id-ID', {
// //       day: 'numeric',
// //       month: 'long',
// //       year: 'numeric'
// //     })
// //   }

// //   const isTripStarted = (trip: Trip) => {
// //     const today = new Date()
// //     const startDate = new Date(trip.start_date)
// //     return today >= startDate
// //   }

// //   const isTripEnded = (trip: Trip) => {
// //     const today = new Date()
// //     today.setHours(0, 0, 0, 0)
    
// //     const endDate = new Date(trip.extended_end_date || trip.end_date)
// //     endDate.setHours(0, 0, 0, 0)
    
// //     return today > endDate
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <header className="bg-gradient-primary border-b shadow-soft">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <img 
// //                 src="/logo-telkom-akses.png" 
// //                 alt="Telkom Akses" 
// //                 className="h-10 w-auto bg-white rounded px-2 py-1"
// //                 onError={(e) => { e.currentTarget.style.display = 'none' }}
// //               />
// //               <div>
// //                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
// //                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               <Link to="/employee/notifications" className="relative">
// //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
// //                   <Bell className="w-5 h-5" />
// //                 </Button>
// //                 {unreadNotifications > 0 && (
// //                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
// //                     {unreadNotifications}
// //                   </span>
// //                 )}
// //               </Link>

// //               {/* ✅ TAMBAH PROFILE BUTTON */}
// //               <Link to="/employee/profile">
// //                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
// //                   <Settings className="w-5 h-5" />
// //                 </Button>
// //               </Link>

// //               <Button variant="secondary" size="sm" onClick={logout}>
// //                 <LogOut className="w-4 h-4 mr-2" />
// //                 Logout
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* ... REST OF THE DASHBOARD CODE REMAINS THE SAME ... */}
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //           <Card className="hover:shadow-lg transition-shadow">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// //                 <Plane className="w-4 h-4 mr-2" />
// //                 Total Trips
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.total_trips}</div>
// //               <p className="text-xs text-muted-foreground mt-1">All time</p>
// //             </CardContent>
// //           </Card>

// //           <Card className="hover:shadow-lg transition-shadow">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// //                 <Clock className="w-4 h-4 mr-2" />
// //                 Active Trip
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
// //             </CardContent>
// //           </Card>

// //           <Card className="hover:shadow-lg transition-shadow">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// //                 <CheckCircle2 className="w-4 h-4 mr-2" />
// //                 Completed
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
// //             </CardContent>
// //           </Card>

// //           <Card className="hover:shadow-lg transition-shadow">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
// //                 <AlertCircle className="w-4 h-4 mr-2" />
// //                 Pending Advances
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Current Trip Card */}
// //         {currentTrip ? (
// //           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
// //             <CardContent className="p-6">
// //               <div className="flex items-start justify-between">
// //                 <div className="flex-1">
// //                   <div className="flex items-center gap-2 mb-2">
// //                     {getStatusBadge(currentTrip.status)}
// //                     <span className="text-sm opacity-90">{currentTrip.trip_number}</span>
// //                   </div>
// //                   <h2 className="text-2xl font-bold mb-2">{currentTrip.destination}</h2>
// //                   <p className="opacity-90 mb-4">{currentTrip.purpose}</p>
                  
// //                   {/* Trip status messages */}
// //                   {currentTrip.status === 'active' && isTripStarted(currentTrip) && !isTripEnded(currentTrip) && (
// //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <TrendingUp className="w-5 h-5" />
// //                         <span className="font-semibold">Trip is in progress</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         You can upload receipts until the trip ends
// //                       </p>
// //                     </div>
// //                   )}

// //                   {currentTrip.status === 'active' && isTripEnded(currentTrip) && (
// //                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <AlertCircle className="w-5 h-5" />
// //                         <span className="font-semibold">Trip has ended</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         Please submit for review to complete settlement
// //                       </p>
// //                     </div>
// //                   )}

// //                   {currentTrip.status === 'awaiting_review' && (
// //                     <div className="bg-white/10 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <Clock className="w-5 h-5" />
// //                         <span className="font-semibold">Under Review (Finance Area)</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         Your trip settlement is being reviewed by Finance Area
// //                       </p>
// //                     </div>
// //                   )}

// //                   {currentTrip.status === 'under_review_regional' && (
// //                     <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <Clock className="w-5 h-5" />
// //                         <span className="font-semibold">Under Review (Finance Regional)</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         Finance Regional is reviewing your trip settlement
// //                       </p>
// //                     </div>
// //                   )}

// //                   {currentTrip.status === 'completed' && (
// //                     <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <CheckCircle2 className="w-5 h-5" />
// //                         <span className="font-semibold">Trip Completed</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         Your trip has been completed and settled
// //                       </p>
// //                     </div>
// //                   )}

// //                   {currentTrip.status === 'cancelled' && (
// //                     <div className="bg-gray-500/20 border border-gray-300 rounded-lg p-3 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <XCircle className="w-5 h-5" />
// //                         <span className="font-semibold">Trip Cancelled</span>
// //                       </div>
// //                       <p className="text-sm opacity-90 mt-1">
// //                         This trip has been cancelled
// //                       </p>
// //                     </div>
// //                   )}
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// //                     <div>
// //                       <p className="text-sm opacity-75">Duration</p>
// //                       <p className="font-semibold">{currentTrip.duration} days</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm opacity-75">Start Date</p>
// //                       <p className="font-semibold">{formatDate(currentTrip.start_date)}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm opacity-75">End Date</p>
// //                       <p className="font-semibold">{formatDate(currentTrip.extended_end_date || currentTrip.end_date)}</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-4 pt-4 border-t border-white/20">
// //                     <div>
// //                       <p className="text-sm opacity-75">Total Advance</p>
// //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_advance || 0)}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm opacity-75">Total Expenses</p>
// //                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_expenses || 0)}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm opacity-75">Balance</p>
// //                       <p className={`text-lg font-bold ${
// //                         (currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0) >= 0
// //                           ? 'text-white'
// //                           : 'text-red-300'
// //                       }`}>
// //                         {formatCurrency((currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0))}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <Button 
// //                   variant="secondary"
// //                   onClick={() => navigate(`/employee/trips/${currentTrip.trip_id}`)}
// //                   className="ml-4"
// //                 >
// //                   View Details →
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           <Card className="mb-8 shadow-soft">
// //             <CardContent className="p-8 text-center">
// //               <div className="max-w-md mx-auto">
// //                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// //                 <h3 className="text-lg font-semibold mb-2">No Recent Trip</h3>
// //                 <p className="text-muted-foreground mb-6">You don't have any recent business trip.</p>
// //                 <Button 
// //                   onClick={() => navigate("/employee/trips/new")}
// //                   size="lg"
// //                 >
// //                   <PlusCircle className="w-5 h-5 mr-2" />
// //                   Create New Trip
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         )}

// //         {/* Quick Actions */}
// //         <Card className="mb-8 shadow-soft">
// //           <CardHeader>
// //             <CardTitle>Quick Actions</CardTitle>
// //             <CardDescription>Manage your business trips and expenses</CardDescription>
// //           </CardHeader>
// //           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <Button 
// //               onClick={() => navigate("/employee/trips/new")}
// //               className="h-auto py-6 flex-col gap-2"
// //               disabled={currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status)}
// //             >
// //               <PlusCircle className="w-6 h-6" />
// //               <span>New Trip Request</span>
// //               {currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status) && (
// //                 <span className="text-xs opacity-75">Complete active trip first</span>
// //               )}
// //             </Button>

// //             <Button 
// //               variant="outline"
// //               onClick={() => navigate("/employee/trips")}
// //               className="h-auto py-6 flex-col gap-2"
// //             >
// //               <Plane className="w-6 h-6" />
// //               <span>My Trips</span>
// //             </Button>

// //             <Button 
// //               variant="outline"
// //               onClick={() => navigate("/employee/history")}
// //               className="h-auto py-6 flex-col gap-2"
// //             >
// //               <Clock className="w-6 h-6" />
// //               <span>Trip History</span>
// //             </Button>
// //           </CardContent>
// //         </Card>

// //         {/* Financial Summary */}
// //         <Card className="shadow-soft">
// //           <CardHeader>
// //             <CardTitle className="flex items-center">
// //               <TrendingUp className="w-5 h-5 mr-2" />
// //               Financial Summary
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <h4 className="font-semibold mb-3">Advance Summary</h4>
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between">
// //                     <span>Total Approved Advance:</span>
// //                     <span className="font-semibold text-green-600">
// //                       {formatCurrency(stats.total_advance_amount)}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Pending Advances:</span>
// //                     <span className="font-semibold text-yellow-600">
// //                       {stats.pending_advances} requests
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div>
// //                 <h4 className="font-semibold mb-3">Expense Summary</h4>
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between">
// //                     <span>Total Expenses:</span>
// //                     <span className="font-semibold text-blue-600">
// //                       {formatCurrency(stats.total_expense_amount)}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Current Balance:</span>
// //                     <span className={`font-semibold ${
// //                       stats.total_advance_amount - stats.total_expense_amount >= 0 
// //                         ? 'text-green-600' 
// //                         : 'text-red-600'
// //                     }`}>
// //                       {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EmployeeDashboard





// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { 
//   PlusCircle, 
//   Plane, 
//   Clock,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Bell,
//   LogOut,
//   TrendingUp,
//   User
// } from "lucide-react"
// import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from '@/contexts/AuthContext'
// import { useState, useEffect } from 'react'
// import { tripAPI, notificationAPI } from '@/services/api'
// import { Trip, DashboardStats } from '@/types'

// const getStatusBadge = (status: string) => {
//   switch (status) {
//     case "active":
//       return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
//     case "awaiting_review":
//       return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
//     case "under_review_regional":
//       return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
//     case "completed":
//       return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
//     case "rejected":
//       return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
//     case "cancelled":
//       return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
//     default:
//       return <Badge variant="outline">{status}</Badge>
//   }
// }

// const EmployeeDashboard = () => {
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()

//   const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
//   const [stats, setStats] = useState<DashboardStats>({
//     total_trips: 0,
//     active_trips: 0,
//     completed_trips: 0,
//     pending_advances: 0,
//     total_advance_amount: 0,
//     total_expense_amount: 0
//   })
//   const [unreadNotifications, setUnreadNotifications] = useState(0)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       setIsLoading(true)
      
//       const tripsResponse = await tripAPI.getAll()
//       const trips = tripsResponse.data.data || []
      
//       const sortedTrips = [...trips].sort((a, b) => 
//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       )
      
//       const current = sortedTrips.find((t: Trip) => 
//         ['active', 'awaiting_review', 'under_review_regional', 'completed', 'cancelled'].includes(t.status)
//       )
//       setCurrentTrip(current || null)
      
//       const completed = trips.filter((t: Trip) => t.status === 'completed').length
//       const active = trips.filter((t: Trip) => 
//         ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
//       ).length
      
//       let approvedAdvance = 0
//       let pending = 0
      
//       if (current && ['active', 'awaiting_review', 'under_review_regional'].includes(current.status)) {
//         try {
//           const advancesResponse = await tripAPI.getAdvances(current.trip_id)
//           const advances = advancesResponse.data.data || []
          
//           pending = advances.filter((a: any) => a.status === 'pending').length
          
//           approvedAdvance = advances
//             .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
//             .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
//         } catch (error) {
//           console.error('Failed to fetch advances for current trip:', error)
//         }
//       }
      
//       try {
//         const notifResponse = await notificationAPI.getUnreadCount()
//         setUnreadNotifications(notifResponse.data.unread_count || 0)
//       } catch (error) {
//         console.log('Notifications not available')
//       }
      
//       setStats({
//         total_trips: trips.length,
//         active_trips: active,
//         completed_trips: completed,
//         pending_advances: pending,
//         total_advance_amount: approvedAdvance,
//         total_expense_amount: current?.total_expenses || 0
//       })
      
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     })
//   }

//   const isTripStarted = (trip: Trip) => {
//     const today = new Date()
//     const startDate = new Date(trip.start_date)
//     return today >= startDate
//   }

//   const isTripEnded = (trip: Trip) => {
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)
    
//     const endDate = new Date(trip.extended_end_date || trip.end_date)
//     endDate.setHours(0, 0, 0, 0)
    
//     return today > endDate
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-gradient-primary border-b shadow-soft">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <img 
//                 src="/logo-telkom-akses.png" 
//                 alt="Telkom Akses" 
//                 className="h-10 w-auto bg-white rounded px-2 py-1"
//                 onError={(e) => { e.currentTarget.style.display = 'none' }}
//               />
//               <div>
//                 <h1 className="text-xl font-bold text-white">Employee Portal</h1>
//                 <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Link to="/employee/notifications" className="relative">
//                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
//                   <Bell className="w-5 h-5" />
//                 </Button>
//                 {unreadNotifications > 0 && (
//                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
//                     {unreadNotifications}
//                   </span>
//                 )}
//               </Link>

//               <Link to="/employee/profile">
//                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
//                   <User className="w-5 h-5" />
//                 </Button>
//               </Link>

//               <Button variant="secondary" size="sm" onClick={logout}>
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
//                 <Plane className="w-4 h-4 mr-2" />
//                 Total Trips
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.total_trips}</div>
//               <p className="text-xs text-muted-foreground mt-1">All time</p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Active Trip
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
//               <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
//                 <CheckCircle2 className="w-4 h-4 mr-2" />
//                 Completed
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
//               <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
//                 <AlertCircle className="w-4 h-4 mr-2" />
//                 Pending Advances
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
//               <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Current Trip Card */}
//         {currentTrip ? (
//           <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     {getStatusBadge(currentTrip.status)}
//                     <span className="text-sm opacity-90">{currentTrip.trip_number}</span>
//                   </div>
//                   <h2 className="text-2xl font-bold mb-2">{currentTrip.destination}</h2>
//                   <p className="opacity-90 mb-4">{currentTrip.purpose}</p>
                  
//                   {currentTrip.status === 'active' && isTripStarted(currentTrip) && !isTripEnded(currentTrip) && (
//                     <div className="bg-white/10 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <TrendingUp className="w-5 h-5" />
//                         <span className="font-semibold">Trip is in progress</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         You can upload receipts until the trip ends
//                       </p>
//                     </div>
//                   )}

//                   {currentTrip.status === 'active' && isTripEnded(currentTrip) && (
//                     <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <AlertCircle className="w-5 h-5" />
//                         <span className="font-semibold">Trip has ended</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         Please submit for review to complete settlement
//                       </p>
//                     </div>
//                   )}

//                   {currentTrip.status === 'awaiting_review' && (
//                     <div className="bg-white/10 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-5 h-5" />
//                         <span className="font-semibold">Under Review (Finance Area)</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         Your trip settlement is being reviewed by Finance Area
//                       </p>
//                     </div>
//                   )}

//                   {currentTrip.status === 'under_review_regional' && (
//                     <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-5 h-5" />
//                         <span className="font-semibold">Under Review (Finance Regional)</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         Finance Regional is reviewing your trip settlement
//                       </p>
//                     </div>
//                   )}

//                   {currentTrip.status === 'completed' && (
//                     <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <CheckCircle2 className="w-5 h-5" />
//                         <span className="font-semibold">Trip Completed</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         Your trip has been completed and settled
//                       </p>
//                     </div>
//                   )}

//                   {currentTrip.status === 'cancelled' && (
//                     <div className="bg-gray-500/20 border border-gray-300 rounded-lg p-3 mb-4">
//                       <div className="flex items-center gap-2">
//                         <XCircle className="w-5 h-5" />
//                         <span className="font-semibold">Trip Cancelled</span>
//                       </div>
//                       <p className="text-sm opacity-90 mt-1">
//                         This trip has been cancelled
//                       </p>
//                     </div>
//                   )}
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <div>
//                       <p className="text-sm opacity-75">Duration</p>
//                       <p className="font-semibold">{currentTrip.duration} days</p>
//                     </div>
//                     <div>
//                       <p className="text-sm opacity-75">Start Date</p>
//                       <p className="font-semibold">{formatDate(currentTrip.start_date)}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm opacity-75">End Date</p>
//                       <p className="font-semibold">{formatDate(currentTrip.extended_end_date || currentTrip.end_date)}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-4 pt-4 border-t border-white/20">
//                     <div>
//                       <p className="text-sm opacity-75">Total Advance</p>
//                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_advance || 0)}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm opacity-75">Total Expenses</p>
//                       <p className="text-lg font-bold">{formatCurrency(currentTrip.total_expenses || 0)}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm opacity-75">Balance</p>
//                       <p className={`text-lg font-bold ${
//                         (currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0) >= 0
//                           ? 'text-white'
//                           : 'text-red-300'
//                       }`}>
//                         {formatCurrency((currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0))}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <Button 
//                   variant="secondary"
//                   onClick={() => navigate(`/employee/trips/${currentTrip.trip_id}`)}
//                   className="ml-4"
//                 >
//                   View Details →
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <Card className="mb-8 shadow-soft">
//             <CardContent className="p-8 text-center">
//               <div className="max-w-md mx-auto">
//                 <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">No Recent Trip</h3>
//                 <p className="text-muted-foreground mb-6">You don't have any recent business trip.</p>
//                 <Button 
//                   onClick={() => navigate("/employee/trips/new")}
//                   size="lg"
//                 >
//                   <PlusCircle className="w-5 h-5 mr-2" />
//                   Create New Trip
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Quick Actions */}
//         <Card className="mb-8 shadow-soft">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Manage your business trips and expenses</CardDescription>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Button 
//               onClick={() => navigate("/employee/trips/new")}
//               className="h-auto py-6 flex-col gap-2"
//               disabled={currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status)}
//             >
//               <PlusCircle className="w-6 h-6" />
//               <span>New Trip Request</span>
//               {currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status) && (
//                 <span className="text-xs opacity-75">Complete active trip first</span>
//               )}
//             </Button>

//             <Button 
//               variant="outline"
//               onClick={() => navigate("/employee/trips")}
//               className="h-auto py-6 flex-col gap-2"
//             >
//               <Plane className="w-6 h-6" />
//               <span>My Trips</span>
//             </Button>

//             <Button 
//               variant="outline"
//               onClick={() => navigate("/employee/history")}
//               className="h-auto py-6 flex-col gap-2"
//             >
//               <Clock className="w-6 h-6" />
//               <span>Trip History</span>
//             </Button>
//           </CardContent>
//         </Card>

//         {/* ✅ Financial Summary - Conditional Layout */}
//         <Card className="shadow-soft">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <TrendingUp className="w-5 h-5 mr-2" />
//               Financial Summary
//             </CardTitle>
//             <CardDescription>Overview of your approved advances and expenses</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {stats.total_advance_amount === 0 ? (
//               // ✅ Empty State - No Approved Advances Yet
//               <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8 text-center">
//                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
//                   <AlertCircle className="w-8 h-8 text-orange-500" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Advances Yet</h3>
//                 <p className="text-sm text-gray-600">
//                   Your advance requests will appear here once they are approved by Finance.
//                 </p>
//               </div>
//             ) : (
//               // ✅ Show Financial Data - 3 Columns
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Approved Advance */}
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-2">Approved Advance</p>
//                   <p className="text-2xl font-bold text-green-600">
//                     {formatCurrency(stats.total_advance_amount)}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-1">
//                     Funds will transfer to your account
//                   </p>
//                 </div>

//                 {/* Total Expense */}
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-2">Total Expense</p>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {formatCurrency(stats.total_expense_amount)}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-1">
//                     {stats.total_expense_amount > 0 ? 'Total receipts uploaded' : 'No expenses recorded'}
//                   </p>
//                 </div>

//                 {/* Balance */}
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-2">Balance</p>
//                   <p className={`text-2xl font-bold ${
//                     stats.total_advance_amount - stats.total_expense_amount >= 0 
//                       ? 'text-green-600' 
//                       : 'text-red-600'
//                   }`}>
//                     {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-1">
//                     {stats.total_advance_amount - stats.total_expense_amount > 0 
//                       ? 'Remaining balance' 
//                       : stats.total_advance_amount - stats.total_expense_amount < 0 
//                       ? 'Over budget' 
//                       : 'Balanced'}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default EmployeeDashboard




import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  Plane, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bell,
  LogOut,
  TrendingUp,
  User,
  Calendar
} from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { tripAPI, notificationAPI } from '@/services/api'
import { Trip, DashboardStats } from '@/types'

const getStatusBadge = (status: string, isExtended: boolean = false) => {
  // ✅ PRIORITY: Check if extended first
  if (isExtended) {
    return <Badge className="bg-purple-500 text-white"><Calendar className="w-3 h-3 mr-1" />Extended</Badge>
  }
  
  switch (status) {
    case "active":
      return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Active</Badge>
    case "awaiting_review":
      return <Badge className="bg-yellow-500 text-white"><AlertCircle className="w-3 h-3 mr-1" />Awaiting Review</Badge>
    case "under_review_regional":
      return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Under Review (Regional)</Badge>
    case "completed":
      return <Badge className="bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
    case "rejected":
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
    case "cancelled":
      return <Badge variant="outline" className="text-gray-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const EmployeeDashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    total_trips: 0,
    active_trips: 0,
    completed_trips: 0,
    pending_advances: 0,
    total_advance_amount: 0,
    total_expense_amount: 0
  })
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      const tripsResponse = await tripAPI.getAll()
      const trips = tripsResponse.data.data || []
      
      const sortedTrips = [...trips].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      
      const current = sortedTrips.find((t: Trip) => 
        ['active', 'awaiting_review', 'under_review_regional', 'completed', 'cancelled'].includes(t.status)
      )
      setCurrentTrip(current || null)
      
      const completed = trips.filter((t: Trip) => t.status === 'completed').length
      const active = trips.filter((t: Trip) => 
        ['active', 'awaiting_review', 'under_review_regional'].includes(t.status)
      ).length
      
      let approvedAdvance = 0
      let pending = 0
      
      if (current && ['active', 'awaiting_review', 'under_review_regional'].includes(current.status)) {
        try {
          const advancesResponse = await tripAPI.getAdvances(current.trip_id)
          const advances = advancesResponse.data.data || []
          
          pending = advances.filter((a: any) => a.status === 'pending').length
          
          approvedAdvance = advances
            .filter((a: any) => ['approved_area', 'approved_regional', 'completed'].includes(a.status))
            .reduce((sum: number, a: any) => sum + (Number(a.approved_amount) || 0), 0)
        } catch (error) {
          console.error('Failed to fetch advances for current trip:', error)
        }
      }
      
      try {
        const notifResponse = await notificationAPI.getUnreadCount()
        setUnreadNotifications(notifResponse.data.unread_count || 0)
      } catch (error) {
        console.log('Notifications not available')
      }
      
      setStats({
        total_trips: trips.length,
        active_trips: active,
        completed_trips: completed,
        pending_advances: pending,
        total_advance_amount: approvedAdvance,
        total_expense_amount: current?.total_expenses || 0
      })
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const isTripStarted = (trip: Trip) => {
    const today = new Date()
    const startDate = new Date(trip.start_date)
    return today >= startDate
  }

  const isTripEnded = (trip: Trip) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // ✅ FIXED: Use extended_end_date if available
    const endDate = new Date(trip.extended_end_date || trip.end_date)
    endDate.setHours(0, 0, 0, 0)
    
    return today > endDate
  }

  // ✅ NEW: Check if trip is extended
  const isTripExtended = (trip: Trip) => {
    return !!trip.extended_end_date
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-telkom-akses.png" 
                alt="Telkom Akses" 
                className="h-10 w-auto bg-white rounded px-2 py-1"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div>
                <h1 className="text-xl font-bold text-white">Employee Portal</h1>
                <p className="text-sm text-white/80">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/employee/notifications" className="relative">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Bell className="w-5 h-5" />
                </Button>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              <Link to="/employee/profile">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <Button variant="secondary" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Plane className="w-4 h-4 mr-2" />
                Total Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_trips}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Active Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.active_trips}</div>
              <p className="text-xs text-muted-foreground mt-1">Ongoing</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed_trips}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully done</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Pending Advances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending_advances}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Trip Card */}
        {currentTrip ? (
          <Card className="mb-8 shadow-soft bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* ✅ FIXED: Show Extended badge with priority */}
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(currentTrip.status, isTripExtended(currentTrip))}
                    <span className="text-sm opacity-90">{currentTrip.trip_number}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentTrip.destination}</h2>
                  <p className="opacity-90 mb-4">{currentTrip.purpose}</p>
                  
                  {/* ✅ NEW: Trip Extended Alert */}
                  {currentTrip.status === 'active' && isTripExtended(currentTrip) && (
                    <div className="bg-purple-500/20 border border-purple-300 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">Trip Extended</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        New end date: {formatDate(currentTrip.extended_end_date!)}
                      </p>
                      <p className="text-xs opacity-80 mt-1">
                        You can request additional advance if needed
                      </p>
                    </div>
                  )}

                  {/* Original alerts - only show if NOT extended */}
                  {currentTrip.status === 'active' && !isTripExtended(currentTrip) && isTripStarted(currentTrip) && !isTripEnded(currentTrip) && (
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-semibold">Trip is in progress</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        You can upload receipts until the trip ends
                      </p>
                    </div>
                  )}

                  {currentTrip.status === 'active' && !isTripExtended(currentTrip) && isTripEnded(currentTrip) && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-semibold">Trip has ended</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        Please submit for review to complete settlement
                      </p>
                    </div>
                  )}

                  {currentTrip.status === 'awaiting_review' && (
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">Under Review (Finance Area)</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        Your trip settlement is being reviewed by Finance Area
                      </p>
                    </div>
                  )}

                  {currentTrip.status === 'under_review_regional' && (
                    <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">Under Review (Finance Regional)</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        Finance Regional is reviewing your trip settlement
                      </p>
                    </div>
                  )}

                  {currentTrip.status === 'completed' && (
                    <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Trip Completed</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        Your trip has been completed and settled
                      </p>
                    </div>
                  )}

                  {currentTrip.status === 'cancelled' && (
                    <div className="bg-gray-500/20 border border-gray-300 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">Trip Cancelled</span>
                      </div>
                      <p className="text-sm opacity-90 mt-1">
                        This trip has been cancelled
                      </p>
                    </div>
                  )}
                  
                  {/* ✅ FIXED: Show duration and dates */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm opacity-75">Duration</p>
                      <p className="font-semibold">{currentTrip.duration} days</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Start Date</p>
                      <p className="font-semibold">{formatDate(currentTrip.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">
                        {isTripExtended(currentTrip) ? 'Extended End Date' : 'End Date'}
                      </p>
                      <p className="font-semibold">{formatDate(currentTrip.extended_end_date || currentTrip.end_date)}</p>
                      {isTripExtended(currentTrip) && (
                        <p className="text-xs opacity-75 mt-1">
                          Original: {formatDate(currentTrip.end_date)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-75">Total Advance</p>
                      <p className="text-lg font-bold">{formatCurrency(currentTrip.total_advance || 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Total Expenses</p>
                      <p className="text-lg font-bold">{formatCurrency(currentTrip.total_expenses || 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Balance</p>
                      <p className={`text-lg font-bold ${
                        (currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0) >= 0
                          ? 'text-white'
                          : 'text-red-300'
                      }`}>
                        {formatCurrency((currentTrip.total_advance || 0) - (currentTrip.total_expenses || 0))}
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="secondary"
                  onClick={() => navigate(`/employee/trips/${currentTrip.trip_id}`)}
                  className="ml-4"
                >
                  View Details →
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 shadow-soft">
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <Plane className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recent Trip</h3>
                <p className="text-muted-foreground mb-6">You don't have any recent business trip.</p>
                <Button 
                  onClick={() => navigate("/employee/trips/new")}
                  size="lg"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create New Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business trips and expenses</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate("/employee/trips/new")}
              className="h-auto py-6 flex-col gap-2"
              disabled={currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status)}
            >
              <PlusCircle className="w-6 h-6" />
              <span>New Trip Request</span>
              {currentTrip && ['active', 'awaiting_review', 'under_review_regional'].includes(currentTrip.status) && (
                <span className="text-xs opacity-75">Complete active trip first</span>
              )}
            </Button>

            <Button 
              variant="outline"
              onClick={() => navigate("/employee/trips")}
              className="h-auto py-6 flex-col gap-2"
            >
              <Plane className="w-6 h-6" />
              <span>My Trips</span>
            </Button>

            <Button 
              variant="outline"
              onClick={() => navigate("/employee/history")}
              className="h-auto py-6 flex-col gap-2"
            >
              <Clock className="w-6 h-6" />
              <span>Trip History</span>
            </Button>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Financial Summary
            </CardTitle>
            <CardDescription>Overview of your approved advances and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.total_advance_amount === 0 ? (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Advances Yet</h3>
                <p className="text-sm text-gray-600">
                  Your advance requests will appear here once they are approved by Finance.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Approved Advance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats.total_advance_amount)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Funds will transfer to your account
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Expense</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats.total_expense_amount)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.total_expense_amount > 0 ? 'Total receipts uploaded' : 'No expenses recorded'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Balance</p>
                  <p className={`text-2xl font-bold ${
                    stats.total_advance_amount - stats.total_expense_amount >= 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {formatCurrency(stats.total_advance_amount - stats.total_expense_amount)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.total_advance_amount - stats.total_expense_amount > 0 
                      ? 'Remaining balance' 
                      : stats.total_advance_amount - stats.total_expense_amount < 0 
                      ? 'Over budget' 
                      : 'Balanced'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmployeeDashboard  