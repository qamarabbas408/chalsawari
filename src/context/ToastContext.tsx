import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import AppToast, { ToastType } from '../components/AppToast';

type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
};

type ToastItem = {
  id: number;
} & Required<ToastOptions>;

type ToastContextValue = {
  showToast: (opts: ToastOptions) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<ToastItem | null>(null);
  const queue = useRef<ToastItem[]>([]);
  const isAnimating = useRef(false);

  const showNext = useCallback(() => {
    if (queue.current.length > 0 && !isAnimating.current) {
      isAnimating.current = true;
      setCurrent(queue.current.shift()!);
    }
  }, []);

  const showToast = useCallback(
    (opts: ToastOptions) => {
      const item: ToastItem = {
        id: nextId++,
        message: opts.message,
        type: opts.type ?? 'error',
        duration: opts.duration ?? 3000,
      };

      if (current) {
        queue.current.push(item);
      } else {
        isAnimating.current = true;
        setCurrent(item);
      }
    },
    [current],
  );

  const hideToast = useCallback(() => {
    isAnimating.current = false;
    setCurrent(null);
    showNext();
  }, [showNext]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {current && (
        <AppToast
          key={current.id}
          message={current.message}
          type={current.type}
          duration={current.duration}
          onDismiss={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
