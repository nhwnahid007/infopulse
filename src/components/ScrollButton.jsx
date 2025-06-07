'use client';

import { Button } from './ui/button';

export default function ScrollButton({ children, className }) {
  const handleScroll = () => {
    document
      .getElementById('recent-news')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button className={className} onClick={handleScroll}>
      {children}
    </Button>
  );
}
