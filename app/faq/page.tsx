"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is included in the rent?",
    answer: "Your rent of ₦XXXX per year includes the one-bedroom self-contained apartment, 24/7 security, and basic maintenance. The property is provided without furnishings. You are responsible for cleaning, emptying bins, and maintaining the property in good condition.",
    category: "Pricing & Payments"
  },
  {
    question: "How do I pay for utilities and services?",
    answer: "You are responsible for payment of all your services including electricity, water, and other utilities. The property has pre-paid electricity meters for individual control. There is no security deposit required.",
    category: "Pricing & Payments"
  },
  {
    question: "What are the lease terms and duration?",
    answer: "The lease is for 1 year (August 4, 2025 - August 4, 2026). After the term ends, holding-over becomes a month-to-month tenancy at the same rental rate. Monthly reminders are sent 6, 5, 4, 3, 2, and 1 month before expiration.",
    category: "Booking & Check-in"
  },
  {
    question: "Can I have visitors or guests?",
    answer: "No overnight guests are allowed without prior written consent from the landlord. The maximum duration for guests is at the landlord's discretion. All guests must be registered for safety purposes.",
    category: "Policies & Rules"
  },
  {
    question: "Is smoking allowed?",
    answer: "No, smoking is strictly prohibited anywhere in the property. Neither tenants nor guests are permitted to smoke in the property.",
    category: "Policies & Rules"
  },
  {
    question: "Can I bring pets or park vehicles?",
    answer: "No pets or animals are allowed. Additionally, no car parking space is provided under the terms of the lease, and no vehicles may park on or about the property.",
    category: "Policies & Rules"
  },
  {
    question: "What maintenance am I responsible for?",
    answer: "You must keep the property in good and sanitary condition, clean regularly, empty bins, and promptly report any damage. Major maintenance not due to your misuse is the landlord's responsibility. You cannot make improvements to the property.",
    category: "Room & Amenities"
  },
  {
    question: "Can I sublet or assign the lease?",
    answer: "No, you cannot assign, sublet, or grant any concession or license to use the property without prior written consent from the landlord. Any unauthorized assignment or subletting will void the lease.",
    category: "Policies & Rules"
  },
  {
    question: "What happens if I damage the property?",
    answer: "You are responsible for all damage caused by your negligence or willful acts, including damage by your family, agents, or visitors. The landlord may charge for repairs including wall damage, repainting, unplugging drains, replacing fixtures, and professional cleaning.",
    category: "Policies & Rules"
  },
  {
    question: "What are the check-out requirements?",
    answer: "You must vacate the property within 24 hours after the lease expiration date. Failure to do so will result in legal action. The property must be surrendered in as good condition as at commencement, reasonable wear and tear excepted.",
    category: "Booking & Check-in"
  },
  {
    question: "What student information is required?",
    answer: "You must provide your University/College name, Department, Matriculation Number, and confirm if your parents are aware of the accommodation. If yes, you must provide parent contact information including name, address, and mobile number.",
    category: "Booking & Check-in"
  },
  {
    question: "Who can be a witness to the agreement?",
    answer: "The witness must be one of: a Solicitor, Commissioner of Oaths, Head of Your Department, or Parent to the tenant. The witness must provide their mobile number, office address, and office stamp.",
    category: "Booking & Check-in"
  }
];

const categories = ["All", "Pricing & Payments", "Booking & Check-in", "Room & Amenities", "Policies & Rules"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about living at Abike Ade Court. Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 dark:border-gray-800 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3 space-y-6">
            {filteredFAQs.map((faq, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

                         {/* Contact CTA */}
             <Card className="border-gray-200 dark:border-gray-800 bg-emerald-50 dark:bg-emerald-900/10">
               <CardContent className="p-6 text-center">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                   Still Have Questions?
                 </h3>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">
                   Our team is here to help. Get in touch with us directly.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
                   <Link href="/contact">
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                       Contact Us
                     </button>
                   </Link>
                   <a 
                     href="tel:+2348055453708"
                     className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                   >
                     <Phone className="h-4 w-4 mr-2" />
                     Call Now
                   </a>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
