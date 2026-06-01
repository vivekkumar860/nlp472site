/* ==========================================================================
   NLP Learning Hub - Simulators Engine
   Contains calculations, data models, and logic for interactive modules
   ========================================================================== */

// --- 1. TEXT PREPROCESSING & VECTORIZATION UTILITIES ---
const STOPWORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
  'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers',
  'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
  'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out',
  'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
  'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should',
  "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't",
  'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
  'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't",
  'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
]);

// Simple stemming rules (Porter-lite)
function stemWord(word) {
  let w = word.toLowerCase().trim();
  if (w.length <= 2) return w;
  
  if (w.endsWith('sses')) w = w.slice(0, -2);
  else if (w.endsWith('ies')) w = w.slice(0, -3) + 'i';
  else if (w.endsWith('ss')) ;
  else if (w.endsWith('s') && !w.endsWith('us') && !w.endsWith('as') && !w.endsWith('is')) w = w.slice(0, -1);
  
  if (w.endsWith('eed')) {
    if (w.length > 4) w = w.slice(0, -1); // agreed -> agree
  } else if (w.endsWith('ing')) {
    w = w.slice(0, -3);
    if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) w += 'e'; // translating -> translate
    else if (w.endsWith('bb') || w.endsWith('dd') || w.endsWith('ff') || w.endsWith('gg') || w.endsWith('mm') || w.endsWith('nn') || w.endsWith('pp') || w.endsWith('rr') || w.endsWith('tt')) {
      w = w.slice(0, -1); // running -> run
    }
  } else if (w.endsWith('ed')) {
    w = w.slice(0, -2);
    if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) w += 'e';
    else if (w.endsWith('bb') || w.endsWith('dd') || w.endsWith('ff') || w.endsWith('gg') || w.endsWith('mm') || w.endsWith('nn') || w.endsWith('pp') || w.endsWith('rr') || w.endsWith('tt')) {
      w = w.slice(0, -1);
    }
  }
  
  if (w.endsWith('y') && w.length > 3) {
    // check if vowel before y
    let vowels = ['a','e','i','o','u'];
    if (!vowels.includes(w[w.length - 2])) {
      w = w.slice(0, -1) + 'i'; // study -> studi
    }
  }
  
  return w;
}

// Simple lemmatization dictionary
const LEMMA_DICT = {
  'am': 'be', 'is': 'be', 'are': 'be', 'was': 'be', 'were': 'be', 'been': 'be', 'being': 'be',
  'has': 'have', 'had': 'have', 'having': 'have',
  'does': 'do', 'did': 'do', 'doing': 'do',
  'goes': 'go', 'went': 'go', 'gone': 'go', 'going': 'go',
  'makes': 'make', 'made': 'make', 'making': 'make',
  'takes': 'take', 'took': 'take', 'taken': 'take', 'taking': 'take',
  'runs': 'run', 'ran': 'run', 'running': 'run',
  'sees': 'see', 'saw': 'see', 'seen': 'see', 'seeing': 'see',
  'computes': 'compute', 'computed': 'compute', 'computing': 'compute',
  'studies': 'study', 'studied': 'study', 'studying': 'study',
  'better': 'good', 'best': 'good', 'worse': 'bad', 'worst': 'bad',
  'men': 'man', 'women': 'woman', 'children': 'child', 'teeth': 'tooth'
};

function lemmatizeWord(word) {
  let w = word.toLowerCase().trim();
  if (LEMMA_DICT[w]) return LEMMA_DICT[w];
  return stemWord(w); // fallback to stemmer
}

function cleanAndTokenize(text) {
  // Replace punctuation with space, keep alphanumeric and spaces
  let cleaned = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ');
  return cleaned.split(/\s+/).filter(tok => tok.length > 0);
}

