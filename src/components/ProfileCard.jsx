import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import History from './History';
import Bookmark from './Bookmark';

export default function ProfileWelcomeCard({ user }) {
  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Card className="w-full max-w-[60%] mx-auto mb-10 ">
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
          Welcome, {user?.name || 'User'}!
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

      <CardContent className="space-y-3 px-4 flex flex-col items-center justify-center">
        <Separator />

        <Tabs
          defaultValue="history"
          className="w-[400px] flex flex-col items-center justify-center"
        >
          <TabsList>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="bookmark"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Bookmark
            </TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <History />
          </TabsContent>
          <TabsContent value="bookmark">
            <Bookmark />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex gap-2 px-4 pb-4 pt-3"></CardFooter>
    </Card>
  );
}
