import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mentor } from '@/lib/types/session.types';

interface MentorCardProps {
  mentor: Mentor;
  onSelect?: (mentorId: string) => void;
  onViewProfile?: (mentorId: string) => void;
  isSelected?: boolean;
}

export function MentorCard({ mentor, onSelect, onViewProfile, isSelected }: MentorCardProps) {
  return (
    <Card className={`p-6 transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{mentor.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{mentor.rating}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-lg font-semibold text-green-600">${mentor.price}/hour</p>
        </div>
        
        <div className="mb-4 flex-grow">
          <p className="text-sm text-gray-600 mb-2">Expertise:</p>
          <div className="flex flex-wrap gap-1">
            {mentor.expertise.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {mentor.bio && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Available:</p>
          <p className="text-sm">{mentor.availability.join(', ')}</p>
        </div>

        <div className="flex gap-2 mt-auto">
          {onViewProfile && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewProfile(mentor.id)}
              className="flex-1"
            >
              View Profile
            </Button>
          )}
          
          {onSelect && (
            <Button 
              size="sm" 
              onClick={() => onSelect(mentor.id)}
              className="flex-1"
              variant={isSelected ? "secondary" : "default"}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
