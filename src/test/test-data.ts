export const testDocument = `


WikipediaThe Free Encyclopedia
Search Wikipedia
Search
Donate
Create account
Log in

Contents hide
(Top)
History
Dataset preprocessing

Training and architecture

Training cost
Tool use
Agency
Compression
Multimodality
Properties

Interpretation

Evaluation

Wider impact

List of large language models
See also
Notes
References
Further reading
Large language model

Article
Talk
Read
Edit
View history

Tools
Appearance hide
Text

Small

Standard

Large
Width

Standard

Wide
Color (beta)

Automatic

Light

Dark
From Wikipedia, the free encyclopedia
Not to be confused with Logic learning machine.
Part of a series on
Machine learning
and data mining
Paradigms
Problems
Supervised learning
(classification • regression)
Clustering
Dimensionality reduction
Structured prediction
Anomaly detection
Artificial neural network
AutoencoderDeep learningFeedforward neural networkRecurrent neural network LSTMGRUESNreservoir computingBoltzmann machine RestrictedGANDiffusion modelSOMConvolutional neural network U-NetLeNetAlexNetDeepDreamNeural radiance fieldTransformer VisionMambaSpiking neural networkMemtransistorElectrochemical RAM (ECRAM)
Reinforcement learning
Learning with humans
Model diagnostics
Mathematical foundations
Journals and conferences
Related articles
vte
A large language model (LLM) is a type of computational model designed for natural language processing tasks such as language generation. As language models, LLMs acquire these abilities by learning statistical relationships from vast amounts of text during a self-supervised and semi-supervised training process.[1]

The largest and most capable LLMs are artificial neural networks built with a decoder-only transformer-based architecture, enabling efficient processing and generation of large-scale text data. Modern models can be fine-tuned for specific tasks or guided by prompt engineering.[2] These models acquire predictive power regarding syntax, semantics, and ontologies[3] inherent in human language corpora, but they also inherit inaccuracies and biases present in the data they are trained in.[4]

History

The training compute of notable large models in FLOPs vs publication date over the period 2010-2024. For overall notable models (top left), frontier models (top right), top language models (bottom left) and top models within leading companies (bottom right). The majority of these models are language models.

The training compute of notable large AI models in FLOPs vs publication date over the period 2017-2024. The majority of large models are language models or multimodal models with language capacity.
Before 2017, there were a few language models that were large as compared to capacities then available. In the 1990s, the IBM alignment models pioneered statistical language modelling. A smoothed n-gram model in 2001 trained on 0.3 billion words achieved state-of-the-art perplexity at the time.[5] In the 2000s, as Internet use became prevalent, some researchers constructed Internet-scale language datasets ("web as corpus"[6]), upon which they trained statistical language models.[7][8] In 2009, in most language processing tasks, statistical language models dominated over symbolic language models, as they can usefully ingest large datasets.[9]

After neural networks became dominant in image processing around 2012,[10] they were applied to language modelling as well. Google converted its translation service to Neural Machine Translation in 2016. As it was before transformers, it was done by seq2seq deep LSTM networks.


An illustration of main components of the transformer model from the original paper, where layers were normalized after (instead of before) multiheaded attention
At the 2017 NeurIPS conference, Google researchers introduced the transformer architecture in their landmark paper "Attention Is All You Need". This paper's goal was to improve upon 2014 seq2seq technology,[11] and was based mainly on the attention mechanism developed by Bahdanau et al. in 2014.[12] The following year in 2018, BERT was introduced and quickly became "ubiquitous".[13] Though the original transformer has both encoder and decoder blocks, BERT is an encoder-only model. Academic and research usage of BERT began to decline in 2023, following rapid improvements in the abilities of decoder-only models (such as GPT) to solve tasks via prompting.[14]

Although decoder-only GPT-1 was introduced in 2018, it was GPT-2 in 2019 that caught widespread attention because OpenAI at first deemed it too powerful to release publicly, out of fear of malicious use.[15] GPT-3 in 2020 went a step further and as of 2024 is available only via API with no offering of downloading the model to execute locally. But it was the 2022 consumer-facing browser-based ChatGPT that captured the imaginations of the general population and caused some media hype and online buzz.[16] The 2023 GPT-4 was praised for its increased accuracy and as a "holy grail" for its multimodal capabilities.[17] OpenAI did not reveal the high-level architecture and the number of parameters of GPT-4. The release of ChatGPT led to an uptick in LLM usage across several research subfields of computer science, including robotics, software engineering, and societal impact work.[18]

Competing language models have for the most part been attempting to equal the GPT series, at least in terms of number of parameters.[19]

Since 2022, source-available models have been gaining popularity, especially at first with BLOOM and LLaMA, though both have restrictions on the field of use. Mistral AI's models Mistral 7B and Mixtral 8x7b have the more permissive Apache License. As of June 2024, The Instruction fine tuned variant of the Llama 3 70 billion parameter model is the most powerful open LLM according to the LMSYS Chatbot Arena Leaderboard, being more powerful than GPT-3.5 but not as powerful as GPT-4.[20]

As of 2024, the largest and most capable models are all based on the Transformer architecture. Some recent implementations are based on other architectures, such as recurrent neural network variants and Mamba (a state space model).[21][22][23]

Dataset preprocessing
See also: List of datasets for machine-learning research § Internet
Tokenization

Because machine learning algorithms process numbers rather than text, the text must be converted to numbers. In the first step, a vocabulary is decided upon, then integer indices are arbitrarily but uniquely assigned to each vocabulary entry, and finally, an embedding is associated to the integer index. Algorithms include byte-pair encoding (BPE) and WordPiece. There are also special tokens serving as control characters, such as [MASK] for masked-out token (as used in BERT), and [UNK] ("unknown") for characters not appearing in the vocabulary. Also, some special symbols are used to denote special text formatting. For example, "Ġ" denotes a preceding whitespace in RoBERTa and GPT. "##" denotes continuation of a preceding word in BERT.[24]

For example, the BPE tokenizer used by GPT-3 (Legacy) would split tokenizer: texts -> series of numerical "tokens" as

token	izer	:	 texts	 ->	series	 of	 numerical	 "	t	ok	ens	"
Tokenization also compresses the datasets. Because LLMs generally require input to be an array that is not jagged, the shorter texts must be "padded" until they match the length of the longest one. How many tokens are, on average, needed per word depends on the language of the dataset.[25][26]

BPE
Main article: Byte pair encoding
As an example, consider a tokenizer based on byte-pair encoding. In the first step, all unique characters (including blanks and punctuation marks) are treated as an initial set of n-grams (i.e. initial set of uni-grams). Successively the most frequent pair of adjacent characters is merged into a bi-gram and all instances of the pair are replaced by it. All occurrences of adjacent pairs of (previously merged) n-grams that most frequently occur together are then again merged into even lengthier n-gram, until a vocabulary of prescribed size is obtained (in case of GPT-3, the size is 50257).[27] After a tokenizer is trained, any text can be tokenized by it, as long as it does not contain characters not appearing in the initial-set of uni-grams.[28]

Problems
A token vocabulary based on the frequencies extracted from mainly English corpora uses as few tokens as possible for an average English word. An average word in another language encoded by such an English-optimized tokenizer is however split into suboptimal amount of tokens. GPT-2 tokenizer can use up to 15 times more tokens per word for some languages, for example for the Shan language from Myanmar. Even more widespread languages such as Portuguese and German have "a premium of 50%" compared to English.[29]

Greedy tokenization also causes subtle problems with text completion.[30]

Dataset cleaning
Main article: Data cleansing
In the context of training LLMs, datasets are typically cleaned by removing toxic passages from the dataset, discarding low-quality data, and de-duplication.[31] Cleaned datasets can increase training efficiency and lead to improved downstream performance.[32][33] A trained LLM can be used to clean datasets for training a further LLM.[34]

With the increasing proportion of LLM-generated content on the web, data cleaning in the future may include filtering out such content. LLM-generated content can pose a problem if the content is similar to human text (making filtering difficult) but of lower quality (degrading performance of models trained on it).[35]

Synthetic data
Main article: Synthetic data
Training of largest language models might need more linguistic data than naturally available, or that the naturally occurring data is of insufficient quality. In these cases, synthetic data might be used. Microsoft's Phi series of LLMs is trained on textbook-like data generated by another LLM.[36]

Training and architecture
See also: Fine-tuning (machine learning)
Reinforcement learning from human feedback (RLHF)
Main article: Reinforcement learning from human feedback
Reinforcement learning from human feedback (RLHF) through algorithms, such as proximal policy optimization, is used to further fine-tune a model based on a dataset of human preferences.[37]

Instruction tuning
Using "self-instruct" approaches, LLMs have been able to bootstrap correct responses, replacing any naive responses, starting from human-generated corrections of a few cases. For example, in the instruction "Write an essay about the main themes represented in Hamlet," an initial naive completion might be "If you submit the essay after March 17, your grade will be reduced by 10% for each day of delay," based on the frequency of this textual sequence in the corpus.[38]

Mixture of experts
Main article: Mixture of experts
The largest LLM may be too expensive to train and use directly. For such models, mixture of experts (MoE) can be applied, a line of research pursued by Google researchers since 2017 to train models reaching up to 1 trillion parameters.[39][40][41]

Prompt engineering, attention mechanism, and context window
See also: Prompt engineering and Attention (machine learning)
Most results previously achievable only by (costly) fine-tuning, can be achieved through prompt engineering, although limited to the scope of a single conversation (more precisely, limited to the scope of a context window).[42]


When each head calculates, according to its own criteria, how much other tokens are relevant for the "it_" token, note that the second attention head, represented by the second column, is focusing most on the first two rows, i.e. the tokens "The" and "animal", while the third column is focusing most on the bottom two rows, i.e. on "tired", which has been tokenized into two tokens.[43]
In order to find out which tokens are relevant to each other within the scope of the context window, the attention mechanism calculates "soft" weights for each token, more precisely for its embedding, by using multiple attention heads, each with its own "relevance" for calculating its own soft weights. For example, the small (i.e. 117M parameter sized) GPT-2 model has had twelve attention heads and a context window of only 1k tokens.[44] In its medium version it has 345M parameters and contains 24 layers, each with 12 attention heads. For the training with gradient descent a batch size of 512 was utilized.[28]

The largest models, such as Google's Gemini 1.5, presented in February 2024, can have a context window sized up to 1 million (context window of 10 million was also "successfully tested").[45] Other models with large context windows includes Anthropic's Claude 2.1, with a context window of up to 200k tokens.[46] Note that this maximum refers to the number of input tokens and that the maximum number of output tokens differs from the input and is often smaller. For example, the GPT-4 Turbo model has a maximum output of 4096 tokens.[47]

Length of a conversation that the model can take into account when generating its next answer is limited by the size of a context window, as well. If the length of a conversation, for example with ChatGPT, is longer than its context window, only the parts inside the context window are taken into account when generating the next answer, or the model needs to apply some algorithm to summarize the too distant parts of conversation.

The shortcomings of making a context window larger include higher computational cost and possibly diluting the focus on local context, while making it smaller can cause a model to miss an important long-range dependency. Balancing them are a matter of experimentation and domain-specific considerations.

A model may be pre-trained either to predict how the segment continues, or what is missing in the segment, given a segment from its training dataset.[48] It can be either

autoregressive (i.e. predicting how the segment continues, the way GPTs do it): for example given a segment "I like to eat", the model predicts "ice cream", or "sushi".
"masked" (i.e. filling in the parts missing from the segment, the way "BERT"[49] does it): for example, given a segment "I like to [__] [__] cream", the model predicts that "eat" and "ice" are missing.
Models may be trained on auxiliary tasks which test their understanding of the data distribution, such as Next Sentence Prediction (NSP), in which pairs of sentences are presented and the model must predict whether they appear consecutively in the training corpus.[49] During training, regularization loss is also used to stabilize training. However regularization loss is usually not used during testing and evaluation.

Infrastructure
Substantial infrastructure is necessary for training the largest models.[50][51][52]

Training cost

Advances in software and hardware have reduced the cost substantially since 2020, such that in 2023 training of a 12-billion-parameter LLM computational cost is 72,300 A100-GPU-hours, while in 2020 the cost of training a 1.5-billion-parameter LLM (which was two orders of magnitude smaller than the state of the art in 2020) was between $80,000 and $1,600,000.[53][54][55] Since 2020, large sums were invested in increasingly large models. For example, training of the GPT-2 (i.e. a 1.5-billion-parameters model) in 2019 cost $50,000, while training of the PaLM (i.e. a 540-billion-parameters model) in 2022 cost $8 million, and Megatron-Turing NLG 530B (in 2021) cost around $11 million.[56]

For Transformer-based LLM, training cost is much higher than inference cost. It costs 6 FLOPs per parameter to train on one token, whereas it costs 1 to 2 FLOPs per parameter to infer on one token.[57]

Tool use
There are certain tasks that, in principle, cannot be solved by any LLM, at least not without the use of external tools or additional software. An example of such a task is responding to the user's input '354 * 139 = ', provided that the LLM has not already encountered a continuation of this calculation in its training corpus.[dubious – discuss] In such cases, the LLM needs to resort to running program code that calculates the result, which can then be included in its response.[dubious – discuss]: Another example is "What is the time now? It is ", where a separate program interpreter would need to execute a code to get system time on the computer, so that the LLM can include it in its reply.[58][59] This basic strategy can be sophisticated with multiple attempts of generated programs, and other sampling strategies.[60]

Generally, in order to get an LLM to use tools, one must fine-tune it for tool-use. If the number of tools is finite, then fine-tuning may be done just once. If the number of tools can grow arbitrarily, as with online API services, then the LLM can be fine-tuned to be able to read API documentation and call API correctly.[61][62]

A simpler form of tool use is retrieval-augmented generation: the augmentation of an LLM with document retrieval. Given a query, a document retriever is called to retrieve the most relevant documents. This is usually done by encoding the query and the documents into vectors, then finding the documents with vectors (usually stored in a vector database) most similar to the vector of the query. The LLM then generates an output based on both the query and context included from the retrieved documents.[63]

Agency
An LLM is typically not an autonomous agent by itself, as it lacks the ability to interact with dynamic environments, recall past behaviors, and plan future actions, but can be transformed into one by integrating modules like profiling, memory, planning, and action.[64]

The ReAct pattern, a portmanteau of "Reason + Act", constructs an agent out of an LLM, using the LLM as a planner. The LLM is prompted to "think out loud". Specifically, the language model is prompted with a textual description of the environment, a goal, a list of possible actions, and a record of the actions and observations so far. It generates one or more thoughts before generating an action, which is then executed in the environment.[65] The linguistic description of the environment given to the LLM planner can even be the LaTeX code of a paper describing the environment.[66]

In the DEPS ("Describe, Explain, Plan and Select") method, an LLM is first connected to the visual world via image descriptions, then it is prompted to produce plans for complex tasks and behaviors based on its pretrained knowledge and environmental feedback it receives.[67]

The Reflexion method[68] constructs an agent that learns over multiple episodes. At the end of each episode, the LLM is given the record of the episode, and prompted to think up "lessons learned", which would help it perform better at a subsequent episode. These "lessons learned" are given to the agent in the subsequent episodes.[citation needed]

Monte Carlo tree search can use an LLM as rollout heuristic. When a programmatic world model is not available, an LLM can also be prompted with a description of the environment to act as world model.[69]

For open-ended exploration, an LLM can be used to score observations for their "interestingness", which can be used as a reward signal to guide a normal (non-LLM) reinforcement learning agent.[70] Alternatively, it can propose increasingly difficult tasks for curriculum learning.[71] Instead of outputting individual actions, an LLM planner can also construct "skills", or functions for complex action sequences. The skills can be stored and later invoked, allowing increasing levels of abstraction in planning.[71]

LLM-powered agents can keep a long-term memory of its previous contexts, and the memory can be retrieved in the same way as Retrieval Augmented Generation. Multiple such agents can interact socially.[72]

Compression
Typically, LLMs are trained with single- or half-precision floating point numbers (float32 and float16). One float16 has 16 bits, or 2 bytes, and so one billion parameters require 2 gigabytes. The largest models typically have 100 billion parameters, requiring 200 gigabytes to load, which places them outside the range of most consumer electronics.[73]

Post-training quantization[74] aims to decrease the space requirement by lowering precision of the parameters of a trained model, while preserving most of its performance.[75][76] The simplest form of quantization simply truncates all numbers to a given number of bits. It can be improved by using a different quantization codebook per layer. Further improvement can be done by applying different precisions to different parameters, with higher precision for particularly important parameters ("outlier weights").[77] See [78] for a visual guide.

While quantized models are typically frozen, and only pre-quantized models are fine-tuned, quantized models can still be fine-tuned.[79]

Multimodality
See also: Multimodal learning
Multimodality means "having several modalities", and a "modality" refers to a type of input or output, such as video, image, audio, text, proprioception, etc.[80] There have been many AI models trained specifically to ingest one modality and output another modality, such as AlexNet for image to label,[81] visual question answering for image-text to text,[82] and speech recognition for speech to text.

A common method to create multimodal models out of an LLM is to "tokenize" the output of a trained encoder. Concretely, one can construct an LLM that can understand images as follows: take a trained LLM, and take a trained image encoder 
E
{\displaystyle E}. Make a small multilayered perceptron 
f
{\displaystyle f}, so that for any image 
y
{\displaystyle y}, the post-processed vector 
f
(
E
(
y
)
)
{\displaystyle f(E(y))} has the same dimensions as an encoded token. That is an "image token". Then, one can interleave text tokens and image tokens. The compound model is then fine-tuned on an image-text dataset. This basic construction can be applied with more sophistication to improve the model. The image encoder may be frozen to improve stability.[83]

Flamingo demonstrated the effectiveness of the tokenization method, finetuning a pair of pretrained language model and image encoder to perform better on visual question answering than models trained from scratch.[84] Google PaLM model was fine-tuned into a multimodal model PaLM-E using the tokenization method, and applied to robotic control.[85] LLaMA models have also been turned multimodal using the tokenization method, to allow image inputs,[86] and video inputs.[87]

GPT-4 can use both text and image as inputs[88] (although the vision component was not released to the public until GPT-4V[89]); Google DeepMind's Gemini is also multimodal.[90] Mistral introduced its own multimodel Pixtral 12B model in September 2024.[91]

Properties
Scaling laws
Main article: Neural scaling law
The performance of an LLM after pretraining largely depends on the:

cost of pretraining 
C
{\displaystyle C} (the total amount of compute used),
size of the artificial neural network itself, such as number of parameters 
N
{\displaystyle N} (i.e. amount of neurons in its layers, amount of weights between them and biases),
size of its pretraining dataset (i.e. number of tokens in corpus, 
D
{\displaystyle D}).
"Scaling laws" are empirical statistical laws that predict LLM performance based on such factors. One particular scaling law ("Chinchilla scaling") for LLM autoregressively trained for one epoch, with a log-log learning rate schedule, states that:[92]
{
C
=
C
0
N
D
L
=
A
N
α
+
B
D
β
+
L
0
{\displaystyle {\begin{cases}C=C_{0}ND\\[6pt]L={\frac {A}{N^{\alpha }}}+{\frac {B}{D^{\beta }}}+L_{0}\end{cases}}}where the variables are

C
{\displaystyle C} is the cost of training the model, in FLOPs.
N
{\displaystyle N} is the number of parameters in the model.
D
{\displaystyle D} is the number of tokens in the training set.
L
{\displaystyle L} is the average negative log-likelihood loss per token (nats/token), achieved by the trained LLM on the test dataset.
and the statistical hyper-parameters are

C
0
=
6
{\displaystyle C_{0}=6}, meaning that it costs 6 FLOPs per parameter to train on one token. Note that training cost is much higher than inference cost, where it costs 1 to 2 FLOPs per parameter to infer on one token.[57]
α
=
0.34
,
β
=
0.28
,
A
=
406.4
,
B
=
410.7
,
L
0
=
1.69
{\displaystyle \alpha =0.34,\beta =0.28,A=406.4,B=410.7,L_{0}=1.69}
Emergent abilities


At point(s) referred to as breaks,[93] the lines change their slopes, appearing on a linear-log plot as a series of linear segments connected by arcs.
Performance of bigger models on various tasks, when plotted on a log-log scale, appears as a linear extrapolation of performance achieved by smaller models. However, this linearity may be punctuated by "break(s)"[93] in the scaling law, where the slope of the line changes abruptly, and where larger models acquire "emergent abilities".[42][94] They arise from the complex interaction of the model's components and are not explicitly programmed or designed.[95]

Furthermore, recent research has demonstrated that AI systems, including large language models, can employ heuristic reasoning akin to human cognition. They balance between exhaustive logical processing and the use of cognitive shortcuts (heuristics), adapting their reasoning strategies to optimize between accuracy and effort. This behavior aligns with principles of resource-rational human cognition, as discussed in classical theories of bounded rationality and dual-process theory.[96]

The most intriguing among emergent abilities is in-context learning from example demonstrations.[97] In-context learning is involved in tasks, such as:

reported arithmetics, decoding the International Phonetic Alphabet, unscrambling a word's letters, disambiguate word in context,[42][98][99] converting spatial words, cardinal directions (for example, replying "northeast" upon [0, 0, 1; 0, 0, 0; 0, 0, 0]), color terms represented in text.[100]
chain-of-thought prompting: Model outputs are improved by chain-of-thought prompting only when model size exceeds 62B. Smaller models perform better when prompted to answer immediately, without chain of thought.[101]
identifying offensive content in paragraphs of Hinglish (a combination of Hindi and English), and generating a similar English equivalent of Kiswahili proverbs.[102]
Schaeffer et. al. argue that the emergent abilities are not unpredictably acquired, but predictably acquired according to a smooth scaling law. The authors considered a toy statistical model of an LLM solving multiple-choice questions, and showed that this statistical model, modified to account for other types of tasks, applies to these tasks as well.[103]

Let 
x
{\displaystyle x} be the number of parameter count, and 
y
{\displaystyle y} be the performance of the model.

When 
y
=
average 
Pr
(
correct token
)
{\displaystyle y={\text{average }}\Pr({\text{correct token}})}, then 
(
log
⁡
x
,
y
)
{\displaystyle (\log x,y)} is an exponential curve (before it hits the plateau at one), which looks like emergence.
When 
y
=
average 
log
⁡
(
Pr
(
correct token
)
)
{\displaystyle y={\text{average }}\log(\Pr({\text{correct token}}))}, then the 
(
log
⁡
x
,
y
)
{\displaystyle (\log x,y)} plot is a straight line (before it hits the plateau at zero), which does not look like emergence.
When 
y
=
average 
Pr
(
the most likely token is correct
)
{\displaystyle y={\text{average }}\Pr({\text{the most likely token is correct}})}, then 
(
log
⁡
x
,
y
)
{\displaystyle (\log x,y)} is a step-function, which looks like emergence.
Interpretation
Large language models by themselves are black boxes, and it is not clear how they can perform linguistic tasks. There are several methods for understanding how LLM work.

Mechanistic interpretability aims to reverse-engineer LLM by discovering symbolic algorithms that approximate the inference performed by LLM. One example is Othello-GPT, where a small Transformer is trained to predict legal Othello moves. It is found that there is a linear representation of Othello board, and modifying the representation changes the predicted legal Othello moves in the correct way.[104][105] In another example, a small Transformer is trained on Karel programs. Similar to the Othello-GPT example, there is a linear representation of Karel program semantics, and modifying the representation changes output in the correct way. The model also generates correct programs that are on average shorter than those in the training set.[106]

In another example, the authors trained small transformers on modular arithmetic addition. The resulting models were reverse-engineered, and it turned out they used discrete Fourier transform.[107]

Understanding and intelligence
See also: Philosophy of artificial intelligence and Artificial consciousness
NLP researchers were evenly split when asked, in a 2022 survey, whether (untuned) LLMs "could (ever) understand natural language in some nontrivial sense".[108] Proponents of "LLM understanding" believe that some LLM abilities, such as mathematical reasoning, imply an ability to "understand" certain concepts. A Microsoft team argued in 2023 that GPT-4 "can solve novel and difficult tasks that span mathematics, coding, vision, medicine, law, psychology and more" and that GPT-4 "could reasonably be viewed as an early (yet still incomplete) version of an artificial general intelligence system": "Can one reasonably say that a system that passes exams for software engineering candidates is not really intelligent?"[109][110] Ilya Sutskever argues that predicting the next word sometimes involves reasoning and deep insights, for example if the LLM has to predict the name of the criminal in an unknown detective novel after processing the entire story leading up to the revelation.[111] Some researchers characterize LLMs as "alien intelligence".[112][113] For example, Conjecture CEO Connor Leahy considers untuned LLMs to be like inscrutable alien "Shoggoths", and believes that RLHF tuning creates a "smiling facade" obscuring the inner workings of the LLM: "If you don't push it too far, the smiley face stays on. But then you give it [an unexpected] prompt, and suddenly you see this massive underbelly of insanity, of weird thought processes and clearly non-human understanding."[114][115]

In contrast, some proponents of the "LLMs lack understanding" school believe that existing LLMs are "simply remixing and recombining existing writing",[113] a phenomenon known as stochastic parrot, or they point to the deficits existing LLMs continue to have in prediction skills, reasoning skills, agency, and explainability.[108] For example, GPT-4 has natural deficits in planning and in real-time learning.[110] Generative LLMs have been observed to confidently assert claims of fact which do not seem to be justified by their training data, a phenomenon which has been termed "hallucination".[116] Specifically, hallucinations in the context of LLMs correspond to the generation of text or responses that seem syntactically sound, fluent, and natural but are factually incorrect, nonsensical, or unfaithful to the provided source input.[117] Neuroscientist Terrence Sejnowski has argued that "The diverging opinions of experts on the intelligence of LLMs suggests that our old ideas based on natural intelligence are inadequate".[108]

The matter of LLM's exhibiting intelligence or understanding has two main aspects – the first is how to model thought and language in a computer system, and the second is how to enable the computer system to generate human like language.[108] These aspects of language as a model of cognition have been developed in the field of cognitive linguistics. American linguist George Lakoff presented Neural Theory of Language (NTL)[118] as a computational basis for using language as a model of learning tasks and understanding. The NTL Model outlines how specific neural structures of the human brain shape the nature of thought and language and in turn what are the computational properties of such neural systems that can be applied to model thought and language in a computer system. After a framework for modeling language in a computer systems was established, the focus shifted to establishing frameworks for computer systems to generate language with acceptable grammar. In his 2014 book titled The Language Myth: Why Language Is Not An Instinct, British cognitive linguist and digital communication technologist Vyvyan Evans mapped out the role of probabilistic context-free grammar (PCFG) in enabling NLP to model cognitive patterns and generate human like language.[119][120]

Evaluation
Perplexity
The canonical measure of the performance of an LLM is its perplexity on a given text corpus. Perplexity measures how well a model predicts the contents of a dataset; the higher the likelihood the model assigns to the dataset, the lower the perplexity. In mathematical terms, perplexity is the exponential of the average negative log likelihood per token.

log
⁡
(
Perplexity
)
=
−
1
N
∑
i
=
1
N
log
⁡
(
Pr
(
token
i
∣
context for token
i
)
)
{\displaystyle \log({\text{Perplexity}})=-{\frac {1}{N}}\sum _{i=1}^{N}\log(\Pr({\text{token}}_{i}\mid {\text{context for token}}_{i}))}

Here, 
N
{\displaystyle N} is the number of tokens in the text corpus, and "context for token 
i
{\displaystyle i}" depends on the specific type of LLM. If the LLM is autoregressive, then "context for token 
i
{\displaystyle i}" is the segment of text appearing before token 
i
{\displaystyle i}. If the LLM is masked, then "context for token 
i
{\displaystyle i}" is the segment of text surrounding token 
i
{\displaystyle i}.

Because language models may overfit to training data, models are usually evaluated by their perplexity on a test set.[49] This evaluation is potentially problematic for larger models which, as they are trained on increasingly large corpora of text, are increasingly likely to inadvertently include portions of any given test set.[2]

BPW, BPC, and BPT
In information theory, the concept of entropy is intricately linked to perplexity, a relationship notably established by Claude Shannon.[121] This relationship is mathematically expressed as 
Entropy
=
log
2
⁡
(
Perplexity
)
{\displaystyle {\text{Entropy}}=\log _{2}({\text{Perplexity}})}.

Entropy, in this context, is commonly quantified in terms of bits per word (BPW) or bits per character (BPC), which hinges on whether the language model utilizes word-based or character-based tokenization.

Notably, in the case of larger language models that predominantly employ sub-word tokenization, bits per token (BPT) emerges as a seemingly more appropriate measure. However, due to the variance in tokenization methods across different Large Language Models (LLMs), BPT does not serve as a reliable metric for comparative analysis among diverse models. To convert BPT into BPW, one can multiply it by the average number of tokens per word.

In the evaluation and comparison of language models, cross-entropy is generally the preferred metric over entropy. The underlying principle is that a lower BPW is indicative of a model's enhanced capability for compression. This, in turn, reflects the model's proficiency in making accurate predictions.

Task-specific datasets and benchmarks
A large number of testing datasets and benchmarks have also been developed to evaluate the capabilities of language models on more specific downstream tasks. Tests may be designed to evaluate a variety of capabilities, including general knowledge, commonsense reasoning, and mathematical problem-solving.

One broad category of evaluation dataset is question answering datasets, consisting of pairs of questions and correct answers, for example, ("Have the San Jose Sharks won the Stanley Cup?", "No").[122] A question answering task is considered "open book" if the model's prompt includes text from which the expected answer can be derived (for example, the previous question could be adjoined with some text which includes the sentence "The Sharks have advanced to the Stanley Cup finals once, losing to the Pittsburgh Penguins in 2016."[122]). Otherwise, the task is considered "closed book", and the model must draw on knowledge retained during training.[123] Some examples of commonly used question answering datasets include TruthfulQA, Web Questions, TriviaQA, and SQuAD.[123]

Evaluation datasets may also take the form of text completion, having the model select the most likely word or sentence to complete a prompt, for example: "Alice was friends with Bob. Alice went to visit her friend, ____".[2]

Some composite benchmarks have also been developed which combine a diversity of different evaluation datasets and tasks. Examples include GLUE, SuperGLUE, MMLU, BIG-bench, and HELM.[121][123] OpenAI has released tools for running composite benchmarks, but noted that the eval results are sensitive to the prompting method.[124][125] Some public datasets contain questions that are mislabeled, ambiguous, unanswerable, or otherwise of low-quality, which can be cleaned to give more reliable benchmark scores.[126]

It was previously standard to report results on a heldout portion of an evaluation dataset after doing supervised fine-tuning on the remainder. It is now more common to evaluate a pre-trained model directly through prompting techniques, though researchers vary in the details of how they formulate prompts for particular tasks, particularly with respect to how many examples of solved tasks are adjoined to the prompt (i.e. the value of n in n-shot prompting).

Adversarially constructed evaluations
Because of the rapid pace of improvement of large language models, evaluation benchmarks have suffered from short lifespans, with state of the art models quickly "saturating" existing benchmarks, exceeding the performance of human annotators, leading to efforts to replace or augment the benchmark with more challenging tasks.[127] In addition, there are cases of "shortcut learning" wherein AIs sometimes "cheat" on multiple-choice tests by using statistical correlations in superficial test question wording in order to guess the correct responses, without necessarily understanding the actual question being asked.[108]

Some datasets have been constructed adversarially, focusing on particular problems on which extant language models seem to have unusually poor performance compared to humans. One example is the TruthfulQA dataset, a question answering dataset consisting of 817 questions which language models are susceptible to answering incorrectly by mimicking falsehoods to which they were repeatedly exposed during training. For example, an LLM may answer "No" to the question "Can you teach an old dog new tricks?" because of its exposure to the English idiom you can't teach an old dog new tricks, even though this is not literally true.[128]

Another example of an adversarial evaluation dataset is Swag and its successor, HellaSwag, collections of problems in which one of multiple options must be selected to complete a text passage. The incorrect completions were generated by sampling from a language model and filtering with a set of classifiers. The resulting problems are trivial for humans but at the time the datasets were created state of the art language models had poor accuracy on them. For example:

We see a fitness center sign. We then see a man talking to the camera and sitting and laying on a exercise ball. The man...
a) demonstrates how to increase efficient exercise work by running up and down balls.
b) moves all his arms and legs and builds up a lot of muscle.
c) then plays the ball and we see a graphics and hedge trimming demonstration.
d) performs sit ups while on the ball and talking.[129]

BERT selects b) as the most likely completion, though the correct answer is d).[129]

Wider impact
In 2023, Nature Biomedical Engineering wrote that "it is no longer possible to accurately distinguish" human-written text from text created by large language models, and that "It is all but certain that general-purpose large language models will rapidly proliferate... It is a rather safe bet that they will change many industries over time."[130] Goldman Sachs suggested in 2023 that generative language AI could increase global GDP by 7% in the next ten years, and could expose to automation 300 million jobs globally.[131][132]

Memorization and copyright
Further information: Artificial intelligence and copyright
Memorization is an emergent behavior in LLMs in which long strings of text are occasionally output verbatim from training data, contrary to typical behavior of traditional artificial neural nets. Evaluations of controlled LLM output measure the amount memorized from training data (focused on GPT-2-series models) as variously over 1% for exact duplicates[133] or up to about 7%.[134]

Security
Some commenters expressed concern over accidental or deliberate creation of misinformation, or other forms of misuse.[135] For example, the availability of large language models could reduce the skill-level required to commit bioterrorism; biosecurity researcher Kevin Esvelt has suggested that LLM creators should exclude from their training data papers on creating or enhancing pathogens.[136]

A study by researchers at Google and several universities, including Cornell University and University of California, Berkeley, showed that there are potential security risks in language models such as ChatGPT. In their study, they examined and confirmed the possibility that questioners could get, from ChatGPT, the training data that the AI model used. For example, when asking ChatGPT 3.5 turbo to repeat the word "poem" forever, the AI model will say "poem" hundreds of times and then diverge, deviating from the standard dialogue style and spitting out nonsense phrases, thus spitting out the training data as it is. The researchers have seen more than 10,000 examples of the AI model exposing their training data in a similar method. The researchers said that it was hard to tell if the AI model was actually safe or not.[137]

The potential presence of "sleeper agents" within LLM models is another emerging security concern. These are hidden functionalities built into the model that remain dormant until triggered by a specific event or condition. Upon activation, the LLM deviates from its expected behavior to make insecure actions.[138]

LLM applications accessible to the public, like ChatGPT or Claude, typically incorporate safety measures designed to filter out harmful content. However, implementing these controls effectively has proven challenging. For instance, a 2023 study[139] proposed a method for circumventing LLM safety systems. Similarly, Yongge Wang[140] illustrated in 2024 how a potential criminal could potentially bypass ChatGPT 4o's safety controls to obtain information on establishing a drug trafficking operation.

Algorithmic bias
Main article: Algorithmic bias
While LLMs have shown remarkable capabilities in generating human-like text, they are susceptible to inheriting and amplifying biases present in their training data. This can manifest in skewed representations or unfair treatment of different demographics, such as those based on race, gender, language, and cultural groups.[141] Since English data is overrepresented in current large language models' training data, it may also downplay non-English views.[142]

Stereotyping
AI models can reinforce a wide range of stereotypes, including those based on gender, ethnicity, age, nationality, religion, or occupation. This can lead to outputs that unfairly generalize or caricature groups of people, sometimes in harmful or derogatory ways.[143]

Notably, gender bias refers to the tendency of these models to produce outputs that are unfairly prejudiced towards one gender over another. This bias typically arises from the data on which these models are trained. Large language models often assign roles and characteristics based on traditional gender norms.[141] For example, it might associate nurses or secretaries predominantly with women and engineers or CEOs with men.[144]

Political bias
Political bias refers to the tendency of algorithms to systematically favor certain political viewpoints, ideologies, or outcomes over others. Language models may also exhibit political biases. Since the training data includes a wide range of political opinions and coverage, the models might generate responses that lean towards particular political ideologies or viewpoints, depending on the prevalence of those views in the data.[145]

List of large language models
See also: List of chatbots
For the training cost column, 1 petaFLOP-day = 1 petaFLOP/sec × 1 day = 8.64E19 FLOP. Also, only the largest model's cost is written.

Name	Release date[a]	Developer	Number of parameters (billion) [b]	Corpus size	Training cost (petaFLOP-day)	License[c]	Notes
GPT-1	June 2018	OpenAI	0.117		1[146]	MIT[147]	First GPT model, decoder-only transformer. Trained for 30 days on 8 P600 GPUs.
BERT	October 2018	Google	0.340[148]	3.3 billion words[148]	9[149]	Apache 2.0[150]	An early and influential language model.[4] Encoder-only and thus not built to be prompted or generative.[151] Training took 4 days on 64 TPUv2 chips.[152]
T5	October 2019	Google	11[153]	34 billion tokens[153]		Apache 2.0[154]	Base model for many Google projects, such as Imagen.[155]
XLNet	June 2019	Google	0.340[156]	33 billion words	330	Apache 2.0[157]	An alternative to BERT; designed as encoder-only. Trained on 512 TPU v3 chips for 5.5 days.[158]
GPT-2	February 2019	OpenAI	1.5[159]	40GB[160] (~10 billion tokens)[161]	28[162]	MIT[163]	Trained on 32 TPUv3 chips for 1 week.[162]
GPT-3	May 2020	OpenAI	175[53]	300 billion tokens[161]	3640[164]	proprietary	A fine-tuned variant of GPT-3, termed GPT-3.5, was made available to the public through a web interface called ChatGPT in 2022.[165]
GPT-Neo	March 2021	EleutherAI	2.7[166]	825 GiB[167]		MIT[168]	The first of a series of free GPT-3 alternatives released by EleutherAI. GPT-Neo outperformed an equivalent-size GPT-3 model on some benchmarks, but was significantly worse than the largest GPT-3.[168]
GPT-J	June 2021	EleutherAI	6[169]	825 GiB[167]	200[170]	Apache 2.0	GPT-3-style language model
Megatron-Turing NLG	October 2021[171]	Microsoft and Nvidia	530[172]	338.6 billion tokens[172]	38000[173]	Restricted web access	Trained for 3 months on over 2000 A100 GPUs on the NVIDIA Selene Supercomputer, for over 3 million GPU-hours.[173]
Ernie 3.0 Titan	December 2021	Baidu	260[174]	4 Tb		Proprietary	Chinese-language LLM. Ernie Bot is based on this model.
Claude[175]	December 2021	Anthropic	52[176]	400 billion tokens[176]		beta	Fine-tuned for desirable behavior in conversations.[177]
GLaM (Generalist Language Model)	December 2021	Google	1200[41]	1.6 trillion tokens[41]	5600[41]	Proprietary	Sparse mixture of experts model, making it more expensive to train but cheaper to run inference compared to GPT-3.
Gopher	December 2021	DeepMind	280[178]	300 billion tokens[179]	5833[180]	Proprietary	Later developed into the Chinchilla model.
LaMDA (Language Models for Dialog Applications)	January 2022	Google	137[181]	1.56T words,[181] 168 billion tokens[179]	4110[182]	Proprietary	Specialized for response generation in conversations.
GPT-NeoX	February 2022	EleutherAI	20[183]	825 GiB[167]	740[170]	Apache 2.0	based on the Megatron architecture
Chinchilla	March 2022	DeepMind	70[184]	1.4 trillion tokens[184][179]	6805[180]	Proprietary	Reduced-parameter model trained on more data. Used in the Sparrow bot. Often cited for its neural scaling law.
PaLM (Pathways Language Model)	April 2022	Google	540[185]	768 billion tokens[184]	29,250[180]	Proprietary	Trained for ~60 days on ~6000 TPU v4 chips.[180] As of October 2024, it is the largest dense Transformer published.
OPT (Open Pretrained Transformer)	May 2022	Meta	175[186]	180 billion tokens[187]	310[170]	Non-commercial research[d]	GPT-3 architecture with some adaptations from Megatron. Uniquely, the training logbook written by the team was published.[188]
YaLM 100B	June 2022	Yandex	100[189]	1.7TB[189]		Apache 2.0	English-Russian model based on Microsoft's Megatron-LM.
Minerva	June 2022	Google	540[190]	38.5B tokens from webpages filtered for mathematical content and from papers submitted to the arXiv preprint server[190]		Proprietary	For solving "mathematical and scientific questions using step-by-step reasoning".[191] Initialized from PaLM models, then finetuned on mathematical and scientific data.
BLOOM	July 2022	Large collaboration led by Hugging Face	175[192]	350 billion tokens (1.6TB)[193]		Responsible AI	Essentially GPT-3 but trained on a multi-lingual corpus (30% English excluding programming languages)
Galactica	November 2022	Meta	120	106 billion tokens[194]	unknown	CC-BY-NC-4.0	Trained on scientific text and modalities.
AlexaTM (Teacher Models)	November 2022	Amazon	20[195]	1.3 trillion[196]		proprietary[197]	bidirectional sequence-to-sequence architecture
Neuro-sama	December 2022	Independent	Unknown	Unknown		privately-owned	A language model designed for live-streaming on Twitch.
LLaMA (Large Language Model Meta AI)	February 2023	Meta AI	65[198]	1.4 trillion[198]	6300[199]	Non-commercial research[e]	Corpus has 20 languages. "Overtrained" (compared to Chinchilla scaling law) for better performance with fewer parameters.[198]
GPT-4	March 2023	OpenAI	Unknown[f] (According to rumors: 1760)[201]	Unknown	Unknown	proprietary	Available for ChatGPT Plus users and used in several products.
Chameleon	June 2024	Meta AI	34[202]	4.4 trillion		
Cerebras-GPT	March 2023	Cerebras	13[203]		270[170]	Apache 2.0	Trained with Chinchilla formula.
Falcon	March 2023	Technology Innovation Institute	40[204]	1 trillion tokens, from RefinedWeb (filtered web text corpus)[205] plus some "curated corpora".[206]	2800[199]	Apache 2.0[207]	
BloombergGPT	March 2023	Bloomberg L.P.	50	363 billion token dataset based on Bloomberg's data sources, plus 345 billion tokens from general purpose datasets[208]		Proprietary	Trained on financial data from proprietary sources, for financial tasks.
PanGu-Σ	March 2023	Huawei	1085	329 billion tokens[209]		Proprietary	
OpenAssistant[210]	March 2023	LAION	17	1.5 trillion tokens		Apache 2.0	Trained on crowdsourced open data
Jurassic-2[211]	March 2023	AI21 Labs	Unknown	Unknown		Proprietary	Multilingual[212]
PaLM 2 (Pathways Language Model 2)	May 2023	Google	340[213]	3.6 trillion tokens[213]	85,000[199]	Proprietary	Was used in Bard chatbot.[214]
Llama 2	July 2023	Meta AI	70[215]	2 trillion tokens[215]	21,000	Llama 2 license	1.7 million A100-hours.[216]
Claude 2	July 2023	Anthropic	Unknown	Unknown	Unknown	Proprietary	Used in Claude chatbot.[217]
Granite 13b	July 2023	IBM	Unknown	Unknown	Unknown	Proprietary	Used in IBM Watsonx.[218]
Mistral 7B	September 2023	Mistral AI	7.3[219]	Unknown		Apache 2.0	
Claude 2.1	November 2023	Anthropic	Unknown	Unknown	Unknown	Proprietary	Used in Claude chatbot. Has a context window of 200,000 tokens, or ~500 pages.[220]
Grok-1[221]	November 2023	xAI	314	Unknown	Unknown	Apache 2.0	Used in Grok chatbot. Grok-1 has a context length of 8,192 tokens and has access to X (Twitter).[222]
Gemini 1.0	December 2023	Google DeepMind	Unknown	Unknown	Unknown	Proprietary	Multimodal model, comes in three sizes. Used in the chatbot of the same name.[223]
Mixtral 8x7B	December 2023	Mistral AI	46.7	Unknown	Unknown	Apache 2.0	Outperforms GPT-3.5 and Llama 2 70B on many benchmarks.[224] Mixture of experts model, with 12.9 billion parameters activated per token.[225]
Mixtral 8x22B	April 2024	Mistral AI	141	Unknown	Unknown	Apache 2.0	[226]
Phi-2	December 2023	Microsoft	2.7	1.4T tokens	419[227]	MIT	Trained on real and synthetic "textbook-quality" data, for 14 days on 96 A100 GPUs.[227]
Gemini 1.5	February 2024	Google DeepMind	Unknown	Unknown	Unknown	Proprietary	Multimodal model, based on a Mixture-of-Experts (MoE) architecture. Context window above 1 million tokens.[228]
Gemini Ultra	February 2024	Google DeepMind	Unknown	Unknown	Unknown		
Gemma	February 2024	Google DeepMind	7	6T tokens	Unknown	Gemma Terms of Use[229]	
Claude 3	March 2024	Anthropic	Unknown	Unknown	Unknown	Proprietary	Includes three models, Haiku, Sonnet, and Opus.[230]
Nova	October 2024	Rubik's AI	Unknown	Unknown	Unknown	Proprietary	Includes three models, Nova-Instant, Nova-Air, and Nova-Pro.
DBRX	March 2024	Databricks and Mosaic ML	136	12T Tokens		Databricks Open Model License	Training cost 10 million USD.
Fugaku-LLM	May 2024	Fujitsu, Tokyo Institute of Technology, etc.	13	380B Tokens			The largest model ever trained on CPU-only, on the Fugaku.[231]
Phi-3	April 2024	Microsoft	14[232]	4.8T Tokens		MIT	Microsoft markets them as "small language model".[233]
Granite Code Models	May 2024	IBM	Unknown	Unknown	Unknown	Apache 2.0	
Qwen2	June 2024	Alibaba Cloud	72[234]	3T Tokens			Multiple sizes, the smallest being 0.5B.
Nemotron-4	June 2024	Nvidia	340	9T Tokens	200,000	NVIDIA Open Model License	Trained for 1 epoch. Trained on 6144 H100 GPUs between December 2023 and May 2024.[235][236]
Llama 3.1	July 2024	Meta AI	405	15.6T tokens	440,000	Llama 3 license	405B version took 31 million hours on H100-80GB, at 3.8E25 FLOPs.[237][238]
See also
Foundation models
Notes
 This is the date that documentation describing the model's architecture was first released.
 In many cases, researchers release or report on multiple versions of a model having different sizes. In these cases, the size of the largest model is listed here.
 This is the license of the pre-trained model weights. In almost all cases the training code itself is open-source or can be easily replicated.
 The smaller models including 66B are publicly available, while the 175B model is available on request.
 Facebook's license and distribution scheme restricted access to approved researchers, but the model weights were leaked and became widely available.
 As stated in Technical report: "Given both the competitive landscape and the safety implications of large-scale models like GPT-4, this report contains no further details about the architecture (including model size), hardware, training compute, dataset construction, training method ..."[200]
References
 "Better Language Models and Their Implications". OpenAI. 2019-02-14. Archived from the original on 2020-12-19. Retrieved 2019-08-25.
 Brown, Tom B.; Mann, Benjamin; Ryder, Nick; Subbiah, Melanie; Kaplan, Jared; Dhariwal, Prafulla; Neelakantan, Arvind; Shyam, Pranav; Sastry, Girish; Askell, Amanda; Agarwal, Sandhini; Herbert-Voss, Ariel; Krueger, Gretchen; Henighan, Tom; Child, Rewon; Ramesh, Aditya; Ziegler, Daniel M.; Wu, Jeffrey; Winter, Clemens; Hesse, Christopher; Chen, Mark; Sigler, Eric; Litwin, Mateusz; Gray, Scott; Chess, Benjamin; Clark, Jack; Berner, Christopher; McCandlish, Sam; Radford, Alec; Sutskever, Ilya; Amodei, Dario (Dec 2020). Larochelle, H.; Ranzato, M.; Hadsell, R.; Balcan, M.F.; Lin, H. (eds.). "Language Models are Few-Shot Learners" (PDF). Advances in Neural Information Processing Systems. 33. Curran Associates, Inc.: 1877–1901. Archived (PDF) from the original on 2023-11-17. Retrieved 2023-03-14.
 Fathallah, Nadeen; Das, Arunav; De Giorgis, Stefano; Poltronieri, Andrea; Haase, Peter; Kovriguina, Liubov (2024-05-26). NeOn-GPT: A Large Language Model-Powered Pipeline for Ontology Learning (PDF). Extended Semantic Web Conference 2024. Hersonissos, Greece.
 Manning, Christopher D. (2022). "Human Language Understanding & Reasoning". Daedalus. 151 (2): 127–138. doi:10.1162/daed_a_01905. S2CID 248377870. Archived from the original on 2023-11-17. Retrieved 2023-03-09.
 Goodman, Joshua (2001-08-09), A Bit of Progress in Language Modeling, arXiv:cs/0108005, Bibcode:2001cs........8005G
 Kilgarriff, Adam; Grefenstette, Gregory (September 2003). "Introduction to the Special Issue on the Web as Corpus". Computational Linguistics. 29 (3): 333–347. doi:10.1162/089120103322711569. ISSN 0891-2017.
 Banko, Michele; Brill, Eric (2001). "Scaling to very very large corpora for natural language disambiguation". Proceedings of the 39th Annual Meeting on Association for Computational Linguistics - ACL '01. Morristown, NJ, USA: Association for Computational Linguistics: 26–33. doi:10.3115/1073012.1073017.
 Resnik, Philip; Smith, Noah A. (September 2003). "The Web as a Parallel Corpus". Computational Linguistics. 29 (3): 349–380. doi:10.1162/089120103322711578. ISSN 0891-2017. Archived from the original on 2024-06-07. Retrieved 2024-06-07.
 Halevy, Alon; Norvig, Peter; Pereira, Fernando (March 2009). "The Unreasonable Effectiveness of Data". IEEE Intelligent Systems. 24 (2): 8–12. doi:10.1109/MIS.2009.36. ISSN 1541-1672.
 Chen, Leiyu; Li, Shaobo; Bai, Qiang; Yang, Jing; Jiang, Sanlong; Miao, Yanming (2021). "Review of Image Classification Algorithms Based on Convolutional Neural Networks". Remote Sensing. 13 (22): 4712. Bibcode:2021RemS...13.4712C. doi:10.3390/rs13224712.
 Vaswani, Ashish; Shazeer, Noam; Parmar, Niki; Uszkoreit, Jakob; Jones, Llion; Gomez, Aidan N; Kaiser, Łukasz; Polosukhin, Illia (2017). "Attention is All you Need" (PDF). Advances in Neural Information Processing Systems. 30. Curran Associates, Inc. Archived (PDF) from the original on 2024-02-21. Retrieved 2024-01-21.
 Bahdanau, Dzmitry; Cho, Kyunghyun; Bengio, Yoshua (2014). "Neural Machine Translation by Jointly Learning to Align and Translate". arXiv:1409.0473 [cs.CL].
 Rogers, Anna; Kovaleva, Olga; Rumshisky, Anna (2020). "A Primer in BERTology: What We Know About How BERT Works". Transactions of the Association for Computational Linguistics. 8: 842–866. arXiv:2002.12327. doi:10.1162/tacl_a_00349. S2CID 211532403. Archived from the original on 2022-04-03. Retrieved 2024-01-21.
 Movva, Rajiv; Balachandar, Sidhika; Peng, Kenny; Agostini, Gabriel; Garg, Nikhil; Pierson, Emma (2024). "Topics, Authors, and Institutions in Large Language Model Research: Trends from 17K arXiv Papers". Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (Volume 1: Long Papers). pp. 1223–1243. arXiv:2307.10700. doi:10.18653/v1/2024.naacl-long.67. Retrieved 2024-12-08.
 Hern, Alex (14 February 2019). "New AI fake text generator may be too dangerous to release, say creators". The Guardian. Archived from the original on 14 February 2019. Retrieved 20 January 2024.
 "ChatGPT a year on: 3 ways the AI chatbot has completely changed the world in 12 months". Euronews. November 30, 2023. Archived from the original on January 14, 2024. Retrieved January 20, 2024.
 Heaven, Will (March 14, 2023). "GPT-4 is bigger and better than ChatGPT—but OpenAI won't say why". MIT Technology Review. Archived from the original on March 17, 2023. Retrieved January 20, 2024.
 Movva, Rajiv; Balachandar, Sidhika; Peng, Kenny; Agostini, Gabriel; Garg, Nikhil; Pierson, Emma (2024). "Topics, Authors, and Institutions in Large Language Model Research: Trends from 17K arXiv Papers". Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (Volume 1: Long Papers). pp. 1223–1243. arXiv:2307.10700. doi:10.18653/v1/2024.naacl-long.67. Retrieved 2024-12-08.
 "Parameters in notable artificial intelligence systems". ourworldindata.org. November 30, 2023. Retrieved January 20, 2024.
 "LMSYS Chatbot Arena Leaderboard". huggingface.co. Archived from the original on June 10, 2024. Retrieved June 12, 2024.
 Peng, Bo; et al. (2023). "RWKV: Reinventing RNNS for the Transformer Era". arXiv:2305.13048 [cs.CL].
 Merritt, Rick (2022-03-25). "What Is a Transformer Model?". NVIDIA Blog. Archived from the original on 2023-11-17. Retrieved 2023-07-25.
 Gu, Albert; Dao, Tri (2023-12-01), Mamba: Linear-Time Sequence Modeling with Selective State Spaces, arXiv:2312.00752
 Kaushal, Ayush; Mahowald, Kyle (2022-06-06), What do tokens know about their characters and how do they know it?, arXiv:2206.02608
 Yennie Jun (2023-05-03). "All languages are NOT created (tokenized) equal". Language models cost much more in some languages than others. Archived from the original on 2023-08-17. Retrieved 2023-08-17. In other words, to express the same sentiment, some languages require up to 10 times more tokens.
 Petrov, Aleksandar; Malfa, Emanuele La; Torr, Philip; Bibi, Adel (June 23, 2023). "Language Model Tokenizers Introduce Unfairness Between Languages". NeurIPS. arXiv:2305.15425. Archived from the original on December 15, 2023. Retrieved September 16, 2023 – via openreview.net.
 "OpenAI API". platform.openai.com. Archived from the original on April 23, 2023. Retrieved 2023-04-30.
 Paaß, Gerhard; Giesselbach, Sven (2022). "Pre-trained Language Models". Foundation Models for Natural Language Processing. Artificial Intelligence: Foundations, Theory, and Algorithms. pp. 19–78. doi:10.1007/978-3-031-23190-2_2. ISBN 9783031231902. Archived from the original on 3 August 2023. Retrieved 3 August 2023.
 Petrov, Aleksandar; Emanuele La Malfa; Torr, Philip H. S.; Bibi, Adel (2023). "Language Model Tokenizers Introduce Unfairness Between Languages". arXiv:2305.15425 [cs.CL].
 Lundberg, Scott (2023-12-12). "The Art of Prompt Design: Prompt Boundaries and Token Healing". Medium. Retrieved 2024-08-05.
 Dodge, Jesse; Sap, Maarten; Marasović, Ana; Agnew, William; Ilharco, Gabriel; Groeneveld, Dirk; Mitchell, Margaret; Gardner, Matt (2021). "Documenting Large Webtext Corpora: A Case Study on the Colossal Clean Crawled Corpus". arXiv:2104.08758 [cs.CL].
 Lee, Katherine; Ippolito, Daphne; Nystrom, Andrew; Zhang, Chiyuan; Eck, Douglas; Callison-Burch, Chris; Carlini, Nicholas (May 2022). "Deduplicating Training Data Makes Language Models Better" (PDF). Proceedings of the 60th Annual Meeting of the Association for Computational Linguistics. 1: Long Papers: 8424–8445. doi:10.18653/v1/2022.acl-long.577.
 Li, Yuanzhi; Bubeck, Sébastien; Eldan, Ronen; Del Giorno, Allie; Gunasekar, Suriya; Lee, Yin Tat (2023-09-11), Textbooks Are All You Need II: phi-1.5 technical report, arXiv:2309.05463
 Lin, Zhenghao; Gou, Zhibin; Gong, Yeyun; Liu, Xiao; Shen, Yelong; Xu, Ruochen; Lin, Chen; Yang, Yujiu; Jiao, Jian (2024-04-11). "Rho-1: Not All Tokens Are What You Need". arXiv:2404.07965 [cs.CL].
 Brown, Tom B.; et al. (2020). "Language Models are Few-Shot Learners". arXiv:2005.14165 [cs.CL].
 Abdin, Marah; Jacobs, Sam Ade; Awan, Ammar Ahmad; Aneja, Jyoti; Awadallah, Ahmed; Awadalla, Hany; Bach, Nguyen; Bahree, Amit; Bakhtiari, Arash (2024-04-23). "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone". arXiv:2404.14219 [cs.CL].
 Ouyang, Long; Wu, Jeff; Jiang, Xu; Almeida, Diogo; Wainwright, Carroll L.; Mishkin, Pamela; Zhang, Chong; Agarwal, Sandhini; Slama, Katarina; Ray, Alex; Schulman, John; Hilton, Jacob; Kelton, Fraser; Miller, Luke; Simens, Maddie; Askell, Amanda; Welinder, Peter; Christiano, Paul; Leike, Jan; Lowe, Ryan (2022). "Training language models to follow instructions with human feedback". arXiv:2203.02155 [cs.CL].
 Wang, Yizhong; Kordi, Yeganeh; Mishra, Swaroop; Liu, Alisa; Smith, Noah A.; Khashabi, Daniel; Hajishirzi, Hannaneh (2022). "Self-Instruct: Aligning Language Model with Self Generated Instructions". arXiv:2212.10560 [cs.CL].
 Shazeer, Noam; Mirhoseini, Azalia; Maziarz, Krzysztof; Davis, Andy; Le, Quoc; Hinton, Geoffrey; Dean, Jeff (2017-01-01). "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer". arXiv:1701.06538 [cs.LG].
 Lepikhin, Dmitry; Lee, HyoukJoong; Xu, Yuanzhong; Chen, Dehao; Firat, Orhan; Huang, Yanping; Krikun, Maxim; Shazeer, Noam; Chen, Zhifeng (2021-01-12). "GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding". arXiv:2006.16668 [cs.CL].
 Dai, Andrew M; Du, Nan (December 9, 2021). "More Efficient In-Context Learning with GLaM". ai.googleblog.com. Archived from the original on 2023-03-12. Retrieved 2023-03-09.
 Wei, Jason; Tay, Yi; Bommasani, Rishi; Raffel, Colin; Zoph, Barret; Borgeaud, Sebastian; Yogatama, Dani; Bosma, Maarten; Zhou, Denny; Metzler, Donald; Chi, Ed H.; Hashimoto, Tatsunori; Vinyals, Oriol; Liang, Percy; Dean, Jeff; Fedus, William (31 August 2022). "Emergent Abilities of Large Language Models". Transactions on Machine Learning Research. ISSN 2835-8856. Archived from the original on 22 March 2023. Retrieved 19 March 2023.
 Allamar, Jay. "Illustrated transformer". Archived from the original on 2023-07-25. Retrieved 2023-07-29.
 Allamar, Jay. "The Illustrated GPT-2 (Visualizing Transformer Language Models)". Retrieved 2023-08-01.
 "Our next-generation model: Gemini 1.5". Google. 15 February 2024. Archived from the original on 18 February 2024. Retrieved 18 February 2024.
 "Long context prompting for Claude 2.1". December 6, 2023. Archived from the original on August 27, 2024. Retrieved January 20, 2024.
 "Rate limits". openai.com. Archived from the original on February 2, 2024. Retrieved January 20, 2024.
 Zaib, Munazza; Sheng, Quan Z.; Emma Zhang, Wei (4 February 2020). "A Short Survey of Pre-trained Language Models for Conversational AI-A New Age in NLP". Proceedings of the Australasian Computer Science Week Multiconference. pp. 1–4. arXiv:2104.10810. doi:10.1145/3373017.3373028. ISBN 9781450376976. S2CID 211040895.
 Jurafsky, Dan; Martin, James H. (7 January 2023). Speech and Language Processing (PDF) (3rd edition draft ed.). Archived (PDF) from the original on 23 March 2023. Retrieved 24 May 2022.
 "From bare metal to a 70B model: infrastructure set-up and scripts". imbue.com. Archived from the original on 2024-07-26. Retrieved 2024-07-24.
 "metaseq/projects/OPT/chronicles at main · facebookresearch/metaseq". GitHub. Archived from the original on 2024-01-24. Retrieved 2024-07-24.
 Albrecht, Josh (2024-07-23). "State of the Art: Training >70B LLMs on 10,000 H100 clusters". www.latent.space. Retrieved 2024-07-24.
 Wiggers, Kyle (28 April 2022). "The emerging types of language models and why they matter". TechCrunch. Archived from the original on 16 March 2023. Retrieved 9 March 2023.
 Sharir, Or; Peleg, Barak; Shoham, Yoav (2020). "The Cost of Training NLP Models: A Concise Overview". arXiv:2004.08900 [cs.CL].
 Biderman, Stella; Schoelkopf, Hailey; Anthony, Quentin; Bradley, Herbie; Khan, Mohammad Aflah; Purohit, Shivanshu; Prashanth, USVSN Sai (April 2023). "Pythia: A Suite for Analyzing Large Language Models Across Training and Scaling". arXiv:2304.01373 [cs.CL].
 Maslej, Nestor; Fattorini, Loredana; Brynjolfsson, Erik; Etchemendy, John; Ligett, Katrina; Lyons, Terah; Manyika, James; Ngo, Helen; Niebles, Juan Carlos (2023-10-05), Artificial Intelligence Index Report 2023, arXiv:2310.03715
 Section 2.1 and Table 1, Kaplan, Jared; McCandlish, Sam; Henighan, Tom; Brown, Tom B.; Chess, Benjamin; Child, Rewon; Gray, Scott; Radford, Alec; Wu, Jeffrey; Amodei, Dario (2020). "Scaling Laws for Neural Language Models". arXiv:2001.08361 [cs.LG].
 Gao, Luyu; Madaan, Aman; Zhou, Shuyan; Alon, Uri; Liu, Pengfei; Yang, Yiming; Callan, Jamie; Neubig, Graham (2022-11-01). "PAL: Program-aided Language Models". arXiv:2211.10435 [cs.CL].
 "PAL: Program-aided Language Models". reasonwithpal.com. Archived from the original on 2023-06-12. Retrieved 2023-06-12.
 Paranjape, Bhargavi; Lundberg, Scott; Singh, Sameer; Hajishirzi, Hannaneh; Zettlemoyer, Luke; Tulio Ribeiro, Marco (2023-03-01). "ART: Automatic multi-step reasoning and tool-use for large language models". arXiv:2303.09014 [cs.CL].
 Liang, Yaobo; Wu, Chenfei; Song, Ting; Wu, Wenshan; Xia, Yan; Liu, Yu; Ou, Yang; Lu, Shuai; Ji, Lei; Mao, Shaoguang; Wang, Yun; Shou, Linjun; Gong, Ming; Duan, Nan (2023-03-01). "TaskMatrix.AI: Completing Tasks by Connecting Foundation Models with Millions of APIs". arXiv:2303.16434 [cs.AI].
 Patil, Shishir G.; Zhang, Tianjun; Wang, Xin; Gonzalez, Joseph E. (2023-05-01). "Gorilla: Large Language Model Connected with Massive APIs". arXiv:2305.15334 [cs.CL].
 Lewis, Patrick; Perez, Ethan; Piktus, Aleksandra; Petroni, Fabio; Karpukhin, Vladimir; Goyal, Naman; Küttler, Heinrich; Lewis, Mike; Yih, Wen-tau; Rocktäschel, Tim; Riedel, Sebastian; Kiela, Douwe (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks". Advances in Neural Information Processing Systems. 33. Curran Associates, Inc.: 9459–9474. arXiv:2005.11401. Archived from the original on 2023-06-12. Retrieved 2023-06-12.
 "The Growth Behind LLM-based Autonomous Agents". KDnuggets. October 23, 2023.
 Yao, Shunyu; Zhao, Jeffrey; Yu, Dian; Du, Nan; Shafran, Izhak; Narasimhan, Karthik; Cao, Yuan (2022-10-01). "ReAct: Synergizing Reasoning and Acting in Language Models". arXiv:2210.03629 [cs.CL].
 Wu, Yue; Prabhumoye, Shrimai; Min, So Yeon (24 May 2023). "SPRING: GPT-4 Out-performs RL Algorithms by Studying Papers and Reasoning". arXiv:2305.15486 [cs.AI].
 Wang, Zihao; Cai, Shaofei; Liu, Anji; Ma, Xiaojian; Liang, Yitao (2023-02-03). "Describe, Explain, Plan and Select: Interactive Planning with Large Language Models Enables Open-World Multi-Task Agents". arXiv:2302.01560 [cs.AI].
 Shinn, Noah; Cassano, Federico; Labash, Beck; Gopinath, Ashwin; Narasimhan, Karthik; Yao, Shunyu (2023-03-01). "Reflexion: Language Agents with Verbal Reinforcement Learning". arXiv:2303.11366 [cs.AI].
 Hao, Shibo; Gu, Yi; Ma, Haodi; Jiahua Hong, Joshua; Wang, Zhen; Zhe Wang, Daisy; Hu, Zhiting (2023-05-01). "Reasoning with Language Model is Planning with World Model". arXiv:2305.14992 [cs.CL].
 Zhang, Jenny; Lehman, Joel; Stanley, Kenneth; Clune, Jeff (2 June 2023). "OMNI: Open-endedness via Models of human Notions of Interestingness". arXiv:2306.01711 [cs.AI].
 "Voyager | An Open-Ended Embodied Agent with Large Language Models". voyager.minedojo.org. Archived from the original on 2023-06-08. Retrieved 2023-06-09.
 Park, Joon Sung; O'Brien, Joseph C.; Cai, Carrie J.; Ringel Morris, Meredith; Liang, Percy; Bernstein, Michael S. (2023-04-01). "Generative Agents: Interactive Simulacra of Human Behavior". arXiv:2304.03442 [cs.HC].
 Mann, Tobias. "How to run an LLM locally on your PC in less than 10 minutes". www.theregister.com. Retrieved 2024-05-17.
 Nagel, Markus; Amjad, Rana Ali; Baalen, Mart Van; Louizos, Christos; Blankevoort, Tijmen (2020-11-21). "Up or Down? Adaptive Rounding for Post-Training Quantization". Proceedings of the 37th International Conference on Machine Learning. PMLR: 7197–7206. Archived from the original on 2023-06-14. Retrieved 2023-06-14.
 Polino, Antonio; Pascanu, Razvan; Alistarh, Dan (2018-02-01). "Model compression via distillation and quantization". arXiv:1802.05668 [cs.NE].
 Frantar, Elias; Ashkboos, Saleh; Hoefler, Torsten; Alistarh, Dan (2022-10-01). "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers". arXiv:2210.17323 [cs.LG].
 Dettmers, Tim; Svirschevski, Ruslan; Egiazarian, Vage; Kuznedelev, Denis; Frantar, Elias; Ashkboos, Saleh; Borzunov, Alexander; Hoefler, Torsten; Alistarh, Dan (2023-06-01). "SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression". arXiv:2306.03078 [cs.CL].
 Grootendorst, Maarten. "A Visual Guide to Quantization". newsletter.maartengrootendorst.com. Archived from the original on 31 Jul 2024. Retrieved 2024-07-31.
 Dettmers, Tim; Pagnoni, Artidoro; Holtzman, Ari; Zettlemoyer, Luke (2023-05-01). "QLoRA: Efficient Finetuning of Quantized LLMs". arXiv:2305.14314 [cs.LG].
 Kiros, Ryan; Salakhutdinov, Ruslan; Zemel, Rich (2014-06-18). "Multimodal Neural Language Models". Proceedings of the 31st International Conference on Machine Learning. PMLR: 595–603. Archived from the original on 2023-07-02. Retrieved 2023-07-02.
 Krizhevsky, Alex; Sutskever, Ilya; Hinton, Geoffrey E (2012). "ImageNet Classification with Deep Convolutional Neural Networks". Advances in Neural Information Processing Systems. 25. Curran Associates, Inc. Archived from the original on 2023-07-02. Retrieved 2023-07-02.
 Antol, Stanislaw; Agrawal, Aishwarya; Lu, Jiasen; Mitchell, Margaret; Batra, Dhruv; Zitnick, C. Lawrence; Parikh, Devi (2015). "VQA: Visual Question Answering". ICCV: 2425–2433. Archived from the original on 2023-07-02. Retrieved 2023-07-02.
 Li, Junnan; Li, Dongxu; Savarese, Silvio; Hoi, Steven (2023-01-01). "BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models". arXiv:2301.12597 [cs.CV].
 Alayrac, Jean-Baptiste; Donahue, Jeff; Luc, Pauline; Miech, Antoine; Barr, Iain; Hasson, Yana; Lenc, Karel; Mensch, Arthur; Millican, Katherine; Reynolds, Malcolm; Ring, Roman; Rutherford, Eliza; Cabi, Serkan; Han, Tengda; Gong, Zhitao (2022-12-06). "Flamingo: a Visual Language Model for Few-Shot Learning". Advances in Neural Information Processing Systems. 35: 23716–23736. arXiv:2204.14198. Archived from the original on 2023-07-02. Retrieved 2023-07-02.
 Driess, Danny; Xia, Fei; Sajjadi, Mehdi S. M.; Lynch, Corey; Chowdhery, Aakanksha; Ichter, Brian; Wahid, Ayzaan; Tompson, Jonathan; Vuong, Quan; Yu, Tianhe; Huang, Wenlong; Chebotar, Yevgen; Sermanet, Pierre; Duckworth, Daniel; Levine, Sergey (2023-03-01). "PaLM-E: An Embodied Multimodal Language Model". arXiv:2303.03378 [cs.LG].
 Liu, Haotian; Li, Chunyuan; Wu, Qingyang; Lee, Yong Jae (2023-04-01). "Visual Instruction Tuning". arXiv:2304.08485 [cs.CV].
 Zhang, Hang; Li, Xin; Bing, Lidong (2023-06-01). "Video-LLaMA: An Instruction-tuned Audio-Visual Language Model for Video Understanding". arXiv:2306.02858 [cs.CL].
 OpenAI (2023-03-27). "GPT-4 Technical Report". arXiv:2303.08774 [cs.CL].
 OpenAI (September 25, 2023). "GPT-4V(ision) System Card" (PDF).
 Pichai, Sundar (10 May 2023), Google Keynote (Google I/O '23), timestamp 15:31, retrieved 2023-07-02
 Wiggers, Kyle (11 September 2024). "Mistral releases Pixtral 12B, its first multimodal model". TechCrunch. Retrieved 14 September 2024.
 Hoffmann, Jordan; Borgeaud, Sebastian; Mensch, Arthur; Buchatskaya, Elena; Cai, Trevor; Rutherford, Eliza; Casas, Diego de Las; Hendricks, Lisa Anne; Welbl, Johannes; Clark, Aidan; Hennigan, Tom; Noland, Eric; Millican, Katie; Driessche, George van den; Damoc, Bogdan (2022-03-29). "Training Compute-Optimal Large Language Models". arXiv:2203.15556 [cs.CL].
 Caballero, Ethan; Gupta, Kshitij; Rish, Irina; Krueger, David (2022). "Broken Neural Scaling Laws". arXiv:2210.14891 [cs.LG].
 "137 emergent abilities of large language models". Jason Wei. Retrieved 2023-06-24.
 Bowman, Samuel R. (2023). "Eight Things to Know about Large Language Models". arXiv:2304.00612 [cs.CL].
 Mukherjee, Anirban; Chang, Hannah (2024). "Heuristic Reasoning in AI: Instrumental Use and Mimetic Absorption". arXiv:2403.09404 [cs.AI].
 Hahn, Michael; Goyal, Navin (2023-03-14). "A Theory of Emergent In-Context Learning as Implicit Structure Induction". arXiv:2303.07971 [cs.LG].
 Pilehvar, Mohammad Taher; Camacho-Collados, Jose (June 2019). "Proceedings of the 2019 Conference of the North". Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers). Minneapolis, Minnesota: Association for Computational Linguistics: 1267–1273. doi:10.18653/v1/N19-1128. S2CID 102353817. Archived from the original on 2023-06-27. Retrieved 2023-06-27.
 "WiC: The Word-in-Context Dataset". pilehvar.github.io. Archived from the original on 2023-06-27. Retrieved 2023-06-27.
 Patel, Roma; Pavlick, Ellie (2021-10-06). "Mapping Language Models to Grounded Conceptual Spaces". ICLR. Archived from the original on 2023-06-24. Retrieved 2023-06-27.
 A Closer Look at Large Language Models Emergent Abilities Archived 2023-06-24 at the Wayback Machine (Yao Fu, Nov 20, 2022)
 Ornes, Stephen (March 16, 2023). "The Unpredictable Abilities Emerging From Large AI Models". Quanta Magazine. Archived from the original on March 16, 2023. Retrieved March 16, 2023.
 Schaeffer, Rylan; Miranda, Brando; Koyejo, Sanmi (2023-04-01). "Are Emergent Abilities of Large Language Models a Mirage?". arXiv:2304.15004 [cs.AI].
 Li, Kenneth; Hopkins, Aspen K.; Bau, David; Viégas, Fernanda; Pfister, Hanspeter; Wattenberg, Martin (2022-10-01). "Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task". arXiv:2210.13382 [cs.LG].
 "Large Language Model: world models or surface statistics?". The Gradient. 2023-01-21. Retrieved 2023-06-12.
 Jin, Charles; Rinard, Martin (2023-05-01). "Evidence of Meaning in Language Models Trained on Programs". arXiv:2305.11169 [cs.LG].
 Nanda, Neel; Chan, Lawrence; Lieberum, Tom; Smith, Jess; Steinhardt, Jacob (2023-01-01). "Progress measures for grokking via mechanistic interpretability". arXiv:2301.05217 [cs.LG].
 Mitchell, Melanie; Krakauer, David C. (28 March 2023). "The debate over understanding in AI's large language models". Proceedings of the National Academy of Sciences. 120 (13): e2215907120. arXiv:2210.13966. Bibcode:2023PNAS..12015907M. doi:10.1073/pnas.2215907120. PMC 10068812. PMID 36943882.
 Metz, Cade (16 May 2023). "Microsoft Says New A.I. Shows Signs of Human Reasoning". The New York Times.
 Bubeck, Sébastien; Chandrasekaran, Varun; Eldan, Ronen; Gehrke, Johannes; Horvitz, Eric; Kamar, Ece; Lee, Peter; Lee, Yin Tat; Li, Yuanzhi; Lundberg, Scott; Nori, Harsha; Palangi, Hamid; Ribeiro, Marco Tulio; Zhang, Yi (2023). "Sparks of Artificial General Intelligence: Early experiments with GPT-4". arXiv:2303.12712 [cs.CL].
 "Anthropic CEO Dario Amodei pens a smart look at our AI future". Fast Company. October 17, 2024.
 "ChatGPT is more like an 'alien intelligence' than a human brain, says futurist". ZDNET. 2023. Archived from the original on 12 June 2023. Retrieved 12 June 2023.
 Newport, Cal (13 April 2023). "What Kind of Mind Does ChatGPT Have?". The New Yorker. Archived from the original on 12 June 2023. Retrieved 12 June 2023.
 Roose, Kevin (30 May 2023). "Why an Octopus-like Creature Has Come to Symbolize the State of A.I." The New York Times. Archived from the original on 30 May 2023. Retrieved 12 June 2023.
 "The A to Z of Artificial Intelligence". Time Magazine. 13 April 2023. Archived from the original on 16 June 2023. Retrieved 12 June 2023.
 Ji, Ziwei; Lee, Nayeon; Frieske, Rita; Yu, Tiezheng; Su, Dan; Xu, Yan; Ishii, Etsuko; Bang, Yejin; Dai, Wenliang; Madotto, Andrea; Fung, Pascale (November 2022). "Survey of Hallucination in Natural Language Generation" (pdf). ACM Computing Surveys. 55 (12). Association for Computing Machinery: 1–38. arXiv:2202.03629. doi:10.1145/3571730. S2CID 246652372. Archived from the original on 26 March 2023. Retrieved 15 January 2023.
 Varshney, Neeraj; Yao, Wenlin; Zhang, Hongming; Chen, Jianshu; Yu, Dong (2023). "A Stitch in Time Saves Nine: Detecting and Mitigating Hallucinations of LLMs by Validating Low-Confidence Generation". arXiv:2307.03987 [cs.CL].
 Lakoff, George (1999). Philosophy in the Flesh: The Embodied Mind and Its Challenge to Western Philosophy; Appendix: The Neural Theory of Language Paradigm. New York Basic Books. pp. 569–583. ISBN 978-0-465-05674-3.
 Evans, Vyvyan. (2014). The Language Myth. Cambridge University Press. ISBN 978-1-107-04396-1.
 Friston, Karl J. (2022). Active Inference: The Free Energy Principle in Mind, Brain, and Behavior; Chapter 4 The Generative Models of Active Inference. The MIT Press. ISBN 978-0-262-36997-8.
 Huyen, Chip (October 18, 2019). "Evaluation Metrics for Language Modeling". The Gradient. Retrieved January 14, 2024.
 Clark, Christopher; Lee, Kenton; Chang, Ming-Wei; Kwiatkowski, Tom; Collins, Michael; Toutanova, Kristina (2019). "BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions". arXiv:1905.10044 [cs.CL].
 Wayne Xin Zhao; Zhou, Kun; Li, Junyi; Tang, Tianyi; Wang, Xiaolei; Hou, Yupeng; Min, Yingqian; Zhang, Beichen; Zhang, Junjie; Dong, Zican; Du, Yifan; Yang, Chen; Chen, Yushuo; Chen, Zhipeng; Jiang, Jinhao; Ren, Ruiyang; Li, Yifan; Tang, Xinyu; Liu, Zikang; Liu, Peiyu; Nie, Jian-Yun; Wen, Ji-Rong (2023). "A Survey of Large Language Models". arXiv:2303.18223 [cs.CL].
 openai/simple-evals, OpenAI, 2024-05-28, retrieved 2024-05-28
 openai/evals, OpenAI, 2024-05-28, archived from the original on 2024-05-08, retrieved 2024-05-28
 "Sanitized open-source datasets for natural language and code understanding: how we evaluated our 70B model". imbue.com. Archived from the original on 2024-07-26. Retrieved 2024-07-24.
 Srivastava, Aarohi; et al. (2022). "Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models". arXiv:2206.04615 [cs.CL].
 Lin, Stephanie; Hilton, Jacob; Evans, Owain (2021). "TruthfulQA: Measuring How Models Mimic Human Falsehoods". arXiv:2109.07958 [cs.CL].
 Zellers, Rowan; Holtzman, Ari; Bisk, Yonatan; Farhadi, Ali; Choi, Yejin (2019). "HellaSwag: Can a Machine Really Finish Your Sentence?". arXiv:1905.07830 [cs.CL].
 "Prepare for truly useful large language models". Nature Biomedical Engineering. 7 (2): 85–86. 7 March 2023. doi:10.1038/s41551-023-01012-6. PMID 36882584. S2CID 257403466.
 "Your job is (probably) safe from artificial intelligence". The Economist. 7 May 2023. Archived from the original on 17 June 2023. Retrieved 18 June 2023.
 "Generative AI Could Raise Global GDP by 7%". Goldman Sachs. Archived from the original on 18 June 2023. Retrieved 18 June 2023.
 Peng, Zhencan; Wang, Zhizhi; Deng, Dong (13 June 2023). "Near-Duplicate Sequence Search at Scale for Large Language Model Memorization Evaluation" (PDF). Proceedings of the ACM on Management of Data. 1 (2): 1–18. doi:10.1145/3589324. S2CID 259213212. Archived (PDF) from the original on 2024-08-27. Retrieved 2024-01-20. Citing Lee et al 2022.
 Peng, Wang & Deng 2023, p. 8.
 Alba, Davey (1 May 2023). "AI chatbots have been used to create dozens of news content farms". The Japan Times. Retrieved 18 June 2023.
 "Could chatbots help devise the next pandemic virus?". Science. 14 June 2023. doi:10.1126/science.adj2463. Archived from the original on 18 June 2023. Retrieved 18 June 2023.
 Stephen Council (1 Dec 2023). "How Googlers cracked an SF rival's tech model with a single word". SFGATE. Archived from the original on 16 December 2023.
 Hubinger, Evan (10 January 2024). "Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training". arXiv:2401.05566 [cs.CR].
 Kang, Daniel (2023). "Exploiting programmatic behavior of LLMs: Dual-use through standard security attacks". arXiv:2302.05733 [cs.CR].
 Wang, Yongge (20 June 2024). "Encryption Based Covert Channel for Large Language Models" (PDF). IACR ePrint 2024/586. Archived (PDF) from the original on 24 June 2024. Retrieved 24 June 2024.
 Stokel-Walker, Chris (November 22, 2023). "ChatGPT Replicates Gender Bias in Recommendation Letters". Scientific American. Archived from the original on 2023-12-29. Retrieved 2023-12-29.
 Luo, Queenie; Puett, Michael J.; Smith, Michael D. (2023-03-28). "A Perspectival Mirror of the Elephant: Investigating Language Bias on Google, ChatGPT, Wikipedia, and YouTube". arXiv:2303.16281v2 [cs.CY].
 Cheng, Myra; Durmus, Esin; Jurafsky, Dan (2023-05-29), Marked Personas: Using Natural Language Prompts to Measure Stereotypes in Language Models, arXiv:2305.18189
 Kotek, Hadas; Dockum, Rikker; Sun, David (2023-11-05). "Gender bias and stereotypes in Large Language Models". Proceedings of the ACM Collective Intelligence Conference. CI '23. New York, NY, USA: Association for Computing Machinery. pp. 12–24. doi:10.1145/3582269.3615599. ISBN 979-8-4007-0113-9.
 Heikkilä, Melissa (August 7, 2023). "AI language models are rife with different political biases". MIT Technology Review. Retrieved 2023-12-29.
 "Improving language understanding with unsupervised learning". openai.com. June 11, 2018. Archived from the original on 2023-03-18. Retrieved 2023-03-18.
 "finetune-transformer-lm". GitHub. Archived from the original on 19 May 2023. Retrieved 2 January 2024.
 Devlin, Jacob; Chang, Ming-Wei; Lee, Kenton; Toutanova, Kristina (11 October 2018). "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding". arXiv:1810.04805v2 [cs.CL].
 Prickett, Nicole Hemsoth (2021-08-24). "Cerebras Shifts Architecture To Meet Massive AI/ML Models". The Next Platform. Archived from the original on 2023-06-20. Retrieved 2023-06-20.
 "BERT". March 13, 2023. Archived from the original on January 13, 2021. Retrieved March 13, 2023 – via GitHub.
 Patel, Ajay; Li, Bryan; Rasooli, Mohammad Sadegh; Constant, Noah; Raffel, Colin; Callison-Burch, Chris (2022). "Bidirectional Language Models Are Also Few-shot Learners". arXiv:2209.14500 [cs.LG].
 Devlin, Jacob; Chang, Ming-Wei; Lee, Kenton; Toutanova, Kristina (11 October 2018). "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding". arXiv:1810.04805v2 [cs.CL].
 Raffel, Colin; Shazeer, Noam; Roberts, Adam; Lee, Katherine; Narang, Sharan; Matena, Michael; Zhou, Yanqi; Li, Wei; Liu, Peter J. (2020). "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer". Journal of Machine Learning Research. 21 (140): 1–67. arXiv:1910.10683. ISSN 1533-7928.
 google-research/text-to-text-transfer-transformer, Google Research, 2024-04-02, archived from the original on 2024-03-29, retrieved 2024-04-04
 "Imagen: Text-to-Image Diffusion Models". imagen.research.google. Archived from the original on 2024-03-27. Retrieved 2024-04-04.
 "Pretrained models — transformers 2.0.0 documentation". huggingface.co. Archived from the original on 2024-08-05. Retrieved 2024-08-05.
 "xlnet". GitHub. Archived from the original on 2 January 2024. Retrieved 2 January 2024.
 Yang, Zhilin; Dai, Zihang; Yang, Yiming; Carbonell, Jaime; Salakhutdinov, Ruslan; Le, Quoc V. (2 January 2020). "XLNet: Generalized Autoregressive Pretraining for Language Understanding". arXiv:1906.08237 [cs.CL].
 "GPT-2: 1.5B Release". OpenAI. 2019-11-05. Archived from the original on 2019-11-14. Retrieved 2019-11-14.
 "Better language models and their implications". openai.com. Archived from the original on 2023-03-16. Retrieved 2023-03-13.
 "OpenAI's GPT-3 Language Model: A Technical Overview". lambdalabs.com. 3 June 2020. Archived from the original on 27 March 2023. Retrieved 13 March 2023.
 "openai-community/gpt2-xl · Hugging Face". huggingface.co. Archived from the original on 2024-07-24. Retrieved 2024-07-24.
 "gpt-2". GitHub. Archived from the original on 11 March 2023. Retrieved 13 March 2023.
 Table D.1 in Brown, Tom B.; Mann, Benjamin; Ryder, Nick; Subbiah, Melanie; Kaplan, Jared; Dhariwal, Prafulla; Neelakantan, Arvind; Shyam, Pranav; Sastry, Girish; Askell, Amanda; Agarwal, Sandhini; Herbert-Voss, Ariel; Krueger, Gretchen; Henighan, Tom; Child, Rewon; Ramesh, Aditya; Ziegler, Daniel M.; Wu, Jeffrey; Winter, Clemens; Hesse, Christopher; Chen, Mark; Sigler, Eric; Litwin, Mateusz; Gray, Scott; Chess, Benjamin; Clark, Jack; Berner, Christopher; McCandlish, Sam; Radford, Alec; Sutskever, Ilya; Amodei, Dario (May 28, 2020). "Language Models are Few-Shot Learners". arXiv:2005.14165v4 [cs.CL].
 "ChatGPT: Optimizing Language Models for Dialogue". OpenAI. 2022-11-30. Archived from the original on 2022-11-30. Retrieved 2023-01-13.
 "GPT Neo". March 15, 2023. Archived from the original on March 12, 2023. Retrieved March 12, 2023 – via GitHub.
 Gao, Leo; Biderman, Stella; Black, Sid; Golding, Laurence; Hoppe, Travis; Foster, Charles; Phang, Jason; He, Horace; Thite, Anish; Nabeshima, Noa; Presser, Shawn; Leahy, Connor (31 December 2020). "The Pile: An 800GB Dataset of Diverse Text for Language Modeling". arXiv:2101.00027 [cs.CL].
 Iyer, Abhishek (15 May 2021). "GPT-3's free alternative GPT-Neo is something to be excited about". VentureBeat. Archived from the original on 9 March 2023. Retrieved 13 March 2023.
 "GPT-J-6B: An Introduction to the Largest Open Source GPT Model | Forefront". www.forefront.ai. Archived from the original on 2023-03-09. Retrieved 2023-02-28.
 Dey, Nolan; Gosal, Gurpreet; Zhiming; Chen; Khachane, Hemant; Marshall, William; Pathria, Ribhu; Tom, Marvin; Hestness, Joel (2023-04-01). "Cerebras-GPT: Open Compute-Optimal Language Models Trained on the Cerebras Wafer-Scale Cluster". arXiv:2304.03208 [cs.LG].
 Alvi, Ali; Kharya, Paresh (11 October 2021). "Using DeepSpeed and Megatron to Train Megatron-Turing NLG 530B, the World's Largest and Most Powerful Generative Language Model". Microsoft Research. Archived from the original on 13 March 2023. Retrieved 13 March 2023.
 Smith, Shaden; Patwary, Mostofa; Norick, Brandon; LeGresley, Patrick; Rajbhandari, Samyam; Casper, Jared; Liu, Zhun; Prabhumoye, Shrimai; Zerveas, George; Korthikanti, Vijay; Zhang, Elton; Child, Rewon; Aminabadi, Reza Yazdani; Bernauer, Julie; Song, Xia (2022-02-04). "Using DeepSpeed and Megatron to Train Megatron-Turing NLG 530B, A Large-Scale Generative Language Model". arXiv:2201.11990 [cs.CL].
 Rajbhandari, Samyam; Li, Conglong; Yao, Zhewei; Zhang, Minjia; Aminabadi, Reza Yazdani; Awan, Ammar Ahmad; Rasley, Jeff; He, Yuxiong (2022-07-21), DeepSpeed-MoE: Advancing Mixture-of-Experts Inference and Training to Power Next-Generation AI Scale, arXiv:2201.05596
 Wang, Shuohuan; Sun, Yu; Xiang, Yang; Wu, Zhihua; Ding, Siyu; Gong, Weibao; Feng, Shikun; Shang, Junyuan; Zhao, Yanbin; Pang, Chao; Liu, Jiaxiang; Chen, Xuyi; Lu, Yuxiang; Liu, Weixin; Wang, Xi; Bai, Yangfan; Chen, Qiuliang; Zhao, Li; Li, Shiyong; Sun, Peng; Yu, Dianhai; Ma, Yanjun; Tian, Hao; Wu, Hua; Wu, Tian; Zeng, Wei; Li, Ge; Gao, Wen; Wang, Haifeng (December 23, 2021). "ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation". arXiv:2112.12731 [cs.CL].
 "Product". Anthropic. Archived from the original on 16 March 2023. Retrieved 14 March 2023.
 Askell, Amanda; Bai, Yuntao; Chen, Anna; et al. (9 December 2021). "A General Language Assistant as a Laboratory for Alignment". arXiv:2112.00861 [cs.CL].
 Bai, Yuntao; Kadavath, Saurav; Kundu, Sandipan; et al. (15 December 2022). "Constitutional AI: Harmlessness from AI Feedback". arXiv:2212.08073 [cs.CL].
 "Language modelling at scale: Gopher, ethical considerations, and retrieval". www.deepmind.com. 8 December 2021. Archived from the original on 20 March 2023. Retrieved 20 March 2023.
 Hoffmann, Jordan; Borgeaud, Sebastian; Mensch, Arthur; et al. (29 March 2022). "Training Compute-Optimal Large Language Models". arXiv:2203.15556 [cs.CL].
 Table 20 and page 66 of PaLM: Scaling Language Modeling with Pathways Archived 2023-06-10 at the Wayback Machine
 Cheng, Heng-Tze; Thoppilan, Romal (January 21, 2022). "LaMDA: Towards Safe, Grounded, and High-Quality Dialog Models for Everything". ai.googleblog.com. Archived from the original on 2022-03-25. Retrieved 2023-03-09.
 Thoppilan, Romal; De Freitas, Daniel; Hall, Jamie; Shazeer, Noam; Kulshreshtha, Apoorv; Cheng, Heng-Tze; Jin, Alicia; Bos, Taylor; Baker, Leslie; Du, Yu; Li, YaGuang; Lee, Hongrae; Zheng, Huaixiu Steven; Ghafouri, Amin; Menegali, Marcelo (2022-01-01). "LaMDA: Language Models for Dialog Applications". arXiv:2201.08239 [cs.CL].
 Black, Sidney; Biderman, Stella; Hallahan, Eric; et al. (2022-05-01). GPT-NeoX-20B: An Open-Source Autoregressive Language Model. Proceedings of BigScience Episode #5 – Workshop on Challenges & Perspectives in Creating Large Language Models. Vol. Proceedings of BigScience Episode #5 – Workshop on Challenges & Perspectives in Creating Large Language Models. pp. 95–136. Archived from the original on 2022-12-10. Retrieved 2022-12-19.
 Hoffmann, Jordan; Borgeaud, Sebastian; Mensch, Arthur; Sifre, Laurent (12 April 2022). "An empirical analysis of compute-optimal large language model training". Deepmind Blog. Archived from the original on 13 April 2022. Retrieved 9 March 2023.
 Narang, Sharan; Chowdhery, Aakanksha (April 4, 2022). "Pathways Language Model (PaLM): Scaling to 540 Billion Parameters for Breakthrough Performance". ai.googleblog.com. Archived from the original on 2022-04-04. Retrieved 2023-03-09.
 Susan Zhang; Mona Diab; Luke Zettlemoyer. "Democratizing access to large-scale language models with OPT-175B". ai.facebook.com. Archived from the original on 2023-03-12. Retrieved 2023-03-12.
 Zhang, Susan; Roller, Stephen; Goyal, Naman; Artetxe, Mikel; Chen, Moya; Chen, Shuohui; Dewan, Christopher; Diab, Mona; Li, Xian; Lin, Xi Victoria; Mihaylov, Todor; Ott, Myle; Shleifer, Sam; Shuster, Kurt; Simig, Daniel; Koura, Punit Singh; Sridhar, Anjali; Wang, Tianlu; Zettlemoyer, Luke (21 June 2022). "OPT: Open Pre-trained Transformer Language Models". arXiv:2205.01068 [cs.CL].
 "metaseq/projects/OPT/chronicles at main · facebookresearch/metaseq". GitHub. Retrieved 2024-10-18.
 Khrushchev, Mikhail; Vasilev, Ruslan; Petrov, Alexey; Zinov, Nikolay (2022-06-22), YaLM 100B, archived from the original on 2023-06-16, retrieved 2023-03-18
 Lewkowycz, Aitor; Andreassen, Anders; Dohan, David; Dyer, Ethan; Michalewski, Henryk; Ramasesh, Vinay; Slone, Ambrose; Anil, Cem; Schlag, Imanol; Gutman-Solo, Theo; Wu, Yuhuai; Neyshabur, Behnam; Gur-Ari, Guy; Misra, Vedant (30 June 2022). "Solving Quantitative Reasoning Problems with Language Models". arXiv:2206.14858 [cs.CL].
 "Minerva: Solving Quantitative Reasoning Problems with Language Models". ai.googleblog.com. 30 June 2022. Retrieved 20 March 2023.
 Ananthaswamy, Anil (8 March 2023). "In AI, is bigger always better?". Nature. 615 (7951): 202–205. Bibcode:2023Natur.615..202A. doi:10.1038/d41586-023-00641-w. PMID 36890378. S2CID 257380916. Archived from the original on 16 March 2023. Retrieved 9 March 2023.
 "bigscience/bloom · Hugging Face". huggingface.co. Archived from the original on 2023-04-12. Retrieved 2023-03-13.
 Taylor, Ross; Kardas, Marcin; Cucurull, Guillem; Scialom, Thomas; Hartshorn, Anthony; Saravia, Elvis; Poulton, Andrew; Kerkez, Viktor; Stojnic, Robert (16 November 2022). "Galactica: A Large Language Model for Science". arXiv:2211.09085 [cs.CL].
 "20B-parameter Alexa model sets new marks in few-shot learning". Amazon Science. 2 August 2022. Archived from the original on 15 March 2023. Retrieved 12 March 2023.
 Soltan, Saleh; Ananthakrishnan, Shankar; FitzGerald, Jack; et al. (3 August 2022). "AlexaTM 20B: Few-Shot Learning Using a Large-Scale Multilingual Seq2Seq Model". arXiv:2208.01448 [cs.CL].
 "AlexaTM 20B is now available in Amazon SageMaker JumpStart | AWS Machine Learning Blog". aws.amazon.com. 17 November 2022. Archived from the original on 13 March 2023. Retrieved 13 March 2023.
 "Introducing LLaMA: A foundational, 65-billion-parameter large language model". Meta AI. 24 February 2023. Archived from the original on 3 March 2023. Retrieved 9 March 2023.
 "The Falcon has landed in the Hugging Face ecosystem". huggingface.co. Archived from the original on 2023-06-20. Retrieved 2023-06-20.
 "GPT-4 Technical Report" (PDF). OpenAI. 2023. Archived (PDF) from the original on March 14, 2023. Retrieved March 14, 2023.
 Schreiner, Maximilian (2023-07-11). "GPT-4 architecture, datasets, costs and more leaked". THE DECODER. Archived from the original on 2023-07-12. Retrieved 2024-07-26.
 Dickson, Ben (22 May 2024). "Meta introduces Chameleon, a state-of-the-art multimodal model". VentureBeat.
 Dey, Nolan (March 28, 2023). "Cerebras-GPT: A Family of Open, Compute-efficient, Large Language Models". Cerebras. Archived from the original on March 28, 2023. Retrieved March 28, 2023.
 "Abu Dhabi-based TII launches its own version of ChatGPT". tii.ae. Archived from the original on 2023-04-03. Retrieved 2023-04-03.
 Penedo, Guilherme; Malartic, Quentin; Hesslow, Daniel; Cojocaru, Ruxandra; Cappelli, Alessandro; Alobeidli, Hamza; Pannier, Baptiste; Almazrouei, Ebtesam; Launay, Julien (2023-06-01). "The RefinedWeb Dataset for Falcon LLM: Outperforming Curated Corpora with Web Data, and Web Data Only". arXiv:2306.01116 [cs.CL].
 "tiiuae/falcon-40b · Hugging Face". huggingface.co. 2023-06-09. Retrieved 2023-06-20.
 UAE's Falcon 40B, World's Top-Ranked AI Model from Technology Innovation Institute, is Now Royalty-Free Archived 2024-02-08 at the Wayback Machine, 31 May 2023
 Wu, Shijie; Irsoy, Ozan; Lu, Steven; Dabravolski, Vadim; Dredze, Mark; Gehrmann, Sebastian; Kambadur, Prabhanjan; Rosenberg, David; Mann, Gideon (March 30, 2023). "BloombergGPT: A Large Language Model for Finance". arXiv:2303.17564 [cs.LG].
 Ren, Xiaozhe; Zhou, Pingyi; Meng, Xinfan; Huang, Xinjing; Wang, Yadao; Wang, Weichao; Li, Pengfei; Zhang, Xiaoda; Podolskiy, Alexander; Arshinov, Grigory; Bout, Andrey; Piontkovskaya, Irina; Wei, Jiansheng; Jiang, Xin; Su, Teng; Liu, Qun; Yao, Jun (March 19, 2023). "PanGu-Σ: Towards Trillion Parameter Language Model with Sparse Heterogeneous Computing". arXiv:2303.10845 [cs.CL].
 Köpf, Andreas; Kilcher, Yannic; von Rütte, Dimitri; Anagnostidis, Sotiris; Tam, Zhi-Rui; Stevens, Keith; Barhoum, Abdullah; Duc, Nguyen Minh; Stanley, Oliver; Nagyfi, Richárd; ES, Shahul; Suri, Sameer; Glushkov, David; Dantuluri, Arnav; Maguire, Andrew (2023-04-14). "OpenAssistant Conversations – Democratizing Large Language Model Alignment". arXiv:2304.07327 [cs.CL].
 Wrobel, Sharon. "Tel Aviv startup rolls out new advanced AI language model to rival OpenAI". www.timesofisrael.com. Archived from the original on 2023-07-24. Retrieved 2023-07-24.
 Wiggers, Kyle (2023-04-13). "With Bedrock, Amazon enters the generative AI race". TechCrunch. Archived from the original on 2023-07-24. Retrieved 2023-07-24.
 Elias, Jennifer (16 May 2023). "Google's newest A.I. model uses nearly five times more text data for training than its predecessor". CNBC. Archived from the original on 16 May 2023. Retrieved 18 May 2023.
 "Introducing PaLM 2". Google. May 10, 2023. Archived from the original on May 18, 2023. Retrieved May 18, 2023.
 "Introducing Llama 2: The Next Generation of Our Open Source Large Language Model". Meta AI. 2023. Archived from the original on 2024-01-05. Retrieved 2023-07-19.
 "llama/MODEL_CARD.md at main · meta-llama/llama". GitHub. Archived from the original on 2024-05-28. Retrieved 2024-05-28.
 "Claude 2". anthropic.com. Archived from the original on 15 December 2023. Retrieved 12 December 2023.
 Nirmal, Dinesh (2023-09-07). "Building AI for business: IBM's Granite foundation models". IBM Blog. Archived from the original on 2024-07-22. Retrieved 2024-08-11.
 "Announcing Mistral 7B". Mistral. 2023. Archived from the original on 2024-01-06. Retrieved 2023-10-06.
 "Introducing Claude 2.1". anthropic.com. Archived from the original on 15 December 2023. Retrieved 12 December 2023.
 xai-org/grok-1, xai-org, 2024-03-19, archived from the original on 2024-05-28, retrieved 2024-03-19
 "Grok-1 model card". x.ai. Retrieved 12 December 2023.
 "Gemini – Google DeepMind". deepmind.google. Archived from the original on 8 December 2023. Retrieved 12 December 2023.
 Franzen, Carl (11 December 2023). "Mistral shocks AI community as latest open source model eclipses GPT-3.5 performance". VentureBeat. Archived from the original on 11 December 2023. Retrieved 12 December 2023.
 "Mixtral of experts". mistral.ai. 11 December 2023. Archived from the original on 13 February 2024. Retrieved 12 December 2023.
 AI, Mistral (2024-04-17). "Cheaper, Better, Faster, Stronger". mistral.ai. Archived from the original on 2024-05-05. Retrieved 2024-05-05.
 Hughes, Alyssa (12 December 2023). "Phi-2: The surprising power of small language models". Microsoft Research. Archived from the original on 12 December 2023. Retrieved 13 December 2023.
 "Our next-generation model: Gemini 1.5". Google. 15 February 2024. Archived from the original on 16 February 2024. Retrieved 16 February 2024. This means 1.5 Pro can process vast amounts of information in one go — including 1 hour of video, 11 hours of audio, codebases with over 30,000 lines of code or over 700,000 words. In our research, we've also successfully tested up to 10 million tokens.
 "Gemma" – via GitHub.
 "Introducing the next generation of Claude". www.anthropic.com. Archived from the original on 2024-03-04. Retrieved 2024-03-04.
 "Fugaku-LLM/Fugaku-LLM-13B · Hugging Face". huggingface.co. Archived from the original on 2024-05-17. Retrieved 2024-05-17.
 "Phi-3". azure.microsoft.com. 23 April 2024. Archived from the original on 2024-04-27. Retrieved 2024-04-28.
 "Phi-3 Model Documentation". huggingface.co. Archived from the original on 2024-05-13. Retrieved 2024-04-28.
 "Qwen2". GitHub. Archived from the original on 2024-06-17. Retrieved 2024-06-17.
 "nvidia/Nemotron-4-340B-Base · Hugging Face". huggingface.co. 2024-06-14. Archived from the original on 2024-06-15. Retrieved 2024-06-15.
 "Nemotron-4 340B | Research". research.nvidia.com. Archived from the original on 2024-06-15. Retrieved 2024-06-15.
 "The Llama 3 Herd of Models" (July 23, 2024) Llama Team, AI @ Meta
 "llama-models/models/llama3_1/MODEL_CARD.md at main · meta-llama/llama-models". GitHub. Archived from the original on 2024-07-23. Retrieved 2024-07-23.


Further reading
Jurafsky, Dan, Martin, James. H. Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition, 3rd Edition draft, 2023.
Zhao, Wayne Xin; et al. (2023). "A Survey of Large Language Models". arXiv:2303.18223 [cs.CL].
Kaddour, Jean; et al. (2023). "Challenges and Applications of Large Language Models". arXiv:2307.10169 [cs.CL].
Yin, Shukang; Fu, Chaoyou; Zhao, Sirui; Li, Ke; Sun, Xing; Xu, Tong; Chen, Enhong (2024). "A Survey on Multimodal Large Language Models". National Science Review. arXiv:2306.13549. doi:10.1093/nsr/nwae403.
"AI Index Report 2024 – Artificial Intelligence Index". aiindex.stanford.edu. Retrieved 2024-05-05.
Frank, Michael C. (27 June 2023). "Baby steps in evaluating the capacities of large language models". Nature Reviews Psychology. 2 (8): 451–452. doi:10.1038/s44159-023-00211-x. ISSN 2731-0574. S2CID 259713140. Retrieved 2 July 2023.
vte
Natural language processing
vte
Artificial intelligence
Categories: Large language modelsDeep learningNatural language processing
This page was last edited on 14 December 2024, at 01:56 (UTC).
Text is available under the Creative Commons Attribution-ShareAlike 4.0 License; additional terms may apply. By using this site, you agree to the Terms of Use and Privacy Policy. Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc., a non-profit organization.
Privacy policyAbout WikipediaDisclaimersContact WikipediaCode of ConductDevelopersStatisticsCookie statementMobile view
Wikimedia FoundationPowered by MediaWiki
`;

