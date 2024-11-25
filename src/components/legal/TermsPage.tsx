import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
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
          <Scale className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white m-0">Conditions d'utilisation</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2>1. Acceptation des conditions</h2>
            <p>
              En accédant à WatchPick, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section>
            <h2>2. Description du service</h2>
            <p>
              WatchPick est un service de recommandation de films et séries utilisant l'intelligence artificielle. Nous ne diffusons aucun contenu vidéo et redirigeons uniquement vers des services de streaming légaux.
            </p>
          </section>

          <section>
            <h2>3. Compte utilisateur</h2>
            <ul>
              <li>Vous êtes responsable de maintenir la confidentialité de votre compte</li>
              <li>Les informations fournies doivent être exactes et à jour</li>
              <li>Nous nous réservons le droit de suspendre ou supprimer des comptes en cas d'abus</li>
            </ul>
          </section>

          <section>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              Le contenu de WatchPick (textes, images, logos) est protégé par le droit d'auteur. Les informations sur les films et séries proviennent de TMDB et sont soumises à leurs conditions d'utilisation.
            </p>
          </section>

          <section>
            <h2>5. Utilisation acceptable</h2>
            <p>
              Vous acceptez de ne pas :
            </p>
            <ul>
              <li>Utiliser le service de manière frauduleuse</li>
              <li>Tenter de perturber ou surcharger nos systèmes</li>
              <li>Collecter des informations sur les autres utilisateurs</li>
              <li>Utiliser des robots ou scripts automatisés</li>
            </ul>
          </section>

          <section>
            <h2>6. Limitation de responsabilité</h2>
            <p>
              WatchPick fournit ses services "en l'état". Nous ne garantissons pas l'exactitude des recommandations ou la disponibilité continue du service.
            </p>
          </section>

          <section>
            <h2>7. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, contactez-nous à{' '}
              <a href="mailto:contact@watchpick.fr" className="text-indigo-400 hover:text-indigo-300">
                contact@watchpick.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}