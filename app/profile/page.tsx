"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProfile } from '@/hooks/use-profile';
import { ProtectedRoute } from '@/components/protected-route';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  Camera,
  Moon,
  Sun,
  Settings,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const { getProfile, updateProfile, changePassword, loading } = useProfile();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    phone_number: '',
    institution: '',
    department: '',
    level: '',
  });

  const [passwordData, setPasswordData] = React.useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  // Load profile data on component mount
  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profileData = await getProfile();
    if (profileData) {
      setProfile(profileData);
      setFormData({
        phone_number: profileData.phone_number || '',
        institution: profileData.institution || '',
        department: profileData.department || '',
        level: profileData.level || '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
      await loadProfile(); // Reload profile data
    }
    
    setIsSaving(false);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || '',
        institution: profile.institution || '',
        department: profile.department || '',
        level: profile.level || '',
      });
    }
    setIsEditing(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('New passwords do not match');
      return;
    }
    
    const success = await changePassword({
      old_password: passwordData.old_password,
      new_password: passwordData.new_password,
    });
    
    if (success) {
      setIsPasswordDialogOpen(false);
      setPasswordData({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });
    }
  };

  if (!profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
          <Navigation />
          <div className="lg:ml-64 flex items-center justify-center h-screen">
            <div className="text-center">
              <Settings className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        
        <div className="lg:ml-64">
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Profile Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your account information and preferences
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      size="sm" 
                      disabled={isSaving}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isSaving ? (
                        <>
                          <Settings className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Avatar & Basic Info */}
              <div className="lg:col-span-1">
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto">
                        <span className="text-white text-2xl font-bold">
                          {profile.first_name?.[0]}{profile.last_name?.[0]}
                        </span>
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {profile.first_name} {profile.last_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {profile.department} - {profile.level}
                    </p>
                    <Badge variant="secondary" className="mb-4">
                      {profile.user?.username}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{profile.phone_number}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{profile.institution}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Settings */}
                <Card className="border-gray-200 dark:border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Choose your preferred theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <button
                        onClick={() => setTheme('light')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          theme === 'light'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-3" />
                          <span className="text-sm font-medium">Light Mode</span>
                        </div>
                        {theme === 'light' && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setTheme('dark')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          theme === 'dark'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-3" />
                          <span className="text-sm font-medium">Dark Mode</span>
                        </div>
                        {theme === 'dark' && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setTheme('system')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          theme === 'system'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-3" />
                          <span className="text-sm font-medium">System</span>
                        </div>
                        {theme === 'system' && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Information Form */}
              <div className="lg:col-span-2">
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your account details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="first_name"
                            value={profile.first_name}
                            disabled
                            className="pl-10 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="last_name"
                            value={profile.last_name}
                            disabled
                            className="pl-10 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            value={profile.email}
                            disabled
                            className="pl-10 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Current Level</Label>
                        {isEditing ? (
                          <Select 
                            value={formData.level} 
                            onValueChange={(value) => handleSelectChange('level', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100L">100 Level</SelectItem>
                              <SelectItem value="200L">200 Level</SelectItem>
                              <SelectItem value="300L">300 Level</SelectItem>
                              <SelectItem value="400L">400 Level</SelectItem>
                              <SelectItem value="500L">500 Level</SelectItem>
                              <SelectItem value="postgrad">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={formData.level}
                            disabled
                            className="bg-gray-50 dark:bg-gray-800"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profile.user?.username}
                          disabled
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="border-gray-200 dark:border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Lock className="h-4 w-4 mr-2" />
                            Change Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and choose a new one
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="old_password">Current Password</Label>
                              <div className="relative">
                                <Input
                                  id="old_password"
                                  name="old_password"
                                  type={showOldPassword ? "text" : "password"}
                                  value={passwordData.old_password}
                                  onChange={handlePasswordChange}
                                  required
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowOldPassword(!showOldPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="new_password">New Password</Label>
                              <div className="relative">
                                <Input
                                  id="new_password"
                                  name="new_password"
                                  type={showNewPassword ? "text" : "password"}
                                  value={passwordData.new_password}
                                  onChange={handlePasswordChange}
                                  required
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="confirm_password">Confirm New Password</Label>
                              <div className="relative">
                                <Input
                                  id="confirm_password"
                                  name="confirm_password"
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={passwordData.confirm_password}
                                  onChange={handlePasswordChange}
                                  required
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPasswordDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={loading}>
                                {loading ? 'Changing...' : 'Change Password'}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}