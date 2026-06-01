/* ==========================================================================
   NLP Learning Hub - Lessons & Study Notes
   Detailed, exam-ready theory content rendered into the Lessons view.
   Unit I is fully authored; Units II–VI are scaffolded for later expansion.
   ========================================================================== */

const LESSONS_DATA = [
  {
    id: 1,
    num: "Unit I",
    title: "Foundations of NLP & Text Processing",
    intro: "This unit builds the conceptual base of Natural Language Processing — where the field came from, how human language is structured at every level, why machines find language hard, and the practical text-processing pipeline that turns raw text into numbers a model can learn from.",
    sections: [
      {
        id: "origin",
        group: "Foundations of NLP",
        title: "Origin & Evolution of NLP",
        html: `
          <p class="lead">Natural Language Processing (NLP) is the subfield of Artificial Intelligence and computational linguistics concerned with enabling computers to <strong>understand, interpret, generate, and respond to human (natural) language</strong> — text or speech.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>NLP is the automatic (or semi-automatic) computational processing of human languages. It combines <strong>linguistics</strong> (the study of language) with <strong>computer science</strong> and <strong>machine learning</strong> to bridge the gap between human communication and machine understanding.</p>
          </div>

          <h4>Why is it called "natural" language?</h4>
          <p>A <em>natural</em> language (English, Hindi, Mandarin) evolves naturally in humans through use, as opposed to a <em>formal</em> or <em>artificial</em> language (Python, C++, mathematical logic) that is deliberately designed with strict, unambiguous rules. The "naturalness" — its ambiguity, irregularity, and constant evolution — is exactly what makes NLP difficult.</p>

          <h4>Historical evolution</h4>
          <table class="lesson-table">
            <thead><tr><th>Era</th><th>Period</th><th>Dominant Approach &amp; Milestones</th></tr></thead>
            <tbody>
              <tr><td><strong>Foundations</strong></td><td>1940s–1950s</td><td>Turing Test (1950) proposes language as a measure of machine intelligence. Early <strong>machine translation</strong> research (Russian→English) during the Cold War.</td></tr>
              <tr><td><strong>Symbolic / Rule-based</strong></td><td>1950s–1980s</td><td>Hand-written grammar rules and dictionaries. Chomsky's generative grammar (1957). Systems like <strong>ELIZA</strong> (1966) and <strong>SHRDLU</strong> (1970).</td></tr>
              <tr><td><strong>Statistical NLP</strong></td><td>1990s–2000s</td><td>Shift to <strong>probabilistic models</strong> learned from large text corpora (n-grams, Hidden Markov Models, Naive Bayes). "Every time I fire a linguist, performance goes up."</td></tr>
              <tr><td><strong>Machine Learning</strong></td><td>2000s–2013</td><td>Feature-engineered classifiers (SVM, CRF, MaxEnt) for tasks like NER and POS tagging.</td></tr>
              <tr><td><strong>Deep Learning</strong></td><td>2013–2017</td><td><strong>Word2Vec</strong> embeddings (2013), RNN/LSTM sequence models, seq2seq with attention.</td></tr>
              <tr><td><strong>Transformers &amp; LLMs</strong></td><td>2017–present</td><td>"Attention Is All You Need" (2017), <strong>BERT</strong> (2018), <strong>GPT</strong> series, and modern large language models.</td></tr>
            </tbody>
          </table>

          <div class="note-box">
            <strong>Trend to remember:</strong> The history of NLP is a steady movement from <em>hand-crafted rules</em> → <em>statistics from data</em> → <em>learned neural representations</em>. Each shift reduced manual engineering and increased the amount of data and computation used.
          </div>
        `
      },
      {
        id: "language-grammar",
        group: "Foundations of NLP",
        title: "Language and Grammar",
        html: `
          <p class="lead">To process language computationally, we first need a model of what language <em>is</em> and how it is structured. <strong>Grammar</strong> is the set of structural rules that govern how valid sentences are formed in a language.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>grammar</strong> is a finite set of rules that can generate (and recognize) the — possibly infinite — set of well-formed sentences of a language. The vocabulary plus the grammar together define the language.</p>
          </div>

          <h4>Chomsky's generative grammar</h4>
          <p>Noam Chomsky argued that humans possess an innate capacity for language and that a small set of recursive rules can produce infinitely many sentences. This idea underpins <strong>formal grammars</strong> used in computer science.</p>

          <h4>The Chomsky hierarchy of grammars</h4>
          <table class="lesson-table">
            <thead><tr><th>Type</th><th>Grammar</th><th>Recognizing Machine</th><th>Relevance to NLP</th></tr></thead>
            <tbody>
              <tr><td>Type 0</td><td>Unrestricted</td><td>Turing Machine</td><td>Too powerful / undecidable</td></tr>
              <tr><td>Type 1</td><td>Context-Sensitive</td><td>Linear Bounded Automaton</td><td>Models some natural-language dependencies</td></tr>
              <tr><td>Type 2</td><td><strong>Context-Free (CFG)</strong></td><td>Pushdown Automaton</td><td>Workhorse for parsing sentence structure</td></tr>
              <tr><td>Type 3</td><td>Regular</td><td>Finite State Automaton</td><td>Tokenization, morphology, simple patterns</td></tr>
            </tbody>
          </table>

          <h4>Context-Free Grammar example</h4>
          <p>A CFG consists of <em>production rules</em> of the form <span class="inline-code">Non-terminal → sequence of terminals/non-terminals</span>:</p>
          <pre class="formula">S  → NP VP            (a Sentence is a Noun Phrase + Verb Phrase)
NP → Det N            (a Noun Phrase is a Determiner + Noun)
VP → V NP             (a Verb Phrase is a Verb + Noun Phrase)
Det → "the" | "a"
N  → "dog" | "cat"
V  → "chased" | "saw"</pre>
          <p>From these rules we can generate: <em>"the dog chased a cat"</em>. The same rules <strong>parse</strong> a sentence to check grammaticality and reveal its structure.</p>

          <div class="note-box">
            <strong>Prescriptive vs. Descriptive grammar:</strong> <em>Prescriptive</em> grammar states how language <em>ought</em> to be used (rules of "correct" English). <em>Descriptive</em> grammar describes how people <em>actually</em> use language. NLP generally cares about description — modelling real usage, including informal text.
          </div>
        `
      },
      {
        id: "linguistic-essentials",
        group: "Foundations of NLP",
        title: "Linguistic Essentials — Levels of Language",
        html: `
          <p class="lead">Language can be analysed at multiple <strong>levels</strong>, from the smallest sounds up to whole-conversation meaning. NLP systems often mirror these levels as processing stages.</p>

          <table class="lesson-table">
            <thead><tr><th>Level</th><th>Studies</th><th>Unit of analysis</th><th>Example NLP task</th></tr></thead>
            <tbody>
              <tr><td><strong>Phonetics / Phonology</strong></td><td>Speech sounds and how they pattern</td><td>Phonemes</td><td>Speech recognition, text-to-speech</td></tr>
              <tr><td><strong>Morphology</strong></td><td>Internal structure of words</td><td>Morphemes</td><td>Stemming, lemmatization</td></tr>
              <tr><td><strong>Lexical</strong></td><td>Words and their meanings/categories</td><td>Words, lexemes</td><td>POS tagging, tokenization</td></tr>
              <tr><td><strong>Syntax</strong></td><td>How words combine into phrases/sentences</td><td>Phrases, clauses</td><td>Parsing, grammar checking</td></tr>
              <tr><td><strong>Semantics</strong></td><td>Literal meaning of words and sentences</td><td>Meaning representations</td><td>Word sense disambiguation, NER</td></tr>
              <tr><td><strong>Pragmatics</strong></td><td>Meaning in context, speaker intent</td><td>Utterances in context</td><td>Sarcasm/intent detection, dialogue</td></tr>
              <tr><td><strong>Discourse</strong></td><td>Meaning across sentences</td><td>Texts, conversations</td><td>Coreference resolution, summarization</td></tr>
            </tbody>
          </table>

          <div class="def-box">
            <span class="def-tag">Key terms</span>
            <ul class="key-points">
              <li><strong>Phoneme</strong> — smallest unit of sound that distinguishes meaning (e.g. /b/ vs /p/ in <em>bat</em>/<em>pat</em>).</li>
              <li><strong>Morpheme</strong> — smallest unit of meaning (e.g. <em>un-</em>, <em>happy</em>, <em>-ness</em> in <em>unhappiness</em>).</li>
              <li><strong>Lexeme</strong> — an abstract vocabulary item (RUN), realised as word-forms <em>run, runs, ran, running</em>.</li>
              <li><strong>Syntax</strong> — rules for arranging words into grammatical sentences.</li>
              <li><strong>Semantics</strong> — the literal, context-independent meaning.</li>
              <li><strong>Pragmatics</strong> — how context changes the intended meaning.</li>
            </ul>
          </div>

          <div class="note-box"><strong>Memory aid:</strong> "<em>Phonology → Morphology → Syntax → Semantics → Pragmatics → Discourse</em>" moves from <em>sound</em> to <em>structure</em> to <em>meaning</em> to <em>context</em>.</div>
        `
      },
      {
        id: "morphology",
        group: "Foundations of NLP",
        title: "Morphology",
        html: `
          <p class="lead"><strong>Morphology</strong> is the study of the internal structure of words and how they are formed from smaller meaningful units called <strong>morphemes</strong>.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>morpheme</strong> is the smallest unit of language that carries meaning or grammatical function and cannot be further divided without losing that meaning.</p>
          </div>

          <h4>Types of morphemes</h4>
          <ul class="key-points">
            <li><strong>Free morpheme</strong> — can stand alone as a word: <em>book, run, happy</em>.</li>
            <li><strong>Bound morpheme</strong> — must attach to another morpheme: <em>-s, -ed, -ing, un-, re-</em>.</li>
            <li><strong>Root / Stem</strong> — the core carrying the main meaning: <em>play</em> in <em>replaying</em>.</li>
            <li><strong>Affixes</strong> — prefixes (<em>un-</em>), suffixes (<em>-ness</em>), infixes, circumfixes.</li>
          </ul>

          <h4>Two kinds of word formation</h4>
          <table class="lesson-table">
            <thead><tr><th></th><th>Inflectional morphology</th><th>Derivational morphology</th></tr></thead>
            <tbody>
              <tr><td>Effect</td><td>Changes grammatical form, <em>not</em> the core meaning or word class</td><td>Creates a <em>new word</em>, often changing the word class</td></tr>
              <tr><td>Examples</td><td><em>cat → cats</em>, <em>walk → walked</em>, <em>big → bigger</em></td><td><em>happy → happiness</em>, <em>teach → teacher</em>, <em>nation → national</em></td></tr>
              <tr><td>Word class</td><td>Stays the same (noun stays noun)</td><td>Often changes (adjective → noun)</td></tr>
            </tbody>
          </table>

          <div class="example-box">
            <span class="ex-tag">Worked example</span>
            <p>Decompose <strong>"unhappiness"</strong>:</p>
            <pre class="formula">un-      +   happy    +   -ness
prefix       root         suffix
(negation)   (adjective)  (noun-forming)</pre>
            <p>Three morphemes; derivational affixes turn the adjective <em>happy</em> into the noun <em>unhappiness</em>.</p>
          </div>

          <div class="note-box"><strong>Why NLP cares:</strong> Morphological analysis powers <strong>stemming</strong> and <strong>lemmatization</strong>, lets us map word variants to a common form, and is essential for morphologically rich languages (Turkish, Finnish, Hindi) where one root yields hundreds of forms.</div>
        `
      },
      {
        id: "syntax",
        group: "Foundations of NLP",
        title: "Syntax",
        html: `
          <p class="lead"><strong>Syntax</strong> studies how words combine to form grammatically correct phrases and sentences — the <em>structure</em> of language, independent of meaning.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Syntactic analysis (parsing)</strong> is the process of determining the grammatical structure of a sentence according to a grammar, identifying the relationships between words.</p>
          </div>

          <h4>Parts of Speech (POS)</h4>
          <p>Syntax begins with word categories: <strong>Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Determiner, Interjection</strong>. Assigning these tags is <strong>POS tagging</strong>.</p>

          <h4>Two views of structure</h4>
          <ul class="key-points">
            <li><strong>Constituency (phrase-structure) parsing</strong> — groups words into nested phrases (NP, VP, PP) using a context-free grammar.</li>
            <li><strong>Dependency parsing</strong> — links each word to its <em>head</em>, showing direct grammatical relations (subject, object, modifier).</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Constituency parse of "The cat sat on the mat"</span>
            <pre class="formula">          S
        /     \\
      NP        VP
     /  \\      /   \\
   Det   N    V     PP
   the  cat  sat   /  \\
                  P    NP
                  on  /  \\
                    Det   N
                    the  mat</pre>
          </div>

          <div class="note-box">
            <strong>Famous ambiguity:</strong> "I saw the man with the telescope." Did <em>I</em> use the telescope, or does the man <em>have</em> one? This <strong>structural (syntactic) ambiguity</strong> — called PP-attachment ambiguity — yields two valid parse trees and is a classic NLP challenge.
          </div>

          <p>The well-known sentence <em>"Colorless green ideas sleep furiously"</em> (Chomsky) is <strong>syntactically valid but semantically meaningless</strong> — proving syntax and semantics are separate levels.</p>
        `
      },
      {
        id: "semantics",
        group: "Foundations of NLP",
        title: "Semantics",
        html: `
          <p class="lead"><strong>Semantics</strong> is the study of <em>meaning</em> — of individual words (lexical semantics) and of how word meanings combine into sentence meaning (compositional semantics).</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Semantic analysis</strong> maps linguistic input to a representation of its meaning, resolving what words refer to and how their meanings combine.</p>
          </div>

          <h4>Lexical semantic relations</h4>
          <ul class="key-points">
            <li><strong>Synonymy</strong> — same meaning: <em>big / large</em>.</li>
            <li><strong>Antonymy</strong> — opposite meaning: <em>hot / cold</em>.</li>
            <li><strong>Hypernymy / Hyponymy</strong> — general/specific: <em>animal</em> (hypernym) → <em>dog</em> (hyponym).</li>
            <li><strong>Meronymy</strong> — part-whole: <em>wheel</em> is part of <em>car</em>.</li>
            <li><strong>Polysemy</strong> — one word, multiple related senses: <em>bank</em> (river / financial).</li>
            <li><strong>Homonymy</strong> — same form, unrelated senses: <em>bat</em> (animal / sports).</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Word Sense Disambiguation (WSD)</span>
            <p>"She went to the <strong>bank</strong> to deposit money." vs. "They sat on the <strong>bank</strong> of the river."<br>
            A semantic system must choose the correct sense of <em>bank</em> using surrounding context — this is WSD.</p>
          </div>

          <h4>Resources &amp; representations</h4>
          <ul class="key-points">
            <li><strong>WordNet</strong> — a lexical database organising words into sets of synonyms (synsets) linked by semantic relations.</li>
            <li><strong>Semantic roles</strong> — who did what to whom (Agent, Patient, Instrument).</li>
            <li><strong>Distributional semantics</strong> — "a word is known by the company it keeps" (Firth). The foundation of modern <strong>word embeddings</strong> covered in Unit II.</li>
          </ul>

          <div class="note-box"><strong>Connecting forward:</strong> Lexical semantics is the bridge to Unit II — word embeddings (Word2Vec, GloVe) are a way of capturing semantic similarity as geometric closeness in vector space.</div>
        `
      },
      {
        id: "challenges",
        group: "Foundations of NLP",
        title: "Challenges of NLP",
        html: `
          <p class="lead">Human language is messy, context-dependent, and constantly changing. These properties make NLP one of the hardest problems in AI. <strong>Ambiguity</strong> is the central, recurring challenge.</p>

          <h4>1. Ambiguity (the big one)</h4>
          <table class="lesson-table">
            <thead><tr><th>Type</th><th>Example</th><th>Issue</th></tr></thead>
            <tbody>
              <tr><td><strong>Lexical</strong></td><td>"I went to the <em>bank</em>."</td><td>Which sense of <em>bank</em>?</td></tr>
              <tr><td><strong>Syntactic / Structural</strong></td><td>"I saw the man with the telescope."</td><td>Two valid parse trees</td></tr>
              <tr><td><strong>Semantic</strong></td><td>"The chicken is ready to eat."</td><td>Who eats whom?</td></tr>
              <tr><td><strong>Referential (anaphora)</strong></td><td>"John told Bill that <em>he</em> failed."</td><td>Who is <em>he</em>?</td></tr>
              <tr><td><strong>Pragmatic</strong></td><td>"Can you pass the salt?"</td><td>A request, not a yes/no question</td></tr>
            </tbody>
          </table>

          <h4>2. Other key challenges</h4>
          <ul class="key-points">
            <li><strong>Context dependence</strong> — meaning shifts with situation, speaker, and prior discourse.</li>
            <li><strong>Idioms &amp; figurative language</strong> — "kick the bucket" ≠ kicking a bucket; sarcasm and irony invert literal meaning.</li>
            <li><strong>Co-reference &amp; long-range dependencies</strong> — tracking entities across sentences.</li>
            <li><strong>Spelling, slang, and noise</strong> — typos, abbreviations, emojis, code-switching, social-media text.</li>
            <li><strong>Out-of-vocabulary (OOV) words</strong> — new words, names, and rare terms unseen in training.</li>
            <li><strong>Language diversity &amp; low-resource languages</strong> — thousands of languages with little annotated data.</li>
            <li><strong>World knowledge &amp; common sense</strong> — understanding often needs facts not stated in the text.</li>
            <li><strong>Evolving language</strong> — new words, memes, and meanings appear constantly.</li>
          </ul>

          <div class="note-box"><strong>Exam tip:</strong> If asked "Why is NLP hard?", lead with <strong>ambiguity</strong> (and name its types), then list context-dependence, idioms/sarcasm, OOV words, and the need for world knowledge.</div>
        `
      },
      {
        id: "applications",
        group: "Foundations of NLP",
        title: "Applications of NLP",
        html: `
          <p class="lead">NLP powers a vast range of everyday technologies. Applications are commonly split into <strong>understanding (NLU)</strong> and <strong>generation (NLG)</strong> tasks.</p>

          <table class="lesson-table">
            <thead><tr><th>Application</th><th>What it does</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Machine Translation</strong></td><td>Translate text between languages</td><td>Google Translate</td></tr>
              <tr><td><strong>Sentiment Analysis</strong></td><td>Detect opinion/emotion polarity</td><td>Product-review monitoring</td></tr>
              <tr><td><strong>Information Retrieval</strong></td><td>Find relevant documents for a query</td><td>Search engines</td></tr>
              <tr><td><strong>Information Extraction / NER</strong></td><td>Pull structured facts &amp; entities from text</td><td>Resume parsing, news mining</td></tr>
              <tr><td><strong>Question Answering</strong></td><td>Answer questions from text</td><td>Siri, Alexa, chatbots</td></tr>
              <tr><td><strong>Text Summarization</strong></td><td>Condense long documents</td><td>News digests</td></tr>
              <tr><td><strong>Chatbots &amp; Dialogue</strong></td><td>Conversational agents</td><td>Customer-support bots, ChatGPT</td></tr>
              <tr><td><strong>Speech Recognition / TTS</strong></td><td>Speech ↔ text conversion</td><td>Voice assistants, dictation</td></tr>
              <tr><td><strong>Spam &amp; Toxicity Detection</strong></td><td>Classify/filter unwanted content</td><td>Email spam filters</td></tr>
              <tr><td><strong>Grammar &amp; Spell Check</strong></td><td>Detect and correct errors</td><td>Grammarly, autocorrect</td></tr>
              <tr><td><strong>Text Classification</strong></td><td>Assign categories/topics</td><td>News categorization</td></tr>
              <tr><td><strong>Autocomplete &amp; Prediction</strong></td><td>Predict the next word/phrase</td><td>Keyboard suggestions</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Try it here:</strong> The <strong>Playgrounds</strong> tab lets you experiment with several of these — a preprocessing/TF-IDF pipeline, embeddings, an LSTM sentiment classifier, attention-based translation, and GPT-style text generation.</div>
        `
      },
      {
        id: "tokenization",
        group: "Text Processing",
        title: "Tokenization",
        html: `
          <p class="lead">Text processing turns raw, unstructured text into a clean, structured form that algorithms can use. The first and most fundamental step is <strong>tokenization</strong>.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Tokenization</strong> is the process of breaking a stream of text into smaller meaningful units called <strong>tokens</strong> — typically words, subwords, punctuation marks, or characters.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Input: <span class="inline-code">"NLP isn't hard!"</span></p>
            <p>Word tokens: <span class="inline-code">["NLP", "is", "n't", "hard", "!"]</span></p>
          </div>

          <h4>Granularity of tokens</h4>
          <ul class="key-points">
            <li><strong>Word tokenization</strong> — split on whitespace/punctuation. Simple but struggles with contractions and OOV words.</li>
            <li><strong>Character tokenization</strong> — every character is a token. Tiny vocabulary, no OOV, but very long sequences.</li>
            <li><strong>Subword tokenization</strong> — splits rare words into reusable pieces (e.g. <em>tokenization → token + ##ization</em>). Used by BERT/GPT via Byte-Pair Encoding (BPE) and WordPiece (Unit V).</li>
          </ul>

          <h4>Why tokenization is non-trivial</h4>
          <ul class="key-points">
            <li>Contractions: <em>"don't"</em> → <em>do</em> + <em>n't</em>?</li>
            <li>Hyphenation: <em>"state-of-the-art"</em> — one token or four?</li>
            <li>Abbreviations &amp; sentence boundaries: the period in <em>"U.S.A."</em> vs end-of-sentence.</li>
            <li>Languages without spaces (Chinese, Japanese, Thai) need word segmentation.</li>
            <li>URLs, emails, hashtags, emojis, and numbers.</li>
          </ul>

          <div class="note-box"><strong>Pipeline note:</strong> Tokenization is the <em>gateway</em> step — every later step (stemming, stop-word removal, vectorization) operates on the tokens it produces. The <strong>Playgrounds → Text Preprocessor</strong> shows this live.</div>
        `
      },
      {
        id: "stemming",
        group: "Text Processing",
        title: "Stemming",
        html: `
          <p class="lead"><strong>Stemming</strong> reduces words to their root form by crudely chopping off affixes, so that variants of a word are treated as the same feature.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Stemming</strong> is a rule-based, heuristic process that strips suffixes (and sometimes prefixes) from words to produce a <em>stem</em>. The stem need not be a valid dictionary word.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <pre class="formula">connect, connected, connecting, connection  →  connect
studies   →  studi        (not a real word!)
fishing, fished, fisher   →  fish</pre>
          </div>

          <h4>Common algorithms</h4>
          <ul class="key-points">
            <li><strong>Porter Stemmer</strong> — the classic; applies sequential suffix-stripping rules. Fast and widely used.</li>
            <li><strong>Snowball (Porter2)</strong> — an improved, multilingual version of Porter.</li>
            <li><strong>Lancaster Stemmer</strong> — very aggressive (can over-stem).</li>
          </ul>

          <h4>Errors</h4>
          <ul class="key-points">
            <li><strong>Over-stemming</strong> — two different words reduced to the same stem (<em>universal, university → univers</em>).</li>
            <li><strong>Under-stemming</strong> — related words not reduced to the same stem (<em>data</em> vs <em>datum</em>).</li>
          </ul>

          <div class="note-box"><strong>Stemming vs. Lemmatization (preview):</strong> Stemming is fast and crude (may produce non-words); lemmatization is slower but linguistically correct (always a real dictionary word). See the next topic for the full comparison.</div>
        `
      },
      {
        id: "lemmatization",
        group: "Text Processing",
        title: "Lemmatization",
        html: `
          <p class="lead"><strong>Lemmatization</strong> reduces a word to its <em>lemma</em> — its canonical dictionary base form — using vocabulary and morphological analysis.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>lemma</strong> is the dictionary head-word for a set of inflected forms. Lemmatization maps each word-form to its lemma, considering its part of speech and meaning.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <pre class="formula">am, are, is        →  be
better             →  good   (needs POS = adjective)
running, ran       →  run
mice               →  mouse
studies            →  study  (a real word, unlike stemming's "studi")</pre>
          </div>

          <h4>Stemming vs. Lemmatization</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>Stemming</th><th>Lemmatization</th></tr></thead>
            <tbody>
              <tr><td>Method</td><td>Rule-based suffix chopping</td><td>Dictionary + morphological analysis</td></tr>
              <tr><td>Output</td><td>A stem (may be a non-word)</td><td>A valid dictionary lemma</td></tr>
              <tr><td>Uses POS / context?</td><td>No</td><td>Yes</td></tr>
              <tr><td>Speed</td><td>Fast</td><td>Slower</td></tr>
              <tr><td>Accuracy</td><td>Lower</td><td>Higher</td></tr>
              <tr><td>Example</td><td><em>caring → car</em> (wrong)</td><td><em>caring → care</em> (correct)</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>When to use which?</strong> Use <strong>stemming</strong> when speed matters and slight inaccuracy is acceptable (large-scale search indexing). Use <strong>lemmatization</strong> when correctness matters (chatbots, semantic tasks). Both reduce vocabulary size and data sparsity.</div>
        `
      },
      {
        id: "stopwords",
        group: "Text Processing",
        title: "Stop-word Removal",
        html: `
          <p class="lead"><strong>Stop words</strong> are extremely common words that carry little distinguishing meaning and are often removed to reduce noise and dimensionality.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Stop-word removal</strong> filters out high-frequency, low-information words (e.g. <em>the, is, at, of, and, a, an, in</em>) from text before further processing.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Input: <span class="inline-code">"the cat is sitting on the mat"</span></p>
            <p>After removal: <span class="inline-code">["cat", "sitting", "mat"]</span></p>
          </div>

          <h4>Benefits</h4>
          <ul class="key-points">
            <li>Reduces vocabulary size and feature dimensionality.</li>
            <li>Lets models focus on content-bearing words.</li>
            <li>Improves efficiency for retrieval and classic bag-of-words models.</li>
          </ul>

          <h4>Cautions — don't always remove them</h4>
          <ul class="key-points">
            <li><strong>Sentiment</strong>: "<em>not</em> good" — removing <em>not</em> flips the meaning!</li>
            <li><strong>Phrase queries</strong>: "<em>to be or not to be</em>" is almost entirely stop words.</li>
            <li>Modern <strong>transformer models</strong> usually keep stop words — context matters.</li>
          </ul>

          <div class="note-box"><strong>Note:</strong> There is no single universal stop-word list; it is task- and language-dependent. The Playgrounds preprocessor highlights stop words in <span style="color:var(--danger)">red</span>.</div>
        `
      },
      {
        id: "punctuation",
        group: "Text Processing",
        title: "Punctuation Handling",
        html: `
          <p class="lead">Punctuation marks (<span class="inline-code">. , ! ? ; : " ' ( )</span>) must be handled carefully — sometimes removed, sometimes kept as meaningful tokens.</p>

          <h4>Common strategies</h4>
          <ul class="key-points">
            <li><strong>Removal</strong> — strip all punctuation for bag-of-words/TF-IDF models where it adds noise.</li>
            <li><strong>Keep as tokens</strong> — retain marks when they carry signal (e.g. "!" for sentiment, "?" for questions).</li>
            <li><strong>Sentence segmentation</strong> — use <em>. ! ?</em> to split text into sentences <em>before</em> stripping them.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Input: <span class="inline-code">"Wow!!! This is great, isn't it?"</span></p>
            <p>After punctuation removal: <span class="inline-code">["wow", "this", "is", "great", "isnt", "it"]</span></p>
          </div>

          <h4>Pitfalls</h4>
          <ul class="key-points">
            <li>Naively deleting the apostrophe turns <em>"isn't"</em> into <em>"isnt"</em> — handle contractions first.</li>
            <li>Decimal points and thousands separators in numbers (<em>3.14</em>, <em>1,000</em>).</li>
            <li>Punctuation inside URLs, emails, emoticons (<em>:-)</em>) and hashtags.</li>
          </ul>

          <div class="note-box"><strong>Order matters:</strong> Decide punctuation handling relative to tokenization and contraction expansion. A common, safe pipeline is: <em>lowercase → expand contractions → tokenize → strip stray punctuation</em>.</div>
        `
      },
      {
        id: "oov",
        group: "Text Processing",
        title: "Handling Out-of-Vocabulary (OOV) Words",
        html: `
          <p class="lead"><strong>Out-of-vocabulary (OOV)</strong> words are words encountered at test/inference time that were not present in the model's training vocabulary.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>An <strong>OOV word</strong> is any token absent from the fixed vocabulary built during training — typically rare words, new slang, misspellings, names, or technical terms.</p>
          </div>

          <h4>Why OOV words are a problem</h4>
          <p>Classic models map words to fixed indices. An unseen word has no index, no embedding, and no statistics — so the model cannot represent it and may simply ignore it, losing information.</p>

          <h4>Strategies to handle OOV</h4>
          <ul class="key-points">
            <li><strong>&lt;UNK&gt; token</strong> — replace all rare/unseen words with a single special "unknown" token.</li>
            <li><strong>Subword tokenization (BPE / WordPiece)</strong> — break unknown words into known subword pieces, so almost nothing is truly OOV (e.g. <em>"cryptocurrency" → crypto + currency</em>).</li>
            <li><strong>Character-level models</strong> — operate on characters, eliminating OOV entirely.</li>
            <li><strong>Spelling correction / normalization</strong> — map misspellings back to known words.</li>
            <li><strong>FastText-style embeddings</strong> — build word vectors from character n-grams, so even unseen words get a vector.</li>
          </ul>

          <div class="note-box"><strong>Modern answer:</strong> Subword tokenization (Unit V) largely solved the OOV problem for transformers — any word can be composed from a fixed set of subword units, balancing vocabulary size against sequence length.</div>
        `
      },
      {
        id: "normalization",
        group: "Text Processing",
        title: "Text Normalization",
        html: `
          <p class="lead"><strong>Normalization</strong> transforms text into a single, consistent canonical form so that superficial variations are not treated as different tokens.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Text normalization</strong> is the umbrella term for operations that standardize text — reducing variation that does not change meaning.</p>
          </div>

          <h4>Common normalization steps</h4>
          <ul class="key-points">
            <li><strong>Lowercasing</strong> — <em>Apple → apple</em> (careful: may merge the company with the fruit).</li>
            <li><strong>Removing accents/diacritics</strong> — <em>café → cafe</em>.</li>
            <li><strong>Expanding contractions</strong> — <em>can't → cannot</em>.</li>
            <li><strong>Standardizing numbers/dates/currency</strong> — map to placeholders like <span class="inline-code">&lt;NUM&gt;</span>.</li>
            <li><strong>Removing extra whitespace, HTML tags, URLs</strong>.</li>
            <li><strong>Unicode normalization</strong> — unify equivalent character encodings (NFC/NFKC).</li>
            <li><strong>Stemming / lemmatization</strong> — also forms of normalization (covered above).</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Input: <span class="inline-code">"  Can't WAIT for the Café!! 😋  "</span></p>
            <p>Normalized: <span class="inline-code">"cannot wait for the cafe"</span></p>
          </div>

          <div class="note-box"><strong>Trade-off:</strong> More aggressive normalization shrinks the vocabulary and reduces sparsity, but can destroy useful signal (case, emphasis, emojis). Choose steps to match the task.</div>
        `
      },
      {
        id: "bow",
        group: "Text Processing",
        title: "Bag-of-Words (BoW)",
        html: `
          <p class="lead">To feed text into ML models we must convert tokens into numbers. The <strong>Bag-of-Words</strong> model is the simplest such <em>vectorization</em> (feature-extraction) technique.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Bag-of-Words</strong> represents a document as a vector of word counts over a fixed vocabulary, <em>ignoring grammar and word order</em> — keeping only multiplicity (which words appear, and how often).</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Worked example</span>
            <p>Documents:</p>
            <pre class="formula">D1: "the cat sat"
D2: "the dog sat"</pre>
            <p>Vocabulary: <span class="inline-code">[cat, dog, sat, the]</span></p>
            <table class="lesson-table">
              <thead><tr><th>Doc</th><th>cat</th><th>dog</th><th>sat</th><th>the</th></tr></thead>
              <tbody>
                <tr><td>D1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                <tr><td>D2</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
              </tbody>
            </table>
          </div>

          <h4>Properties</h4>
          <ul class="key-points">
            <li>Simple, fast, interpretable; strong baseline for text classification.</li>
            <li><strong>Sparse, high-dimensional</strong> vectors (one dimension per vocabulary word).</li>
            <li><strong>Loses word order</strong>: "dog bites man" and "man bites dog" get identical vectors.</li>
            <li>Treats all words as equally important — common words dominate (fixed by TF-IDF).</li>
            <li>No notion of semantic similarity (<em>cat</em> and <em>kitten</em> are unrelated dimensions).</li>
          </ul>

          <div class="note-box"><strong>See it live:</strong> The <strong>Playgrounds → Text Preprocessor</strong> builds a BoW/TF-IDF matrix for your input against a reference corpus.</div>
        `
      },
      {
        id: "ngrams",
        group: "Text Processing",
        title: "N-grams",
        html: `
          <p class="lead">Because Bag-of-Words throws away order, we use <strong>n-grams</strong> to capture <em>some</em> local word-order and context.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>An <strong>n-gram</strong> is a contiguous sequence of <em>n</em> items (usually words) from a text. <em>n</em> = 1 → unigram, 2 → bigram, 3 → trigram.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Example — "I love natural language processing"</span>
            <pre class="formula">Unigrams: I | love | natural | language | processing
Bigrams : "I love" | "love natural" | "natural language" | "language processing"
Trigrams: "I love natural" | "love natural language" | "natural language processing"</pre>
          </div>

          <h4>Why n-grams matter</h4>
          <ul class="key-points">
            <li>Capture local context &amp; phrases: <em>"New York"</em>, <em>"not good"</em>, <em>"machine learning"</em>.</li>
            <li>Foundation of classic <strong>language models</strong>: predict the next word from the previous (n−1) words using probabilities estimated from a corpus.</li>
            <li>Used as richer features alongside BoW/TF-IDF.</li>
          </ul>

          <h4>The trade-off</h4>
          <ul class="key-points">
            <li><strong>Larger n</strong> → more context, but exponentially more features → severe <strong>data sparsity</strong> (most n-grams never seen).</li>
            <li><strong>Smaller n</strong> → less context, but more reliable counts.</li>
            <li>Smoothing (e.g. Laplace/add-one) handles unseen n-grams in language models.</li>
          </ul>

          <div class="note-box"><strong>Markov assumption:</strong> N-gram language models assume the next word depends only on the previous (n−1) words — a simplification that makes computation tractable. Neural models (Units III–V) relax this to capture long-range dependencies.</div>
        `
      },
      {
        id: "tfidf",
        group: "Text Processing",
        title: "TF-IDF",
        html: `
          <p class="lead"><strong>TF-IDF</strong> improves on raw Bag-of-Words counts by weighting words according to how <em>informative</em> they are — boosting rare, distinctive words and down-weighting ubiquitous ones.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>TF-IDF (Term Frequency – Inverse Document Frequency)</strong> is a numerical statistic reflecting how important a word is to a document <em>within a collection (corpus)</em>.</p>
          </div>

          <h4>The two components</h4>
          <p><strong>Term Frequency (TF)</strong> — how often term <em>t</em> appears in document <em>d</em>:</p>
          <pre class="formula">TF(t, d) = (count of t in d) / (total terms in d)</pre>

          <p><strong>Inverse Document Frequency (IDF)</strong> — how rare term <em>t</em> is across the corpus of N documents:</p>
          <pre class="formula">IDF(t) = log( N / df(t) )

   N      = total number of documents
   df(t)  = number of documents containing t</pre>

          <p><strong>The combined score:</strong></p>
          <pre class="formula">TF-IDF(t, d) = TF(t, d) × IDF(t)</pre>

          <div class="example-box">
            <span class="ex-tag">Intuition</span>
            <ul class="key-points">
              <li>A word frequent in <em>one</em> document but rare across the corpus → <strong>high</strong> TF-IDF (very distinctive).</li>
              <li>A word in <em>every</em> document (like <em>"the"</em>) → df ≈ N → IDF ≈ log(1) = 0 → <strong>score ≈ 0</strong>.</li>
              <li>So TF-IDF automatically suppresses stop-word-like terms without an explicit stop-list.</li>
            </ul>
          </div>

          <h4>Worked mini-example</h4>
          <p>Corpus of N = 3 docs. The word <em>"cat"</em> appears in 1 doc; <em>"the"</em> appears in all 3.</p>
          <pre class="formula">IDF("cat") = log(3/1) = log 3 ≈ 1.10   → informative
IDF("the") = log(3/3) = log 1 = 0       → ignored</pre>

          <h4>Uses &amp; limits</h4>
          <ul class="key-points">
            <li>Workhorse for <strong>information retrieval</strong>, search ranking, and text classification features.</li>
            <li>Still <strong>order-blind</strong> and <strong>semantics-blind</strong> (synonyms remain separate dimensions).</li>
            <li>These limits motivate dense <strong>word embeddings</strong> in Unit II.</li>
          </ul>

          <div class="note-box"><strong>See it live:</strong> Run the <strong>Playgrounds → Text Preprocessor</strong> to view a real TF-IDF matrix comparing your text against a sample corpus.</div>
        `
      }
    ]
  },
  { id: 2, num: "Unit II", title: "Word Embeddings and Vector Representations", intro: "", sections: [], comingSoon: true },
  { id: 3, num: "Unit III", title: "Deep Learning Sequence Models for NLP", intro: "", sections: [], comingSoon: true },
  { id: 4, num: "Unit IV", title: "Sequence-to-Sequence Models and Attention", intro: "", sections: [], comingSoon: true },
  { id: 5, num: "Unit V", title: "Transformers & Pretrained Language Models", intro: "", sections: [], comingSoon: true },
  { id: 6, num: "Unit VI", title: "Generative NLP and LLMs", intro: "", sections: [], comingSoon: true }
];

