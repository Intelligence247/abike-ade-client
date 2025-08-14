"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfile } from '@/hooks/use-profile';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  Lock
} from 'lucide-react';

export function ProfileContent() {
  const { profile, loading, error, updateProfile, changePassword, uploadIdentity, uploadAgreement, resetError } = useProfile();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    phone_number: '',
    institution: '',
    department: '',
    level: ''
  });
  const [passwordData, setPasswordData] = React.useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [identityFiles, setIdentityFiles] = React.useState<{
    image: File | null;
    identity: File | null;
  }>({
    image: null,
    identity: null
  });
  const [agreementFile, setAgreementFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || '',
        institution: profile.institution || '',
        department: profile.department || '',
        level: profile.level || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Only send the fields that can be updated via the API
      const updateData = {
        phone_number: formData.phone_number,
        institution: formData.institution,
        department: formData.department,
        level: formData.level
      };
      
      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || '',
        institution: profile.institution || '',
        department: profile.department || '',
        level: profile.level || ''
      });
    }
    setIsEditing(false);
  };

  const handlePasswordSave = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('New passwords do not match');
      return;
    }
    
    try {
      await changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      });
      setIsChangingPassword(false);
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  const handlePasswordCancel = () => {
    setIsChangingPassword(false);
    setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
  };

  const handleIdentityUpload = async () => {
    if (!identityFiles.image || !identityFiles.identity) {
      alert('Please select both image and identity files');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', identityFiles.image);
      formData.append('identity', identityFiles.identity);
      
      await uploadIdentity(formData);
      setIdentityFiles({ image: null, identity: null });
    } catch (error) {
      console.error('Failed to upload identity:', error);
    }
  };

  const handleAgreementUpload = async () => {
    if (!agreementFile) {
      alert('Please select an agreement file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('document', agreementFile);
      
      await uploadAgreement(formData);
      setAgreementFile(null);
    } catch (error) {
      console.error('Failed to upload agreement:', error);
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        <div className="lg:ml-64 flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navigation />
        <div className="lg:ml-64 flex items-center justify-center h-screen">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Profile Error
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'Failed to load profile data'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account information and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 dark:text-red-200">Error Updating Profile</p>
                  <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                  <Button
                    onClick={resetError}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-red-700 border-red-300 hover:bg-red-100"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {!error && !loading && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 dark:text-green-200">Profile Updated Successfully</p>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    Your profile information has been saved.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={profile.first_name || ''}
                      disabled={true}
                      placeholder="Enter first name"
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profile.last_name || ''}
                      disabled={true}
                      placeholder="Enter last name"
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ''}
                    disabled={true}
                    placeholder="Enter email address"
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Academic Information
                </CardTitle>
                <CardDescription>
                  Your educational details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter institution name"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter department"
                  />
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select onValueChange={(value) => handleInputChange('level', value)} value={formData.level} disabled={!isEditing}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100L">100 Level</SelectItem>
                      <SelectItem value="200L">200 Level</SelectItem>
                      <SelectItem value="300L">300 Level</SelectItem>
                      <SelectItem value="400L">400 Level</SelectItem>
                      <SelectItem value="500L">500 Level</SelectItem>
                      <SelectItem value="600L">600 Level</SelectItem>
                      <SelectItem value="ND">ND (National Diploma)</SelectItem>
                      <SelectItem value="HND">HND (Higher National Diploma)</SelectItem>
                      <SelectItem value="MSc">MSc</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Security */}
          <Card className="border-gray-200 dark:border-gray-800 mt-6">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="old_password">Current Password</Label>
                      <Input
                        id="old_password"
                        type="password"
                        value={passwordData.old_password}
                        onChange={(e) => handlePasswordChange('old_password', e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new_password">New Password</Label>
                      <Input
                        id="new_password"
                        type="password"
                        value={passwordData.new_password}
                        onChange={(e) => handlePasswordChange('new_password', e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password">Confirm Password</Label>
                      <Input
                        id="confirm_password"
                        type="password"
                        value={passwordData.confirm_password}
                        onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handlePasswordSave} disabled={loading}>
                      {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Password
                    </Button>
                    <Button variant="outline" onClick={handlePasswordCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Password</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last changed: Never
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                    Change Password
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Uploads */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Identity Upload */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Identity Documents
                </CardTitle>
                <CardDescription>
                  Upload your passport photo and school ID
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="passport_image">Passport Photo</Label>
                  <Input
                    id="passport_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdentityFiles(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG up to 2MB</p>
                </div>
                <div>
                  <Label htmlFor="identity_document">School ID/Course Form</Label>
                  <Input
                    id="identity_document"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdentityFiles(prev => ({ ...prev, identity: e.target.files?.[0] || null }))}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG up to 2MB</p>
                </div>
                <Button 
                  onClick={handleIdentityUpload} 
                  disabled={!identityFiles.image || !identityFiles.identity || loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Identity Documents
                </Button>
              </CardContent>
            </Card>

            {/* Agreement Upload */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Upload Signed Agreement
                </CardTitle>
                <CardDescription>
                  Upload your signed rental agreement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agreement_document">Agreement Document</Label>
                  <Input
                    id="agreement_document"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAgreementFile(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                </div>
                <Button 
                  onClick={handleAgreementUpload} 
                  disabled={!agreementFile || loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Agreement
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
