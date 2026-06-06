import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Heart, Download, User, Mail, Settings, Grid } from 'lucide-react';

const Profile = () => {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <SEO 
        title={`${profile?.username || 'User'}'s Profile | ShadowFrames`} 
        description="Manage your AI-generated frames and favorites."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="h-48 w-full rounded-3xl bg-gradient-to-r from-brand-purple/20 via-brand-pink/20 to-brand-blue/20 blur-xl absolute -top-4 opacity-50" />
          <div className="relative bg-brand-white/5 border border-brand-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
                <img 
                  src={profile?.avatar} 
                  alt="Avatar" 
                  className="relative w-32 h-32 rounded-full border-4 border-brand-black bg-brand-black"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-display font-bold text-white mb-2">
                  {profile?.username}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-brand-gray">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="text-brand-purple font-mono">Member Since 2024</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => signOut()}
                  className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-medium"
                >
                  Logout
                </button>
                <button className="p-2 rounded-xl bg-brand-white/5 border border-brand-white/10 text-white hover:bg-brand-white/10 transition-all">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-brand-white/10">
              <div className="text-center md:text-left">
                <p className="text-brand-gray text-sm mb-1 uppercase tracking-wider font-semibold">Favorites</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Heart className="text-brand-pink fill-brand-pink" size={18} />
                  <span className="text-2xl font-display font-bold text-white">{profile?.favorites?.length || 0}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-brand-gray text-sm mb-1 uppercase tracking-wider font-semibold">Downloads</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Download className="text-brand-blue" size={18} />
                  <span className="text-2xl font-display font-bold text-white">{profile?.downloads || 0}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-brand-gray text-sm mb-1 uppercase tracking-wider font-semibold">Creations</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Grid className="text-brand-purple" size={18} />
                  <span className="text-2xl font-display font-bold text-white">0</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-brand-gray text-sm mb-1 uppercase tracking-wider font-semibold">Plan</p>
                <div className="px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple inline-block text-sm font-bold uppercase tracking-tighter">
                  Free
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Content */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-display font-bold text-white">Your Saved Archives</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-brand-white/20 to-transparent" />
          </div>

          {profile?.favorites?.length === 0 ? (
            <div className="text-center py-20 bg-brand-white/5 rounded-3xl border border-brand-white/10 border-dashed">
              <Heart className="mx-auto text-brand-gray/30 mb-4" size={48} />
              <p className="text-brand-gray text-lg">You haven't liked any frames yet.</p>
              <button className="mt-4 text-brand-purple hover:underline">Browse the Gallery</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would map over real favorited data */}
              <p className="text-brand-gray col-span-full">You have {profile.favorites.length} items saved. These will appear here as you browse the gallery.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
