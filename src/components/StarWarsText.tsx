import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TEXTS = [
  `🎬 Mission "Série à Binger" - Le Capitaine "Pyjama" signale : 10 saisons devant moi, deadline dans 6 heures. Mes yeux piquent, le générique défile pour la 47ème fois, mais Netflix ose encore me demander si je regarde.`,
  
  `🤫 Tragédie "Spoiler au Bureau" - Alerte rouge : collègue indélicat a révélé la fin de la série que je suivais depuis 2 mois. Tentative de bloquer mes oreilles échouée. Données critiques enregistrées dans mon cerveau.`,
  
  `⚔️ Opération "Saga Star Wars" - Rapport de situation : perdu dans l'ordre de visionnage. Chronologique ? Sortie ? Machete ? La Force n'est pas avec moi. Les spectateurs expérimentés me jugent pour avoir commencé par l'épisode 1.`,
  
  `🎭 Catastrophe "Adaptation de Manga" - Avis à la population : nouveau film live action détecté. Les fans sont en panique, les attentes au plus bas. Les réseaux sociaux s'enflamment déjà.`,
  
  `🦸‍♂️ Incident "Marathon MCU" - Jour 3 de visionnage intensif : plus capable de différencier les films Marvel. Les scènes post-générique se mélangent dans ma tête. Thor ou Captain America ? Phase 2 ou 4 ?`,
  
  `🎯 Mission "Soirée Film" - Après 3 heures de dérive dans la galaxie Netflix, notre vaisseau "Télécommande" n'a toujours pas trouvé de film compatible avec nos critères ultra-spécifiques.`,

  `🚨 Code Rouge "Recommandation Ratée" - Fiasco total après avoir vanté "LE film de l'année" à mes amis. Deux se sont endormis, trois consultaient leurs phones. Ma crédibilité de cinéphile est au niveau -42.`,

  `🎬 Alerte "Bande-Annonce Piège" - Les 3 meilleures scènes étaient dans la bande-annonce. Je répète : ON S'EST FAIT AVOIR. 2h30 de film pour 3 minutes déjà vues.`,

  `📺 Mission "Soirée Nostalgie" - Le reboot de ma série préférée d'enfance est une catastrophe. Ils ont massacré mon garçon. Peluche réconfort activée, position fœtale enclenchée.`,

  `👗 Urgence "Cosplay Convention" - Costume pas prêt, perruque mal coiffée, accessoire principal cassé. H-2 avant l'ouverture. Je répète : C'EST LA PANIQUE. Les tutoriels YouTube m'ont menti.`,

  `💰 Drame "Budget Streaming" - Netflix, Disney+, Prime, Apple TV... Mon compte en banque lance un signal de détresse. Partage de comptes compromis. La vie était plus simple avec la TNT.`,

  `🎥 Protocole "Sortie Ciné Solo" - Position stratégique optimale recherchée. Pop-corn large pour compenser la solitude. Je répète : MISSION SOLITAIRE EN COURS.`,

  `🐦 Incident "Critique Twitter" - Opinion imprudente postée sur le dernier blockbuster. Notifications explosent. Fans en colère détectés. Position de défense activée.`,

  `📚 SOS "Collection Manga" - Bibliothèque IKEA saturée. Nouveaux tomes en approche. Solutions de rangement épuisées. Déménagement envisagé. Je refuse de vendre le moindre volume.`,

  `🎵 Situation "Concert K-pop" - Billets mis en vente dans 10 minutes. Connexion Internet instable. Six onglets ouverts. Cardiaque en hausse. QUE QUELQU'UN APPELLE MA MÈRE !`,

  `🎮 Alerte "Gaming Backlog" - Steam me signale 147 jeux non commencés. Nouveau jeu acheté quand même. La pile de la honte grandit. Auto-diagnostic : trouble compulsif du achat-en-promo.`,

  `📖 Crise "Fin de Saga" - Dernier tome/épisode/film approche. Pas émotionnellement prêt. Stocks de mouchoirs constitués. Je répète : JE NE SUIS PAS PRÊT.`,

  `🌙 Mission "Wiki 3h du mat" - Perdu dans les théories de complots fictifs. 74 onglets ouverts. Le sommeil est pour les faibles. Je touche à la vérité !`,

  `🎁 Catastrophe "Merch Limited" - Figurine collector annoncée. Stock épuisé en 30 secondes. Scalpers repérés sur eBay. Prix multipliés par 10. POURQUOI FONT-ILS ÇA ?`,

  `🍜 Opération "IRL vs Online" - Tentative de reproduire une recette d'anime. Cuisine dévastée. Plat non identifiable. Même mon chat refuse d'y goûter.`
];

export function StarWarsText() {
  const [currentText, setCurrentText] = useState(TEXTS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TEXTS.length);
      setCurrentText(TEXTS[randomIndex]);
    }, 30000); // Change text every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      <motion.div
        key={currentText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="ticker-text text-white"
      >
        {currentText}
      </motion.div>
    </div>
  );
}