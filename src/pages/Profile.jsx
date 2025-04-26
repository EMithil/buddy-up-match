import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import CompatibilityScore from "@/components/CompatibilityScore";

const ProfileDetails = ({ user, onUpdate, isLoading }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
    occupation: user.occupation || "",
    age: user.age || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          <p className="text-sm text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Tell others about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Student, Professional, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="100"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const Account = ({ user, onLogout }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    matches: true,
    messages: true,
  });

  const handleDeleteAccount = () => {
    // In a real app, we'd have a confirmation modal and API call
    toast({
      title: "Account deletion requested",
      description: "This feature is not implemented in the demo.",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New matches</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when you have new roommate matches
                </p>
              </div>
              <Switch
                checked={notifications.matches}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, matches: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New messages</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when you receive new messages
                </p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, messages: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing emails</p>
                <p className="text-sm text-muted-foreground">
                  Receive tips and updates about finding roommates
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onLogout}
            >
              Log out
            </Button>
          </div>
          <div>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete account
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RoommateDashboard = ({ user }) => {
  // This would come from API in a real app
  const mockCompatibilityFactors = {
    lifestyle: 85,
    cleanliness: 90,
    schedule: 75,
    interests: 60,
    habits: 80,
  };

  // These would come from API in a real app
  const mockMatches = [
    {
      id: 1,
      name: "Alex Johnson",
      score: 92,
      room: {
        title: "Sunny Room in Downtown",
        price: 1200,
        location: "Downtown"
      }
    },
    {
      id: 2,
      name: "Jamie Smith",
      score: 84,
      room: {
        title: "Cozy Studio near Park",
        price: 950,
        location: "Westside"
      }
    },
    {
      id: 3,
      name: "Taylor Williams",
      score: 78,
      room: {
        title: "Private Room in Shared House",
        price: 800,
        location: "University District"
      }
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Top Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <CompatibilityScore 
              score={92} 
              size="large" 
              showDetails={true}
              matchFactors={mockCompatibilityFactors}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMatches.map((match) => (
              <div 
                key={match.id} 
                className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {match.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{match.name}</p>
                    <p className="text-sm text-gray-500">
                      {match.room.title} · ${match.room.price}/mo
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{match.score}% Match</Badge>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HostedRooms = ({ user }) => {
  // Mock data for hosted rooms - in a real app this would come from an API
  const [hostedRooms, setHostedRooms] = useState([
    {
      id: 1,
      title: "Sunny Private Room in Shared Apartment",
      location: "Downtown",
      price: 900,
      status: "active",
      applicants: 3,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Cozy Room with Private Bathroom",
      location: "University District",
      price: 750,
      status: "pending",
      applicants: 0,
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlZHJvb20lMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
  ]);

  // Only show hosted rooms if user is an owner
  const showNoRoomsMessage = user.preferences?.userType !== 'owner' || hostedRooms.length === 0;

  return (
    <div className="space-y-6">
      {showNoRoomsMessage ? (
        <div className="text-center py-10">
          {user.preferences?.userType !== 'owner' ? (
            <div>
              <h3 className="text-xl font-medium mb-2">You're currently set as a Room Seeker</h3>
              <p className="text-gray-500 mb-4">To host a room, you need to change your user type to Room Owner</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/user-type"}
              >
                Change User Type
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-medium mb-2">You haven't listed any rooms yet</h3>
              <p className="text-gray-500 mb-4">Start hosting by creating your first room listing</p>
              <Button 
                onClick={() => window.location.href = "/preferences"}
              >
                List a Room
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Your Hosted Rooms</h3>
            <Button 
              size="sm"
              onClick={() => window.location.href = "/preferences"}
            >
              Add New Room
            </Button>
          </div>
          
          <div className="grid gap-6">
            {hostedRooms.map(room => (
              <Card key={room.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={room.image} 
                      alt={room.title} 
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{room.title}</h3>
                        <p className="text-gray-500">{room.location}</p>
                      </div>
                      <Badge className={room.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {room.status === 'active' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-lg font-medium">${room.price}/month</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {room.applicants} {room.applicants === 1 ? 'person' : 'people'} interested
                      </p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">
                        View Applicants {room.applicants > 0 && <span className="ml-1 bg-primary/20 text-primary rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">{room.applicants}</span>}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserInfo, logout } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleUpdateProfile = async (formData) => {
    setIsLoading(true);
    try {
      await updateUserInfo(formData);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-gray-600 mt-2">
              Manage your account information and preferences
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.preferences?.userType && (
                  <Badge className="bg-primary">
                    {user.preferences.userType === "seeker" ? "Room Seeker" : "Room Owner"}
                  </Badge>
                )}
                {user.preferences?.location && (
                  <Badge variant="outline">
                    {user.preferences.location}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => navigate("/preferences")}>
                  Update Preferences
                </Button>
                <Button variant="outline" onClick={() => navigate("/user-type")}>
                  Change User Type
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="w-full">
                <TabsTrigger value="profile" className="flex-1">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="matches" className="flex-1">
                  Roommate Matches
                </TabsTrigger>
                <TabsTrigger value="host" className="flex-1">
                  Host a Room
                </TabsTrigger>
                <TabsTrigger value="account" className="flex-1">
                  Account
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="pt-6">
                <ProfileDetails
                  user={user}
                  onUpdate={handleUpdateProfile}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="matches" className="pt-6">
                <RoommateDashboard user={user} />
              </TabsContent>
              
              <TabsContent value="host" className="pt-6">
                <HostedRooms user={user} />
              </TabsContent>
              
              <TabsContent value="account" className="pt-6">
                <Account user={user} onLogout={handleLogout} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
