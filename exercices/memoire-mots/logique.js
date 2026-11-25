// Mémoire de mots : logique pure (tirage, comparaison des réponses), testable avec node.
(function () {
  // Minuscules, sans accents, ligatures dépliées, espaces autour retirés.
  function normaliser(s) {
    return String(s).toLowerCase()
      .replace(/œ/g, "oe").replace(/æ/g, "ae")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .trim();
  }

  // Distance d'édition (Levenshtein) bornée, pour repérer les mots presque identiques.
  function distance(a, b) {
    const m = a.length, n = b.length;
    let prec = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cour = [i];
      for (let j = 1; j <= n; j++) {
        cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prec = cour;
    }
    return prec[n];
  }

  // Deux mots sont « trop semblables » s'ils ont le même début (4 lettres), si l'un contient l'autre,
  // ou s'ils ne diffèrent que d'une lettre.
  function tropSemblables(a, b) {
    const x = normaliser(a), y = normaliser(b);
    if (x === y) return true;
    if (x.includes(y) || y.includes(x)) return true;
    if (x.length >= 4 && y.length >= 4 && x.slice(0, 4) === y.slice(0, 4)) return true;
    if (distance(x, y) <= 1) return true;
    return false;
  }

  // Tire n mots sans paire trop semblable. melanger(tab) renvoie une copie mélangée.
  function tirerMots(reservoir, n, melanger) {
    const choisis = [];
    for (const mot of melanger(reservoir)) {
      if (choisis.every(c => !tropSemblables(c, mot))) choisis.push(mot);
      if (choisis.length === n) break;
    }
    return choisis;
  }

  const PETITS_MOTS = new Set(["le", "la", "les", "un", "une", "des", "du", "de", "et", "l", "d"]);

  // Découpe une saisie en mots normalisés (on accepte « un chat, le chien »).
  function decouper(saisie) {
    return decouperBrut(saisie).map(t => t.norm);
  }
  // Pareil, en gardant aussi le mot tel que tapé (pour l'afficher) : [{ brut, norm }].
  function decouperBrut(saisie) {
    return String(saisie).toLowerCase()
      .split(/[\s,;.\/+’']+/)
      .map(t => { const brut = t.replace(/[^\p{L}-]/gu, "").replace(/^-+|-+$/g, ""); return { brut, norm: normaliser(brut).replace(/[^a-z]/g, "") }; })
      .filter(t => t.norm && !PETITS_MOTS.has(t.norm));
  }

  // Formes acceptées pour un mot tapé : tel quel, sans -s / -x final, -aux -> -al.
  function formes(t) {
    const f = [t];
    if (t.length > 3 && /[sx]$/.test(t)) f.push(t.slice(0, -1));
    if (t.length > 4 && /aux$/.test(t)) f.push(t.slice(0, -3) + "al");
    return f;
  }

  // Cherche le mot de la liste qui correspond à un mot tapé. index : Map clé normalisée -> mot affiché.
  function trouver(token, index) {
    for (const f of formes(token)) if (index.has(f)) return index.get(f);
    return null;
  }

  // Analyse une saisie : renvoie { nouveaux: [mots], doublons: [mots], intrus: [textes] }.
  // dejaTrouves : Set des mots (forme affichée) déjà retrouvés. Ne modifie rien.
  function analyser(saisie, index, dejaTrouves) {
    const res = { nouveaux: [], doublons: [], intrus: [] };
    for (const { brut, norm: t } of decouperBrut(saisie)) {
      const mot = trouver(t, index);
      if (mot === null) { if (!res.intrus.includes(brut)) res.intrus.push(brut); }
      else if (dejaTrouves.has(mot) || res.nouveaux.includes(mot)) { if (!res.doublons.includes(mot)) res.doublons.push(mot); }
      else res.nouveaux.push(mot);
    }
    return res;
  }

  function creerIndex(mots) { return new Map(mots.map(m => [normaliser(m), m])); }

  const L = { normaliser, distance, tropSemblables, tirerMots, decouper, decouperBrut, formes, trouver, analyser, creerIndex };
  if (typeof module !== "undefined" && module.exports) module.exports = L;
  else window.MemoireMots = L;
})();
