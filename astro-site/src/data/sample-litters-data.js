// src/data/sample-litters-data.js
// Simple data file for managing litters

export const currentLitters = [
  {
    id: "lilly-winter-2026",
    dam: {
      name: "Lilly",
      image: "/images/Lilly/lilly3.jpeg",
      link: "/dams#lilly"
    },
    sire: {
      name: "Champion Bruno",
      image: "/images/sires/bruno.jpg",
      link: null // or link to sire page if you have one
    },
    bornDate: "January 1, 2026",
    availableDate: "Febuary 26, 2026",
    puppies: [
      {
        name: "Puppy 1",
        // image: "/images/litters/lilly-winter-2026/puppy1.jpg",
        image: "/images/Group/group3-7.jpeg",
        gender: "Male",
        color: "Golden",
        status: "Available", // Available, Reserved, Adopted
        // description: "Playful and energetic, loves to fetch."
      },
      {
        name: "Puppy 2",
        image: "/images/litters/lilly-winter-2026/puppy2.jpg",
        gender: "Female",
        color: "Golden",
        status: "Reserved",
        // description: "Sweet and gentle, great with kids."
      },
      {
        name: "Puppy 3",
        image: "/images/litters/lilly-winter-2026/puppy3.jpg",
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
      image: "/images/Roux/roux1.jpeg",
      link: "/dams#roux"
    },
    sire: {
      name: "Duke",
      image: "/images/sires/duke.jpg",
      link: null
    },
    bornDate: "January 3, 2026",
    availableDate: "Febuary 28, 2026",
    puppies: [
      {
        name: "Puppy A",
        image: "/images/litters/roux-winter-2026/puppy1.jpg",
        gender: "Female",
        color: "Golden",
        status: "Available",
        // description: "Adventurous and curious."
      },
      {
        name: "Puppy B",
        image: "/images/litters/roux-winter-2026/puppy2.jpg",
        gender: "Male",
        color: "Golden",
        status: "Available",
        // description: "Friendly and outgoing."
      }
    ]
  }
];