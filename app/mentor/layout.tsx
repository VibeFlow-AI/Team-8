import { Button } from '@/components/ui/button';

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mentor Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-blue-600">
                VibeFlow
              </a>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Mentor Portal
              </span>
            </div>
            <nav className="flex space-x-4">
              <a href="/mentor/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <Button variant="outline" size="sm">
                <a href="/login">Logout</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
