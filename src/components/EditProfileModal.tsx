import React, { useState } from "react";
import { Instagram, Twitter, Mail } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ProfileData {
  username: string;
  profileName: string;
  pronouns: string;
  bio: string;
  instagram: string;
  twitter: string;
  email: string;
  profilePicture?: string;
  bannerImage?: string;
  isPublic: boolean;
  allowFriendRequests: boolean;
  showActivityStatus: boolean;
}
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [privacySettings, setPrivacySettings] = useState({
    isPublic: profileData.isPublic,
    allowFriendRequests: profileData.allowFriendRequests,
    showActivityStatus: profileData.showActivityStatus,
  });

  // Update form data when profileData changes
  React.useEffect(() => {
    setFormData(profileData);
    setPrivacySettings({
      isPublic: profileData.isPublic,
      allowFriendRequests: profileData.allowFriendRequests,
      showActivityStatus: profileData.showActivityStatus,
    });
  }, [profileData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleImageUpload = (type: 'profile' | 'banner') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (type === 'profile') {
            setFormData(prev => ({ ...prev, profilePicture: result }));
          } else {
            setFormData(prev => ({ ...prev, bannerImage: result }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const handleSave = () => {
    const updatedData: ProfileData = {
      ...formData,
      ...privacySettings,
    };
    onSave(updatedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-['Inter',Helvetica] text-center mb-6">
            EDIT PROFILE
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 bg-[#d9d9d9]">
              {formData.profilePicture && (
                <img 
                  src={formData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </Avatar>
            <Button
              variant="outline"
              className="font-bold font-['Inter',Helvetica]"
              onClick={() => handleImageUpload('profile')}
            >
              Change Profile Picture
            </Button>
          </div>

          {/* Banner Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold font-['Inter',Helvetica]">
              BANNER
            </label>
            <div 
              className="w-full h-24 bg-[#9c3917] rounded-md relative"
              style={formData.bannerImage ? { 
                backgroundImage: `url(${formData.bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 text-xs"
                onClick={() => handleImageUpload('banner')}
              >
                Change Banner
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold font-['Inter',Helvetica]">
                PROFILE NAME
              </label>
              <Input
                name="profileName"
                value={formData.profileName}
                onChange={handleInputChange}
                className="font-['Inter',Helvetica]"
                placeholder="Enter profile name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold font-['Inter',Helvetica]">
                USERNAME
              </label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="font-['Inter',Helvetica]"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-bold font-['Inter',Helvetica]">
                PRONOUNS
              </label>
              <Input
                name="pronouns"
                value={formData.pronouns}
                onChange={handleInputChange}
                className="font-['Inter',Helvetica]"
                placeholder="Enter pronouns"
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold font-['Inter',Helvetica]">
              BIO
            </label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="font-['Inter',Helvetica] min-h-[100px]"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-['Inter',Helvetica]">
              SOCIAL MEDIA
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold font-['Inter',Helvetica] flex items-center">
                  <Instagram className="w-4 h-4 text-[#E4405F] mr-2" />
                  INSTAGRAM
                </label>
                <Input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="font-['Inter',Helvetica]"
                  placeholder="Instagram handle"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold font-['Inter',Helvetica] flex items-center">
                  <Twitter className="w-4 h-4 text-[#1DA1F2] mr-2" />
                  TWITTER
                </label>
                <Input
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="font-['Inter',Helvetica]"
                  placeholder="Twitter handle"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold font-['Inter',Helvetica] flex items-center">
                  <Mail className="w-4 h-4 text-[#EA4335] mr-2" />
                  EMAIL
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="font-['Inter',Helvetica]"
                  placeholder="Email address"
                  type="email"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-['Inter',Helvetica]">
              PRIVACY SETTINGS
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Inter',Helvetica]">Make profile public</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePrivacyToggle('isPublic')}
                  className={privacySettings.isPublic ? 'bg-[#8ec051] text-white' : ''}
                >
                  {privacySettings.isPublic ? 'ON' : 'OFF'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-['Inter',Helvetica]">Allow friend requests</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePrivacyToggle('allowFriendRequests')}
                  className={privacySettings.allowFriendRequests ? 'bg-[#8ec051] text-white' : ''}
                >
                  {privacySettings.allowFriendRequests ? 'ON' : 'OFF'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-['Inter',Helvetica]">Show activity status</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePrivacyToggle('showActivityStatus')}
                  className={privacySettings.showActivityStatus ? 'bg-[#8ec051] text-white' : ''}
                >
                  {privacySettings.showActivityStatus ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 font-bold font-['Inter',Helvetica]"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#8ec051] hover:bg-[#7ab045] text-white font-bold font-['Inter',Helvetica]"
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};