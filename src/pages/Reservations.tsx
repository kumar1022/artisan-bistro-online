import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Reservations = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    requests: ''
  });
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00'
  ];

  const partySizes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !partySize || !customerInfo.name || !customerInfo.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          party_size: parseInt(partySize),
          reservation_date: format(selectedDate, 'yyyy-MM-dd'),
          reservation_time: selectedTime,
          special_requests: customerInfo.requests
        });

      if (error) throw error;

      toast.success('Reservation request submitted! We\'ll confirm shortly.');
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setPartySize('');
      setCustomerInfo({ name: '', email: '', phone: '', requests: '' });
      
    } catch (error) {
      toast.error('Failed to submit reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Make a Reservation</h1>
          <p className="text-muted-foreground">
            Reserve your table at Artisan Bistro for an unforgettable dining experience
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
            <CardDescription>
              Please fill in your details and we'll confirm your reservation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReservation} className="space-y-6">
              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Party Size */}
              <div className="space-y-2">
                <Label htmlFor="party-size">Party Size *</Label>
                <Select value={partySize} onValueChange={setPartySize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {partySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} {size === '1' ? 'person' : 'people'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={customerInfo.requests}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, requests: e.target.value }))}
                    placeholder="Any special dietary requirements, celebration details, or other requests..."
                    rows={3}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" variant="gold" disabled={loading}>
                {loading ? 'Submitting...' : 'Reserve Table'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information Section */}
        <div className="mt-8 text-center space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Reservation Policy</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Reservations are confirmed within 2 hours during business hours</p>
                <p>• Tables are held for 15 minutes past reservation time</p>
                <p>• For parties of 6 or more, please call us directly</p>
                <p>• Cancellations can be made up to 2 hours before your reservation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reservations;