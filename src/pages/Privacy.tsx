import React from 'react';
import { Lock } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Lock className="h-8 w-8 text-indigo-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
        </div>

        <div className="prose prose-indigo max-w-none">
          <p className="text-gray-600 mb-6">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Collecte des données</h2>
          <p className="text-gray-600 mb-6">
            Nous collectons les informations que vous nous fournissez lors de la création de votre compte
            et de l'utilisation de nos services, notamment :
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Adresse email</li>
            <li>Nom d'utilisateur</li>
            <li>Données de progression dans les défis</li>
            <li>Contributions et interactions avec la communauté</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Utilisation des données</h2>
          <p className="text-gray-600 mb-6">
            Nous utilisons vos données pour :
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Gérer votre compte et vous fournir nos services</li>
            <li>Personnaliser votre expérience d'apprentissage</li>
            <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
            <li>Communiquer avec vous concernant votre compte et nos services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Protection des données</h2>
          <p className="text-gray-600 mb-6">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
            contre tout accès, modification, divulgation ou destruction non autorisé.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Partage des données</h2>
          <p className="text-gray-600 mb-6">
            Nous ne vendons pas vos données personnelles. Nous pouvons partager certaines informations
            avec des prestataires de services tiers qui nous aident à exploiter notre plateforme.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Vos droits</h2>
          <p className="text-gray-600 mb-6">
            Vous avez le droit d'accéder à vos données, de les modifier ou de les supprimer.
            Vous pouvez également vous opposer au traitement de vos données ou demander leur portabilité.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
          <p className="text-gray-600">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            Vous pouvez contrôler l'utilisation des cookies dans les paramètres de votre navigateur.
          </p>
        </div>
      </div>
    </div>
  );
};