let activeLessonUnitId = 1;

function initLessons() {
  const tabsContainer = document.getElementById('lesson-unit-tabs');
  if (!tabsContainer) return;

  // Render unit selector pills
  tabsContainer.innerHTML = '';
  LESSONS_DATA.forEach(unit => {
    const btn = document.createElement('button');
    btn.className = 'lesson-unit-pill' + (unit.id === activeLessonUnitId ? ' active' : '');
    btn.innerHTML = `<span class="pill-num">${unit.num}</span><span class="pill-title">${unit.title}</span>`;
    btn.addEventListener('click', () => {
      activeLessonUnitId = unit.id;
      renderLessonUnit(unit.id);
      document.querySelectorAll('.lesson-unit-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    });
    tabsContainer.appendChild(btn);
  });

  renderLessonUnit(activeLessonUnitId);
}

function renderLessonUnit(unitId) {
  const unit = LESSONS_DATA.find(u => u.id === unitId);
  const toc = document.getElementById('lesson-toc');
  const content = document.getElementById('lesson-content');
  const badge = document.getElementById('lesson-progress-badge');
  if (!unit || !toc || !content) return;

  if (badge) badge.textContent = unit.num;

  // Coming-soon units
  if (unit.comingSoon || !unit.sections.length) {
    toc.innerHTML = '';
    content.innerHTML = `
      <div class="panel lesson-empty">
        <h3 style="color:white; margin-bottom:0.5rem;">${unit.num}: ${unit.title}</h3>
        <p style="color:var(--text-muted);">Detailed notes for this unit are coming soon. Unit I is fully available — select it above to start studying.</p>
      </div>`;
    return;
  }

  // Build grouped Table of Contents
  const groups = [];
  unit.sections.forEach(sec => {
    let g = groups.find(x => x.name === sec.group);
    if (!g) { g = { name: sec.group, items: [] }; groups.push(g); }
    g.items.push(sec);
  });

  let tocHtml = `<div class="toc-head">On this page</div>`;
  groups.forEach(g => {
    tocHtml += `<div class="toc-group-label">${g.name}</div>`;
    g.items.forEach((sec, i) => {
      tocHtml += `<a href="#lesson-${sec.id}" class="toc-link" data-target="lesson-${sec.id}">${sec.title}</a>`;
    });
  });
  toc.innerHTML = tocHtml;

  // Build content
  let html = `
    <div class="lesson-banner">
      <span class="badge badge-indigo">${unit.num}</span>
      <h3>${unit.title}</h3>
      <p>${unit.intro}</p>
    </div>`;

  let n = 0;
  let currentGroup = null;
  unit.sections.forEach(sec => {
    if (sec.group !== currentGroup) {
      currentGroup = sec.group;
      html += `<div class="lesson-group-divider"><span>${currentGroup}</span></div>`;
    }
    n++;
    html += `
      <article class="lesson-section" id="lesson-${sec.id}">
        <h3 class="lesson-section-title"><span class="lesson-num">${n}</span>${sec.title}</h3>
        <div class="lesson-prose">${sec.html}</div>
      </article>`;
  });
  content.innerHTML = html;

  // Smooth scroll + active-link highlighting for TOC
  toc.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.getElementById(link.getAttribute('data-target'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  setupLessonScrollSpy();
}

function setupLessonScrollSpy() {
  const sections = document.querySelectorAll('.lesson-section');
  const links = document.querySelectorAll('.toc-link');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', initLessons);
