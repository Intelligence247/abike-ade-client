"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock,
  AlertCircle
} from 'lucide-react';

export default function AgreementsPage() {
  const agreements = [
    {
      id: 'AG001',
      title: 'Room Rental Agreement',
      type: 'Rental Contract',
      status: 'signed',
      date: '2024-01-15',
      description: 'Standard room rental agreement for the academic year 2024/2025'
    },
    {
      id: 'AG002',
      title: 'House Rules Agreement',
      type: 'Rules & Regulations',
      status: 'pending',
      date: '2024-01-20',
      description: 'Agreement to follow hostel rules and regulations'
    },
    {
      id: 'AG003',
      title: 'Payment Terms Agreement',
      type: 'Financial Terms',
      status: 'signed',
      date: '2024-01-10',
      description: 'Terms and conditions for rent payment and late fees'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Signed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="lg:ml-64">
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Agreements
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your accommodation agreements
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <FileText className="h-4 w-4 mr-2" />
                  New Agreement
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Agreements
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {agreements.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Signed Agreements
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {agreements.filter(a => a.status === 'signed').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Pending Agreements
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {agreements.filter(a => a.status === 'pending').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agreements List */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Your Agreements
                </CardTitle>
                <CardDescription>
                  All agreements related to your accommodation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agreements.map((agreement) => (
                    <div
                      key={agreement.id}
                      className="flex items-center justify-between p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {agreement.title}
                            </h3>
                            {getStatusIcon(agreement.status)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {agreement.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>ID: {agreement.id}</span>
                            <span>Type: {agreement.type}</span>
                            <span>Date: {agreement.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(agreement.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}