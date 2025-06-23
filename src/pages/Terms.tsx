import React from 'react';
import { Shield } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-indigo-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Conditions d'utilisation</h1>
        </div>

        <div className="prose prose-indigo max-w-none">
          <p className="text-gray-600 mb-6">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
          <p className="text-gray-600 mb-6">
            En accédant et en utilisant FlutterMentor, vous acceptez d'être lié par ces conditions d'utilisation.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
          <p className="text-gray-600 mb-6">
            FlutterMentor est une plateforme éducative proposant des défis de programmation Flutter
            et facilitant l'apprentissage collaboratif au sein d'une communauté de développeurs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compte utilisateur</h2>
          <p className="text-gray-600 mb-6">
            Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable
            de maintenir la confidentialité de vos informations de connexion et de toutes les activités
            qui se produisent sous votre compte.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
          <p className="text-gray-600 mb-6">
            Le contenu fourni sur FlutterMentor, y compris mais sans s'y limiter, les défis, les solutions
            et les ressources pédagogiques, est protégé par les lois sur la propriété intellectuelle.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Code de conduite</h2>
          <p className="text-gray-600 mb-6">
            Les utilisateurs doivent interagir de manière respectueuse avec les autres membres de la communauté.
            Tout comportement abusif ou inapproprié pourra entraîner la suspension du compte.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modifications des conditions</h2>
          <p className="text-gray-600">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
            prendront effet dès leur publication sur le site.
          </p>
        </div>
      </div>
    </div>
  );
};