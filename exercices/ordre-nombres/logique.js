// « Dans l'ordre » : logique pure de la partie (sans DOM), testable avec node.
// Utilisée par index.html via window.OrdreNombres.
(function (racine) {
  const TAILLE = 25;          // grille 5 × 5
  const PENALITE_MS = 1000;   // +1 s par mauvais toucher

  // melanger : fonction qui renvoie une copie mélangée d'un tableau (Meninges.melanger)
  function creerPartie(melanger, debut) {
    const nombres = Array.from({ length: TAILLE }, (_, i) => i + 1);
    return { grille: melanger(nombres), prochain: 1, erreurs: 0, debut, fin: null };
  }

  // Le joueur touche la case qui porte « nombre » à l'instant t (ms).
  // Renvoie "bon", "fin" (dernier bon toucher), "faux" (pénalité) ou "ignore"
  // (case déjà trouvée, ou partie finie : pas de pénalité).
  function toucher(p, nombre, t) {
    if (p.fin !== null || nombre < p.prochain) return "ignore";
    if (nombre !== p.prochain) { p.erreurs++; return "faux"; }
    p.prochain++;
    if (p.prochain > TAILLE) { p.fin = t; return "fin"; }
    return "bon";
  }

  const tempsBrut = (p, t) => Math.max(0, Math.round((p.fin !== null ? p.fin : t) - p.debut));
  const penalites = p => p.erreurs * PENALITE_MS;
  const tempsTotal = (p, t) => tempsBrut(p, t) + penalites(p);

  racine.OrdreNombres = { TAILLE, PENALITE_MS, creerPartie, toucher, tempsBrut, penalites, tempsTotal };
  if (typeof module !== "undefined" && module.exports) module.exports = racine.OrdreNombres;
})(typeof window !== "undefined" ? window : globalThis);
