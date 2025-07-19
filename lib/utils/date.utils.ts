/**
 * Date and time utility functions
 */

/**
 * Format date to readable string
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Format time to readable string
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date and time together
 */
export function formatDateTime(dateString: string, timeString: string): string {
  const sessionDate = new Date(`${dateString}T${timeString}`);
  
  return sessionDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffMs / (1000 * 60));

  if (diffDays > 1) {
    return `in ${diffDays} days`;
  } else if (diffDays === 1) {
    return 'tomorrow';
  } else if (diffDays === 0) {
    if (diffHours > 1) {
      return `in ${diffHours} hours`;
    } else if (diffHours === 1) {
      return 'in 1 hour';
    } else if (diffMinutes > 0) {
      return `in ${diffMinutes} minutes`;
    } else if (diffMinutes === 0) {
      return 'now';
    } else if (diffMinutes > -60) {
      return `${Math.abs(diffMinutes)} minutes ago`;
    } else {
      return `${Math.abs(diffHours)} hours ago`;
    }
  } else if (diffDays === -1) {
    return 'yesterday';
  } else {
    return `${Math.abs(diffDays)} days ago`;
  }
}

/**
 * Check if a date/time is in the past
 */
export function isPastDateTime(dateString: string, timeString?: string): boolean {
  const dateTime = timeString 
    ? new Date(`${dateString}T${timeString}`)
    : new Date(dateString);
  
  return dateTime < new Date();
}

/**
 * Check if a session can be joined (within 15 minutes of start time)
 */
export function canJoinSession(dateString: string, timeString: string): boolean {
  const sessionTime = new Date(`${dateString}T${timeString}`);
  const now = new Date();
  const diffMs = sessionTime.getTime() - now.getTime();
  
  // Allow joining 15 minutes before and up to 30 minutes after
  return diffMs <= 15 * 60 * 1000 && diffMs > -30 * 60 * 1000;
}

/**
 * Get duration in human readable format
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
}

/**
 * Get available time slots for a day
 */
export function getTimeSlots(
  startHour: number = 9,
  endHour: number = 17,
  intervalMinutes: number = 60
): string[] {
  const slots: string[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  
  return slots;
}

/**
 * Check if a date is a weekend
 */
export function isWeekend(dateString: string): boolean {
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Get next available date (excluding weekends)
 */
export function getNextAvailableDate(excludeWeekends: boolean = false): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (!excludeWeekends) {
    return tomorrow.toISOString().split('T')[0];
  }
  
  // Skip weekends
  while (isWeekend(tomorrow.toISOString().split('T')[0])) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }
  
  return tomorrow.toISOString().split('T')[0];
}
