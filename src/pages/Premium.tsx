import React from 'react';
import { Check, Sparkles, Shield, Zap, Clock, FileCode2, MessageSquare } from 'lucide-react';

export const Premium: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
          Débloquez votre potentiel avec Premium
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Accédez à des ressources exclusives et accélérez votre progression en Flutter
        </p>
      </div>

      {/* PPP Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl p-8 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-8 w-8 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">HEY! IT LOOKS LIKE YOU'RE BASED IN MALI</h2>
              <p className="text-indigo-200">
                We support Purchasing Power Parity to make our premium features accessible worldwide
              </p>
            </div>
          </div>
          <div className="glass-card px-6 py-3 rounded-full">
            <span className="font-bold">50% discount</span> applied automatically
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {/* Monthly Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Monthly</h3>
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold">6 $US</span>
              <span className="text-gray-500 ml-2">/mo</span>
            </div>
            <div className="mt-2">
              <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-1 rounded-full">
                50% OFF
              </span>
            </div>
            <p className="text-gray-500 mt-2">Billed monthly</p>
          </div>

          <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mb-8 flex items-center justify-center">
            <Zap className="h-5 w-5 mr-2" />
            SELECT MONTHLY
          </button>

          <Features />
        </div>

        {/* Yearly Plan */}
        <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white rounded-2xl shadow-xl p-8 relative transform hover:-translate-y-1 transition-all">
          <div className="absolute -top-4 right-8 bg-gradient-to-r from-teal-400 to-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
            BEST VALUE
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Yearly</h3>
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold">4 $US</span>
              <span className="text-indigo-200 ml-2">/mo</span>
            </div>
            <div className="mt-2">
              <span className="inline-block bg-white text-indigo-600 text-sm font-semibold px-4 py-1 rounded-full">
                50% OFF
              </span>
            </div>
            <p className="text-indigo-200 mt-2">
              48 $US billed yearly (save 33% vs monthly)
            </p>
          </div>

          <button className="w-full bg-white text-indigo-600 py-4 px-6 rounded-xl font-semibold hover:bg-indigo-50 transition-colors mb-8 flex items-center justify-center">
            <Sparkles className="h-5 w-5 mr-2" />
            SELECT YEARLY
          </button>

          <Features light />
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-24 grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Accès anticipé</h3>
          <p className="text-gray-600">
            Soyez le premier à découvrir les nouveaux défis et fonctionnalités
          </p>
        </div>
        <div className="text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileCode2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Solutions détaillées</h3>
          <p className="text-gray-600">
            Accédez à des solutions complètes avec explications pas à pas
          </p>
        </div>
        <div className="text-center">
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Support prioritaire</h3>
          <p className="text-gray-600">
            Obtenez des réponses rapides à vos questions techniques
          </p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC<{ light?: boolean }> = ({ light }) => {
  const features = [
    {
      name: 'Premium challenges',
      value: '2 per month',
      unlimited: true,
      icon: Sparkles,
    },
    {
      name: 'Design files',
      value: '5 per month',
      unlimited: true,
      icon: FileCode2,
    },
    {
      name: 'Private solutions',
      included: true,
      icon: Shield,
    },
    {
      name: 'Unlimited solution screenshots',
      included: true,
      icon: Check,
    },
    {
      name: 'Priority support',
      included: true,
      icon: MessageSquare,
    },
    {
      name: 'Early access to new features',
      included: true,
      icon: Clock,
    },
  ];

  const textColor = light ? 'text-indigo-100' : 'text-gray-600';
  const iconColor = light ? 'text-white' : 'text-indigo-600';

  return (
    <ul className="space-y-4">
      {features.map((feature) => (
        <li key={feature.name} className="flex items-center">
          <feature.icon className={`h-5 w-5 ${iconColor} mr-3 flex-shrink-0`} />
          <div>
            <span className={light ? 'text-white' : 'text-gray-900'}>
              {feature.name}
            </span>
            {feature.value && (
              <span className={`block ${textColor}`}>
                {feature.unlimited ? 'Unlimited' : feature.value}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};