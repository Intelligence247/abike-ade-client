"use client"

import React from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { AgreementsContent } from '@/components/agreements-content';

export default function AgreementsPage() {
  return (
    <ProtectedRoute>
      <AgreementsContent />
    </ProtectedRoute>
  );
}