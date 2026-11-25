// Couleurs piégées : logique pure (sans DOM), testable avec node.
// Utilisée par index.html via window.CouleursPiegees.
(function (racine) {
  const COULEURS = ["rouge", "bleu", "vert", "jaune"];
  const PART_CONFLIT = 0.75;   // ~75 % des mots écrits dans une autre encre
  const DUREE_MS = 60000;      // partie de 60 secondes

  // Tire un mot et une encre. Jamais deux fois de suite la même combinaison mot/encre.
  function generer(precedent, hasard = Math.random) {
    const choix = tab => tab[Math.floor(hasard() * tab.length)];
    for (let essai = 0; essai < 50; essai++) {
      const mot = choix(COULEURS);
      const encre = hasard() < PART_CONFLIT ? choix(COULEURS.filter(c => c !== mot)) : mot;
      if (!precedent || precedent.mot !== mot || precedent.encre !== encre) return { mot, encre };
    }
    // Filet de sécurité (hasard truqué) : on décale le mot.
    const mot = COULEURS[(COULEURS.indexOf(precedent.mot) + 1) % COULEURS.length];
    return { mot, encre: precedent.encre === mot ? COULEURS[(COULEURS.indexOf(mot) + 1) % COULEURS.length] : precedent.encre };
  }

  // Suivi de partie : +1 si bonne réponse, -1 si erreur, le score ne descend jamais sous 0.
  function nouvellePartie() {
    return { points: 0, bons: 0, erreurs: 0, tempsBons: [] };
  }
  function repondre(etat, question, reponse, tempsMs) {
    const juste = reponse === question.encre;
    if (juste) { etat.bons++; etat.points++; etat.tempsBons.push(tempsMs); }
    else { etat.erreurs++; etat.points = Math.max(0, etat.points - 1); }
    return juste;
  }
  function tempsMoyen(etat) {
    if (!etat.tempsBons.length) return null;
    return etat.tempsBons.reduce((a, b) => a + b, 0) / etat.tempsBons.length;
  }

  const api = { COULEURS, PART_CONFLIT, DUREE_MS, generer, nouvellePartie, repondre, tempsMoyen };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else racine.CouleursPiegees = api;
})(typeof window !== "undefined" ? window : globalThis);
