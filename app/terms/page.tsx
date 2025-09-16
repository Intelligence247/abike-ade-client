"use client"

import React from 'react';
import Link from 'next/link';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  FileText,
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Header */}
      <ResponsiveHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Abike Ade Court Residential Tenancy Agreement
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/Agreement/Abike-ade-court-agreement.pdf"
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
            <Link href="/register">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg font-medium transition-colors duration-200">
                Accept & Register
              </button>
            </Link>
          </div>
        </div>

        {/* Agreement Content */}
        <div className="space-y-8">
          {/* Important Notice */}
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    Important Notice
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300">
                    This is a legally binding agreement. Please read all terms carefully before proceeding with registration. 
                    By registering, you acknowledge that you have read, understood, and agree to all terms and conditions outlined below.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Details */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Residential Tenancy Agreement</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                This Lease dated between Omotayo Raji (the "Landlord") and the Tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              
              {/* Leased Property */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Leased Property</h3>
                <div className="space-y-3 pl-4">
                  <p>• The Landlord agrees to rent to the Tenant the one bedroom self contained, municipally described as Abike-Ade Court</p>
                  <p>• Location: Off Konigba Junction, Oko-Odo, Ago-iwoye, Ogun State</p>
                  <p>• No other persons will live in the Property without prior written permission</p>
                  <p>• No overnight guests without prior written consent (maximum duration at landlord's discretion)</p>
                  <p>• No pets or animals allowed</p>
                  <p>• No car parking space provided</p>
                  <p>• No smoking allowed anywhere in the Property</p>
                  <p>• Property provided without furnishings</p>
                </div>
              </div>

              {/* Term */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Term</h3>
                <div className="space-y-3 pl-4">
                  <p>• Lease term: 1 year (August 4, 2025 - August 4, 2026)</p>
                  <p>• After term ends, holding-over becomes month-to-month tenancy at same rental rate</p>
                </div>
              </div>

              {/* Rent */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. Rent</h3>
                <div className="space-y-3 pl-4">
                  <p>• Annual rent: ₦XXXX</p>
                  <p>• Payment due: August 4, 2026 by direct transfer or deposit</p>
                  <p>• Landlord may review and increase rent according to Ogun State laws</p>
                  <p>• 10% administrative fee if tenancy cancelled after payment</p>
                </div>
              </div>

              {/* Security Deposit */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Security Deposit</h3>
                <div className="space-y-3 pl-4">
                  <p>• Security deposit: ₦0.00</p>
                  <p>• Landlord may charge for damages including:</p>
                  <div className="pl-6 space-y-2">
                    <p>• Wall repairs due to plugs, nails, or holes</p>
                    <p>• Repainting damaged walls</p>
                    <p>• Unplugging toilets, sinks, and drains</p>
                    <p>• Replacing damaged doors, windows, screens, mirrors, or light fixtures</p>
                    <p>• Repairing cuts, burns, or water damage</p>
                    <p>• Professional cleaning and repairs</p>
                  </div>
                </div>
              </div>

              {/* Maintenance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">5. Maintenance</h3>
                <div className="space-y-3 pl-4">
                  <p>• Tenant responsible for keeping property in good condition</p>
                  <p>• Major maintenance not due to tenant misuse is landlord's responsibility</p>
                  <p>• Tenant must clean property and empty bins</p>
                  <p>• Prompt notification required for any damage</p>
                </div>
              </div>

              {/* Rules and Restrictions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">6. Rules and Restrictions</h3>
                <div className="space-y-3 pl-4">
                  <p>• No illegal activities on property</p>
                  <p>• No dangerous, flammable, or explosive materials</p>
                  <p>• No activities that increase insurance risk</p>
                  <p>• No excessive use of electricity, water, or other services</p>
                  <p>• No improvements to property without permission</p>
                  <p>• No assignment or subletting without written consent</p>
                </div>
              </div>

              {/* Student Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">7. Student Accommodation Requirements</h3>
                <div className="space-y-3 pl-4">
                  <p>• University/College information required</p>
                  <p>• Department information required</p>
                  <p>• Matriculation number required</p>
                  <p>• Parent awareness and contact information required</p>
                  <p>• Witness must be one of: Solicitor, Commissioner of Oaths, Head of Department, or Parent</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">8. Contact Information</h3>
                <div className="space-y-3 pl-4">
                  <p><strong>Landlord:</strong> Omotayo Raji</p>
                  <p><strong>Address:</strong> Meekad Hotel Ltd, No2 Obafemi Awolowo way, off OOU mini Campus, Ago-iwoye, Ogun State</p>
                  <p><strong>Property Manager:</strong> Mr Hakeem Elias</p>
                  <p><strong>Phone:</strong> +234 805 545 3708</p>
                <p><strong>WhatsApp:</strong> +234 808 212 9547</p>
                  <p><strong>Email:</strong> meekadhotels@gmail.com</p>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">9. Important Dates</h3>
                <div className="space-y-3 pl-4">
                  <p>• Monthly reminders sent 6, 5, 4, 3, 2, and 1 month before lease expiration</p>
                  <p>• Final reminder sent 1 day before lease expiration</p>
                  <p>• Tenant must vacate within 24 hours after expiration date</p>
                  <p>• Legal action will be taken if tenant refuses to vacate</p>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">10. Governing Law</h3>
                <div className="space-y-3 pl-4">
                  <p>• This Lease is governed by the laws of Ogun State</p>
                  <p>• All monetary amounts are in Nigerian Naira</p>
                  <p>• Tenant pays all stamping and registration costs</p>
                  <p>• Time is of the essence in this Lease</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance Section */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                Ready to Accept Terms?
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-6">
                By proceeding with registration, you acknowledge that you have read, understood, and agree to all terms and conditions outlined in this agreement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                    Accept Terms & Register
                  </button>
                </Link>
                <a 
                  href="/Agreement/Abike-ade-court-agreement.pdf"
                  target="_blank"
                  className="inline-flex items-center justify-center px-8 py-3 border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium transition-colors duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Full Agreement
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
