'use client';
// @ts-nocheck

import React from 'react';
import { LogOut, X } from 'lucide-react';
import { ModalMotion } from '@/components/motion/ui';

type SignOutConfirmModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const SignOutConfirmModal: React.FC<SignOutConfirmModalProps> = ({
  open,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <ModalMotion>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-out-confirm-title"
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-900"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-3 top-3 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          aria-label="Cancel sign out"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 pt-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            <LogOut className="h-5 w-5" />
          </div>
          <h2
            id="sign-out-confirm-title"
            className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100"
          >
            Sign out?
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            You’ll need to sign in again to access your volunteer profile, hours, and organization tools.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              Yes, sign out
            </button>
          </div>
        </div>
      </div>
    </ModalMotion>
  );
};
