'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  price: number;
  availability: string[];
}

export default function BookSessionPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '60',
    subject: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API call
    setMentors([
      {
        id: '1',
        name: 'Dr. Sarah Wilson',
        expertise: ['Computer Science', 'AI/ML', 'Software Engineering'],
        rating: 4.8,
        price: 50,
        availability: ['Monday', 'Wednesday', 'Friday']
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        expertise: ['Mathematics', 'Statistics', 'Data Analysis'],
        rating: 4.9,
        price: 45,
        availability: ['Tuesday', 'Thursday', 'Saturday']
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        expertise: ['Physics', 'Engineering', 'Research Methods'],
        rating: 4.7,
        price: 55,
        availability: ['Monday', 'Tuesday', 'Thursday']
      }
    ]);
  }, []);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    
    // Handle booking logic here
    console.log('Booking session:', {
      mentorId: selectedMentor.id,
      ...bookingData
    });
    
    // Redirect to booked session page or show success message
    alert('Session booked successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Book a Session with a Mentor</h1>

        {!selectedMentor ? (
          <div>
            <div className="mb-6">
              <Label htmlFor="search">Search Mentors</Label>
              <Input
                id="search"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{mentor.rating}</span>
                      <span className="ml-4 text-lg font-semibold text-green-600">
                        ${mentor.price}/hour
                      </span>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Available:</p>
                      <p className="text-sm">{mentor.availability.join(', ')}</p>
                    </div>

                    <Button 
                      onClick={() => setSelectedMentor(mentor)}
                      className="w-full mt-auto"
                    >
                      Select Mentor
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Selected Mentor</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedMentor.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm">{selectedMentor.rating}</span>
                  <span className="ml-4 text-lg font-semibold text-green-600">
                    ${selectedMentor.price}/hour
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedMentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedMentor(null)}
                className="w-full"
              >
                Choose Different Mentor
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Session</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <select
                    id="duration"
                    name="duration"
                    value={bookingData.duration}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject/Topic</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={bookingData.subject}
                    onChange={handleInputChange}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={bookingData.description}
                    onChange={handleInputChange}
                    placeholder="Provide more details about what you'd like to learn..."
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{bookingData.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span>${selectedMentor.price}/hour</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>
                      ${(selectedMentor.price * parseInt(bookingData.duration) / 60).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Book Session
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
