import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  {
    name: "Autos & Vehicles",
    description: "Content related to cars, motorcycles, and other vehicles.",
  },
  {
    name: "Comedy",
    description:
      "Stand-up, sketches, funny videos, and other humorous content.",
  },
  {
    name: "Education",
    description: "Tutorials, lessons, and informational videos.",
  },
  {
    name: "Entertainment",
    description:
      "General entertainment content, including talk shows and variety shows.",
  },
  {
    name: "Film & Animation",
    description: "Movie reviews, animations, and film-related content.",
  },
  {
    name: "Gaming",
    description:
      "Let's Plays, game reviews, walkthroughs, and gaming-related discussions.",
  },
  {
    name: "Howto & Style",
    description:
      "DIY tutorials, fashion, beauty, and lifestyle-related content.",
  },
  {
    name: "Music",
    description: "Music videos, performances, and artist-related content.",
  },
  {
    name: "News & Politics",
    description: "Current events, political discussions, and news reports.",
  },
  {
    name: "Nonprofits & Activism",
    description:
      "Content related to charities, fundraising, and social causes.",
  },
  {
    name: "People & Blogs",
    description: "Personal vlogs, lifestyle content, and storytelling.",
  },
  {
    name: "Pets & Animals",
    description: "Videos featuring pets, wildlife, and animal-related topics.",
  },
  {
    name: "Science & Technology",
    description: "Tech reviews, scientific discussions, and innovations.",
  },
  {
    name: "Sports",
    description: "Sports highlights, analysis, and fitness-related content.",
  },
  {
    name: "Travel & Events",
    description: "Travel vlogs, event coverage, and tourism content.",
  },
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = categoryNames.map((name) => ({
      name: name.name,
      description: name.description,
    }));

    await db.insert(categories).values(values);

    console.log("Category seeded successfully");
  } catch (error) {
    console.log("🚀 ~ main ~ error:", error);
    process.exit(1);
  }
}

main();
