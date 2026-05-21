import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "The name of your store (e.g. SB IT Technology)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteLogo",
      title: "Site Logo",
      type: "image",
      description: "Main header logo graphic",
      options: {
        hotspot: true, // Enables UI crop/hotspot tools
      },
    }),
    defineField({
      name: "description",
      title: "Store Description",
      type: "text",
      description: "Brief pitch or description of the store (displayed in the footer)",
      rows: 3,
    }),
    defineField({
      name: "supportEmail",
      title: "Support Email",
      type: "string",
      description: "Customer service contact email address",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "freeShippingThreshold",
      title: "Free Shipping Threshold (₹)",
      type: "number",
      description: "Minimum cart subtotal to qualify for free shipping (e.g. 99)",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "flatShippingRate",
      title: "Flat Shipping Rate (₹)",
      type: "number",
      description: "Shipping fee applied to orders below the free shipping threshold (e.g. 9.99)",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "array",
      description: "List of your social media profiles",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Copyright disclaimer in the footer (e.g. TechVault. All rights reserved.)",
    }),
  ],
})