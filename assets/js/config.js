/**
 * Elite Interior - Subdomain Configuration & Central Data Store
 * Subdomain: https://about.eliteinterior.pro/
 * Main Website: https://eliteinterior.pro/
 */

const ELITE_CONFIG = {
  company: {
    brandName: "Elite Interior",
    tagline: "Home Interior Design & Turnkey Execution in Ahmedabad",
    mainWebsite: "https://eliteinterior.pro/",
    subdomainUrl: "https://about.eliteinterior.pro/",
    email: "eliteinterior95@gmail.com",
    primaryPhone: "+918529326036",
    primaryPhoneDisplay: "+91 8529326036",
    officePhone: "+919587225681",
    officePhoneDisplay: "+91 9587225681",
    whatsappNumber: "918529326036",
    whatsappLink: "https://wa.me/918529326036",
    address: {
      unit: "A-212a, Sun South Trade",
      street: "Gala Gymkhana Road, South Bopal",
      city: "Ahmedabad",
      state: "Gujarat",
      postalCode: "380058",
      country: "India",
      mapsQuery: "https://maps.google.com/?q=Sun+South+Trade+Gala+Gymkhana+Road+South+Bopal+Ahmedabad"
    },
    serviceAreas: [
      "South Bopal",
      "Bopal",
      "Shela",
      "Shilaj",
      "Gota",
      "Jagatpur",
      "SG Highway",
      "Thaltej",
      "Satellite",
      "Prahlad Nagar",
      "Vaishnodevi Circle",
      "Science City",
      "Gandhinagar (select sectors)"
    ],
    establishmentNote: "*Referenced as 2014 per main website records; subject to formal company confirmation.",
    logoUrl: "https://eliteinterior.pro/logo.jpg"
  },
  founders: [
    {
      name: "Vikash Kumar",
      role: "Co-Founder, Elite Interior",
      focusAreas: [
        "Marketing & Brand Strategy",
        "Digital Presence & Website Systems",
        "Business Development & Client Growth",
        "Customer Communication & Consultation Flow",
        "Operational Data & Project Coordination Workflows"
      ],
      bio: "Vikash leads marketing, digital systems, client engagement, and business development for Elite Interior. He ensures transparent communication, seamless enquiry onboarding, and efficient digital management from first consultation to post-handover support.",
      verified: true
    },
    {
      name: "Ramesh Taak",
      role: "Co-Founder, Elite Interior",
      focusAreas: [
        "Interior Industry & Material Knowledge",
        "On-Ground Project Execution",
        "Labour, Carpentry & Vendor Coordination",
        "Site Supervision & Quality Audits",
        "Modular Installation & Final Handover Precision"
      ],
      bio: "Ramesh brings extensive hands-on expertise in interior craftsmanship, carpentry, modular furniture manufacturing, vendor management, and site execution. He oversees site operations across Ahmedabad to guarantee structural durability and flawless finishing.",
      verified: true
    }
  ],
  images: {
    logo: "https://eliteinterior.pro/logo.jpg",
    heroHome: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    aboutStory: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
    modularKitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    livingRoomLuxury: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    masterBedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    wardrobeCustom: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
    falseCeilingLighting: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    turnkeyExecution: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    founderVikash: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", // editorial portrait placeholder
    founderRamesh: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", // editorial portrait placeholder
    sampleCaseBefore: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    sampleCaseAfter: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
  }
};

if (typeof window !== "undefined") {
  window.ELITE_CONFIG = ELITE_CONFIG;
}
