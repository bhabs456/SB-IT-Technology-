export const brandPartner = {
  name: "brandPartner",
  title: "Brand Partners",
  type: "document",
  fields: [
    // 1. Primary Identifier (Your id / key tracking field)
    {
      name: "brandId",
      title: "Brand ID / Slug",
      type: "slug",
      description: "Unique string key identifier used for URL endpoints and asset mapping (e.g., 'apple', 'samsung-electronics').",
      options: {
        source: "name", // Clicking 'Generate' automatically converts the Brand Name into a clean ID
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    // 2. Core Identity Fields
    {
      name: "name",
      title: "Brand Name",
      type: "string",
      description: "The official manufacturer name (e.g., Apple, Samsung, Sony).",
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: "logo",
      title: "Brand Logo Graphic (Light Mode)",
      type: "image",
      description: "High-quality vector transparent logo asset used for the default light theme layout tracks.",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "logoDark",
      title: "Brand Logo Graphic (Dark Mode - Optional)",
      type: "image",
      description: "Optional. White, bright, or high-contrast alternative logo version that swaps in automatically on dark layout themes.",
      options: {
        hotspot: true,
      },
    },
    {
      name: "websiteUrl",
      title: "Partner Homepage URL",
      type: "url",
      description: "Direct external outbound web redirect link to the manufacturer's corporate website.",
    },

    // 🚀 EXCLUSIVE FIELD SUGGESTIONS FOR E-COMMERCE

    // 3. Operational Visibility Controls
    {
      name: "isActive",
      title: "Is Active / Visible",
      type: "boolean",
      description: "Turn off to temporarily hide this brand from your landing page carousel without deleting the record data entry.",
      initialValue: true,
    },
    {
      name: "isFeatured",
      title: "Is Featured Brand",
      type: "boolean",
      description: "Enables filtering to prioritize displaying this brand ahead of others in specialized homepage collections.",
      initialValue: false,
    },
    {
      name: "orderWeight",
      title: "Display Order Priority",
      type: "number",
      description: "Numeric sorting key value. Lower numbers (like 1 or 2) bubble up to display first in your continuous layout track.",
      initialValue: 0,
    },

    // 4. Content Extension (Useful for dedicated brand landing filter grids)
    {
      name: "description",
      title: "Short Bio / Summary Description",
      type: "text",
      rows: 3,
      description: "A brief single paragraph overview of what electronics this partner manufactures (Great for tooltip indicators or hover layouts).",
      validation: (Rule: any) => Rule.max(200),
    },
  ],
  
  // Customizes the card preview layouts inside your Sanity Studio Document Dashboard
  preview: {
    select: {
      title: "name",
      subtitle: "brandId.current",
      media: "logo",
    },
  },
}