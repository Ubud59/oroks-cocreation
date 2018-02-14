const labels = {
  "ACCEPTED":"Accepté",
  "REJECTED":"Rejeté",
  "IGNORED":"Pas de réponse",
  "FILLED":"Renseigné",
  "NOT_FILLED":"Non renseigné",
  "TEST":"Testeur",
  "ENGINEER":"Ingénieur",
  "STATIC_FITTING": "test d'essayage",
  "IN_PROGRESS": "en cours",
  "EXPERT":"expert",
  "H":"homme",
  "F":"femme",
  "DYNAMIC_FITTING":"test d'essaye en pratique",
  "FIELD":"test fonction terrain",
  "SENSORIAL":"test sensoriel",
  "DURABILITY":"test durabilité",
  "USAGE":"test d'usage",
  "NOT_STARTED":"pas commencé",
  "DONE":"terminé",
};

function translateLabel(text) {
  return labels[text] || `**${text}**`;
}

export default translateLabel;
