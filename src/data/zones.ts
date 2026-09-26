import { images } from './images';

export const zones = [
{
  name: 'Living Room',
  image: images.living,
  description:
  'Evening light that follows the sun down, sheer curtains that soften the view, and music that finds you.',
  features: [
  { label: 'Lighting', value: 'Evening · 45%', x: 38, y: 18 },
  { label: 'Curtains', value: 'Sheer · half', x: 72, y: 30 },
  { label: 'Entertainment', value: 'Ambient audio', x: 56, y: 48 },
  { label: 'Climate', value: '22.5°C', x: 80, y: 62 }]

},
{
  name: 'Bedroom',
  image: images.bedroom,
  description:
  'Warm, dimming light and a cooled room signal the end of the day. Blackouts draw themselves.',
  features: [
  { label: 'Lighting', value: 'Warm dim · 15%', x: 44, y: 22 },
  { label: 'Climate', value: '20°C for sleep', x: 76, y: 20 },
  { label: 'Curtains', value: 'Blackout closing', x: 68, y: 44 },
  { label: 'Sleep Scene', value: 'Starts 22:30', x: 52, y: 60 }]

},
{
  name: 'Kitchen',
  image: images.kitchen,
  description:
  'Task lighting, appliances and air quality working quietly in the background while you cook.',
  features: [
  { label: 'Lighting', value: 'Task · 80%', x: 46, y: 16 },
  { label: 'Appliances', value: 'Oven 180° ready', x: 74, y: 34 },
  { label: 'Air Quality', value: 'Purifier auto', x: 60, y: 52 },
  { label: 'Energy', value: 'Off-peak mode', x: 82, y: 64 }]

},
{
  name: 'Entrance',
  image: images.entrance,
  description:
  'A door that recognises you, cameras that never sleep, and a porch lit before you arrive.',
  features: [
  { label: 'Smart Lock', value: 'Locked · 2 users', x: 50, y: 44 },
  { label: 'CCTV', value: 'Recording', x: 70, y: 18 },
  { label: 'Security', value: 'Perimeter armed', x: 80, y: 42 },
  { label: 'Lighting', value: 'Step lights on', x: 62, y: 66 }]

},
{
  name: 'Outdoor',
  image: images.outdoor,
  description:
  'Gardens, pool and perimeter lighting choreographed to dusk — and watched over after dark.',
  features: [
  { label: 'Landscape', value: 'Sunset trigger', x: 40, y: 24 },
  { label: 'Pool', value: 'Heating · 28°C', x: 62, y: 56 },
  { label: 'Irrigation', value: 'Daily · 06:00', x: 80, y: 34 },
  { label: 'Security', value: 'Motion zones on', x: 76, y: 66 }]

}];