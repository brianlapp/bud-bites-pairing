import React from 'react';
import { motion } from "framer-motion";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from './LoadingSpinner';
import { UserProfile, UserStats } from '@/types/profile';

interface ProfileLayoutProps {
  loading: boolean;
  profile: UserProfile | null;
  stats: UserStats | null;
  onProfileUpdate: (updatedProfile: Partial<UserProfile>) => Promise<void>;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  loading,
  profile,
  stats,
  onProfileUpdate,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-sage-50">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-sage-500 mb-8">Gaming Profile</h1>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Game Stats Section - Takes up 2/3 of the space */}
            <div className="lg:col-span-2">
              <GameStatsSection stats={stats} />
            </div>
            
            {/* Personal Info Section - Takes up 1/3 of the space */}
            <div className="lg:col-span-1">
              <UserInfoSection
                profile={profile}
                onUpdate={onProfileUpdate}
              />
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};