// src/data/litters.js
// Current litters shown on the Current Litters page (and counted on Home/Contact).
// Add a litter by copying one of the objects below; remove it once all pups go home.
// An empty list ([]) shows a "No Current Litters" message instead.
//
// Litter fields:
//   id            Unique slug used in the page URL (#lilly-winter-2026) and photo folder name
//   dam / sire    name, image, and link (a page link like "/dams#lilly", or null for none)
//   bornDate      Shown as written, e.g. "January 1, 2026"
//   availableDate When pups can go home, shown as written
//
// Puppy fields:
//   name, gender, color
//   status        Must be "Available", "Reserved", or "Adopted" (anything else fails the build)
//   description   Optional short blurb
//   image         Optional; a missing photo shows a "Photo coming soon" placeholder
//
// Image paths are relative to src/assets/images/ (e.g. "Lilly/lilly3.jpeg").
// Put puppy photos in src/assets/images/litters/<litter id>/

export const currentLitters = [
  {
    id: "lilly-winter-2026",
    dam: {
      name: "Lilly",
      image: "Lilly/lilly3.jpeg",
      link: "/dams#lilly"
    },
    sire: {
      name: "Champion Bruno",
      image: "sires/bruno.jpg",
      link: null // or link to sire page if you have one
    },
    bornDate: "January 1, 2026",
    availableDate: "February 26, 2026",
    puppies: [
      {
        name: "Puppy 1",
        // image: "litters/lilly-winter-2026/puppy1.jpg",
        image: "Group/group3-7.jpeg",
        gender: "Male",
        color: "Golden",
        status: "Available", // Available, Reserved, Adopted
        // description: "Playful and energetic, loves to fetch."
      },
      {
        name: "Puppy 2",
        image: "litters/lilly-winter-2026/puppy2.jpg",
        gender: "Female",
        color: "Golden",
        status: "Reserved",
        // description: "Sweet and gentle, great with kids."
      },
      {
        name: "Puppy 3",
        image: "litters/lilly-winter-2026/puppy3.jpg",
        gender: "Male",
        color: "Light Golden",
        status: "Adopted",
        // description: "Calm and cuddly, loves attention."
      }
    ]
  },
  {
    id: "roux-winter-2026",
    dam: {
      name: "Roux",
      image: "Roux/roux1.jpeg",
      link: "/dams#roux"
    },
    sire: {
      name: "Duke",
      image: "sires/duke.jpg",
      link: null
    },
    bornDate: "January 3, 2026",
    availableDate: "February 28, 2026",
    puppies: [
      {
        name: "Puppy A",
        image: "litters/roux-winter-2026/puppy1.jpg",
        gender: "Female",
        color: "Golden",
        status: "Available",
        // description: "Adventurous and curious."
      },
      {
        name: "Puppy B",
        image: "litters/roux-winter-2026/puppy2.jpg",
        gender: "Male",
        color: "Golden",
        status: "Available",
        // description: "Friendly and outgoing."
      }
    ]
  }
];