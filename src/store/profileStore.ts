import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  user_id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: { bio?: string; full_name?: string }) => Promise<void>;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      set({ profile: data, isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      set({ 
        error: 'Erreur lors de la récupération du profil', 
        isLoading: false 
      });
    }
  },

  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      set({ profile: data, isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      set({ 
        error: 'Erreur lors de la mise à jour du profil', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));