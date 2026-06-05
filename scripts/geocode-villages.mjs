// Geocodes all village addresses via Nominatim and writes public/data/villages.json
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

const villages = [
  { name: "Tiny House Project", location: "Los Angeles, CA", website: "https://www.thetinyhouse.org/" },
  { name: "A Tiny Home for Good", location: "Syracuse, New York", website: "https://www.atinyhomeforgood.org/" },
  { name: "Infinity Village", location: "Nashville, Tennessee", website: "https://www.gofundme.com/f/homelessvillage" },
  { name: "Othello Village", location: "Seattle, Washington", website: "https://lihihousing.org" },
  { name: "Second Wind Cottages", location: "Newfield, New York", website: "https://www.secondwindcottages.org/" },
  { name: "The Cottages at Hickory Crossing", location: "Dallas, Texas", website: "https://www.citysquare.org/" },
  { name: "Community First! Village", location: "Austin, Texas", website: "https://mlf.org/community-first/" },
  { name: "Quixote Communities", location: "Olympia, Washington", website: "https://www.quixotecommunities.org/" },
  { name: "Dignity Village", location: "Portland, Oregon", website: "https://dignityvillage.org/" },
  { name: "Hope the Mission", location: "Pacoima, CA", website: "https://www.hopeofthevalley.org/" },
  { name: "Eden Village USA", location: "Springfield, MO", website: "https://edenvillageusa.org/" },
  { name: "Colorado Village Collaborative", location: "Denver, CO", website: "https://www.coloradovillagecollaborative.org/" },
  { name: "Avivo Village", location: "Minneapolis, MN", website: "https://avivomn.org/" },
  { name: "Occupy Madison Village", location: "Madison, Wisconsin", website: "https://occupymadisoninc.com/" },
  { name: "Tiny Home Detroit", location: "Detroit, MI", website: "https://casscommunity.org/" },
  { name: "Our Calling", location: "Dallas, TX", website: "https://www.ourcalling.org/home/" },
  { name: "The Other Side Village", location: "Salt Lake City, UT", website: "https://theothersidevillage.com/" },
  { name: "Plum Street Village", location: "Olympia, WA", website: "https://www.olympiawa.gov/" },
  { name: "Operation Tiny House", location: "Dallas, TX", website: "https://www.operationtinyhouse.org/" },
  { name: "Sound Foundation NW", location: "Seattle, WA", website: "https://www.soundfoundationsnw.org/" },
  { name: "Hope's Village of SLO", location: "Templeton, CA", website: "https://hopesvillageofslo.com/" },
  { name: "Cove at Dundee--Tiny House Project", location: "Savannah, GA", website: "https://www.homelessauthority.org/" },
  { name: "TOJ Tiny Home Homeless Project", location: "Dallas, TX", website: "https://www.cmoretinyhomevillages.org/" },
  { name: "The Block Project", location: "Seattle, WA", website: "https://www.the-block-project.org/" },
  { name: "San Gabriel Valley Regional Housing Trust", location: "Monrovia, CA", website: "https://www.sgvrht.org/tinyhomes" },
  { name: "Square One Village", location: "Eugene, OR", website: "https://www.squareonevillages.org/" },
  { name: "Goodness Village", location: "Livermore, CA", website: "https://gvlivermore.org/" },
  { name: "Pallet Shelter", location: "Everett, WA", website: "https://palletshelter.com/" },
  { name: "Community Roots", location: "Vancouver, WA", website: "https://www.c-roots.org/" },
  { name: "Edmonds Unitarian Universalist Congregation", location: "Edmonds, WA", website: "https://euuc.org/tiny-houses/" },
  { name: "House of Hope of the Pee Dee", location: "Florence, SC", website: "https://hofh.org/" },
  { name: "The Tiny Village", location: "Knoxville, TN", website: "https://tinyvillageknox.com/" },
  { name: "Tiny House Ministries", location: "Anabel, MO", website: "https://www.tinyhouseministries.org/" },
  { name: "Dignity Moves", location: "San Francisco, CA", website: "https://dignitymoves.org/" },
  { name: "Everhart Village", location: "Chico, CA", website: "https://www.chicohousingactionteam.net/" },
  { name: "The Villages at Cabrillo", location: "Long Beach, CA", website: "https://centuryvillages.org/" },
  { name: "Beloved Community Village", location: "Denver, CO", website: "https://www.coloradovillagecollaborative.org/" },
  { name: "Low Income Housing Institute", location: "Seattle, WA", website: "https://lihi.org/tiny-houses/" },
  { name: "James A Pearson Veterans Village", location: "Racine, WI", website: "https://vetsoutreachwi.us/vets-village/" },
  { name: "Community Supported Shelters", location: "Eugene, OR", website: "https://communitysupportedshelters.org/" },
  { name: "Homeless 2 Home", location: "Daytona Beach, FL", website: "https://homeless2home.org/" },
  { name: "Veterans Village", location: "St. Louis, MO", website: "https://www.veteranscommunityproject.org/" },
  { name: "Esperanza Villa", location: "Baldwin Park, CA", website: "https://www.sgvrht.org/esperanzavilla" },
  { name: "Serenity Home Family Site", location: "Baldwin Park, CA", website: "https://www.sgvrht.org/familysite" },
  { name: "Operation Stay Safe", location: "Montebello, CA", website: "https://www.sgvrht.org/operationstaysafe" },
  { name: "Dome Village", location: "Los Angeles, CA", website: "http://domevillage.tedhayes.us/" },
  { name: "Branford Village Tiny Homes", location: "Sun Valley, Los Angeles, CA", website: "" },
  { name: "Turning Point", location: "Ventura, CA", website: "https://turningpointfoundation.org/" },
  { name: "Petaluma People's Village", location: "Petaluma, CA", website: "https://cityofpetaluma.org/peoplesvillage/" },
  { name: "Genesis Joy House Homeless Shelter", location: "Warner Robins, GA", website: "https://genesisjoyhouse.com/" },
  { name: "5Cities Homeless Coalition", location: "Grover Beach, CA", website: "https://www.5chc.org/" },
  { name: "Affordable Homeless Housing Alternative", location: "Eureka, CA", website: "https://www.ahha-humco.org/" },
  { name: "Alpha Project for the Homeless", location: "San Diego, CA", website: "https://www.alphaproject.org/" },
  { name: "Bakersfield-Kern Regional Homeless Collaborative", location: "Bakersfield, CA", website: "https://bkrhc.org/" },
  { name: "BD Wise Ministry to the Homeless", location: "Downey, CA", website: "https://www.bdwise4u.org/" },
  { name: "Betty Fund Homes for the Homeless", location: "Laguna Niguel, CA", website: "https://bettyfund.org/" },
  { name: "The Betty Kwan Chinn Homeless Foundation", location: "Eureka, CA", website: "https://www.bettychinn.org/" },
  { name: "Carmichael Hart Homeless Assistant Resource Team", location: "Carmichael, CA", website: "https://carmichaelhart.org/" },
  { name: "CCAM New Beginnings Homeless Center", location: "Fayetteville, AR", website: "https://newbeginningsnwa.org/" },
  { name: "Coalition of Tracy Citizens to Assist the Homeless", location: "Tracy, CA", website: "https://tracyhomeless.com/" },
  { name: "Community Homeless Solutions", location: "Marina, CA", website: "https://www.communityhomelesssolutions.org/" },
  { name: "Eco Villages for the Homeless", location: "Laguna Beach, CA", website: "https://ecovillagesforthehomeless.org/" },
  { name: "Homeless Action Coalition", location: "Martinez, CA", website: "https://homelessactioncoalition.org/" },
  { name: "Homeless Action Brentwood", location: "Los Angeles, CA", website: "https://homelessactionofbrentwood.org/" },
  { name: "Coalition for the Homeless", location: "New York, NY", website: "https://www.coalitionforthehomeless.org/" },
  { name: "Homeless First Inc", location: "Orinda, CA", website: "https://hfal.org/" },
  { name: "Homeless No More Inc", location: "Los Angeles, CA", website: "https://www.homelessnomoresc.org/" },
  { name: "Homeless Solution Foundation", location: "San Bernardino, CA", website: "https://homelesssolutions.org/" },
  { name: "Oak Park Homeless Project", location: "Sacramento, CA", website: "https://www.endhomelessnessoakpark.com/" },
  { name: "Open Source Homelessness Initiative", location: "Los Angeles, CA", website: "https://oshi-la.org/" },
  { name: "Tiny Home Objective", location: "Agate, CO", website: "https://tinyhomeobjective.com/" },
  { name: "Tiny Houses in the Name of Christ", location: "Langley, WA", website: "https://thincwhidbey.com/" },
  { name: "Tiny House Hand Up Inc", location: "Calhoun, GA", website: "" },
  { name: "Idaho Tiny House Association", location: "Boise, ID", website: "https://www.mightycause.com/" },
  { name: "Tiny House Community Development", location: "Greensboro, NC", website: "https://www.tinyhousesgreensboro.com/" },
  { name: "Tiny Home Village at Bernalillo", location: "Bernalillo, NM", website: "https://www.bernco.gov/" },
  { name: "Tiny Cottage Concept", location: "Mississippi", website: "https://www.tinycottageconcept.com/" },
  { name: "Tiny House Alliance USA", location: "Marlin, WA", website: "https://www.tinyhouseallianceusa.org/" },
  { name: "Hand in Hand", location: "Brunswick, GA", website: "https://handinhandofglynn.org/" },
  { name: "City Lights Foundation of Oklahoma", location: "Tulsa, OK", website: "https://www.citylightsok.org/" },
  { name: "CJK Community Homes", location: "Tacoma, WA", website: "https://cjkcommunityhomes.org/" },
  { name: "YSA Tiny House Empowerment Village", location: "Oakland, CA", website: "https://youthspiritartworks.org/" },
  { name: "Small House Society", location: "Iowa City, IA", website: "https://smallhousesociety.net/" },
  { name: "Tiny Home Village at the Farm at Penny Lane", location: "Pittsboro, NC", website: "https://tinyhomes.web.unc.edu/" },
  { name: "Tiny Pine Foundation", location: "Oroville, CA", website: "https://www.tinypinefoundation.org/" },
  { name: "Homes on Wheels Alliance", location: "Pahrump, NV", website: "https://homesonwheelsalliance.org/" },
  { name: "Street Life Project", location: "Coachella Valley, CA", website: "https://www.streetlifeproject.com/" },
  { name: "Big Skills Tiny Homes", location: "Marin County, CA", website: "https://bigskillstinyhomes.org/" },
  { name: "Working Fusion", location: "Colorado", website: "https://workingfusion.com/" },
  { name: "Richmond Tiny House Village, Farm & Garden", location: "Richmond, CA", website: "https://tinyvillagespirit.org/projects/richmond" },
  { name: "Idaho Veterans Chambers of Commerce", location: "Boise, Idaho", website: "https://www.idahoveterans.org/" },
];

async function geocode(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TinyVillageSpirit/1.0 (tinyvillagespirit@gmail.com)' }
  });
  const data = await res.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const results = [];
for (let i = 0; i < villages.length; i++) {
  const v = villages[i];
  process.stdout.write(`[${i+1}/${villages.length}] ${v.name} (${v.location})... `);
  const coords = await geocode(v.location);
  if (coords) {
    results.push({ ...v, lat: coords.lat, lng: coords.lng });
    console.log(`✓ ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`);
  } else {
    results.push({ ...v, lat: null, lng: null });
    console.log('✗ not found');
  }
  await sleep(1100); // Nominatim rate limit: 1 req/sec
}

mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/villages.json', JSON.stringify(results, null, 2));
console.log(`\nDone. ${results.filter(r => r.lat).length}/${results.length} geocoded.`);
console.log('Saved to public/data/villages.json');
