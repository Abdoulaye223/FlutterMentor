import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X, User } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États locaux pour la gestion de l'interface
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Récupération de l'utilisateur depuis le store d'authentification
  const { user, setUser } = useAuthStore();

  // Effet pour écouter les changements d'état d'authentification
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Utilisateur connecté - mettre à jour le store
        setUser({
          id: session.user.id,
          email: session.user.email!,
          user_metadata: session.user.user_metadata
        });
        setIsAuthModalOpen(false); // Fermer la modal d'authentification
      } else {
        // Utilisateur déconnecté - nettoyer le store
        setUser(null);
      }
    });

    // Nettoyer l'abonnement au démontage du composant
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fonction pour gérer la déconnexion
  const handleSignOut = async () => {
    await useAuthStore.getState().signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Barre de navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo et nom de l'application */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Code2 className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">FlutterMentor</span>
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex space-x-8">
              <Link to="/posts" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Posts
              </Link>
              <Link to="/community" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Communauté
              </Link>
            </div>

            {/* Section d'authentification */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Avatar de l'utilisateur */}
                  <Link to="/profile" className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                    )}
                    {/* Nom d'utilisateur */}
                    <span className="text-gray-700 font-medium">
                      {user.user_metadata?.user_name || user.user_metadata?.full_name || user.email}
                    </span>
                  </Link>
                  {/* Bouton de déconnexion */}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Connexion
                </button>
              )}
            </div>

            {/* Bouton menu mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/posts"
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Posts
              </Link>
              <Link
                to="/community"
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Communauté
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Connexion
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Contenu principal */}
      {children}

      {/* Pied de page */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Informations sur l'application */}
            <div>
              <div className="flex items-center">
                <Code2 className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">FlutterMentor</span>
              </div>
              <p className="mt-2 text-gray-400">
                Apprenez Flutter par la pratique et partagez vos codes avec la communauté
              </p>
            </div>
            
            {/* Liens de navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Plateforme</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/posts" className="text-gray-400 hover:text-white transition-colors">
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-400 hover:text-white transition-colors">
                    Communauté
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Liens légaux */}
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              © 2025 FlutterMentor. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal d'authentification - ne s'affiche que si l'utilisateur n'est pas connecté */}
      {!user && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </div>
  );
}