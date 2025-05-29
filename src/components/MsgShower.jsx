'use client';

import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function MsgShower({ msg }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <Card className="flex flex-col items-center gap-6 p-8 shadow-lg border-none bg-transparent">
        <AlertTriangle className="w-20 h-20 text-red-600" />
        <p className="text-xl font-semibold text-red-600 text-center">
          {msg || 'You are not authorized to view this page.'}
        </p>
      </Card>
    </div>
  );
}
