import { images } from './images';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  group: 'Master Panels' | 'Fan Controls' | 'Modular Switches';
  subtitle: string;
  image: string;
  features: string[];
  specs: { label: string; val: string }[];
  tag: string;
}

export const productsData: ProductItem[] = [
  {
    id: 'switch-12g-fan-socket',
    name: '12-Gang Touch Panel + Fan & Socket',
    category: 'Smart Switches',
    group: 'Master Panels',
    subtitle: 'Flagship Luxury Villa Master Controller with 12 Relay Channels, Digital Fan & Socket',
    image: images.switch12gFanSocket,
    tag: 'Flagship Master',
    features: [
      '12 Independent Feather-Touch Capacitive Switch Points',
      'Integrated Digital Fan Speed Regulator with Up/Down Arrows',
      'Universal Heavy-Duty Power Socket with Dedicated Touch Switch',
      'Soft White Backlit LED Status (Active / Standby / Night Glow)',
      'Retrofit Compatible with Standard Indian Back-Boxes without Alterations',
      'Full App & Voice Automation (Alexa, Google Assistant, Apple Siri)',
    ],
    specs: [
      { label: 'Form Factor', val: '12M / 16M Modular Standard' },
      { label: 'Connectivity', val: 'Wi-Fi 2.4GHz / Zigbee 3.0 / BLE' },
      { label: 'Operating Voltage', val: '110V - 250V AC, 50/60Hz' },
      { label: 'Touch Surface', val: '4mm Toughened Crystal Glass' },
    ],
  },
  {
    id: 'switch-8g-fan-socket',
    name: '8-Gang Touch Panel + Fan & Dual Socket',
    category: 'Smart Switches',
    group: 'Master Panels',
    subtitle: 'All-in-one Master Panel with Stepless Fan Regulation & Twin Universal Sockets',
    image: images.switch8gFanSocket,
    tag: 'Master Controller',
    features: [
      '8 Feather-Touch Capacitive Switch Points',
      'Integrated Fan Speed Regulator with Up/Down Arrows',
      'Dual Universal Power Outlets with Individual Switch Controls',
      'Backlit LED Indicators with Soft Night Illumination',
      'Scene Recall & Multi-way Switching Integration',
      'Surge Protection & Fire-Retardant Polycarbonate Base',
    ],
    specs: [
      { label: 'Form Factor', val: '8M / 12M Modular Standard' },
      { label: 'Connectivity', val: 'Wi-Fi / Zigbee 3.0 / Matter Ready' },
      { label: 'Load Capacity', val: 'Up to 1000W / gang (Capacitive)' },
      { label: 'App Control', val: 'AIIVA Smart App (iOS & Android)' },
    ],
  },
  {
    id: 'switch-10g-socket',
    name: '10-Gang Touch Switch Panel + Dual Socket',
    category: 'Smart Switches',
    group: 'Master Panels',
    subtitle: 'High-Density Smart Control Panel for Living Rooms & Master Suites',
    image: images.switch10gSocket,
    tag: 'High Density',
    features: [
      '10 Independent Smart Touch Relays for Lighting & Appliances',
      'Dual Power Outlets with Individual Switch Controls',
      'Surge Protection & Fire-Retardant Polycarbonate Base',
      'Easy Snap-On Installation without Wall Alterations or Rewiring',
      'Local Manual Touch + Cloud Remote Automation',
    ],
    specs: [
      { label: 'Form Factor', val: '12M Modular Grid' },
      { label: 'Life Cycle', val: '100,000+ Touch Operations' },
      { label: 'Response Time', val: '< 20ms Ultra-Fast Response' },
      { label: 'Finish', val: 'Midnight Obsidian Black Glass' },
    ],
  },
  {
    id: 'switch-8g-single-socket',
    name: '8-Gang Touch Switch Panel + Single Socket',
    category: 'Smart Switches',
    group: 'Master Panels',
    subtitle: 'Streamlined 8-Channel Lighting Panel with Integrated Universal Power Point',
    image: images.switch8gSingleSocket,
    tag: 'Linear Master',
    features: [
      '8 Precision Touch Relays in Horizontal Arrangement',
      '1 Heavy-Duty Universal Socket with Touch Switch',
      'Feather-Touch Glass with Scratch & Moisture Resistance',
      'Timer, Automation & Schedule Routines via App',
      'Direct Voice Control with Smart Assistants',
    ],
    specs: [
      { label: 'Form Factor', val: '8M Horizontal Modular' },
      { label: 'Connectivity', val: 'Wi-Fi 2.4GHz / Zigbee' },
      { label: 'Power Consumption', val: '< 0.3W Standby' },
      { label: 'Warranty', val: 'AIIVA Local Warranty Support' },
    ],
  },
  {
    id: 'switch-4g-fan',
    name: '4-Gang Touch Switch + Fan Speed Regulator',
    category: 'Smart Switches',
    group: 'Fan Controls',
    subtitle: 'Essential Bedroom & Study Room Touch Panel with Dedicated Stepless Fan Speed Regulation',
    image: images.switch4gFan,
    tag: 'Fan Controller',
    features: [
      '4 Independent Lighting & Appliance Touch Points',
      'Dedicated Digital Fan Speed Regulator with Step Controls',
      'Hum-Free Silent Electronic Fan Speed Control',
      'Backlit Icons for Easy Night Navigation',
      'Fits Standard 4M/6M Horizontal Wall Boxes',
    ],
    specs: [
      { label: 'Form Factor', val: '4M / 6M Modular Box' },
      { label: 'Fan Control', val: 'Silent Electronic Multi-step' },
      { label: 'Voltage', val: '110V - 240V AC' },
      { label: 'Wireless Protocol', val: 'Wi-Fi / Zigbee' },
    ],
  },
  {
    id: 'switch-fan-regulator',
    name: 'Digital Fan Speed Regulator Panel (Square)',
    category: 'Smart Switches',
    group: 'Fan Controls',
    subtitle: 'Ultra-Compact Modular Smart Fan Regulator with Precision Feather-Touch Up/Down Controls',
    image: images.switchFanRegulator,
    tag: 'Dedicated Regulator',
    features: [
      'Micro-Step Electronic Fan Speed Regulation (Hum-Free)',
      'Feather-Touch Up and Down Arrow Controls',
      'Illuminated Fan Speed Status & Indicator',
      'Voice & Remote App Speed Adjustment (0% - 100%)',
      'Compact Modular Square Form Factor',
    ],
    specs: [
      { label: 'Form Factor', val: '2M / Modular Square' },
      { label: 'Load Support', val: 'Up to 100W Ceiling Fan' },
      { label: 'Technology', val: 'Zero-Cross Triac Dimming' },
      { label: 'Finish', val: 'Gloss Tempered Obsidian Glass' },
    ],
  },
  {
    id: 'switch-8g-horizontal',
    name: '8-Gang Horizontal Touch Switch Panel',
    category: 'Smart Switches',
    group: 'Modular Switches',
    subtitle: 'Architectural Horizontal Form Factor for Clean Wall Aesthetics',
    image: images.switch8gHorizontal,
    tag: 'Architectural',
    features: [
      '8 Low-Profile Gang Points in Linear Arrangement',
      'Dual-State LED Status Indicators (Active / Idle)',
      'Custom Scene Shortcuts & Grouping Support',
      'Moisture-Proof & Shock-Proof Glass Surface',
      'Easy Snap-On Installation without Wall Alterations',
    ],
    specs: [
      { label: 'Mounting', val: 'Standard 6M / 8M Horizontal Box' },
      { label: 'Response Time', val: '< 20ms Ultra-Fast Touch' },
      { label: 'Protocols', val: 'Zigbee 3.0 / Matter / BLE' },
      { label: 'Finish', val: 'Midnight Obsidian Black' },
    ],
  },
  {
    id: 'switch-4g-square',
    name: '4-Gang Modular Touch Switch Panel (Square)',
    category: 'Smart Switches',
    group: 'Modular Switches',
    subtitle: 'Minimalist Square Touch Panel for Bedrooms, Entryways & Corridor Control',
    image: images.switch4gSquare,
    tag: 'Compact Modular',
    features: [
      '4 Independent Precision Touch Zones',
      'Sleek Chamfered Glass Finish with Anti-Scratch Coating',
      'Instant Local Feedback & Remote Mobile Status',
      'Timer, Automation & Schedule Automation',
      'No Neutral Required / Standard Wiring Options',
    ],
    specs: [
      { label: 'Form Factor', val: 'Standard 2M / 4M Modular Square' },
      { label: 'Power Consumption', val: '< 0.2W Standby' },
      { label: 'Panel Glass', val: '4mm Tempered Glass' },
      { label: 'Control', val: 'Touch, App, Voice & Automation' },
    ],
  },
];

export const productCategories = [
  {
    title: 'Smart Touch Switches',
    desc: 'Feather-touch tempered glass panels with micro-LED status, fan regulators, sockets and retrofit compatibility.',
    count: '8 Models Available',
  },
  {
    title: 'Controllers & Hubs',
    desc: 'Central intelligence hubs supporting local-first automation, Zigbee, Matter, DALI and KNX integration.',
    count: 'Multi-Protocol Hubs',
  },
  {
    title: 'Smart Sensors',
    desc: 'Discreet motion, presence, door/window, luminance, and temperature sensors for zero-touch routines.',
    count: 'Battery & Wired',
  },
  {
    title: 'Security & Access',
    desc: 'Smart biometric door locks, video doorbells, access cards, and integrated perimeter monitoring.',
    count: 'Encrypted Access',
  },
];
