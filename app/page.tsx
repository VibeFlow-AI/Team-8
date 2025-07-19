import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

async function Home() {
  // This demonstrates SSR - data is fetched on the server
  const samples = await prisma.sample.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">VibeFlow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with expert mentors and accelerate your learning journey. 
            Get personalized guidance from industry professionals and academic experts.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8">
              <a href="/student/registration">Get Started as Student</a>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <a href="/mentor/registration">Become a Mentor</a>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Mentors</h3>
            <p className="text-gray-600">
              Connect with industry professionals and academic experts across various fields
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Sessions</h3>
            <p className="text-gray-600">
              Book one-on-one sessions tailored to your specific learning needs and goals
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Schedule sessions that fit your timeline with easy booking and management
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of students who have accelerated their learning with VibeFlow
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <a href="/student/registration">Join as Student</a>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <a href="/login">Login</a>
            </Button>
          </div>
        </div>

        {/* Debug info - remove in production */}
        {samples.length > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
            <p>Database connection successful. Found {samples.length} sample records.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
