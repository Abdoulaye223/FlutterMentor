import React from 'react';
import { Users, MessageSquare, Heart, Disc as Discord } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Community: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notre Communauté</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Rejoignez une communauté passionnée de développeurs Flutter, partagez vos connaissances et grandissez ensemble.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">500+</h3>
          <p className="text-gray-600">Développeurs actifs</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1000+</h3>
          <p className="text-gray-600">Discussions enrichissantes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2000+</h3>
          <p className="text-gray-600">Solutions partagées</p>
        </div>
      </div>

      {user ? (
        <div className="bg-indigo-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <div className="h-20 w-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Discord className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Rejoignez notre serveur Discord</h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
              Connectez-vous avec d'autres développeurs, partagez vos expériences et obtenez de l'aide en temps réel.
            </p>
            <a
              href="https://discord.gg/hymktkB9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              <Discord className="h-5 w-5 mr-2" />
              Rejoindre le Discord
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comment participer ?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Rejoignez la discussion</h3>
                <p className="text-gray-600 mb-6">
                  Participez aux discussions sur les défis, partagez vos solutions et apprenez des autres développeurs.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Partagez votre expérience</h3>
                <p className="text-gray-600">
                  Racontez votre parcours, les obstacles que vous avez surmontés et les leçons que vous avez apprises.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Aidez les autres</h3>
                <p className="text-gray-600 mb-6">
                  Utilisez votre expertise pour aider les autres développeurs à progresser et à surmonter leurs difficultés.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Évoluez ensemble</h3>
                <p className="text-gray-600">
                  Grandissez en tant que développeur en apprenant des expériences et des perspectives des autres.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};