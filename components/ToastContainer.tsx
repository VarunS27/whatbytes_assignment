'use client';

import React from 'react';
import { useToastStore } from '@/lib/stores/toastStore';

function Icon({ type }: { type?: string }) {
  if (type === 'success') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'error') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3 px-4 pointer-events-none">
      {toasts.map((t) => {
        const bg = t.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : t.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-gray-800 to-gray-700';
        return (
          <div
            key={t.id}
            className={`${bg} w-full max-w-md pointer-events-auto rounded-xl shadow-2xl text-white px-4 py-3 flex items-start gap-3 transition-all duration-300 ease-out`}
          >
            <div className="mt-0.5 text-white/95">
              <Icon type={t.type} />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">{t.type === 'success' ? 'Success' : t.type === 'error' ? 'Error' : 'Notice'}</div>
              <div className="mt-1 text-sm text-white/90">{t.message}</div>
            </div>

            <div className="flex items-start">
              <button
                onClick={() => removeToast(t.id)}
                className="ml-4 text-white/90 hover:text-white transition-colors text-xl leading-none"
                aria-label="Dismiss toast"
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
