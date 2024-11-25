import React from 'react';
import { motion } from 'framer-motion';
import { Film, Brain, Heart, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">WatchPick</h3>
            </div>
            <p className="text-sm text-gray-400">
              Propulsé par l'IA, WatchPick révolutionne la façon de découvrir des films et séries.
              Fini le scroll infini, trouvez le contenu parfait en quelques secondes.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              Fonctionnalités
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Recherche intelligente par IA</li>
              <li>• Recommandations personnalisées</li>
              <li>• Organisation des favoris</li>
              <li>• Liste "À voir plus tard"</li>
              <li>• Historique de visionnage</li>
            </ul>
          </div>

          {/* Platforms Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-indigo-400" />
              Plateformes
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Netflix</li>
              <li>• Amazon Prime Video</li>
              <li>• Disney+</li>
              <li>• Apple TV+</li>
              <li>• ADN & Crunchyroll</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Une question ? Une suggestion ?</p>
              <a 
                href="mailto:contact@watchpick.fr"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                contact@watchpick.fr
              </a>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/psyk0t/sb1-nd7pwf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} WatchPick. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}