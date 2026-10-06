/**
 * Areas We Serve: the 12 New Jersey counties (/areas-we-serve/{slug}).
 * Used by the routes, SEO tags, hub page, county pages, homepage coverage list and footer.
 * Town pages (/areas-we-serve/{town}-nj) are Phase 2 in the sitemap.
 */
export type AreaRegion = "central" | "north" | "shore";

export interface CountyArea {
  slug: string;
  /** "Middlesex" (the page adds "County"). */
  name: string;
  seat: string;
  region: AreaRegion;
  /** Two or three sentences unique to this county. */
  intro: string;
  towns: string[];
  neighbors: string[];
}

export const AREA_REGION_LABEL: Record<AreaRegion, string> = {
  central: "Central New Jersey",
  north: "North New Jersey",
  shore: "Jersey Shore & South Jersey",
};

export const COUNTIES: CountyArea[] = [
  {
    slug: "middlesex-county",
    name: "Middlesex",
    seat: "New Brunswick",
    region: "central",
    intro: "Middlesex County is home to our office on Oak Tree Road in Edison, so it's where our team lives and works. From Edison and Woodbridge to New Brunswick, Piscataway and Monroe, we help families arrange care quickly, often starting within days.",
    towns: ["Edison", "Woodbridge", "New Brunswick", "Piscataway", "East Brunswick", "Old Bridge", "Perth Amboy", "Sayreville", "South Plainfield", "Metuchen", "North Brunswick", "Monroe Township", "South Brunswick", "Highland Park"],
    neighbors: ["somerset-county", "union-county", "monmouth-county", "mercer-county"],
  },
  {
    slug: "monmouth-county",
    name: "Monmouth",
    seat: "Freehold",
    region: "central",
    intro: "From the Bayshore to the beach towns and the farms of western Monmouth, we provide in-home care that lets older adults stay in the homes and neighborhoods they love, with caregivers and nurses supervised by our team in nearby Edison.",
    towns: ["Middletown", "Freehold", "Howell", "Marlboro", "Manalapan", "Long Branch", "Red Bank", "Asbury Park", "Holmdel", "Wall Township", "Neptune", "Hazlet", "Ocean Township", "Colts Neck"],
    neighbors: ["middlesex-county", "ocean-county", "mercer-county"],
  },
  {
    slug: "somerset-county",
    name: "Somerset",
    seat: "Somerville",
    region: "central",
    intro: "Just west of our Edison office, Somerset County families turn to us for personal care, companionship and nursing at home, from Franklin and Bridgewater to Hillsborough, Basking Ridge and the Watchung Hills.",
    towns: ["Franklin Township", "Bridgewater", "Hillsborough", "Somerville", "Bound Brook", "North Plainfield", "Basking Ridge", "Bernardsville", "Montgomery", "Warren", "Branchburg", "Manville", "Watchung"],
    neighbors: ["middlesex-county", "union-county", "morris-county", "mercer-county"],
  },
  {
    slug: "union-county",
    name: "Union",
    seat: "Elizabeth",
    region: "north",
    intro: "Union County borders Middlesex, so our care coordinators can reach families in Elizabeth, Plainfield, Westfield, Linden and Rahway quickly, whether you need a few hours of help a week or care around the clock.",
    towns: ["Elizabeth", "Union", "Plainfield", "Linden", "Westfield", "Rahway", "Cranford", "Summit", "Scotch Plains", "Clark", "Roselle", "Hillside", "Springfield", "Berkeley Heights"],
    neighbors: ["middlesex-county", "somerset-county", "essex-county", "morris-county", "hudson-county"],
  },
  {
    slug: "mercer-county",
    name: "Mercer",
    seat: "Trenton",
    region: "central",
    intro: "Around the state capital, Mercer County families rely on us for home care in Trenton, Hamilton, Ewing, Lawrence, Princeton and West Windsor, including help coming home after a hospital stay.",
    towns: ["Trenton", "Hamilton", "Ewing", "Lawrence", "Princeton", "West Windsor", "East Windsor", "Robbinsville", "Hopewell", "Pennington", "Hightstown"],
    neighbors: ["middlesex-county", "somerset-county", "monmouth-county", "burlington-county"],
  },
  {
    slug: "essex-county",
    name: "Essex",
    seat: "Newark",
    region: "north",
    intro: "From Newark and the Oranges to Montclair, Livingston and the suburbs of western Essex, we provide caregivers and nurses who help older adults and people recovering from illness stay safe and independent at home.",
    towns: ["Newark", "East Orange", "Irvington", "Bloomfield", "Montclair", "West Orange", "Livingston", "Belleville", "Nutley", "Maplewood", "South Orange", "Orange", "Verona", "Millburn"],
    neighbors: ["union-county", "morris-county", "passaic-county", "bergen-county", "hudson-county"],
  },
  {
    slug: "bergen-county",
    name: "Bergen",
    seat: "Hackensack",
    region: "north",
    intro: "New Jersey's most populous county has many older adults living independently. We support Bergen County families in Hackensack, Teaneck, Fort Lee, Paramus, Ridgewood and beyond with flexible in-home care.",
    towns: ["Hackensack", "Teaneck", "Fort Lee", "Fair Lawn", "Paramus", "Englewood", "Ridgewood", "Garfield", "Lodi", "Mahwah", "Bergenfield", "Cliffside Park", "Lyndhurst", "Ramsey"],
    neighbors: ["passaic-county", "hudson-county", "essex-county"],
  },
  {
    slug: "hudson-county",
    name: "Hudson",
    seat: "Jersey City",
    region: "north",
    intro: "In Hudson County's busy cities, many seniors live in apartments and walk-ups where getting around can be hard. Our caregivers help with daily routines, errands and appointments in Jersey City, Hoboken, Bayonne, Union City and nearby towns.",
    towns: ["Jersey City", "Hoboken", "Bayonne", "Union City", "West New York", "North Bergen", "Kearny", "Secaucus", "Weehawken", "Harrison", "Guttenberg"],
    neighbors: ["bergen-county", "essex-county", "union-county"],
  },
  {
    slug: "passaic-county",
    name: "Passaic",
    seat: "Paterson",
    region: "north",
    intro: "From Paterson, Clifton and Passaic to Wayne and the lakes of West Milford, we help Passaic County families arrange personal care, companionship and skilled nursing at home.",
    towns: ["Paterson", "Clifton", "Passaic", "Wayne", "West Milford", "Little Falls", "Totowa", "Woodland Park", "Hawthorne", "Pompton Lakes", "Haledon", "Ringwood"],
    neighbors: ["bergen-county", "essex-county", "morris-county"],
  },
  {
    slug: "morris-county",
    name: "Morris",
    seat: "Morristown",
    region: "north",
    intro: "Morris County's suburban and rural towns can be spread out, which makes reliable help at home even more important. We serve families in Parsippany, Morristown, Randolph, Denville, Madison and surrounding communities.",
    towns: ["Parsippany-Troy Hills", "Morristown", "Randolph", "Denville", "Mount Olive", "Rockaway", "Madison", "Dover", "Morris Plains", "Florham Park", "Chatham", "Roxbury", "Montville"],
    neighbors: ["somerset-county", "union-county", "essex-county", "passaic-county"],
  },
  {
    slug: "ocean-county",
    name: "Ocean",
    seat: "Toms River",
    region: "shore",
    intro: "Ocean County has many active-adult and retirement communities. We help residents of Toms River, Brick, Lakewood, Manchester, Berkeley and the shore towns get the support they need to keep living independently.",
    towns: ["Toms River", "Lakewood", "Brick", "Jackson", "Manchester", "Berkeley", "Point Pleasant", "Barnegat", "Stafford", "Lacey", "Little Egg Harbor", "Seaside Heights"],
    neighbors: ["monmouth-county", "burlington-county"],
  },
  {
    slug: "burlington-county",
    name: "Burlington",
    seat: "Mount Holly",
    region: "shore",
    intro: "New Jersey's largest county by area stretches from the Delaware River towns to the Pine Barrens. We provide in-home care for families in Mount Laurel, Marlton, Moorestown, Willingboro, Medford and nearby communities.",
    towns: ["Mount Laurel", "Evesham (Marlton)", "Moorestown", "Willingboro", "Burlington", "Cinnaminson", "Medford", "Mount Holly", "Lumberton", "Delran", "Pemberton", "Bordentown"],
    neighbors: ["mercer-county", "ocean-county", "monmouth-county"],
  },
];

