'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuthCard } from '@/components/auth/AuthCard';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();

  if (!isAuthModalOpen) return null;

  return (
    <AuthCard
      variant="modal"
      initialType="volunteer"
      onClose={() => setIsAuthModalOpen(false)}
    />
  );
};
