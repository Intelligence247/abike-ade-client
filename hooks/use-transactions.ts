"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Transaction {
  reference: string;
  description: string;
  duration: number;
  amount: number;
  status: string;
  date: string;
  expiration_date: string;
  receipt: string | null;
  room: {
    id: number;
    title: string;
    thumbnail: string;
    available: boolean;
    price: string;
    features: string;
  };
}

export interface TransactionsResponse {
  status: 'success' | 'error';
  message: string;
  data: Transaction[];
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
        
        console.log('SDK Client initialized for transactions:', sdkClient);
        setClient(sdkClient);
      } catch (error) {
        console.error('Failed to initialize SDK client for transactions:', error);
      }
    };

    initClient();
  }, []);

  const fetchTransactions = async (filters?: { status?: string; reference?: string }) => {
    if (!client) {
      toast.error('SDK client not ready yet');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching transactions with filters:', filters);

      // Call the history method directly on the SDK client
      const response: TransactionsResponse = await client.rent.history({
        params: filters || {},
        onSuccess: (data: any) => {
          console.log('Transactions fetch success:', data);
        },
        onError: (error: any) => {
          console.error('Transactions fetch error:', error);
        }
      });
      
      console.log('Transactions API response:', response);
      
      if (response.status === 'success') {
        setTransactions(response.data || []);
        toast.success('Transactions loaded successfully');
      } else {
        const errorMessage = response.message || 'Failed to fetch transactions';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch transactions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionByReference = async (reference: string) => {
    if (!client) {
      toast.error('SDK client not ready yet');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching transaction by reference:', reference);

      const response: TransactionsResponse = await client.rent.history({
        params: { reference },
        onSuccess: (data: any) => {
          console.log('Single transaction fetch success:', data);
        },
        onError: (error: any) => {
          console.error('Single transaction fetch error:', error);
        }
      });
      
      if (response.status === 'success') {
        const transaction = response.data?.[0];
        if (transaction) {
          setTransactions([transaction]);
          return transaction;
        } else {
          setError('Transaction not found');
          return null;
        }
      } else {
        const errorMessage = response.message || 'Failed to fetch transaction';
        setError(errorMessage);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch transaction';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load transactions on mount
  useEffect(() => {
    if (client) {
      fetchTransactions();
    }
  }, [client]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    fetchTransactionByReference,
    resetError: () => setError(null)
  };
}
