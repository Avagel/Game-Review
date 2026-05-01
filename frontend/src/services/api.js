import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const dummyNews = {
  totalArticles: 5,
  articles: [
    {
      title: "New Expansion Announced for Elden Ring",
      description:
        "FromSoftware teases a massive new expansion for Elden Ring, introducing new bosses, maps, and storylines.",
      content:
        "The upcoming expansion promises to expand the lore of Elden Ring with new regions to explore and challenging enemies...",
      url: "https://example.com/elden-ring-expansion",
      image: "https://picsum.photos/seed/eldenring/600/400",
      publishedAt: "2026-04-30T10:15:00Z",
      source: {
        name: "GameSpot",
        url: "https://www.gamespot.com",
      },
    },
    {
      title: "Fortnite Introduces New Creative Mode Features",
      description:
        "Epic Games rolls out new tools in Fortnite Creative, allowing players to build more immersive worlds.",
      content:
        "Fortnite Creative mode just got a major update with new scripting tools and enhanced physics systems...",
      url: "https://example.com/fortnite-creative-update",
      image: "https://picsum.photos/seed/fortnite/600/400",
      publishedAt: "2026-04-29T18:40:00Z",
      source: {
        name: "IGN",
        url: "https://www.ign.com",
      },
    },
    {
      title: "Call of Duty 2026 Rumors Heat Up",
      description:
        "Leaks suggest the next Call of Duty title may return to a futuristic setting with advanced mechanics.",
      content:
        "According to industry insiders, the upcoming Call of Duty game is expected to feature jetpacks and advanced AI enemies...",
      url: "https://example.com/cod-2026-rumors",
      image: "https://picsum.photos/seed/cod/600/400",
      publishedAt: "2026-04-28T12:00:00Z",
      source: {
        name: "Polygon",
        url: "https://www.polygon.com",
      },
    },
    {
      title: "Minecraft Update Adds New Biomes and Mobs",
      description:
        "Mojang releases a new Minecraft update introducing fresh biomes, creatures, and crafting mechanics.",
      content:
        "Players can now explore lush new environments and interact with unique mobs that bring more depth to the game...",
      url: "https://example.com/minecraft-update",
      image: "https://picsum.photos/seed/minecraft/600/400",
      publishedAt: "2026-04-27T09:30:00Z",
      source: {
        name: "Eurogamer",
        url: "https://www.eurogamer.net",
      },
    },
    {
      title: "PlayStation Announces Major Summer Showcase",
      description:
        "Sony confirms a summer showcase event featuring upcoming PlayStation titles and exclusive reveals.",
      content:
        "The event is expected to highlight major upcoming releases, including sequels and new IPs...",
      url: "https://example.com/playstation-showcase",
      image: "https://picsum.photos/seed/playstation/600/400",
      publishedAt: "2026-04-26T15:20:00Z",
      source: {
        name: "The Verge",
        url: "https://www.theverge.com",
      },
    },
  ],
};

export const fetchGames = async (url) => {
  console.log("fetching games data ");
  const res = await fetch(url);
  const results = await res.json();
  if (!res.ok) {
    throw new Error("Unable to fetch news");
  }
  return results.results;
};

export const fetchNews = async (url) => {
  // const res = await fetch(url);
  // const results = await res.json();
  // console.log("News results", results);

  // if (!res.ok) {
  //   throw new Error("Unable to fetch news");
  // }

  return dummyNews.articles;
};
