import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white hover:text-indigo-300 mb-8"
      >
        <ArrowLeft size={20} />
        <span>Retour à l'accueil</span>
      </Link>

      <div className="prose prose-invert max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white m-0">Politique de confidentialité</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2>1. Collecte des données</h2>
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul>
              <li>Email (pour l'authentification)</li>
              <li>Préférences de visionnage</li>
              <li>Historique des films/séries marqués comme vus</li>
              <li>Liste des favoris et "à voir plus tard"</li>
            </ul>
          </section>

          <section>
            <h2>2. Utilisation des données</h2>
            <p>
              Vos données sont utilisées pour :
            </p>
            <ul>
              <li>Personnaliser vos recommandations</li>
              <li>Améliorer notre service</li>
              <li>Vous contacter en cas de nécessité</li>
              <li>Sauvegarder vos préférences</li>
            </ul>
          </section>

          <section>
            <h2>3. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité pour protéger vos informations :
            </p>
            <ul>
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance régulière de nos systèmes</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies et traceurs</h2>
            <p>
              Nous utilisons des cookies pour :
            </p>
            <ul>
              <li>Maintenir votre session</li>
              <li>Mémoriser vos préférences</li>
              <li>Analyser l'utilisation du site</li>
            </ul>
          </section>

          <section>
            <h2>5. Partage des données</h2>
            <p>
              Nous ne vendons jamais vos données personnelles. Nous partageons uniquement les informations nécessaires avec :
            </p>
            <ul>
              <li>Nos fournisseurs de services (hébergement, analyse)</li>
              <li>Les autorités si légalement requis</li>
            </ul>
          </section>

          <section>
            <h2>6. Vos droits</h2>
            <p>
              Vous disposez des droits suivants :
            </p>
            <ul>
              <li>Accès à vos données</li>
              <li>Rectification des informations inexactes</li>
              <li>Suppression de votre compte</li>
              <li>Opposition au traitement</li>
              <li>Portabilité des données</li>
            </ul>
          </section>

          <section>
            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos données tant que votre compte est actif. Après suppression du compte, les données sont effacées sous 30 jours.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question, contactez notre DPO à{' '}
              <a href="mailto:privacy@watchpick.fr" className="text-indigo-400 hover:text-indigo-300">
                privacy@watchpick.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}