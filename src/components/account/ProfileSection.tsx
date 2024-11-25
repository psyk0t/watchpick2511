import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, X } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import type { UserProfile } from '../../types/user';

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => Promise<void>;
}

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      let photoURL = profile.photoURL;

      if (selectedImage && cropperRef.current) {
        const cropper = (cropperRef.current as any).cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedImage = croppedCanvas.toDataURL();
        
        // Here you would typically upload the image to storage
        // and get back a URL. For now, we'll use the data URL
        photoURL = croppedImage;
      }

      await onUpdate({
        displayName,
        photoURL,
        updatedAt: new Date().toISOString()
      });

      setIsEditing(false);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Mon Profil</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Modifier
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {selectedImage ? (
              <Cropper
                ref={cropperRef}
                src={selectedImage}
                style={{ height: 200, width: 200 }}
                aspectRatio={1}
                guides={false}
                viewMode={1}
                dragMode="move"
                scalable={true}
                zoomable={true}
                autoCropArea={1}
                background={false}
                responsive={true}
                checkOrientation={false}
              />
            ) : (
              <img
                src={profile.photoURL || 'https://via.placeholder.com/200'}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
            
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                <Camera size={20} />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Pseudo
          </label>
          {isEditing ? (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Entrez votre pseudo"
            />
          ) : (
            <p className="text-white">{profile.displayName || 'Non défini'}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <p className="text-white">{profile.email}</p>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={20} />
              <span>Enregistrer</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedImage(null);
                setDisplayName(profile.displayName || '');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}