/* ==========================================================================
   NLP Learning Hub - Lessons & Study Notes
   Detailed, exam-ready theory content rendered into the Lessons view.
   All six units (I–VI) are fully authored with exam-ready content.
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
  {
    id: 2,
    num: "Unit II",
    title: "Word Embeddings and Vector Representations",
    intro: "This unit moves from sparse count-based representations to dense word embeddings — vectors that place words in a continuous space where geometric closeness reflects meaning. We cover vector space models, Word2Vec (CBOW and Skip-Gram), GloVe, how these capture similarity and analogies, and how to visualize the resulting spaces with PCA and t-SNE.",
    sections: [
      {
        id: "vsm",
        group: "Representations",
        title: "Vector Space Models",
        html: `
          <p class="lead">A <strong>Vector Space Model (VSM)</strong> represents words or documents as <strong>vectors of real numbers</strong> in a continuous multi-dimensional space, so that mathematical operations (distance, dot product) become proxies for linguistic relationships.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>vector space model</strong> embeds text units as points in an <em>n</em>-dimensional real-valued space. Similar meanings map to nearby points; the geometry of the space encodes relationships learned from data.</p>
          </div>

          <h4>One-hot encoding — the naive baseline</h4>
          <p>The simplest representation gives each word its own dimension: a vector of all zeros with a single <span class="inline-code">1</span> at the word's index.</p>
          <pre class="formula">Vocabulary: [cat, dog, sat, the]
cat = [1, 0, 0, 0]
dog = [0, 1, 0, 0]
sat = [0, 0, 1, 0]</pre>

          <h4>Why one-hot fails</h4>
          <ul class="key-points">
            <li><strong>Huge &amp; sparse</strong> — dimension = vocabulary size (often 100k+); almost all entries are 0.</li>
            <li><strong>No notion of similarity</strong> — every pair of words is equally distant (dot product of any two distinct one-hot vectors = 0). <em>cat</em> and <em>kitten</em> look as unrelated as <em>cat</em> and <em>democracy</em>.</li>
            <li><strong>Curse of dimensionality</strong> — models need far more data to learn in such high-dimensional sparse spaces.</li>
          </ul>

          <div class="note-box"><strong>The distributional hypothesis (Firth, 1957):</strong> "You shall know a word by the company it keeps." Words that occur in similar contexts tend to have similar meanings — the core idea behind every embedding method in this unit.</div>
        `
      },
      {
        id: "dense-embeddings",
        group: "Representations",
        title: "Dense Word Embeddings",
        html: `
          <p class="lead">A <strong>dense word embedding</strong> represents each word as a short, real-valued vector (typically 50–300 dimensions) learned so that <em>similar words have similar vectors</em>.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>word embedding</strong> is a learned mapping from words to dense vectors in a low-dimensional continuous space, where distance and direction carry semantic meaning.</p>
          </div>

          <h4>Sparse vs. dense</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>Sparse (one-hot / BoW)</th><th>Dense (embedding)</th></tr></thead>
            <tbody>
              <tr><td>Dimensions</td><td>= vocabulary size (10k–1M)</td><td>Small &amp; fixed (50–300)</td></tr>
              <tr><td>Values</td><td>Mostly 0, integer counts</td><td>Real numbers (e.g. 0.21, −0.84)</td></tr>
              <tr><td>Similarity</td><td>None — all words orthogonal</td><td>Captured by cosine/distance</td></tr>
              <tr><td>Learned from</td><td>Counting</td><td>Predictive / co-occurrence training</td></tr>
              <tr><td>Generalization</td><td>Poor</td><td>Strong (shares signal across words)</td></tr>
            </tbody>
          </table>

          <div class="example-box">
            <span class="ex-tag">Illustration (2-D)</span>
            <pre class="formula">king   = [ 0.92,  0.55]
queen  = [ 0.88,  0.61]   ← near "king"
apple  = [-0.40, -0.77]   ← far from both</pre>
            <p>In a good embedding space, <em>king</em> and <em>queen</em> sit close together while <em>apple</em> lies elsewhere — distance reflects meaning.</p>
          </div>

          <div class="note-box"><strong>Key benefit:</strong> Dense embeddings let knowledge <em>transfer</em> between words. If a model learns something about <em>cat</em>, the nearby vector for <em>kitten</em> benefits too — impossible with one-hot encoding.</div>
        `
      },
      {
        id: "word2vec",
        group: "Embedding Models",
        title: "Word2Vec",
        html: `
          <p class="lead"><strong>Word2Vec</strong> (Mikolov et al., Google, 2013) is a family of shallow neural networks that learn word embeddings by predicting words from their context — turning the distributional hypothesis into a trainable objective.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Word2Vec</strong> learns embeddings via a <em>self-supervised</em> prediction task over a sliding context window. It has two architectures: <strong>CBOW</strong> (predict the center word from context) and <strong>Skip-Gram</strong> (predict context from the center word).</p>
          </div>

          <h4>Core idea</h4>
          <ul class="key-points">
            <li>Slide a fixed <strong>context window</strong> across the corpus (e.g. ±2 words around a center word).</li>
            <li>Train a network on the prediction task; the <strong>hidden-layer weights become the word vectors</strong>.</li>
            <li>No labels needed — the text supplies its own supervision (self-supervised learning).</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Context window — "the quick brown fox jumps"</span>
            <pre class="formula">center = "brown",  window = ±2
context = { the, quick, fox, jumps }</pre>
          </div>

          <h4>Training efficiency tricks</h4>
          <ul class="key-points">
            <li><strong>Negative sampling</strong> — instead of a costly softmax over the whole vocabulary, train to separate the true context word from a few random "negative" words. Makes training fast and scalable.</li>
            <li><strong>Hierarchical softmax</strong> — an alternative using a binary tree over the vocabulary (log-time).</li>
            <li><strong>Subsampling frequent words</strong> — randomly drop very common words (<em>the, of</em>) to focus on informative ones.</li>
          </ul>

          <div class="note-box"><strong>Result:</strong> Word2Vec produces a single static vector per word. Its breakthrough was showing that simple, scalable prediction over raw text yields embeddings rich enough to encode analogies and similarity. CBOW and Skip-Gram are detailed next.</div>
        `
      },
      {
        id: "cbow",
        group: "Embedding Models",
        title: "CBOW (Continuous Bag-of-Words)",
        html: `
          <p class="lead"><strong>CBOW</strong> predicts a <em>target (center) word</em> from the surrounding <em>context words</em>. It treats the context as an unordered bag and averages their vectors.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>The <strong>Continuous Bag-of-Words</strong> model maximizes the probability of the center word given its context: <span class="inline-code">P(w_t | w_{t−k}, …, w_{t+k})</span>.</p>
          </div>

          <h4>Architecture (3 layers)</h4>
          <pre class="formula">context words (one-hot)
        ↓  (shared input→hidden weight matrix W)
   average of context vectors   ← hidden layer (the embedding)
        ↓  (hidden→output weight matrix W')
   softmax over vocabulary → predict center word</pre>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Sentence: "the cat <strong>___</strong> on the mat", context = {the, cat, on, the, mat}.<br>
            CBOW averages those context embeddings and predicts the missing center word <em>sat</em>.</p>
          </div>

          <h4>Characteristics</h4>
          <ul class="key-points">
            <li><strong>Faster to train</strong> than Skip-Gram (one prediction per window).</li>
            <li><strong>Better for frequent words</strong>; smooths over context by averaging.</li>
            <li>Order within the window is ignored ("bag").</li>
          </ul>

          <div class="note-box"><strong>Mnemonic:</strong> CBOW = "Context → Word". Many inputs (context) predict one output (center word).</div>
        `
      },
      {
        id: "skipgram",
        group: "Embedding Models",
        title: "Skip-Gram",
        html: `
          <p class="lead"><strong>Skip-Gram</strong> is the mirror image of CBOW: it predicts the <em>context words</em> from a single <em>center word</em>.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>The <strong>Skip-Gram</strong> model maximizes the probability of the surrounding context given the center word: <span class="inline-code">P(w_{t−k}, …, w_{t+k} | w_t)</span>.</p>
          </div>

          <h4>Architecture</h4>
          <pre class="formula">center word (one-hot)
        ↓  (input→hidden weight matrix W = embeddings)
   center word vector   ← hidden layer
        ↓  (hidden→output)
   softmax → predict each context word</pre>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Center = <strong>"sat"</strong> → model is trained to predict its neighbors {the, cat, on, mat}. Each (center, context) pair is one training example.</p>
          </div>

          <h4>CBOW vs. Skip-Gram</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>CBOW</th><th>Skip-Gram</th></tr></thead>
            <tbody>
              <tr><td>Predicts</td><td>Center word from context</td><td>Context from center word</td></tr>
              <tr><td>Speed</td><td>Faster</td><td>Slower</td></tr>
              <tr><td>Rare words</td><td>Weaker</td><td><strong>Better</strong> (more updates per word)</td></tr>
              <tr><td>Small datasets</td><td>Less robust</td><td><strong>Works well</strong></td></tr>
              <tr><td>Direction</td><td>Many → one</td><td>One → many</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Exam tip:</strong> Skip-Gram with negative sampling (SGNS) is the most commonly used Word2Vec variant — it gives high-quality vectors for rare words and scales to billions of tokens.</div>
        `
      },
      {
        id: "glove",
        group: "Embedding Models",
        title: "GloVe Embeddings",
        html: `
          <p class="lead"><strong>GloVe</strong> (Global Vectors, Stanford, 2014) learns embeddings from <strong>global word–word co-occurrence statistics</strong>, combining the strengths of count-based and predictive methods.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>GloVe</strong> factorizes a global co-occurrence matrix so that the <em>dot product</em> of two word vectors approximates the <em>log</em> of how often they co-occur across the whole corpus: <span class="inline-code">wᵢ·wⱼ ≈ log Xᵢⱼ</span>.</p>
          </div>

          <h4>How it differs from Word2Vec</h4>
          <table class="lesson-table">
            <thead><tr><th></th><th>Word2Vec</th><th>GloVe</th></tr></thead>
            <tbody>
              <tr><td>Information used</td><td>Local context windows</td><td>Global co-occurrence counts</td></tr>
              <tr><td>Method</td><td>Predictive (neural)</td><td>Count-based matrix factorization</td></tr>
              <tr><td>Objective</td><td>Predict neighbors</td><td>Fit <span class="inline-code">wᵢ·wⱼ ≈ log Xᵢⱼ</span></td></tr>
            </tbody>
          </table>

          <h4>The co-occurrence ratio insight</h4>
          <p>GloVe's key observation: <em>ratios</em> of co-occurrence probabilities encode meaning. For words <em>ice</em> and <em>steam</em>:</p>
          <pre class="formula">P(solid | ice) / P(solid | steam)  →  large  (solid relates to ice)
P(gas   | ice) / P(gas   | steam)  →  small  (gas relates to steam)
P(water | ice) / P(water | steam)  →  ≈ 1    (relates to both)</pre>

          <div class="note-box"><strong>Takeaway:</strong> Word2Vec and GloVe usually give comparable quality. Word2Vec streams over text; GloVe pre-computes a global count matrix. Both produce <em>static</em> embeddings — one fixed vector per word, regardless of sentence context (a limitation later fixed by contextual models like BERT in Unit V).</div>
        `
      },
      {
        id: "semantic-similarity",
        group: "Geometry & Visualization",
        title: "Capturing Semantic Similarity",
        html: `
          <p class="lead">In embedding space, <strong>semantic similarity becomes geometric proximity</strong>. The standard measure is <strong>cosine similarity</strong> — the angle between two vectors.</p>

          <div class="def-box">
            <span class="def-tag">Cosine similarity</span>
            <pre class="formula">cos(θ) =  (A · B) / (||A|| × ||B||)

  A · B      = dot product
  ||A||      = length (magnitude) of A
  range: −1 (opposite) … 0 (unrelated) … +1 (identical direction)</pre>
          </div>

          <h4>Why cosine, not Euclidean distance?</h4>
          <ul class="key-points">
            <li>Cosine measures <strong>direction</strong>, ignoring vector length — robust to differences in word frequency/magnitude.</li>
            <li>Two words used in similar contexts point the <em>same way</em>, even if one is more frequent.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <pre class="formula">cos(cat, kitten)  ≈ 0.80   → very similar
cos(cat, dog)     ≈ 0.76   → related (both pets)
cos(cat, car)     ≈ 0.10   → unrelated</pre>
            <p>Nearest-neighbor search by cosine similarity retrieves a word's closest semantic relatives.</p>
          </div>

          <div class="note-box"><strong>Application:</strong> Cosine similarity over embeddings powers semantic search, recommendation, clustering, and duplicate detection — finding "things that mean the same" rather than "things that share exact words."</div>
        `
      },
      {
        id: "analogy",
        group: "Geometry & Visualization",
        title: "Analogy Relationships",
        html: `
          <p class="lead">A striking property of good embeddings is that <strong>relationships are encoded as consistent vector directions</strong>, enabling analogies to be solved with simple arithmetic.</p>

          <div class="def-box">
            <span class="def-tag">The famous example</span>
            <pre class="formula">vec("king") − vec("man") + vec("woman") ≈ vec("queen")</pre>
            <p>"man is to king as woman is to ___" → the math lands nearest to <strong>queen</strong>.</p>
          </div>

          <h4>Why it works</h4>
          <p>The vector <span class="inline-code">king − man</span> isolates a consistent "royalty/gender" direction. Adding it to <em>woman</em> moves to the analogous point. The relationship is a <strong>linear offset</strong> shared across many word pairs.</p>

          <div class="example-box">
            <span class="ex-tag">More analogies</span>
            <pre class="formula">Paris − France + Italy   ≈ Rome        (capital-of)
walking − walk + swim    ≈ swimming    (verb tense)
bigger − big + small     ≈ smaller     (comparative)</pre>
          </div>

          <h4>Solving an analogy</h4>
          <p>For "a : b :: c : ?", compute <span class="inline-code">b − a + c</span> and return the vocabulary word with the highest cosine similarity to the result (excluding a, b, c).</p>

          <div class="note-box"><strong>Caveat:</strong> Analogy arithmetic is impressive but imperfect — it reflects, and can amplify, <strong>biases</strong> present in the training corpus (e.g. gender/occupation stereotypes). Debiasing embeddings is an active research area.</div>
        `
      },
      {
        id: "visualization",
        group: "Geometry & Visualization",
        title: "Visualizing Embeddings — PCA & t-SNE",
        html: `
          <p class="lead">Embeddings live in 50–300 dimensions, which humans cannot see. <strong>Dimensionality reduction</strong> projects them down to 2-D or 3-D so we can inspect clusters and relationships.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Dimensionality reduction</strong> maps high-dimensional vectors to a low-dimensional space while preserving as much meaningful structure as possible.</p>
          </div>

          <h4>PCA — Principal Component Analysis</h4>
          <ul class="key-points">
            <li><strong>Linear</strong> method: finds the orthogonal directions (principal components) of <em>maximum variance</em> and projects onto the top few.</li>
            <li><strong>Fast, deterministic</strong>, preserves <em>global</em> structure and large distances.</li>
            <li>May blur fine local clusters because it only captures linear structure.</li>
          </ul>

          <h4>t-SNE — t-Distributed Stochastic Neighbor Embedding</h4>
          <ul class="key-points">
            <li><strong>Non-linear</strong> method that preserves <em>local</em> neighborhoods — keeps nearby points nearby.</li>
            <li>Produces visually striking, well-separated clusters.</li>
            <li><strong>Slower, stochastic</strong> (different runs differ); the <em>perplexity</em> hyperparameter matters; <strong>global</strong> distances between clusters are not meaningful.</li>
          </ul>

          <h4>PCA vs. t-SNE</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>PCA</th><th>t-SNE</th></tr></thead>
            <tbody>
              <tr><td>Type</td><td>Linear</td><td>Non-linear</td></tr>
              <tr><td>Preserves</td><td>Global variance</td><td>Local neighborhoods</td></tr>
              <tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
              <tr><td>Deterministic?</td><td>Yes</td><td>No</td></tr>
              <tr><td>Best for</td><td>Quick overview, preprocessing</td><td>Beautiful cluster visualization</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Practical tip:</strong> A common workflow is PCA first (e.g. to 50-D) to denoise and speed things up, then t-SNE (or UMAP) to 2-D for the final plot. <strong>See it live</strong> in <strong>Playgrounds → Embeddings 2D Space</strong>.</div>
        `
      }
    ]
  },
  {
    id: 3,
    num: "Unit III",
    title: "Deep Learning Sequence Models for NLP",
    intro: "Language is sequential — meaning depends on order and on what came before. This unit covers the neural architectures built for sequences: recurrent neural networks and their gated variants (LSTM, GRU), bidirectional models, their classification applications, the training techniques that make them work (teacher forcing, truncated BPTT), and how sequence tasks are evaluated.",
    sections: [
      {
        id: "sequential-data",
        group: "Recurrent Architectures",
        title: "Sequential Text Data",
        html: `
          <p class="lead"><strong>Sequential data</strong> is data where <em>order matters</em> and elements depend on their neighbors. Text is inherently sequential — a sentence is an ordered stream of tokens.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>sequence model</strong> processes inputs that arrive in order, maintaining information about earlier elements to interpret later ones. The output can depend on the entire preceding context.</p>
          </div>

          <h4>Why feed-forward networks struggle with text</h4>
          <ul class="key-points">
            <li><strong>Variable length</strong> — sentences differ in length; a fixed-size input layer can't adapt.</li>
            <li><strong>No memory of order</strong> — "dog bites man" vs "man bites dog" would look the same to a bag-of-words feed-forward net.</li>
            <li><strong>No parameter sharing across positions</strong> — a word's meaning shouldn't depend on which slot it lands in.</li>
          </ul>

          <h4>Types of sequence problems</h4>
          <table class="lesson-table">
            <thead><tr><th>Pattern</th><th>Input → Output</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td>One-to-many</td><td>1 → sequence</td><td>Image captioning</td></tr>
              <tr><td>Many-to-one</td><td>sequence → 1</td><td>Sentiment classification</td></tr>
              <tr><td>Many-to-many (aligned)</td><td>sequence → sequence (same length)</td><td>POS tagging, NER</td></tr>
              <tr><td>Many-to-many (seq2seq)</td><td>sequence → sequence (different length)</td><td>Machine translation</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Connecting forward:</strong> RNNs (next) introduce a <em>hidden state</em> that carries memory across time steps — the key mechanism for handling order and variable length.</div>
        `
      },
      {
        id: "rnn",
        group: "Recurrent Architectures",
        title: "Recurrent Neural Networks (RNN)",
        html: `
          <p class="lead">A <strong>Recurrent Neural Network</strong> processes a sequence one element at a time, maintaining a <strong>hidden state</strong> that summarizes everything seen so far and is fed back into the network at each step.</p>

          <div class="def-box">
            <span class="def-tag">The recurrence</span>
            <pre class="formula">hₜ = tanh( Wₓ · xₜ  +  Wₕ · hₜ₋₁  +  b )
yₜ = Wy · hₜ

  xₜ    = input at time t
  hₜ    = hidden state (memory) at time t
  hₜ₋₁  = previous hidden state
  W*    = weight matrices SHARED across all time steps</pre>
          </div>

          <h4>Unrolling through time</h4>
          <pre class="formula">x₁ → [RNN] → h₁ → [RNN] → h₂ → [RNN] → h₃ → …
              ↑x₂           ↑x₃
The SAME weights are reused at every step (parameter sharing).</pre>

          <h4>Strengths</h4>
          <ul class="key-points">
            <li>Handles <strong>variable-length</strong> sequences.</li>
            <li><strong>Shares parameters</strong> across positions.</li>
            <li>Hidden state gives it <strong>memory</strong> of past context.</li>
          </ul>

          <h4>The vanishing/exploding gradient problem</h4>
          <p>Training uses <strong>Backpropagation Through Time (BPTT)</strong>, which multiplies gradients across many steps. Repeated multiplication makes gradients <strong>vanish</strong> (→0, long-range signal lost) or <strong>explode</strong> (→∞, unstable).</p>
          <ul class="key-points">
            <li><strong>Vanishing</strong> → the RNN forgets distant context; can't learn long-range dependencies.</li>
            <li><strong>Exploding</strong> → mitigated by <em>gradient clipping</em>.</li>
          </ul>

          <div class="note-box"><strong>Motivation for LSTM/GRU:</strong> The vanishing-gradient limitation is exactly what gated architectures (next) were invented to solve, letting networks remember information over long spans.</div>
        `
      },
      {
        id: "lstm",
        group: "Recurrent Architectures",
        title: "Long Short-Term Memory (LSTM)",
        html: `
          <p class="lead"><strong>LSTM</strong> networks (Hochreiter &amp; Schmidhuber, 1997) add a separate <strong>cell state</strong> and learnable <strong>gates</strong> that control what to remember, forget, and output — solving the vanishing-gradient problem.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>An <strong>LSTM</strong> is a gated RNN with a <em>cell state</em> Cₜ (a long-term memory "conveyor belt") regulated by three gates that learn to add or remove information over time.</p>
          </div>

          <h4>The three gates</h4>
          <table class="lesson-table">
            <thead><tr><th>Gate</th><th>Question it answers</th><th>Role</th></tr></thead>
            <tbody>
              <tr><td><strong>Forget gate</strong> (fₜ)</td><td>What should we erase from memory?</td><td>Removes irrelevant past information</td></tr>
              <tr><td><strong>Input gate</strong> (iₜ)</td><td>What new information should we store?</td><td>Adds relevant new information</td></tr>
              <tr><td><strong>Output gate</strong> (oₜ)</td><td>What should we output now?</td><td>Decides the hidden state from the cell</td></tr>
            </tbody>
          </table>

          <h4>Information flow</h4>
          <pre class="formula">fₜ = σ(W_f·[hₜ₋₁, xₜ] + b_f)        forget gate (0…1)
iₜ = σ(W_i·[hₜ₋₁, xₜ] + b_i)        input gate
C̃ₜ = tanh(W_c·[hₜ₋₁, xₜ] + b_c)     candidate memory
Cₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ            update cell state
oₜ = σ(W_o·[hₜ₋₁, xₜ] + b_o)        output gate
hₜ = oₜ * tanh(Cₜ)                  new hidden state</pre>

          <div class="note-box"><strong>Why it works:</strong> The cell state Cₜ has a near-linear path through time (mostly addition, gated by fₜ). Gradients flow along it without repeated shrinking, so LSTMs <strong>retain information over hundreds of steps</strong> — capturing long-range dependencies RNNs cannot.</div>
        `
      },
      {
        id: "gru",
        group: "Recurrent Architectures",
        title: "Gated Recurrent Units (GRU)",
        html: `
          <p class="lead">A <strong>GRU</strong> (Cho et al., 2014) is a streamlined gated RNN that achieves LSTM-like performance with <strong>fewer gates and parameters</strong>, making it faster to train.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>Gated Recurrent Unit</strong> merges the cell and hidden state and uses just <em>two</em> gates: an <strong>update gate</strong> and a <strong>reset gate</strong>.</p>
          </div>

          <h4>The two gates</h4>
          <ul class="key-points">
            <li><strong>Update gate (zₜ)</strong> — how much of the past hidden state to carry forward vs. replace (combines LSTM's forget + input gates).</li>
            <li><strong>Reset gate (rₜ)</strong> — how much past information to forget when computing the new candidate.</li>
          </ul>

          <pre class="formula">zₜ = σ(W_z·[hₜ₋₁, xₜ])              update gate
rₜ = σ(W_r·[hₜ₋₁, xₜ])              reset gate
h̃ₜ = tanh(W·[rₜ * hₜ₋₁, xₜ])        candidate
hₜ = (1 − zₜ) * hₜ₋₁ + zₜ * h̃ₜ      blended new state</pre>

          <h4>LSTM vs. GRU</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>LSTM</th><th>GRU</th></tr></thead>
            <tbody>
              <tr><td>Gates</td><td>3 (forget, input, output)</td><td>2 (update, reset)</td></tr>
              <tr><td>Cell state</td><td>Separate cell + hidden</td><td>Single hidden state</td></tr>
              <tr><td>Parameters</td><td>More</td><td>Fewer → faster</td></tr>
              <tr><td>Performance</td><td>Slight edge on long/complex sequences</td><td>Comparable; better on small data</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Rule of thumb:</strong> Try GRU first for speed and smaller datasets; prefer LSTM when you have lots of data and very long dependencies. Both vastly outperform vanilla RNNs.</div>
        `
      },
      {
        id: "bidirectional",
        group: "Recurrent Architectures",
        title: "Bidirectional RNNs",
        html: `
          <p class="lead">A <strong>Bidirectional RNN</strong> runs two RNNs over the sequence — one <em>forward</em>, one <em>backward</em> — so each position has access to both <strong>past and future</strong> context.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>BiRNN</strong> processes the input in both directions and concatenates the two hidden states at each step: <span class="inline-code">hₜ = [ h→ₜ ; h←ₜ ]</span>.</p>
          </div>

          <pre class="formula">Forward :  x₁ → x₂ → x₃ → x₄      (h→)
Backward:  x₁ ← x₂ ← x₃ ← x₄      (h←)
Output at t = concat(forward hₜ, backward hₜ)</pre>

          <div class="example-box">
            <span class="ex-tag">Why future context helps</span>
            <p>"He went to the <strong>bank</strong> to withdraw cash." The word <em>withdraw</em> (which comes <em>after</em> bank) disambiguates the sense. A forward-only RNN hasn't seen it yet when processing <em>bank</em>; a BiRNN has.</p>
          </div>

          <h4>When to use</h4>
          <ul class="key-points">
            <li><strong>Good for:</strong> tasks where the whole sequence is available up front — NER, POS tagging, text classification.</li>
            <li><strong>Not usable for:</strong> real-time generation / left-to-right language modeling, where the future isn't known yet.</li>
          </ul>

          <div class="note-box"><strong>Note:</strong> Bidirectional context is a core idea later generalized by <strong>BERT</strong> (Unit V), whose "B" literally stands for Bidirectional.</div>
        `
      },
      {
        id: "seq-applications",
        group: "Applications & Training",
        title: "Sequence Modeling Applications",
        html: `
          <p class="lead">Recurrent models excel at turning a variable-length text sequence into predictions — most commonly <strong>classification</strong> tasks like sentiment and topic labeling.</p>

          <h4>Sentiment classification (many-to-one)</h4>
          <p>Read the whole review, then classify its polarity from the final (or pooled) hidden state.</p>
          <pre class="formula">"This movie was absolutely fantastic"
   → embed tokens → LSTM → final hidden state → Dense+softmax
   → Positive (0.94)</pre>

          <h4>Text classification (general)</h4>
          <ul class="key-points">
            <li><strong>Topic categorization</strong> — sports / politics / tech.</li>
            <li><strong>Spam detection</strong>, <strong>intent classification</strong>, <strong>language identification</strong>.</li>
            <li>Architecture: <em>Embedding → (Bi)LSTM/GRU → pooling → Dense → softmax</em>.</li>
          </ul>

          <h4>Sequence labeling (many-to-many, aligned)</h4>
          <p>Predict a label <em>per token</em> — Named Entity Recognition, POS tagging. A BiLSTM (often with a CRF layer on top) is a classic strong baseline.</p>

          <table class="lesson-table">
            <thead><tr><th>Task</th><th>Pattern</th><th>Output</th></tr></thead>
            <tbody>
              <tr><td>Sentiment</td><td>Many-to-one</td><td>Single label for the text</td></tr>
              <tr><td>Topic classification</td><td>Many-to-one</td><td>Category</td></tr>
              <tr><td>NER / POS tagging</td><td>Many-to-many</td><td>One label per token</td></tr>
              <tr><td>Language modeling</td><td>Many-to-many</td><td>Next-word distribution</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>See it live:</strong> <strong>Playgrounds → LSTM Sequence Classifier</strong> demonstrates a recurrent model classifying sentiment.</div>
        `
      },
      {
        id: "seq-training",
        group: "Applications & Training",
        title: "Sequence Training Techniques",
        html: `
          <p class="lead">Training sequence models well requires special techniques to handle generation and the cost of backpropagating through long sequences.</p>

          <h4>Teacher Forcing</h4>
          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Teacher forcing</strong> feeds the <em>ground-truth</em> previous token (not the model's own prediction) as input at each step during training of a generative/decoder model.</p>
          </div>
          <ul class="key-points">
            <li><strong>Pro:</strong> faster, more stable convergence — errors don't compound during training.</li>
            <li><strong>Con — exposure bias:</strong> at <em>inference</em> the model must consume its <em>own</em> outputs, a distribution it never saw in training, so early mistakes can cascade.</li>
            <li><strong>Mitigation:</strong> <em>scheduled sampling</em> — gradually mix in the model's own predictions during training.</li>
          </ul>

          <h4>Truncated Backpropagation Through Time (TBPTT)</h4>
          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>TBPTT</strong> splits a very long sequence into shorter chunks and backpropagates gradients only within each chunk (a fixed number of steps), while carrying the hidden state forward.</p>
          </div>
          <ul class="key-points">
            <li>Full BPTT over thousands of steps is memory-heavy and slow, and worsens vanishing gradients.</li>
            <li>TBPTT bounds the backprop window (e.g. 35 steps) → tractable memory and compute.</li>
            <li><strong>Trade-off:</strong> dependencies longer than the truncation window aren't directly learned.</li>
          </ul>

          <div class="note-box"><strong>Also essential:</strong> <em>gradient clipping</em> (cap gradient norm to prevent explosion) and <em>padding + masking</em> (batch variable-length sequences to equal length, then ignore the padding in the loss).</div>
        `
      },
      {
        id: "seq-evaluation",
        group: "Applications & Training",
        title: "Evaluation Metrics for Sequence Tasks",
        html: `
          <p class="lead">Different sequence tasks need different metrics. Classification uses accuracy/F1; language modeling uses perplexity; generation uses overlap metrics (covered fully in Units IV &amp; VI).</p>

          <h4>Classification &amp; labeling metrics</h4>
          <table class="lesson-table">
            <thead><tr><th>Metric</th><th>Formula / meaning</th><th>When to use</th></tr></thead>
            <tbody>
              <tr><td><strong>Accuracy</strong></td><td>correct / total</td><td>Balanced classes</td></tr>
              <tr><td><strong>Precision</strong></td><td>TP / (TP + FP)</td><td>Cost of false positives high</td></tr>
              <tr><td><strong>Recall</strong></td><td>TP / (TP + FN)</td><td>Cost of misses high</td></tr>
              <tr><td><strong>F1 score</strong></td><td>2·P·R / (P + R)</td><td>Imbalanced classes (NER, etc.)</td></tr>
            </tbody>
          </table>

          <h4>Perplexity (language modeling)</h4>
          <div class="def-box">
            <span class="def-tag">Definition</span>
            <pre class="formula">Perplexity = 2^(cross-entropy)  =  exp( −(1/N) Σ log P(wᵢ | context) )</pre>
            <p>The model's "surprise" — how many words it is, on average, choosing between. <strong>Lower is better.</strong></p>
          </div>

          <h4>Generation metrics (preview)</h4>
          <ul class="key-points">
            <li><strong>BLEU</strong> — n-gram precision vs. references (machine translation). <em>Unit IV.</em></li>
            <li><strong>ROUGE</strong> — n-gram recall vs. references (summarization). <em>Unit IV.</em></li>
          </ul>

          <div class="note-box"><strong>Caution:</strong> For NER/POS use <strong>F1</strong>, not raw accuracy — most tokens are the majority "O"/non-entity class, so accuracy looks deceptively high. Evaluate per-entity.</div>
        `
      }
    ]
  },
  {
    id: 4,
    num: "Unit IV",
    title: "Sequence-to-Sequence Models and Attention",
    intro: "Many NLP tasks map one sequence to another of different length — translation, summarization, dialogue. This unit covers the encoder–decoder (seq2seq) architecture, its fundamental bottleneck, and the attention mechanism that fixed it (soft, Bahdanau, and Luong attention), plus how seq2seq output is evaluated with BLEU and ROUGE.",
    sections: [
      {
        id: "encoder-decoder",
        group: "Encoder–Decoder Models",
        title: "Encoder–Decoder Architecture",
        html: `
          <p class="lead">The <strong>encoder–decoder</strong> (sequence-to-sequence) architecture maps an input sequence to an output sequence of <em>possibly different length</em>, using two coupled networks.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>An <strong>encoder</strong> reads the entire input sequence and compresses it into a fixed-size <strong>context vector</strong>; a <strong>decoder</strong> generates the output sequence one token at a time, conditioned on that context.</p>
          </div>

          <pre class="formula">INPUT:  "I am happy"
   x₁ x₂ x₃ → [ENCODER RNN] → context vector c (final hidden state)
                                     ↓
                              [DECODER RNN] → y₁ y₂ → "Je suis heureux"
                              (generates until &lt;EOS&gt;)</pre>

          <h4>How decoding works</h4>
          <ul class="key-points">
            <li>The decoder starts from a <span class="inline-code">&lt;START&gt;</span> token and the context vector.</li>
            <li>At each step it predicts the next token and feeds it back as the next input (autoregressive).</li>
            <li>Generation stops at the <span class="inline-code">&lt;EOS&gt;</span> (end-of-sequence) token.</li>
          </ul>

          <div class="note-box"><strong>Key property:</strong> Decoupling reading from writing lets input and output lengths differ — essential for translation (word counts differ across languages) and summarization (output is much shorter).</div>
        `
      },
      {
        id: "seq2seq-apps",
        group: "Encoder–Decoder Models",
        title: "Seq2Seq for Translation & Summarization",
        html: `
          <p class="lead">Seq2seq is the backbone of <strong>machine translation</strong> and <strong>abstractive summarization</strong> — any task transforming one text into another.</p>

          <h4>Neural Machine Translation (NMT)</h4>
          <ul class="key-points">
            <li>Encoder reads the source sentence; decoder emits the target sentence.</li>
            <li>Replaced older phrase-based statistical MT with end-to-end neural models.</li>
            <li>Handles reordering and length changes between languages.</li>
          </ul>

          <h4>Summarization — two flavors</h4>
          <table class="lesson-table">
            <thead><tr><th>Type</th><th>How</th><th>Seq2seq?</th></tr></thead>
            <tbody>
              <tr><td><strong>Extractive</strong></td><td>Select &amp; copy important sentences verbatim</td><td>Often classification/ranking</td></tr>
              <tr><td><strong>Abstractive</strong></td><td>Generate new sentences that paraphrase the source</td><td>Yes — encoder–decoder generation</td></tr>
            </tbody>
          </table>

          <div class="example-box">
            <span class="ex-tag">Other seq2seq tasks</span>
            <ul class="key-points">
              <li><strong>Dialogue / chatbots</strong> — input utterance → response.</li>
              <li><strong>Grammar correction</strong> — wrong sentence → corrected sentence.</li>
              <li><strong>Question answering / generation</strong>, <strong>code generation</strong>, <strong>paraphrasing</strong>.</li>
            </ul>
          </div>

          <div class="note-box"><strong>See it live:</strong> <strong>Playgrounds → Attention Translator</strong> shows an encoder–decoder with attention performing translation.</div>
        `
      },
      {
        id: "seq2seq-limits",
        group: "Encoder–Decoder Models",
        title: "Limitations of Classical Seq2Seq",
        html: `
          <p class="lead">The plain encoder–decoder has one crippling weakness: it squeezes the <em>entire</em> input into a <strong>single fixed-size context vector</strong> — the <strong>information bottleneck</strong>.</p>

          <div class="def-box">
            <span class="def-tag">The bottleneck problem</span>
            <p>All meaning of a sentence — whether 5 words or 50 — must fit into one fixed-length vector. Long inputs overflow this capacity and information is lost.</p>
          </div>

          <h4>Consequences</h4>
          <ul class="key-points">
            <li><strong>Long-sentence degradation</strong> — translation quality drops sharply as input length grows.</li>
            <li><strong>Recency bias</strong> — the context vector over-represents the <em>end</em> of the input and forgets the beginning.</li>
            <li><strong>No alignment</strong> — the decoder can't focus on the specific source word relevant to each output word.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Intuition</span>
            <p>Imagine reading a whole paragraph, then translating it from memory <em>without looking back</em>. You'd lose details — especially from the start. That is exactly the decoder's predicament.</p>
          </div>

          <div class="note-box"><strong>The fix:</strong> <strong>Attention</strong> lets the decoder "look back" at <em>all</em> encoder states and dynamically focus on the most relevant ones at each output step — removing the single-vector bottleneck. Covered next.</div>
        `
      },
      {
        id: "attention",
        group: "Attention Mechanisms",
        title: "Attention in Deep NLP (Soft Attention)",
        html: `
          <p class="lead"><strong>Attention</strong> lets the decoder, at every output step, build a <em>custom</em> context vector by weighting <strong>all</strong> encoder hidden states according to their relevance — instead of relying on one fixed vector.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Soft attention</strong> computes a weighted average of all encoder states, where weights (a probability distribution that sums to 1) indicate how much to "attend" to each input position for the current output.</p>
          </div>

          <h4>The three steps</h4>
          <pre class="formula">1. SCORE   eₜᵢ = score(decoder state sₜ, encoder state hᵢ)
2. WEIGHT  αₜᵢ = softmax(eₜᵢ)        → attention weights (sum to 1)
3. CONTEXT cₜ  = Σᵢ αₜᵢ · hᵢ          → weighted sum of encoder states</pre>
          <p>The context <span class="inline-code">cₜ</span> is recomputed for <em>each</em> output token, then combined with the decoder state to predict the next word.</p>

          <h4>Soft vs. hard attention</h4>
          <table class="lesson-table">
            <thead><tr><th></th><th>Soft attention</th><th>Hard attention</th></tr></thead>
            <tbody>
              <tr><td>Weights</td><td>Spread over all positions (0–1)</td><td>Picks one position (0 or 1)</td></tr>
              <tr><td>Differentiable?</td><td>Yes → trains with backprop</td><td>No → needs reinforcement learning</td></tr>
              <tr><td>Use</td><td>Standard in NLP</td><td>Rare</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Bonus — interpretability:</strong> Attention weights form an <em>alignment matrix</em> you can visualize, revealing which source words the model used for each translated word.</div>
        `
      },
      {
        id: "bahdanau-luong",
        group: "Attention Mechanisms",
        title: "Bahdanau vs. Luong Attention",
        html: `
          <p class="lead">Two classic formulations defined how attention scores are computed: <strong>Bahdanau (2015)</strong> — additive attention — and <strong>Luong (2015)</strong> — multiplicative attention.</p>

          <h4>Bahdanau (Additive) Attention</h4>
          <ul class="key-points">
            <li>Score via a small feed-forward network: <span class="inline-code">score = vᵀ · tanh(W₁hᵢ + W₂sₜ)</span>.</li>
            <li>Uses the <strong>previous</strong> decoder state <span class="inline-code">sₜ₋₁</span> to compute attention <em>before</em> producing sₜ.</li>
            <li>Often called "additive" because it sums the projected states inside a tanh.</li>
          </ul>

          <h4>Luong (Multiplicative) Attention</h4>
          <ul class="key-points">
            <li>Score via dot-product variants: <span class="inline-code">dot: sₜᵀhᵢ</span>, <span class="inline-code">general: sₜᵀ W hᵢ</span>.</li>
            <li>Uses the <strong>current</strong> decoder state sₜ.</li>
            <li>Simpler and faster (matrix multiplication, no extra tanh network).</li>
          </ul>

          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>Bahdanau</th><th>Luong</th></tr></thead>
            <tbody>
              <tr><td>Score function</td><td>Additive (feed-forward + tanh)</td><td>Multiplicative (dot product)</td></tr>
              <tr><td>Decoder state used</td><td>Previous (sₜ₋₁)</td><td>Current (sₜ)</td></tr>
              <tr><td>Speed</td><td>Slower</td><td>Faster</td></tr>
              <tr><td>Also called</td><td>Additive attention</td><td>Multiplicative attention</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Why it matters:</strong> Luong's scaled dot-product scoring is the direct ancestor of the <strong>self-attention</strong> used in Transformers (Unit V), where attention replaces recurrence entirely.</div>
        `
      },
      {
        id: "attention-integration",
        group: "Attention Mechanisms",
        title: "Integrating Attention into Encoder–Decoder",
        html: `
          <p class="lead">Attention is inserted <em>between</em> the encoder and decoder, turning the static context vector into a dynamic, per-step one.</p>

          <h4>The attention-augmented decoding loop</h4>
          <pre class="formula">For each output step t:
  1. Take current decoder state sₜ
  2. Score sₜ against every encoder state h₁…hₙ
  3. Softmax → attention weights αₜ
  4. Context cₜ = Σ αₜᵢ hᵢ
  5. Combine [sₜ ; cₜ] → predict next token yₜ
  6. Feed yₜ back; repeat until &lt;EOS&gt;</pre>

          <h4>What changes vs. plain seq2seq</h4>
          <ul class="key-points">
            <li>The encoder now exposes <strong>all</strong> hidden states (not just the last one).</li>
            <li>The decoder accesses the whole input at every step → no bottleneck.</li>
            <li>Long-sequence performance improves dramatically; alignment becomes learnable.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Alignment example (EN→FR)</span>
            <pre class="formula">When generating "heureux", attention concentrates on "happy".
When generating "suis",    attention concentrates on "am".
The model learns soft word alignments automatically.</pre>
          </div>

          <div class="note-box"><strong>Foreshadowing:</strong> "Attention Is All You Need" (2017) took this further — removing the RNN entirely and building the whole model from attention. That is the Transformer, in Unit V.</div>
        `
      },
      {
        id: "bleu-rouge",
        group: "Evaluation",
        title: "Evaluation — BLEU and ROUGE",
        html: `
          <p class="lead">Generated text is compared against human <strong>reference</strong> outputs using n-gram overlap metrics: <strong>BLEU</strong> for translation, <strong>ROUGE</strong> for summarization.</p>

          <h4>BLEU (Bilingual Evaluation Understudy)</h4>
          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>BLEU</strong> measures <em>precision</em>: what fraction of the candidate's n-grams appear in the reference(s). Score 0–1 (or 0–100). Higher is better.</p>
          </div>
          <ul class="key-points">
            <li>Combines n-gram precisions for n = 1…4 (geometric mean).</li>
            <li><strong>Brevity penalty</strong> punishes outputs that are too short (which would otherwise game precision).</li>
            <li>Precision-oriented → "did the candidate use correct words/phrases?"</li>
          </ul>

          <h4>ROUGE (Recall-Oriented Understudy for Gisting Evaluation)</h4>
          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>ROUGE</strong> measures <em>recall</em>: what fraction of the reference's n-grams the candidate captured. Standard for summarization.</p>
          </div>
          <ul class="key-points">
            <li><strong>ROUGE-N</strong> — n-gram overlap recall (ROUGE-1, ROUGE-2).</li>
            <li><strong>ROUGE-L</strong> — longest common subsequence (captures fluency/order).</li>
          </ul>

          <table class="lesson-table">
            <thead><tr><th></th><th>BLEU</th><th>ROUGE</th></tr></thead>
            <tbody>
              <tr><td>Orientation</td><td>Precision</td><td>Recall</td></tr>
              <tr><td>Primary task</td><td>Machine translation</td><td>Summarization</td></tr>
              <tr><td>Question</td><td>Are candidate n-grams correct?</td><td>Did we cover the reference?</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Limitations:</strong> Both reward surface n-gram overlap and miss valid paraphrases/synonyms. They correlate only loosely with human judgment, so use alongside human evaluation (and newer semantic metrics like BERTScore).</div>
        `
      }
    ]
  },
  {
    id: 5,
    num: "Unit V",
    title: "Transformers & Pretrained Language Models",
    intro: "The Transformer replaced recurrence with pure attention, enabling massive parallelism and the modern era of NLP. This unit covers the architecture (self-attention, multi-head attention, positional encoding, encoder/decoder blocks), subword tokenization (BPE, WordPiece), and the pretrained models built on it — BERT, GPT, and T5 — plus transfer learning, fine-tuning, and HuggingFace.",
    sections: [
      {
        id: "transformer",
        group: "Transformer Architecture",
        title: "The Transformer Architecture",
        html: `
          <p class="lead">The <strong>Transformer</strong> ("Attention Is All You Need", Vaswani et al., 2017) is a sequence model built <em>entirely</em> from attention and feed-forward layers — <strong>no recurrence, no convolution</strong>.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>Transformer</strong> processes all tokens <em>in parallel</em> using self-attention to model relationships between every pair of positions, with stacked encoder and/or decoder blocks.</p>
          </div>

          <h4>Why it beat RNNs</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>RNN / LSTM</th><th>Transformer</th></tr></thead>
            <tbody>
              <tr><td>Processing</td><td>Sequential (step by step)</td><td><strong>Parallel</strong> (all tokens at once)</td></tr>
              <tr><td>Long-range dependencies</td><td>Hard (info decays)</td><td>Direct (any token attends to any)</td></tr>
              <tr><td>Training speed</td><td>Slow</td><td>Fast (GPU-friendly)</td></tr>
              <tr><td>Path length between tokens</td><td>O(n)</td><td>O(1)</td></tr>
            </tbody>
          </table>

          <h4>High-level structure</h4>
          <pre class="formula">Inputs → Embeddings + Positional Encoding
       → [ Encoder block × N ]  (self-attention + feed-forward)
       → [ Decoder block × N ]  (masked self-attn + cross-attn + FFN)
       → Linear + Softmax → output tokens</pre>

          <div class="note-box"><strong>Impact:</strong> Parallelism let Transformers scale to enormous datasets and parameter counts, directly enabling BERT, GPT, and today's large language models.</div>
        `
      },
      {
        id: "self-attention",
        group: "Transformer Architecture",
        title: "Self-Attention",
        html: `
          <p class="lead"><strong>Self-attention</strong> lets every token in a sequence attend to every other token (including itself), computing a context-aware representation of each word based on the whole sequence.</p>

          <div class="def-box">
            <span class="def-tag">Query, Key, Value</span>
            <p>Each token is projected into three vectors: a <strong>Query (Q)</strong> (what I'm looking for), a <strong>Key (K)</strong> (what I contain), and a <strong>Value (V)</strong> (what I'll contribute). Attention matches queries against keys to weight values.</p>
          </div>

          <h4>Scaled dot-product attention</h4>
          <pre class="formula">Attention(Q, K, V) = softmax( (Q · Kᵀ) / √dₖ ) · V

  Q·Kᵀ   = similarity of every query to every key
  √dₖ    = scaling factor (keeps gradients stable)
  softmax = turn scores into weights summing to 1
  · V    = weighted sum of value vectors</pre>

          <div class="example-box">
            <span class="ex-tag">Why it disambiguates</span>
            <p>In "The animal didn't cross the street because <strong>it</strong> was too tired", self-attention lets <em>it</em> attend strongly to <em>animal</em>, resolving the reference — something fixed word embeddings cannot do.</p>
          </div>

          <h4>Key properties</h4>
          <ul class="key-points">
            <li><strong>Contextual</strong> — the same word gets different representations in different sentences.</li>
            <li><strong>Parallel</strong> — all pairwise interactions computed as matrix multiplications.</li>
            <li><strong>Complexity O(n²)</strong> in sequence length — the main cost for long documents.</li>
          </ul>

          <div class="note-box"><strong>Self vs. cross attention:</strong> In <em>self</em>-attention Q, K, V come from the <em>same</em> sequence. In <em>cross</em>-attention (decoder), queries come from the decoder while keys/values come from the encoder — the modern version of seq2seq attention.</div>
        `
      },
      {
        id: "multihead",
        group: "Transformer Architecture",
        title: "Multi-Head Attention",
        html: `
          <p class="lead"><strong>Multi-head attention</strong> runs several self-attention operations ("heads") in parallel, each learning to focus on different types of relationships, then combines them.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Multi-head attention</strong> projects Q, K, V into <em>h</em> different subspaces, applies scaled dot-product attention in each, concatenates the results, and projects back.</p>
          </div>

          <pre class="formula">headᵢ = Attention(Q·Wᵢ^Q, K·Wᵢ^K, V·Wᵢ^V)
MultiHead = Concat(head₁, …, head_h) · W_O</pre>

          <h4>Why multiple heads?</h4>
          <ul class="key-points">
            <li>Different heads capture different patterns — one may track <strong>syntax</strong>, another <strong>coreference</strong>, another <strong>positional</strong> patterns.</li>
            <li>Like having several "perspectives" attend simultaneously, then merging them.</li>
            <li>The original Transformer used <strong>8 heads</strong>; large models use many more.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Intuition</span>
            <p>For "The bank by the river", one head might link <em>bank</em> ↔ <em>river</em> (sense), while another links <em>The</em> ↔ <em>bank</em> (determiner). Each head specializes; together they give a rich representation.</p>
          </div>

          <div class="note-box"><strong>Exam tip:</strong> Multi-head attention = several attention heads in <em>parallel</em> on projected subspaces, concatenated. It is the core building block repeated throughout every Transformer block.</div>
        `
      },
      {
        id: "positional-encoding",
        group: "Transformer Architecture",
        title: "Positional Encoding",
        html: `
          <p class="lead">Self-attention is <strong>order-agnostic</strong> — it sees a set, not a sequence. <strong>Positional encoding</strong> injects information about each token's position so the model knows word order.</p>

          <div class="def-box">
            <span class="def-tag">The problem</span>
            <p>Without positional information, "dog bites man" and "man bites dog" would produce identical attention outputs. Order must be added explicitly.</p>
          </div>

          <h4>Sinusoidal positional encoding (original)</h4>
          <pre class="formula">PE(pos, 2i)   = sin( pos / 10000^(2i/d) )
PE(pos, 2i+1) = cos( pos / 10000^(2i/d) )

  pos = token position, i = dimension index, d = embedding size</pre>
          <p>These fixed sinusoids of varying frequencies are <strong>added</strong> to the token embeddings. The pattern lets the model infer relative distances.</p>

          <h4>Why sinusoids?</h4>
          <ul class="key-points">
            <li><strong>Unique</strong> pattern per position; bounded values.</li>
            <li>Enables <strong>relative</strong> position reasoning (offsets are linear functions).</li>
            <li><strong>Extrapolates</strong> to sequence lengths longer than seen in training.</li>
          </ul>

          <div class="note-box"><strong>Variants:</strong> Modern models often use <em>learned</em> positional embeddings, or relative schemes like <strong>RoPE</strong> (rotary) and <strong>ALiBi</strong>. The principle is unchanged: attention needs an explicit signal of position.</div>
        `
      },
      {
        id: "encoder-decoder-blocks",
        group: "Transformer Architecture",
        title: "Transformer Encoder & Decoder Blocks",
        html: `
          <p class="lead">Transformers stack identical <strong>blocks</strong>. An encoder block and a decoder block share components but differ in their attention.</p>

          <h4>Encoder block</h4>
          <pre class="formula">x → Multi-Head Self-Attention → Add &amp; Norm
  → Feed-Forward Network      → Add &amp; Norm → output</pre>
          <ul class="key-points">
            <li><strong>Bidirectional</strong> self-attention — each token sees the whole input.</li>
            <li>Used for <em>understanding</em> tasks (classification, NER). Basis of <strong>BERT</strong>.</li>
          </ul>

          <h4>Decoder block</h4>
          <pre class="formula">y → Masked Multi-Head Self-Attention → Add &amp; Norm
  → Cross-Attention (over encoder)    → Add &amp; Norm
  → Feed-Forward Network              → Add &amp; Norm → output</pre>
          <ul class="key-points">
            <li><strong>Masked</strong> self-attention — each position attends only to <em>earlier</em> tokens (can't peek at the future), enabling left-to-right generation.</li>
            <li><strong>Cross-attention</strong> connects to the encoder (for seq2seq tasks). Basis of <strong>GPT</strong> (decoder-only) and T5 (encoder–decoder).</li>
          </ul>

          <h4>Shared ingredients</h4>
          <ul class="key-points">
            <li><strong>Residual (skip) connections</strong> — "Add" helps gradients flow in deep stacks.</li>
            <li><strong>Layer normalization</strong> — "Norm" stabilizes training.</li>
            <li><strong>Position-wise feed-forward network</strong> — two linear layers + non-linearity applied to each token.</li>
          </ul>

          <div class="note-box"><strong>Three model families:</strong> <em>Encoder-only</em> (BERT — understanding), <em>Decoder-only</em> (GPT — generation), <em>Encoder–decoder</em> (T5, BART — seq2seq).</div>
        `
      },
      {
        id: "subword-tokenization",
        group: "Transformer Architecture",
        title: "Tokenization — BPE & WordPiece",
        html: `
          <p class="lead">Transformers use <strong>subword tokenization</strong> — splitting words into reusable pieces — to balance vocabulary size against sequence length and to eliminate the OOV problem.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Subword tokenization</strong> breaks rare/unknown words into smaller known units, so any word can be represented from a fixed-size vocabulary while common words stay whole.</p>
          </div>

          <h4>Byte-Pair Encoding (BPE)</h4>
          <ul class="key-points">
            <li>Start from individual characters; repeatedly <strong>merge the most frequent adjacent pair</strong> into a new token.</li>
            <li>Continue until reaching a target vocabulary size.</li>
            <li>Used by <strong>GPT</strong> models and many others.</li>
          </ul>
          <pre class="formula">"lower", "lowest" → l o w e r , l o w e s t
  merge "lo","ow" … → "low" + "er", "low" + "est"
Frequent subwords ("low") become single tokens.</pre>

          <h4>WordPiece</h4>
          <ul class="key-points">
            <li>Similar to BPE, but merges the pair that most <strong>increases the likelihood</strong> of the training corpus (not just raw frequency).</li>
            <li>Marks word-internal pieces with <span class="inline-code">##</span> (e.g. <em>playing → play + ##ing</em>).</li>
            <li>Used by <strong>BERT</strong>.</li>
          </ul>

          <table class="lesson-table">
            <thead><tr><th></th><th>BPE</th><th>WordPiece</th></tr></thead>
            <tbody>
              <tr><td>Merge criterion</td><td>Most frequent pair</td><td>Max likelihood gain</td></tr>
              <tr><td>Used by</td><td>GPT, RoBERTa</td><td>BERT</td></tr>
              <tr><td>Subword marker</td><td>(varies)</td><td><span class="inline-code">##</span> prefix</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Why it matters:</strong> Subword vocabularies (typically 30k–50k tokens) make almost nothing truly OOV — new or misspelled words are simply composed from smaller pieces.</div>
        `
      },
      {
        id: "pretraining",
        group: "Pretrained Language Models",
        title: "Pretraining & Transfer Learning",
        html: `
          <p class="lead"><strong>Pretrained language models</strong> are trained once on huge unlabeled corpora, then <strong>transferred</strong> (fine-tuned) to many downstream tasks with little labeled data.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Transfer learning</strong> reuses knowledge learned during self-supervised <em>pretraining</em> as a starting point for a specific <em>downstream</em> task, rather than training from scratch.</p>
          </div>

          <h4>The two-stage paradigm</h4>
          <pre class="formula">1. PRETRAIN  — self-supervised on massive unlabeled text
              (learn general language understanding)
2. FINE-TUNE — supervised on a small labeled dataset
              (adapt to sentiment / NER / QA / …)</pre>

          <h4>Why it transformed NLP</h4>
          <ul class="key-points">
            <li><strong>Data efficiency</strong> — strong results with hundreds (not millions) of labeled examples.</li>
            <li><strong>General representations</strong> — one base model serves countless tasks.</li>
            <li><strong>State of the art</strong> across classification, NER, QA, and generation.</li>
          </ul>

          <div class="note-box"><strong>Self-supervision is the engine:</strong> Pretraining objectives (masked or causal language modeling) create labels from raw text itself, unlocking internet-scale training data without manual annotation.</div>
        `
      },
      {
        id: "bert",
        group: "Pretrained Language Models",
        title: "BERT — Masked Language Modeling",
        html: `
          <p class="lead"><strong>BERT</strong> (Bidirectional Encoder Representations from Transformers, Google 2018) is an <strong>encoder-only</strong> model that reads text bidirectionally — ideal for <em>understanding</em> tasks.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>BERT</strong> is pretrained on two self-supervised objectives — <strong>Masked Language Modeling (MLM)</strong> and <strong>Next Sentence Prediction (NSP)</strong> — producing deep bidirectional context for every token.</p>
          </div>

          <h4>Masked Language Modeling (MLM)</h4>
          <ul class="key-points">
            <li>Randomly mask ~15% of tokens; train the model to <strong>predict the masked words</strong> from both left and right context.</li>
            <li>Forces genuine bidirectional understanding.</li>
          </ul>
          <pre class="formula">Input:  "The [MASK] sat on the mat"
Target: [MASK] = "cat"</pre>

          <h4>Next Sentence Prediction (NSP)</h4>
          <ul class="key-points">
            <li>Given two sentences, predict whether B actually follows A.</li>
            <li>Teaches inter-sentence relationships (useful for QA, inference).</li>
          </ul>

          <h4>Using BERT downstream</h4>
          <ul class="key-points">
            <li>Add a small task head on top and fine-tune: text classification, NER, QA (e.g. SQuAD).</li>
            <li>The <span class="inline-code">[CLS]</span> token's vector is used as the sentence representation for classification.</li>
          </ul>

          <div class="note-box"><strong>Limitation:</strong> Because it's bidirectional and trained with masking, BERT is great at <em>understanding</em> but <strong>not</strong> built for free-form text generation — that's GPT's domain.</div>
        `
      },
      {
        id: "gpt",
        group: "Pretrained Language Models",
        title: "GPT — Causal Language Modeling",
        html: `
          <p class="lead"><strong>GPT</strong> (Generative Pre-trained Transformer, OpenAI) is a <strong>decoder-only</strong> model trained to predict the next token — the foundation of modern generative LLMs.</p>

          <div class="def-box">
            <span class="def-tag">Causal Language Modeling (CLM)</span>
            <p>GPT is pretrained to predict the <strong>next word</strong> given all previous words, using <em>masked (causal) self-attention</em> so each position only sees the past.</p>
          </div>

          <pre class="formula">P(w₁, w₂, …, wₙ) = Πₜ P(wₜ | w₁ … wₜ₋₁)
Train: maximize the probability of the next token at every position.</pre>

          <h4>BERT vs. GPT</h4>
          <table class="lesson-table">
            <thead><tr><th>Aspect</th><th>BERT</th><th>GPT</th></tr></thead>
            <tbody>
              <tr><td>Architecture</td><td>Encoder-only</td><td>Decoder-only</td></tr>
              <tr><td>Attention</td><td>Bidirectional</td><td>Causal (left-to-right)</td></tr>
              <tr><td>Objective</td><td>Masked LM + NSP</td><td>Next-token (causal LM)</td></tr>
              <tr><td>Best at</td><td>Understanding (classify, NER, QA)</td><td>Generation (text, dialogue, code)</td></tr>
            </tbody>
          </table>

          <h4>The scaling story</h4>
          <ul class="key-points">
            <li>GPT-2 → GPT-3 → GPT-4: scaling parameters and data unlocked <strong>few-shot / in-context learning</strong>.</li>
            <li>Large GPTs perform tasks from a prompt with <em>no</em> gradient updates — just instructions and examples.</li>
          </ul>

          <div class="note-box"><strong>See it live:</strong> <strong>Playgrounds → GPT-2 Decoder Tree</strong> visualizes next-token generation and decoding strategies (covered fully in Unit VI).</div>
        `
      },
      {
        id: "t5",
        group: "Pretrained Language Models",
        title: "T5 — Text-to-Text Framework",
        html: `
          <p class="lead"><strong>T5</strong> (Text-to-Text Transfer Transformer, Google) is an <strong>encoder–decoder</strong> model that casts <em>every</em> NLP task as text-in → text-out.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>T5</strong> unifies all tasks under one format: the input is a text string (with a task prefix) and the output is a text string — so the same model and loss handle translation, classification, summarization, and QA.</p>
          </div>

          <div class="example-box">
            <span class="ex-tag">Everything is text-to-text</span>
            <pre class="formula">"translate English to German: That is good"  → "Das ist gut"
"summarize: &lt;article&gt;"                        → "&lt;summary&gt;"
"cola sentence: He buy milk"                   → "unacceptable"
"stsb sentence1: … sentence2: …"               → "3.8"</pre>
          </div>

          <h4>Pretraining objective</h4>
          <ul class="key-points">
            <li><strong>Span corruption</strong> — mask contiguous spans of text and train the model to reconstruct them (a seq2seq twist on MLM).</li>
            <li>Encoder reads the corrupted input; decoder generates the missing spans.</li>
          </ul>

          <div class="note-box"><strong>Why it's elegant:</strong> One consistent text-to-text interface means no task-specific heads — you just change the input prefix. This framing strongly influenced instruction-tuned LLMs (Unit VI).</div>
        `
      },
      {
        id: "finetuning",
        group: "Pretrained Language Models",
        title: "Fine-tuning & HuggingFace",
        html: `
          <p class="lead"><strong>Fine-tuning</strong> adapts a pretrained model to a specific task; <strong>HuggingFace Transformers</strong> is the de-facto library for doing this in a few lines of code.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p><strong>Fine-tuning</strong> continues training a pretrained model on a smaller labeled dataset, updating its weights so its general language knowledge specializes to your task.</p>
          </div>

          <h4>Common fine-tuning tasks</h4>
          <table class="lesson-table">
            <thead><tr><th>Task</th><th>Setup</th><th>Output</th></tr></thead>
            <tbody>
              <tr><td><strong>Text classification</strong></td><td>Add classifier head on [CLS]</td><td>Sentiment / topic label</td></tr>
              <tr><td><strong>Named Entity Recognition</strong></td><td>Per-token classification head</td><td>Entity tag per token</td></tr>
              <tr><td><strong>Question Answering</strong></td><td>Predict answer span start/end</td><td>Span from a passage</td></tr>
            </tbody>
          </table>

          <h4>Fine-tuning vs. alternatives</h4>
          <ul class="key-points">
            <li><strong>Full fine-tuning</strong> — update all weights (most powerful, most compute).</li>
            <li><strong>Feature extraction</strong> — freeze the base, train only the head.</li>
            <li><strong>Parameter-efficient (PEFT / LoRA)</strong> — train a tiny number of added parameters; cheap and popular for LLMs.</li>
          </ul>

          <h4>HuggingFace Transformers</h4>
          <pre class="formula">from transformers import pipeline
clf = pipeline("sentiment-analysis")
clf("I love this!")   →  [{'label': 'POSITIVE', 'score': 0.99}]</pre>
          <ul class="key-points">
            <li>Thousands of pretrained models in the <strong>Model Hub</strong>.</li>
            <li><span class="inline-code">AutoModel</span>, <span class="inline-code">AutoTokenizer</span>, <span class="inline-code">Trainer</span>, and <span class="inline-code">pipeline</span> APIs standardize loading, tokenizing, training, and inference.</li>
          </ul>

          <div class="note-box"><strong>Big picture:</strong> Pretrain once, fine-tune cheaply, many times — the workflow that made state-of-the-art NLP accessible to everyone.</div>
        `
      }
    ]
  },
  {
    id: 6,
    num: "Unit VI",
    title: "Generative NLP and LLMs",
    intro: "From the mechanics of how a model turns probabilities into text, to the large instruction-tuned systems that summarize, converse, and reason — and the open problems of evaluating and trusting them.",
    sections: [
      {
        id: "generative-nlp",
        group: "Text Generation",
        title: "Generative NLP Models",
        html: `
          <p class="lead">Generative NLP is concerned with <strong>producing</strong> new text rather than just classifying or tagging existing text.</p>

          <div class="def-box">
            <span class="def-tag">Definition</span>
            <p>A <strong>generative language model</strong> defines a probability distribution over sequences and generates text by repeatedly predicting the next token given everything produced so far.</p>
          </div>

          <h4>Autoregressive generation</h4>
          <p>Most modern generators (GPT-style) are <strong>autoregressive</strong>: they factor the probability of a sequence into a product of conditional next-token probabilities.</p>
          <pre class="formula">P(w₁, w₂, …, wₙ) = ∏ᵢ P(wᵢ | w₁, …, wᵢ₋₁)</pre>
          <p>At each step the model outputs a probability distribution over the whole vocabulary; a <strong>decoding strategy</strong> then selects the next token, which is fed back in to continue generation until an end-of-sequence token or a length limit is reached.</p>

          <table class="lesson-table">
            <thead><tr><th>Discriminative NLP</th><th>Generative NLP</th></tr></thead>
            <tbody>
              <tr><td>Models P(label | text)</td><td>Models P(text), or P(text | prompt)</td></tr>
              <tr><td>Classification, NER, sentiment</td><td>Translation, summarization, dialogue, completion</td></tr>
              <tr><td>Output: a label / span</td><td>Output: a sequence of tokens</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Key idea:</strong> the model only ever predicts a distribution over the next token. Everything we call "writing", "summarizing", or "reasoning" emerges from running that single operation thousands of times under a chosen decoding strategy.</div>
        `
      },
      {
        id: "greedy-beam",
        group: "Text Generation",
        title: "Greedy Search & Beam Search",
        html: `
          <p class="lead">Deterministic decoding strategies aim to find a high-probability output sequence.</p>

          <div class="def-box">
            <span class="def-tag">Greedy search</span>
            <p>At each step, pick the single <strong>most probable</strong> next token. Fast and simple, but myopic — a locally best token can lead into a globally poor sequence, and it cannot recover.</p>
          </div>

          <div class="def-box">
            <span class="def-tag">Beam search</span>
            <p>Keep the <em>k</em> most probable partial sequences ("beams") at every step instead of just one. Expand each beam by all vocabulary tokens, score the candidates, and retain the top <em>k</em>. <em>k</em> is the <strong>beam width</strong>.</p>
          </div>

          <h4>Greedy vs. beam at a glance</h4>
          <table class="lesson-table">
            <thead><tr><th></th><th>Greedy</th><th>Beam (width k)</th></tr></thead>
            <tbody>
              <tr><td>Sequences tracked</td><td>1</td><td>k</td></tr>
              <tr><td>Cost</td><td>Lowest</td><td>~k× greedy</td></tr>
              <tr><td>Output quality</td><td>Can be short-sighted</td><td>Higher-probability sequences</td></tr>
              <tr><td>Diversity</td><td>None (deterministic)</td><td>Low — beams are often near-duplicates</td></tr>
            </tbody>
          </table>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Greedy might commit to "The cat sat on the…" and get stuck, while beam search keeps several continuations alive ("mat", "sofa", "windowsill") and selects the one that maximizes the overall sequence probability.</p>
          </div>

          <div class="note-box"><strong>Caveat:</strong> beam search excels at tasks with one "correct" answer (translation, summarization) but tends to produce <strong>bland, repetitive, generic</strong> text for open-ended generation — high-probability text is often boring text.</div>
        `
      },
      {
        id: "sampling",
        group: "Text Generation",
        title: "Top-k & Nucleus Sampling",
        html: `
          <p class="lead">Stochastic decoding trades guaranteed probability for diversity and creativity by <strong>sampling</strong> from the distribution rather than maximizing it.</p>

          <h4>Temperature</h4>
          <p>Before sampling, logits are divided by a <strong>temperature</strong> T. Low T (&lt;1) sharpens the distribution toward the top tokens (more conservative); high T (&gt;1) flattens it (more random/creative). T → 0 approaches greedy.</p>

          <div class="def-box">
            <span class="def-tag">Top-k sampling</span>
            <p>Restrict sampling to the <strong>k most probable</strong> tokens, renormalize their probabilities, and sample from that set. Cuts off the unreliable long tail, but a fixed k is rigid — sometimes too restrictive, sometimes too permissive.</p>
          </div>

          <div class="def-box">
            <span class="def-tag">Nucleus (top-p) sampling</span>
            <p>Choose the <strong>smallest set of tokens whose cumulative probability ≥ p</strong> (e.g. 0.9), then sample from that set. The candidate set size <em>adapts</em> to the model's confidence — small when the model is certain, large when it is unsure.</p>
          </div>

          <table class="lesson-table">
            <thead><tr><th>Strategy</th><th>Candidate set</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td>Greedy / Beam</td><td>argmax / top-k sequences</td><td>Translation, summarization</td></tr>
              <tr><td>Top-k</td><td>Fixed k tokens</td><td>Controlled diversity</td></tr>
              <tr><td>Nucleus (top-p)</td><td>Adaptive (cumulative p)</td><td>Open-ended, natural text</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>In practice:</strong> top-p sampling (often combined with temperature and a top-k cap) is the default for open-ended generation in chat and creative writing, because it avoids both the blandness of beam search and the gibberish of unrestricted sampling.</div>
        `
      },
      {
        id: "instruction-tuned-llms",
        group: "Large Language Models",
        title: "Instruction-Tuned LLMs",
        html: `
          <p class="lead">Large Language Models (LLMs) are transformer-based generative models with billions of parameters, pretrained on massive text corpora and then aligned to follow human instructions.</p>

          <div class="def-box">
            <span class="def-tag">Large Language Model</span>
            <p>An autoregressive transformer scaled to <strong>billions of parameters</strong> and trained on <strong>internet-scale text</strong>. Scale unlocks <em>emergent</em> abilities — few-shot learning, in-context learning, and multi-step reasoning — not explicitly programmed in.</p>
          </div>

          <h4>From base model to assistant</h4>
          <ol class="key-points">
            <li><strong>Pretraining</strong> — next-token prediction on huge corpora gives broad language and world knowledge (a "base" model that merely continues text).</li>
            <li><strong>Instruction tuning</strong> — fine-tuning on (instruction, response) pairs so the model <em>does what it is asked</em> rather than just autocompleting.</li>
            <li><strong>RLHF / preference tuning</strong> — Reinforcement Learning from Human Feedback ranks responses by human preference and optimizes the model toward helpful, harmless, honest behavior.</li>
          </ol>

          <h4>In-context learning</h4>
          <p>LLMs can perform a task from instructions and a few examples placed in the <strong>prompt</strong>, with no weight updates:</p>
          <ul class="key-points">
            <li><strong>Zero-shot</strong> — instruction only ("Translate to French: …").</li>
            <li><strong>Few-shot</strong> — a handful of input→output examples before the real query.</li>
            <li><strong>Chain-of-thought</strong> — prompting the model to show intermediate reasoning steps improves performance on complex problems.</li>
          </ul>

          <div class="note-box"><strong>Why it matters:</strong> instruction tuning is what turns a raw next-token predictor into a usable assistant — the difference between a model that <em>continues</em> your sentence and one that <em>answers</em> your question.</div>
        `
      },
      {
        id: "llm-behaviors",
        group: "Large Language Models",
        title: "Model Behaviors Across Tasks",
        html: `
          <p class="lead">A single instruction-tuned LLM handles many NLP tasks through prompting alone — the same model summarizes, converses, and reasons.</p>

          <h4>Summarization</h4>
          <ul class="key-points">
            <li><strong>Abstractive</strong> by nature — generates new phrasing rather than copying sentences.</li>
            <li>Controllable via the prompt (length, bullet vs. prose, audience, focus).</li>
            <li>Risk: introducing facts not present in the source (faithfulness errors).</li>
          </ul>

          <h4>Dialogue generation</h4>
          <ul class="key-points">
            <li>Maintains <strong>multi-turn context</strong> within the context window, tracking references and prior turns.</li>
            <li>Adopts a persona / system prompt; balances helpfulness with safety.</li>
            <li>Challenge: staying consistent over long conversations and not "drifting".</li>
          </ul>

          <h4>Reasoning tasks</h4>
          <ul class="key-points">
            <li>Arithmetic, logic, multi-hop QA, and code — boosted markedly by <strong>chain-of-thought</strong> prompting.</li>
            <li>Larger models show <strong>emergent</strong> reasoning that smaller ones lack.</li>
            <li>Still brittle: confident-sounding but logically flawed steps are common.</li>
          </ul>

          <div class="example-box">
            <span class="ex-tag">Example</span>
            <p>Asked "If a shirt costs $20 after a 20% discount, what was the original price?", a model prompted to "think step by step" is far more likely to set up 0.8 × x = 20 and solve x = $25 than one asked for the answer directly.</p>
          </div>

          <div class="note-box"><strong>Takeaway:</strong> the generality is the headline feature — one model, many tasks via prompting — but behavior quality varies by task, and reasoning remains the least reliable.</div>
        `
      },
      {
        id: "llm-evaluation",
        group: "Evaluation & Reliability",
        title: "Evaluating Generative Models",
        html: `
          <p class="lead">Evaluating open-ended generation is hard: there is rarely one correct output, so we combine automatic metrics with human judgment.</p>

          <div class="def-box">
            <span class="def-tag">Perplexity</span>
            <p>The standard <strong>intrinsic</strong> metric for language models — how "surprised" the model is by held-out text. Lower perplexity means the model assigns higher probability to real text.</p>
          </div>
          <pre class="formula">Perplexity = exp( − (1/N) · Σᵢ log P(wᵢ | w₁…wᵢ₋₁) )</pre>
          <p>It is the exponential of the average negative log-likelihood per token. Useful for comparing models, but it measures <em>fluency / fit to data</em>, not whether outputs are <strong>correct, helpful, or truthful</strong>.</p>

          <h4>Task-based automatic metrics</h4>
          <ul class="key-points">
            <li><strong>BLEU</strong> — n-gram precision vs. references (translation).</li>
            <li><strong>ROUGE</strong> — n-gram/recall overlap vs. references (summarization).</li>
            <li><strong>BERTScore</strong> — embedding similarity, capturing meaning beyond exact word overlap.</li>
          </ul>

          <div class="def-box">
            <span class="def-tag">Human judgment</span>
            <p>Human raters score outputs on <strong>fluency, coherence, relevance, factual accuracy, and helpfulness</strong>, often via pairwise preference ("which response is better?"). The gold standard for open-ended tasks — but slow, costly, and subjective.</p>
          </div>

          <table class="lesson-table">
            <thead><tr><th>Metric</th><th>Measures</th><th>Limitation</th></tr></thead>
            <tbody>
              <tr><td>Perplexity</td><td>Fluency / data fit</td><td>Ignores correctness & usefulness</td></tr>
              <tr><td>BLEU / ROUGE</td><td>Overlap with references</td><td>Penalizes valid paraphrases</td></tr>
              <tr><td>Human eval</td><td>Overall quality</td><td>Expensive, subjective, slow</td></tr>
            </tbody>
          </table>

          <div class="note-box"><strong>Bottom line:</strong> no single number captures generation quality. Automatic metrics are cheap proxies; human evaluation remains the ultimate arbiter for open-ended generation.</div>
        `
      },
      {
        id: "explainability-hallucination",
        group: "Evaluation & Reliability",
        title: "Explainability & Hallucination",
        html: `
          <p class="lead">Two central trust problems for LLMs: we struggle to explain <em>why</em> they produce an output, and they sometimes produce confident falsehoods.</p>

          <div class="def-box">
            <span class="def-tag">Hallucination</span>
            <p>When a model generates content that is <strong>fluent and confident but factually wrong or unsupported</strong> by any source — fabricated facts, citations, names, or quantities.</p>
          </div>

          <h4>Why hallucination happens</h4>
          <ul class="key-points">
            <li>The training objective rewards <strong>plausible-sounding</strong> text, not verified truth.</li>
            <li>Models have <strong>no built-in fact-checking</strong> or grounding to an authoritative source.</li>
            <li>Knowledge is frozen at training time and stored lossily in weights — gaps get "filled in" by guessing.</li>
            <li>Decoding randomness (sampling) can push the model off a factual path.</li>
          </ul>

          <h4>Mitigations</h4>
          <ul class="key-points">
            <li><strong>Retrieval-Augmented Generation (RAG)</strong> — ground answers in retrieved documents and cite them.</li>
            <li><strong>Lower temperature / constrained decoding</strong> for fact-sensitive tasks.</li>
            <li>Asking the model to express <strong>uncertainty</strong> or to abstain when unsure.</li>
          </ul>

          <div class="def-box">
            <span class="def-tag">Explainability</span>
            <p>LLMs are <strong>black boxes</strong> — billions of parameters give no human-readable reason for a given output. Explainability research seeks to make their decisions interpretable.</p>
          </div>
          <ul class="key-points">
            <li><strong>Attention visualization</strong> — which input tokens the model attended to (suggestive, not a true explanation).</li>
            <li><strong>Feature attribution</strong> (e.g. saliency) — which inputs most influenced the output.</li>
            <li><strong>Chain-of-thought</strong> — surfacing intermediate steps gives a rationale, though it may not reflect the true internal computation.</li>
            <li><strong>Mechanistic interpretability</strong> — reverse-engineering internal circuits and features.</li>
          </ul>

          <div class="note-box"><strong>Why it matters:</strong> hallucination and opacity are the core barriers to deploying LLMs in high-stakes domains (medicine, law, finance). Trustworthy NLP requires outputs that are not just fluent, but verifiable and explainable.</div>
        `
      }
    ]
  }
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
    btn.dataset.unitId = unit.id;
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

// Open a specific lesson unit (and optionally scroll to a section) from anywhere in the app
window.goToLesson = function(unitId, sectionId) {
  if (window.navigateToView) window.navigateToView('lessons', { silent: true });
  activeLessonUnitId = unitId;
  renderLessonUnit(unitId);
  document.querySelectorAll('.lesson-unit-pill').forEach(p => {
    p.classList.toggle('active', parseInt(p.dataset.unitId) === unitId);
  });
  setTimeout(() => {
    if (sectionId) {
      const el = document.getElementById('lesson-' + sectionId);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    const lessons = document.getElementById('lessons');
    if (lessons) lessons.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, 90);
  const unit = LESSONS_DATA.find(u => u.id === unitId);
  if (window.showToast) window.showToast(`Opened lesson: ${unit ? unit.num : 'Unit ' + unitId}`);
};

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
  const playgroundFor = { 1: 'preproc', 2: 'embeddings', 3: 'lstm', 4: 'translation', 5: 'bert', 6: 'gpt' };
  const pg = playgroundFor[unit.id];
  let html = `
    <div class="lesson-banner">
      <span class="badge badge-indigo">${unit.num}</span>
      <h3>${unit.title}</h3>
      <p>${unit.intro}</p>
      ${pg ? `<button class="lesson-playground-link" onclick="goToPlayground('${pg}')">Try it in the Playground →</button>` : ''}
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
