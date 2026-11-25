// Méninges : outils partagés par l'accueil et tous les exercices.
// Chargé avec <script src="../../commun/commun.js"></script> (depuis un exercice) ou "commun/commun.js" (depuis l'accueil).
// Toutes les données du navigateur sont rangées sous le préfixe "meninges-" (le domaine est partagé avec d'autres jeux).

window.Meninges = (() => {
  // Catalogue des exercices. sens : "haut" = un score plus grand est meilleur, "bas" = un score plus petit est meilleur (temps).
  const EXERCICES = [
    { slug: "calcul-eclair",     nom: "Calcul éclair",        couleur: "#2c5bd6", sens: "bas",  unite: "s",       resume: "20 calculs, le plus vite possible." },
    { slug: "couleurs-piegees",  nom: "Couleurs piégées",     couleur: "#c8442f", sens: "haut", unite: "points",  resume: "Touche la couleur de l'encre, pas celle du mot." },
    { slug: "memoire-mots",      nom: "Mémoire de mots",      couleur: "#7a4fb8", sens: "haut", unite: "mots",    resume: "Retiens une liste de mots, puis retrouve-les." },
    { slug: "maison-qui-compte", nom: "La maison qui compte", couleur: "#b8772a", sens: "haut", unite: "/ 5",     resume: "Des gens entrent et sortent : combien reste-t-il ?" },
    { slug: "ordre-nombres",     nom: "Dans l'ordre",         couleur: "#2f8f52", sens: "bas",  unite: "s",       resume: "Touche les nombres de 1 à 25 dans l'ordre." },
    { slug: "syllabes",          nom: "Compte les syllabes",  couleur: "#1f8a8a", sens: "haut", unite: "/ 15",    resume: "Combien de syllabes dans chaque mot ?" },
    { slug: "lecture-rapide",    nom: "Lecture rapide",       couleur: "#b23a7a", sens: "haut", unite: "/ 3",     resume: "Lis un court texte en temps limité, puis réponds." }
  ];

  const PREFIXE = "meninges-";
  const lire = (cle, defaut) => { try { const v = localStorage.getItem(PREFIXE + cle); return v === null ? defaut : JSON.parse(v); } catch { return defaut; } };
  const ecrire = (cle, val) => { try { localStorage.setItem(PREFIXE + cle, JSON.stringify(val)); } catch {} };

  const exercice = slug => EXERCICES.find(e => e.slug === slug);
  const meilleur = slug => lire("record-" + slug, null);

  // Enregistre un résultat. Renvoie { record: bool, meilleur, precedent }.
  function enregistrer(slug, score) {
    const ex = exercice(slug);
    const precedent = meilleur(slug);
    const mieux = precedent === null || (ex && ex.sens === "bas" ? score < precedent : score > precedent);
    if (mieux) ecrire("record-" + slug, score);
    const hist = lire("historique-" + slug, []);
    hist.push({ date: new Date().toISOString().slice(0, 10), score });
    ecrire("historique-" + slug, hist.slice(-60));
    ecrire("dernier-jour", new Date().toISOString().slice(0, 10));
    return { record: mieux && precedent !== null, premier: precedent === null, meilleur: mieux ? score : precedent, precedent };
  }
  const historique = slug => lire("historique-" + slug, []);

  // Affiche l'écran dont l'id est donné et masque les autres éléments .ecran
  function montrer(id) {
    document.querySelectorAll(".ecran").forEach(e => { e.hidden = e.id !== id; });
    const el = document.getElementById(id);
    const cible = el && el.querySelector("[autofocus], .btn.principal");
    if (cible) cible.focus({ preventScroll: true });
  }

  // Compte à rebours 3-2-1 dans l'élément donné, puis appelle suite()
  function compteARebours(el, suite, depart = 3) {
    let n = depart; el.textContent = n;
    const t = setInterval(() => {
      n--;
      if (n <= 0) { clearInterval(t); el.textContent = ""; suite(); }
      else el.textContent = n;
    }, 700);
  }

  const aleatoire = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const melanger = tab => { const a = [...tab]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tirer = (tab, n) => melanger(tab).slice(0, n);
  const maintenant = () => performance.now();
  const formatTemps = ms => (ms / 1000).toFixed(1).replace(".", ",");
  const vibrer = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };
  const echap = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // Formate un score selon l'exercice (temps en secondes avec virgule, sinon nombre + unité)
  function formatScore(slug, score) {
    const ex = exercice(slug);
    if (!ex || score === null || score === undefined) return "–";
    if (ex.unite === "s") return formatTemps(score) + " s";
    // Singulier pour 0 et 1 (« 1 mot », « 0 point »)
    const unite = Math.abs(score) < 2 && /^[a-zé]+s$/i.test(ex.unite) ? ex.unite.slice(0, -1) : ex.unite;
    return score + " " + unite;
  }

  // Partie interrompue : si on quitte l'app (ou change d'onglet) pendant une partie, elle est annulée
  // pour que les records restent justes. Au retour, la page repart de l'intro avec un message.
  // « Au repos » = l'écran visible est l'intro ou le résultat (ou la page n'a pas d'écrans : l'accueil).
  function auRepos() {
    const visible = [...document.querySelectorAll(".ecran")].find(e => !e.hidden);
    return !visible || visible.id === "intro" || visible.id === "resultat";
  }
  let interrompu = false;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (!auRepos()) interrompu = true; }
    else if (interrompu) { try { sessionStorage.setItem(PREFIXE + "interrompu", "1"); } catch {} location.reload(); }
  });
  document.addEventListener("DOMContentLoaded", () => {
    let flag = null; try { flag = sessionStorage.getItem(PREFIXE + "interrompu"); sessionStorage.removeItem(PREFIXE + "interrompu"); } catch {}
    const intro = document.getElementById("intro");
    if (flag && intro) {
      const p = document.createElement("p");
      p.className = "interruption";
      p.textContent = "Ta partie a été interrompue quand tu as quitté l'app : elle ne compte pas. Tu peux recommencer.";
      intro.insertBefore(p, intro.firstChild);
    }
  });

  return { EXERCICES, exercice, lire, ecrire, meilleur, enregistrer, historique, montrer, compteARebours,
           aleatoire, melanger, tirer, maintenant, formatTemps, formatScore, vibrer, echap };
})();
