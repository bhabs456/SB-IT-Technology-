import { defineField, defineType } from "sanity"

export default defineType({
  name: "product",
  title: "Hero Section Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      description: "e.g., 'MacBook Pro M5'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL Identifier",
      type: "slug",
      description: "Generates the product page URL route path automatically (e.g., 'macbook-pro-m5').",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Display Price",
      type: "number",
      description: "Numerical pricing value (e.g., 1299).",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "productImage",
      title: "Product Visual Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeaturedInHero",
      title: "Show Image in Hero Section",
      type: "boolean",
      description: "Toggle on to pull this product's image into the right side of the hero section loop.",
      initialValue: false,
    }),
  ],
})