// BoW and TF-IDF Calculator
// Takes user document + optional default corpus docs
function computeTfIdfMatrix(userDocText, defaultDocs = []) {
  let docs = [userDocText, ...defaultDocs].filter(d => d && d.trim().length > 0);
  let docTokens = docs.map(doc => cleanAndTokenize(doc).map(tok => tok.toLowerCase()));
  
  // Vocabulary
  let vocab = new Set();
  docTokens.forEach(tokens => tokens.forEach(t => vocab.add(t)));
  let vocabArray = Array.from(vocab).sort();
  
  // Term Frequencies per Document
  let tfs = docTokens.map(tokens => {
    let freq = {};
    tokens.forEach(t => {
      freq[t] = (freq[t] || 0) + 1;
    });
    return freq;
  });
  
  // Document Frequency (DF) for each term
  let df = {};
  vocabArray.forEach(term => {
    let count = 0;
    docTokens.forEach(tokens => {
      if (tokens.includes(term)) count++;
    });
    df[term] = count;
  });
  
  // IDF = log(N / df_t) where N is number of documents
  let idf = {};
  let N = docs.length;
  vocabArray.forEach(term => {
    idf[term] = Math.log((N) / (df[term])) + 1; // standard smooth formula or log base e
  });
  
  // Compute BoW vectors and TF-IDF vectors
  let bowMatrix = [];
  let tfidfMatrix = [];
  
  for (let i = 0; i < N; i++) {
    let bowRow = {};
    let tfidfRow = {};
    vocabArray.forEach(term => {
      let tf = tfs[i][term] || 0;
      bowRow[term] = tf;
      tfidfRow[term] = tf * idf[term];
    });
    bowMatrix.push(bowRow);
    tfidfMatrix.push(tfidfRow);
  }
  
  return {
    vocab: vocabArray,
    documents: docs,
    bow: bowMatrix,
    tfidf: tfidfMatrix,
    idf: idf,
    df: df
  };
}

// --- 2. WORD EMBEDDINGS DATA & UTILITIES ---
// Predefined list of 5D embeddings for semantic categories (reduced to 2D for PCA plot visually)
const EMBEDDINGS_DB = {
  // Royalty
  "king":      { vec: [ 0.90,  0.10,  0.80, -0.20,  0.10], x: -120, y: -90,  cat: "Royalty" },
  "queen":     { vec: [ 0.85,  0.80,  0.82, -0.15,  0.15], x: -90,  y: -120, cat: "Royalty" },
  "prince":    { vec: [ 0.80,  0.15,  0.70, -0.22,  0.08], x: -140, y: -70,  cat: "Royalty" },
  "princess":  { vec: [ 0.78,  0.75,  0.72, -0.18,  0.12], x: -110, y: -100, cat: "Royalty" },
  "emperor":   { vec: [ 0.88,  0.05,  0.85, -0.25,  0.05], x: -160, y: -80,  cat: "Royalty" },
  
  // Genders (needed for analogies)
  "man":       { vec: [ 0.82,  0.08,  0.15, -0.60,  0.02], x: -130, y: 120,  cat: "Gender" },
  "woman":     { vec: [ 0.78,  0.82,  0.12, -0.55,  0.08], x: -80,  y: 90,   cat: "Gender" },
  "boy":       { vec: [ 0.70,  0.05,  0.10, -0.62,  0.01], x: -150, y: 140,  cat: "Gender" },
  "girl":      { vec: [ 0.68,  0.78,  0.08, -0.58,  0.06], x: -100, y: 110,  cat: "Gender" },

  // Technology / Coding
  "computer":  { vec: [-0.20,  0.20, -0.90,  0.92,  0.15], x: 120,  y: 110,  cat: "Technology" },
  "software":  { vec: [-0.25,  0.22, -0.85,  0.95,  0.10], x: 140,  y: 90,   cat: "Technology" },
  "ai":        { vec: [-0.10,  0.30, -0.80,  0.90,  0.30], x: 100,  y: 130,  cat: "Technology" },
  "algorithm": { vec: [-0.30,  0.15, -0.92,  0.85,  0.05], x: 150,  y: 70,   cat: "Technology" },
  "developer": { vec: [-0.15,  0.25, -0.75,  0.88,  0.20], x: 90,   y: 90,   cat: "Technology" },
  
  // Nature / Geography
  "tree":      { vec: [-0.80,  0.40,  0.30, -0.20,  0.90], x: 110,  y: -120, cat: "Nature" },
  "forest":    { vec: [-0.85,  0.35,  0.35, -0.25,  0.85], x: 130,  y: -100, cat: "Nature" },
  "river":     { vec: [-0.75,  0.50,  0.20, -0.30,  0.80], x: 90,   y: -140, cat: "Nature" },
  "mountain":  { vec: [-0.90,  0.20,  0.40, -0.10,  0.70], x: 150,  y: -110, cat: "Nature" },
  "ocean":     { vec: [-0.70,  0.55,  0.15, -0.35,  0.82], x: 80,   y: -160, cat: "Nature" },
  
  // Sentiment / Emotion
  "happy":     { vec: [ 0.10,  0.90, -0.10, -0.20, -0.50], x: -20,  y: 150,  cat: "Emotion" },
  "joy":       { vec: [ 0.12,  0.95, -0.08, -0.15, -0.48], x: -40,  y: 130,  cat: "Emotion" },
  "sad":       { vec: [ 0.05,  0.10, -0.12, -0.30, -0.60], x: 30,   y: 160,  cat: "Emotion" },
  "angry":     { vec: [-0.05,  0.05, -0.20, -0.40, -0.70], x: 50,   y: 140,  cat: "Emotion" },
  "love":      { vec: [ 0.20,  0.98,  0.02, -0.10, -0.35], x: -30,  y: 110,  cat: "Emotion" }
};

