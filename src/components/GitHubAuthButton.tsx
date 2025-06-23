import React, { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GitHubAuthButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const GitHubAuthButton: React.FC<GitHubAuthButtonProps> = ({ 
  onSuccess, 
  onError 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'read:user user:email'
        }
      });

      if (error) {
        throw error;
      }

      onSuccess?.();
    } catch (error) {
      console.error('Erreur lors de la connexion GitHub:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion GitHub';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGitHubLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <Github className="h-5 w-5 mr-2" />
      )}
      {isLoading ? 'Connexion en cours...' : 'Se connecter avec GitHub'}
    </button>
  );
};