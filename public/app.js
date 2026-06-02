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

  // Global search / command palette
  initCommandPalette();

  // NLP Study Assistant
  initStudyAssistant();
});

// --- navigation routing ---
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-item button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToView(btn.getAttribute('data-tab'));
    });
  });
}

// Programmatic view switching — usable by cross-links across the app
window.navigateToView = function(targetTab, opts = {}) {
  const sections = document.querySelectorAll('.view-section');

  document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item button[data-tab="${targetTab}"]`);
  if (navBtn) navBtn.parentElement.classList.add('active');

  sections.forEach(section => section.classList.toggle('active', section.id === targetTab));

  if (targetTab === 'playgrounds') setTimeout(drawEmbeddingSpace, 150);
  if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: 'auto' });
  if (!opts.silent) showToast(`Navigated to ${navBtn ? navBtn.innerText.trim() : targetTab}`);
};

// Jump straight to a specific playground panel
window.goToPlayground = function(panelId) {
  navigateToView('playgrounds', { silent: true });
  const btn = document.querySelector(`.playground-nav-btn[data-playground="${panelId}"]`);
  if (btn) {
    btn.click();
    const label = btn.querySelector('span:not(.lbl)');
    showToast(`Opened playground: ${label ? label.innerText.trim() : panelId}`);
  }
};

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
    
    SYLLABUS_DATA.outcomes.forEach((co, idx) => {
      const unitId = idx + 1; // CO1..CO6 map directly to Unit I..VI
      const coHtml = `
        <div class="co-card co-card-link" role="button" tabindex="0" onclick="goToLesson(${unitId})">
          <span class="co-badge">${co.code}</span>
          <h4 class="co-title">${co.title}</h4>
          <p class="co-desc">${co.desc}</p>
          <span class="co-go">Study ${SYLLABUS_DATA.units[idx].num} →</span>
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
              <button class="unit-study-btn" onclick="event.stopPropagation(); goToLesson(${unit.id})">Read full notes for ${unit.num} →</button>
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
  
  // -- Simulator: BiLSTM NER (Practical 6) --
  const nerBtn = document.getElementById('ner-tag-btn');
  if (nerBtn) {
    nerBtn.addEventListener('click', runNERSimulation);
    const nerSelect = document.getElementById('ner-sentence-select');
    if (nerSelect) {
      nerSelect.addEventListener('change', () => {
        document.getElementById('ner-input').value = nerSelect.value;
        runNERSimulation();
      });
    }
    runNERSimulation();
  }

  // -- Simulator: Attention Summarizer & ROUGE (Practical 8) --
  const summBtn = document.getElementById('summ-run-btn');
  if (summBtn) {
    summBtn.addEventListener('click', runSummarizationSimulation);
    const summSelect = document.getElementById('summ-doc-select');
    if (summSelect) {
      summSelect.addEventListener('change', () => {
        document.getElementById('summ-doc-text').value = SUMM_DOCS[parseInt(summSelect.value)].text;
        runSummarizationSimulation();
      });
    }
    // load default doc text
    document.getElementById('summ-doc-text').value = SUMM_DOCS[0].text;
    runSummarizationSimulation();
  }

  // -- Simulator: Fine-tune BERT (Practical 9) --
  const bertTrainBtn = document.getElementById('bert-train-btn');
  if (bertTrainBtn) {
    bertTrainBtn.addEventListener('click', runBertFineTuning);
    const bertClassifyBtn = document.getElementById('bert-classify-btn');
    if (bertClassifyBtn) bertClassifyBtn.addEventListener('click', runBertClassification);
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

// -------------------------------------------------------------
// Practical 6: Bidirectional LSTM — Named Entity Recognition
// -------------------------------------------------------------
const NER_GAZETTEER = {
  PER: new Set(['barack', 'obama', 'smith', 'sundar', 'pichai', 'tim', 'cook', 'einstein', 'mary', 'john', 'sarah', 'david', 'angela', 'merkel']),
  LOC: new Set(['hawaii', 'seattle', 'london', 'paris', 'california', 'india', 'america', 'france', 'germany', 'tokyo', 'japan', 'china', 'york']),
  ORG: new Set(['microsoft', 'google', 'apple', 'amazon', 'openai', 'nasa', 'tesla', 'meta', 'ibm', 'oracle'])
};
const NER_TITLES = new Set(['mr', 'mrs', 'ms', 'dr', 'president', 'prof', 'professor', 'sir']);
const NER_ORG_SUFFIX = ['inc', 'corp', 'ltd', 'llc', 'university', 'company', 'group'];

function nerPredictTag(tokens, idx) {
  const raw = tokens[idx];
  const clean = raw.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 'O';

  if (NER_GAZETTEER.PER.has(clean)) return 'PER';
  if (NER_GAZETTEER.LOC.has(clean)) return 'LOC';
  if (NER_GAZETTEER.ORG.has(clean)) return 'ORG';
  if (NER_ORG_SUFFIX.includes(clean)) return 'ORG';

  const isCapitalized = /^[A-Z]/.test(raw);
  if (!isCapitalized) return 'O';

  // Capitalized but unknown — use bidirectional context heuristics
  const prev = idx > 0 ? tokens[idx - 1].toLowerCase().replace(/[^a-z]/g, '') : '';
  const next = idx < tokens.length - 1 ? tokens[idx + 1].toLowerCase().replace(/[^a-z]/g, '') : '';
  if (NER_TITLES.has(prev)) return 'PER';                 // forward context: title before name
  if (['in', 'at', 'from', 'to', 'near'].includes(prev)) return 'LOC'; // locative preposition
  if (NER_ORG_SUFFIX.includes(next)) return 'ORG';        // backward context: org suffix follows
  if (idx === 0) return 'O';                              // sentence-initial capital, no signal
  return 'PER';                                           // default mid-sentence proper noun
}

function runNERSimulation() {
  const input = document.getElementById('ner-input');
  const output = document.getElementById('ner-output');
  const summary = document.getElementById('ner-summary');
  if (!input || !output) return;

  const tokens = input.value.split(/\s+/).filter(t => t.length > 0);
  if (!tokens.length) { showToast('Please enter a sentence!'); return; }

  const tagNames = { PER: 'Person', LOC: 'Location', ORG: 'Organization', O: 'Other' };
  const counts = { PER: [], LOC: [], ORG: [] };

  output.innerHTML = tokens.map((tok, i) => {
    const tag = nerPredictTag(tokens, i);
    if (counts[tag]) counts[tag].push(tok.replace(/[.,]$/, ''));
    return `
      <span class="ner-token ner-${tag}" title="${tagNames[tag]}">
        <span class="ner-word">${tok}</span>
        <span class="ner-tag-label">${tag}</span>
      </span>`;
  }).join('');

  const parts = Object.keys(counts)
    .filter(t => counts[t].length)
    .map(t => `<strong style="color:white;">${tagNames[t]}:</strong> ${counts[t].join(', ')}`);
  summary.innerHTML = parts.length
    ? `<strong>Extracted entities</strong><br>${parts.join(' &nbsp;•&nbsp; ')}`
    : 'No named entities detected in this sentence.';
}

// -------------------------------------------------------------
// Practical 8: Attention Summarizer + ROUGE
// -------------------------------------------------------------
const SUMM_DOCS = [
  {
    text: "A leading technology lab announced a major artificial intelligence research fund this week. The fund will support open research into language models and safety. Industry analysts say the investment could accelerate progress across the field. Smaller startups welcomed the news as a chance to access shared resources.",
    reference: "A technology lab announced a major artificial intelligence research fund to support language model and safety research."
  },
  {
    text: "The championship final drew a record crowd to the national stadium on Sunday. The home team scored twice in the second half to win the title. Fans celebrated late into the night across the city. The captain praised his teammates for their hard work all season.",
    reference: "The home team won the championship final with two second-half goals before a record crowd."
  },
  {
    text: "The space agency confirmed that its new rover landed safely on Mars early this morning. The rover will search for signs of ancient microbial life in an old lake bed. Scientists expect the first high resolution images within a few days. The mission is planned to last at least two years.",
    reference: "A new rover landed safely on Mars to search for ancient microbial life in a dried lake bed."
  }
];

function summTokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
}

function summSplitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

function extractiveSummary(text, numSentences = 2) {
  const sentences = summSplitSentences(text);
  const freq = {};
  summTokenize(text).forEach(w => {
    if (!window.nlpEngine.STOPWORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
  });
  const scored = sentences.map((s, i) => {
    const words = summTokenize(s).filter(w => !window.nlpEngine.STOPWORDS.has(w));
    let score = words.reduce((sum, w) => sum + (freq[w] || 0), 0) / (words.length || 1);
    score += (sentences.length - i) * 0.15; // lead/position bias
    return { s, i, score };
  });
  const top = scored.slice().sort((a, b) => b.score - a.score).slice(0, numSentences);
  top.sort((a, b) => a.i - b.i); // restore reading order
  return top.map(t => t.s).join(' ');
}

function lcsLength(a, b) {
  const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function ngrams(tokens, n) {
  const grams = [];
  for (let i = 0; i + n <= tokens.length; i++) grams.push(tokens.slice(i, i + n).join(' '));
  return grams;
}

function overlapCount(candGrams, refGrams) {
  const refCounts = {};
  refGrams.forEach(g => refCounts[g] = (refCounts[g] || 0) + 1);
  let match = 0;
  candGrams.forEach(g => { if (refCounts[g] > 0) { match++; refCounts[g]--; } });
  return match;
}

function prf(match, candTotal, refTotal) {
  const p = candTotal ? match / candTotal : 0;
  const r = refTotal ? match / refTotal : 0;
  const f = (p + r) ? (2 * p * r) / (p + r) : 0;
  return { p, r, f };
}

function computeRouge(candidate, reference) {
  const c = summTokenize(candidate);
  const r = summTokenize(reference);
  const r1 = prf(overlapCount(c, r), c.length, r.length);
  const c2 = ngrams(c, 2), r2 = ngrams(r, 2);
  const rouge2 = prf(overlapCount(c2, r2), c2.length, r2.length);
  const lcs = lcsLength(c, r);
  const rl = prf(lcs, c.length, r.length);
  return { r1, rouge2, rl };
}

function runSummarizationSimulation() {
  const text = document.getElementById('summ-doc-text').value;
  const idx = parseInt(document.getElementById('summ-doc-select').value) || 0;
  const reference = SUMM_DOCS[idx] ? SUMM_DOCS[idx].reference : '';
  if (!text.trim()) { showToast('Please enter source text!'); return; }

  const summary = extractiveSummary(text, 2);
  document.getElementById('summ-generated').textContent = summary;
  document.getElementById('summ-reference').textContent = reference;

  const rouge = computeRouge(summary, reference);
  const cards = [
    { name: 'ROUGE-1', v: rouge.r1, desc: 'unigram overlap' },
    { name: 'ROUGE-2', v: rouge.rouge2, desc: 'bigram overlap' },
    { name: 'ROUGE-L', v: rouge.rl, desc: 'longest common subseq.' }
  ];
  document.getElementById('summ-rouge').innerHTML = cards.map(card => `
    <div class="rouge-card">
      <div class="rouge-name">${card.name}</div>
      <div class="rouge-f1">${(card.v.f * 100).toFixed(1)}<span>%</span></div>
      <div class="rouge-pr">P ${(card.v.p * 100).toFixed(0)}% · R ${(card.v.r * 100).toFixed(0)}%</div>
      <div class="rouge-desc">${card.desc}</div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// Practical 9: Fine-tune BERT — Sentiment Classification
// -------------------------------------------------------------
let bertTrained = false;

const BERT_POS = new Set(['good', 'great', 'fantastic', 'brilliant', 'excellent', 'love', 'loved', 'amazing', 'wonderful', 'best', 'enjoyed', 'happy', 'superb']);
const BERT_NEG = new Set(['bad', 'terrible', 'awful', 'boring', 'worst', 'hate', 'hated', 'poor', 'disappointing', 'dull', 'weak', 'horrible']);
const BERT_NEGATORS = new Set(["not", "n't", 'never', 'no', 'hardly', 'barely']);

function runBertFineTuning() {
  const epochs = parseInt(document.getElementById('bert-epochs').value) || 4;
  const lr = document.getElementById('bert-lr').value;
  const list = document.getElementById('bert-epoch-list');
  const metrics = document.getElementById('bert-metrics');
  const classifyBtn = document.getElementById('bert-classify-btn');
  list.innerHTML = '';
  metrics.style.display = 'none';

  // target metrics depend on learning rate
  const ceiling = lr === 'high' ? 0.90 : lr === 'low' ? 0.93 : 0.94;
  let epoch = 0;

  const tick = () => {
    epoch++;
    const progress = epoch / epochs;
    const acc = ceiling * (1 - Math.exp(-2.3 * progress));
    const loss = 0.69 * Math.exp(-1.8 * progress) + 0.05;
    const f1 = acc - 0.01;
    list.insertAdjacentHTML('beforeend', `
      <div class="bert-epoch-row">
        <span class="bert-epoch-tag">Epoch ${epoch}/${epochs}</span>
        <div class="bert-bar"><div class="bert-bar-fill" style="width:${(acc * 100).toFixed(0)}%"></div></div>
        <span class="bert-epoch-vals">loss ${loss.toFixed(3)} · acc ${(acc * 100).toFixed(1)}%</span>
      </div>
    `);
    if (epoch >= epochs) {
      clearInterval(timer);
      document.getElementById('bert-acc').textContent = (acc * 100).toFixed(1) + '%';
      document.getElementById('bert-f1').textContent = (f1 * 100).toFixed(1) + '%';
      metrics.style.display = 'flex';
      bertTrained = true;
      classifyBtn.disabled = false;
      showToast('Fine-tuning complete — model ready to classify.');
      runBertClassification();
    }
  };
  const timer = setInterval(tick, 550);
  tick();
}

function bowSentiment(tokens) {
  let score = 0;
  tokens.forEach(t => {
    if (BERT_POS.has(t)) score += 1;
    if (BERT_NEG.has(t)) score -= 1;
  });
  return score;
}

function bertSentiment(tokens) {
  // contextual: a negator flips the polarity of the next sentiment word
  let score = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    let polarity = BERT_POS.has(t) ? 1 : BERT_NEG.has(t) ? -1 : 0;
    if (polarity !== 0) {
      const window = tokens.slice(Math.max(0, i - 2), i);
      if (window.some(w => BERT_NEGATORS.has(w) || w.endsWith("n't"))) polarity *= -1;
      score += polarity;
    }
  }
  return score;
}

function labelFor(score) {
  if (score > 0) return { label: 'Positive', cls: 'pos' };
  if (score < 0) return { label: 'Negative', cls: 'neg' };
  return { label: 'Neutral', cls: 'neu' };
}

function runBertClassification() {
  if (!bertTrained) { showToast('Fine-tune the model first.'); return; }
  const raw = document.getElementById('bert-test-input').value;
  const tokens = raw.toLowerCase().replace(/[^a-z0-9'\s]/g, '').split(/\s+/).filter(Boolean);
  const hasNegation = tokens.some(w => BERT_NEGATORS.has(w) || w.endsWith("n't"));

  const bow = labelFor(bowSentiment(tokens));
  const bert = labelFor(bertSentiment(tokens));

  const compare = document.getElementById('bert-compare');
  compare.style.display = 'grid';
  document.getElementById('bert-bow-pred').textContent = bow.label;
  document.getElementById('bert-bow-pred').className = 'bert-compare-pred ' + bow.cls;
  document.getElementById('bert-bow-note').textContent = hasNegation
    ? 'Ignores word order — misses the negation.'
    : 'Counts sentiment words directly.';

  document.getElementById('bert-bert-pred').textContent = bert.label;
  document.getElementById('bert-bert-pred').className = 'bert-compare-pred ' + bert.cls;
  document.getElementById('bert-bert-note').textContent = hasNegation
    ? 'Contextual embeddings capture the negation.'
    : 'Reads context around each sentiment word.';
}

// ============================================================
// Command Palette / Global Search (⌘K)
// ============================================================

let CMDK_INDEX = null;

function buildSearchIndex() {
  const idx = [];

  // Top-level views
  const views = [
    { tab: 'dashboard',  title: 'Dashboard',   subtitle: 'Overview & progress',  keywords: 'home overview start' },
    { tab: 'syllabus',   title: 'Syllabus',    subtitle: 'Outcomes, units, labs', keywords: 'course outcomes units experiments practicals' },
    { tab: 'lessons',    title: 'Lessons',     subtitle: 'Full unit notes',       keywords: 'notes read study units theory' },
    { tab: 'assistant',  title: 'Study Assistant', subtitle: 'Ask questions, get answers', keywords: 'ask ai chat search question answer help tf-idf' },
    { tab: 'playgrounds',title: 'Playgrounds', subtitle: 'Interactive labs',      keywords: 'interactive demo simulator practical run' },
    { tab: 'tracker',    title: 'Progress Tracker', subtitle: 'Mark units complete', keywords: 'progress complete checklist' },
    { tab: 'quiz',       title: 'Quiz',        subtitle: 'Test yourself',         keywords: 'test questions practice exam' },
  ];
  views.forEach(v => idx.push({
    kind: 'view', kindLabel: 'Go to', title: v.title, subtitle: v.subtitle,
    keywords: v.keywords, action: () => window.navigateToView(v.tab),
  }));

  // Lessons: units + every section
  if (typeof LESSONS_DATA !== 'undefined') {
    LESSONS_DATA.forEach(u => {
      idx.push({
        kind: 'unit', kindLabel: u.num, title: u.title,
        subtitle: 'Unit overview', keywords: (u.intro || '') + ' ' + u.num,
        action: () => window.goToLesson(u.id),
      });
      (u.sections || []).forEach(s => {
        idx.push({
          kind: 'lesson', kindLabel: 'Lesson', title: s.title,
          subtitle: `${u.num} · ${s.group || ''}`.trim(),
          keywords: (s.group || '') + ' ' + u.num + ' ' + u.title,
          action: () => window.goToLesson(u.id, s.id),
        });
      });
    });
  }

  // Practicals → playgrounds
  const practicalPanels = ['preproc','embeddings','cbow','embeddings','lstm','ner','translation','summarization','bert','gpt'];
  const practicalTitles = [
    'Text preprocessing & BoW / TF-IDF',
    'Pretrained embeddings + PCA / t-SNE',
    'Train CBOW & Skip-Gram',
    'GloVe semantic category clusters',
    'LSTM sentiment vs BoW / TF-IDF',
    'BiLSTM Named Entity Recognition',
    'Seq2seq attention translation',
    'Attention summarization + ROUGE',
    'Fine-tune BERT sentiment',
    'GPT-2 decoding strategies',
  ];
  practicalTitles.forEach((t, i) => idx.push({
    kind: 'practical', kindLabel: `Lab ${i + 1}`, title: t,
    subtitle: 'Interactive practical', keywords: 'practical lab experiment ' + practicalPanels[i],
    action: () => window.goToPlayground(practicalPanels[i]),
  }));

  return idx;
}

function searchIndex(index, q) {
  q = (q || '').trim().toLowerCase();
  if (!q) return index.slice(0, 8);
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = [];
  index.forEach(it => {
    const title = it.title.toLowerCase();
    const hay = title + ' ' + (it.kindLabel + ' ' + it.subtitle + ' ' + it.keywords).toLowerCase();
    let score = 0, ok = true;
    for (const term of terms) {
      if (title.includes(term)) score += 2;
      else if (hay.includes(term)) score += 1;
      else { ok = false; break; }
    }
    if (ok && score > 0) scored.push({ it, score });
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 12).map(s => s.it);
}

function initCommandPalette() {
  const overlay = document.getElementById('cmdk-overlay');
  const input = document.getElementById('cmdk-input');
  const results = document.getElementById('cmdk-results');
  if (!overlay || !input || !results) return;

  CMDK_INDEX = buildSearchIndex();
  let current = [];
  let active = 0;

  const isOpen = () => !overlay.hidden;

  function render(q) {
    current = searchIndex(CMDK_INDEX, q);
    active = 0;
    if (!current.length) {
      results.innerHTML = '<li class="cmdk-empty">No matches found</li>';
      return;
    }
    results.innerHTML = current.map((it, i) => `
      <li class="cmdk-item${i === 0 ? ' active' : ''}" data-i="${i}" role="option">
        <span class="cmdk-kind cmdk-kind-${it.kind}">${it.kindLabel}</span>
        <span class="cmdk-text">
          <span class="cmdk-title">${escapeHtml(it.title)}</span>
          <span class="cmdk-sub">${escapeHtml(it.subtitle)}</span>
        </span>
        <span class="cmdk-enter">↵</span>
      </li>`).join('');
    results.querySelectorAll('.cmdk-item').forEach(el => {
      el.addEventListener('mouseenter', () => setActive(parseInt(el.dataset.i)));
      el.addEventListener('click', () => exec(parseInt(el.dataset.i)));
    });
  }

  function setActive(i) {
    active = i;
    results.querySelectorAll('.cmdk-item').forEach((el, idx) => {
      el.classList.toggle('active', idx === i);
      if (idx === i) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function move(d) {
    if (!current.length) return;
    setActive((active + d + current.length) % current.length);
  }

  function exec(i) {
    const it = current[i];
    if (!it) return;
    close();
    if (typeof it.action === 'function') it.action();
  }

  function open() {
    if (isOpen()) return;
    overlay.hidden = false;
    document.body.classList.add('cmdk-open');
    input.value = '';
    render('');
    setTimeout(() => input.focus(), 20);
  }

  function close() {
    if (!isOpen()) return;
    overlay.hidden = true;
    document.body.classList.remove('cmdk-open');
    input.blur();
  }

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); exec(active); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      isOpen() ? close() : open();
    } else if (e.key === '/' && !isOpen()) {
      const t = document.activeElement;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
      if (!typing) { e.preventDefault(); open(); }
    }
  });

  const sideBtn = document.getElementById('sidebar-search-btn');
  if (sideBtn) sideBtn.addEventListener('click', open);
  const fab = document.getElementById('cmdk-fab');
  if (fab) fab.addEventListener('click', open);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// ============================================================
// NLP Study Assistant — client-side TF-IDF retrieval Q&A
// ============================================================

let ASSISTANT_INDEX = null;        // { docs: [...], idf: Map }
const ASSISTANT_HISTORY_KEY = 'nlp_hub_assistant_history';
const ASSISTANT_SEEDS = [
  'What is tokenization?',
  'Explain TF-IDF',
  'What is self-attention?',
  'RNN vs LSTM',
  'How does BERT work?',
  'What is beam search?',
];

function nlpTokens(text) {
  const eng = window.nlpEngine || {};
  const tokenize = eng.cleanAndTokenize || ((t) => t.toLowerCase().split(/\s+/));
  const stop = eng.STOPWORDS || new Set();
  const stem = eng.stemWord || ((w) => w);
  const out = [];
  tokenize(text).forEach(raw => {
    const w = raw.toLowerCase();
    if (w.length < 2) return;
    if (stop.has(w)) return;
    out.push(stem(w));
  });
  return out;
}

function htmlToText(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || '').replace(/\s+/g, ' ').trim();
}

function buildAssistantIndex() {
  if (ASSISTANT_INDEX) return ASSISTANT_INDEX;
  if (typeof LESSONS_DATA === 'undefined') return null;

  const docs = [];
  LESSONS_DATA.forEach(unit => {
    (unit.sections || []).forEach(sec => {
      if (!sec || !sec.html) return;
      const plain = htmlToText(sec.html);
      if (!plain) return;
      // Weight title and group higher by repeating them in the term stream.
      const titleTokens = nlpTokens(sec.title || '');
      const weighted = [].concat(titleTokens, titleTokens, titleTokens, nlpTokens(sec.group || ''), nlpTokens(plain));
      const tf = new Map();
      weighted.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
      docs.push({
        unitId: unit.id,
        unitNum: unit.num,
        sectionId: sec.id,
        group: sec.group || '',
        title: sec.title || '',
        plain,
        tf,
      });
    });
  });

  // Document frequency + IDF
  const df = new Map();
  docs.forEach(d => { d.tf.forEach((_, term) => df.set(term, (df.get(term) || 0) + 1)); });
  const N = docs.length || 1;
  const idf = new Map();
  df.forEach((freq, term) => idf.set(term, Math.log(N / (1 + freq)) + 1));

  // Per-doc TF-IDF vector + L2 norm
  docs.forEach(d => {
    const vec = new Map();
    let sumSq = 0;
    d.tf.forEach((count, term) => {
      const w = (1 + Math.log(count)) * (idf.get(term) || 0);
      if (w > 0) { vec.set(term, w); sumSq += w * w; }
    });
    d.vec = vec;
    d.norm = Math.sqrt(sumSq) || 1;
  });

  ASSISTANT_INDEX = { docs, idf };
  return ASSISTANT_INDEX;
}

function queryVector(idf, qTokens) {
  const tf = new Map();
  qTokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
  const vec = new Map();
  let sumSq = 0;
  tf.forEach((count, term) => {
    const w = (1 + Math.log(count)) * (idf.get(term) || 0);
    if (w > 0) { vec.set(term, w); sumSq += w * w; }
  });
  return { vec, norm: Math.sqrt(sumSq) || 1 };
}

function cosineSparse(aVec, aNorm, bVec, bNorm) {
  let small = aVec, large = bVec;
  if (aVec.size > bVec.size) { small = bVec; large = aVec; }
  let dot = 0;
  small.forEach((w, term) => { const o = large.get(term); if (o) dot += w * o; });
  return dot / (aNorm * bNorm);
}

function extractAnswer(doc, qTokens) {
  const idf = ASSISTANT_INDEX.idf;
  const qSet = new Set(qTokens);
  const sentences = doc.plain.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).filter(s => s.trim().length > 20);
  if (!sentences.length) return doc.plain.slice(0, 320);
  let best = [];
  sentences.forEach((s, i) => {
    const toks = nlpTokens(s);
    let score = 0;
    const seen = new Set();
    toks.forEach(t => { if (qSet.has(t) && !seen.has(t)) { seen.add(t); score += (idf.get(t) || 1); } });
    best.push({ s: s.trim(), score, i });
  });
  best.sort((a, b) => b.score - a.score || a.i - b.i);
  if (best[0].score === 0) return sentences.slice(0, 2).join(' ').slice(0, 320);
  const picked = best.filter(b => b.score > 0).slice(0, 3).sort((a, b) => a.i - b.i);
  let out = '';
  for (const p of picked) {
    if (out.length + p.s.length > 380 && out.length > 0) break;
    out += (out ? ' ' : '') + p.s;
  }
  return out;
}

function answerQuestion(q) {
  const idx = buildAssistantIndex();
  if (!idx) return null;
  const qTokens = nlpTokens(q || '');
  if (!qTokens.length) return { empty: true, qTokens };
  const { vec, norm } = queryVector(idx.idf, qTokens);
  if (!vec.size) return { empty: true, qTokens };

  const scored = idx.docs.map(d => ({ doc: d, score: cosineSparse(vec, norm, d.vec, d.norm) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return { noMatch: true, qTokens };

  const top = scored[0];
  const snippet = extractAnswer(top.doc, qTokens);
  const related = scored.slice(1, 4).map(x => ({
    unitId: x.doc.unitId, unitNum: x.doc.unitNum, sectionId: x.doc.sectionId,
    title: x.doc.title, score: x.score,
  }));
  return {
    snippet,
    score: top.score,
    source: { unitId: top.doc.unitId, unitNum: top.doc.unitNum, sectionId: top.doc.sectionId, title: top.doc.title, group: top.doc.group },
    related,
    corpusSize: idx.docs.length,
    qTokens,
  };
}

function confidenceLabel(score) {
  if (score >= 0.35) return { label: 'High', cls: 'high' };
  if (score >= 0.18) return { label: 'Medium', cls: 'med' };
  return { label: 'Low', cls: 'low' };
}

function loadAssistantHistory() {
  try { return JSON.parse(localStorage.getItem(ASSISTANT_HISTORY_KEY) || '[]'); }
  catch (e) { return []; }
}

function saveAssistantHistory(q) {
  let hist = loadAssistantHistory().filter(h => h.toLowerCase() !== q.toLowerCase());
  hist.unshift(q);
  hist = hist.slice(0, 8);
  try { localStorage.setItem(ASSISTANT_HISTORY_KEY, JSON.stringify(hist)); } catch (e) {}
  return hist;
}

function renderAssistantHistory() {
  const row = document.getElementById('assistant-history-row');
  const wrap = document.getElementById('assistant-history-chips');
  if (!row || !wrap) return;
  const hist = loadAssistantHistory();
  if (!hist.length) { row.hidden = true; return; }
  row.hidden = false;
  wrap.innerHTML = hist.map(h => `<button class="assistant-chip assistant-chip-hist" data-q="${escapeHtml(h)}">${escapeHtml(h)}</button>`).join('');
}

function renderAssistantAnswer(q, res) {
  const out = document.getElementById('assistant-results');
  if (!out) return;

  if (!res || res.empty) {
    out.innerHTML = `<div class="assistant-answer-card assistant-fallback"><p>Type a question about NLP — try one of the suggestions above.</p></div>`;
    return;
  }
  if (res.noMatch) {
    out.innerHTML = `<div class="assistant-answer-card assistant-fallback">
      <p><strong>No matching passage found.</strong> Try rephrasing with course terms like <em>embeddings, attention, transformer, tokenization, decoding</em>.</p>
    </div>`;
    return;
  }

  const conf = confidenceLabel(res.score);
  const src = res.source;
  const related = res.related.map(r => `
    <button class="assistant-source-chip" onclick="goToLesson(${r.unitId}, '${r.sectionId}')">
      <span class="assistant-src-unit">${escapeHtml(r.unitNum)}</span>
      <span class="assistant-src-title">${escapeHtml(r.title)}</span>
    </button>`).join('');

  out.innerHTML = `
    <div class="assistant-answer-card">
      <div class="assistant-answer-head">
        <span class="assistant-q">${escapeHtml(q)}</span>
        <span class="assistant-conf assistant-conf-${conf.cls}">${conf.label} match</span>
      </div>
      <p class="assistant-snippet">${escapeHtml(res.snippet)}</p>
      <div class="assistant-primary-source">
        <div class="assistant-src-meta">
          <span class="assistant-src-unit">${escapeHtml(src.unitNum)}</span>
          <span class="assistant-src-title">${escapeHtml(src.title)}</span>
        </div>
        <button class="assistant-open-btn" onclick="goToLesson(${src.unitId}, '${src.sectionId}')">Open lesson →</button>
      </div>
      ${related.length ? `<div class="assistant-related"><span class="assistant-related-label">Related passages</span><div class="assistant-source-chips">${related}</div></div>` : ''}
      <p class="assistant-transparency">Answered with TF-IDF retrieval + cosine similarity over ${res.corpusSize} lesson passages — the technique from Unit I &amp; Practical 1.</p>
    </div>`;
}

function runAssistantQuery(q) {
  q = (q || '').trim();
  if (!q) return;
  const input = document.getElementById('assistant-input');
  if (input) input.value = q;
  const res = answerQuestion(q);
  renderAssistantAnswer(q, res);
  if (res && !res.empty && !res.noMatch) { saveAssistantHistory(q); renderAssistantHistory(); }
}

function initStudyAssistant() {
  const input = document.getElementById('assistant-input');
  const askBtn = document.getElementById('assistant-ask-btn');
  const seedWrap = document.getElementById('assistant-seed-chips');
  if (!input || !seedWrap) return;

  seedWrap.innerHTML = ASSISTANT_SEEDS.map(s => `<button class="assistant-chip" data-q="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('');

  // Build index in the background so the first question is instant
  setTimeout(buildAssistantIndex, 200);

  if (askBtn) askBtn.addEventListener('click', () => runAssistantQuery(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runAssistantQuery(input.value); } });

  const view = document.getElementById('assistant');
  if (view) view.addEventListener('click', (e) => {
    const chip = e.target.closest('.assistant-chip');
    if (chip && chip.dataset.q) runAssistantQuery(chip.dataset.q);
  });

  renderAssistantHistory();
}

window.goToAssistant = function(prefill) {
  if (window.navigateToView) window.navigateToView('assistant', { silent: true });
  const input = document.getElementById('assistant-input');
  setTimeout(() => {
    if (input) input.focus();
    if (prefill) runAssistantQuery(prefill);
  }, 120);
  if (window.showToast) window.showToast('Opened Study Assistant');
};