// Math utilities
function dotProduct(v1, v2) {
  return v1.reduce((sum, val, idx) => sum + val * v2[idx], 0);
}

function magnitude(v) {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
}

function cosineSimilarity(w1, w2) {
  let e1 = EMBEDDINGS_DB[w1.toLowerCase()];
  let e2 = EMBEDDINGS_DB[w2.toLowerCase()];
  if (!e1 || !e2) return 0;
  
  let d = dotProduct(e1.vec, e2.vec);
  let m1 = magnitude(e1.vec);
  let m2 = magnitude(e2.vec);
  
  if (m1 === 0 || m2 === 0) return 0;
  return d / (m1 * m2);
}

// Analogy solver: A - B + C = D
// e.g. King - Man + Woman = Queen
function solveAnalogy(wordA, wordB, wordC) {
  let eA = EMBEDDINGS_DB[wordA.toLowerCase()];
  let eB = EMBEDDINGS_DB[wordB.toLowerCase()];
  let eC = EMBEDDINGS_DB[wordC.toLowerCase()];
  
  if (!eA || !eB || !eC) return null;
  
  // Calculate vector target: V_D = V_A - V_B + V_C
  let targetVec = [];
  for (let i = 0; i < 5; i++) {
    targetVec.push(eA.vec[i] - eB.vec[i] + eC.vec[i]);
  }
  
  // Find closest word in DB (excluding A, B, and C)
  let bestWord = null;
  let bestSim = -999;
  
  for (let word in EMBEDDINGS_DB) {
    if (word === wordA.toLowerCase() || word === wordB.toLowerCase() || word === wordC.toLowerCase()) {
      continue;
    }
    
    let eV = EMBEDDINGS_DB[word];
    let d = dotProduct(targetVec, eV.vec);
    let mT = magnitude(targetVec);
    let mV = magnitude(eV.vec);
    
    let sim = d / (mT * mV);
    if (sim > bestSim) {
      bestSim = sim;
      bestWord = word;
    }
  }
  
  return {
    result: bestWord,
    similarity: bestSim
  };
}

