// Lecture rapide : banque de textes originaux.
// Chaque texte : id (unique, sert à éviter les répétitions), titre, texte (90 à 130 mots),
// questions : 3 × { q: question, r: bonne réponse, f: [3 mauvaises propositions] }.
// Les questions suivent l'ordre du texte. L'ordre des propositions est mélangé à chaque partie.

var TEXTES_LECTURE = [
  {
    id: "marche", titre: "Le marché de Lucie",
    texte: "Chaque samedi, Lucie se lève à sept heures pour aller au marché de son quartier. Elle emporte toujours son grand panier en osier et un sac vert pour le pain. Ce matin-là, elle commence par le stand de Marcel, le maraîcher, qui lui vend deux kilos de tomates et une botte de radis. Ensuite, elle s'arrête chez la fromagère pour goûter un nouveau chèvre aux herbes. Il est si bon qu'elle en prend trois. Avant de rentrer, elle achète un bouquet de tulipes jaunes pour sa voisine Odette, qui fête ses quatre-vingts ans. Sur le chemin du retour, elle croise son cousin Hugo, qui promène son chien.",
    questions: [
      { q: "À quelle heure Lucie se lève-t-elle le samedi ?", r: "Sept heures", f: ["Six heures", "Huit heures", "Neuf heures"] },
      { q: "De quelle couleur sont les tulipes ?", r: "Jaunes", f: ["Rouges", "Blanches", "Roses"] },
      { q: "Quel âge fête Odette ?", r: "80 ans", f: ["70 ans", "75 ans", "90 ans"] }
    ]
  },
  {
    id: "phare", titre: "Le gardien du phare",
    texte: "Sur une petite île bretonne vivait autrefois un gardien de phare nommé Yann. Tous les soirs, il montait les cent douze marches de l'escalier en colimaçon pour allumer la grande lampe. Il notait dans un carnet bleu la force du vent et la couleur de la mer. Son seul compagnon était un chat roux appelé Biscuit, qui dormait sur la rambarde. Une fois par semaine, un bateau lui apportait du pain, des lettres et du café. Yann adorait recevoir les dessins de sa nièce Maëlle, qui lui envoyait toujours des baleines. Il les accrochait au mur de la cuisine, juste à côté de la vieille horloge en bois.",
    questions: [
      { q: "Combien de marches Yann montait-il chaque soir ?", r: "112", f: ["96", "120", "150"] },
      { q: "Comment s'appelait le chat ?", r: "Biscuit", f: ["Caramel", "Moustache", "Pirate"] },
      { q: "Que dessinait Maëlle ?", r: "Des baleines", f: ["Des bateaux", "Des mouettes", "Des phares"] }
    ]
  },
  {
    id: "pieuvre", titre: "La pieuvre, une drôle de bête",
    texte: "La pieuvre est un animal marin étonnant. Elle possède huit bras couverts de ventouses, qui lui permettent de goûter ce qu'elle touche. Elle a aussi trois cœurs : deux servent à envoyer le sang vers les branchies, le troisième vers le reste du corps. Son sang est bleu, car il contient du cuivre au lieu du fer. Sans aucun os, elle peut se faufiler dans un trou à peine plus grand que son bec. Pour échapper à ses ennemis, elle change de couleur en un instant ou projette un nuage d'encre noire. Certaines savent même ouvrir un bocal pour attraper le crabe enfermé dedans.",
    questions: [
      { q: "Combien de cœurs a la pieuvre ?", r: "Trois", f: ["Un", "Deux", "Quatre"] },
      { q: "De quelle couleur est son sang ?", r: "Bleu", f: ["Rouge", "Vert", "Violet"] },
      { q: "Que savent ouvrir certaines pieuvres ?", r: "Un bocal", f: ["Une huître", "Une porte", "Un coffre"] }
    ]
  },
  {
    id: "boulangerie", titre: "Le premier jour de Tom",
    texte: "Tom a dix-sept ans et commence aujourd'hui un stage dans la boulangerie de madame Ferrand. Il arrive à quatre heures du matin, encore un peu endormi. On lui confie d'abord une mission simple : peser la farine pour quarante baguettes. Ensuite, il apprend à façonner des croissants, mais les siens ressemblent plutôt à des escargots. Madame Ferrand rit et lui montre le geste trois fois, patiemment. Vers sept heures, les premiers clients entrent. Un petit garçon en bonnet rouge commande un pain au chocolat et demande s'il est encore chaud. Tom le lui tend fièrement : c'est le premier qu'il a réussi tout seul.",
    questions: [
      { q: "Quel âge a Tom ?", r: "17 ans", f: ["15 ans", "16 ans", "18 ans"] },
      { q: "Pour combien de baguettes Tom pèse-t-il la farine ?", r: "40", f: ["30", "50", "60"] },
      { q: "De quelle couleur est le bonnet du petit garçon ?", r: "Rouge", f: ["Bleu", "Vert", "Jaune"] }
    ]
  },
  {
    id: "abeilles", titre: "La danse des abeilles",
    texte: "Quand une abeille butineuse découvre un champ de fleurs, elle rentre à la ruche pour prévenir ses sœurs. Mais comment leur expliquer le chemin ? En dansant ! Si les fleurs sont tout près, elle tourne en rond. Si elles sont plus loin, elle dessine un huit en frétillant de l'abdomen. La direction de la partie centrale indique où aller par rapport au soleil, et la durée du frétillement indique la distance. Les autres abeilles suivent la danse dans le noir, en touchant la danseuse avec leurs antennes. Elles goûtent aussi le nectar qu'elle rapporte, pour savoir quelles fleurs chercher.",
    questions: [
      { q: "Que fait l'abeille si les fleurs sont tout près ?", r: "Elle tourne en rond", f: ["Elle dessine un huit", "Elle reste immobile", "Elle bourdonne très fort"] },
      { q: "Quel repère la danse utilise-t-elle pour indiquer la direction ?", r: "Le soleil", f: ["La lune", "Le vent", "La rivière"] },
      { q: "Avec quoi les abeilles touchent-elles la danseuse ?", r: "Leurs antennes", f: ["Leurs pattes", "Leurs ailes", "Leur bouche"] }
    ]
  },
  {
    id: "velo", titre: "La balade à vélo",
    texte: "Dimanche dernier, Inès et son frère Karim ont fait une balade à vélo le long du canal. Ils sont partis à dix heures, avec deux sandwichs au jambon, des pommes et une bouteille d'eau chacun. Au bout de six kilomètres, Karim a crevé. Heureusement, un monsieur à moustache qui pêchait au bord de l'eau avait une rustine dans sa boîte. Ils ont pique-niqué près d'une écluse, en regardant passer une péniche blanche nommée « La Douce ». Au retour, un héron gris les a accompagnés un moment en volant au-dessus du canal. Ils sont rentrés fatigués mais ravis, après avoir parcouru vingt-quatre kilomètres en tout.",
    questions: [
      { q: "Au bout de combien de kilomètres Karim a-t-il crevé ?", r: "6 km", f: ["4 km", "8 km", "12 km"] },
      { q: "Comment s'appelait la péniche ?", r: "La Douce", f: ["La Belle", "La Paisible", "La Rêveuse"] },
      { q: "Combien de kilomètres ont-ils parcourus en tout ?", r: "24 km", f: ["18 km", "20 km", "30 km"] }
    ]
  },
  {
    id: "grenier", titre: "Le trésor du grenier",
    texte: "En rangeant le grenier de sa grand-mère, Chloé a découvert une malle en métal vert. À l'intérieur, sous une couverture à carreaux, elle a trouvé trois choses : un appareil photo ancien, une boîte de boutons nacrés et un paquet de lettres attachées par un ruban violet. Les lettres dataient de 1962. Elles avaient été écrites par son grand-père, alors marin, depuis des ports lointains comme Valparaiso et Dakar. Dans chacune, il racontait le temps qu'il faisait et dessinait un petit poisson en bas de page. Chloé est descendue les lire à voix haute à sa grand-mère, qui souriait en reconnaissant chaque mot.",
    questions: [
      { q: "De quelle couleur était le ruban des lettres ?", r: "Violet", f: ["Rouge", "Doré", "Bleu"] },
      { q: "De quelle année dataient les lettres ?", r: "1962", f: ["1958", "1965", "1972"] },
      { q: "Que dessinait le grand-père en bas de page ?", r: "Un petit poisson", f: ["Une ancre", "Un bateau", "Une étoile"] }
    ]
  },
  {
    id: "lune", titre: "La Lune en quelques mots",
    texte: "La Lune tourne autour de la Terre à environ 384 000 kilomètres de nous. Elle met à peu près vingt-sept jours pour en faire le tour, et nous montre toujours la même face. Elle ne produit pas de lumière : elle renvoie celle du Soleil, ce qui explique ses phases, du fin croissant à la pleine lune. Sa force d'attraction soulève les océans et crée les marées. Entre 1969 et 1972, douze astronautes ont marché sur son sol poussiéreux. Comme il n'y a ni vent ni pluie là-haut, les traces de leurs pas sont probablement toujours visibles aujourd'hui.",
    questions: [
      { q: "À quelle distance de la Terre se trouve la Lune ?", r: "Environ 384 000 km", f: ["Environ 38 000 km", "Environ 150 000 km", "Environ 1 million de km"] },
      { q: "Que crée la force d'attraction de la Lune ?", r: "Les marées", f: ["Les vents", "Les nuages", "Les saisons"] },
      { q: "Combien d'astronautes ont marché sur la Lune ?", r: "12", f: ["6", "10", "24"] }
    ]
  },
  {
    id: "tartes", titre: "Le concours de tartes",
    texte: "Le village de Saint-Aubin organise chaque automne un concours de tartes. Cette année, quinze participants se sont inscrits. Monsieur Leroy a présenté une tarte aux poires et au chocolat, Annie une tarte aux mirabelles, et le petit Nathan, neuf ans, une tarte aux pommes décorée de feuilles de menthe. Le jury, composé de trois personnes dont le maire, a goûté chaque part en silence. Après une longue discussion, le premier prix est revenu à Annie. Elle a gagné un tablier brodé et un panier de noix. Nathan, lui, a reçu le prix spécial de la décoration, et il l'a montré à tout le monde jusqu'au soir.",
    questions: [
      { q: "Combien de participants se sont inscrits ?", r: "15", f: ["9", "12", "20"] },
      { q: "Qui a remporté le premier prix ?", r: "Annie", f: ["Monsieur Leroy", "Nathan", "Le maire"] },
      { q: "Quelle tarte Annie a-t-elle présentée ?", r: "Aux mirabelles", f: ["Aux poires et au chocolat", "Aux pommes", "Aux fraises"] }
    ]
  },
  {
    id: "chouette", titre: "La chouette du jardin",
    texte: "Depuis le printemps, une chouette s'est installée dans le vieux noyer du jardin de Paul. Chaque soir, vers vingt-deux heures, il l'entend lancer son cri depuis la plus haute branche. Paul lui a donné un nom : Mirabelle. Pour mieux l'observer, il a acheté une paire de jumelles et une lampe à lumière rouge, qui dérange moins les oiseaux. Un soir de juin, il a eu une belle surprise : deux petites boules de plumes grises étaient assises à côté d'elle. Mirabelle avait des bébés ! Paul a tout noté dans un cahier, avec la date et l'heure de chaque observation.",
    questions: [
      { q: "Dans quel arbre vit la chouette ?", r: "Un noyer", f: ["Un chêne", "Un tilleul", "Un cerisier"] },
      { q: "Comment Paul a-t-il appelé la chouette ?", r: "Mirabelle", f: ["Noisette", "Plume", "Clémentine"] },
      { q: "Combien de petits Paul a-t-il vus ?", r: "Deux", f: ["Un", "Trois", "Quatre"] }
    ]
  },
  {
    id: "train", titre: "Le train de nuit",
    texte: "Margot prend le train de nuit pour la première fois. Elle part de Paris à vingt et une heures et doit arriver à Briançon le lendemain matin. Sa couchette est en haut, dans un compartiment de six places. En dessous dorment une dame qui tricote une écharpe orange et un étudiant plongé dans un livre de géographie. Margot a apporté un oreiller gonflable, un pyjama à rayures et une boîte de biscuits au citron qu'elle partage avec ses voisins. Bercée par le bruit des rails, elle s'endort vite. Au réveil, par la fenêtre, elle découvre des montagnes couvertes de neige et un ciel parfaitement bleu.",
    questions: [
      { q: "Où va Margot ?", r: "À Briançon", f: ["À Grenoble", "À Chambéry", "À Annecy"] },
      { q: "De quelle couleur est l'écharpe que tricote la dame ?", r: "Orange", f: ["Verte", "Grise", "Rouge"] },
      { q: "Quels biscuits Margot a-t-elle apportés ?", r: "Au citron", f: ["Au chocolat", "À la vanille", "Aux amandes"] }
    ]
  },
  {
    id: "potager", titre: "Le potager de l'école",
    texte: "Les élèves de la classe de madame Benali ont créé un potager derrière l'école. Ils ont partagé le terrain en quatre carrés. Dans le premier, ils ont planté des salades ; dans le deuxième, des carottes ; dans le troisième, des courgettes ; et dans le dernier, des fleurs pour attirer les abeilles. Chaque élève est responsable de l'arrosage un jour par semaine. Jules, le plus grand de la classe, a fabriqué un épouvantail avec un vieux chapeau de paille et une chemise à carreaux. En juin, ils ont récolté leurs premières courgettes et ont préparé une soupe qu'ils ont servie aux parents lors de la fête de fin d'année.",
    questions: [
      { q: "En combien de carrés le potager est-il partagé ?", r: "4", f: ["3", "5", "6"] },
      { q: "Qu'ont-ils planté dans le deuxième carré ?", r: "Des carottes", f: ["Des salades", "Des courgettes", "Des fleurs"] },
      { q: "Qu'ont-ils préparé avec les courgettes ?", r: "Une soupe", f: ["Un gratin", "Une tarte", "Une ratatouille"] }
    ]
  },
  {
    id: "girafe", titre: "Le cou de la girafe",
    texte: "La girafe est le plus grand animal terrestre : un mâle peut dépasser cinq mètres de haut. Pourtant, son long cou ne contient que sept vertèbres, exactement comme le nôtre. Chacune d'elles est simplement beaucoup plus longue. Pour faire monter le sang jusqu'à sa tête, la girafe possède un cœur très puissant, qui peut peser plus de dix kilos. Sa langue, de couleur sombre, mesure près d'un demi-mètre. Elle s'en sert pour attraper les feuilles d'acacia entre les épines. Enfin, la girafe dort très peu, et souvent debout, en courtes siestes de quelques minutes seulement.",
    questions: [
      { q: "Combien de vertèbres contient le cou de la girafe ?", r: "Sept", f: ["Douze", "Dix-huit", "Vingt-cinq"] },
      { q: "Combien mesure sa langue ?", r: "Près d'un demi-mètre", f: ["Environ 10 cm", "Environ 20 cm", "Plus d'un mètre"] },
      { q: "De quel arbre mange-t-elle les feuilles ?", r: "L'acacia", f: ["Le baobab", "L'eucalyptus", "L'olivier"] }
    ]
  },
  {
    id: "piano", titre: "Le piano de l'immeuble",
    texte: "Au rez-de-chaussée de l'immeuble de la rue des Lilas, quelqu'un a déposé un vieux piano droit avec un petit mot : « Jouez-moi ! ». Le premier jour, personne n'ose s'approcher. Le deuxième, une adolescente aux cheveux bleus joue quelques notes, puis s'enfuit en riant. Le troisième, monsieur Petit, le gardien, retrouve un air qu'il jouait enfant. Bientôt, les habitants s'arrêtent en rentrant du travail. Une fillette du cinquième étage vient chaque mercredi répéter son morceau, et les voisins applaudissent depuis l'escalier. Nul ne sait qui l'a apporté, mais tout le monde l'appelle désormais « le Bavard ».",
    questions: [
      { q: "Dans quelle rue se trouve l'immeuble ?", r: "Rue des Lilas", f: ["Rue des Roses", "Rue des Tilleuls", "Rue des Acacias"] },
      { q: "De quelle couleur sont les cheveux de l'adolescente ?", r: "Bleus", f: ["Roses", "Verts", "Violets"] },
      { q: "Quel surnom les habitants ont-ils donné au piano ?", r: "Le Bavard", f: ["Le Chanteur", "Le Voisin", "Le Rieur"] }
    ]
  },
  {
    id: "crepes", titre: "Les crêpes de Mamie Jo",
    texte: "Pour la Chandeleur, Mamie Jo a appris à ses petits-enfants sa recette de crêpes. Il faut deux cent cinquante grammes de farine, quatre œufs, un demi-litre de lait et une pincée de sel. Le secret, dit-elle, c'est d'ajouter une cuillère de beurre fondu et de laisser reposer la pâte une heure. Léo, l'aîné, est chargé de casser les œufs, tandis que la petite Rose mélange avec un fouet. Ensuite vient le moment le plus attendu : faire sauter les crêpes. La première atterrit sur le carrelage, la deuxième se plie en deux, mais la troisième retombe parfaitement dans la poêle. Tout le monde applaudit Léo.",
    questions: [
      { q: "Combien d'œufs faut-il dans la recette ?", r: "Quatre", f: ["Deux", "Trois", "Six"] },
      { q: "Combien de temps la pâte doit-elle reposer ?", r: "Une heure", f: ["Dix minutes", "Une demi-heure", "Deux heures"] },
      { q: "Où atterrit la première crêpe ?", r: "Sur le carrelage", f: ["Sur la table", "Dans l'évier", "Sur la tête de Léo"] }
    ]
  },
  {
    id: "montgolfiere", titre: "Vol en montgolfière",
    texte: "Pour leurs trente ans de mariage, Anne et Gérard ont reçu un baptême en montgolfière. Le rendez-vous était fixé à six heures du matin, dans un pré humide de rosée. Le pilote, un homme souriant nommé Fabrice, a gonflé le ballon rouge et jaune en quelques minutes avec un gros brûleur. Puis la nacelle en osier s'est soulevée doucement, sans la moindre secousse. À huit cents mètres d'altitude, ils ont aperçu un château, une rivière et un troupeau de vaches qui ressemblaient à des grains de riz. Le vol a duré une heure et quart. À l'atterrissage, Fabrice leur a servi un verre de jus de pomme pour fêter ça.",
    questions: [
      { q: "Combien d'années de mariage fêtent Anne et Gérard ?", r: "30 ans", f: ["20 ans", "25 ans", "40 ans"] },
      { q: "De quelles couleurs est le ballon ?", r: "Rouge et jaune", f: ["Bleu et blanc", "Vert et orange", "Rouge et blanc"] },
      { q: "À quelle altitude ont-ils aperçu le château ?", r: "800 m", f: ["300 m", "1 500 m", "2 000 m"] }
    ]
  },
  {
    id: "chat-bus", titre: "Le chat qui prenait le bus",
    texte: "Dans une petite ville du sud, un chat tigré nommé Gaspard est devenu célèbre. Chaque matin à huit heures et quart, il monte dans le bus numéro 7 à l'arrêt de la boulangerie. Il s'installe toujours sur le même siège, près de la fenêtre, au troisième rang. Quatre arrêts plus loin, devant la poissonnerie, il descend tranquillement. Le poissonnier lui offre alors une petite sardine. Vers midi, Gaspard reprend le bus dans l'autre sens pour rentrer chez lui. Les chauffeurs le connaissent si bien qu'ils lui ont fabriqué une fausse carte d'abonnement, avec sa photo, qu'ils ont accrochée près du volant.",
    questions: [
      { q: "Quel bus prend Gaspard ?", r: "Le numéro 7", f: ["Le numéro 3", "Le numéro 4", "Le numéro 12"] },
      { q: "Au bout de combien d'arrêts descend-il ?", r: "Quatre", f: ["Deux", "Trois", "Six"] },
      { q: "Que lui offre le poissonnier ?", r: "Une petite sardine", f: ["Une crevette", "Un morceau de thon", "Un bol de lait"] }
    ]
  },
  {
    id: "arc-en-ciel", titre: "Le secret de l'arc-en-ciel",
    texte: "Pour voir un arc-en-ciel, il faut deux ingrédients : du soleil et des gouttes de pluie. Et surtout, il faut avoir le soleil dans le dos. Chaque goutte agit comme un petit prisme : elle sépare la lumière blanche en plusieurs couleurs. On en compte traditionnellement sept, du rouge à l'extérieur jusqu'au violet à l'intérieur. Parfois, un second arc, plus pâle, apparaît au-dessus du premier. Ses couleurs sont alors inversées. Depuis un avion, on peut même voir un arc-en-ciel en forme de cercle complet, car le sol ne cache plus sa partie basse. Et la nuit, la lune peut parfois créer un arc-en-ciel très pâle.",
    questions: [
      { q: "Où doit se trouver le soleil pour voir un arc-en-ciel ?", r: "Dans ton dos", f: ["Face à toi", "Juste au-dessus de toi", "Caché par un nuage"] },
      { q: "Quelle couleur est à l'extérieur de l'arc ?", r: "Le rouge", f: ["Le violet", "Le bleu", "Le jaune"] },
      { q: "Quelle forme peut-il avoir vu depuis un avion ?", r: "Un cercle complet", f: ["Un demi-cercle", "Une spirale", "Une ligne droite"] }
    ]
  },
  {
    id: "bibliobus", titre: "La bibliothèque ambulante",
    texte: "Tous les jeudis, un camion orange s'arrête sur la place du village de Montclar. C'est la bibliothèque ambulante, conduite par Sophie depuis maintenant douze ans. À l'intérieur, les étagères contiennent près de deux mille livres, des bandes dessinées et même quelques jeux de société. Les lecteurs ont le droit d'emprunter cinq documents pour trois semaines. Le plus fidèle s'appelle Armand : il a quatre-vingt-sept ans et lit surtout des romans policiers. Sophie garde toujours un bocal de bonbons à la menthe près de la caisse, pour ceux qui rapportent leurs livres à l'heure.",
    questions: [
      { q: "Quel jour passe le camion ?", r: "Le jeudi", f: ["Le mardi", "Le vendredi", "Le samedi"] },
      { q: "Combien de documents peut-on emprunter ?", r: "Cinq", f: ["Trois", "Quatre", "Dix"] },
      { q: "Que lit surtout Armand ?", r: "Des romans policiers", f: ["Des bandes dessinées", "Des livres de cuisine", "Des récits de voyage"] }
    ]
  },
  {
    id: "manchots", titre: "Le papa manchot",
    texte: "Chez le manchot empereur, c'est le papa qui couve. Au début de l'hiver antarctique, la femelle pond un seul œuf, puis repart en mer pour se nourrir. Le mâle garde alors l'œuf posé sur ses pattes, bien au chaud sous un repli de peau. Pendant environ deux mois, il ne mange rien et affronte des vents glacés. Pour résister, les mâles se serrent les uns contre les autres et changent de place à tour de rôle, afin que chacun passe un moment au centre, là où il fait plus chaud. Quand le poussin éclot, la maman revient enfin, le ventre plein de nourriture à partager.",
    questions: [
      { q: "Combien d'œufs pond la femelle ?", r: "Un seul", f: ["Deux", "Trois", "Quatre"] },
      { q: "Où le mâle garde-t-il l'œuf ?", r: "Sur ses pattes", f: ["Dans un nid de pierres", "Dans un trou de neige", "Sous une aile"] },
      { q: "Pendant combien de temps le mâle ne mange-t-il rien ?", r: "Environ deux mois", f: ["Environ deux semaines", "Environ six mois", "Environ un an"] }
    ]
  },
  {
    id: "brocante", titre: "La brocante de Samir",
    texte: "Dimanche, Samir a installé son stand à la brocante du quartier. Sur une table pliante recouverte d'un drap blanc, il a disposé ses vieilles affaires : des disques, une lampe en forme de champignon, une collection de petites voitures et un réveil qui ne sonne plus. Le premier acheteur, une dame avec un chapeau de paille, a pris la lampe pour huit euros. Un collectionneur a longuement examiné les voitures avant d'en acheter onze d'un coup. En fin de journée, Samir avait gagné soixante euros. Il a tout dépensé au stand voisin… pour s'offrir un vieux vélo bleu qu'il rêvait de réparer.",
    questions: [
      { q: "Quelle forme a la lampe ?", r: "Un champignon", f: ["Une lune", "Un poisson", "Une tulipe"] },
      { q: "Combien de petites voitures le collectionneur a-t-il achetées ?", r: "Onze", f: ["Sept", "Huit", "Quinze"] },
      { q: "Combien Samir a-t-il gagné dans la journée ?", r: "60 €", f: ["40 €", "80 €", "100 €"] }
    ]
  },
  {
    id: "bonhomme", titre: "Monsieur Flocon",
    texte: "Il a neigé toute la nuit sur le hameau. Au matin, Lina et ses deux cousins sortent en courant pour construire un bonhomme de neige. Ils roulent une première boule énorme pour le ventre, puis une plus petite pour la tête. Pour les yeux, ils utilisent deux châtaignes ; pour le nez, une carotte un peu tordue. Lina lui prête son écharpe à pois verts, et son cousin Malo lui pose une vieille casserole sur la tête en guise de chapeau. Ils l'appellent Monsieur Flocon. À midi, le soleil revient et Monsieur Flocon commence à pencher. Les enfants prennent vite une photo pour garder un souvenir de leur œuvre.",
    questions: [
      { q: "Avec quoi les enfants font-ils les yeux ?", r: "Deux châtaignes", f: ["Deux boutons", "Deux cailloux", "Deux olives"] },
      { q: "Comment est l'écharpe de Lina ?", r: "À pois verts", f: ["À rayures rouges", "À carreaux bleus", "À pois jaunes"] },
      { q: "Que sert de chapeau au bonhomme ?", r: "Une casserole", f: ["Un seau", "Un bonnet", "Une passoire"] }
    ]
  },
  {
    id: "marathon", titre: "Le premier marathon de Claire",
    texte: "Claire a toujours dit qu'elle ne courrait jamais plus de cinq kilomètres. Pourtant, ce dimanche d'avril, elle porte un dossard avec le numéro 2418. Elle s'est entraînée pendant six mois, trois fois par semaine, avec son amie Nadia. Au départ, il fait frais et le ciel est gris. Au quinzième kilomètre, elle aperçoit sa famille qui agite une grande pancarte jaune où l'on peut lire : « Allez maman ! ». Au trentième, ses jambes deviennent lourdes, mais un groupe de musiciens qui joue du tambour lui redonne de l'énergie. Elle franchit la ligne d'arrivée en quatre heures et douze minutes, les bras levés et le sourire aux lèvres.",
    questions: [
      { q: "Quel numéro porte Claire ?", r: "2418", f: ["2148", "1824", "4218"] },
      { q: "De quelle couleur est la pancarte de sa famille ?", r: "Jaune", f: ["Verte", "Rouge", "Blanche"] },
      { q: "En combien de temps termine-t-elle la course ?", r: "4 h 12", f: ["3 h 48", "4 h 21", "5 h 02"] }
    ]
  },
  {
    id: "ciel-bleu", titre: "Pourquoi le ciel est bleu",
    texte: "La lumière du Soleil semble blanche, mais elle mélange en réalité toutes les couleurs. En traversant l'air, elle rencontre de minuscules molécules de gaz. Celles-ci dispersent beaucoup plus la lumière bleue que la rouge, qui continue plutôt son chemin. Résultat : le bleu est éparpillé dans tout le ciel, et c'est lui qui arrive à nos yeux, quelle que soit la direction où l'on regarde. Au coucher du soleil, la lumière doit traverser une couche d'air bien plus épaisse. Le bleu se perd en route, et seuls l'orange et le rouge parviennent jusqu'à nous. Sur la Lune, sans air, le ciel reste noir même en plein jour.",
    questions: [
      { q: "Quelle couleur l'air disperse-t-il le plus ?", r: "Le bleu", f: ["Le rouge", "Le vert", "Le jaune"] },
      { q: "Quelles couleurs nous parviennent au coucher du soleil ?", r: "L'orange et le rouge", f: ["Le bleu et le violet", "Le vert et le jaune", "Le blanc et le gris"] },
      { q: "De quelle couleur est le ciel sur la Lune en plein jour ?", r: "Noir", f: ["Bleu", "Blanc", "Orange"] }
    ]
  },
  {
    id: "perroquet", titre: "Le perroquet bavard",
    texte: "Anatole, un perroquet gris de vingt-trois ans, vit chez madame Lambert, au troisième étage. Il connaît une quarantaine de mots et imite parfaitement la sonnerie du téléphone, ce qui fait courir toute la famille. Son mot préféré est « cacahuète », qu'il répète dès qu'il entend un sac en papier. Le matin, il dit « Bonjour Simone ! » à la voisine qui arrose ses géraniums sur le balcon d'en face. Un jour, le facteur a sonné, et Anatole a crié « Entrez ! » avec la voix de madame Lambert. Le pauvre facteur est resté planté devant la porte fermée pendant cinq bonnes minutes, très perplexe.",
    questions: [
      { q: "Quel âge a Anatole ?", r: "23 ans", f: ["8 ans", "13 ans", "32 ans"] },
      { q: "Quel est son mot préféré ?", r: "Cacahuète", f: ["Bonjour", "Biscuit", "Banane"] },
      { q: "Comment s'appelle la voisine d'en face ?", r: "Simone", f: ["Suzanne", "Sylvie", "Solange"] }
    ]
  },
  {
    id: "cabane", titre: "La cabane d'Élise",
    texte: "Pendant les vacances, Élise et son papa ont construit une cabane dans le grand chêne du jardin. Ils ont utilisé des planches récupérées chez un menuisier, deux cents clous et une échelle de corde. Le toit est fait de vieilles tuiles rouges, et la porte est peinte en bleu ciel. À l'intérieur, Élise a installé un tapis, une lampe de poche, trois coussins et une boîte en fer pour ses trésors : des plumes, une pomme de pin dorée et une clé mystérieuse trouvée dans la terre. Sur la porte, une pancarte annonce le règlement : « Interdit aux adultes, sauf ceux qui apportent des gâteaux ».",
    questions: [
      { q: "Dans quel arbre est construite la cabane ?", r: "Un chêne", f: ["Un noyer", "Un tilleul", "Un hêtre"] },
      { q: "De quelle couleur est la porte ?", r: "Bleu ciel", f: ["Rouge", "Vert pomme", "Jaune"] },
      { q: "Combien de coussins y a-t-il dans la cabane ?", r: "Trois", f: ["Deux", "Quatre", "Cinq"] }
    ]
  },
  {
    id: "cerf-volant", titre: "Le dragon de Noé",
    texte: "Sur la plage, le vent souffle fort ce samedi. Noé, huit ans, déroule pour la première fois le cerf-volant offert par son parrain. Il a la forme d'un dragon vert avec une longue queue de rubans multicolores. Au premier essai, le dragon pique du nez dans le sable. Au deuxième, il monte un peu, puis retombe sur un château de sable, au grand désespoir de deux fillettes. Au troisième essai, enfin, il s'envole très haut, au-dessus des mouettes. Noé tient la poignée à deux mains et éclate de rire. Son parrain filme la scène avec son téléphone pour l'envoyer à toute la famille.",
    questions: [
      { q: "Qui a offert le cerf-volant à Noé ?", r: "Son parrain", f: ["Sa grand-mère", "Son père", "Sa tante"] },
      { q: "Quelle forme a le cerf-volant ?", r: "Un dragon vert", f: ["Un poisson rouge", "Un aigle noir", "Un serpent jaune"] },
      { q: "Où retombe-t-il au deuxième essai ?", r: "Sur un château de sable", f: ["Dans l'eau", "Sur une serviette", "Sur un parasol"] }
    ]
  }
];

if (typeof module !== "undefined") module.exports = TEXTES_LECTURE;
