"use client"

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { TransactionsContent } from '@/components/transactions-content';

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <TransactionsContent />
    </ProtectedRoute>
  );
}