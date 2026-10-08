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
  {
    ...common, id: 'chatgpt', name: 'ChatGPT', mark: 'GPT', editorPick: true, category: 'Conversational AI assistant', categoryKey: 'assistants', extraCategories: ['research'],
    summary: 'ChatGPT is an AI assistant for answering questions, explaining concepts, drafting and revising content, and helping with research and other tasks.',
    bestFor: 'People who want a general-purpose assistant for learning, writing, web research, and working with documents, images, or data.',
    features: ['Answers questions and explains concepts.', 'Drafts, rewrites, and summarizes content.', 'Can search the web and provide source-backed responses.', 'Can analyze uploaded files and images, and analyze or visualize structured data; availability may depend on plan and settings.'],
    pricingModel: 'Free version + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'OpenAI says the free version is available to everyone and lists paid plans; features and usage limits vary by plan. Check the official pricing page for current plan details and terms.',
    url: 'https://chatgpt.com/', pricingUrl: 'https://chatgpt.com/pricing/',
    tags: ['General assistant','Writing','Web research','Data analysis'], useCases: ['writing','research','knowledge-work']
  },
  {
    ...common, id: 'claude', name: 'Claude', mark: 'CL', category: 'AI assistant', categoryKey: 'assistants', extraCategories: ['research'],
    summary: 'Claude is Anthropic’s AI assistant. It can read documents, draft and edit content, work with connected tools, and help reason through complex problems.',
    bestFor: 'Individuals and teams seeking conversational help with document-based work, writing and editing, research, coding, or creating reusable work products.',
    features: ['Read and work from documents attached to a conversation.', 'Search the web for current information and provide citations and source links.', 'Conduct multi-search Research and return a cited brief (available on paid plans, according to the Help Center).', 'Create editable artifacts such as documents, code, dashboards, diagrams, and interactive tools.'],
    pricingModel: 'Free plan + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'Anthropic lists a Free plan alongside paid individual and team/enterprise plans; usage limits and feature availability vary by plan. Terms and plans may change, so check the official pricing page for current details.',
    url: 'https://claude.ai/', pricingUrl: 'https://claude.com/pricing',
    tags: ['Writing','Documents','Research','Coding'], useCases: ['writing','research','knowledge-work']
  },
  {
    ...common, id: 'perplexity', name: 'Perplexity', mark: 'P', editorPick: true, category: 'AI answer engine and research', categoryKey: 'research', extraCategories: ['assistants'],
    summary: 'Perplexity searches the web in response to questions and synthesizes information into conversational answers with links to cited sources.',
    bestFor: 'People doing everyday information lookup or research who want summarized web results with source links, including students and knowledge workers.',
    features: ['Real-time web search with answers that link to original sources.', 'Conversational follow-up questions that retain the context of earlier queries.', 'Pro Search for more in-depth, multi-source answers, with model selection available on eligible access.', 'Deep Research that performs multiple searches and produces a report.'],
    pricingModel: 'Free tier + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'The vendor lists a free tier with limited usage and paid plans with expanded access and features. Plan features, limits, and terms may change; check Perplexity’s official pricing page for current details.',
    url: 'https://www.perplexity.ai/', pricingUrl: 'https://www.perplexity.ai/hub/pricing',
    tags: ['Web research','Source links','Answer engine','Research'], useCases: ['research','knowledge-work']
  },
  {
    ...common, id: 'midjourney', name: 'Midjourney', mark: 'MJ', screenshotUrl: 'https://docs.midjourney.com/hc/article_attachments/35960323411981', screenshotSource: 'https://docs.midjourney.com/hc/en-us/articles/32764383466893-Editor', screenshotAlt: 'Midjourney Editor interface with Move / Resize and Paint controls, an image canvas, and an Imagine prompt.', category: 'AI image generation', categoryKey: 'image-generation', extraCategories: ['visual-design'],
    summary: 'An AI image-generation service that creates new images from text prompts, with options to guide results using image references and to edit images in its web Editor.',
    bestFor: 'Visual creators who want to generate images from prompts or visual references and refine images in a browser-based editor.',
    features: ['Generate images using descriptive text prompts.', 'Use one or more image prompts to influence image content, composition, or colors.', 'Apply Style References to carry a reference image’s visual style into new creations.', 'Edit images in the web Editor with tools including inpainting, outpainting, resizing, and layers.'],
    pricingModel: 'Paid subscription plans', priceKey: 'paid', priceSort: 2,
    pricingNote: 'Midjourney’s official plan comparison lists subscription tiers. Plan availability and features may change; check the vendor’s pricing page for current prices, terms, and availability.',
    url: 'https://www.midjourney.com/', pricingUrl: 'https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans',
    tags: ['Image creation','Image editing','Visual reference','Creative'], useCases: ['image-creation','visual-design']
  },
  {
    ...common, id: 'canva', name: 'Canva Magic Studio', mark: 'CA', editorPick: true, category: 'AI-assisted visual design and content creation', categoryKey: 'visual-design', extraCategories: ['image-generation','video'],
    summary: 'Canva Magic Studio brings AI tools into Canva to help users generate and adapt visual designs, text, and other creative content.',
    bestFor: 'Individuals, creators, teachers, marketers, small businesses, and teams that want AI-assisted content creation within Canva, including people without advanced design skills.',
    features: ['Magic Design generates designs from a text prompt or uploaded media, including presentations and short videos.', 'Magic Write generates, expands, summarizes, and rewrites text for drafts and content ideas.', 'Resize & Magic Switch can reformat designs for other formats and translate content.', 'Magic Edit uses a written prompt to add, replace, or edit parts of an image.'],
    pricingModel: 'Free plan + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'Canva offers a free plan with access to some AI tools and usage allowances; paid plans provide access to additional AI features or usage, and an optional AI add-on is also listed. Availability and limits vary by tool and plan and may change; check Canva’s pricing page for current terms.',
    url: 'https://www.canva.com/magic-studio/', pricingUrl: 'https://www.canva.com/pricing/',
    tags: ['Design','Presentations','Marketing content','AI-assisted'], useCases: ['writing','image-creation','visual-design','video']
  },
  {
    ...common, id: 'runway', name: 'Runway', mark: 'RW', category: 'AI video generation and editing', categoryKey: 'video', extraCategories: ['image-generation','audio'],
    summary: 'Runway is an AI video creation tool for generating clips from text, images, or existing video, then refining and extending those clips. Its workflow also includes image generation and audio features.',
    bestFor: 'Video creators and creative teams making short scenes, animations, b-roll, ad creative, or edits to existing footage.',
    features: ['Generate video from a text prompt, an image, or an existing clip.', 'Edit footage with prompts to change lighting or backdrops, or add and remove objects.', 'Animate still images and use character references to maintain a consistent look across shots.', 'Extend and upscale video, and add dialogue, voiceover, or music through supported tools and models.'],
    pricingModel: 'Limited free plan + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'Runway’s official page says users can start free, while accessing more generation features requires a paid plan; its help center describes a one-time credit allotment on Free and monthly credits on paid plans. Availability and feature access depend on the plan. Check the vendor’s pricing page for current terms.',
    url: 'https://runway.com/product/ai-video-generator', pricingUrl: 'https://runwayml.com/pricing',
    tags: ['Video generation','Video editing','Creative','Credits'], useCases: ['image-creation','video','voice-audio']
  },
  {
    ...common, id: 'elevenlabs', name: 'ElevenLabs', mark: '11', category: 'AI audio generation and voice platform', categoryKey: 'audio', extraCategories: [],
    summary: 'ElevenLabs provides AI audio tools for generating speech, working with voices, and localizing audio and video content. Its platform also offers speech-to-text and conversational agents.',
    bestFor: 'Creators, marketers, studios, and developers who need generated or localized audio, voiceovers, transcription, or voice-enabled applications.',
    features: ['Text-to-speech with voice and delivery controls.', 'Speech-to-text transcription.', 'Voice cloning and voice design.', 'Automated dubbing and localization across languages.'],
    pricingModel: 'Free plan + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'The official pricing page currently lists a free plan alongside paid plans. Included features, usage limits, and rights such as commercial use vary by plan; check ElevenLabs’ pricing page for current terms.',
    url: 'https://elevenlabs.io/', pricingUrl: 'https://elevenlabs.io/pricing',
    tags: ['Text to speech','Voice','Transcription','Localization'], useCases: ['voice-audio']
  },
  {
    ...common, id: 'notion-ai', name: 'Notion AI', mark: 'NO', category: 'AI productivity assistant', categoryKey: 'productivity', extraCategories: ['assistants'],
    summary: 'AI assistant built into Notion that uses workspace content and enabled connected apps to help users find information and complete work in their pages, docs, tasks, and databases.',
    bestFor: 'Individuals and teams who manage documents, projects, and knowledge in Notion and want AI assistance with search, writing, meetings, or database workflows.',
    features: ['Notion Agent can answer questions and create or edit pages and databases using workspace and enabled connected-app context.', 'Enterprise Search and AI Connectors can search a Notion workspace and connected apps such as Slack and Google Drive.', 'AI Meeting Notes can transcribe meetings, summarize key points, and surface insights.', 'AI writing tools can edit or generate page content; AI can also create databases, autofill properties, and help write formulas.'],
    pricingModel: 'Limited complimentary use + paid plans', priceKey: 'free', priceSort: 1,
    pricingNote: 'Notion’s official pages describe limited complimentary AI responses for Free and Plus users and inclusion with Business and Enterprise, with usage allowances and possible credit-based charges for certain capabilities. Terms can vary by feature and plan; check Notion’s pricing page and AI FAQ for current availability and terms.',
    url: 'https://www.notion.com/product/ai', pricingUrl: 'https://www.notion.com/pricing',
    tags: ['Workspace','Meeting notes','Knowledge search','Productivity'], useCases: ['writing','research','knowledge-work']
  }
].map(tool => ({ ...tool, priceBucket: tool.priceKey }));

