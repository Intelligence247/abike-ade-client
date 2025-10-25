"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAgreements } from '@/hooks/use-agreements';
import { useProfile } from '@/hooks/use-profile';
import { constructImageUrl } from '@/lib/utils';
import { 
  FileText, 
  Eye, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Plus
} from 'lucide-react';

export function AgreementsContent() {
  const { agreements, loading, error, generateAgreement, resetError } = useAgreements();
  const { profile, getProfile, loading: profileLoading } = useProfile();

  // Check if user has an existing agreement
  const hasExistingAgreement = profile?.agreement && profile.agreement.trim() !== '';
  const canGenerateAgreement = !hasExistingAgreement && !loading;

  // Fetch profile on component mount to check for existing agreement
  React.useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  const handleGenerateAgreement = async () => {
    try {
      await generateAgreement();
      // Refresh profile after generating agreement to get updated agreement data
      await getProfile();
    } catch (error) {
      console.error('Failed to generate agreement:', error);
    }
  };

  const handleViewAgreement = () => {
    if (profile?.agreement) {
      try {
        const agreementUrl = constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, profile.agreement);
        console.log('Opening agreement URL:', agreementUrl);
        window.open(agreementUrl, '_blank');
      } catch (error) {
        console.error('Error opening agreement:', error);
        alert('Error opening agreement. Please try again.');
      }
    } else {
      alert('No agreement available to view.');
    }
  };


  if ((loading || profileLoading) && agreements.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        <div className="lg:ml-64 flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600 dark:text-gray-400">Loading agreements...</p>
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
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                Rental Agreements
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                View and manage your accommodation agreements
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={async () => {
                  await getProfile();
                  window.location.reload();
                }}
                disabled={loading || profileLoading}
                className="w-full sm:w-auto"
              >
                {(loading || profileLoading) ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button 
                onClick={handleGenerateAgreement}
                disabled={!canGenerateAgreement || loading}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">
                  {hasExistingAgreement ? 'Agreement Generated' : 'Generate Agreement'}
                </span>
                <span className="sm:hidden">
                  {hasExistingAgreement ? 'Generated' : 'Generate'}
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6">

          {/* Existing Agreement Display */}
          {hasExistingAgreement && (
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 mb-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center text-lg sm:text-xl">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  Your Agreement is Ready
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300 text-sm sm:text-base">
                  Your rental agreement has been generated and is available for download.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-green-900 dark:text-green-100 truncate">
                        Room Rental Agreement
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Generated and ready for download
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end sm:justify-start">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-300 text-green-700 hover:bg-green-100 w-full sm:w-auto"
                      onClick={handleViewAgreement}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">View Agreement</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm flex-1 min-w-0">
                  <p className="font-medium text-red-800 dark:text-red-200">Error Loading Agreements</p>
                  <p className="text-red-700 dark:text-red-300 mt-1 break-words">{error}</p>
                  <Button
                    onClick={resetError}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-red-700 border-red-300 hover:bg-red-100 w-full sm:w-auto"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Agreements List */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">
                Your Agreements
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                All your rental agreements and their current status
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {loading && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p className="text-gray-600 dark:text-gray-400">Loading agreements...</p>
                </div>
              )}

              {!loading && agreements.length === 0 && !hasExistingAgreement && (
                <div className="text-center py-8 px-4">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No agreements found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base max-w-md mx-auto">
                    You haven't generated any rental agreements yet. Generate one to get started.
                  </p>
                  <Button 
                    onClick={handleGenerateAgreement}
                    disabled={!canGenerateAgreement}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Generate Agreement</span>
                    <span className="sm:hidden">Generate</span>
                  </Button>
                </div>
              )}

              {!loading && agreements.length > 0 && (
                <div className="space-y-4">
                  {agreements.map((agreement) => (
                    <div
                      key={agreement.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-4"
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {agreement.title || `Agreement #${agreement.id}`}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">Generated: {new Date(agreement.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                            Room: {agreement.title || 'N/A'} • Type: {agreement.type || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <Badge 
                          variant={agreement.status === 'generated' ? 'default' : 'secondary'}
                          className={
                            agreement.status === 'generated' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 w-fit'
                              : agreement.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 w-fit'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 w-fit'
                          }
                        >
                          {agreement.status === 'generated' ? 'Generated' : 
                           agreement.status === 'pending' ? 'Pending' : 
                           agreement.status || 'Unknown'}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleViewAgreement}
                            className="w-full sm:w-auto"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">View Agreement</span>
                            <span className="sm:hidden">View</span>
                          </Button>
                        </div>
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
