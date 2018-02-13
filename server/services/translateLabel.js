const labels = {
  "ACCEPTED":"Acceptée",
  "REJECTED":"Rejetée",
  "IGNORED":"Pas de réponse",
  "FILLED":"Renseignée",
  "NOT_FILLED":"Non renseignée",
  "TEST":"Testeur",
  "ENGINEER":"Ingénieur",
  "STATIC_FITTING": "trad de static fitting",
  "IN_PROGRESS": "trad de in progress",
};

function translateLabel(text) {
  return labels[text] || `**${text}**`;
}

export default translateLabel;
