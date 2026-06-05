import { readFileSync, writeFileSync } from 'fs';

// Parse KML
const kml = readFileSync('public/data/Map of Tiny House Villages.kml', 'utf8');

// Extract all placemarks
const placemarks = [];
const pmRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g;
let match;
while ((match = pmRegex.exec(kml)) !== null) {
  const block = match[1];
  const get = (field) => {
    const r = new RegExp(`<Data name="${field}">\\s*<value>(.*?)<\\/value>`, 's');
    const m = r.exec(block);
    return m ? m[1].trim() : '';
  };
  const addrMatch = /<address>(.*?)<\/address>/.exec(block);
  const location = get('Location') || (addrMatch ? addrMatch[1].trim() : '');
  const name = get('Name of Project') || location;
  const website = get('Web site') || '';
  if (location) placemarks.push({ name, location, website });
}

console.log(`Parsed ${placemarks.length} placemarks from KML`);

// Load existing geocoded data
const existing = JSON.parse(readFileSync('public/data/villages.json', 'utf8'));
const existingKeys = new Set(existing.map(v => `${v.name}|${v.location}`));

// Find new entries
const newEntries = placemarks.filter(p => !existingKeys.has(`${p.name}|${p.location}`));
console.log(`${newEntries.length} new entries to geocode`);
newEntries.forEach(e => console.log(' -', e.name, '|', e.location));

async function geocode(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TinyVillageSpirit/1.0 (tinyvillagespirit@gmail.com)' }
  });
  const data = await res.json();
  if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  return null;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const results = [...existing];
for (let i = 0; i < newEntries.length; i++) {
  const v = newEntries[i];
  process.stdout.write(`[${i+1}/${newEntries.length}] ${v.name} (${v.location})... `);
  const coords = await geocode(v.location);
  if (coords) {
    results.push({ ...v, lat: coords.lat, lng: coords.lng });
    console.log(`✓ ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`);
  } else {
    results.push({ ...v, lat: null, lng: null });
    console.log('✗ not found');
  }
  await sleep(1100);
}

writeFileSync('public/data/villages.json', JSON.stringify(results, null, 2));
console.log(`\nDone. ${results.filter(r => r.lat).length}/${results.length} total geocoded.`);
