// La maison qui compte : génération des manches (sans DOM, testable avec node).
// Une manche = un nombre de personnes au départ, puis une liste de mouvements
// { entrees, sorties } joués l'un après l'autre (entrées et sorties d'un même mouvement sont simultanées).
(function (racine) {
  const MAX = 9; // jamais plus de 9 personnes dans la maison, même un instant

  // Difficulté croissante : plus de mouvements, plus rapides, groupes plus grands, puis simultanés.
  // duree = temps (ms) pour qu'une personne aille du bord de la scène à la porte ; pause = entre deux mouvements.
  const MANCHES = [
    { initMin: 1, initMax: 3, mouvements: 3, groupeMax: 1, simul: 0,    simulMin: 0, duree: 1500, pause: 450 },
    { initMin: 1, initMax: 4, mouvements: 4, groupeMax: 2, simul: 0,    simulMin: 0, duree: 1300, pause: 380 },
    { initMin: 0, initMax: 4, mouvements: 5, groupeMax: 2, simul: 0,    simulMin: 0, duree: 1150, pause: 320 },
    { initMin: 0, initMax: 4, mouvements: 6, groupeMax: 3, simul: 0.35, simulMin: 1, duree: 1000, pause: 260 },
    { initMin: 0, initMax: 4, mouvements: 7, groupeMax: 3, simul: 0.5,  simulMin: 2, duree: 850,  pause: 200 }
  ];

  function genererManche(cfg, rand = Math.random) {
    const ent = (a, b) => a + Math.floor(rand() * (b - a + 1));
    for (let essai = 0; essai < 1000; essai++) {
      const depart = ent(cfg.initMin, cfg.initMax);
      let n = depart, nbSimul = 0, totE = 0, totS = 0;
      const mouvements = [];
      for (let i = 0; i < cfg.mouvements; i++) {
        let e = 0, s = 0;
        if (cfg.simul > 0 && n >= 1 && n < MAX && rand() < cfg.simul) {
          // Simultané : les sorties ne puisent que dans ceux déjà dedans, et le pic n + e reste <= MAX
          e = ent(1, Math.min(cfg.groupeMax, MAX - n));
          s = ent(1, Math.min(cfg.groupeMax, n));
          nbSimul++;
        } else {
          let pEntre = n <= 1 ? 0.75 : n >= 7 ? 0.25 : 0.5;
          if (n === 0) pEntre = 1;
          if (n >= MAX) pEntre = 0;
          if (rand() < pEntre) e = ent(1, Math.min(cfg.groupeMax, MAX - n));
          else s = ent(1, Math.min(cfg.groupeMax, n));
        }
        n += e - s; totE += e; totS += s;
        mouvements.push({ entrees: e, sorties: s });
      }
      // Il faut au moins une entrée et une sortie, et le nombre voulu de mouvements simultanés
      if (totE === 0 || totS === 0 || nbSimul < cfg.simulMin) continue;
      return { depart, mouvements, final: n };
    }
    throw new Error("Impossible de générer la manche");
  }

  // Rejoue une manche et renvoie les effectifs successifs (pour vérifier les contraintes).
  function effectifs(manche) {
    const liste = [manche.depart];
    let n = manche.depart;
    for (const m of manche.mouvements) {
      if (m.sorties > n) throw new Error("Sortie impossible : maison en négatif");
      if (n + m.entrees > MAX) throw new Error("Trop de monde dans la maison");
      n += m.entrees - m.sorties;
      liste.push(n);
    }
    return liste;
  }

  const api = { MAX, MANCHES, genererManche, effectifs };
  if (typeof module === "object" && module.exports) module.exports = api;
  else racine.MaisonLogique = api;
})(this);