export const guides: Guide[] = [
  { id: 'choose-writing-assistant', title: 'How to choose an AI writing assistant', description: 'Compare the workflow, editing controls, context, and limits—not just a polished first draft.', intro: 'An AI writing assistant is most useful when it fits a real part of your writing process. Before comparing products, choose one recurring task: drafting a first outline, summarizing notes, revising tone, or turning research into a readable brief.', points: ['Can you guide tone, format, and length without repeated prompt work?', 'Can you bring in the documents and context you need, and control how that context is used?', 'How are usage limits handled on the plan you would actually use?', 'Can you review, edit, and export the result in the place where the work will be finished?', 'What are the privacy and data-handling terms for your material?'] },
  { id: 'research-with-sources', title: 'A practical way to evaluate AI research tools', description: 'Check source trails, currentness, and what the tool did before you trust a summary.', intro: 'A concise answer is not the same thing as a verified answer. When you compare research tools, test them with a question where you already know a few dependable sources and can check the answer yourself.', points: ['Do source links support the specific claims beside them?', 'Can you open and inspect the original sources, not only the summary?', 'Does the product distinguish current search from general model knowledge?', 'Can you repeat the same query and inspect how the answer changes?', 'Which research features, limits, and data controls depend on the plan?'] },
  { id: 'creative-tools', title: 'Choosing an AI tool for visual work', description: 'Match the tool to the medium, editing loop, rights, and handoff—not to a demo alone.', intro: 'AI visual tools can support very different stages: ideation, image generation, layout, video generation, or finishing an existing asset. Compare products with a small task that resembles the work you would actually publish.', points: ['Which output format, resolution, and editing controls do you need?', 'Can the tool use references while preserving the constraints that matter to your project?', 'What do the current terms say about commercial use, attribution, and generated assets?', 'How are credits measured and replenished?', 'Can you export to the file format or handoff workflow your collaborators use?'] },
  { id: 'pricing-before-paying', title: 'Before you pay for an AI tool', description: 'A compact checklist for free tiers, credits, plan limits, cancellation, and privacy.', intro: 'A low entry price can be useful, but the plan name alone does not tell you what a workflow will cost. Take a moment to confirm the exact limits that apply to your account and the kind of work you intend to do.', points: ['Does the free tier reset, use credits, or restrict a specific feature?', 'Which features are included in the plan—and which are metered separately?', 'Do team seats, storage, export quality, or integrations affect the total cost?', 'Can you cancel or downgrade easily, and what happens to stored projects?', 'What data controls and training settings are available on the plan you need?'] },
  { id: 'alternatives-by-workflow', title: 'Compare alternatives by the job to be done', description: 'A shortlisting method for finding adjacent tools without mistaking popularity for fit.', intro: 'When one product is not a match, a useful alternative is not always the closest-looking competitor. It is the tool that can handle the same job, within the same constraints, with the least friction for your team.', points: ['Write down the task and the must-have output before naming substitute products.', 'Compare the same short test prompt or source material across every candidate.', 'Separate must-haves from nice-to-haves such as extra models or integrations.', 'Check export, data retention, and team controls alongside capability.', 'Use directory filters to make a shortlist, then verify each maker’s current terms.'] }
];
