/* ==========================================================================
   NLP Learning Hub - Main App Script
   Handles navigation, syllabus data, progress tracking, quiz, and simulators UI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation tabs
  initNavigation();
  
  // Syllabus & Curriculum loading
  initSyllabus();
  
  // LocalStorage Progress Tracker
  initTracker();
  
  // Quiz/Assessment Engine
  initQuiz();
  
  // Interactive Simulators Setup
  initSimulatorsUI();
});

// --- navigation routing ---
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-item button');
  const sections = document.querySelectorAll('.view-section');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update active nav button
      document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
      btn.parentElement.classList.add('active');
      
      // Update active section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetTab) {
          section.classList.add('active');
        }
      });
      
      // Special canvas re-draw if entering Embeddings Explorer
      if (targetTab === 'playgrounds') {
        setTimeout(drawEmbeddingSpace, 150);
      }
      
      showToast(`Navigated to ${btn.innerText.trim()}`);
    });
  });
}

// --- toast alert helper ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  
  // Automatically remove after 3s (animation is 3s total)
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// --- syllabus dataset ---
const SYLLABUS_DATA = {
  outcomes: [
    { code: "CO1", title: "Foundations of NLP", desc: "Understand the origin, evolution, and linguistic foundations of Natural Language Processing." },
    { code: "CO2", title: "Word Representations", desc: "Understand word embeddings, semantic relationships, and embedding visualization techniques." },
    { code: "CO3", title: "DL Sequence Models", desc: "Apply deep learning sequence models for NLP to text and sentiment classification tasks." },
    { code: "CO4", title: "Seq2Seq & Attention", desc: "Apply seq2seq models with attention for translation and summarization tasks." },
    { code: "CO5", title: "Transformers & Pretrained LMs", desc: "Use transformer architectures and pretrained language models for fine-tuned NLP tasks." },
    { code: "CO6", title: "Generative NLP & LLMs", desc: "Apply generative NLP and large language models for text generation and evaluation tasks, considering explainability and hallucination." }
  ],
  units: [
    {
      id: 1,
      num: "Unit I",
      title: "Foundations of NLP & Text Processing",
      topics: [
        { cat: "Foundations", items: ["origin of NLP", "language and grammar", "linguistic essentials", "morphology", "syntax", "semantics", "challenges of NLP", "applications of NLP"] },
        { cat: "Text Processing", items: ["tokenization", "stemming", "lemmatization", "stop-word removal", "punctuation handling", "handling out-of-vocabulary words", "normalization", "Bag-of-Words", "n-grams", "TF-IDF"] }
      ]
    },
    {
      id: 2,
      num: "Unit II",
      title: "Word Embeddings and Vector Representations",
      topics: [
        { cat: "Embeddings", items: ["vector space models", "dense word embeddings", "Word2Vec", "CBOW", "Skip-Gram models", "GloVe embeddings"] },
        { cat: "Visualizations & Similarity", items: ["capturing semantic similarity", "analogy relationships", "visualizing embedding spaces", "PCA dimensional reduction", "t-SNE mapping"] }
      ]
    },
    {
      id: 3,
      num: "Unit III",
      title: "Deep Learning Sequence Models for NLP",
      topics: [
        { cat: "Architectures", items: ["sequential text data", "recurrent neural networks (RNN)", "long short term memory networks (LSTM)", "gated recurrent units (GRU)", "bidirectional RNNs"] },
        { cat: "Applications & Training", items: ["sequence modeling applications", "sentiment classification", "text classification", "teacher forcing", "truncated backpropagation through time (BPTT)", "evaluation metrics for sequence tasks"] }
      ]
    },
    {
      id: 4,
      num: "Unit IV",
      title: "Sequence-to-Sequence Models and Attention",
      topics: [
        { cat: "Translation & Attention", items: ["encoder–decoder architectures", "machine translation", "summarization", "attention in deep NLP", "soft attention", "Bahdanau attention", "Luong attention"] },
        { cat: "Metrics & Limits", items: ["integrating attention into networks", "evaluation techniques", "BLEU score", "ROUGE score", "limitations of classical seq2seq"] }
      ]
    },
    {
      id: 5,
      num: "Unit V",
      title: "Transformers & Pretrained Language Models",
      topics: [
        { cat: "Transformer Core", items: ["transformer architecture", "self-attention", "multi-head attention", "positional encoding", "encoder & decoder blocks", "Byte-Pair Encoding (BPE)", "WordPiece tokenization"] },
        { cat: "Pretrained LMs", items: ["BERT architecture", "GPT modeling", "T5 framework", "masked language modeling (MLM)", "next sentence prediction (NSP)", "causal language modeling", "transfer learning", "fine-tuning QA/NER/Classification", "HuggingFace Transformers"] }
      ]
    },
    {
      id: 6,
      num: "Unit VI",
      title: "Generative NLP and LLMs",
      topics: [
        { cat: "Generation Strategies", items: ["generative NLP models", "greedy search", "beam search", "top-k sampling", "nucleus sampling (top-p)", "instruction-tuned LLMs"] },
        { cat: "Behaviors & Metrics", items: ["summarization behaviors", "dialogue generation", "reasoning tasks", "perplexity metrics", "human judgment measures", "explainability", "hallucination in LLMs"] }
      ]
    }
  ],
  experiments: [
    { id: "exp1", title: "Preprocessing & Vectorization Pipeline (BoW / TF-IDF)", desc: "Build pipeline showing tokenization, stopword removal, stemming/lemmatization, and numerical representation." },
    { id: "exp2", title: "Pretrained Embeddings Dimensionality Reduction", desc: "Load GloVe/Word2Vec, select semantic words, compute coordinates, and visualize 2D clusters using PCA/t-SNE." },
    { id: "exp3", title: "CBOW & Skip-Gram Word2Vec Model Comparison", desc: "Train on small text corpus, compute word similarities/analogies, and compare training convergence." },
    { id: "exp4", title: "LSTM Sentiment Classifier vs Vectorization Baseline", desc: "Build LSTM sentiment classifier on IMDB movie reviews/Spam dataset and compare F1 against BoW baseline." },
    { id: "exp5", title: "Bidirectional LSTM for Named Entity Recognition", desc: "Train sequence labeling model on CoNLL-2003 dataset to categorize entities (Person, Location, Org)." },
    { id: "exp6", title: "Seq2Seq Machine Translator with Bahdanau/Luong Attention", desc: "Implement English-French translator with attention map and evaluate impact of attention weights." },
    { id: "exp7", title: "Attention-Based Headline Summarizer with ROUGE Scores", desc: "Build summarization network, train on news headlines, and calculate ROUGE-1/2/L metrics." },
    { id: "exp8", title: "Pretrained BERT Fine-Tuning for Sentiment Tasks", desc: "Fine-tune BERT using HuggingFace, evaluate on IMDB Reviews, and analyze contextual embeddings impact." },
    { id: "exp9", title: "GPT-2 prompt-based Text Generation & Decoding Comparison", desc: "Load GPT-2, implement greedy/beam/nucleus decoding, and compare generated output coherence." }
  ]
};

// --- initialize syllabus & outcomes elements ---
function initSyllabus() {
  // 1. Render CO Cards on dashboard & syllabus
  const dashboardCOGrid = document.getElementById('dashboard-co-grid');
  const syllabusCOGrid = document.getElementById('syllabus-co-grid');
  
  if (dashboardCOGrid && syllabusCOGrid) {
    dashboardCOGrid.innerHTML = '';
    syllabusCOGrid.innerHTML = '';
    
    SYLLABUS_DATA.outcomes.forEach(co => {
      const coHtml = `
        <div class="co-card">
          <span class="co-badge">${co.code}</span>
          <h4 class="co-title">${co.title}</h4>
          <p class="co-desc">${co.desc}</p>
        </div>
      `;
      dashboardCOGrid.insertAdjacentHTML('beforeend', coHtml);
      syllabusCOGrid.insertAdjacentHTML('beforeend', coHtml);
    });
  }
  
  // 2. Render Units Accordion
  const unitsContainer = document.getElementById('units-accordion');
  if (unitsContainer) {
    unitsContainer.innerHTML = '';
    
    SYLLABUS_DATA.units.forEach(unit => {
      let subtopicsHtml = '';
      unit.topics.forEach(sub => {
        let tagHtml = sub.items.map(item => `<span class="syllabus-tag">${item}</span>`).join('');
        subtopicsHtml += `
          <div class="syllabus-subtopic-block">
            <h4>${sub.cat}</h4>
            <div class="syllabus-subtopic-list">
              ${tagHtml}
            </div>
          </div>
        `;
      });
      
      const unitHtml = `
        <div class="unit-card" id="unit-card-${unit.id}">
          <div class="unit-header" onclick="toggleUnit(${unit.id})">
            <div class="unit-title-group">
              <span class="unit-number">${unit.num}</span>
              <span class="unit-title">${unit.title}</span>
            </div>
            <div class="unit-chevron">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          <div class="unit-body">
            <div class="unit-content">
              ${subtopicsHtml}
            </div>
          </div>
        </div>
      `;
      unitsContainer.insertAdjacentHTML('beforeend', unitHtml);
    });
    
    // Open Unit 1 by default
    toggleUnit(1);
  }
}

// Accordion helper
window.toggleUnit = function(unitId) {
  const cards = document.querySelectorAll('.unit-card');
  cards.forEach(card => {
    if (card.id === `unit-card-${unitId}`) {
      card.classList.toggle('active');
    } else {
      card.classList.remove('active');
    }
  });
};

// --- progress tracker engine ---
function initTracker() {
  const listContainer = document.getElementById('checklist-container');
  if (!listContainer) return;
  
  listContainer.innerHTML = '';
  
  // Combine Syllabus Units and Experiments into checklists
  const items = [];
  
  SYLLABUS_DATA.units.forEach(u => {
    items.push({ id: `unit_${u.id}`, type: "Theory Unit", title: `${u.num}: ${u.title}`, desc: `Topics include: ${u.topics[0].items.slice(0, 3).join(', ')}...` });
  });
  
  SYLLABUS_DATA.experiments.forEach((e, idx) => {
    items.push({ id: `exp_${e.id}`, type: "Experiment", title: `Practical ${idx + 1}: ${e.title}`, desc: e.desc });
  });
  
  // Load progress state
  let progressState = JSON.parse(localStorage.getItem('nlp_hub_progress')) || {};
  
  items.forEach(item => {
    const isChecked = progressState[item.id] ? 'checked' : '';
    const completedClass = progressState[item.id] ? 'completed' : '';
    
    const itemHtml = `
      <div class="tracker-item ${completedClass}" id="item-row-${item.id}">
        <div class="tracker-left">
          <input type="checkbox" class="tracker-checkbox" id="chk-${item.id}" ${isChecked} onchange="toggleTrackedItem('${item.id}')">
          <div>
            <span class="badge ${item.type.includes('Experiment') ? 'badge-cyan' : 'badge-indigo'}" style="margin-bottom: 0.25rem;">${item.type}</span>
            <div class="tracker-text">${item.title}</div>
            <div class="tracker-desc">${item.desc}</div>
          </div>
        </div>
      </div>
    `;
    listContainer.insertAdjacentHTML('beforeend', itemHtml);
  });
  
  updateDashboardProgress();
}

window.toggleTrackedItem = function(itemId) {
  let progressState = JSON.parse(localStorage.getItem('nlp_hub_progress')) || {};
  const checkbox = document.getElementById(`chk-${itemId}`);
  const row = document.getElementById(`item-row-${itemId}`);
  
  if (checkbox.checked) {
    progressState[itemId] = true;
    row.classList.add('completed');
  } else {
    delete progressState[itemId];
    row.classList.remove('completed');
  }
  
  localStorage.setItem('nlp_hub_progress', JSON.stringify(progressState));
  updateDashboardProgress();
};

function updateDashboardProgress() {
  const totalItems = SYLLABUS_DATA.units.length + SYLLABUS_DATA.experiments.length;
  let progressState = JSON.parse(localStorage.getItem('nlp_hub_progress')) || {};
  const completedCount = Object.keys(progressState).length;
  
  const pct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  
  // Update UI Elements
  const percentText = document.getElementById('completion-percent');
  const progressBar = document.getElementById('completion-bar');
  const countText = document.getElementById('completion-count');
  
  if (percentText) percentText.innerText = `${pct}%`;
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (countText) countText.innerText = `${completedCount} of ${totalItems} modules complete`;
  
  // Dashboard card metric
  const dashboardStat = document.getElementById('stat-progress-pct');
  if (dashboardStat) dashboardStat.innerText = `${pct}%`;
}

// Reset curriculum progress
window.resetProgress = function() {
  if (confirm("Are you sure you want to reset all completion trackers?")) {
    localStorage.removeItem('nlp_hub_progress');
    initTracker();
    showToast("Progress logs cleared.");
  }
};

// --- assessments & quiz engine ---
const QUIZ_QUESTIONS = [
  {
    question: "Which pre-processing technique involves mapping word variations back to their true dictionary base forms rather than simple truncation?",
    options: ["Stemming", "Lemmatization", "Stop-Word Removal", "Tokenization"],
    correct: 1,
    explanation: "Lemmatization uses vocabulary and morphological analysis to return dictionary base forms (lemmas), whereas Stemming applies crude rules to chop off endings (which often generates non-words)."
  },
  {
    question: "In the skip-gram variant of Word2Vec, what is the core optimization objective?",
    options: [
      "Predict context words given a target word",
      "Predict a target word given context words",
      "Minimize document cosine similarities",
      "Maximize dimensional projection outputs"
    ],
    correct: 0,
    explanation: "Skip-gram trains weights to predict surrounding context words using a central target word as input. CBOW does the inverse: predicts target using context."
  },
  {
    question: "Why do standard Recurrent Neural Networks (RNNs) struggle with capturing long-range historical text dependencies?",
    options: [
      "Vanishing and Exploding Gradients during backpropagation",
      "Inability to feed weights backward in sequence training",
      "Underfitting on small bag-of-words document indexes",
      "High density representations in sparse matrix pipelines"
    ],
    correct: 0,
    explanation: "As sequences grow long, backpropagating gradients through time (BPTT) leads to successive matrix multiplications, causing gradients to vanish or explode, which wipes out structural memory. LSTMs solve this using gating pathways."
  },
  {
    question: "Which attention mechanism computes alignment weights dynamically using a trainable additive multilayer perceptron (MLP)?",
    options: ["Soft dot-product attention", "Bahdanau attention", "Luong attention", "Self-attention transformer blocks"],
    correct: 1,
    explanation: "Bahdanau (additive) attention computes alignment alignment scores between decoder state and encoder states using a feedforward neural layer with tanh activation. Luong uses multiplicative dot-product."
  },
  {
    question: "What is the primary role of Masked Language Modeling (MLM) during BERT's pre-training?",
    options: [
      "Force causal word-by-word generation left-to-right",
      "Train model to predict hidden tokens bidirectionally using contexts on both sides",
      "Generate multiple summaries to calculate high-score ROUGE benchmarks",
      "Evaluate hallucination metrics for zero-shot query prompts"
    ],
    correct: 1,
    explanation: "By masking random input words, BERT is forced to inspect surrounding context bidirectionally (both left and right) to guess the hidden words, building deep contextual representations."
  },
  {
    question: "During LLM text generation, how does Nucleus (Top-p) Sampling differ from standard Top-k Sampling?",
    options: [
      "It samples from a dynamic set of words whose cumulative probability exceeds threshold p",
      "It restricts choices strictly to a fixed count of words regardless of probabilities",
      "It searches for multiple parallel translation beams simultaneously",
      "It evaluates word perplexity scores using human scoring metrics"
    ],
    correct: 0,
    explanation: "Top-p sampling selects from a dynamic size list of words representing the top cumulative probability threshold p, ensuring highly certain steps select few words, while uncertain steps expand options dynamically."
  }
];

let currentQuestionIdx = 0;
let quizScore = 0;
let userAnswers = [];

function initQuiz() {
  const quizCard = document.getElementById('active-quiz-card');
  if (!quizCard) return;
  
  // Show Start screen
  renderQuizStart();
}

function renderQuizStart() {
  const container = document.getElementById('active-quiz-card');
  container.innerHTML = `
    <div class="quiz-result-box" style="padding: 1.5rem 0;">
      <h3 style="font-size: 1.5rem; color: white; margin-bottom: 1rem;">NLP Assessment Center</h3>
      <p style="color: var(--text-muted); margin-bottom: 2rem;">
        Test your concepts across the syllabus (Units I - VI) including Tokenization, Embeddings, Recurrent Networks, Attention alignment, BERT, and LLM text generation strategies.
      </p>
      <button class="btn btn-primary" onclick="startQuiz()">Start Self Assessment</button>
    </div>
  `;
}

window.startQuiz = function() {
  currentQuestionIdx = 0;
  quizScore = 0;
  userAnswers = [];
  renderQuizQuestion();
};

function renderQuizQuestion() {
  const container = document.getElementById('active-quiz-card');
  const q = QUIZ_QUESTIONS[currentQuestionIdx];
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((currentQuestionIdx / total) * 100);
  
  // Build options
  let optionsHtml = q.options.map((opt, idx) => `
    <button class="quiz-option" onclick="selectQuizOption(${idx})">
      <span>${opt}</span>
      <span class="opt-marker" id="opt-marker-${idx}"></span>
    </button>
  `).join('');
  
  container.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${pct}%;"></div>
    </div>
    <div class="quiz-info">
      <span>QUESTION ${currentQuestionIdx + 1} OF ${total}</span>
      <span>${pct}% COMPLETE</span>
    </div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
    <div id="quiz-feedback-box" class="quiz-feedback" style="display: none;"></div>
    <div class="quiz-actions">
      <div></div>
      <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="advanceQuiz()">
        <span>${currentQuestionIdx === total - 1 ? 'Finish Assessment' : 'Next Question'}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  `;
}

window.selectQuizOption = function(optionIdx) {
  const q = QUIZ_QUESTIONS[currentQuestionIdx];
  const nextBtn = document.getElementById('quiz-next-btn');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const options = document.querySelectorAll('.quiz-option');
  
  // Lock choices
  options.forEach((optBtn, idx) => {
    optBtn.onclick = null; // disable further clicks
    if (idx === q.correct) {
      optBtn.classList.add('correct');
    } else if (idx === optionIdx) {
      optBtn.classList.add('incorrect');
    }
  });
  
  let isCorrect = optionIdx === q.correct;
  if (isCorrect) {
    quizScore++;
  }
  userAnswers.push(optionIdx);
  
  // Show feedback
  feedbackBox.style.display = 'block';
  if (isCorrect) {
    feedbackBox.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
  } else {
    feedbackBox.innerHTML = `<strong>Incorrect.</strong> The correct answer was <em>"${q.options[q.correct]}"</em>.<br>${q.explanation}`;
  }
  
  nextBtn.style.display = 'inline-flex';
};

window.advanceQuiz = function() {
  currentQuestionIdx++;
  if (currentQuestionIdx < QUIZ_QUESTIONS.length) {
    renderQuizQuestion();
  } else {
    renderQuizResults();
  }
};

function renderQuizResults() {
  const container = document.getElementById('active-quiz-card');
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((quizScore / total) * 100);
  
  let ratingMsg = "";
  if (pct >= 85) ratingMsg = "Excellent! You have a deep understanding of core NLP architectures.";
  else if (pct >= 60) ratingMsg = "Well done! A few concepts could benefit from a second read.";
  else ratingMsg = "Keep practicing. Take another look at the unit curriculum topics and try again.";
  
  container.innerHTML = `
    <div class="quiz-result-box">
      <div class="quiz-result-score">${quizScore}/${total}</div>
      <h3 style="font-size: 1.5rem; color: white; margin-bottom: 0.5rem;">Assessment Complete</h3>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 500px; margin-left: auto; margin-right: auto;">
        ${ratingMsg}
      </p>
      <div style="margin-bottom: 2rem;">
        <span class="badge ${pct >= 60 ? 'badge-indigo' : 'badge-outline'}">SCORE RATE: ${pct}%</span>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-secondary" onclick="startQuiz()">Retry Quiz</button>
        <button class="btn btn-primary" onclick="window.toggleTrackedItem('quiz_attempt'); showToast('Saved completion status!')">Mark Complete</button>
      </div>
    </div>
  `;
}

// --- interactive simulators playgrounds ui integration ---
let selectedEmbeddingWord = null;
let cbowSentence = "the quick brown fox jumps over the lazy dog";
let cbowIndex = 2; // target "brown"
let lstmTokenIndex = 0;
let lstmInstance = null;
let lstmInterval = null;

function initSimulatorsUI() {
  // Navigation for Playgrounds inner sidebar
  const playBtns = document.querySelectorAll('.playground-nav-btn');
  const playPanels = document.querySelectorAll('.playground-panel');
  
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playBtns.forEach(b => b.classList.remove('active'));
      playPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = btn.getAttribute('data-playground');
      document.getElementById(`playground-${targetPanel}`).classList.add('active');
      
      if (targetPanel === 'embeddings') {
        setTimeout(drawEmbeddingSpace, 50);
      }
      showToast(`Switched Playground to: ${btn.querySelector('span:not(.lbl)').innerText}`);
    });
  });
  
  // -- Simulator 1: Preprocessor & Vectorizer --
  const runPreprocBtn = document.getElementById('run-preproc-btn');
  if (runPreprocBtn) {
    runPreprocBtn.addEventListener('click', runPreprocessingSimulation);
    // run default
    runPreprocessingSimulation();
  }
  
  // -- Simulator 2: Embeddings Similarity & Analogy --
  const analogyBtn = document.getElementById('run-analogy-btn');
  if (analogyBtn) {
    analogyBtn.addEventListener('click', runAnalogySimulation);
  }
  
  // -- Simulator 3: CBOW vs Skipgram Window --
  const cbowText = document.getElementById('cbow-text-input');
  if (cbowText) {
    cbowText.addEventListener('input', () => {
      cbowSentence = cbowText.value;
      cbowIndex = Math.min(2, cbowSentence.split(/\s+/).filter(w => w.length > 0).length - 1);
      renderCbowWindow();
    });
  }
  renderCbowWindow();
  
  // -- Simulator 4: LSTM Sentiment --
  const runSentimentBtn = document.getElementById('lstm-start-btn');
  if (runSentimentBtn) {
    runSentimentBtn.addEventListener('click', startLSTMSimulation);
  }
  
  // -- Simulator 5: Attention Seq2Seq Translator --
  const runTranslateBtn = document.getElementById('translate-btn');
  if (runTranslateBtn) {
    runTranslateBtn.addEventListener('click', runTranslationSimulation);
  }
  const sentenceSelect = document.getElementById('translation-sentence-select');
  if (sentenceSelect) {
    sentenceSelect.addEventListener('change', () => {
      if (sentenceSelect.value) {
        document.getElementById('translation-input').value = sentenceSelect.value;
        runTranslationSimulation();
      }
    });
    // Run default
    runTranslationSimulation();
  }
  
  // -- Simulator 6: GPT Text Decoder --
  const runGptBtn = document.getElementById('gpt-decode-btn');
  if (runGptBtn) {
    runGptBtn.addEventListener('click', runGPTDecodingSimulation);
  }
  runGPTDecodingSimulation();
}

// -------------------------------------------------------------
// Play 1: Preprocessing & TF-IDF
// -------------------------------------------------------------
function runPreprocessingSimulation() {
  const text = document.getElementById('preproc-text-input').value;
  const tokenContainer = document.getElementById('preproc-tokens');
  const tableHead = document.getElementById('preproc-vocab-headers');
  const tableBody = document.getElementById('preproc-matrix-body');
  
  if (!text.trim()) {
    showToast("Please enter some text!");
    return;
  }
  
  // Tokenize
  const rawTokens = text.split(/\s+/).filter(t => t.length > 0);
  tokenContainer.innerHTML = '';
  
  rawTokens.forEach(t => {
    let w = t.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
    let isStop = window.nlpEngine.STOPWORDS.has(w);
    let stem = window.nlpEngine.stemWord(w);
    let lemma = window.nlpEngine.lemmatizeWord(w);
    
    let badgeClass = isStop ? 'stopword' : '';
    let badgeText = isStop ? 'Stopword' : 'Token';
    let styleAttr = isStop ? 'background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2)' : 'background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.2)';
    
    let html = `
      <div class="tok-card" style="${styleAttr}">
        <span class="tok-orig">${t}</span>
        <span class="tok-sub">Stem: ${stem}</span>
        <span class="tok-sub">Lemma: ${lemma}</span>
        <span class="tok-badge" style="background: ${isStop ? 'var(--danger)' : 'var(--success)'}; color: white">${badgeText}</span>
      </div>
    `;
    tokenContainer.insertAdjacentHTML('beforeend', html);
  });
  
  // Run TF-IDF comparison matrix
  // Generate comparison document texts
  const sampleDocs = [
    "Natural language processing embeddings allow sequence classification modeling.",
    "BERT and GPT-2 are transformer neural networks built with self-attention decoder layers.",
    "Neural machine translation seq2seq models use Bahdanau attention weight translation matrices."
  ];
  
  const tfidfResult = window.nlpEngine.computeTfIdfMatrix(text, sampleDocs);
  
  // Render TF-IDF headers
  tableHead.innerHTML = '<th>Document Source</th>';
  // limit to top 15 words to prevent rendering 100 horizontal items
  const maxVocabLength = Math.min(15, tfidfResult.vocab.length);
  const displayVocab = tfidfResult.vocab.slice(0, maxVocabLength);
  
  displayVocab.forEach(v => {
    tableHead.insertAdjacentHTML('beforeend', `<th>${v}</th>`);
  });
  if (tfidfResult.vocab.length > maxVocabLength) {
    tableHead.insertAdjacentHTML('beforeend', '<th>... (more)</th>');
  }
  
  // Render Rows
  tableBody.innerHTML = '';
  tfidfResult.tfidf.forEach((row, docIdx) => {
    let docLabel = docIdx === 0 ? "<strong>User Input Doc</strong>" : `Reference Corpus Doc #${docIdx}`;
    let rowHtml = `<tr><td class="word-label">${docLabel}</td>`;
    
    displayVocab.forEach(v => {
      let val = row[v] || 0.0;
      rowHtml += `<td>${val.toFixed(3)}</td>`;
    });
    if (tfidfResult.vocab.length > maxVocabLength) {
      rowHtml += `<td>-</td>`;
    }
    rowHtml += '</tr>';
    tableBody.insertAdjacentHTML('beforeend', rowHtml);
  });
}

// -------------------------------------------------------------
// Play 2: Embeddings Canvas Plot
// -------------------------------------------------------------
function drawEmbeddingSpace() {
  const canvas = document.getElementById('embeddings-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = 360 * dpr; // locked height
  ctx.scale(dpr, dpr);
  
  ctx.clearRect(0, 0, rect.width, 360);
  
  const centerX = rect.width / 2;
  const centerY = 180;
  
  // Draw grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < rect.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 360);
    ctx.stroke();
  }
  for (let y = 0; y < 360; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rect.width, y);
    ctx.stroke();
  }
  
  // Draw axes
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(rect.width, centerY);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, 360);
  ctx.stroke();
  
  // Draw words
  const db = window.nlpEngine.EMBEDDINGS_DB;
  
  for (let word in db) {
    const data = db[word];
    // Map relative coordinate (e.g. -200 to +200) to actual canvas pixel coordinates
    const px = centerX + data.x;
    const py = centerY + data.y;
    
    // Choose color by category
    let color = '#fff';
    if (data.cat === 'Royalty') color = 'var(--secondary-color)';
    else if (data.cat === 'Technology') color = 'var(--accent-cyan)';
    else if (data.cat === 'Nature') color = 'var(--success)';
    else if (data.cat === 'Emotion') color = 'var(--accent-pink)';
    else if (data.cat === 'Gender') color = '#e2e8f0';
    
    // Draw dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight if selected
    if (selectedEmbeddingWord === word) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI*2);
      ctx.stroke();
    }
    
    // Draw Text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = "500 11px var(--font-sans)";
    ctx.fillText(word, px + 10, py + 4);
  }
}

// Bind canvas click event
const canvasEl = document.getElementById('embeddings-canvas');
if (canvasEl) {
  canvasEl.addEventListener('click', (e) => {
    const rect = canvasEl.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = 180;
    
    const db = window.nlpEngine.EMBEDDINGS_DB;
    let closestWord = null;
    let closestDist = 20; // click tolerance
    
    for (let word in db) {
      const data = db[word];
      const px = centerX + data.x;
      const py = centerY + data.y;
      
      const dist = Math.hypot(clickX - px, clickY - py);
      if (dist < closestDist) {
        closestDist = dist;
        closestWord = word;
      }
    }
    
    if (closestWord) {
      selectedEmbeddingWord = closestWord;
      drawEmbeddingSpace();
      updateSimilarityDisplay();
    }
  });
}

function updateSimilarityDisplay() {
  const resultPanel = document.getElementById('similarity-output-box');
  if (!selectedEmbeddingWord) return;
  
  const db = window.nlpEngine.EMBEDDINGS_DB;
  const selfData = db[selectedEmbeddingWord];
  
  // Calculate similarity to all other words
  let similarityList = [];
  for (let word in db) {
    if (word === selectedEmbeddingWord) continue;
    let score = window.nlpEngine.cosineSimilarity(selectedEmbeddingWord, word);
    similarityList.push({ word, score });
  }
  
  // Sort descending
  similarityList.sort((a,b) => b.score - a.score);
  
  let listHtml = similarityList.slice(0, 4).map(item => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem">
      <span style="font-family: var(--font-mono); color: white">${item.word}</span>
      <span style="color: var(--accent-cyan); font-weight:600">${item.score.toFixed(4)}</span>
    </div>
  `).join('');
  
  resultPanel.innerHTML = `
    <div style="margin-bottom: 0.75rem;">
      Selected: <strong style="color: white; font-family: var(--font-mono); text-transform: uppercase;">${selectedEmbeddingWord}</strong>
      <span class="badge badge-outline" style="margin-left: 0.5rem;">${selfData.cat}</span>
    </div>
    <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; font-weight:700">COSINE SIMILARITIES:</div>
    ${listHtml}
  `;
}

function runAnalogySimulation() {
  const wA = document.getElementById('analogy-a').value.trim().toLowerCase();
  const wB = document.getElementById('analogy-b').value.trim().toLowerCase();
  const wC = document.getElementById('analogy-c').value.trim().toLowerCase();
  const resField = document.getElementById('analogy-result-word');
  const resConf = document.getElementById('analogy-result-conf');
  
  if (!wA || !wB || !wC) {
    showToast("Please enter all 3 query words!");
    return;
  }
  
  const result = window.nlpEngine.solveAnalogy(wA, wB, wC);
  
  if (result) {
    resField.innerText = result.result.toUpperCase();
    resConf.innerText = `(Cosine similarity: ${result.similarity.toFixed(4)})`;
    
    // Highlight result on canvas
    selectedEmbeddingWord = result.result;
    drawEmbeddingSpace();
    
    // Draw analogy line in Canvas!
    drawAnalogyVectors(wA, wB, wC, result.result);
    showToast(`Analogy computed: ${wA} - ${wB} + ${wC} = ${result.result}`);
  } else {
    resField.innerText = "N/A";
    resConf.innerText = "(Words not found in vocabulary)";
  }
}

function drawAnalogyVectors(wA, wB, wC, wD) {
  const canvas = document.getElementById('embeddings-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  const centerX = rect.width / 2;
  const centerY = 180;
  
  const db = window.nlpEngine.EMBEDDINGS_DB;
  const pA = db[wA];
  const pB = db[wB];
  const pC = db[wC];
  const pD = db[wD];
  
  if (!pA || !pB || !pC || !pD) return;
  
  // Re-draw grid/base first
  drawEmbeddingSpace();
  
  // Draw vector math lines: A -> B, then C -> D (representing translation vector)
  ctx.strokeStyle = 'var(--accent-pink)';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([4, 4]);
  
  // Vector 1: B -> A (subtraction)
  ctx.beginPath();
  ctx.moveTo(centerX + pB.x, centerY + pB.y);
  ctx.lineTo(centerX + pA.x, centerY + pA.y);
  ctx.stroke();
  
  // Vector 2: C -> D (parallel transition)
  ctx.strokeStyle = 'var(--accent-cyan)';
  ctx.beginPath();
  ctx.moveTo(centerX + pC.x, centerY + pC.y);
  ctx.lineTo(centerX + pD.x, centerY + pD.y);
  ctx.stroke();
  ctx.setLineDash([]);
}

// -------------------------------------------------------------
// Play 3: CBOW vs Skipgram Window slider
// -------------------------------------------------------------
window.stepCbow = function(direction) {
  const words = cbowSentence.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return;
  
  cbowIndex += direction;
  if (cbowIndex < 0) cbowIndex = words.length - 1;
  if (cbowIndex >= words.length) cbowIndex = 0;
  
  renderCbowWindow();
};

function renderCbowWindow() {
  const displayBox = document.getElementById('cbow-node-display');
  const pairBox = document.getElementById('cbow-pairs-output');
  const selectMode = document.getElementById('cbow-mode').value;
  const words = cbowSentence.split(/\s+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    displayBox.innerHTML = '<div style="color: var(--text-muted)">Please enter text above.</div>';
    pairBox.innerHTML = '';
    return;
  }
  
  displayBox.innerHTML = '';
  
  const windowSize = 2; // Fixed window size of 2 on each side
  const activePairs = [];
  
  words.forEach((w, idx) => {
    let nodeClass = '';
    const isTarget = idx === cbowIndex;
    const isContext = Math.abs(idx - cbowIndex) <= windowSize && !isTarget;
    
    if (isTarget) {
      nodeClass = 'target';
    } else if (isContext) {
      nodeClass = 'context';
      // Store training pair
      if (selectMode === 'cbow') {
        // CBOW predicts Target given context words: Input = context, Label = target
        activePairs.push(`Input: [${w}] ➔ Label: <strong>${words[cbowIndex]}</strong>`);
      } else {
        // Skip-Gram predicts Context given target word: Input = target, Label = context
        activePairs.push(`Input: [${words[cbowIndex]}] ➔ Label: <strong>${w}</strong>`);
      }
    } else {
      nodeClass = 'hidden-word';
    }
    
    displayBox.insertAdjacentHTML('beforeend', `
      <div class="anim-word-node ${nodeClass}">
        ${w}
        <span style="font-size: 0.6rem; display: block; opacity: 0.8; font-weight:700">
          ${isTarget ? 'TARGET' : (isContext ? 'CONTEXT' : 'OUT')}
        </span>
      </div>
    `);
  });
  
  // Render training pairs list
  pairBox.innerHTML = `
    <h5 style="margin-bottom: 0.5rem; color: white">Generated Training Pairs:</h5>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; padding-left: 0;">
      ${activePairs.map(p => `<li style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-muted)">${p}</li>`).join('')}
    </ul>
  `;
}

// -------------------------------------------------------------
// Play 4: LSTM Sentiment Steps
// -------------------------------------------------------------
function startLSTMSimulation() {
  const text = document.getElementById('lstm-sentence-input').value.trim();
  const outputBox = document.getElementById('lstm-output-text');
  const sequenceContainer = document.getElementById('lstm-seq-flow');
  
  if (!text) {
    showToast("Please enter a sentence!");
    return;
  }
  
  // Clear any running simulator interval
  if (lstmInterval) clearInterval(lstmInterval);
  
  const tokens = text.split(/\s+/);
  lstmTokenIndex = 0;
  lstmInstance = new window.nlpEngine.LSTMSentimentSimulator();
  
  sequenceContainer.innerHTML = '';
  outputBox.innerHTML = 'Initializing cells...';
  
  // Populates steps visually
  tokens.forEach((t, i) => {
    sequenceContainer.insertAdjacentHTML('beforeend', `
      <div class="flow-step" id="lstm-step-${i}">
        <div class="flow-cell">${t.slice(0, 5)}..</div>
        <span class="flow-text">${t}</span>
      </div>
    `);
  });
  
  // Trigger intervals
  lstmInterval = setInterval(() => {
    if (lstmTokenIndex >= tokens.length) {
      clearInterval(lstmInterval);
      finalizeLSTMSentiment();
      return;
    }
    
    // Highlight step
    document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('active'));
    const currentStepRow = document.getElementById(`lstm-step-${lstmTokenIndex}`);
    if (currentStepRow) {
      currentStepRow.classList.add('active');
      currentStepRow.classList.add('completed');
    }
    
    const stepData = lstmInstance.processToken(tokens[lstmTokenIndex]);
    
    // Update gate visual status bars
    updateGateBars(stepData);
    
    outputBox.innerHTML = `
      <div>Processing word: <strong style="color: white; font-family: var(--font-mono)">"${stepData.token}"</strong></div>
      <div style="font-size: 0.85rem; margin-top: 0.5rem;">
        Cell state adjusted to <strong style="color: var(--accent-cyan)">${stepData.cellState.toFixed(4)}</strong>, 
        yielding hidden state <strong style="color: var(--accent-pink)">${stepData.hiddenState.toFixed(4)}</strong>.
      </div>
    `;
    
    lstmTokenIndex++;
  }, 1000);
}

function updateGateBars(data) {
  // Forget gate (f_t)
  const fg = document.getElementById('gate-f-fill');
  if (fg) fg.style.width = `${data.forgetGate * 100}%`;
  
  // Input gate (i_t)
  const ig = document.getElementById('gate-i-fill');
  if (ig) ig.style.width = `${data.inputGate * 100}%`;
  
  // Candidate (C~)
  const cg = document.getElementById('gate-c-fill');
  // candid could be negative, map from -1..1 to 0..100%
  const candPct = ((data.candidate + 1) / 2) * 100;
  if (cg) cg.style.width = `${candPct}%`;
  
  // Output gate (o_t)
  const og = document.getElementById('gate-o-fill');
  if (og) og.style.width = `${data.outputGate * 100}%`;
}

function finalizeLSTMSentiment() {
  const finalState = lstmInstance.hiddenState;
  const outputBox = document.getElementById('lstm-output-text');
  
  let label = "NEUTRAL";
  let color = "var(--text-muted)";
  if (finalState > 0.15) {
    label = "POSITIVE";
    color = "var(--success)";
  } else if (finalState < -0.15) {
    label = "NEGATIVE";
    color = "var(--danger)";
  }
  
  outputBox.innerHTML = `
    <div style="font-size: 1.15rem; font-weight:700">Sequence Processing Completed!</div>
    <div style="margin-top: 0.5rem;">
      Final Sentiment Score: <strong style="color: ${color}">${finalState.toFixed(4)} (${label})</strong>
    </div>
    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem">
      The LSTM cell retained sentiment signals across the sequence. Check out how individual gate weights adjusted dynamically as positive or negative semantic keywords were processed.
    </p>
  `;
}

// -------------------------------------------------------------
// Play 5: Translation & Attention Mapping
// -------------------------------------------------------------
function runTranslationSimulation() {
  const inputEl = document.getElementById('translation-input');
  const table = document.getElementById('attention-grid-table');
  const targetOutput = document.getElementById('translation-output-text');
  
  const text = inputEl.value.trim();
  if (!text) {
    showToast("Please enter a sentence to translate!");
    return;
  }
  
  const data = window.nlpEngine.getTranslationAndAttention(text);
  
  // Update translation output label
  targetOutput.innerHTML = `<strong>Translated (French):</strong> <span style="color: var(--accent-cyan); font-weight: 700; font-size:1.1rem">${data.targetTokens.join(' ')}</span>`;
  
  // Render Heatmap Table
  table.innerHTML = '';
  
  // 1. Header row
  let headerHtml = '<tr><th>Decoder Target \\ Encoder Source</th>';
  data.sourceTokens.forEach(src => {
    headerHtml += `<th>${src}</th>`;
  });
  headerHtml += '</tr>';
  table.insertAdjacentHTML('beforeend', headerHtml);
  
  // 2. Rows
  data.targetTokens.forEach((tgtWord, tgtIdx) => {
    let rowHtml = `<tr><td class="word-label">${tgtWord}</td>`;
    data.sourceTokens.forEach((srcWord, srcIdx) => {
      let weight = data.matrix[tgtIdx][srcIdx] || 0.0;
      // create background color scale based on weight (opacity of indigo)
      let opacity = Math.min(1.0, weight * 1.5);
      let bgStyle = `background: rgba(99, 102, 241, ${opacity}); color: ${weight > 0.45 ? 'white' : 'var(--text-muted)'}`;
      
      rowHtml += `<td style="${bgStyle}" class="tooltip">
        ${weight.toFixed(3)}
        <span class="tooltiptext">Attention mapping weight from target <strong>${tgtWord}</strong> to source <strong>${srcWord}</strong> is ${weight.toFixed(4)}</span>
      </td>`;
    });
    rowHtml += '</tr>';
    table.insertAdjacentHTML('beforeend', rowHtml);
  });
}

// -------------------------------------------------------------
// Play 6: GPT Generation strategies
// -------------------------------------------------------------
function runGPTDecodingSimulation() {
  const strategy = document.getElementById('gpt-strategy').value;
  const paramK = parseInt(document.getElementById('gpt-k-param').value) || 3;
  const paramP = parseFloat(document.getElementById('gpt-p-param').value) || 0.85;
  const outputBox = document.getElementById('gpt-generated-text');
  const treeContainer = document.getElementById('gpt-tree-steps');
  
  // Configure parameters fields visibility
  document.getElementById('param-k-wrapper').style.display = strategy === 'topk' ? 'block' : 'none';
  document.getElementById('param-p-wrapper').style.display = strategy === 'nucleus' ? 'block' : 'none';
  
  let currentWord = "<root>";
  let generatedText = "Artificial intelligence is";
  treeContainer.innerHTML = '';
  
  // Generate 3 steps of decoding visually
  for (let step = 1; step <= 3; step++) {
    const result = window.nlpEngine.decodeNextWord(currentWord, strategy, paramK, paramP);
    
    // Add chosen word to sentence
    generatedText += " " + result.chosen;
    currentWord = result.chosen;
    
    // Build options UI tags
    let branchHtml = result.options.map((opt, oIdx) => {
      const isSelected = oIdx === result.selectedIdx;
      const isEligible = opt.eligible !== false;
      const selectClass = isSelected ? 'selected' : '';
      const styleAttr = isEligible ? '' : 'opacity: 0.25; border-style: dashed;';
      
      return `
        <div class="word-branch-option ${selectClass}" style="${styleAttr}">
          <span class="b-word">${opt.word}</span>
          <span class="b-prob">p=${opt.prob.toFixed(2)}</span>
        </div>
      `;
    }).join('');
    
    // Add step to visual list
    treeContainer.insertAdjacentHTML('beforeend', `
      <div class="step-node-row">
        <div class="step-number-tag">t=${step}</div>
        <div class="words-branch-list">
          ${branchHtml}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); font-weight:700">➔ Selected: <strong style="color:var(--accent-pink)">${result.chosen}</strong></div>
      </div>
    `);
  }
  
  outputBox.innerHTML = `
    <strong>Generated Output Text:</strong><br>
    <span style="font-size: 1.15rem; color: var(--success); font-weight: 700;">"${generatedText} ..."</span>
  `;
}
