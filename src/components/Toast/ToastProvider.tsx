'use client';

import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          maxWidth: '400px',
          padding: '16px',
        },
        success: {
          className: `
            bg-green-100 text-green-900
            dark:bg-green-900 dark:text-green-100
            border border-green-300 dark:border-green-700
            rounded-lg shadow-md
          `,
          iconTheme: {
            primary: '#10b981', // Tailwind green-500
            secondary: '#ffffff',
          },
        },
        error: {
          className: `
            bg-red-100 text-red-900
            dark:bg-red-900 dark:text-red-100
            border border-red-300 dark:border-red-700
            rounded-lg shadow-md
          `,
          iconTheme: {
            primary: '#ef4444', // Tailwind red-500
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;

