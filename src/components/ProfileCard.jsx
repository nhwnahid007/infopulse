import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Users, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function ProfileWelcomeCard({ user }) {
  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Card className="w-full max-w-sm mx-auto ">
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-3">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={user?.image || '/user.png'}
              alt={user?.name || 'Profile picture'}
            />
            <AvatarFallback className="text-sm bg-primary/10">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardTitle className="text-xl">
          Welcome, {user?.name?.split(' ')[0] || 'User'}!
        </CardTitle>
        <CardDescription className="text-sm">
          Glad to see you again
        </CardDescription>
        <div className="flex justify-center gap-2 mt-2">
          <Badge variant="secondary" className="bg-green-500 text-xs">
            Active
          </Badge>
          <Badge variant="outline" className="text-xs">
            {user?.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        <Separator />
        {user?.email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>Account status: Active</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 px-4 pb-4 pt-3">
        <Button className="flex-1" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button variant="outline" className="flex-1" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
