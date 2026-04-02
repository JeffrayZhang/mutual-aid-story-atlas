export const storyIntro = {
  character: 'Mina',
  note:
    'Mina is a fictional composite character created for this project. Her route across different cities is a storytelling device that helps compare how digital mutual aid works in different local contexts. The stops draw on public patterns of community care rather than a single documentary case.',
};

export const coreQuestions = [
  {
    id: 'q1',
    title:
      'How do digital tools help enable bottom-up community care and mutual aid outside formal institutions and organizations?',
    short:
      'How do digital tools enable bottom-up care?',
  },
  {
    id: 'q2',
    title:
      'What features make digital mutual aid platforms feel trustworthy, accessible, and inclusive to community members?',
    short:
      'What makes mutual aid platforms trustworthy and inclusive?',
  },
  {
    id: 'q3',
    title:
      'How does mutual aid differ from charity or institutional support in terms of power, participation, and reciprocity?',
    short:
      'How is mutual aid different from charity or institutional support?',
  },
];

export const storyChapters = [
  {
    slug: 'toronto',
    step: 1,
    city: 'Toronto',
    country: 'Canada',
    region: 'North America',
    map: { x: 18, y: 24 },
    title: 'The first message',
    subtitle: 'A weekend food gap becomes a community signal.',
    need: 'Mina needs food before the weekend after her part-time shift is cut.',
    hook:
      'In Toronto, Mina learns that a simple chat thread, a shared pantry map, and a few careful design choices can do something formal systems often cannot: respond before the office reopens.',
    story: [
      'Mina is a student who has just lost a shift at work. It is Friday afternoon. Her campus emergency office closes soon, her kitchen is nearly empty, and the weekend is still ahead. On paper there are services she can try. In practice, each one depends on hours, intake, or waiting.',
      'A friend sends her a link to a student mutual aid channel. It is not a polished platform. It is a small network built from a group chat, a shared document, and a simple map of community fridges and free pantries. What matters is that it is active, local, and maintained by people who know the area well.',
      'Within minutes, Mina sees why digital tools matter to bottom-up care. The network does not replace deeper social support, but it reduces delay, shares local knowledge, and lets people coordinate directly. The technology is ordinary. The civic participation is not.',
    ],
    takeawayCards: [
      {
        label: 'Bottom-up response',
        text:
          'Group chats, shared maps, and lightweight forms can coordinate support without waiting for a formal intake desk.',
      },
      {
        label: 'Trust in small signals',
        text:
          'Pinned rules, pickup details, and privacy-conscious posting make a fast response feel safer and more believable.',
      },
      {
        label: 'Reciprocity starts here',
        text:
          'After receiving help, Mina stays in the network by posting updates and later taking a volunteer shift.',
      },
    ],
    chapterLinks: ['q1', 'q2', 'q3'],
    module: {
      type: 'chat',
      title: 'Interactive scene: the first message',
      description:
        'Move through Mina’s first request. Each choice shows how digital mutual aid can lower barriers without turning a need into a formal application.',
      intro:
        'Friday, 4:12 PM. Mina has twelve dollars left, an empty fridge, and less than an hour before the campus office closes.',
      rounds: [
        {
          prompt: 'How should Mina ask for help first?',
          choices: [
            {
              label:
                'Post a short request in the student mutual aid chat with her general area and what she needs for the weekend.',
              response:
                'A volunteer answers with a pantry map, a nearby pickup point, and a note that a grocery card is available tonight.',
              insight:
                'Bottom-up care works because requests reach people who already share local knowledge and can respond quickly.',
            },
            {
              label:
                'Wait until Monday and fill out the official emergency request form instead.',
              response:
                'The form may still help later, but the weekend gap remains unsolved right now.',
              insight:
                'Institutional support can matter a great deal, but mutual aid often fills the gap created by time, delay, and office hours.',
            },
            {
              label:
                'Post her full address and phone number publicly on every account she has.',
              response:
                'People might respond, but sharing more than necessary can create new risks and make the request feel less safe.',
              insight:
                'Trust is tied to privacy. Good mutual aid spaces make it possible to ask for help without oversharing.',
            },
          ],
        },
        {
          prompt: 'The chat asks how to make the post clearer. What detail helps most?',
          choices: [
            {
              label:
                'Add whether she can walk or needs pickup, plus any food restrictions.',
              response:
                'Now people can match practical help to the situation instead of guessing.',
              insight:
                'Accessible communication is not just about readability. It is also about giving the network the right level of practical information.',
            },
            {
              label: 'Write only “help please” and leave the rest unclear.',
              response:
                'People still want to help, but several follow-up messages are needed before anyone can act.',
              insight:
                'Clarity reduces friction. Small details can make a platform easier and faster to use.',
            },
            {
              label:
                'Replace the message with a long graphic full of tiny text and several screenshots.',
              response:
                'The post looks polished, but it becomes harder to read on a phone or low-bandwidth connection.',
              insight:
                'Inclusive design often means choosing readable, lightweight communication over visual polish.',
            },
          ],
        },
        {
          prompt: 'Someone brings groceries and shares a community fridge link. What keeps the network reciprocal?',
          choices: [
            {
              label:
                'Mina thanks the group, updates the pantry map, and signs up for a future volunteer shift when she can.',
              response:
                'Receiving help becomes part of staying connected to the network instead of a fixed identity as a recipient.',
              insight:
                'Mutual aid is reciprocal. People can give, receive, and remain part of the same community over time.',
            },
            {
              label: 'The network closes the thread and never records what worked.',
              response:
                'The immediate need is met, but useful information for the next person disappears.',
              insight:
                'Digital mutual aid also depends on shared learning, archived updates, and visible coordination.',
            },
            {
              label:
                'The group asks Mina to prove she deserves support before anyone helps again.',
              response:
                'Some caution may be understandable, but heavy gatekeeping changes the space into something more like formal intake.',
              insight:
                'Mutual aid usually tries to reduce unnecessary barriers rather than reproduce institutional checks.',
            },
          ],
        },
      ],
      completion:
        'By the end of the weekend, Mina has food, a clearer sense of the local network, and a new understanding of digital citizenship as participation in care.',
    },
  },
  {
    slug: 'sao-paulo',
    step: 2,
    city: 'São Paulo',
    country: 'Brazil',
    region: 'South America',
    map: { x: 30, y: 72 },
    title: 'Stories, sheets, and shared routes',
    subtitle: 'Community care becomes visible when coordination is public enough to join.',
    need:
      'A neighbourhood fridge is running low before a holiday weekend, and the network needs to respond quickly.',
    hook:
      'In São Paulo, Mina sees how digital mutual aid can be creative, visible, and collective. The technology is simple, but the coordination is skillful.',
    story: [
      'Mina reaches a neighbourhood where a community fridge sits outside a local storefront. It works because many kinds of labour happen around it: people cook, cycle, deliver, clean, translate, repost updates, and notice when the shelves are nearly empty.',
      'The online side of the network is modest but effective. Organizers use short social posts, a shared volunteer sheet, and quick location updates to coordinate who can pick up donations and where food is available. Nothing here looks like a large platform. But the network behaves like infrastructure because people maintain it together.',
      'This stop expands the project beyond emergency response. Digital mutual aid is also about community building, learning, and creativity. It invites people into a process rather than presenting care as a service delivered from above.',
    ],
    takeawayCards: [
      {
        label: 'Community building',
        text:
          'Public updates and shared task lists help neighbours see where they can join, not just where they can consume.',
      },
      {
        label: 'Creativity matters',
        text:
          'Stories, reposts, location pins, and volunteer sheets become a flexible coordination system when used well.',
      },
      {
        label: 'Learning through action',
        text:
          'The network improves because people document what ran low, what moved quickly, and what should change next time.',
      },
    ],
    chapterLinks: ['q1', 'q2'],
    module: {
      type: 'timeline',
      title: 'Interactive section: build the response timeline',
      description:
        'Click the events in the order that best supports a neighbourhood fridge response. Think about visibility, logistics, and what the community needs to know first.',
      events: [
        {
          id: 'signal',
          label: 'A volunteer posts that the fridge is almost empty before the holiday.',
          explanation:
            'Someone has to make the need visible before the network can respond. Digital tools help surface the gap early.',
        },
        {
          id: 'reshare',
          label: 'Organizers repost the update in clear neighbourhood language and note what items are needed most.',
          explanation:
            'A request becomes more actionable when it is specific, locally legible, and easy to share.',
        },
        {
          id: 'routes',
          label: 'Volunteers claim pickup and delivery routes in a shared sheet.',
          explanation:
            'Once the need is clear, coordination tools help distribute work instead of leaving one person to do everything.',
        },
        {
          id: 'map',
          label: 'The public map is updated so residents know where food will be available tonight.',
          explanation:
            'Public-facing information matters because care has to be findable, not just internally organized.',
        },
        {
          id: 'reflect',
          label: 'After distribution, the group records what ran low and what should change next week.',
          explanation:
            'Mutual aid becomes stronger when networks learn from each round of action and carry knowledge forward.',
        },
      ],
      completion:
        'The fridge response works because communication, logistics, and learning stay connected. This is digital citizenship as collaborative public problem-solving.',
    },
  },
  {
    slug: 'warsaw',
    step: 3,
    city: 'Warsaw',
    country: 'Poland',
    region: 'Europe',
    map: { x: 50, y: 20 },
    title: 'Translation before intake',
    subtitle: 'Trust grows when a platform explains itself clearly and respects vulnerability.',
    need:
      'Mina is helping a cousin who has arrived in a new city and cannot easily navigate service pages in the local language.',
    hook:
      'In Warsaw, the problem is not only whether support exists. It is whether people can understand it, trust it, and use it without exposing themselves unnecessarily.',
    story: [
      'Mina is no longer only asking for aid; she is helping someone else find it. A cousin has arrived in the city and can see that resources exist, but most official pages are dense, translated poorly, or written for people who already know the system.',
      'Volunteer-run channels fill part of that gap. A multilingual map, pinned explainers, short voice notes, and private contact options help new arrivals move from confusion to action. The support is still imperfect, but it feels more navigable because it acknowledges what people do not yet know.',
      'This stop focuses on platform design. Trust is not a vague feeling. It is produced through clarity, updates, privacy, language access, and visible expectations about how the space works.',
    ],
    takeawayCards: [
      {
        label: 'Transparency',
        text:
          'People trust a resource more when it explains who runs it, what kinds of help it offers, and how current the information is.',
      },
      {
        label: 'Inclusion',
        text:
          'Language access, accessibility notes, and multiple contact paths help more people actually use a platform.',
      },
      {
        label: 'Safety',
        text:
          'Private contact options and clear norms matter when people are new, displaced, or in vulnerable situations.',
      },
    ],
    chapterLinks: ['q2', 'q3'],
    module: {
      type: 'trust',
      title: 'Interactive section: choose the strongest trust signals',
      description:
        'Select up to four features that would make a mutual aid page easier to trust and use. Aim for clarity, access, safety, and inclusion rather than visual polish alone.',
      maxSelect: 4,
      themeLabels: {
        clarity: 'clarity',
        access: 'access',
        safety: 'safety',
        inclusion: 'inclusion',
      },
      options: [
        {
          id: 'pinned-explainer',
          label: 'A pinned explainer showing who runs the network and what kinds of requests it can handle',
          themes: ['clarity', 'trust'],
          points: 2,
          explanation:
            'This lowers uncertainty and makes the platform feel accountable instead of mysterious.',
        },
        {
          id: 'multilingual',
          label: 'Multilingual text plus a voice-note option for people who are more comfortable speaking than typing',
          themes: ['access', 'inclusion'],
          points: 2,
          explanation:
            'Language and literacy shape whether information is usable at all. Multiple formats widen participation.',
        },
        {
          id: 'access-notes',
          label: 'Map markers that include transit, wheelchair, and opening-hour notes',
          themes: ['access'],
          points: 2,
          explanation:
            'A location is not truly accessible if people do not know how to reach it or what barriers they will face.',
        },
        {
          id: 'private-contact',
          label: 'A private contact pathway so people do not have to post personal details publicly',
          themes: ['safety'],
          points: 2,
          explanation:
            'Privacy options are central to trust, especially for people in precarious situations.',
        },
        {
          id: 'conduct',
          label: 'A short code of conduct and a visible “last updated” date',
          themes: ['clarity', 'safety'],
          points: 2,
          explanation:
            'Visible rules and update rhythms signal that a space is maintained, not abandoned.',
        },
        {
          id: 'donor-wall',
          label: 'A giant donation leaderboard highlighting the top contributors',
          themes: ['status'],
          points: 0,
          explanation:
            'This may reward donors, but it does little to help someone understand or safely use the resource.',
        },
        {
          id: 'video-landing',
          label: 'An autoplay video landing page with heavy graphics and very little text',
          themes: ['style'],
          points: 0,
          explanation:
            'Visual polish can be appealing, but it can also add barriers for mobile users and low-bandwidth connections.',
        },
        {
          id: 'policy-paragraph',
          label: 'One long paragraph of formal policy language with no headings or translations',
          themes: ['formality'],
          points: 0,
          explanation:
            'Dense language often reproduces the same barriers that make institutional systems hard to navigate.',
        },
      ],
      completion:
        'A trustworthy mutual aid platform helps people understand what the resource is, how to use it, and how to stay safe while participating.',
    },
  },
  {
    slug: 'nairobi',
    step: 4,
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    map: { x: 55, y: 44 },
    title: 'Who gets to decide?',
    subtitle: 'Power looks different when support is reciprocal instead of one-directional.',
    need:
      'Transport costs are threatening Mina’s ability to get to work, and she joins a rotating support network that uses mobile tools to coordinate help.',
    hook:
      'In Nairobi, the key question is not only whether support is available. It is who controls it, who participates, and whether people stay part of the network after help is given.',
    story: [
      'Mina meets a local support circle that helps members cover transport, urgent groceries, and sudden costs. The tools are simple: chat updates, mobile money, and a shared record of who needs help this week. The important feature is not technical sophistication. It is how the system distributes voice and responsibility.',
      'In this network, people who have needed help in one moment may be the same people who verify routes, circulate updates, or contribute later. That structure feels different from both charity and formal services. It does not erase inequality, but it changes the social meaning of support.',
      'This stop focuses on power. Mutual aid often tries to organize care horizontally, while charity can reinforce donor-recipient distance and institutions often centralize decisions through policy and administration.',
    ],
    takeawayCards: [
      {
        label: 'Participation',
        text:
          'People are treated as members of a network, not only as clients or recipients.',
      },
      {
        label: 'Power',
        text:
          'Decision-making is often more distributed in mutual aid than in charity or public service systems.',
      },
      {
        label: 'Reciprocity',
        text:
          'Support does not have to move in only one direction. People contribute in different ways when they can.',
      },
    ],
    chapterLinks: ['q3', 'q1'],
    module: {
      type: 'power',
      title: 'Interactive section: sort the support model',
      description:
        'Read each situation and choose whether it sounds most like mutual aid, charity, or institutional support. The goal is to compare how power and participation are organized.',
      choices: [
        { id: 'mutual-aid', label: 'Mutual aid' },
        { id: 'charity', label: 'Charity' },
        { id: 'institutional', label: 'Institutional support' },
      ],
      cards: [
        {
          id: 'vote-fund',
          prompt:
            'Members discuss urgent requests in chat and decide together how to use the shared emergency fund this week.',
          answer: 'mutual-aid',
          explanation:
            'This reflects shared decision-making and collective responsibility rather than top-down distribution.',
        },
        {
          id: 'donor-photo',
          prompt:
            'A campaign posts thank-you photos of donors while recipients have no say in how aid is framed or distributed.',
          answer: 'charity',
          explanation:
            'Charity can help materially, but it often centers donors more than reciprocal participation.',
        },
        {
          id: 'intake-hours',
          prompt:
            'Support is available through listed office hours, formal eligibility checks, and staff-managed appointments.',
          answer: 'institutional',
          explanation:
            'This is a structured service model with centralized rules and delivery processes.',
        },
        {
          id: 'receive-then-help',
          prompt:
            'Someone who received bus fare last month now helps verify route costs and contributes when they are able.',
          answer: 'mutual-aid',
          explanation:
            'Reciprocity is central here. People move between giving and receiving rather than staying fixed in one role.',
        },
        {
          id: 'sponsor-choice',
          prompt:
            'A sponsor chooses who seems most deserving and sets the conditions for how support will be used.',
          answer: 'charity',
          explanation:
            'The donor or sponsor holds the power to decide, which is a key difference from mutual aid.',
        },
        {
          id: 'referral-office',
          prompt:
            'A public office coordinates transport assistance through referrals, forms, and a defined service boundary.',
          answer: 'institutional',
          explanation:
            'This kind of support can be essential, but it is usually governed by administrative procedure rather than reciprocal participation.',
        },
      ],
      completion:
        'The same practical need can be met through very different power relationships. That difference is central to understanding mutual aid.',
    },
  },
  {
    slug: 'manila',
    step: 5,
    city: 'Manila',
    country: 'Philippines',
    region: 'Asia',
    map: { x: 80, y: 46 },
    title: 'Designing for the next storm',
    subtitle: 'Inclusion means building a communication stack that more than one kind of user can enter.',
    need:
      'A storm alert is approaching, and the network must reach people quickly across different devices, languages, and connectivity limits.',
    hook:
      'In Manila, Mina sees that accessibility is not a box to check after a platform is built. It is part of how a network decides who counts and who can act in time.',
    story: [
      'The final stop is future-facing. Mina joins a community group preparing for a storm alert. The challenge is not just to post information. It is to make sure that information travels across phones, bandwidth levels, languages, and neighbourhood habits quickly enough to matter.',
      'The group does not rely on one channel. It stacks them. SMS reaches people with older phones. Voice notes help where text is slow or difficult. A shared map makes supply and shelter locations visible. Volunteers still add context, translation, and follow-up. The digital system works because it expects difference rather than assuming one ideal user.',
      'This chapter ties the whole project together. Digital technologies support positive social change when they help communities coordinate, learn, and widen participation. The design question is always also a civic question: who gets reached, who gets heard, and who gets to help shape the response?',
    ],
    takeawayCards: [
      {
        label: 'Accessibility as infrastructure',
        text:
          'Low-bandwidth tools, translation, and multiple formats are not extras. They determine who can participate.',
      },
      {
        label: 'Layered communication',
        text:
          'The most inclusive networks often use several simple tools together instead of relying on one perfect platform.',
      },
      {
        label: 'Positive social change',
        text:
          'When people can both receive updates and contribute information, digital tools become part of community resilience.',
      },
    ],
    chapterLinks: ['q1', 'q2', 'q3'],
    module: {
      type: 'planner',
      title: 'Interactive section: build the outreach stack',
      description:
        'Choose three communication channels for the storm response. Try to cover speed, low-bandwidth access, translation, and two-way feedback instead of picking only what looks most impressive.',
      maxSelect: 3,
      idealTags: ['speed', 'low-bandwidth', 'translation', 'feedback'],
      tagLabels: {
        speed: 'speed',
        'low-bandwidth': 'low-bandwidth access',
        translation: 'translation or language flexibility',
        feedback: 'two-way feedback',
      },
      options: [
        {
          id: 'sms-tree',
          label: 'SMS tree with short updates and shelter codes',
          tags: ['speed', 'low-bandwidth'],
          points: 2,
          explanation:
            'SMS is fast, lightweight, and useful when people have basic phones or unstable connections.',
        },
        {
          id: 'voice-chain',
          label: 'Voice-note chain in multiple languages through a messaging app',
          tags: ['translation', 'feedback', 'low-bandwidth'],
          points: 2,
          explanation:
            'Voice notes can work well for people who need language flexibility or who are moving quickly.',
        },
        {
          id: 'public-map',
          label: 'Public community map with pinned supply points, routes, and status updates',
          tags: ['feedback', 'speed'],
          points: 2,
          explanation:
            'A map makes distributed information easier to act on, especially when locations change.',
        },
        {
          id: 'livestream',
          label: 'Image-heavy livestream with no text summary',
          tags: ['speed'],
          points: 0,
          explanation:
            'It may feel immediate, but it excludes many users if it depends on strong data and synchronous viewing.',
        },
        {
          id: 'english-form',
          label: 'Long English-only form requiring detailed written answers before help is visible',
          tags: [],
          points: 0,
          explanation:
            'This increases friction and assumes too much time, literacy, and confidence from users under stress.',
        },
        {
          id: 'volunteer-sheet',
          label: 'Shared volunteer sheet for pickups, translations, and supply checks',
          tags: ['feedback'],
          points: 1,
          explanation:
            'This helps coordination, but it works best when paired with outward-facing channels people can actually find.',
        },
      ],
      completion:
        'A good outreach stack is usually layered. Inclusive communication means planning for different devices, habits, and forms of participation at the same time.',
    },
  },
];

