import type { Tool, Category, UseCase, Guide } from './types';

export const categories: Category[] = [
  { id: 'assistants', label: 'AI assistants', headline: 'AI assistants for everyday work', description: 'Conversational tools for drafting, thinking, analysis, and working with information. Check each plan for current limits and features.' },
  { id: 'research', label: 'Research', headline: 'AI tools for research and discovery', description: 'Explore answer engines and assistants that can help find, organize, or explain information. Follow citations back to the source.' },
  { id: 'image-generation', label: 'Image generation', headline: 'AI image-generation tools', description: 'Explore tools for creating or editing images, then check the current commercial-use terms and plan limits.' },
  { id: 'visual-design', label: 'Visual design', headline: 'AI tools for visual design', description: 'Tools that bring AI-assisted writing and visual creation into a design workflow.' },
  { id: 'video', label: 'Video', headline: 'AI tools for video creation', description: 'Explore video-generation and editing options; generation credits, resolution, and usage rights can differ by plan.' },
  { id: 'audio', label: 'Voice & audio', headline: 'AI voice and audio tools', description: 'Tools for speech generation, voice workflows, transcription, and localization. Verify commercial rights with the vendor.' },
  { id: 'productivity', label: 'Productivity', headline: 'AI tools for knowledge work', description: 'Assistants integrated into documents, meeting notes, databases, and team knowledge workflows.' }
];

export const useCases: UseCase[] = [
  { id: 'writing', label: 'Writing & editing', headline: 'Writing and editing with AI', description: 'Compare assistants and workspace tools for drafting, rewriting, summarizing, and developing a repeatable writing workflow.' },
  { id: 'research', label: 'Research & sources', headline: 'Research with a clearer trail', description: 'Explore answer engines and assistants that help search, summarize, or organize research. Follow source links and verify key claims.' },
  { id: 'image-creation', label: 'Image creation', headline: 'Create or refine images', description: 'Compare prompt-based image generation and assisted visual creation. Check usage rights and plan limits before using output commercially.' },
  { id: 'visual-design', label: 'Visual design', headline: 'Design and content creation', description: 'Explore AI-assisted visual workflows for presentations, marketing content, and design tasks.' },
  { id: 'video', label: 'Video creation', headline: 'Create and edit video', description: 'Explore AI-assisted video workflows for generated clips, editing, and short creative projects.' },
  { id: 'voice-audio', label: 'Voice & audio', headline: 'Generate or localize audio', description: 'Compare audio and voice workflows, from speech generation and transcription to localization. Confirm voice and commercial-use terms.' },
  { id: 'knowledge-work', label: 'Knowledge work', headline: 'AI for everyday knowledge work', description: 'Find a tool for researching, working with documents, finding information, or keeping team knowledge connected.' }
];

const common = { platforms: ['Web'], affiliateUrl: '', sponsored: false, sponsorshipLabel: '' };

