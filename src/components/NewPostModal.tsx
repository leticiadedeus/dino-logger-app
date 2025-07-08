import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (data: { image: string; description: string }) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onPost,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImage(result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handlePost = () => {
    if (selectedImage && description.trim()) {
      onPost({
        image: selectedImage,
        description: description.trim(),
      });
      // Reset form
      setSelectedImage("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedImage("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-['Inter',Helvetica] text-center mb-6">
            NEW POST
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-bold font-['Inter',Helvetica]">
              CHOOSE PHOTO FROM DEVICE
            </label>
            
            {selectedImage ? (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleImageUpload}
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Change
                </Button>
              </div>
            ) : (
              <div 
                className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#8ec051] transition-colors"
                onClick={handleImageUpload}
              >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-['Inter',Helvetica] text-center">
                  Click to select a photo
                </p>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold font-['Inter',Helvetica]">
              DESCRIPTION
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-['Inter',Helvetica] min-h-[120px]"
              placeholder="Write a description for your post..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 font-bold font-['Inter',Helvetica]"
            >
              CANCEL
            </Button>
            <Button
              onClick={handlePost}
              disabled={!selectedImage || !description.trim()}
              className="flex-1 bg-[#8ec051] hover:bg-[#7ab045] text-white font-bold font-['Inter',Helvetica] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              POST
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};