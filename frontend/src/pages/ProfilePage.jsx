import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfilePicture } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file)); // preview only

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await updateProfilePicture(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-300 rounded-2xl shadow-lg p-6 space-y-8 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-base-content">Profile</h1>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Manage your personal information and account settings
            </p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePicture || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-300 shadow-md transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-1 -right-1 
                  bg-primary hover:bg-primary-focus 
                  p-2.5 rounded-full cursor-pointer 
                  shadow-lg transition-all duration-200 transform
                  ${
                    isUpdatingProfile
                      ? "animate-pulse scale-90 pointer-events-none"
                      : "group-hover:scale-110"
                  }
                  ring-4 ring-base-300
                `}>
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p
              className={`text-sm transition-opacity duration-200 ${
                isUpdatingProfile ? "text-primary font-medium" : "text-zinc-400"
              }`}>
              {isUpdatingProfile
                ? "Uploading your photo..."
                : "Click the camera to change your photo"}
            </p>
          </div>

          {/* User Info Fields */}
          <div className="space-y-6 px-2">
            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>Full Name</span>
              </div>
              <p className="px-5 py-3 bg-base-200 rounded-lg border border-zinc-700 shadow-sm text-base">
                {authUser?.fullname}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </div>
              <p className="px-5 py-3 bg-base-200 rounded-lg border border-zinc-700 shadow-sm text-base">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information Card */}
          <div className="bg-base-200 rounded-xl p-6 border border-zinc-700/50 shadow-inner">
            <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
              📅 Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2.5 border-b border-zinc-700 transition-colors hover:bg-zinc-800/30 px-1 rounded">
                <span className="text-zinc-300">Member Since</span>
                <span className="font-medium text-white">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 transition-colors hover:bg-zinc-800/30 px-1 rounded">
                <span className="text-zinc-300">Account Status</span>
                <span className="text-green-400 font-semibold tracking-wide">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