export const tools: Tool[] = [
  // --- 1. ChatGPT ---
  {
    ...common,
    id: 'chatgpt',
    name: 'ChatGPT',
    mark: 'GPT',
    editorPick: true,
    category: 'Conversational AI assistant',
    categoryKey: 'assistants',
    extraCategories: ['research'],
    summary: 'ChatGPT is an AI assistant for answering questions, explaining concepts, drafting and revising content, and helping with research and other tasks.',
    bestFor: 'People who want a general-purpose assistant for learning, writing, web research, and working with documents, images, or data.',
    features: [
      'Answers questions and explains concepts.',
      'Drafts, rewrites, and summarizes content.',
      'Can search the web and provide source-backed responses.',
      'Can analyze uploaded files and images, and analyze or visualize structured data; availability may depend on plan and settings.'
    ],
    pricingModel: 'Free version + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'OpenAI says the free version is available to everyone and lists paid plans; features and usage limits vary by plan. Check the official pricing page for current plan details and terms.',
    url: 'https://chatgpt.com/',
    pricingUrl: 'https://chatgpt.com/pricing/',
    tags: ['General assistant', 'Writing', 'Web research', 'Data analysis'],
    useCases: ['writing', 'research', 'knowledge-work']
  },

  // --- 2. Claude ---
  {
    ...common,
    id: 'claude',
    name: 'Claude',
    mark: 'CL',
    category: 'AI assistant',
    categoryKey: 'assistants',
    extraCategories: ['research'],
    summary: 'Claude is Anthropic’s AI assistant. It can read documents, draft and edit content, work with connected tools, and help reason through complex problems.',
    bestFor: 'Individuals and teams seeking conversational help with document-based work, writing and editing, research, coding, or creating reusable work products.',
    features: [
      'Read and work from documents attached to a conversation.',
      'Search the web for current information and provide citations and source links.',
      'Conduct multi-search Research and return a cited brief (available on paid plans, according to the Help Center).',
      'Create editable artifacts such as documents, code, dashboards, diagrams, and interactive tools.'
    ],
    pricingModel: 'Free plan + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Anthropic lists a Free plan alongside paid individual and team/enterprise plans; usage limits and feature availability vary by plan. Terms and plans may change, so check the official pricing page for current details.',
    url: 'https://claude.ai/',
    pricingUrl: 'https://claude.com/pricing',
    tags: ['Writing', 'Documents', 'Research', 'Coding'],
    useCases: ['writing', 'research', 'knowledge-work']
  },

  // --- 3. Perplexity ---
  {
    ...common,
    id: 'perplexity',
    name: 'Perplexity',
    mark: 'P',
    editorPick: true,
    category: 'AI answer engine and research',
    categoryKey: 'research',
    extraCategories: ['assistants'],
    summary: 'Perplexity searches the web in response to questions and synthesizes information into conversational answers with links to cited sources.',
    bestFor: 'People doing everyday information lookup or research who want summarized web results with source links, including students and knowledge workers.',
    features: [
      'Real-time web search with answers that link to original sources.',
      'Conversational follow-up questions that retain the context of earlier queries.',
      'Pro Search for more in-depth, multi-source answers, with model selection available on eligible access.',
      'Deep Research that performs multiple searches and produces a report.'
    ],
    pricingModel: 'Free tier + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'The vendor lists a free tier with limited usage and paid plans with expanded access and features. Plan features, limits, and terms may change; check Perplexity’s official pricing page for current details.',
    url: 'https://www.perplexity.ai/',
    pricingUrl: 'https://www.perplexity.ai/hub/pricing',
    tags: ['Web research', 'Source links', 'Answer engine', 'Research'],
    useCases: ['research', 'knowledge-work']
  },

  // --- 4. Google Gemini ---
  {
    ...common,
    id: 'gemini',
    name: 'Google Gemini',
    mark: 'GEM',
    category: 'Conversational multimodal AI assistant',
    categoryKey: 'assistants',
    extraCategories: ['research'],
    summary: 'Google Gemini is a multimodal AI assistant capable of processing, understanding, and combining text, code, audio, image, and video inputs.',
    bestFor: 'Users who want deep integration with Google Workspace (Docs, Gmail, Drive), live web grounding via Google Search, and long document reasoning.',
    features: [
      'Understands multimodal prompts combining images, video, PDFs, and code.',
      'Grounded web search with real-time factual citations via Google Search.',
      'Direct integration with Google Workspace apps to draft emails and query Drive files.',
      'Large context window capable of analyzing comprehensive reports, audio recordings, or codebases.'
    ],
    pricingModel: 'Free tier + paid Advanced plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Google offers free access to Gemini with standard models and a paid Gemini Advanced subscription included with Google One AI Premium plans.',
    url: 'https://gemini.google.com/',
    pricingUrl: 'https://one.google.com/explore-plan/gemini-advanced',
    tags: ['Multimodal', 'Google Workspace', 'Web research', 'Code reasoning'],
    useCases: ['writing', 'research', 'knowledge-work']
  },

  // --- 5. Midjourney ---
  {
    ...common,
    id: 'midjourney',
    name: 'Midjourney',
    mark: 'MJ',
    screenshotUrl: 'https://docs.midjourney.com/hc/article_attachments/35960323411981',
    screenshotSource: 'https://docs.midjourney.com/hc/en-us/articles/32764383466893-Editor',
    screenshotAlt: 'Midjourney Editor interface with Move / Resize and Paint controls, an image canvas, and an Imagine prompt.',
    category: 'AI image generation',
    categoryKey: 'image-generation',
    extraCategories: ['visual-design'],
    summary: 'An AI image-generation service that creates new images from text prompts, with options to guide results using image references and to edit images in its web Editor.',
    bestFor: 'Visual creators who want to generate images from prompts or visual references and refine images in a browser-based editor.',
    features: [
      'Generate images using descriptive text prompts.',
      'Use one or more image prompts to influence image content, composition, or colors.',
      'Apply Style References to carry a reference image’s visual style into new creations.',
      'Edit images in the web Editor with tools including inpainting, outpainting, resizing, and layers.'
    ],
    pricingModel: 'Paid subscription plans',
    priceKey: 'paid',
    priceSort: 2,
    pricingNote: 'Midjourney’s official plan comparison lists subscription tiers. Plan availability and features may change; check the vendor’s pricing page for current prices, terms, and availability.',
    url: 'https://www.midjourney.com/',
    pricingUrl: 'https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans',
    tags: ['Image creation', 'Image editing', 'Visual reference', 'Creative'],
    useCases: ['image-creation', 'visual-design']
  },

  // --- 6. Flux by Black Forest Labs ---
  {
    ...common,
    id: 'flux',
    name: 'Flux',
    mark: 'FLX',
    category: 'State-of-the-art open image generation',
    categoryKey: 'image-generation',
    extraCategories: ['visual-design'],
    summary: 'Flux by Black Forest Labs is a frontier suite of text-to-image models renowned for accurate prompt adherence, photorealistic human anatomy, and crisp typography rendering.',
    bestFor: 'Designers, prompt engineers, and visual creators who need exact text inside images, natural lighting, and photorealistic rendering.',
    features: [
      'Renders readable typography, signs, and legible text inside generated compositions.',
      'High-fidelity human anatomy including realistic hands, eyes, and skin textures.',
      'Multiple model tiers ranging from lightweight fast checkpoints to maximum-detail models.',
      'Available across hosted web generators, developer APIs, and local creator environments.'
    ],
    pricingModel: 'Free community tiers + usage-based pricing',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Black Forest Labs provides open weights for select checkpoints alongside commercial API access via partner playgrounds and API platforms.',
    url: 'https://blackforestlabs.ai/',
    pricingUrl: 'https://blackforestlabs.ai/#get-flux',
    tags: ['Image generation', 'Typography in images', 'Photorealism', 'Open weights'],
    useCases: ['image-creation', 'visual-design']
  },

  // --- 7. Krea AI ---
  {
    ...common,
    id: 'krea',
    name: 'Krea AI',
    mark: 'KR',
    category: 'Real-time creative canvas and AI upscaler',
    categoryKey: 'image-generation',
    extraCategories: ['visual-design'],
    summary: 'Krea is a real-time creative suite that updates generated visuals at 30+ FPS as you draw or adjust prompts, plus generative upscaling and video effects.',
    bestFor: 'Concept artists, creative directors, and illustrators wanting immediate visual feedback loops without waiting for generation queues.',
    features: [
      'Real-time generation canvas that adapts instantaneously as you paint shapes or type.',
      'AI Upscaler and Enhancer that sharpens low-resolution images and restores photographic texture.',
      'Camera and screen input integration to run live generative filters on video streams.',
      'Keyframe animation and video morphing tools built onto an infinite workspace.'
    ],
    pricingModel: 'Free tier + paid subscriptions',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Krea provides free daily generation allowances with paid plans unlocking higher resolution exports, faster processing, and commercial licenses.',
    url: 'https://www.krea.ai/',
    pricingUrl: 'https://www.krea.ai/pricing',
    tags: ['Real-time generation', 'AI upscaler', 'Infinite canvas', 'Concept art'],
    useCases: ['image-creation', 'visual-design']
  },

  // --- 8. Canva Magic Studio ---
  {
    ...common,
    id: 'canva',
    name: 'Canva Magic Studio',
    mark: 'CA',
    editorPick: true,
    category: 'AI-assisted visual design and content creation',
    categoryKey: 'visual-design',
    extraCategories: ['image-generation', 'video'],
    summary: 'Canva Magic Studio brings AI tools into Canva to help users generate and adapt visual designs, text, and other creative content.',
    bestFor: 'Individuals, creators, teachers, marketers, small businesses, and teams that want AI-assisted content creation within Canva, including people without advanced design skills.',
    features: [
      'Magic Design generates designs from a text prompt or uploaded media, including presentations and short videos.',
      'Magic Write generates, expands, summarizes, and rewrites text for drafts and content ideas.',
      'Resize & Magic Switch can reformat designs for other formats and translate content.',
      'Magic Edit uses a written prompt to add, replace, or edit parts of an image.'
    ],
    pricingModel: 'Free plan + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Canva offers a free plan with access to some AI tools and usage allowances; paid plans provide access to additional AI features or usage, and an optional AI add-on is also listed. Availability and limits vary by tool and plan and may change; check Canva’s pricing page for current terms.',
    url: 'https://www.canva.com/magic-studio/',
    pricingUrl: 'https://www.canva.com/pricing/',
    tags: ['Design', 'Presentations', 'Marketing content', 'AI-assisted'],
    useCases: ['writing', 'image-creation', 'visual-design', 'video']
  },

  // --- 9. v0 by Vercel ---
  {
    ...common,
    id: 'v0',
    name: 'v0 by Vercel',
    mark: 'V0',
    category: 'Generative user interface and frontend builder',
    categoryKey: 'visual-design',
    extraCategories: ['productivity'],
    summary: 'v0 is an AI-powered interface generator from Vercel that translates natural language prompts into responsive React, Tailwind CSS, and shadcn/ui components.',
    bestFor: 'Frontend developers, designers, and product builders prototyping web applications, landing pages, and interactive components rapidly.',
    features: [
      'Generates production-grade React components styled with modern Tailwind CSS and Lucide icons.',
      'Live interactive preview with instant viewport switching between mobile, tablet, and desktop.',
      'Iterative refinement via chat to tune styling, add state, or integrate interactive UI libraries.',
      'One-click code export, direct npm integration via npx command, and direct deployment to Vercel.'
    ],
    pricingModel: 'Free tier with credits + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Vercel provides a free tier with monthly credit allowances; paid tiers offer expanded message limits, private generations, and team collaboration.',
    url: 'https://v0.dev/',
    pricingUrl: 'https://v0.dev/pricing',
    tags: ['Generative UI', 'React & Tailwind', 'Prototyping', 'Component builder'],
    useCases: ['visual-design', 'knowledge-work']
  },

  // --- 10. Gamma ---
  {
    ...common,
    id: 'gamma',
    name: 'Gamma',
    mark: 'GM',
    category: 'AI presentation and document generator',
    categoryKey: 'visual-design',
    extraCategories: ['productivity'],
    summary: 'Gamma transforms rough outlines, notes, or prompts into polished, beautifully formatted presentations, webpages, and documents in seconds.',
    bestFor: 'Founders, project managers, sales professionals, and educators who need engaging, visual slide decks without spending hours on slide layouts.',
    features: [
      'Generates complete presentations and web-ready docs from a single prompt or pasted outline.',
      'Web-native responsive cards that break free of standard rigid 16:9 slide limitations.',
      'Interactive widgets including embedded videos, forms, charts, and toggle accordions.',
      'Export decks seamlessly to PDF or editable PowerPoint (.pptx) files.'
    ],
    pricingModel: 'Free starter tier + Plus & Pro plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Gamma gives new accounts free starting credits to generate decks; recurring subscription plans unlock custom branding, analytics, and unlimited AI generations.',
    url: 'https://gamma.app/',
    pricingUrl: 'https://gamma.app/pricing',
    tags: ['Presentations', 'Pitch decks', 'Documents', 'Interactive slides'],
    useCases: ['writing', 'visual-design', 'knowledge-work']
  },

  // --- 11. Runway ---
  {
    ...common,
    id: 'runway',
    name: 'Runway',
    mark: 'RW',
    category: 'AI video generation and editing',
    categoryKey: 'video',
    extraCategories: ['image-generation', 'audio'],
    summary: 'Runway is an AI video creation tool for generating clips from text, images, or existing video, then refining and extending those clips. Its workflow also includes image generation and audio features.',
    bestFor: 'Video creators and creative teams making short scenes, animations, b-roll, ad creative, or edits to existing footage.',
    features: [
      'Generate video from a text prompt, an image, or an existing clip.',
      'Edit footage with prompts to change lighting or backdrops, or add and remove objects.',
      'Animate still images and use character references to maintain a consistent look across shots.',
      'Extend and upscale video, and add dialogue, voiceover, or music through supported tools and models.'
    ],
    pricingModel: 'Limited free plan + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Runway’s official page says users can start free, while accessing more generation features requires a paid plan; its help center describes a one-time credit allotment on Free and monthly credits on paid plans. Availability and feature access depend on the plan. Check the vendor’s pricing page for current terms.',
    url: 'https://runway.com/product/ai-video-generator',
    pricingUrl: 'https://runwayml.com/pricing',
    tags: ['Video generation', 'Video editing', 'Creative', 'Credits'],
    useCases: ['image-creation', 'video', 'voice-audio']
  },

  // --- 12. Luma Dream Machine ---
  {
    ...common,
    id: 'luma',
    name: 'Luma Dream Machine',
    mark: 'LM',
    category: 'AI video generation and 3D camera control',
    categoryKey: 'video',
    extraCategories: ['image-generation'],
    summary: 'Dream Machine by Luma AI generates cinematic, high-frame-rate 5-second video sequences with realistic lighting, dynamic physics, and precise camera controls.',
    bestFor: 'Filmmakers, 3D artists, game developers, and marketing agencies creating cinematic B-roll, concept trailers, and scene transitions.',
    features: [
      'Generates 120-frame cinematic video clips from text prompts or starting image references.',
      'Precise camera motion direction including zoom, orbit, pan, tracking, and crane angles.',
      'Video extension capability to stitch and lengthen clips while preserving scene consistency.',
      'Physically accurate lighting, fluid dynamics, and surface reflections.'
    ],
    pricingModel: 'Free tier + paid subscriptions',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Luma AI provides 30 free video generations per month; paid tiers increase generation speed, monthly credits, and enable commercial usage rights.',
    url: 'https://lumalabs.ai/dream-machine',
    pricingUrl: 'https://lumalabs.ai/dream-machine/pricing',
    tags: ['Cinematic video', 'Camera controls', 'Physics simulation', 'Video extension'],
    useCases: ['video', 'image-creation']
  },

  // --- 13. Descript ---
  {
    ...common,
    id: 'descript',
    name: 'Descript',
    mark: 'DS',
    category: 'AI video and podcast editor',
    categoryKey: 'video',
    extraCategories: ['audio'],
    summary: 'Descript is an audio and video editor where you edit video like a word processor. Cut filler words, polish sound with Studio Sound, and generate voiceovers.',
    bestFor: 'Podcasters, YouTube creators, corporate communications teams, and educators producing high-quality dialogue-heavy audio and video.',
    features: [
      'Edit audio and video by deleting, cutting, and rearranging text in the automatic transcript.',
      'One-click Studio Sound enhances noisy microphone recordings to professional podcast quality.',
      'Automatically finds and removes filler words (ums, uhs) and awkward pauses with a single click.',
      'AI Eye Contact correction keeps your gaze focused directly toward the lens.'
    ],
    pricingModel: 'Free tier + Creator & Pro plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Descript offers a free tier with 1 monthly transcription hour and watermark-free 720p exports. Paid tiers offer 4K exports and unlimited Studio Sound.',
    url: 'https://www.descript.com/',
    pricingUrl: 'https://www.descript.com/pricing',
    tags: ['Podcast editing', 'Transcript-based video', 'Studio sound', 'Filler removal'],
    useCases: ['video', 'voice-audio', 'knowledge-work']
  },

  // --- 14. Pika ---
  {
    ...common,
    id: 'pika',
    name: 'Pika',
    mark: 'PK',
    category: 'AI idea-to-video animation platform',
    categoryKey: 'video',
    extraCategories: ['image-generation'],
    summary: 'Pika turns creative ideas, prompts, and images into animated clips with automated lip-syncing, sound effects, and playful physics effects.',
    bestFor: 'Content creators, animators, and social video producers looking to generate imaginative short scenes, viral memes, and stylized animations.',
    features: [
      'Pikaffects physics engine allows objects to melt, inflate, crumble, crush, or cake-ify.',
      'Automated lip synchronization matches generated or recorded speech to character mouths.',
      'Integrated sound effects generation that automatically matches on-screen actions.',
      'Modify and inpaint specific regions within a moving video sequence.'
    ],
    pricingModel: 'Free plan + paid subscriptions',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Pika provides daily replenishable credits on its free plan; paid subscriptions remove watermarks and unlock high-definition downloads.',
    url: 'https://pika.art/',
    pricingUrl: 'https://pika.art/pricing',
    tags: ['Short video', 'Lip sync', 'Pikaffects', 'Animation'],
    useCases: ['video', 'image-creation']
  },

  // --- 15. ElevenLabs ---
  {
    ...common,
    id: 'elevenlabs',
    name: 'ElevenLabs',
    mark: '11',
    category: 'AI audio generation and voice platform',
    categoryKey: 'audio',
    extraCategories: [],
    summary: 'ElevenLabs provides AI audio tools for generating speech, working with voices, and localizing audio and video content. Its platform also offers speech-to-text and conversational agents.',
    bestFor: 'Creators, marketers, studios, and developers who need generated or localized audio, voiceovers, transcription, or voice-enabled applications.',
    features: [
      'Text-to-speech with voice and delivery controls.',
      'Speech-to-text transcription.',
      'Voice cloning and voice design.',
      'Automated dubbing and localization across languages.'
    ],
    pricingModel: 'Free plan + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'The official pricing page currently lists a free plan alongside paid plans. Included features, usage limits, and rights such as commercial use vary by plan; check ElevenLabs’ pricing page for current terms.',
    url: 'https://elevenlabs.io/',
    pricingUrl: 'https://elevenlabs.io/pricing',
    tags: ['Text to speech', 'Voice', 'Transcription', 'Localization'],
    useCases: ['voice-audio']
  },

  // --- 16. Suno ---
  {
    ...common,
    id: 'suno',
    name: 'Suno',
    mark: 'SN',
    category: 'AI music and song generation platform',
    categoryKey: 'audio',
    extraCategories: [],
    summary: 'Suno generates full-length, broadcast-quality songs—including expressive vocals, instrumentation, and arrangements—from a simple description or custom lyrics.',
    bestFor: 'Songwriters, indie game developers, video creators, advertisers, and musicians creating original music across any genre in minutes.',
    features: [
      'Generates complete 2- to 4-minute songs with studio vocals and instrumentation from text prompts.',
      'Custom lyrics mode with support for structural tags like [Verse], [Chorus], and [Guitar Solo].',
      'Extend songs seamlessly to craft longer compositions, distinct intros, and conclusive outros.',
      'Separation of vocal and instrumental stems and lossless audio file downloads on paid plans.'
    ],
    pricingModel: 'Free daily credits + Pro & Premier plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Suno provides 50 free credits daily (10 songs); paid tiers grant commercial ownership rights, faster generation queues, and advanced stem downloads.',
    url: 'https://suno.com/',
    pricingUrl: 'https://suno.com/pricing',
    tags: ['Music generation', 'Songwriting', 'Vocals', 'Audio stems'],
    useCases: ['voice-audio']
  },

  // --- 17. Udio ---
  {
    ...common,
    id: 'udio',
    name: 'Udio',
    mark: 'UD',
    category: 'High-fidelity AI music creation and production',
    categoryKey: 'audio',
    extraCategories: [],
    summary: 'Udio is an AI music generation platform recognized for natural vocal phrasing, rich acoustic resonance, and complex musical arrangements spanning jazz to heavy metal.',
    bestFor: 'Music producers, composers, media creators, and artists who want intricate control over musical styles, track extensions, and lyrical delivery.',
    features: [
      'Creates high-fidelity audio snippets with realistic dynamic ranges and acoustic nuances.',
      'Granular track extension tools to append intros, bridge solos, and outro fades.',
      'Clarity sliders and lyric pronunciation helpers to fine-tune vocal articulation.',
      'Download individual stems (vocals, drums, bass, instruments) for DAW remixing.'
    ],
    pricingModel: 'Free tier with credits + Standard and Pro plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Udio provides monthly free credits; paid plans provide faster generation priority, advanced track extension limits, and commercial licenses.',
    url: 'https://www.udio.com/',
    pricingUrl: 'https://www.udio.com/pricing',
    tags: ['Music production', 'Acoustics', 'Vocals & stems', 'Composing'],
    useCases: ['voice-audio']
  },

  // --- 18. Notion AI ---
  {
    ...common,
    id: 'notion-ai',
    name: 'Notion AI',
    mark: 'NO',
    category: 'AI productivity assistant',
    categoryKey: 'productivity',
    extraCategories: ['assistants'],
    summary: 'AI assistant built into Notion that uses workspace content and enabled connected apps to help users find information and complete work in their pages, docs, tasks, and databases.',
    bestFor: 'Individuals and teams who manage documents, projects, and knowledge in Notion and want AI assistance with search, writing, meetings, or database workflows.',
    features: [
      'Notion Agent can answer questions and create or edit pages and databases using workspace context.',
      'Enterprise Search and AI Connectors can search a Notion workspace and connected apps such as Slack and Google Drive.',
      'AI Meeting Notes can transcribe meetings, summarize key points, and surface insights.',
      'AI writing tools can edit or generate page content; AI can also create databases and autofill properties.'
    ],
    pricingModel: 'Limited complimentary use + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Notion’s official pages describe limited complimentary AI responses for Free and Plus users and inclusion with Business and Enterprise, with usage allowances and possible credit-based charges for certain capabilities. Terms can vary by feature and plan; check Notion’s pricing page and AI FAQ for current availability and terms.',
    url: 'https://www.notion.com/product/ai',
    pricingUrl: 'https://www.notion.com/pricing',
    tags: ['Workspace', 'Meeting notes', 'Knowledge search', 'Productivity'],
    useCases: ['writing', 'research', 'knowledge-work']
  },

  // --- 19. Cursor ---
  {
    ...common,
    id: 'cursor',
    name: 'Cursor',
    mark: 'CU',
    category: 'AI-first code editor and developer environment',
    categoryKey: 'productivity',
    extraCategories: ['assistants'],
    summary: 'Cursor is an AI-first code editor fork of VS Code built to understand your entire repository, write multi-file features with Composer, and predict code edits.',
    bestFor: 'Software developers, engineering teams, and technical founders seeking seamless full-codebase AI pair programming.',
    features: [
      'Semantic codebase indexing that allows developers to ask questions across their entire git repo.',
      'Composer multi-file generation that drafts, edits, and coordinates changes across multiple files.',
      'Smart Tab completion that predicts not just the next token, but your next edit location.',
      'Privacy mode guaranteeing that proprietary source code is never stored or used for model training.'
    ],
    pricingModel: 'Free Hobby tier + Pro & Business plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Cursor offers a free Hobby plan with basic usage limits; the $20/month Pro tier gives fast premium model requests and unlimited tab completions.',
    url: 'https://www.cursor.com/',
    pricingUrl: 'https://www.cursor.com/pricing',
    tags: ['Code editor', 'Developer tools', 'Composer', 'Full codebase AI'],
    useCases: ['knowledge-work']
  },

  // --- 20. GitHub Copilot ---
  {
    ...common,
    id: 'github-copilot',
    name: 'GitHub Copilot',
    mark: 'GH',
    category: 'AI developer assistant and code completion',
    categoryKey: 'productivity',
    extraCategories: ['assistants'],
    summary: 'GitHub Copilot is the world’s most widely adopted AI coding companion, integrating directly into VS Code, Visual Studio, JetBrains, and Neovim.',
    bestFor: 'Engineers, open-source contributors, and enterprise development teams seeking real-time code suggestions and workspace debugging.',
    features: [
      'In-editor contextual autocomplete that suggests whole functions as you write.',
      'Copilot Chat with model choice including Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro.',
      'Automated Pull Request summaries, code explanations, and test generation in GitHub.',
      'Enterprise security controls with commercial IP indemnification and license compliance filters.'
    ],
    pricingModel: 'Free individual tier + paid plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'GitHub offers a free tier of Copilot with limited completions and chat; Copilot Pro ($10/mo) and Copilot Business offer expanded model access and enterprise administration.',
    url: 'https://github.com/features/copilot',
    pricingUrl: 'https://github.com/features/copilot#pricing',
    tags: ['Coding assistant', 'IDE integration', 'Code completion', 'Enterprise'],
    useCases: ['knowledge-work']
  },

  // --- 21. Grammarly AI ---
  {
    ...common,
    id: 'grammarly',
    name: 'Grammarly AI',
    mark: 'GR',
    category: 'AI writing and communication assistant',
    categoryKey: 'productivity',
    extraCategories: ['assistants'],
    summary: 'Grammarly is an omnipresent AI writing assistant that analyzes grammar, clarity, tone, and conciseness across email, documents, social media, and desktop applications.',
    bestFor: 'Professionals, students, and corporate teams wanting error-free text and clear, calibrated communication in everyday apps.',
    features: [
      'Real-time grammar, punctuation, and contextual spelling corrections across all desktop apps.',
      'Tone adjustments and tone detector (sounding more confident, friendly, or diplomatic).',
      'One-click generative drafting, reply suggestions, and paragraph rewrites.',
      'Company style guides and brand voice consistency tools for organizational teams.'
    ],
    pricingModel: 'Free tier + Premium and Business plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Grammarly offers a free tier covering critical grammar and conciseness; Premium ($12/mo billed annually) unlocks full-sentence rewrites, tone tweaks, and AI generation prompts.',
    url: 'https://www.grammarly.com/',
    pricingUrl: 'https://www.grammarly.com/plans',
    tags: ['Grammar check', 'Writing assistant', 'Tone adjustment', 'Productivity'],
    useCases: ['writing', 'knowledge-work']
  },

  // --- 22. Otter.ai ---
  {
    ...common,
    id: 'otter',
    name: 'Otter.ai',
    mark: 'OT',
    category: 'AI meeting assistant and live transcription',
    categoryKey: 'productivity',
    extraCases: ['audio'],
    summary: 'Otter.ai is an automated meeting assistant that joins Zoom, Google Meet, and Microsoft Teams to transcribe conversations, capture slides, and generate action items.',
    bestFor: 'Remote teams, consultants, project managers, and students who want automated notes, meeting recaps, and searchable audio transcripts.',
    features: [
      'Real-time transcription with speaker labels, timestamps, and automated slide capture.',
      'Automated summary emails with key bullet points, discussed themes, and assigned tasks.',
      'OtterPilot automatically joins scheduled video meetings so you can focus on the discussion.',
      'Interactive chat to query meeting transcripts ("What did Sarah commit to doing by Friday?").'
    ],
    pricingModel: 'Free Basic tier + Pro and Business plans',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Otter provides 300 free monthly transcription minutes on its Basic tier; Pro ($10/mo billed annually) increases minutes to 1,200 and allows audio file uploads.',
    url: 'https://otter.ai/',
    pricingUrl: 'https://otter.ai/pricing',
    tags: ['Meeting notes', 'Transcription', 'Zoom & Meet', 'Action items'],
    useCases: ['voice-audio', 'knowledge-work']
  },

  // --- 23. Consensus ---
  {
    ...common,
    id: 'consensus',
    name: 'Consensus',
    mark: 'CS',
    category: 'AI academic search and research synthesis',
    categoryKey: 'research',
    extraCategories: ['assistants'],
    summary: 'Consensus is an AI search engine that reads over 200 million peer-reviewed scientific papers to extract, synthesize, and cite consensus findings on any scientific or clinical question.',
    bestFor: 'Researchers, clinicians, students, journalists, and policy makers seeking factual, evidence-backed answers from peer-reviewed scientific studies.',
    features: [
      'Consensus Meter displaying the balance of evidence and study agreement on medical and scientific queries.',
      'Instant synthesized summaries linking directly to original DOI publications and journal citations.',
      'Study quality badges highlighting randomized controlled trials, sample sizes, and citation counts.',
      'Synthesis tool to write literature reviews and draft cited research briefs.'
    ],
    pricingModel: 'Free plan + Premium & Enterprise tiers',
    priceKey: 'free',
    priceSort: 1,
    pricingNote: 'Consensus offers unlimited standard searches on its free plan; the Premium plan ($8.99/mo billed annually) unlocks unlimited Consensus Meter usage and synthesis drafting.',
    url: 'https://consensus.app/',
    pricingUrl: 'https://consensus.app/pricing/',
    tags: ['Academic research', 'Scientific literature', 'Peer-reviewed', 'Evidence-based'],
    useCases: ['research', 'knowledge-work']
  },

  // --- 24. Grok by xAI ---
  {
    ...common,
    id: 'grok',
    name: 'Grok',
    mark: 'GK',
    category: 'Real-time conversational AI and news assistant',
    categoryKey: 'assistants',
    extraCategories: ['research'],
    summary: 'Grok by xAI is a conversational AI designed with real-time understanding of breaking world events via X, featuring live news summaries, image generation, and code analysis.',
    bestFor: 'News followers, researchers, and market observers tracking real-time global trends and events with a direct conversational interface.',
    features: [
      'Real-time information access grounded in live global posts and breaking news on X.',
      'Integrated Flux-powered image generation right inside the chat window.',
      'Normal Mode and Fun Mode allowing users to toggle between objective facts and witty commentary.',
      'Code reasoning and structured data extraction with large context support.'
    ],
    pricingModel: 'Included with X Premium subscriptions',
    priceKey: 'paid',
    priceSort: 2,
    pricingNote: 'Grok is accessible to subscribers of X Premium (starting at $8/mo) and Premium+, and xAI also offers an enterprise developer API.',
    url: 'https://x.ai/',
    pricingUrl: 'https://x.ai/api',
    tags: ['Real-time news', 'xAI', 'Conversational AI', 'Image generation'],
    useCases: ['writing', 'research', 'knowledge-work']
  }
].map(tool => ({ ...tool, priceBucket: tool.priceKey }));

