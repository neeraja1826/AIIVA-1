import { images } from './images';

export const scenes = [
{
  name: 'Good Morning',
  trigger: 'Weekdays at 06:45',
  image: images.morning,
  dim: [0.7, 0.5, 0.28, 0.12],
  steps: [
  { label: 'Curtains open', detail: 'Bedroom & living · sunrise pace' },
  { label: 'Lights brighten', detail: 'Warm 2700K to daylight 4000K' },
  { label: 'Climate adjusts', detail: 'Warming to 21.5°C' }]

},
{
  name: 'Movie Night',
  trigger: 'One touch on the remote',
  image: images.theatre,
  dim: [0.15, 0.4, 0.55, 0.35],
  steps: [
  { label: 'Lights dim', detail: 'Aisle glow · 5%' },
  { label: 'Curtains close', detail: 'Blackout in 12 seconds' },
  { label: 'Theatre actaiivates', detail: 'Projector, Atmos and lift' }]

},
{
  name: 'Good Night',
  trigger: 'Bedside panel or “Good night”',
  image: images.bedroom,
  dim: [0.15, 0.4, 0.55, 0.68],
  steps: [
  { label: 'Lights switch off', detail: 'Whole house, except path lights' },
  { label: 'Doors lock', detail: 'Front, garage and terrace' },
  { label: 'Security actaiivates', detail: 'Night mode · perimeter only' }]

},
{
  name: 'Away Mode',
  trigger: 'When the last phone leaves',
  image: images.night,
  dim: [0.1, 0.3, 0.45, 0.55],
  steps: [
  { label: 'Security actaiivates', detail: 'All zones armed · cameras live' },
  { label: 'Devices switch off', detail: 'Standby loads cut automatically' },
  { label: 'Presence simulation', detail: 'Lights follow your routine' }]

}];