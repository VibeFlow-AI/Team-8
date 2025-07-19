"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SessionRequest {
  id: string;
  studentName: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  description: string;
  status: "pending" | "approved" | "rejected";
}

interface UpcomingSession {
  id: string;
  studentName: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  meetingLink: string;
}

interface MentorStats {
  totalSessions: number;
  upcomingSessions: number;
  pendingRequests: number;
  totalEarnings: number;
  rating: number;
}

export default function MentorDashboardPage() {
  const [mentorName, setMentorName] = useState("Dr. Sarah Wilson"); // Mock data
  const [stats, setStats] = useState<MentorStats>({
    totalSessions: 45,
    upcomingSessions: 3,
    pendingRequests: 2,
    totalEarnings: 2250,
    rating: 4.8,
  });
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>(
    []
  );
  const [activeTab, setActiveTab] = useState<"requests" | "upcoming">(
    "requests"
  );

  useEffect(() => {
    // Mock data - replace with actual API calls
    setSessionRequests([
      {
        id: "1",
        studentName: "John Doe",
        subject: "Machine Learning Fundamentals",
        date: "2025-07-25",
        time: "14:00",
        duration: 60,
        description:
          "I need help understanding neural networks and their applications.",
        status: "pending",
      },
      {
        id: "2",
        studentName: "Jane Smith",
        subject: "Data Structures",
        date: "2025-07-26",
        time: "10:00",
        duration: 90,
        description:
          "Help with implementing binary trees and graph algorithms.",
        status: "pending",
      },
    ]);

    setUpcomingSessions([
      {
        id: "3",
        studentName: "Mike Johnson",
        subject: "Software Engineering",
        date: "2025-07-23",
        time: "16:00",
        duration: 60,
        meetingLink: "https://meet.google.com/abc-def-ghi",
      },
      {
        id: "4",
        studentName: "Sarah Lee",
        subject: "Algorithm Design",
        date: "2025-07-24",
        time: "11:00",
        duration: 90,
        meetingLink: "https://meet.google.com/jkl-mno-pqr",
      },
    ]);
  }, []);

  const handleRequestResponse = (
    requestId: string,
    action: "approve" | "reject"
  ) => {
    setSessionRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action === "approve" ? "approved" : "rejected",
            }
          : request
      )
    );

    // Update stats
    setStats((prev) => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      upcomingSessions:
        action === "approve"
          ? prev.upcomingSessions + 1
          : prev.upcomingSessions,
    }));
  };

  const pendingRequests = sessionRequests.filter(
    (req) => req.status === "pending"
  );

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {mentorName}!</h1>
          <p className="text-gray-600 mt-2">
            Manage your mentoring sessions and student requests
          </p>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Student Age Distribution
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "13-15", value: 30 },
                      { name: "16-18", value: 45 },
                      { name: "19-21", value: 25 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {["#FF6B6B", "#4ECDC4", "#45B7D1"].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Subject Interest Distribution
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { subject: "Mathematics", count: 35 },
                    { subject: "Physics", count: 28 },
                    { subject: "Chemistry", count: 22 },
                    { subject: "Biology", count: 15 },
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="subject" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Sessions
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalSessions}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Upcoming</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.upcomingSessions}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pendingRequests}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Earnings
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              ${stats.totalEarnings}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Rating</h3>
            <div className="flex items-center">
              <p className="text-3xl font-bold text-yellow-600">
                {stats.rating}
              </p>
              <span className="text-yellow-500 ml-2">★</span>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("requests")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "requests"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Session Requests ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "upcoming"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Upcoming Sessions ({upcomingSessions.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Session Requests</h2>
              <Button variant="outline">Manage Availability</Button>
            </div>

            {pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {request.studentName}
                        </h3>
                        <p className="text-gray-600">{request.subject}</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Date:</span>{" "}
                        {request.date}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Time:</span>{" "}
                        {request.time}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span>{" "}
                        {request.duration} minutes
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">
                        Student's Message:
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {request.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          handleRequestResponse(request.id, "approve")
                        }
                        className="flex-1"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleRequestResponse(request.id, "reject")
                        }
                        className="flex-1"
                      >
                        Decline
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending requests
                </h3>
                <p className="text-gray-600">
                  You're all caught up! New session requests will appear here.
                </p>
              </Card>
            )}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              <Button variant="outline">View Calendar</Button>
            </div>

            {upcomingSessions.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {session.studentName}
                        </h3>
                        <p className="text-gray-600">{session.subject}</p>
                      </div>
                      <Badge variant="default">Confirmed</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Date:</span>{" "}
                        {session.date}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Time:</span>{" "}
                        {session.time}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span>{" "}
                        {session.duration} minutes
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Session
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Send Message
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming sessions
                </h3>
                <p className="text-gray-600">
                  Your schedule is clear. Approved session requests will appear
                  here.
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-12">
              Update Profile
            </Button>
            <Button variant="outline" className="h-12">
              Set Availability
            </Button>
            <Button variant="outline" className="h-12">
              View Earnings
            </Button>
            <Button variant="outline" className="h-12">
              Student Reviews
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