// --- 3. LSTM SENTIMENT ANALYSIS SIMULATION ---
// Word scoring database for a simple rule-based sequential activation model
const SENTIMENT_LEXICON = {
  "fantastic": 0.9, "brilliant": 0.85, "excellent": 0.8, "amazing": 0.8, "love": 0.75,
  "great": 0.7, "good": 0.5, "awesome": 0.8, "beautiful": 0.6, "happy": 0.5,
  "fun": 0.4, "enjoy": 0.5, "like": 0.3, "recommend": 0.5, "gem": 0.7,
  "bad": -0.5, "boring": -0.6, "worst": -0.9, "terrible": -0.85, "hate": -0.8,
  "awful": -0.8, "horrible": -0.75, "disappointing": -0.65, "poor": -0.5,
  "waste": -0.7, "dreadful": -0.75, "rubbish": -0.6, "ugly": -0.5, "sad": -0.4,
  "not": -0.2, // will act as negative multiplier if followed by positive
  "but": -0.1  // acts as a state attenuator
};

class LSTMSentimentSimulator {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.cellState = 0.0;
    this.hiddenState = 0.0;
    this.history = [];
  }
  
  // Process next token, return cell states & gate activations
  processToken(token) {
    let tok = token.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
    let score = SENTIMENT_LEXICON[tok] || 0.0;
    
    // Forget Gate (f_t) - how much of old cell state to keep
    // If we see transition words like "but", we forget more of the past. Otherwise, keep a lot.
    let f_t = 0.85;
    if (tok === 'but' || tok === 'however') f_t = 0.3;
    
    // Input Gate (i_t) - how much of the new information to write
    // If the word has sentiment, write strongly. Otherwise, ignore.
    let i_t = score !== 0.0 ? 0.9 : 0.1;
    
    // Candidate Cell State (C~_t) - raw new info
    let c_cand = score;
    
    // Update Cell State: C_t = f_t * C_{t-1} + i_t * C~_t
    let oldCell = this.cellState;
    this.cellState = f_t * oldCell + i_t * c_cand;
    
    // Output Gate (o_t) - how much cell state goes to hidden state
    let o_t = 0.8;
    
    // Hidden State: h_t = o_t * tanh(C_t)
    // Tanh approximation
    let tanhC = Math.tanh(this.cellState);
    this.hiddenState = o_t * tanhC;
    
    let stepData = {
      token: token,
      forgetGate: f_t,
      inputGate: i_t,
      candidate: c_cand,
      cellState: this.cellState,
      outputGate: o_t,
      hiddenState: this.hiddenState,
      sentimentScore: this.hiddenState // hidden state represents current sentiment
    };
    
    this.history.push(stepData);
    return stepData;
  }
}

