// Mémoire de mots : réservoir de noms communs concrets, faciles à visualiser.
// Règles : 3 à 8 lettres, au singulier, sans doublon, sans mot ambigu ou grossier.
// Les mots trop proches (même famille, l'un contenu dans l'autre…) peuvent coexister ici :
// le tirage (logique.js) évite de les mettre dans la même partie.
(function () {
  const MOTS = [
    // Animaux
    "chat", "chien", "cheval", "vache", "mouton", "cochon", "lapin", "poule", "canard", "lion",
    "tigre", "zèbre", "girafe", "éléphant", "singe", "ours", "loup", "renard", "cerf", "hérisson",
    "écureuil", "hibou", "aigle", "pigeon", "moineau", "corbeau", "mouette", "pingouin", "dauphin", "baleine",
    "requin", "poulpe", "crabe", "homard", "tortue", "serpent", "lézard", "escargot", "abeille", "fourmi",
    "papillon", "araignée", "chameau", "panda", "koala", "castor", "taupe", "chèvre", "âne", "dinde",
    "oie", "paon", "flamant", "autruche", "chouette", "hamster", "cygne", "merle", "sanglier", "blaireau",
    "loutre", "gorille", "guépard", "lama", "bison", "mouche", "méduse", "hyène", "pélican", "otarie",
    // Aliments
    "pomme", "poire", "banane", "cerise", "fraise", "citron", "orange", "raisin", "ananas", "melon",
    "kiwi", "prune", "abricot", "mangue", "figue", "carotte", "tomate", "poireau", "salade", "radis",
    "navet", "chou", "oignon", "haricot", "poivron", "potiron", "pain", "fromage", "beurre", "yaourt",
    "lait", "miel", "sucre", "gâteau", "tarte", "crêpe", "biscuit", "bonbon", "chocolat", "soupe",
    "pizza", "riz", "jambon", "saucisse", "frite", "brioche", "noix", "noisette", "amande", "olive",
    "moutarde", "huile", "vinaigre", "café", "thé", "sirop", "limonade", "cacao", "pastèque", "myrtille",
    "galette", "gaufre", "beignet", "quiche", "omelette", "sandwich", "sardine", "saumon", "thon", "truite",
    "crevette", "huître", "épinard", "asperge", "céleri", "persil", "lentille", "maïs", "poulet", "poivre",
    // Maison et objets du quotidien
    "table", "chaise", "lit", "armoire", "lampe", "miroir", "fauteuil", "canapé", "tapis", "rideau",
    "coussin", "oreiller", "couette", "bougie", "horloge", "réveil", "vase", "cadre", "étagère", "tiroir",
    "porte", "fenêtre", "clé", "serrure", "balai", "seau", "éponge", "savon", "brosse", "peigne",
    "douche", "évier", "robinet", "frigo", "four", "assiette", "bol", "tasse", "verre", "couteau",
    "cuillère", "louche", "théière", "carafe", "panier", "boîte", "sac", "valise", "aiguille", "bouton",
    "crayon", "stylo", "gomme", "cahier", "cartable", "timbre", "journal", "radio", "clavier", "écran",
    // Jeux, transports, outils
    "ballon", "poupée", "toupie", "vélo", "train", "voiture", "camion", "bateau", "avion", "fusée",
    "moto", "bus", "tracteur", "métro", "échelle", "marteau", "clou", "pince", "scie", "pelle",
    "râteau", "arrosoir", "tondeuse", "brouette", "hache", "corde", "chaîne", "cadenas", "luge", "patin",
    "raquette", "filet", "puzzle", "domino", "carton", "ruban", "pinceau", "palette", "sifflet", "tambour",
    "guitare", "piano", "violon", "flûte", "harpe", "banjo", "lasso", "trottoir", "ancre", "hamac",
    // Vêtements et accessoires
    "montre", "bague", "collier", "bracelet", "chapeau", "écharpe", "gant", "sandale", "pantalon", "jupe",
    "robe", "manteau", "chemise", "pull", "veste", "ceinture", "cravate", "pyjama", "tablier", "parfum",
    "peluche", "berceau", "biberon", "tétine", "hochet", "parasol", "tente",
    // Lieux et nature
    "maison", "école", "église", "château", "pont", "gare", "port", "plage", "forêt", "montagne",
    "rivière", "lac", "île", "volcan", "désert", "prairie", "jardin", "ferme", "moulin", "grange",
    "cabane", "grotte", "puits", "fontaine", "musée", "cinéma", "théâtre", "marché", "piscine", "stade",
    "hôpital", "usine", "village", "route", "chemin", "colline", "falaise", "cascade", "glacier", "océan",
    "nuage", "soleil", "lune", "étoile", "arbre", "fleur", "tulipe", "cactus", "palmier", "sapin",
    "chêne", "feuille", "herbe", "rocher", "caillou", "sable", "neige", "pluie", "phare", "igloo",
    "tipi", "pyramide", "éolienne", "tunnel", "barrière", "banc", "kiosque", "planète", "comète", "toboggan",
    // Métiers et personnages
    "pompier", "policier", "médecin", "boucher", "facteur", "pilote", "marin", "pirate", "peintre", "coiffeur",
    "dentiste", "fermier", "clown", "magicien", "danseur", "chanteur", "plombier", "maçon", "berger", "pêcheur",
    "juge", "roi", "reine", "prince", "sorcier", "soldat", "bûcheron", "vendeur", "serveur", "boxeur",
    "dragon", "sirène", "fée", "géant", "lutin", "momie", "fantôme", "robot",
    // Corps
    "main", "pied", "nez", "bouche", "dent", "genou", "coude", "doigt", "épaule", "oreille", "barbe",
    // Divers
    "couronne", "trésor", "drapeau", "médaille", "cadeau", "bulle", "plume", "cloche", "roue", "flèche",
    "masque", "épée", "bouclier", "canon", "tableau", "statue", "globe", "boussole", "loupe", "ampoule",
    "cerceau", "totem", "lanterne", "bocal", "tonneau", "panneau", "enclume", "trophée", "bijou", "sablier"
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = MOTS;
  else window.MOTS_MEMOIRE = MOTS;
})();