export const insightPanels = [
  {
    id: 'q1',
    title:
      'How do digital tools help enable bottom-up community care and mutual aid outside formal institutions and organizations?',
    answer:
      'Digital tools help bottom-up care when they reduce delay, circulate local knowledge, and let ordinary people coordinate directly. The most effective tools in this project are not necessarily the most advanced ones. They are the ones that make help easier to find, request, route, and update in everyday life.',
    evidence: [
      {
        slug: 'toronto',
        title: 'Toronto',
        text:
          'A chat thread and pantry map helped Mina meet an immediate weekend need before a formal office reopened.',
      },
      {
        slug: 'sao-paulo',
        title: 'São Paulo',
        text:
          'Short posts, volunteer sheets, and location updates turned a fridge network into flexible community infrastructure.',
      },
      {
        slug: 'manila',
        title: 'Manila',
        text:
          'A layered outreach stack showed how digital coordination supports community resilience during rapidly changing conditions.',
      },
    ],
    implications: [
      'Low-friction tools can be civic tools when they are maintained collectively.',
      'Bottom-up care often works by linking small pieces of information into a public support network.',
      'Digital citizenship includes the ability to help coordinate and sustain these networks.',
    ],
  },
  {
    id: 'q2',
    title:
      'What features make digital mutual aid platforms feel trustworthy, accessible, and inclusive to community members?',
    answer:
      'Trust grows when a platform explains itself clearly, protects privacy, stays updated, and makes room for different users. Accessibility and inclusion are built through language options, lightweight formats, location notes, and multiple ways to participate. These features help people feel that the platform was made with them in mind rather than simply placed in front of them.',
    evidence: [
      {
        slug: 'warsaw',
        title: 'Warsaw',
        text:
          'Multilingual guides, voice notes, private contact options, and visible update dates turned a confusing information space into a usable one.',
      },
      {
        slug: 'toronto',
        title: 'Toronto',
        text:
          'Privacy-conscious posting and clear practical details helped Mina ask for help without oversharing.',
      },
      {
        slug: 'manila',
        title: 'Manila',
        text:
          'Low-bandwidth messaging and layered channels showed that inclusion depends on planning for different users, not one ideal user.',
      },
    ],
    implications: [
      'A platform feels trustworthy when it is transparent, current, and respectful of vulnerability.',
      'Accessibility is not only visual; it also includes language, bandwidth, mobility, privacy, and social confidence.',
      'Inclusive mutual aid spaces widen participation by offering more than one way in.',
    ],
  },
  {
    id: 'q3',
    title:
      'How does mutual aid differ from charity or institutional support in terms of power, participation, and reciprocity?',
    answer:
      'Mutual aid differs because it tries to organize care through reciprocal participation rather than one-way giving or centralized administration. Charity can still provide support, and institutions can be essential, but they usually position people differently. Mutual aid is distinct in how it invites people to remain part of the network as contributors, witnesses, organizers, and recipients over time.',
    evidence: [
      {
        slug: 'nairobi',
        title: 'Nairobi',
        text:
          'The rotating support network used shared decision-making and flexible contribution rather than donor control or formal intake.',
      },
      {
        slug: 'toronto',
        title: 'Toronto',
        text:
          'Mina moved from receiving groceries to updating the map and later volunteering, which made reciprocity visible.',
      },
      {
        slug: 'warsaw',
        title: 'Warsaw',
        text:
          'Volunteer-run guidance helped people navigate systems without fully reproducing institutional hierarchy.',
      },
    ],
    implications: [
      'Power matters: who decides, who is visible, and who is invited to participate shapes the meaning of support.',
      'Mutual aid often reduces the distance between helper and helped, even when resources remain unequal.',
      'The project does not reject institutional support; it shows that mutual aid solves different problems in different ways.',
    ],
  },
];