// --- 4. SEQ2SEQ MACHINE TRANSLATION & ATTENTION MECHANISM ---
// High fidelity predefined translations with specific alignment attention matrices
const TRANSLATION_CORPUS = {
  "the cat sat on the mat": {
    target: "le chat était assis sur le tapis",
    // source tokens: ["the", "cat", "sat", "on", "the", "mat"] (len 6)
    // target tokens: ["le", "chat", "était", "assis", "sur", "le", "tapis"] (len 7)
    // attention matrix[target_idx][source_idx]
    attention: [
      [0.85, 0.05, 0.02, 0.01, 0.05, 0.02], // le -> the (0)
      [0.05, 0.90, 0.01, 0.01, 0.01, 0.02], // chat -> cat
      [0.02, 0.01, 0.85, 0.05, 0.02, 0.05], // était -> sat
      [0.01, 0.01, 0.80, 0.10, 0.03, 0.05], // assis -> sat/on
      [0.01, 0.01, 0.05, 0.85, 0.03, 0.05], // sur -> on
      [0.05, 0.02, 0.02, 0.01, 0.80, 0.10], // le -> the (4)
      [0.02, 0.02, 0.05, 0.05, 0.10, 0.76]  // tapis -> mat
    ]
  },
  "natural language processing is fun": {
    target: "le traitement du langage naturel est amusant",
    // source: ["natural", "language", "processing", "is", "fun"] (len 5)
    // target: ["le", "traitement", "du", "langage", "naturel", "est", "amusant"] (len 7)
    attention: [
      [0.10, 0.10, 0.60, 0.10, 0.10], // le -> processing (starts noun phrase)
      [0.05, 0.10, 0.80, 0.02, 0.03], // traitement -> processing
      [0.10, 0.30, 0.40, 0.10, 0.10], // du -> language/processing
      [0.02, 0.90, 0.05, 0.01, 0.02], // langage -> language
      [0.90, 0.05, 0.02, 0.01, 0.02], // naturel -> natural (inverted order in French!)
      [0.01, 0.01, 0.02, 0.92, 0.04], // est -> is
      [0.02, 0.02, 0.02, 0.04, 0.90]  // amusant -> fun
    ]
  },
  "deep learning sequence models are powerful": {
    target: "les modèles de séquence d'apprentissage profond sont puissants",
    // source: ["deep", "learning", "sequence", "models", "are", "powerful"] (len 6)
    // target: ["les", "modèles", "de", "séquence", "d'apprentissage", "profond", "sont", "puissants"] (len 8)
    attention: [
      [0.05, 0.05, 0.05, 0.70, 0.10, 0.05], // les -> models
      [0.02, 0.02, 0.05, 0.85, 0.03, 0.03], // modèles -> models
      [0.05, 0.05, 0.60, 0.20, 0.05, 0.05], // de -> sequence/models
      [0.01, 0.02, 0.88, 0.05, 0.02, 0.02], // séquence -> sequence
      [0.05, 0.75, 0.10, 0.05, 0.02, 0.03], // d'apprentissage -> learning
      [0.85, 0.05, 0.03, 0.02, 0.02, 0.03], // profond -> deep (inverted order!)
      [0.01, 0.01, 0.01, 0.02, 0.85, 0.10], // sont -> are
      [0.02, 0.02, 0.02, 0.02, 0.10, 0.82]  // puissants -> powerful
    ]
  }
};

function getTranslationAndAttention(englishText) {
  let normalized = englishText.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
  // Collapse spaces
  normalized = normalized.split(/\s+/).join(' ');
  
  if (TRANSLATION_CORPUS[normalized]) {
    return {
      sourceTokens: normalized.split(' '),
      targetTokens: TRANSLATION_CORPUS[normalized].target.split(' '),
      matrix: TRANSLATION_CORPUS[normalized].attention
    };
  }
  
  // Mock alignment for custom user input
  let src = englishText.split(/\s+/).filter(t => t.length > 0);
  let tgt = src.map(w => w + "'"); // fake translation output
  let matrix = [];
  
  for (let i = 0; i < tgt.length; i++) {
    let row = [];
    for (let j = 0; j < src.length; j++) {
      // diagonal alignment + some noise
      let dist = Math.abs(i - j);
      let val = Math.exp(-dist) * 0.8 + Math.random() * 0.1;
      row.push(val);
    }
    // normalize row to sum to 1
    let sum = row.reduce((s,v)=>s+v, 0);
    row = row.map(v => v / sum);
    matrix.push(row);
  }
  
  return {
    sourceTokens: src,
    targetTokens: tgt,
    matrix: matrix
  };
}

