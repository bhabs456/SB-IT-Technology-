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