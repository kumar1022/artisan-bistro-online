import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_type: string;
}

interface Reservation {
  id: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  status: string;
}

interface Profile {
  full_name: string;
  phone: string;
}

const Account = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>({ full_name: '', phone: '' });
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [profileRes, ordersRes, reservationsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user!.id).single(),
        supabase.from('orders').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }),
        supabase.from('reservations').select('*').eq('user_id', user!.id).order('created_at', { ascending: false })
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
      }
      if (ordersRes.data) {
        setOrders(ordersRes.data);
      }
      if (reservationsRes.data) {
        setReservations(reservationsRes.data);
      }
    } catch (error) {
      toast.error('Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('user_id', user!.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'default';
      case 'preparing': return 'secondary';
      case 'ready': return 'success';
      case 'completed': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your account</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div>Loading account data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Account</h1>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <Button type="submit" disabled={updating}>
                    {updating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No orders found. Place your first order!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(order.created_at), 'PPP')}
                              </p>
                              <p className="text-sm capitalize">{order.order_type.replace('_', ' ')}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
                              <Badge variant={getStatusColor(order.status) as any}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Reservation History</CardTitle>
                <CardDescription>View your table reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {reservations.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No reservations found. Make your first reservation!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <Card key={reservation.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">
                                {format(new Date(reservation.reservation_date), 'PPP')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {reservation.reservation_time} • {reservation.party_size} guests
                              </p>
                            </div>
                            <Badge variant={getStatusColor(reservation.status) as any}>
                              {reservation.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;