// --- 5. GENERATIVE NLP: DECODING STRATEGIES ---
// Simple predictive tree database for text generation based on prompt "Artificial intelligence is"
const GPT_CANDIDATES = {
  "<root>": [
    { word: "shaping", prob: 0.35 },
    { word: "changing", prob: 0.28 },
    { word: "becoming", prob: 0.18 },
    { word: "defined", prob: 0.09 },
    { word: "overrated", prob: 0.05 },
    { word: "dangerous", prob: 0.05 }
  ],
  "shaping": [
    { word: "the", prob: 0.50 },
    { word: "our", prob: 0.30 },
    { word: "humanity's", prob: 0.12 },
    { word: "modern", prob: 0.08 }
  ],
  "changing": [
    { word: "how", prob: 0.40 },
    { word: "the", prob: 0.35 },
    { word: "our", prob: 0.15 },
    { word: "society", prob: 0.10 }
  ],
  "becoming": [
    { word: "more", prob: 0.45 },
    { word: "smarter", prob: 0.25 },
    { word: "integrated", prob: 0.18 },
    { word: "autonomous", prob: 0.12 }
  ],
  "defined": [
    { word: "as", prob: 0.60 },
    { word: "by", prob: 0.30 },
    { word: "through", prob: 0.10 }
  ],
  "overrated": [
    { word: "and", prob: 0.50 },
    { word: "because", prob: 0.35 },
    { word: "in", prob: 0.15 }
  ],
  "dangerous": [
    { word: "if", prob: 0.45 },
    { word: "because", prob: 0.35 },
    { word: "for", prob: 0.20 }
  ],
  // Level 3 endings
  "the": [
    { word: "future", prob: 0.65 },
    { word: "world", prob: 0.20 },
    { word: "industry", prob: 0.15 }
  ],
  "our": [
    { word: "lives", prob: 0.55 },
    { word: "society", prob: 0.30 },
    { word: "future", prob: 0.15 }
  ],
  "humanity's": [
    { word: "destiny", prob: 0.70 },
    { word: "course", prob: 0.30 }
  ],
  "modern": [
    { word: "workplace", prob: 0.50 },
    { word: "era", prob: 0.50 }
  ],
  "how": [
    { word: "we", prob: 0.75 },
    { word: "businesses", prob: 0.15 },
    { word: "machines", prob: 0.10 }
  ],
  "society": [
    { word: "rapidly", prob: 0.60 },
    { word: "forever", prob: 0.40 }
  ],
  "more": [
    { word: "prevalent", prob: 0.40 },
    { word: "capable", prob: 0.35 },
    { word: "intelligent", prob: 0.25 }
  ],
  "smarter": [
    { word: "than", prob: 0.80 },
    { word: "every", prob: 0.20 }
  ],
  "integrated": [
    { word: "into", prob: 0.90 },
    { word: "with", prob: 0.10 }
  ],
  "autonomous": [
    { word: "every", prob: 0.60 },
    { word: "agents", prob: 0.40 }
  ],
  "as": [
    { word: "a", prob: 0.85 },
    { word: "the", prob: 0.15 }
  ],
  "by": [
    { word: "its", prob: 0.50 },
    { word: "algorithms", prob: 0.50 }
  ],
  "through": [
    { word: "neural", prob: 0.70 },
    { word: "data", prob: 0.30 }
  ],
  "and": [
    { word: "overhyped", prob: 0.60 },
    { word: "unnecessary", prob: 0.40 }
  ],
  "because": [
    { word: "it", prob: 0.80 },
    { word: "we", prob: 0.20 }
  ],
  "in": [
    { word: "many", prob: 0.70 },
    { word: "terms", prob: 0.30 }
  ],
  "if": [
    { word: "left", prob: 0.65 },
    { word: "unregulated", prob: 0.35 }
  ],
  "for": [
    { word: "human", prob: 0.60 },
    { word: "our", prob: 0.40 }
  ]
};

// Generic next word candidates if we exceed hardcoded paths (random realistic words)
const BACKUP_CANDIDATES = [
  { word: "of", prob: 0.20 },
  { word: "in", prob: 0.15 },
  { word: "and", prob: 0.12 },
  { word: "to", prob: 0.10 },
  { word: "with", prob: 0.08 },
  { word: "systems", prob: 0.07 },
  { word: "daily", prob: 0.05 },
  { word: "development", prob: 0.05 },
  { word: "global", prob: 0.04 },
  { word: "ethics", prob: 0.04 }
];

