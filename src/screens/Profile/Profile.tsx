import { PlusIcon, Instagram, Twitter, Mail, Phone, Edit } from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { EditProfileModal } from "../../components/EditProfileModal";
import { NewPostModal } from "../../components/NewPostModal";

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
export const Profile = (): JSX.Element => {
interface Post {
  id: string;
  image: string;
  description: string;
  timestamp: Date;
}
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Local profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "leticiabumpy",
    profileName: "PROFILE",
    pronouns: "",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    instagram: "insta",
    twitter: "twitter", 
    email: "email",
    isPublic: true,
    allowFriendRequests: true,
    showActivityStatus: false,
  });

  const handleProfileUpdate = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
  };

  const handleNewPost = (postData: { image: string; description: string }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      image: postData.image,
      description: postData.description,
      timestamp: new Date(),
    };
    setPosts(prev => [newPost, ...prev]);
    setIsNewPostModalOpen(false);
  };
  // Navigation items
  const navItems = [
    { label: "REVIEWS", href: "#" },
    { label: "COMMUNITIES", href: "#" },
    { label: "DINOWIKI", href: "#" },
    { label: "contact us", href: "#" },
  ];

  // Stats data
  const statsData = [
    { number: "278", label: "logged\ndinosaurs" },
    { number: "21", label: "created\nspecies" },
    { number: "86", label: "traded\nstickers" },
  ];

  // Social media links - now using profile data
  const socialLinks = [
    { name: profileData.instagram, icon: <Instagram className="w-6 h-6 text-[#E4405F]" /> },
    { name: profileData.twitter, icon: <Twitter className="w-6 h-6 text-[#1DA1F2]" /> },
    { name: profileData.email, icon: <Mail className="w-6 h-6 text-[#EA4335]" /> },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-7xl mx-auto relative">
        {/* Header and Navigation */}
        <header className="relative w-full">
          <div className="flex items-center justify-between p-4 lg:px-6">
            <div className="flex items-center">
              <img 
                src="/stegosaurus.png" 
                alt="Dinosaur" 
                className="w-[45px] h-[45px] mr-4"
              />
              <h1 className="font-normal text-xl sm:text-2xl lg:text-[32px] font-['Inter',Helvetica]">
                <span className="text-[#9c3917]">DINO LOGGER</span>
              </h1>
            </div>

            {/* Desktop Nn */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex gap-8">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <a
                      href={item.href}
                      className="font-normal text-lg xl:text-xl font-['Inter',Helvetica] hover:text-[#9c3917] transition-colors"
                    >
                      {item.label}
                    </a>
                  </NavigationMenuItem>
                ))}
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#4CAF50] hover:text-[#45a049] transition-colors cursor-pointer" />
                  <Instagram className="w-6 h-6 text-[#E4405F] hover:text-[#d73652] transition-colors cursor-pointer" />
                  <Mail className="w-6 h-6 text-[#EA4335] hover:text-[#d93025] transition-colors cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#9c3917]" />
                  <Button
                    variant="link"
                    className="font-bold text-lg xl:text-xl font-['Inter',Helvetica] p-0 hover:text-[#9c3917]"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    EDIT Profile
                  </Button>
                </div>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block font-normal text-lg font-['Inter',Helvetica] hover:text-[#9c3917] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="flex items-center gap-3 py-2">
                <Phone className="w-6 h-6 text-[#4CAF50]" />
                <Instagram className="w-6 h-6 text-[#E4405F]" />
                <Mail className="w-6 h-6 text-[#EA4335]" />
              </div>
              
              <div className="flex items-center gap-2 py-2">
                <Edit className="w-5 h-5 text-[#9c3917]" />
                <Button
                  variant="link"
                  className="font-bold text-lg font-['Inter',Helvetica] p-0 hover:text-[#9c3917]"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  EDIT Profile
                </Button>
              </div>
            </div>
          )}

          {/* Profile Banner */}
          <div 
            className="w-full h-32 sm:h-40 lg:h-[196px] bg-[#9c3917]"
            style={profileData.bannerImage ? { 
              backgroundImage: `url(${profileData.bannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          />

          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end px-4 lg:px-0">
            <div className="relative -mt-16 sm:-mt-20 lg:-mt-[85px] sm:ml-12 lg:ml-[55px]">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[156px] lg:h-[156px] bg-[#8ec051] border-4 border-white">
                {profileData.profilePicture && (
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </Avatar>
            </div>
            <div className="mt-4 sm:mt-2 sm:ml-6 lg:ml-[25px]">
              <h2 className="font-normal text-2xl sm:text-3xl lg:text-[32px] font-['Inter',Helvetica]">
                {profileData.profileName}
              </h2>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="px-4 lg:px-0 mt-6 lg:mt-4">
            <Card className="w-full max-w-4xl mx-auto lg:w-[837px] lg:ml-[236px] h-auto lg:h-[121px] bg-[#8ec051] border-none rounded-lg lg:rounded-none">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 lg:p-0 lg:h-full gap-4 sm:gap-0">
                {statsData.map((stat, index) => (
                  <div key={index} className="flex items-center text-center sm:text-left">
                    <span className="font-bold text-3xl sm:text-4xl lg:text-[64px] font-['Inter',Helvetica]">
                      {stat.number}
                    </span>
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl font-['Inter',Helvetica] ml-2 lg:ml-4 whitespace-pre-line">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </header>

        {/* Profile Content */}
        <div className="flex flex-col lg:flex-row mt-8 px-4 lg:px-0 gap-6 lg:gap-0 relative">
          {/* News Section - Positioned at same height as green stats bar */}
          <div className="hidden lg:block absolute w-[184px] -top-[145px] right-0 font-normal text-base font-['Inter',Helvetica]">
            NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
          </div>

          {/* Left Sidebar - User Info */}
          <div className="w-full lg:w-[220px] lg:ml-[19px] order-2 lg:order-1">
            <div className="mb-6 space-y-2">
              <p className="font-bold text-base font-['Inter',Helvetica]">
                @{profileData.username}
              </p>
              <p className="font-bold text-base font-['Inter',Helvetica]">
                23 friends
              </p>
              {profileData.pronouns && (
                <p className="font-bold text-base font-['Inter',Helvetica]">
                  {profileData.pronouns}
                </p>
              )}
            </div>

            <div className="mb-6">
              <p className="font-normal text-base font-['Inter',Helvetica] leading-relaxed">
                {profileData.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-row lg:flex-col gap-4 lg:space-y-4 lg:gap-0">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center hover:opacity-75 transition-opacity cursor-pointer">
                  {link.icon}
                  <span className="ml-2 font-bold text-base font-['Inter',Helvetica]">
                    {link.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Gallery */}
          <div className="flex-1 order-1 lg:order-2 lg:max-w-[837px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {posts.length > 0 ? (
                <Card className="aspect-square rounded-none border-none hover:opacity-90 transition-opacity cursor-pointer overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <img 
                      src={posts[0].image} 
                      alt={posts[0].description}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card className="aspect-square bg-[#9c3917] rounded-none border-none hover:opacity-90 transition-opacity cursor-pointer">
                  <CardContent className="p-0 h-full flex items-center justify-center">
                    <div className="text-white text-sm">Image 1</div>
                  </CardContent>
                </Card>
              )}
              <Card className="aspect-square bg-[#8ec051] rounded-none border-none hover:opacity-90 transition-opacity cursor-pointer">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-white text-sm">Image 2</div>
                </CardContent>
              </Card>
              <Card className="aspect-square bg-[#9c3917] rounded-none border-none hover:opacity-90 transition-opacity cursor-pointer sm:col-span-2 lg:col-span-1">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-white text-sm">Image 3</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-20 lg:pb-8 px-4 lg:px-0 flex justify-center lg:justify-end">
          <p className="font-bold text-sm lg:text-base font-['Inter',Helvetica] text-gray-600">
            version @leticiadedeus
          </p>
        </footer>


        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profileData={profileData}
          onSave={handleProfileUpdate}
        />

        {/* New Post Modal */}
        <NewPostModal
          isOpen={isNewPostModalOpen}
          onClose={() => setIsNewPostModalOpen(false)}
          onPost={handleNewPost}
        />
      </div>

      {/* Fixed Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsNewPostModalOpen(true)}
          className="w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#8ec051] hover:bg-[#7ab045] shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-3xl"
        >
          <PlusIcon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
        </Button>
      </div>
    </div>
  );
};