import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/pages/Profile";
import { User, Edit } from "lucide-react";

interface UserInfoSectionProps {
  profile: UserProfile | null;
  onUpdate: (profile: Partial<UserProfile>) => Promise<void>;
}

export const UserInfoSection = ({ profile, onUpdate }: UserInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || "",
    bio: profile?.bio || "",
    favorite_strain: profile?.favorite_strain || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-sage-500">
          Personal Information
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="text-sage-500"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-sage-500">
              Display Name
            </label>
            {isEditing ? (
              <Input
                value={formData.display_name}
                onChange={(e) =>
                  setFormData({ ...formData, display_name: e.target.value })
                }
                placeholder="Enter your display name"
              />
            ) : (
              <div className="flex items-center space-x-2 text-sage-500">
                <User className="h-5 w-5" />
                <span>{profile?.display_name || "No display name set"}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sage-500">Bio</label>
            {isEditing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself"
                rows={4}
              />
            ) : (
              <p className="text-sage-500">{profile?.bio || "No bio set"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sage-500">
              Favorite Strain
            </label>
            {isEditing ? (
              <Input
                value={formData.favorite_strain}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_strain: e.target.value })
                }
                placeholder="What's your favorite strain?"
              />
            ) : (
              <p className="text-sage-500">
                {profile?.favorite_strain || "No favorite strain set"}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-sage-500 hover:bg-sage-600">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};