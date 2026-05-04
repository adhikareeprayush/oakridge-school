import mentor1 from "../assets/mentor1.jpeg";
import mentor2 from "../assets/mentor2.jpeg";
import mentor3 from "../assets/mentor3.jpeg";
import mentor4 from "../assets/mentor4.jpeg";

/** Featured instructors on the home page — ties to CardMentors. */
export const featuredInstructors = [
  {
    name: "Sarah Lin",
    profession: "Lead Instructor, Frontend",
    image: mentor1,
    socialLinks: [
      { platform: "facebook" as const, url: "https://facebook.com" },
      { platform: "instagram" as const, url: "https://instagram.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
    ],
  },
  {
    name: "Marcus Webb",
    profession: "Staff Engineer, Platform",
    image: mentor2,
    socialLinks: [
      { platform: "facebook" as const, url: "https://facebook.com" },
      { platform: "instagram" as const, url: "https://instagram.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
    ],
  },
  {
    name: "Elena Rossi",
    profession: "Design Systems Lead",
    image: mentor3,
    socialLinks: [
      { platform: "facebook" as const, url: "https://facebook.com" },
      { platform: "instagram" as const, url: "https://instagram.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
    ],
  },
  {
    name: "James Okonkwo",
    profession: "Director of Programs",
    image: mentor4,
    socialLinks: [
      { platform: "facebook" as const, url: "https://facebook.com" },
      { platform: "instagram" as const, url: "https://instagram.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
    ],
  },
] as const;
