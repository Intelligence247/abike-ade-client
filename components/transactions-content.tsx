"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useTransactions } from '@/hooks/use-transactions';
import Link from 'next/link';
import {
  Search,
  Filter,
  Download,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  RefreshCw
} from 'lucide-react';

export function TransactionsContent() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const { transactions, loading, error, fetchTransactions, resetError } = useTransactions();

  // Filter transactions based on search and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate totals based on real data
  const totalPaid = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPending = transactions
    .filter(t => t.status === 'unpaid')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleRefresh = () => {
    fetchTransactions();
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (status === 'all') {
      fetchTransactions();
    } else {
      fetchTransactions({ status });
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        <div className="lg:ml-64 flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      <Navigation />

      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transactions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage your payment history
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/rooms">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Browse Rooms
                </Button>
              </Link>
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
                      Total Paid
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₦{totalPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pending Amount
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₦{totalPending.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                    <ArrowDownRight className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {transactions.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="border-gray-200 dark:border-gray-800 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === 'success' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusFilter('success')}
                  >
                    Paid
                  </Button>
                  <Button
                    variant={filterStatus === 'unpaid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusFilter('unpaid')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filterStatus === 'failed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusFilter('failed')}
                  >
                    Failed
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Recent Transactions
              </CardTitle>
              <CardDescription>
                Your payment history and transaction details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-red-600 dark:text-red-400">⚠️</div>
                    <div className="text-sm">
                      <p className="font-medium text-red-800 dark:text-red-200">Error Loading Transactions</p>
                      <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                      <Button
                        onClick={resetError}
                        size="sm"
                        variant="outline"
                        className="mt-2 text-red-700 border-red-300 hover:bg-red-100"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
                </div>
              )}

              {!loading && !error && filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No transactions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm || filterStatus !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'You haven\'t made any transactions yet'
                    }
                  </p>
                </div>
              )}

              {!loading && !error && filteredTransactions.length > 0 && (
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.reference}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="font-mono text-xs">{transaction.reference}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Room: {transaction.room.title} • Duration: {transaction.duration} months
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₦{(transaction.amount).toLocaleString()}
                        </p>
                        <Badge
                          variant={transaction.status === 'success' ? 'default' : 'secondary'}
                          className={
                            transaction.status === 'success'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : transaction.status === 'unpaid'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }
                        >
                          {transaction.status === 'success' ? 'Paid' :
                            transaction.status === 'unpaid' ? 'Pending' :
                              transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
