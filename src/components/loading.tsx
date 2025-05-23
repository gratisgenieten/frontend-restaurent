'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const RouteChangeIndicator: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // These won't be available with App Router's useRouter from next/navigation
    // So we're simulating transitions here instead.
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate delay
    return () => clearTimeout(timeout);
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 dark:bg-black/60 backdrop-blur-sm">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
};

export default RouteChangeIndicator;
