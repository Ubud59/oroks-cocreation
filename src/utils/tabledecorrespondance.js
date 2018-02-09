const OROKS_VOCAB = {
  "STATIC_FITTING": "trad de static fitting",
  "IN_PROGRESS": "trad de in progress"
};

function translateOroksVocab(text) {
  return OROKS_VOCAB[text] || `**${text}**`;
}

export default translateOroksVocab;
