// Compte les syllabes : logique pure (tirage des mots, vérification), utilisable aussi dans node pour les tests.
(function (racine) {
  const NB_MOTS = 15;

  // Nombres de syllabes possibles selon la position du mot dans la partie (difficulté croissante).
  // Chaque position tire au hasard parmi plusieurs nombres, pour que la réponse ne soit pas devinable par la position.
  const PALIERS = [
    [1, 2], [1, 2], [1, 2],
    [1, 2, 3], [2, 3], [2, 3],
    [2, 3, 4], [2, 3, 4], [3, 4],
    [3, 4, 5], [3, 4, 5], [3, 4, 5],
    [4, 5, 6], [4, 5, 6], [4, 5, 6]
  ];

  const hasard = n => Math.floor(Math.random() * n);

  // Renvoie 15 entrées [mot, n, découpage] sans doublon, de plus en plus longues.
  function tirerPartie(mots) {
    const parNombre = {};
    mots.forEach(m => { (parNombre[m[1]] = parNombre[m[1]] || []).push(m); });
    const pris = new Set();
    const partie = [];
    for (let i = 0; i < NB_MOTS; i++) {
      const possibles = PALIERS[i].filter(n => (parNombre[n] || []).some(m => !pris.has(m[0])));
      const n = possibles[hasard(possibles.length)];
      const libres = parNombre[n].filter(m => !pris.has(m[0]));
      const choix = libres[hasard(libres.length)];
      pris.add(choix[0]);
      partie.push(choix);
    }
    return partie;
  }

  const verifier = (entree, reponse) => entree[1] === reponse;

  const api = { NB_MOTS, PALIERS, tirerPartie, verifier };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else racine.SyllabesLogique = api;
})(typeof window !== "undefined" ? window : globalThis);
