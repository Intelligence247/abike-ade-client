"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Agreement {
  id: string;
  title: string;
  type: string;
  status: 'generated' | 'pending' | 'not_available';
  date: string;
  description: string;
  document_url?: string;
}

export interface AgreementResponse {
  status: 'success' | 'error';
  message: string;
  data?: any;
}

export function useAgreements() {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [canGenerate, setCanGenerate] = useState(false);

  // Initialize the API client on the client side
  useEffect(() => {
    const initClient = async () => {
      try {
        // Import and initialize the SDK directly on the client side
        const { Client } = await import('abikeade-sdk');
        const sdkClient = new Client();
        
        console.log('SDK Client initialized for agreements:', sdkClient);
        setClient(sdkClient);
      } catch (error) {
        console.error('Failed to initialize SDK client for agreements:', error);
      }
    };

    initClient();
  }, []);

  const generateAgreement = async (): Promise<boolean> => {
    if (!client) {
      toast.error('SDK client not ready yet');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Generating agreement document...');

      // Call the generateAgreement method directly on the SDK client
      const response: AgreementResponse = await client.rent.generateAgreement({
        onSuccess: (data: any) => {
          console.log('Agreement generation success:', data);
        },
        onError: (error: any) => {
          console.error('Agreement generation error:', error);
        }
      });
      
      console.log('Agreement generation response:', response);
      
      if (response.status === 'success') {
        toast.success('Agreement generated successfully!');
        
        // Add the new agreement to the list
        const newAgreement: Agreement = {
          id: `AG${Date.now()}`,
          title: 'Room Rental Agreement',
          type: 'Rental Contract',
          status: 'generated',
          date: new Date().toISOString().split('T')[0],
          description: 'Your accommodation rental agreement has been generated successfully',
          document_url: response.data?.document_url
        };
        
        setAgreements(prev => [newAgreement, ...prev]);
        setCanGenerate(false); // Can only generate once
        
        return true;
      } else {
        const errorMessage = response.message || 'Failed to generate agreement';
        setError(errorMessage);
        toast.error(errorMessage);
        
        // Handle specific error cases
        if (errorMessage.includes('do not have any current rent tenancy')) {
          setCanGenerate(false);
        } else if (errorMessage.includes('already been generated')) {
          setCanGenerate(false);
        }
        
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate agreement';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkAgreementStatus = async () => {
    if (!client) {
      return;
    }

    try {
      setLoading(true);
      
      // Try to generate agreement to check if it's possible
      // This will tell us if the user has a valid tenancy
      const response: AgreementResponse = await client.rent.generateAgreement({
        onSuccess: (data: any) => {
          console.log('Agreement check success:', data);
        },
        onError: (error: any) => {
          console.log('Agreement check error (expected):', error);
        }
      });
      
      if (response.status === 'success') {
        // User can generate agreement
        setCanGenerate(true);
        
        // Check if they already have agreements
        if (agreements.length === 0) {
          // Add a placeholder for the agreement they can generate
          const placeholderAgreement: Agreement = {
            id: 'AG_PLACEHOLDER',
            title: 'Room Rental Agreement',
            type: 'Rental Contract',
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            description: 'Click "Generate Agreement" to create your rental agreement'
          };
          setAgreements([placeholderAgreement]);
        }
      } else {
        // User cannot generate agreement
        setCanGenerate(false);
        
        if (response.message.includes('do not have any current rent tenancy')) {
          // User hasn't rented a room yet
          const noTenancyAgreement: Agreement = {
            id: 'AG_NO_TENANCY',
            title: 'No Active Tenancy',
            type: 'Information',
            status: 'not_available',
            date: new Date().toISOString().split('T')[0],
            description: 'You need to rent a room and complete payment before generating an agreement'
          };
          setAgreements([noTenancyAgreement]);
        } else if (response.message.includes('already been generated')) {
          // Agreement already exists
          setCanGenerate(false);
        }
      }
    } catch (err: any) {
      console.error('Error checking agreement status:', err);
      setCanGenerate(false);
    } finally {
      setLoading(false);
    }
  };

  // Check agreement status on mount
  useEffect(() => {
    if (client) {
      checkAgreementStatus();
    }
  }, [client]);

  return {
    agreements,
    loading,
    error,
    canGenerate,
    generateAgreement,
    checkAgreementStatus,
    resetError: () => setError(null)
  };
}
