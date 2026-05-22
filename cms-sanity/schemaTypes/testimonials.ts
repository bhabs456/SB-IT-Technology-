// src/sanity/schemaTypes/testimonial.ts
export const testimonial = {
  name: "testimonial",
  title: "Customer Testimonials",
  type: "document",
  fields: [
    
    // 1. Core Identity & Profile Metadata
    {
      name: "author",
      title: "Customer Name",
      type: "string",
      description: "The full name of the customer leaving the feedback (e.g., Jane Doe).",
      validation: (Rule: any) => Rule.required().min(2).max(60),
    },
    {
      name: "role",
      title: "Professional Title / Subtitle",
      type: "string",
      description: "Optional professional title or localization label (e.g., 'Verified Buyer', 'DevOps Architect', 'Tech Enthusiast').",
      initialValue: "Verified Buyer",
    },
    {
      name: "avatar",
      title: "Customer Profile Photo",
      type: "image",
      description: "Upload a square headshot image. If left blank, the frontend layout will auto-generate an initials letter bubble fallback.",
      options: {
        hotspot: true, // Allows clean face-cropping controls inside the Sanity studio admin panel
      },
    },

    // 2. Feedback Content
    {
      name: "rating",
      title: "Star Rating (1 to 5)",
      type: "number",
      description: "Select the number of stars awarded. The interface enforces a strict minimum of 1 and a maximum of 5.",
      initialValue: 5,
      validation: (Rule: any) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: "5 Stars ★★★★★", value: 5 },
          { title: "4 Stars ★★★★", value: 4 },
          { title: "3 Stars ★★★", value: 3 },
          { title: "2 Stars ★★", value: 2 },
          { title: "1 Star ★", value: 1 },
        ],
        layout: "dropdown", // Changes field into an easy-to-select dropdown matrix
      },
    },
    {
      name: "content",
      title: "Review Feedback Quote",
      type: "text",
      rows: 4,
      description: "The actual core review text content shared by the customer expressing their platform or product satisfaction.",
      validation: (Rule: any) => Rule.required().min(10).max(500),
    },

    // 🚀 EXCLUSIVE STRUCTURAL INPUT SUGGESTIONS

    // 3. Trust Factors & Badging
    {
      name: "isVerifiedPurchase",
      title: "Is Verified Purchase",
      type: "boolean",
      description: "Enable this toggle to display a verified checkmark badge next to the review block for extra consumer trust.",
      initialValue: true,
    },

    // 4. Content Administration Toggles
    {
      name: "isVisible",
      title: "Is Visible on Storefront",
      type: "boolean",
      description: "Turn off this master switch to temporarily draft or hide this user review from your homepage carousel without deleting the document.",
      initialValue: true,
    },
    {
      name: "featuredOrder",
      title: "Manual Sorting Position Weight",
      type: "number",
      description: "Lower weight numbers (like 1 or 2) bubble this testimonial up to show first in the prime display layout sequence.",
      initialValue: 0,
    },
  ],

  // Sets up the document card preview layout within the central Sanity list manager
  preview: {
    select: {
      title: "author",
      subtitle: "role",
      media: "avatar",
      rating: "rating",
    },
    prepare(selection: any) {
      const { title, subtitle, media, rating } = selection;
      const stars = "★".repeat(rating || 5);
      return {
        title: `${title} (${stars})`,
        subtitle: subtitle || "Verified Buyer",
        media: media,
      };
    },
  },
};