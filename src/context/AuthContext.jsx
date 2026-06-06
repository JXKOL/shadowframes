import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const AuthContext = createContext({});

// Initialize Supabase (User should replace these with real env vars)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mock Supabase for demo if keys are missing
const isDemo = !supabaseUrl || !supabaseKey;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isDemo) {
      const savedUser = localStorage.getItem('shadow_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        // Mock profile data
        setProfile({
          username: userData.email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
          favorites: JSON.parse(localStorage.getItem(`favs_${userData.id}`) || '[]'),
          downloads: Math.floor(Math.random() * 50)
        });
      }
      setLoading(false);
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signUp = async (email, password) => {
    if (isDemo) {
      const newUser = { id: Math.random().toString(36).substr(2, 9), email };
      localStorage.setItem('shadow_user', JSON.stringify(newUser));
      setUser(newUser);
      setProfile({
        username: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        favorites: [],
        downloads: 0
      });
      return { data: { user: newUser }, error: null };
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    return await supabase.auth.signUp({ email, password });
  };

  const signIn = async (email, password) => {
    if (isDemo) {
      const newUser = { id: 'demo-user-123', email };
      localStorage.setItem('shadow_user', JSON.stringify(newUser));
      setUser(newUser);
      setProfile({
        username: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        favorites: JSON.parse(localStorage.getItem(`favs_${newUser.id}`) || '[]'),
        downloads: 12
      });
      return { data: { user: newUser }, error: null };
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    if (isDemo) {
      localStorage.removeItem('shadow_user');
      setUser(null);
      setProfile(null);
      return { error: null };
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    return await supabase.auth.signOut();
  };

  const toggleFavorite = (wallpaperId) => {
    if (!user) return;
    
    let currentFavs = [...(profile?.favorites || [])];
    if (currentFavs.includes(wallpaperId)) {
      currentFavs = currentFavs.filter(id => id !== wallpaperId);
    } else {
      currentFavs.push(wallpaperId);
    }
    
    setProfile(prev => ({ ...prev, favorites: currentFavs }));
    if (isDemo) {
      localStorage.setItem(`favs_${user.id}`, JSON.stringify(currentFavs));
    }
    // In real Supabase, you'd perform a DB upsert here
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, toggleFavorite, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
