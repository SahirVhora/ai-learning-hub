// ============================================
// LEARNING DATA FOR AI LEARNING HUB
// ============================================

const learningData = {
    beginner: {
        title: "Beginner's Journey",
        subtitle: "Build your foundation in AI, step by step",
        topics: [
            {
                id: "b1",
                icon: "🤖",
                title: "What is AI?",
                description: "Understanding artificial intelligence fundamentals and real-world applications",
                level: "Beginner",
                duration: "15 min",
                communityAvg: 62,
                content: {
                    overview: "Artificial Intelligence (AI) is the simulation of human intelligence by machines. It's about creating systems that can think, learn, and solve problems like humans do.",
                    keyPoints: [
                        "AI mimics human cognitive functions like learning and reasoning",
                        "Includes machine learning, natural language processing, and computer vision",
                        "Powers everyday tools like voice assistants, recommendations, and search",
                        "Different from traditional programming - learns from data instead of fixed rules"
                    ],
                    resources: [
                        { type: "Video", name: "AI Explained Simply - Crash Course", url: "https://www.youtube.com/results?search_query=artificial+intelligence+crash+course", provider: "YouTube" },
                        { type: "Article", name: "What is AI? - MIT Tech Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/", provider: "MIT" },
                        { type: "Interactive", name: "Google AI Experiments", url: "https://labs.google/experiments/", provider: "Google" },
                        { type: "Read", name: "AI on Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", provider: "Wikipedia" }
                    ],
                    quiz: [
                        { question: "Which test, proposed by Alan Turing in 1950, measures whether a machine exhibits intelligent behaviour?", options: ["The Turing Test", "The Dartmouth Test", "The AlphaGo Test", "The Deep Blue Test"], correct: 0, explanation: "Alan Turing proposed the Turing Test in 1950 as a measure of machine intelligence." },
                        { question: "In what year was the term 'Artificial Intelligence' officially coined?", options: ["1945", "1956", "1965", "1972"], correct: 1, explanation: "The term was coined at the Dartmouth Conference in 1956." },
                        { question: "Which of these is a key characteristic of AI?", options: ["Follows only fixed rules", "Learns and adapts from data", "Requires no computational power", "Cannot process language"], correct: 1, explanation: "AI systems learn and adapt from data rather than following only fixed rules." },
                        { question: "What everyday technology is powered by AI?", options: ["A manual typewriter", "A mechanical clock", "Voice assistants and search engines", "A printed dictionary"], correct: 2, explanation: "Voice assistants, recommendation systems, and search engines are everyday AI applications." }
                    ],
                    history: [
                        { year: "1950", event: "Alan Turing proposes the 'Turing Test' to measure machine intelligence" },
                        { year: "1956", event: "The term 'Artificial Intelligence' coined at Dartmouth Conference" },
                        { year: "1997", event: "IBM's Deep Blue defeats world chess champion Garry Kasparov" },
                        { year: "2016", event: "AlphaGo defeats world Go champion Lee Sedol" }
                    ]
                }
            },
            {
                id: "b2",
                icon: "🧠",
                title: "Machine Learning Basics",
                description: "How computers learn from data without explicit programming",
                level: "Beginner",
                duration: "20 min",
                communityAvg: 58,
                content: {
                    overview: "Machine Learning (ML) is a subset of AI where computers learn patterns from data. Instead of following strict rules, they improve their performance through experience.",
                    keyPoints: [
                        "Learns from examples and patterns in data",
                        "Three main types: Supervised, Unsupervised, and Reinforcement Learning",
                        "Powers spam filters, image recognition, and recommendation systems",
                        "Requires quality data to produce quality results"
                    ],
                    resources: [
                        { type: "Course", name: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", provider: "Google" },
                        { type: "Video", name: "ML for Beginners", url: "https://www.youtube.com/results?search_query=machine+learning+for+beginners", provider: "YouTube" },
                        { type: "Interactive", name: "Teachable Machine", url: "https://teachablemachine.withgoogle.com/", provider: "Google" },
                        { type: "Read", name: "ML Basics on Wikipedia", url: "https://en.wikipedia.org/wiki/Machine_learning", provider: "Wikipedia" }
                    ],
                    quiz: [
                        { question: "Who coined the term 'Machine Learning'?", options: ["Geoffrey Hinton", "Arthur Samuel", "Alan Turing", "Yann LeCun"], correct: 1, explanation: "Arthur Samuel coined the term 'Machine Learning' in 1959." },
                        { question: "What are the three main types of Machine Learning?", options: ["Binary, Ternary, Quaternary", "Supervised, Unsupervised, Reinforcement", "Static, Dynamic, Hybrid", "Linear, Non-linear, Random"], correct: 1, explanation: "The three main types are Supervised, Unsupervised, and Reinforcement Learning." },
                        { question: "Which everyday technology is powered by machine learning?", options: ["A wooden ruler", "A mechanical stopwatch", "Spam filters and recommendation systems", "A paper notebook"], correct: 2, explanation: "Spam filters, image recognition, and recommendation systems are common ML applications." },
                        { question: "What is a key requirement for effective machine learning?", options: ["No data needed", "Quality data", "Human intervention for every prediction", "A physical robot"], correct: 1, explanation: "ML requires quality data to produce quality results — the model learns patterns from the data." }
                    ],
                    history: [
                        { year: "1959", event: "Arthur Samuel coins the term 'Machine Learning'" },
                        { year: "1967", event: "Nearest Neighbor algorithm created for pattern recognition" },
                        { year: "2012", event: "Deep learning achieves breakthrough in image recognition (ImageNet)" }
                    ]
                }
            },
            {
                id: "b3",
                icon: "💬",
                title: "Large Language Models (LLMs)",
                description: "AI models that understand and generate human-like text",
                level: "Beginner",
                duration: "18 min",
                communityAvg: 64,
                content: {
                    overview: "Large Language Models are AI systems trained on vast amounts of text to understand and generate human-like language. They power chatbots, translation, and content creation.",
                    keyPoints: [
                        "Trained on billions of words from books, websites, and articles",
                        "Can understand context and generate coherent responses",
                        "Examples: ChatGPT, Claude, Gemini, LLaMA",
                        "Use transformer architecture for processing text"
                    ],
                    resources: [
                        { type: "Video", name: "How LLMs Work", url: "https://www.youtube.com/results?search_query=how+large+language+models+work", provider: "YouTube" },
                        { type: "Article", name: "Introduction to LLMs", url: "https://www.anthropic.com/", provider: "Anthropic" },
                        { type: "Tool", name: "Try Claude", url: "https://claude.ai", provider: "Anthropic" },
                        { type: "Read", name: "LLMs Explained", url: "https://en.wikipedia.org/wiki/Large_language_model", provider: "Wikipedia" }
                    ],
                    quiz: [
                        { question: "What architecture do most modern LLMs use?", options: ["Recurrent Neural Networks (RNNs)", "Transformers", "Convolutional Neural Networks (CNNs)", "Decision Trees"], correct: 1, explanation: "Modern LLMs are built on the Transformer architecture, introduced in 2017." },
                        { question: "How many parameters did GPT-3 have?", options: ["17.5 billion", "175 billion", "1.75 trillion", "1.75 billion"], correct: 1, explanation: "GPT-3 had 175 billion parameters, demonstrating unprecedented language capabilities." },
                        { question: "What is a Large Language Model trained on?", options: ["Only code repositories", "Vast amounts of text from books, websites, and articles", "Hand-written grammar rules only", "Mathematical equations exclusively"], correct: 1, explanation: "LLMs are trained on billions of words from books, websites, and articles." },
                        { question: "Which of the following is NOT an example of an LLM?", options: ["ChatGPT", "Claude", "GPT-4", "Microsoft Excel"], correct: 3, explanation: "Microsoft Excel is a spreadsheet application, not an LLM." }
                    ],
                    history: [
                        { year: "2017", event: "Transformer architecture introduced in 'Attention is All You Need' paper" },
                        { year: "2018", event: "BERT revolutionizes natural language understanding" },
                        { year: "2020", event: "GPT-3 demonstrates unprecedented language capabilities with 175B parameters" },
                        { year: "2022", event: "ChatGPT launches and achieves mainstream adoption" }
                    ]
                }
            },
            {
                id: "b4",
                icon: "🤝",
                title: "AI Agents",
                description: "AI systems that can take actions and make decisions autonomously",
                level: "Beginner",
                duration: "16 min",
                communityAvg: 60,
                content: {
                    overview: "AI agents are autonomous systems that perceive their environment, make decisions, and take actions to achieve specific goals. They can operate independently with minimal human intervention.",
                    keyPoints: [
                        "Can perceive, reason, and act in their environment",
                        "Examples: virtual assistants, game AI, robotics, autonomous vehicles",
                        "Use sensors to gather information and actuators to take action",
                        "Can learn and improve from experience"
                    ],
                    resources: [
                        { type: "Video", name: "AI Agents Explained", url: "https://www.youtube.com/results?search_query=ai+agents+explained", provider: "YouTube" },
                        { type: "Article", name: "What are AI Agents?", url: "https://www.ibm.com/think/topics/ai-agents", provider: "IBM" },
                        { type: "Tutorial", name: "Building Your First Agent", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/", provider: "LangGraph" },
                        { type: "Read", name: "Intelligent Agents", url: "https://en.wikipedia.org/wiki/Intelligent_agent", provider: "Wikipedia" }
                    ],
                    quiz: [
                        { question: "What is an AI agent's defining capability?", options: ["Only follow fixed scripts", "Perceive, reason, and act autonomously", "Store data without processing", "Require constant human input"], correct: 1, explanation: "AI agents can perceive their environment, reason about it, and take actions autonomously." },
                        { question: "Which of these is an example of an AI agent?", options: ["A static webpage", "A printed map", "A virtual assistant or autonomous vehicle", "A mechanical pencil"], correct: 2, explanation: "Virtual assistants, game AI, robotics, and autonomous vehicles are all examples of AI agents." },
                        { question: "How do AI agents gather information about their environment?", options: ["Through sensors", "Through telepathy", "Through guesswork", "Through paper reports only"], correct: 0, explanation: "Agents use sensors to gather information and actuators to take action in their environment." },
                        { question: "Can AI agents improve over time?", options: ["No, they are static", "Only with hardware upgrades", "Yes, they can learn from experience", "Only if reprogrammed manually"], correct: 2, explanation: "AI agents can learn and improve from experience, especially when using reinforcement learning." }
                    ],
                    history: [
                        { year: "1950s", event: "Early AI research focuses on problem-solving agents" },
                        { year: "1990s", event: "Agent-based modeling becomes popular in research" },
                        { year: "2010s", event: "Reinforcement learning enables complex agent behaviors" }
                    ]
                }
            },
            {
                id: "b5",
                icon: "🔧",
                title: "Popular AI Tools",
                description: "Hands-on introduction to widely-used AI platforms and frameworks",
                level: "Beginner",
                duration: "22 min",
                communityAvg: 56,
                content: {
                    overview: "Explore beginner-friendly AI tools that let you experiment with machine learning, natural language processing, and computer vision without extensive coding.",
                    keyPoints: [
                        "No-code/low-code platforms perfect for beginners",
                        "Cloud-based services for easy access",
                        "Pre-trained models you can use immediately",
                        "Active communities for learning and support"
                    ],
                    resources: [
                        { type: "Tool", name: "Hugging Face - Pre-trained Models", url: "https://huggingface.co/", provider: "Hugging Face" },
                        { type: "Tool", name: "Google Colab - Free Notebooks", url: "https://colab.research.google.com/", provider: "Google" },
                        { type: "Tool", name: "Replicate - Run AI Models", url: "https://replicate.com/", provider: "Replicate" },
                        { type: "Course", name: "AI Tools Overview on Kaggle", url: "https://www.kaggle.com/learn", provider: "Kaggle" }
                    ],
                    quiz: [
                        { question: "Which platform hosts a large collection of pre-trained AI models?", options: ["Hugging Face", "Snapchat", "LinkedIn", "TikTok"], correct: 0, explanation: "Hugging Face is the leading platform for sharing and using pre-trained AI models." },
                        { question: "What is Google Colab best known for?", options: ["Social networking", "Free cloud-based Jupyter notebooks for ML experiments", "Email hosting", "Video streaming"], correct: 1, explanation: "Google Colab provides free cloud-based Jupyter notebooks perfect for ML and AI experiments." },
                        { question: "When was TensorFlow released as open source?", options: ["2013", "2015", "2017", "2019"], correct: 1, explanation: "TensorFlow was released as open source by Google in 2015." },
                        { question: "What does 'no-code/low-code' mean in AI tools?", options: ["Tools that require advanced programming", "Tools designed for users with little or no coding experience", "Tools that only run on supercomputers", "Tools that generate no output"], correct: 1, explanation: "No-code/low-code platforms allow users to experiment with AI without extensive coding knowledge." }
                    ],
                    history: [
                        { year: "2015", event: "TensorFlow released as open source by Google" },
                        { year: "2016", event: "PyTorch introduced by Facebook AI Research" },
                        { year: "2022", event: "Explosion of user-friendly AI tools for non-developers" }
                    ]
                }
            }
        ]
    },
    intermediate: {
        title: "Intermediate Explorer",
        subtitle: "Deepen your knowledge and build practical skills",
        topics: [
            {
                id: "i1",
                icon: "🏗️",
                title: "Neural Networks & Deep Learning",
                description: "Understanding the architecture that powers modern AI",
                level: "Intermediate",
                duration: "30 min",
                communityAvg: 52,
                content: {
                    overview: "Neural networks are computing systems inspired by biological brains. Deep learning uses multi-layered neural networks to learn complex patterns from data.",
                    keyPoints: [
                        "Composed of layers of interconnected nodes (neurons)",
                        "Learn through backpropagation and gradient descent",
                        "CNNs for images, RNNs/LSTMs for sequences, Transformers for language",
                        "Require significant computational resources and data"
                    ],
                    resources: [
                        { type: "Course", name: "Deep Learning Specialization", url: "https://www.deeplearning.ai/", provider: "DeepLearning.AI" },
                        { type: "Book", name: "Neural Networks from Scratch", url: "https://nnfs.io/", provider: "NNFS" },
                        { type: "Interactive", name: "TensorFlow Playground", url: "https://playground.tensorflow.org/", provider: "TensorFlow" },
                        { type: "Video", name: "3Blue1Brown Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", provider: "YouTube" }
                    ],
                    quiz: [
                        { question: "What is the basic building block of a neural network?", options: ["A transistor", "A neuron (node)", "A pixel", "A database row"], correct: 1, explanation: "Neural networks are composed of layers of interconnected nodes (neurons)." },
                        { question: "Which algorithm is used to train neural networks by adjusting weights?", options: ["Binary search", "Backpropagation and gradient descent", "Bubble sort", "Dijkstra's algorithm"], correct: 1, explanation: "Neural networks learn through backpropagation and gradient descent to adjust weights." },
                        { question: "What type of neural network is best suited for image processing?", options: ["Recurrent Neural Network (RNN)", "Convolutional Neural Network (CNN)", "Transformer", "Decision Tree"], correct: 1, explanation: "CNNs are specifically designed for image processing and computer vision tasks." },
                        { question: "In what year did AlexNet win the ImageNet competition, sparking the deep learning revolution?", options: ["2008", "2010", "2012", "2015"], correct: 2, explanation: "AlexNet's victory in the 2012 ImageNet competition demonstrated the power of deep CNNs." }
                    ],
                    history: [
                        { year: "1943", event: "McCulloch-Pitts neuron model proposed" },
                        { year: "1986", event: "Backpropagation algorithm popularized" },
                        { year: "2012", event: "AlexNet wins ImageNet competition using deep CNNs" },
                        { year: "2017", event: "Transformer architecture revolutionizes NLP" }
                    ]
                }
            },
            {
                id: "i2",
                icon: "🔄",
                title: "Transformer Architecture",
                description: "The breakthrough technology behind modern LLMs",
                level: "Intermediate",
                duration: "35 min",
                communityAvg: 50,
                content: {
                    overview: "Transformers use self-attention mechanisms to process sequential data in parallel, enabling the creation of powerful language models. They're the foundation of GPT, BERT, and Claude.",
                    keyPoints: [
                        "Self-attention allows modeling long-range dependencies",
                        "Processes entire sequences simultaneously (not sequentially)",
                        "Encoder-decoder or decoder-only architectures",
                        "Scaled up to billions of parameters for modern LLMs"
                    ],
                    resources: [
                        { type: "Paper", name: "Attention is All You Need", url: "https://arxiv.org/abs/1706.03762", provider: "arXiv" },
                        { type: "Video", name: "Transformers Explained", url: "https://www.youtube.com/results?search_query=transformer+architecture+explained", provider: "YouTube" },
                        { type: "Article", name: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", provider: "Jay Alammar" },
                        { type: "Code", name: "Transformer from Scratch", url: "https://github.com/topics/transformer", provider: "GitHub" }
                    ],
                    quiz: [
                        { question: "What key mechanism allows Transformers to model long-range dependencies?", options: ["Recurrent loops", "Self-attention", "Convolutional filters", "Bayesian inference"], correct: 1, explanation: "Self-attention is the core mechanism that lets Transformers model relationships between distant tokens." },
                        { question: "How do Transformers process sequences compared to RNNs?", options: ["Sequentially, one token at a time", "In parallel across the entire sequence", "Only the first half of the sequence", "Randomly selected tokens"], correct: 1, explanation: "Unlike RNNs, Transformers process entire sequences simultaneously, enabling massive parallelization." },
                        { question: "In what year was the Transformer architecture introduced?", options: ["2015", "2016", "2017", "2018"], correct: 2, explanation: "The Transformer was introduced in the seminal 2017 paper 'Attention is All You Need'." },
                        { question: "Which models are built on the Transformer architecture?", options: ["Only GPT", "Only BERT", "GPT, BERT, and Claude", "Random Forests"], correct: 2, explanation: "GPT, BERT, Claude, and most modern LLMs are all built on the Transformer architecture." }
                    ],
                    history: [
                        { year: "2017", event: "Transformer introduced by Google researchers" },
                        { year: "2018", event: "BERT and GPT demonstrate transformer power" },
                        { year: "2020", event: "GPT-3's 175B parameters show scaling benefits" }
                    ]
                }
            },
            {
                id: "i3",
                icon: "🔗",
                title: "Prompt Engineering",
                description: "Crafting effective instructions to get the best results from AI",
                level: "Intermediate",
                duration: "25 min",
                communityAvg: 54,
                content: {
                    overview: "Prompt engineering is the practice of designing inputs to guide AI models toward desired outputs. It's essential for working effectively with LLMs.",
                    keyPoints: [
                        "Clear, specific prompts yield better results",
                        "Techniques: few-shot learning, chain-of-thought, role-playing",
                        "Context and examples improve model understanding",
                        "Iterative refinement is key to optimization"
                    ],
                    resources: [
                        { type: "Guide", name: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", provider: "DAIR.AI" },
                        { type: "Course", name: "ChatGPT Prompt Engineering for Developers", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", provider: "DeepLearning.AI" },
                        { type: "Tool", name: "PromptBase Marketplace", url: "https://promptbase.com/", provider: "PromptBase" },
                        { type: "Article", name: "Anthropic Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", provider: "Anthropic" }
                    ],
                    quiz: [
                        { question: "What is the goal of prompt engineering?", options: ["To physically repair hardware", "To design inputs that guide AI toward desired outputs", "To write faster code", "To encrypt data"], correct: 1, explanation: "Prompt engineering is about crafting inputs (prompts) to steer AI models toward desired outputs." },
                        { question: "Which technique involves showing the model a few examples before asking it to perform a task?", options: ["Zero-shot learning", "Few-shot learning", "Unsupervised learning", "Transfer learning"], correct: 1, explanation: "Few-shot learning provides the model with a handful of examples to guide its behavior." },
                        { question: "What does 'chain-of-thought' prompting do?", options: ["Links multiple models together", "Asks the model to reason step-by-step", "Generates random outputs", "Compresses the model size"], correct: 1, explanation: "Chain-of-thought prompting asks the model to show its reasoning steps before giving a final answer." },
                        { question: "Why is prompt engineering important when working with LLMs?", options: ["It reduces electricity costs", "It improves output quality without changing model weights", "It makes the model smaller", "It is required by law"], correct: 1, explanation: "Prompt engineering improves model outputs without retraining or changing the model's weights." }
                    ],
                    history: [
                        { year: "2020", event: "GPT-3 demonstrates few-shot learning capabilities" },
                        { year: "2022", event: "Prompt engineering emerges as crucial skill" },
                        { year: "2023", event: "Advanced techniques like chain-of-thought gain popularity" }
                    ]
                }
            },
            {
                id: "i4",
                icon: "🛠️",
                title: "LangChain & AI Frameworks",
                description: "Building applications with AI orchestration frameworks",
                level: "Intermediate",
                duration: "40 min",
                communityAvg: 48,
                content: {
                    overview: "LangChain and similar frameworks provide tools to build LLM-powered applications. They handle prompt management, memory, chains, and agent workflows.",
                    keyPoints: [
                        "Simplifies building complex LLM applications",
                        "Provides abstractions for prompts, memory, and chains",
                        "Integrates with multiple LLM providers",
                        "Supports agents, RAG, and tool use"
                    ],
                    resources: [
                        { type: "Docs", name: "LangChain Documentation", url: "https://docs.langchain.com/", provider: "LangChain" },
                        { type: "Course", name: "LangChain Crash Course", url: "https://www.youtube.com/results?search_query=langchain+crash+course", provider: "YouTube" },
                        { type: "Tutorial", name: "Building with LangChain", url: "https://github.com/langchain-ai/langchain", provider: "GitHub" },
                        { type: "Alternative", name: "LlamaIndex Documentation", url: "https://docs.llamaindex.ai/", provider: "LlamaIndex" }
                    ],
                    quiz: [
                        { question: "What is LangChain primarily used for?", options: ["Video editing", "Building LLM-powered applications with chains and agents", "Database administration", "Graphic design"], correct: 1, explanation: "LangChain simplifies building complex LLM applications with abstractions for prompts, memory, and chains." },
                        { question: "What does 'RAG' stand for in the context of LLM frameworks?", options: ["Random Access Generator", "Retrieval-Augmented Generation", "Recursive Algorithm Group", "Reactive Agent Grid"], correct: 1, explanation: "RAG stands for Retrieval-Augmented Generation — fetching relevant documents to enhance LLM responses." },
                        { question: "Which of these is a LangChain alternative for data retrieval?", options: ["Photoshop", "LlamaIndex", "AutoCAD", "Slack"], correct: 1, explanation: "LlamaIndex is a popular alternative to LangChain, focused on data indexing and retrieval." },
                        { question: "What capability does LangChain provide for agent workflows?", options: ["Tool use and memory management", "Hardware manufacturing", "Network cabling", "Financial auditing"], correct: 0, explanation: "LangChain supports agents, RAG, tool use, and memory management for complex LLM workflows." }
                    ],
                    history: [
                        { year: "2022", event: "LangChain launched as open-source project" },
                        { year: "2023", event: "Rapid ecosystem growth with multiple frameworks" }
                    ]
                }
            },
            {
                id: "i5",
                icon: "📧",
                title: "OpenClaw & Email Agents",
                description: "Understanding autonomous email management and triage systems",
                level: "Intermediate",
                duration: "28 min",
                communityAvg: 53,
                content: {
                    overview: "OpenClaw (Scout) is an AI agent that automatically triages emails, categorizing them and taking actions based on learned patterns. It represents practical agent deployment.",
                    keyPoints: [
                        "Automates email sorting and prioritization",
                        "Uses LLMs to understand email context and intent",
                        "Can be configured with local or cloud models",
                        "Demonstrates real-world agent applications"
                    ],
                    resources: [
                        { type: "GitHub", name: "OpenClaw Repository", url: "https://github.com/search?q=openclaw", provider: "GitHub" },
                        { type: "Video", name: "Setting up Email Agents", url: "https://www.youtube.com/results?search_query=ai+email+agent+setup", provider: "YouTube" },
                        { type: "Tutorial", name: "Building Email Agents", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/", provider: "LangGraph" },
                        { type: "Article", name: "AI Email Automation", url: "https://www.anthropic.com/", provider: "Anthropic" }
                    ],
                    quiz: [
                        { question: "What is the primary function of an AI email agent like OpenClaw?", options: ["Send spam", "Automatically triage and categorize emails", "Delete all emails", "Print emails"], correct: 1, explanation: "OpenClaw (Scout) automatically triages emails, categorizing them based on learned patterns." },
                        { question: "What technology powers modern email agents' understanding of email context?", options: ["Spreadsheet formulas", "Large Language Models (LLMs)", "Barcode scanners", "GPS tracking"], correct: 1, explanation: "Email agents use LLMs to understand email context, intent, and priority." },
                        { question: "Can AI email agents be configured with local models?", options: ["No, only cloud APIs", "Yes, they can use local or cloud models", "Only on mobile devices", "Only during business hours"], correct: 1, explanation: "Agents like OpenClaw can be configured to use local or cloud-based LLMs." },
                        { question: "What does email 'triage' mean in the context of AI agents?", options: ["Deleting emails permanently", "Sorting and prioritizing emails automatically", "Composing new emails", "Forwarding all emails"], correct: 1, explanation: "Triage means sorting and prioritizing incoming emails automatically based on content and urgency." }
                    ],
                    history: [
                        { year: "2023", event: "AI email assistants become practical with LLMs" },
                        { year: "2024", event: "Open-source email agents emerge" }
                    ]
                }
            },
            {
                id: "i6",
                icon: "🗣️",
                title: "Hermes & Communication Models",
                description: "Exploring fine-tuned models for enhanced dialogue and reasoning",
                level: "Intermediate",
                duration: "32 min",
                communityAvg: 51,
                content: {
                    overview: "Hermes models are fine-tuned LLMs optimized for function calling, tool use, and structured outputs. They demonstrate how base models can be specialized for specific tasks.",
                    keyPoints: [
                        "Fine-tuned for improved instruction following",
                        "Enhanced function calling and tool use capabilities",
                        "Open-source and available in various sizes",
                        "Can run locally with Ollama or similar tools"
                    ],
                    resources: [
                        { type: "Model", name: "Hermes on Hugging Face", url: "https://huggingface.co/NousResearch", provider: "Hugging Face" },
                        { type: "Guide", name: "Running Hermes Locally", url: "https://ollama.com/", provider: "Ollama" },
                        { type: "Article", name: "Understanding Model Fine-tuning", url: "https://huggingface.co/learn/llm-course/en/chapter11/fine_tuning_llms", provider: "Hugging Face" },
                        { type: "Comparison", name: "LLM Leaderboard", url: "https://huggingface.co/spaces/lmarena-ai/arena-leaderboard", provider: "Hugging Face" }
                    ],
                    quiz: [
                        { question: "What are Hermes models specifically optimized for?", options: ["Image generation", "Function calling and tool use", "Music composition", "Video editing"], correct: 1, explanation: "Hermes models are fine-tuned for improved function calling, tool use, and structured outputs." },
                        { question: "What does 'fine-tuning' a model mean?", options: ["Destroying the model", "Continuing training on a smaller, task-specific dataset", "Increasing the model's physical size", "Making the model run slower"], correct: 1, explanation: "Fine-tuning continues training on a smaller, task-specific dataset to adapt a pretrained model." },
                        { question: "Which tool can be used to run Hermes models locally?", options: ["Ollama", "Instagram", "Zoom", "PowerPoint"], correct: 0, explanation: "Ollama is a popular tool for running open-source models like Hermes locally." },
                        { question: "What organization released the Hermes models?", options: ["OpenAI", "Nous Research", "Google DeepMind", "Microsoft"], correct: 1, explanation: "Hermes models were released by Nous Research, an AI research collective." }
                    ],
                    history: [
                        { year: "2023", event: "First Hermes models released by Nous Research" },
                        { year: "2024", event: "Hermes 2 Pro gains popularity for function calling" }
                    ]
                }
            }
        ]
    },
    expert: {
        title: "Expert Deep Dive",
        subtitle: "Cutting-edge research and advanced implementations",
        topics: [
            {
                id: "e1",
                icon: "🔬",
                title: "Retrieval Augmented Generation (RAG)",
                description: "Combining knowledge retrieval with generative models",
                level: "Expert",
                duration: "45 min",
                communityAvg: 46,
                content: {
                    overview: "RAG enhances LLMs by retrieving relevant information from external knowledge bases before generating responses. It reduces hallucinations and enables dynamic knowledge updates.",
                    keyPoints: [
                        "Separates parametric (model) and non-parametric (database) knowledge",
                        "Uses vector databases for efficient similarity search",
                        "Techniques: dense retrieval, re-ranking, hybrid search",
                        "Critical for enterprise AI applications"
                    ],
                    resources: [
                        { type: "Paper", name: "RAG: Retrieval-Augmented Generation", url: "https://arxiv.org/abs/2005.11401", provider: "arXiv" },
                        { type: "Tutorial", name: "Building RAG Systems", url: "https://python.langchain.com/docs/tutorials/rag/", provider: "LangChain" },
                        { type: "Tool", name: "Pinecone Vector Database", url: "https://www.pinecone.io/", provider: "Pinecone" },
                        { type: "Course", name: "Advanced RAG Techniques", url: "https://www.deeplearning.ai/short-courses/", provider: "DeepLearning.AI" }
                    ],
                    quiz: [
                        { question: "What does RAG stand for?", options: ["Random Algorithm Generation", "Retrieval-Augmented Generation", "Recursive Action Grid", "Reactive Agent Group"], correct: 1, explanation: "RAG stands for Retrieval-Augmented Generation — combining knowledge retrieval with generative models." },
                        { question: "What problem does RAG primarily solve in LLMs?", options: ["Slow internet speeds", "Hallucinations and stale knowledge", "High electricity bills", "Small context windows"], correct: 1, explanation: "RAG reduces hallucinations by grounding responses in retrieved external knowledge." },
                        { question: "What type of database is commonly used for the retrieval component of RAG?", options: ["Relational SQL database", "Vector database", "Spreadsheet", "Blockchain"], correct: 1, explanation: "Vector databases store embeddings and enable efficient similarity search for RAG systems." },
                        { question: "When was the seminal RAG paper published?", options: ["2018", "2019", "2020", "2021"], correct: 2, explanation: "The RAG paper was published by Facebook AI Research in 2020." }
                    ],
                    history: [
                        { year: "2020", event: "RAG paper published by Facebook AI Research" },
                        { year: "2023", event: "RAG becomes standard for enterprise LLM applications" }
                    ]
                }
            },
            {
                id: "e2",
                icon: "⚡",
                title: "Model Optimization & Quantization",
                description: "Running large models efficiently on limited hardware",
                level: "Expert",
                duration: "50 min",
                communityAvg: 44,
                content: {
                    overview: "Optimization techniques reduce model size and computational requirements while maintaining performance. Essential for deploying models on edge devices or consumer hardware.",
                    keyPoints: [
                        "Quantization reduces precision (32-bit → 8-bit, 4-bit)",
                        "Pruning removes unnecessary weights",
                        "Knowledge distillation trains smaller models",
                        "Enables local LLM deployment on consumer hardware"
                    ],
                    resources: [
                        { type: "Guide", name: "GGUF Quantization Format", url: "https://github.com/ggml-org/llama.cpp", provider: "GitHub" },
                        { type: "Tool", name: "Ollama - Local Models", url: "https://ollama.com/", provider: "Ollama" },
                        { type: "Paper", name: "LLM.int8(): 8-bit Inference", url: "https://arxiv.org/abs/2208.07339", provider: "arXiv" },
                        { type: "Tutorial", name: "Running LLMs on CPU", url: "https://github.com/ggml-org/llama.cpp/blob/master/README.md", provider: "GitHub" }
                    ],
                    quiz: [
                        { question: "What is model quantization?", options: ["Increasing model size", "Reducing numeric precision to shrink models", "Adding more layers", "Changing the model color scheme"], correct: 1, explanation: "Quantization reduces precision (e.g., 32-bit to 8-bit or 4-bit) to make models smaller and faster." },
                        { question: "What is knowledge distillation?", options: ["Teaching a smaller model to mimic a larger one", "Deleting old training data", "Combining multiple GPUs", "Writing documentation"], correct: 0, explanation: "Knowledge distillation trains a smaller model to replicate the behavior of a larger, more powerful model." },
                        { question: "What does GGUF enable?", options: ["3D printing", "Running quantized LLMs locally on consumer hardware", "Cloud-only model training", "Automatic email sending"], correct: 1, explanation: "The GGUF format (created by llama.cpp) enables efficient local deployment of quantized LLMs." },
                        { question: "Which tool is popular for running local LLMs?", options: ["Ollama", "Uber", "Netflix", "Spotify"], correct: 0, explanation: "Ollama is a popular tool for easily running local LLMs on personal computers." }
                    ],
                    history: [
                        { year: "2022", event: "LLaMA demonstrates efficient model design" },
                        { year: "2023", event: "GGUF format enables widespread local deployment" }
                    ]
                }
            },
            {
                id: "e3",
                icon: "🎭",
                title: "Multi-Agent Systems",
                description: "Coordinating multiple AI agents for complex tasks",
                level: "Expert",
                duration: "55 min",
                communityAvg: 42,
                content: {
                    overview: "Multi-agent systems involve multiple AI agents working together, each with specialized roles. They enable complex problem-solving through collaboration and division of labor.",
                    keyPoints: [
                        "Agents communicate and coordinate actions",
                        "Emergent behaviors from agent interactions",
                        "Applications: simulations, game AI, workflow automation",
                        "Frameworks: AutoGen, CrewAI, MetaGPT"
                    ],
                    resources: [
                        { type: "Framework", name: "AutoGen Documentation", url: "https://microsoft.github.io/autogen/", provider: "Microsoft" },
                        { type: "Framework", name: "CrewAI", url: "https://github.com/crewAIInc/crewAI", provider: "GitHub" },
                        { type: "Paper", name: "Communicative Agents for Software Development", url: "https://arxiv.org/abs/2307.07924", provider: "arXiv" },
                        { type: "Video", name: "Multi-Agent Systems Explained", url: "https://www.youtube.com/results?search_query=multi+agent+ai+systems", provider: "YouTube" }
                    ],
                    quiz: [
                        { question: "What is a multi-agent system?", options: ["A single powerful AI", "Multiple AI agents working together with specialized roles", "A human-AI hybrid", "A type of computer virus"], correct: 1, explanation: "Multi-agent systems involve multiple AI agents collaborating, each with specialized roles." },
                        { question: "Which framework was released by Microsoft Research for multi-agent systems?", options: ["AutoGen", "ReactJS", "Vue.js", "Angular"], correct: 0, explanation: "AutoGen was released by Microsoft Research for building multi-agent conversational systems." },
                        { question: "What is an emergent behavior in multi-agent systems?", options: ["A pre-programmed command", "A behavior arising from agent interactions", "A hardware failure", "A user interface glitch"], correct: 1, explanation: "Emergent behaviors arise spontaneously from the interactions between multiple agents." },
                        { question: "Which of these is an application of multi-agent systems?", options: ["Word processing", "Workflow automation and simulations", "File compression", "Screen brightness control"], correct: 1, explanation: "Multi-agent systems are used for workflow automation, game AI, and complex simulations." }
                    ],
                    history: [
                        { year: "2023", event: "AutoGen released by Microsoft Research" },
                        { year: "2024", event: "Explosion of multi-agent frameworks and applications" }
                    ]
                }
            },
            {
                id: "e4",
                icon: "🔐",
                title: "AI Safety & Alignment",
                description: "Ensuring AI systems behave as intended and benefit humanity",
                level: "Expert",
                duration: "60 min",
                communityAvg: 40,
                content: {
                    overview: "AI safety focuses on making AI systems robust, interpretable, and aligned with human values. Critical as models become more powerful and autonomous.",
                    keyPoints: [
                        "Alignment: ensuring AI goals match human intentions",
                        "Robustness: making models resistant to adversarial attacks",
                        "Interpretability: understanding model decisions",
                        "Techniques: RLHF, Constitutional AI, red-teaming"
                    ],
                    resources: [
                        { type: "Research", name: "Anthropic Safety Research", url: "https://www.anthropic.com/research", provider: "Anthropic" },
                        { type: "Course", name: "AI Safety Fundamentals", url: "https://aisafetyfundamentals.com/", provider: "AI Safety Fundamentals" },
                        { type: "Paper", name: "Constitutional AI", url: "https://arxiv.org/abs/2212.08073", provider: "arXiv" },
                        { type: "Forum", name: "AI Alignment Forum", url: "https://www.alignmentforum.org/", provider: "Alignment Forum" }
                    ],
                    quiz: [
                        { question: "What is the primary goal of AI alignment?", options: ["Making AI faster", "Ensuring AI goals match human intentions", "Reducing AI costs", "Increasing AI memory"], correct: 1, explanation: "Alignment aims to ensure AI systems pursue goals that match human values and intentions." },
                        { question: "What does RLHF stand for?", options: ["Random Learning from Human Feedback", "Reinforcement Learning from Human Feedback", "Recursive Linking of Human Files", "Real-time Learning of Human Functions"], correct: 1, explanation: "RLHF stands for Reinforcement Learning from Human Feedback — a key alignment technique." },
                        { question: "What is 'red-teaming' in AI safety?", options: ["Painting models red", "Adversarial testing to find failure modes", "A gaming tournament", "A marketing strategy"], correct: 1, explanation: "Red-teaming involves adversarial testing to discover vulnerabilities and harmful behaviors in AI systems." },
                        { question: "Which company introduced Constitutional AI?", options: ["OpenAI", "Anthropic", "Google", "Meta"], correct: 1, explanation: "Anthropic introduced Constitutional AI, using a written 'constitution' of principles to guide behavior." }
                    ],
                    history: [
                        { year: "2017", event: "OpenAI publishes research on AI safety principles" },
                        { year: "2022", event: "Constitutional AI introduced by Anthropic" },
                        { year: "2023", event: "International AI safety summits begin" }
                    ]
                }
            },
            {
                id: "e5",
                icon: "🌐",
                title: "Mixture of Experts (MoE)",
                description: "Scaling models efficiently with sparse activation",
                level: "Expert",
                duration: "48 min",
                communityAvg: 45,
                content: {
                    overview: "MoE models consist of multiple expert networks, with a router determining which experts to activate for each input. Enables massive scale with manageable computational cost.",
                    keyPoints: [
                        "Only a subset of experts activated per input",
                        "Dramatically increases model capacity without proportional compute",
                        "Examples: GPT-4 (rumored), Mixtral, Switch Transformers",
                        "Challenges: training stability, load balancing"
                    ],
                    resources: [
                        { type: "Paper", name: "Switch Transformers", url: "https://arxiv.org/abs/2101.03961", provider: "arXiv" },
                        { type: "Model", name: "Mixtral 8x7B", url: "https://huggingface.co/mistralai/Mixtral-8x7B-v0.1", provider: "Hugging Face" },
                        { type: "Article", name: "MoE Explained", url: "https://huggingface.co/blog/moe", provider: "Hugging Face" },
                        { type: "Research", name: "Google MoE Research", url: "https://research.google/", provider: "Google Research" }
                    ],
                    quiz: [
                        { question: "In a Mixture of Experts model, how many experts are activated per input token?", options: ["All experts", "Only a small subset (e.g., 2 out of 8)", "Exactly half", "Only one expert ever"], correct: 1, explanation: "MoE models route each token through only a small subset of experts, keeping compute manageable." },
                        { question: "Which open-source model popularized MoE in 2023?", options: ["GPT-3", "Mixtral 8x7B", "BERT", "AlexNet"], correct: 1, explanation: "Mixtral 8x7B brought the Mixture of Experts architecture to the open-source community in 2023." },
                        { question: "What is the main advantage of MoE architecture?", options: ["Smaller file sizes", "Massive model capacity without proportional compute increase", "Simpler training", "Fewer parameters overall"], correct: 1, explanation: "MoE dramatically increases model capacity while only using a subset of experts per input, keeping compute costs lower." },
                        { question: "What challenge do MoE models face?", options: ["Too little data", "Training stability and load balancing", "Cannot run on GPUs", "Only work for images"], correct: 1, explanation: "MoE models face challenges with training stability and ensuring experts are evenly utilized (load balancing)." }
                    ],
                    history: [
                        { year: "1991", event: "MoE concept introduced in neural networks" },
                        { year: "2021", event: "Switch Transformers demonstrate trillion-parameter scaling" },
                        { year: "2023", event: "Mixtral brings MoE to open-source community" }
                    ]
                }
            },
            {
                id: "e6",
                icon: "🧬",
                title: "Emerging Architectures & Research",
                description: "Latest breakthroughs reshaping the future of AI",
                level: "Expert",
                duration: "65 min",
                communityAvg: 43,
                content: {
                    overview: "Stay current with cutting-edge research: state space models (Mamba), diffusion transformers, multimodal models, and novel training techniques that may define the next generation of AI.",
                    keyPoints: [
                        "Mamba: efficient alternative to attention mechanisms",
                        "Diffusion models for generation (DALL-E, Stable Diffusion)",
                        "Multimodal models (GPT-4V, Gemini, Claude 3)",
                        "Test-time compute scaling and advanced reasoning"
                    ],
                    resources: [
                        { type: "Paper", name: "Mamba: Linear-Time Sequence Modeling", url: "https://arxiv.org/abs/2312.00752", provider: "arXiv" },
                        { type: "Hub", name: "Papers With Code", url: "https://huggingface.co/papers", provider: "Hugging Face" },
                        { type: "Newsletter", name: "The Batch by DeepLearning.AI", url: "https://www.deeplearning.ai/the-batch/", provider: "DeepLearning.AI" },
                        { type: "Podcast", name: "Latent Space Podcast", url: "https://www.latent.space/", provider: "Latent Space" }
                    ],
                    quiz: [
                        { question: "What is Mamba in the context of AI architectures?", options: ["A snake species", "A state space model offering an efficient alternative to attention", "A type of GPU", "A programming language"], correct: 1, explanation: "Mamba is a state space model architecture that offers linear-time sequence modeling as an alternative to Transformers." },
                        { question: "What is 'test-time compute scaling' as demonstrated by OpenAI o1?", options: ["Running models faster at test time", "Spending more compute during inference to improve reasoning", "Reducing test dataset size", "Skipping the testing phase"], correct: 1, explanation: "Test-time compute scaling spends more computation during inference to improve reasoning quality." },
                        { question: "Which model introduced native multimodal capabilities in 2023?", options: ["GPT-4", "Mamba", "Mixtral", "AlexNet"], correct: 0, explanation: "GPT-4 introduced multimodal capabilities, accepting both text and image inputs." },
                        { question: "What is a diffusion model used for?", options: ["Spreading viruses", "Generating images (e.g., DALL-E, Stable Diffusion)", "Compressing text", "Sorting databases"], correct: 1, explanation: "Diffusion models like DALL-E and Stable Diffusion generate images by gradually denoising random noise." }
                    ],
                    history: [
                        { year: "2023", event: "GPT-4 introduces multimodal capabilities" },
                        { year: "2024", event: "Mamba challenges transformer dominance" },
                        { year: "2024", event: "OpenAI o1 demonstrates test-time compute scaling" }
                    ]
                }
            }
        ]
    }
};

// Fun facts about AI history and innovations
const funFacts = [
    {
        title: "The Turing Test",
        description: "Alan Turing proposed in 1950 that if a machine can engage in conversation indistinguishable from a human, it should be considered 'intelligent.'"
    },
    {
        title: "First AI Winter",
        description: "The 1970s saw the first 'AI Winter' - a period of reduced funding and interest in AI research due to unmet expectations."
    },
    {
        title: "Deep Blue's Victory",
        description: "When IBM's Deep Blue defeated chess champion Garry Kasparov in 1997, it evaluated 200 million positions per second."
    },
    {
        title: "ImageNet Revolution",
        description: "The 2012 ImageNet competition was won by a deep learning model (AlexNet) that cut error rates nearly in half, sparking the deep learning revolution."
    },
    {
        title: "GPT-3's Scale",
        description: "GPT-3 has 175 billion parameters and was trained on 45TB of text data from the internet."
    },
    {
        title: "The Moravec Paradox",
        description: "Tasks humans find difficult (math, chess) are easy for AI, while simple tasks for humans (walking, recognizing faces) are extremely hard for AI."
    },
    {
        title: "Transformer's Name",
        description: "The Transformer architecture wasn't named after the robots - it refers to how it 'transforms' input sequences into meaningful representations."
    },
    {
        title: "LLaMA's Efficiency",
        description: "Meta's LLaMA-13B model matches GPT-3's performance with 10x fewer parameters, showing that model architecture matters as much as size."
    },
    {
        title: "Constitutional AI",
        description: "Anthropic's Constitutional AI approach uses a written 'constitution' of principles to guide AI behavior, inspired by legal constitutions."
    },
    {
        title: "The Bitter Lesson",
        description: "Rich Sutton's 'Bitter Lesson' argues that methods leveraging computation (scaling) have historically beaten human-engineered approaches in AI."
    }
];

// Daily updates - simulated (replace with real API)
function getLatestAINews() {
    const item = aiUpdates[Math.floor(Math.random() * aiUpdates.length)];
    return { text: item.title + ' \u2014 ' + item.text, date: item.date };
}

// ============================================
// AI GLOSSARY — quick-reference terms
// ============================================
const aiGlossary = [
    { term: "Artificial Intelligence", abbr: "AI", definition: "Broad field of building systems that perform tasks which typically require human intelligence — perception, reasoning, language, decision-making." },
    { term: "Machine Learning", abbr: "ML", definition: "Subset of AI where systems learn patterns from data rather than being explicitly programmed." },
    { term: "Deep Learning", abbr: "DL", definition: "ML using multi-layer neural networks. Powers modern speech, vision, and language models." },
    { term: "Large Language Model", abbr: "LLM", definition: "Neural network trained on vast text corpora to predict and generate text, e.g. GPT, Claude, Llama." },
    { term: "Transformer", definition: "Neural network architecture built on self-attention; the foundation of nearly every modern LLM." },
    { term: "Attention", definition: "Mechanism by which a model weights different parts of its input when producing each output token." },
    { term: "Token", definition: "Smallest unit a model reads — a sub-word piece. A typical English word is ~1.3 tokens." },
    { term: "Context Window", definition: "Maximum number of tokens a model can consider at once. Larger windows let models reason over more input." },
    { term: "Embedding", definition: "A dense numeric vector representing text (or other data) so that semantic similarity becomes geometric closeness." },
    { term: "Fine-tuning", definition: "Continuing training on a smaller, task-specific dataset to adapt a pretrained model." },
    { term: "RLHF", abbr: "RLHF", definition: "Reinforcement Learning from Human Feedback — aligning model behaviour using human-ranked responses." },
    { term: "Prompt Engineering", definition: "Crafting inputs (instructions, examples, structure) to steer model behaviour without changing weights." },
    { term: "RAG", abbr: "RAG", definition: "Retrieval-Augmented Generation — fetching relevant documents at query time and feeding them into the prompt." },
    { term: "Vector Database", definition: "Database optimised for similarity search over embeddings — the usual backing store for RAG systems." },
    { term: "Agent", definition: "An LLM-driven system that plans, calls tools, observes results, and iterates toward a goal." },
    { term: "Tool Use", definition: "Letting a model invoke external functions or APIs (search, code exec, calendars) mid-response." },
    { term: "MoE", abbr: "MoE", definition: "Mixture of Experts — architecture that routes each token through a small subset of specialised sub-networks." },
    { term: "Quantization", definition: "Compressing a model by reducing numeric precision (e.g. FP16 → INT4), trading quality for speed and memory." },
    { term: "Hallucination", definition: "When a model produces confident but factually wrong content not grounded in its inputs." },
    { term: "Alignment", definition: "The work of ensuring AI systems behave in line with human intent and values." },
    { term: "Multimodal", definition: "Models that handle multiple input or output types — text, image, audio, video — in one system." },
    { term: "Temperature", definition: "Sampling parameter that controls randomness. Lower = more deterministic, higher = more creative." },
    { term: "Chain of Thought", abbr: "CoT", definition: "Prompting technique that asks the model to reason step-by-step before answering." },
    { term: "Zero-shot / Few-shot", definition: "Asking a model to do a task with no examples (zero-shot) or a handful of examples (few-shot) in the prompt." }
];

// ============================================
// AI UPDATES — what's trending in the field
// ============================================
const aiUpdates = [
    { date: "This year", title: "Million-token context", text: "Frontier models routinely handle 200K–2M token contexts, enabling entire-codebase and long-document reasoning in one shot." },
    { date: "This year", title: "Agentic workflows go mainstream", text: "Tool-using, multi-step agents move from demos into production — browsers, coding, research, and ops automation." },
    { date: "This year", title: "Open-weight models close the gap", text: "Meta, Mistral, DeepSeek and others ship open-weight models competitive with closed frontier systems." },
    { date: "Recent", title: "Reasoning models", text: "A new class of models trained to 'think' before answering — dramatically better on maths, code, and logic." },
    { date: "Recent", title: "Native multimodality", text: "Top models now accept text, images, audio, and video as first-class inputs rather than bolted-on adapters." },
    { date: "Ongoing", title: "On-device LLMs", text: "4-bit quantization and tiny-but-strong models (1B–8B) enable useful LLMs on phones and laptops without a cloud." }
];
