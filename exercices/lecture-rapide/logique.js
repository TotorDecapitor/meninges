// Lecture rapide : fonctions pures (sans DOM), testables avec node.
var LectureLogique = (function () {
  var NB_RECENTS = 10;

  // Compte les mots : morceaux séparés par des espaces qui contiennent au moins une lettre ou un chiffre
  // (« l'eau » = 1 mot ; « : », « ! » ou « « » isolés ne comptent pas).
  function compterMots(texte) {
    return String(texte).trim().split(/\s+/).filter(function (m) { return /[\p{L}\p{N}]/u.test(m); }).length;
  }

  // Choisit un texte absent des NB_RECENTS derniers joués. Si tout a été joué récemment
  // (banque trop petite), on évite au moins le tout dernier.
  function choisirTexte(textes, recents, hasard) {
    hasard = hasard || Math.random;
    var exclus = (recents || []).slice(-NB_RECENTS);
    var possibles = textes.filter(function (t) { return exclus.indexOf(t.id) === -1; });
    if (!possibles.length) {
      var dernier = exclus[exclus.length - 1];
      possibles = textes.filter(function (t) { return t.id !== dernier; });
      if (!possibles.length) possibles = textes;
    }
    return possibles[Math.floor(hasard() * possibles.length)];
  }

  // Ajoute un id à la liste des textes récents (sans doublon, NB_RECENTS au plus)
  function noterRecent(recents, id) {
    var l = (recents || []).filter(function (x) { return x !== id; });
    l.push(id);
    return l.slice(-NB_RECENTS);
  }

  // Prépare une question : propositions mélangées + index de la bonne
  function preparerQuestion(question, melanger) {
    var propositions = melanger([question.r].concat(question.f));
    return { q: question.q, propositions: propositions, bonne: propositions.indexOf(question.r) };
  }

  // Typographie française : espaces insécables avant ; : ! ? » et après « (évite « ! » seul en début de ligne)
  function insecables(texte) {
    return String(texte).replace(/ ([;:!?»])/g, " $1").replace(/« /g, "« ");
  }

  // Vitesse de lecture en mots par minute (arrondie)
  function vitesse(mots, ms) {
    if (!(ms > 0)) return 0;
    return Math.round(mots * 60000 / ms);
  }

  return { NB_RECENTS: NB_RECENTS, compterMots: compterMots, choisirTexte: choisirTexte,
           noterRecent: noterRecent, insecables: insecables, preparerQuestion: preparerQuestion, vitesse: vitesse };
})();

if (typeof module !== "undefined") module.exports = LectureLogique;
