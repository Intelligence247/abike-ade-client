"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface DashboardStats {
  roomNumber: string;
  monthlyRent: number;
  roomType: string;
  checkInDate: string;
  totalPaid: number;
  upcomingPayment?: {
    amount: number;
    dueDate: string;
    status: string;
  };
}

export interface DashboardActivity {
  id: string;
  type: 'payment' | 'maintenance' | 'reminder' | 'agreement';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'warning' | 'info';
}

export interface DashboardData {
  stats: DashboardStats;
  activities: DashboardActivity[];
  canGenerateAgreement: boolean;
}

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);

  // Initialize the API client on the client side
  useEffect(() => {
    const initClient = async () => {
      try {
        // Import and initialize the SDK directly on the client side
        const { Client } = await import('abikeade-sdk');
        const sdkClient = new Client();

        console.log('SDK Client initialized for dashboard:', sdkClient);
        setClient(sdkClient);
      } catch (error) {
        console.error('Failed to initialize SDK client for dashboard:', error);
      }
    };

    initClient();
  }, []);

  const fetchDashboardData = async () => {
    if (!client) {
      toast.error('SDK client not ready yet');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching dashboard data...');

      // Fetch rent history to get transaction data
      const historyResponse = await client.rent.history({
        onSuccess: (data: any) => {
          console.log('Rent history fetch success:', data);
        },
        onError: (error: any) => {
          console.error('Rent history fetch error:', error);
        }
      });

      // Check agreement status
      const agreementResponse = await client.rent.generateAgreement({
        onSuccess: (data: any) => {
          console.log('Agreement check success:', data);
        },
        onError: (error: any) => {
          console.log('Agreement check error (expected):', error);
        }
      });

      console.log('Dashboard data responses:', { historyResponse, agreementResponse });

      // Process the data
      if (historyResponse.status === 'success' && historyResponse.data) {
        const transactions = historyResponse.data;

        // Get the most recent successful transaction
        const latestTransaction = transactions.find((t: any) => t.status === 'success');

        // Calculate total paid
        const totalPaid = transactions
          .filter((t: any) => t.status === 'success')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        // Get upcoming payment (if any unpaid transactions exist)
        const upcomingPayment = transactions.find((t: any) => t.status === 'unpaid');

        // Create dashboard stats
        const stats: DashboardStats = {
          roomNumber: latestTransaction?.room?.title || 'Not Assigned',
          monthlyRent: latestTransaction ? Math.round(latestTransaction.amount / 12) : 0, // Convert yearly to monthly and kobo to naira
          roomType: latestTransaction?.room?.features || 'Standard',
          checkInDate: latestTransaction?.date || 'Not Available',
          totalPaid: totalPaid,
          upcomingPayment: upcomingPayment ? {
            amount: upcomingPayment.amount,
            dueDate: upcomingPayment.expiration_date,
            status: upcomingPayment.status
          } : undefined
        };

        // Create activities based on transactions
        const activities: DashboardActivity[] = transactions.slice(0, 5).map((t: any, index: number) => ({
          id: `activity_${index}`,
          type: 'payment',
          title: t.status === 'success' ? 'Rent payment successful' : 'Rent payment pending',
          description: `${t.description} - ${t.room?.title || 'Room'}`,
          timestamp: t.date,
          status: t.status === 'success' ? 'success' : 'pending'
        }));

        // Add agreement activity if available
        if (agreementResponse.status === 'success') {
          activities.unshift({
            id: 'activity_agreement',
            type: 'agreement',
            title: 'Agreement available',
            description: 'You can now generate your rental agreement',
            timestamp: new Date().toISOString().split('T')[0],
            status: 'info'
          });
        }

        // Add maintenance reminder activity
        activities.push({
          id: 'activity_maintenance',
          type: 'maintenance',
          title: 'Maintenance reminder',
          description: 'Report any issues with your room or facilities',
          timestamp: new Date().toISOString().split('T')[0],
          status: 'info'
        });

        const dashboardData: DashboardData = {
          stats,
          activities,
          canGenerateAgreement: agreementResponse.status === 'success'
        };

        setDashboardData(dashboardData);
        toast.success('Dashboard data loaded successfully');
      } else {
        // No transactions found - user hasn't rented yet
        const emptyDashboard: DashboardData = {
          stats: {
            roomNumber: 'Not Assigned',
            monthlyRent: 0,
            roomType: 'None',
            checkInDate: 'Not Available',
            totalPaid: 0
          },
          activities: [
            {
              id: 'activity_rent',
              type: 'reminder',
              title: 'No active tenancy',
              description: 'You need to rent a room to see dashboard data',
              timestamp: new Date().toISOString().split('T')[0],
              status: 'warning'
            }
          ],
          canGenerateAgreement: false
        };

        setDashboardData(emptyDashboard);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch dashboard data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard data on mount
  useEffect(() => {
    if (client) {
      fetchDashboardData();
    }
  }, [client]);

  return {
    dashboardData,
    loading,
    error,
    fetchDashboardData,
    resetError: () => setError(null)
  };
}
