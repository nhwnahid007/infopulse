'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function MenuItem({ Icon, Title, onClickFunction, ExtraStyles }) {
  return (
    <Card
      onClick={onClickFunction}
      className={cn(
        'flex items-center gap-3 w-80 p-4 rounded-xl shadow hover:bg-muted cursor-pointer transition-all',
        ExtraStyles
      )}
    >
      <Icon className="h-6 w-6 text-muted-foreground" />
      <h3 className="text-base font-medium text-foreground">{Title}</h3>
    </Card>
  );
}