export const audienceGuides = [
  {
    id: 'students',
    title: 'Student organizations and campus groups',
    why:
      'Campus communities often already use chats, spreadsheets, forms, and social accounts. This project shows how those same tools can be organized more intentionally for care, not only promotion.',
    useCases: [
      'Map mutual aid resources, campus supports, and off-campus services side by side.',
      'Publish simple posting norms so requests feel safe and specific.',
      'Create multiple ways to participate: donate, restock, translate, verify information, or accompany someone to a resource.',
    ],
    related: ['toronto', 'manila'],
  },
  {
    id: 'organizers',
    title: 'Community organizers and small nonprofits',
    why:
      'The story map highlights how trust is built through visibility, update rhythms, and respectful design. Organizers can use it to think through both communication strategy and participation design.',
    useCases: [
      'Audit whether your public-facing channels explain who runs the network and how help is shared.',
      'Use layered communication rather than relying on a single platform or one high-bandwidth format.',
      'Document what participants learn after each response so the network becomes easier to navigate over time.',
    ],
    related: ['sao-paulo', 'warsaw', 'manila'],
  },
  {
    id: 'individuals',
    title: 'Individuals looking for support or ways to contribute',
    why:
      'People often need a low-pressure way to understand what mutual aid is, how to ask for help, and how to contribute responsibly. The story format makes that easier to learn.',
    useCases: [
      'See that asking for help can be part of participation rather than a sign of failure.',
      'Learn what kinds of details make a request easier to act on without oversharing.',
      'Find concrete roles beyond donating money: translation, rides, updates, verification, and follow-up.',
    ],
    related: ['toronto', 'nairobi'],
  },
];

