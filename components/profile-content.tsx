"use client"

import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/use-profile';
import { constructImageUrl } from '@/lib/utils';
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
  const { profile, loading, error, updateProfile, changePassword, uploadIdentity, uploadAgreement, getProfile, resetError } = useProfile(true);
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
  const [identityFile, setIdentityFile] = React.useState<File | null>(null);
  const [agreementFile, setAgreementFile] = React.useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = React.useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

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
    if (!identityFile) {
      alert('Please select an identity document');
      return;
    }

    try {
      const formData = new FormData();
      
      // Use the profile image as the passport photo and the selected file as identity
      if (profile?.image && profile.image.trim() !== '') {
        try {
          // If user has a profile image, fetch it and use it as the passport photo
          const profileImageUrl = constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, profile.image);
          console.log('Fetching profile image from:', profileImageUrl);
          
          const profileImageResponse = await fetch(profileImageUrl);
          if (profileImageResponse.ok) {
            const profileImageBlob = await profileImageResponse.blob();
            formData.append('image', profileImageBlob, 'profile-image.jpg');
            console.log('Using profile image as passport photo');
          } else {
            throw new Error('Failed to fetch profile image');
          }
        } catch (fetchError) {
          console.warn('Failed to fetch profile image, using identity file for both:', fetchError);
          // If fetching profile image fails, use the identity file for both
          formData.append('image', identityFile);
        }
      } else {
        // If no profile image, use the identity file for both
        console.log('No profile image found, using identity file for both image and identity');
        formData.append('image', identityFile);
      }
      
      formData.append('identity', identityFile);
      
      console.log('Uploading identity documents...');
      await uploadIdentity(formData);
      setIdentityFile(null);
      console.log('Identity documents uploaded successfully');
    } catch (error) {
      console.error('Failed to upload identity:', error);
      alert('Failed to upload identity document. Please try again.');
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

  const handleProfileImageUpload = async () => {
    if (!profileImageFile) {
      alert('Please select a profile image');
      return;
    }

    try {
      console.log('Attempting to upload profile image using uploadIdentity endpoint...');
      
      // Use uploadIdentity endpoint with the same image for both image and identity fields
      const formData = new FormData();
      formData.append('image', profileImageFile);
      formData.append('identity', profileImageFile); // Use same image for both fields
      
      await uploadIdentity(formData);
      console.log('Profile image uploaded successfully using uploadIdentity endpoint');
      setProfileImageFile(null);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000); // Hide success message after 3 seconds
      
      // Refresh profile to get updated image
      await getProfile();
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      alert('Failed to upload profile image. Please try again.');
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
            <div className="flex items-center space-x-6">
              {/* Profile Image in Header */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                  {profile.image ? (
                    <img
                      src={process.env.NEXT_PUBLIC_BASE_URL +""+ profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Profile
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your account information and preferences
                  </p>
                </div>
                {/* Verification Badge */}
                <div className="flex items-center space-x-2">
                  {profile.verified ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Not Verified
                    </Badge>
                  )}
                </div>
              </div>
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
          {/* Verification Status Alert */}
          {!profile.verified && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Account Not Verified</p>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                    Your account needs to be verified before you can receive keys to the hostel. 
                    Please ensure all required documents are uploaded and contact support if you have questions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Verification Success Alert */}
          {profile.verified && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 dark:text-green-200">Account Verified</p>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    Congratulations! Your account has been verified. You are eligible to receive keys to the hostel.
                  </p>
                </div>
              </div>
            </div>
          )}

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
          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 dark:text-green-200">Profile Image Updated</p>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    Your profile image has been uploaded successfully!
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
                {/* Profile Image Section */}
                <div className="flex items-center space-x-6">
                  {/* Current Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                      {profile.image ? (
                        <img
                          src={process.env.NEXT_PUBLIC_BASE_URL +""+ profile.image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                   
                  </div>
                  
                  {/* Profile Image Upload */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label htmlFor="profile_image">Profile Picture</Label>
                      <Input
                        id="profile_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Validate file size (2MB limit)
                            if (file.size > 2 * 1024 * 1024) {
                              alert('File size must be less than 2MB');
                              e.target.value = '';
                              return;
                            }
                            // Validate file type
                            if (!file.type.startsWith('image/')) {
                              alert('Please select a valid image file');
                              e.target.value = '';
                              return;
                            }
                          }
                          setProfileImageFile(file || null);
                        }}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG up to 2MB</p>
                    </div>
                    
                    {/* Image Preview */}
                    {profileImageFile && (
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <img
                            src={URL.createObjectURL(profileImageFile)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="font-medium">{profileImageFile.name}</p>
                          <p>{(profileImageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleProfileImageUpload} 
                        disabled={!profileImageFile || loading}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        {loading ? 'Uploading...' : 'Upload Profile Image'}
                      </Button>
                      
                      {profileImageFile && (
                        <Button 
                          onClick={() => {
                            setProfileImageFile(null);
                            // Reset the file input
                            const fileInput = document.getElementById('profile_image') as HTMLInputElement;
                            if (fileInput) fileInput.value = '';
                          }}
                          variant="outline"
                          size="sm"
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

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

            {/* Verification Status */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verification Status
                </CardTitle>
                <CardDescription>
                  Your account verification details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Status</span>
                  {profile.verified ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</span>
                  {profile.image ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Identity Document</span>
                  {profile.identity ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Agreement</span>
                  {profile.uploaded_agreement ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Signed
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not Signed
                    </Badge>
                  )}
                </div>

                {!profile.verified && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      <strong>Note:</strong> You must complete all required document uploads and have your account verified 
                      before you can receive keys to the hostel. Contact support for assistance.
                    </p>
                  </div>
                )}
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
                  Upload Identity Document
                </CardTitle>
                <CardDescription>
                  Upload your school ID or course form (passport photo is taken from your profile picture)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="identity_document">School ID/Course Form</Label>
                  <Input
                    id="identity_document"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdentityFile(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG up to 2MB</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Your passport photo will be automatically taken from your profile picture. 
                    Make sure you have uploaded a clear profile picture first.
                  </p>
                </div>
                <Button 
                  onClick={handleIdentityUpload} 
                  disabled={!identityFile || loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Identity Document
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
