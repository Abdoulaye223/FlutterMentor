import React from 'react';
import { Scale } from 'lucide-react';

export const Legal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Scale className="h-8 w-8 text-indigo-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Mentions légales</h1>
        </div>

        <div className="prose prose-indigo max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informations légales</h2>
          <p className="text-gray-600 mb-6">
            FlutterMentor est une plateforme éducative exploitée par :
          </p>
          <ul className="list-none text-gray-600 mb-6">
            <li>Raison sociale : FlutterMentor</li>
            <li>Forme juridique : SAS</li>
            <li>Capital social : 10 000€</li>
            <li>Siège social : 123 Avenue de la République, 75011 Paris</li>
            <li>SIRET : 123 456 789 00012</li>
            <li>TVA Intracommunautaire : FR 12 345678900</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
          <p className="text-gray-600 mb-6">
            Le site FlutterMentor est hébergé par :
          </p>
          <ul className="list-none text-gray-600 mb-6">
            <li>Supabase</li>
            <li>Adresse : 123 Market Street, San Francisco, CA 94105</li>
            <li>Site web : https://supabase.com</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
          <p className="text-gray-600 mb-6">
            L'ensemble du contenu du site FlutterMentor (logos, textes, éléments graphiques,
            vidéos, etc.) est protégé par le droit d'auteur et le droit des marques.
            Toute reproduction ou représentation totale ou partielle de ce site est strictement interdite
            sans autorisation expresse de FlutterMentor.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Protection des données</h2>
          <p className="text-gray-600 mb-6">
            Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au
            Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
            d'accès, de rectification et de suppression des données vous concernant.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
          <p className="text-gray-600 mb-6">
            Le site utilise des cookies pour améliorer l'expérience utilisateur. En navigant sur
            le site, vous acceptez l'utilisation de cookies conformément à notre politique de
            confidentialité.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact</h2>
          <p className="text-gray-600">
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :
            contact@fluttermentor.com
          </p>
        </div>
      </div>
    </div>
  );
};