export const furtherReading = [
  {
    id: 'spade-2020',
    author: 'Spade, D.',
    year: 2020,
    title: 'Mutual Aid: Building Solidarity During This Crisis (and the Next)',
    publisher: 'Verso Books',
    note: 'A foundational text on how mutual aid differs from charity and state services, with practical guidance for building networks.',
  },
  {
    id: 'kropotkin-1902',
    author: 'Kropotkin, P.',
    year: 1902,
    title: 'Mutual Aid: A Factor of Evolution',
    publisher: 'William Heinemann',
    note: 'The classic argument that cooperation, not only competition, drives survival and social organization.',
  },
  {
    id: 'solnit-2009',
    author: 'Solnit, R.',
    year: 2009,
    title: 'A Paradise Built in Hell: The Extraordinary Communities That Arise in Disaster',
    publisher: 'Viking',
    note: 'Documents how communities self-organize during crises, often outperforming formal institutions in the immediate aftermath.',
  },
  {
    id: 'costanza-chock-2020',
    author: 'Costanza-Chock, S.',
    year: 2020,
    title: 'Design Justice: Community-Led Practices to Build the Worlds We Need',
    publisher: 'MIT Press',
    note: 'Explores how design processes can center the voices of those most affected by outcomes, directly relevant to platform trust and inclusion.',
  },
  {
    id: 'big-door-brigade',
    author: 'Big Door Brigade',
    year: 2020,
    title: 'What Is Mutual Aid?',
    publisher: null,
    note: 'A widely shared introductory explainer that distinguishes mutual aid from charity and social services.',
  },
];

export const responsiblePractice = [
  'Verify public information before sharing it widely, especially hours, locations, and contact methods.',
  'Avoid pressuring people to disclose more personal information than they need to access support.',
  'Offer more than one way to participate so care is not limited to people with money, time, or strong internet access.',
  'Document what worked and what was confusing so the next person encounters fewer barriers.',
];
