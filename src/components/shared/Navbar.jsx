'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  Home,
  Book,
  Eye,
  TrendingUp,
  User,
  Menu,
  Grid3X3,
  LogOut,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import user from '../../../public/user.png';
import { Separator } from '@radix-ui/react-dropdown-menu';

const navigationItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/news/recent-news',
    label: 'Recent News',
    icon: Book,
  },
  {
    href: '/categorized',
    label: 'Categorized',
    icon: Grid3X3,
  },
  {
    href: '/news/most-viewed',
    label: 'Most Viewed',
    icon: Eye,
  },
  {
    href: '/news/trending',
    label: 'Trending',
    icon: TrendingUp,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigation = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  const isActiveRoute = (href) => {
    return pathname === href;
  };

  return (
    <div className="z-30 sticky top-0">
      <div className="w-full flex justify-between items-center h-16 px-4 bg-gradient-to-t from-[#12243c] to-[#0f172a] border-b border-border/20">
        {/* Logo */}
        <div>
          <Link
            href="/"
            className="text-xl flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://res.cloudinary.com/dgo5hq8co/image/upload/v1748123586/info-pulse_myxcpg.png"
              alt="Logo"
              width={80}
              height={80}
              className="rounded"
            />
            <span className="ml-1 italic font-semibold text-4xl">
              Info<span className="text-primary">Pulse</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <nav className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'text-white hover:bg-white/10 hover:text-white transition-colors',
                      isActiveRoute(item.href) &&
                        'bg-primary hover:bg-primary/80',
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}

            {/* Profile Section - Desktop */}
            {status === 'loading' && (
              <div className="w-8 h-8 rounded-full border-2 border-white/20 animate-pulse bg-gray-500/40" />
            )}

            {status === 'unauthenticated' && (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className={cn(
                    'text-white hover:bg-white/10 hover:text-white transition-colors',
                    isActiveRoute('/profile') &&
                      'bg-primary hover:bg-primary/80',
                  )}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            )}

            {status === 'authenticated' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-1 hover:bg-white/10 transition-colors"
                  >
                    <Image
                      className="rounded-full border-2 border-white/20 shadow-lg"
                      src={session?.user?.image || user}
                      width={32}
                      height={32}
                      alt="Profile Picture"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="flex-none lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Image
                    src="https://res.cloudinary.com/dgo5hq8co/image/upload/v1748123586/info-pulse_myxcpg.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded mr-2"
                  />
                  InfoPulse
                </SheetTitle>
                <SheetDescription>
                  Navigate through our news sections
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col space-y-2 mt-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        'justify-start h-12 text-base',
                        isActiveRoute(item.href) &&
                          'bg-primary text-primary-foreground',
                      )}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  className={cn(
                    'justify-start h-12 text-base',
                    isActiveRoute('/profile') &&
                      'bg-primary text-primary-foreground',
                  )}
                  onClick={() => handleNavigation('/profile')}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Button>

                {/* Profile Section - Mobile */}
                {status === 'loading' && (
                  <div className="flex items-center space-x-3 p-3 mt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-gray-400 animate-pulse" />
                    <div className="flex flex-col space-y-1">
                      <div className="w-24 h-3 bg-gray-300 rounded animate-pulse" />
                      <div className="w-16 h-2 bg-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                )}

                {status === 'authenticated' && session?.user?.image && (
                  <div className="flex items-center space-x-3 p-3 mt-4 border-t">
                    <Image
                      className="rounded-full border-2 border-border"
                      src={session.user.image || user}
                      width={40}
                      height={40}
                      alt="Profile Picture"
                    />
                    <div className="flex gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {session.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.user.email}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-fit"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
