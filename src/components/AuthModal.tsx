import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { X, AlertCircle } from 'lucide-react';
import { GitHubAuthButton } from './GitHubAuthButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuthSuccess = () => {
    setAuthError(null);
    onClose();
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Rejoignez FlutterMentor
          </h2>
          <p className="text-gray-600">
            Connectez-vous pour partager vos projets et rejoindre la communauté
          </p>
        </div>

        {/* Error Display */}
        {authError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <span className="text-red-700 text-sm">{authError}</span>
            <button
              onClick={() => setAuthError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* GitHub OAuth Button */}
        <div className="mb-6">
          <GitHubAuthButton 
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
          />
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        {/* Email/Password Auth */}
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4F46E5',
                  brandAccent: '#4338CA'
                }
              }
            },
            style: {
              button: {
                borderRadius: '6px'
              },
              container: {
                gap: '16px'
              }
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
          localization={{
            variables: {
              sign_up: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                email_input_placeholder: 'Votre adresse email',
                password_input_placeholder: 'Votre mot de passe',
                button_label: "S'inscrire",
                loading_button_label: 'Inscription en cours...',
                link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                confirmation_text: "Un email de vérification vous a été envoyé. Veuillez vérifier votre boîte mail pour confirmer votre compte."
              },
              sign_in: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                email_input_placeholder: 'Votre adresse email',
                password_input_placeholder: 'Votre mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
                link_text: "Vous avez déjà un compte ? Connectez-vous",
                confirmation_text: "Vérifiez votre boîte mail pour le lien de confirmation"
              }
            }
          }}
          theme="light"
        />
      </div>
    </div>
  );
};