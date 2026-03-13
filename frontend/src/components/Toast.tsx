'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
let addToastGlobal: ((message: string, type: ToastType) => void) | null = null;

export function showToast(message: string, type: ToastType = 'success') {
  if (addToastGlobal) {
    addToastGlobal(message, type);
  }
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToastGlobal = (message: string, type: ToastType) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    return () => {
      addToastGlobal = null;
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-6 right-6 z-9999 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-slide-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: '14px',
            background: toast.type === 'success'
              ? 'var(--color-success-bg)'
              : 'var(--color-error-bg)',
            color: toast.type === 'success'
              ? 'var(--color-success)'
              : 'var(--color-error)',
            border: `1px solid ${toast.type === 'success' ? 'var(--color-success-border)' : 'var(--color-error-border)'}`,
            boxShadow: toast.type === 'success'
              ? '0 8px 32px rgba(16, 185, 129, 0.15)'
              : '0 8px 32px rgba(239, 68, 68, 0.15)',
            backdropFilter: 'blur(16px)',
            fontWeight: 600,
            fontSize: '14px',
            minWidth: '280px',
            maxWidth: '420px',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle style={{ width: 20, height: 20, flexShrink: 0 }} />
          ) : (
            <XCircle style={{ width: 20, height: 20, flexShrink: 0 }} />
          )}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              opacity: 0.6,
              padding: '2px',
              display: 'flex',
            }}
          >
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>
      ))}
    </div>
  );
};
