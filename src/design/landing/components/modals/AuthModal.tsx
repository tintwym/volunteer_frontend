'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuthCard } from '@/components/auth/AuthCard';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useApp();

  if (!isAuthModalOpen) return null;

  return (
    <AuthCard
      variant="modal"
      initialType="volunteer"
      onClose={() => setIsAuthModalOpen(false)}
      onDemoAccess={(role) => {
        if (role === 'ORGANIZER') {
          login('email', 'organization', {
            name: 'Marcus Vance (Green Roots)',
            email: 'marcus@greenroots.org',
          });
        } else if (role === 'VOLUNTEER_LEADER') {
          login('email', 'admin', {
            name: 'Jordan Lee',
            email: 'jordan.lee@commonground.org',
          });
        } else {
          login('email', 'volunteer', {
            name: 'Alex Rivera',
            email: 'alex.rivera@commonground.org',
          });
        }
      }}
    />
  );
};