export const testSelection = `History[edit]\n\nThe training compute of notable large models in FLOPs vs publication date over the period 2010-2024. For overall notable models (top left), frontier models (top right), top language models (bottom left) and top models within leading companies (bottom right). The majority of these models are language models.\n\nThe training compute of notable large AI models in FLOPs vs publication date over the period 2017-2024. The majority of large models are language models or multimodal models with language capacity.\nBefore 2017, there were a few language models that were large as compared to capacities then available. In the 1990s, the IBM alignment models pioneered statistical language modelling. A smoothed n-gram model in 2001 trained on 0.3 billion words achieved state-of-the-art perplexity at the time.[5] In the 2000s, as Internet use became prevalent, some researchers constructed Internet-scale language datasets ("web as corpus"[6]), upon which they trained statistical language models.[7][8] In 2009, in most language processing tasks, statistical language models dominated over symbolic language models, as they can usefully ingest large datasets.[9]\n\nAfter neural networks became dominant in image processing around 2012,[10] they were applied to language modelling as well. Google converted its translation service to Neural Machine Translation in 2016. As it was before transformers, it was done by seq2seq deep LSTM networks.\n\n\nAn illustration of main components of the transformer model from the original paper, where layers were normalized after (instead of before) multiheaded attention\nAt the 2017 NeurIPS conference, Google researchers introduced the transformer architecture in their landmark paper "Attention Is All You Need". This paper's goal was to improve upon 2014 seq2seq technology,[11] and was based mainly on the attention mechanism developed by Bahdanau et al. in 2014.[12] The following year in 2018, BERT was introduced and quickly became "ubiquitous".[13] Though the original transformer has both encoder and decoder blocks, BERT is an encoder-only model. Academic and research usage of BERT began to decline in 2023, following rapid improvements in the abilities of decoder-only models (such as GPT) to solve tasks via prompting.[14]\n\n`;
