// src/data/sample-litters-data.js
// Simple data file for managing litters

export const currentLitters = [
  {
    id: "lilly-2024-spring",
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
    bornDate: "March 15, 2024",
    availableDate: "May 10, 2024",
    puppies: [
      {
        name: "Puppy 1",
        image: "/images/litters/lilly-spring-2024/puppy1.jpg",
        gender: "Male",
        color: "Golden",
        status: "Available", // Available, Reserved, Adopted
        // description: "Playful and energetic, loves to fetch."
      },
      {
        name: "Puppy 2",
        image: "/images/litters/lilly-spring-2024/puppy2.jpg",
        gender: "Female",
        color: "Golden",
        status: "Reserved",
        // description: "Sweet and gentle, great with kids."
      },
      {
        name: "Puppy 3",
        image: "/images/litters/lilly-spring-2024/puppy3.jpg",
        gender: "Male",
        color: "Light Golden",
        status: "Available",
        // description: "Calm and cuddly, loves attention."
      }
    ]
  },
  {
    id: "roux-2024-spring",
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
    bornDate: "April 1, 2024",
    availableDate: "May 27, 2024",
    puppies: [
      {
        name: "Puppy A",
        image: "/images/litters/roux-spring-2024/puppy1.jpg",
        gender: "Female",
        color: "Golden",
        status: "Available",
        description: "Adventurous and curious."
      },
      {
        name: "Puppy B",
        image: "/images/litters/roux-spring-2024/puppy2.jpg",
        gender: "Male",
        color: "Golden",
        status: "Available",
        description: "Friendly and outgoing."
      }
    ]
  }
];