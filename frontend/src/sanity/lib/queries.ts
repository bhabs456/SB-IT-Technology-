import { groq } from "next-sanity";

export const siteSettings_QUERY = groq`
  *[_type == "siteSettings"][0]{
    _id,
    siteName,
    siteLogo,
    description,
    supportEmail,
    freeShippingThreshold, 
    flatShippingRate,
    socials,
    copyrightText
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc, name asc) {
    name,
    "slug": slug.current,
    description,
    icon,
    brandColor
  }
`;