export const guides: Guide[] = [
  {
    id: 'choose-writing-assistant',
    title: 'How to choose an AI writing assistant',
    description: 'Compare the workflow, editing controls, context, and limits—not just a polished first draft.',
    intro: 'An AI writing assistant is most useful when it fits a real part of your writing process. Before comparing products, choose one recurring task: drafting a first outline, summarizing notes, revising tone, or turning research into a readable brief.',
    points: [
      'Can you guide tone, format, and length without repeated prompt work?',
      'Can you bring in the documents and context you need, and control how that context is used?',
      'How are usage limits handled on the plan you would actually use?',
      'Can you review, edit, and export the result in the place where the work will be finished?',
      'What are the privacy and data-handling terms for your material?'
    ]
  },
  {
    id: 'research-with-sources',
    title: 'A practical way to evaluate AI research tools',
    description: 'Check source trails, currentness, and what the tool did before you trust a summary.',
    intro: 'A concise answer is not the same thing as a verified answer. When you compare research tools, test them with a question where you already know a few dependable sources and can check the answer yourself.',
    points: [
      'Do source links support the specific claims beside them?',
      'Can you open and inspect the original sources, not only the summary?',
      'Does the product distinguish current search from general model knowledge?',
      'Can you repeat the same query and inspect how the answer changes?',
      'Which research features, limits, and data controls depend on the plan?'
    ]
  },
  {
    id: 'creative-tools',
    title: 'Choosing an AI tool for visual work',
    description: 'Match the tool to the medium, editing loop, rights, and handoff—not to a demo alone.',
    intro: 'AI visual tools can support very different stages: ideation, image generation, layout, video generation, or finishing an existing asset. Compare products with a small task that resembles the work you would actually publish.',
    points: [
      'Which output format, resolution, and editing controls do you need?',
      'Can the tool use references while preserving the constraints that matter to your project?',
      'What do the current terms say about commercial use, attribution, and generated assets?',
      'How are credits measured and replenished?',
      'Can you export to the file format or handoff workflow your collaborators use?'
    ]
  },
  {
    id: 'pricing-before-paying',
    title: 'Before you pay for an AI tool',
    description: 'A compact checklist for free tiers, credits, plan limits, cancellation, and privacy.',
    intro: 'A low entry price can be useful, but the plan name alone does not tell you what a workflow will cost. Take a moment to confirm the exact limits that apply to your account and the kind of work you intend to do.',
    points: [
      'Does the free tier reset, use credits, or restrict a specific feature?',
      'Which features are included in the plan—and which are metered separately?',
      'Do team seats, storage, export quality, or integrations affect the total cost?',
      'Can you cancel or downgrade easily, and what happens to stored projects?',
      'What data controls and training settings are available on the plan you need?'
    ]
  },
  {
    id: 'alternatives-by-workflow',
    title: 'Compare alternatives by the job to be done',
    description: 'A shortlisting method for finding adjacent tools without mistaking popularity for fit.',
    intro: 'When one product is not a match, a useful alternative is not always the closest-looking competitor. It is the tool that can handle the same job, within the same constraints, with the least friction for your team.',
    points: [
      'Write down the task and the must-have output before naming substitute products.',
      'Compare the same short test prompt or source material across every candidate.',
      'Separate must-haves from nice-to-haves such as extra models or integrations.',
      'Check export, data retention, and team controls alongside capability.',
      'Use directory filters to make a shortlist, then verify each maker’s current terms.'
    ]
  }
];