function getNextCandidates(currentWord) {
  let candidates = GPT_CANDIDATES[currentWord];
  if (!candidates) {
    // Return backup candidates with some random perturbation so it is dynamic
    return BACKUP_CANDIDATES.map(c => ({
      word: c.word,
      prob: c.prob + (Math.random() * 0.04 - 0.02)
    })).sort((a,b) => b.prob - a.prob);
  }
  return candidates;
}

// Decode Word based on different strategies:
// 1. Greedy: Take highest prob
// 2. Beam Search: (Will simulate keeping 2 best beams)
// 3. Top-K: Restrict to top K words, re-normalize, sample
// 4. Nucleus: Restrict to cumulative sum <= P, re-normalize, sample
function decodeNextWord(currentWord, strategy, paramK = 3, paramP = 0.85) {
  let candidates = getNextCandidates(currentWord);
  
  if (strategy === 'greedy') {
    let chosen = candidates[0];
    return {
      chosen: chosen.word,
      options: candidates.slice(0, 4), // return top 4 for visual tree
      selectedIdx: 0
    };
  }
  
  if (strategy === 'topk') {
    // Restrict candidates to top K
    let k = Math.min(paramK, candidates.length);
    let topKCandidates = candidates.slice(0, k);
    
    // Re-normalize probabilities
    let sum = topKCandidates.reduce((s, c) => s + c.prob, 0);
    let normalized = topKCandidates.map(c => ({ word: c.word, prob: c.prob / sum }));
    
    // Sample
    let rand = Math.random();
    let cumulative = 0;
    let selectedIdx = 0;
    for (let i = 0; i < normalized.length; i++) {
      cumulative += normalized[i].prob;
      if (rand <= cumulative) {
        selectedIdx = i;
        break;
      }
    }
    
    return {
      chosen: topKCandidates[selectedIdx].word,
      options: candidates.slice(0, 4).map(c => {
        let isTopK = topKCandidates.some(tk => tk.word === c.word);
        return { ...c, eligible: isTopK };
      }),
      selectedIdx: selectedIdx
    };
  }
  
  if (strategy === 'nucleus') {
    // Nucleus Sampling (Top-P)
    let cumulative = 0;
    let eligibleCandidates = [];
    
    for (let i = 0; i < candidates.length; i++) {
      cumulative += candidates[i].prob;
      eligibleCandidates.push(candidates[i]);
      if (cumulative >= paramP) {
        break;
      }
    }
    
    // If empty (safety), take first one
    if (eligibleCandidates.length === 0) eligibleCandidates = [candidates[0]];
    
    // Re-normalize
    let sum = eligibleCandidates.reduce((s, c) => s + c.prob, 0);
    let normalized = eligibleCandidates.map(c => ({ word: c.word, prob: c.prob / sum }));
    
    let rand = Math.random();
    let tempCum = 0;
    let selectedIdx = 0;
    for (let i = 0; i < normalized.length; i++) {
      tempCum += normalized[i].prob;
      if (rand <= tempCum) {
        selectedIdx = i;
        break;
      }
    }
    
    return {
      chosen: eligibleCandidates[selectedIdx].word,
      options: candidates.slice(0, 4).map(c => {
        let isEligible = eligibleCandidates.some(ec => ec.word === c.word);
        return { ...c, eligible: isEligible };
      }),
      // find index in the original candidates list for visualization
      selectedIdx: candidates.indexOf(eligibleCandidates[selectedIdx])
    };
  }
  
  // Default fallback (greedy)
  return {
    chosen: candidates[0].word,
    options: candidates.slice(0, 4),
    selectedIdx: 0
  };
}

// Export modules to window global object so app.js can access them
window.nlpEngine = {
  STOPWORDS,
  stemWord,
  lemmatizeWord,
  cleanAndTokenize,
  computeTfIdfMatrix,
  EMBEDDINGS_DB,
  cosineSimilarity,
  solveAnalogy,
  LSTMSentimentSimulator,
  getTranslationAndAttention,
  decodeNextWord
};
