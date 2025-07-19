import { Mentor } from '@/lib/types/session.types';
import { SearchParams, PaginatedResponse } from '@/lib/types/api.types';

/**
 * Service layer for mentor-related operations
 * Replace mock data with actual API calls when backend is ready
 */
export class MentorService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Search mentors with filters
   */
  static async searchMentors(params: SearchParams = {}): Promise<PaginatedResponse<Mentor>> {
    try {
      // TODO: Replace with actual API call
      // const queryParams = new URLSearchParams();
      // if (params.query) queryParams.append('query', params.query);
      // if (params.page) queryParams.append('page', params.page.toString());
      // if (params.limit) queryParams.append('limit', params.limit.toString());
      // 
      // const response = await fetch(`${this.baseUrl}/mentors?${queryParams}`);
      // const result: PaginatedResponse<Mentor> = await response.json();
      // return result;

      // Mock implementation for development
      const mockMentors: Mentor[] = [
        {
          id: '1',
          name: 'Dr. Sarah Wilson',
          expertise: ['Computer Science', 'AI/ML', 'Software Engineering'],
          rating: 4.8,
          price: 50,
          availability: ['Monday', 'Wednesday', 'Friday'],
        },
        {
          id: '2',
          name: 'Prof. Michael Chen',
          expertise: ['Mathematics', 'Statistics', 'Data Analysis'],
          rating: 4.9,
          price: 45,
          availability: ['Tuesday', 'Thursday', 'Saturday'],
        },
        {
          id: '3',
          name: 'Dr. Emily Rodriguez',
          expertise: ['Physics', 'Engineering', 'Research Methods'],
          rating: 4.7,
          price: 55,
          availability: ['Monday', 'Tuesday', 'Thursday'],
        },
      ];

      // Filter by search query if provided
      let filteredMentors = mockMentors;
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredMentors = mockMentors.filter(mentor =>
          mentor.name.toLowerCase().includes(query) ||
          mentor.expertise.some(exp => exp.toLowerCase().includes(query))
        );
      }

      return {
        data: filteredMentors,
        pagination: {
          page: params.page || 1,
          limit: params.limit || 10,
          total: filteredMentors.length,
          totalPages: Math.ceil(filteredMentors.length / (params.limit || 10)),
        },
      };
    } catch (error) {
      console.error('Error searching mentors:', error);
      throw new Error('Failed to search mentors');
    }
  }

  /**
   * Get mentor details by ID
   */
  static async getMentorById(mentorId: string): Promise<Mentor | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/mentors/${mentorId}`);
      // const result: ApiResponse<Mentor> = await response.json();
      // return result.data;

      // Mock implementation
      const mockMentor: Mentor = {
        id: mentorId,
        name: 'Dr. Sarah Wilson',
        expertise: ['Computer Science', 'AI/ML', 'Software Engineering'],
        rating: 4.8,
        price: 50,
        availability: ['Monday', 'Wednesday', 'Friday'],
      };

      return mockMentor;
    } catch (error) {
      console.error('Error fetching mentor:', error);
      return null;
    }
  }

  /**
   * Get mentor availability for booking
   */
  static async getMentorAvailability(
    mentorId: string, 
    dateFrom: string, 
    dateTo: string
  ): Promise<string[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(
      //   `${this.baseUrl}/mentors/${mentorId}/availability?from=${dateFrom}&to=${dateTo}`
      // );
      // const result: ApiResponse<string[]> = await response.json();
      // return result.data;

      // Mock implementation
      return [
        '2025-07-25T14:00:00',
        '2025-07-25T15:00:00',
        '2025-07-26T10:00:00',
        '2025-07-26T11:00:00',
      ];
    } catch (error) {
      console.error('Error fetching mentor availability:', error);
      return [];
    }
  }

  /**
   * Get mentor statistics
   */
  static async getMentorStats(mentorId: string) {
    try {
      // TODO: Replace with actual API call
      
      // Mock implementation
      return {
        totalSessions: 45,
        upcomingSessions: 3,
        pendingRequests: 2,
        totalEarnings: 2250,
        rating: 4.8,
        completionRate: 96,
        responseTime: '2 hours',
      };
    } catch (error) {
      console.error('Error fetching mentor stats:', error);
      throw new Error('Failed to fetch mentor statistics');
    }
  }
}
