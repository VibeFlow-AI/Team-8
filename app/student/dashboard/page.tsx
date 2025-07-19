'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MentorCard } from '@/components/session/mentor-card';

interface Session {
  id: string;
  mentorName: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  price: number;
  availability: string[];
  bio?: string;
  profileImage?: string;
}

export default function StudentDashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [studentName, setStudentName] = useState('John Doe'); // Mock data
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'discover'>('overview');

  useEffect(() => {
    // Mock data - replace with actual API call
    setSessions([
      {
        id: '1',
        mentorName: 'Dr. Sarah Wilson',
        subject: 'Computer Science',
        date: '2025-07-25',
        time: '2:00 PM',
        status: 'upcoming'
      },
      {
        id: '2',
        mentorName: 'Prof. Michael Chen',
        subject: 'Mathematics',
        date: '2025-07-20',
        time: '10:00 AM',
        status: 'completed'
      }
    ]);

    // Mock mentor data for discovery
    setMentors([
      {
        id: '1',
        name: 'Dr. Sarah Wilson',
        expertise: ['Computer Science', 'AI/ML', 'Software Engineering'],
        rating: 4.8,
        price: 50,
        availability: ['Monday', 'Wednesday', 'Friday'],
        bio: 'Experienced software engineer and AI researcher with 10+ years in the industry.'
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        expertise: ['Mathematics', 'Statistics', 'Data Analysis'],
        rating: 4.9,
        price: 45,
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        bio: 'Mathematics professor specializing in applied statistics and data science.'
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        expertise: ['Physics', 'Engineering', 'Research Methods'],
        rating: 4.7,
        price: 55,
        availability: ['Monday', 'Tuesday', 'Thursday'],
        bio: 'Physics researcher with expertise in quantum mechanics and engineering applications.'
      },
      {
        id: '4',
        name: 'Alex Johnson',
        expertise: ['Web Development', 'JavaScript', 'React'],
        rating: 4.6,
        price: 35,
        availability: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
        bio: 'Full-stack developer with 8 years experience in modern web technologies.'
      },
      {
        id: '5',
        name: 'Dr. Maria Santos',
        expertise: ['Data Science', 'Machine Learning', 'Python'],
        rating: 4.9,
        price: 60,
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        bio: 'Data scientist and ML engineer working on cutting-edge AI applications.'
      },
      {
        id: '6',
        name: 'James Wilson',
        expertise: ['Business Strategy', 'Leadership', 'Project Management'],
        rating: 4.5,
        price: 40,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        bio: 'Business consultant with expertise in strategic planning and team leadership.'
      }
    ]);
  }, []);

  // Filter mentors based on search and filter criteria
  useEffect(() => {
    let filtered = mentors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Duration filter (affects price calculation)
    if (selectedDuration !== 'all') {
      // This could be used to filter mentors based on their availability for specific durations
      // For now, we'll keep all mentors as this is more about session booking preference
    }

    // Expertise filter
    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(mentor =>
        mentor.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()))
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter(mentor => mentor.price <= 40);
          break;
        case 'moderate':
          filtered = filtered.filter(mentor => mentor.price > 40 && mentor.price <= 55);
          break;
        case 'premium':
          filtered = filtered.filter(mentor => mentor.price > 55);
          break;
      }
    }

    setFilteredMentors(filtered);
  }, [mentors, searchTerm, selectedDuration, selectedExpertise, priceRange]);

  const upcomingSessions = sessions.filter(session => session.status === 'upcoming');
  const pastSessions = sessions.filter(session => session.status === 'completed');

  const handleMentorSelect = (mentorId: string) => {
    // Navigate to booking page with selected mentor
    window.location.href = `/student/book-session?mentorId=${mentorId}`;
  };

  const handleMentorProfile = (mentorId: string) => {
    // Navigate to mentor profile page
    console.log('View mentor profile:', mentorId);
  };

  // Get unique expertise areas for filter dropdown
  const expertiseAreas = Array.from(new Set(mentors.flatMap(mentor => mentor.expertise)));

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {studentName}!</h1>
          <p className="text-gray-600 mt-2">Manage your mentoring sessions and discover new mentors</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discover'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Discover Mentors
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Total Sessions</h3>
                <p className="text-3xl font-bold text-blue-600">{sessions.length}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
                <p className="text-3xl font-bold text-green-600">{upcomingSessions.length}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Completed Sessions</h3>
                <p className="text-3xl font-bold text-gray-600">{pastSessions.length}</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                  <Button>
                    <a href="/student/book-session">Book New Session</a>
                  </Button>
                </div>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{session.mentorName}</h3>
                            <p className="text-gray-600">{session.subject}</p>
                            <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <a href={`/student/booked-session/${session.id}`}>View Details</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No upcoming sessions</p>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
                {pastSessions.length > 0 ? (
                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{session.mentorName}</h3>
                            <p className="text-gray-600">{session.subject}</p>
                            <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            Completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No completed sessions yet</p>
                )}
              </Card>
            </div>

            {/* Quick Actions for Discovery */}
            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-12"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover New Mentors
                </Button>
                <Button variant="outline" className="h-12">
                  <a href="/student/book-session">Book a Session</a>
                </Button>
                <Button variant="outline" className="h-12">
                  View All Sessions
                </Button>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Find Your Perfect Mentor</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    placeholder="Search by name or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Session Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expertise</label>
                  <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Expertise</SelectItem>
                      {expertiseAreas.map((expertise) => (
                        <SelectItem key={expertise} value={expertise.toLowerCase()}>
                          {expertise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget ($20-40)</SelectItem>
                      <SelectItem value="moderate">Moderate ($40-55)</SelectItem>
                      <SelectItem value="premium">Premium ($55+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedDuration !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Duration: {selectedDuration} min
                    <button 
                      onClick={() => setSelectedDuration('all')}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedExpertise !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Expertise: {selectedExpertise}
                    <button 
                      onClick={() => setSelectedExpertise('all')}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {priceRange !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: {priceRange}
                    <button 
                      onClick={() => setPriceRange('all')}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </Card>

            {/* Mentor Results */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Available Mentors ({filteredMentors.length})
                </h3>
                <div className="text-sm text-gray-600">
                  Showing {filteredMentors.length} of {mentors.length} mentors
                </div>
              </div>

              {filteredMentors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.map((mentor) => (
                    <MentorCard
                      key={mentor.id}
                      mentor={mentor}
                      onSelect={handleMentorSelect}
                      onViewProfile={handleMentorProfile}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria to find more mentors.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDuration('all');
                      setSelectedExpertise('all');
                      setPriceRange('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