/**
 * Priority town pages (/areas-we-serve/{town}-nj), Phase 2 of the sitemap. Each has its own intro,
 * sections and FAQ so the pages aren't near-duplicates. Facts are limited to well-established ones
 * (town sections, main ZIP codes, landmarks); no hospital names, which change too often.
 */
export interface TownArea {
  slug: string;
  name: string;
  countySlug: string;
  /** "Township", "Borough" or "City". */
  kind: string;
  intro: string;
  /** Neighborhoods, sections or areas within the town. */
  sections: string[];
  zips: string[];
  /** Two or three short local notes shown as highlight cards. */
  notes: { title: string; text: string }[];
  /** One question specific to this town (added to the shared town FAQs). */
  faq: { q: string; a: string };
  nearby: string[];
}

export const TOWNS: TownArea[] = [
  {
    slug: "edison-nj",
    name: "Edison",
    countySlug: "middlesex-county",
    kind: "Township",
    intro: "Edison is home: our office is on Oak Tree Road, so our care team works right here in town. Whether your loved one is in Menlo Park, Clara Barton, North Edison or Oak Tree, we can usually arrange an in-home assessment quickly and start care soon after.",
    sections: ["Oak Tree", "Menlo Park", "Clara Barton", "North Edison", "Stelton", "Bonhamtown", "New Dover", "Haven Homes", "Lindenau", "Nixon", "Pumptown", "Silver Lake"],
    zips: ["08817", "08820", "08837"],
    notes: [
      { title: "Our office is here", text: "2163 Oak Tree Road, Suite 204. Call ahead and you're welcome to meet the team." },
      { title: "A local team", text: "We work out of Edison, so travel to your loved one's home is short and scheduling is easier." },
      { title: "Fast start", text: "Being local means we can often visit for an assessment within days of your call." },
    ],
    faq: { q: "Can I visit your office in Edison?", a: "Yes. Our office is at 2163 Oak Tree Road, Suite 204, Edison, NJ 08820. Call ahead and we'll make sure a care coordinator is available to meet you." },
    nearby: ["metuchen-nj", "woodbridge-nj", "piscataway-nj", "south-plainfield-nj"],
  },
  {
    slug: "metuchen-nj",
    name: "Metuchen",
    countySlug: "middlesex-county",
    kind: "Borough",
    intro: "Metuchen, the walkable \"Brainy Borough\" surrounded by Edison, is just minutes from our office. We help Metuchen families with everything from a few hours of companionship a week to live-in care, so older residents can keep enjoying their homes and downtown.",
    sections: ["Downtown & Main Street", "Around the train station", "Residential neighborhoods off Middlesex Avenue", "Areas bordering Edison"],
    zips: ["08840"],
    notes: [
      { title: "Minutes away", text: "Metuchen is surrounded by Edison, where our office is, so our team is always close by." },
      { title: "Stay part of the community", text: "Caregivers can accompany your loved one downtown, to appointments, the library or church." },
      { title: "Flexible hours", text: "Hourly visits, overnight help or live-in care, adjusted as needs change." },
    ],
    faq: { q: "Can a caregiver take my parent around downtown Metuchen?", a: "Yes. Companion caregivers can accompany your loved one on walks, errands, shopping and appointments around town, as part of the care plan we agree with you." },
    nearby: ["edison-nj", "woodbridge-nj", "piscataway-nj", "south-plainfield-nj"],
  },
  {
    slug: "woodbridge-nj",
    name: "Woodbridge",
    countySlug: "middlesex-county",
    kind: "Township",
    intro: "Woodbridge Township is made up of many distinct communities, and we serve all of them, from Iselin and Colonia to Avenel, Fords and Port Reading. Our Edison office sits right next door, so families get local, responsive support.",
    sections: ["Woodbridge Proper", "Iselin", "Colonia", "Avenel", "Fords", "Hopelawn", "Keasbey", "Port Reading", "Sewaren"],
    zips: ["07095", "08830", "07067", "07001", "08863", "07064", "07077"],
    notes: [
      { title: "Every section covered", text: "From Colonia to Sewaren, all of Woodbridge Township's communities are in our service area." },
      { title: "Next door to our office", text: "Woodbridge borders Edison, so care coordinators and caregivers are close by." },
      { title: "Help after the hospital", text: "We can arrange support for the day your loved one comes home, with nurse visits when ordered." },
    ],
    faq: { q: "Do you serve Iselin, Colonia, Avenel and Fords?", a: "Yes. We serve every community in Woodbridge Township, including Woodbridge Proper, Iselin, Colonia, Avenel, Fords, Hopelawn, Keasbey, Port Reading and Sewaren." },
    nearby: ["edison-nj", "metuchen-nj", "east-brunswick-nj"],
  },
  {
    slug: "new-brunswick-nj",
    name: "New Brunswick",
    countySlug: "middlesex-county",
    kind: "City",
    intro: "New Brunswick, the Middlesex County seat and home of Rutgers University, is a busy medical and university city. Many families here need help after a hospital stay or with a parent living on their own, and our caregivers and nurses provide that support at home.",
    sections: ["Downtown", "Areas near Rutgers' College Avenue and Cook/Douglass campuses", "Residential neighborhoods off Livingston Avenue", "Areas bordering North Brunswick and Highland Park"],
    zips: ["08901"],
    notes: [
      { title: "Hospital-to-home help", text: "We can be ready on discharge day with caregiver support and nurse visits when your doctor orders them." },
      { title: "Help in apartments and homes", text: "Caregivers help with daily routines, meals, errands and getting to appointments around the city." },
      { title: "Close to our office", text: "New Brunswick is a short drive from our Edison office." },
    ],
    faq: { q: "Can you arrange care for the day my parent is discharged in New Brunswick?", a: "Yes. Call us as soon as you know the discharge date. We can arrange a caregiver for the trip home and the first days, and skilled nursing visits when your physician orders them." },
    nearby: ["piscataway-nj", "east-brunswick-nj", "edison-nj"],
  },
  {
    slug: "piscataway-nj",
    name: "Piscataway",
    countySlug: "middlesex-county",
    kind: "Township",
    intro: "Piscataway, home to Rutgers' Busch and Livingston campuses, borders Edison and is part of our core service area. We help Piscataway families with personal care, companionship, respite for family caregivers and nursing care at home.",
    sections: ["Areas near Rutgers' Busch and Livingston campuses", "Neighborhoods off Stelton Road", "Areas along River Road", "Neighborhoods bordering Edison and South Plainfield"],
    zips: ["08854"],
    notes: [
      { title: "Right next to Edison", text: "Piscataway borders Edison, so our care team is close at hand." },
      { title: "Support for family caregivers", text: "Respite care gives you a break, from a few hours to a few weeks." },
      { title: "Nursing at home", text: "Licensed RNs and LPNs for wound care, medication management and more, as ordered." },
    ],
    faq: { q: "Can you give me a break from caring for my parent in Piscataway?", a: "Yes. Respite care can be a few hours, an overnight, a weekend or several weeks, and can become regular care if you'd like. We follow your loved one's usual routine." },
    nearby: ["edison-nj", "south-plainfield-nj", "new-brunswick-nj", "metuchen-nj"],
  },
  {
    slug: "east-brunswick-nj",
    name: "East Brunswick",
    countySlug: "middlesex-county",
    kind: "Township",
    intro: "East Brunswick is a family-oriented suburb along Route 18, and many older residents here want to stay in the homes where they raised their families. Our caregivers and nurses make that possible with care that's planned around each person.",
    sections: ["Neighborhoods along Route 18", "Areas off Cranbury Road", "Areas off Ryders Lane", "Neighborhoods bordering Old Bridge and South River"],
    zips: ["08816"],
    notes: [
      { title: "Aging in place", text: "Personal care, companionship and home safety help so your loved one can stay at home." },
      { title: "Round-the-clock options", text: "Live-in caregivers or 24-hour shifts when someone shouldn't be alone." },
      { title: "One plan, one team", text: "Caregivers and nurses working from the same care plan, overseen by our RNs." },
    ],
    faq: { q: "Can my mother stay in her East Brunswick home instead of moving to a facility?", a: "Often, yes. With the right mix of personal care, companionship and, if needed, live-in or 24-hour care, many people stay safely at home. Our free assessment will help you understand what's needed." },
    nearby: ["new-brunswick-nj", "woodbridge-nj", "edison-nj"],
  },
  {
    slug: "south-plainfield-nj",
    name: "South Plainfield",
    countySlug: "middlesex-county",
    kind: "Borough",
    intro: "South Plainfield borders Edison and Piscataway, putting it just a short drive from our office. We help South Plainfield families arrange reliable in-home care, from hourly visits to live-in support and skilled nursing.",
    sections: ["Neighborhoods off Hamilton Boulevard", "Areas along Park Avenue", "Areas near Spring Lake Park", "Neighborhoods bordering Edison and Piscataway"],
    zips: ["07080"],
    notes: [
      { title: "Close to our office", text: "South Plainfield borders Edison, so our team can respond quickly." },
      { title: "Hourly to live-in", text: "Start with a few hours a week and add more as needs change." },
      { title: "Medication support", text: "Reminders from caregivers and nurse medication reviews when needed." },
    ],
    faq: { q: "How many hours of care can we start with in South Plainfield?", a: "Many families start with a few visits a week and adjust from there. We'll recommend a schedule during the free consultation and change it whenever you need." },
    nearby: ["edison-nj", "piscataway-nj", "metuchen-nj"],
  },
];

export const AREA_PATHS = [
  "/areas-we-serve",
  ...COUNTIES.map(c => `/areas-we-serve/${c.slug}`),
  ...TOWNS.map(t => `/areas-we-serve/${t.slug}`),
];

export const countyBySlug = (slug: string) => COUNTIES.find(c => c.slug === slug);
export const townBySlug = (slug: string) => TOWNS.find(t => t.slug === slug);
/** The town page for a town name listed on a county page, if one exists ("Edison" → edison-nj). */
export const townPageFor = (name: string) => TOWNS.find(t => t.name === name);
