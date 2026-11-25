// Calcul éclair : génération des calculs (sans dépendance au DOM, testable avec node).
(function (racine) {
  const alea = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  // Un calcul selon l'opération : { texte, reponse, cle } (cle sert à éviter les doublons)
  function creer(op) {
    if (op === "+") {
      const a = alea(2, 50), b = alea(2, 50);
      if (a + b > 99) return null;
      return { texte: a + " + " + b, reponse: a + b, cle: "+" + Math.min(a, b) + "," + Math.max(a, b) };
    }
    if (op === "-") {
      const a = alea(6, 50), b = alea(2, a - 1);
      return { texte: a + " − " + b, reponse: a - b, cle: "-" + a + "," + b };
    }
    const a = alea(2, 9), b = alea(2, 9);
    // 7 × 8 et 8 × 7 comptent comme le même calcul
    return { texte: a + " × " + b, reponse: a * b, cle: "x" + Math.min(a, b) + "," + Math.max(a, b) };
  }

  // n calculs tous différents, opérations mélangées et à peu près équilibrées
  function genererCalculs(n = 20) {
    const ops = [];
    for (let i = 0; i < n; i++) ops.push(["+", "-", "×"][i % 3]);
    for (let i = ops.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ops[i], ops[j]] = [ops[j], ops[i]]; }
    const vus = new Set(), liste = [];
    for (const op of ops) {
      let c = null;
      for (let essai = 0; essai < 500 && (!c || vus.has(c.cle)); essai++) c = creer(op);
      vus.add(c.cle);
      liste.push(c);
    }
    return liste;
  }

  const api = { genererCalculs, creer };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else racine.CalculEclair = api;
})(typeof window !== "undefined" ? window : globalThis);
