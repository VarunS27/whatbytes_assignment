"use client";

import { create } from 'zustand';

export type Toast = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
};

type ToastState = {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast(message, type = 'info', duration = 3000) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    if (duration > 0) {
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },
  removeToast(id) {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
}));
