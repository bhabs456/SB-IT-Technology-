import { groq } from "next-sanity";

export const siteSettingsQUERY = groq`
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

export const brandPartnerQuery = groq`
  *[_type == "brandPartner" && isActive == true] | order(orderWeight asc) {
    "id": brandId.current,
    name,
    logo,
    websiteUrl
  } 
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial" && isVisible == true] | order(featuredOrder asc, _createdAt desc) [0...8] {
    _id,
    author,
    role,
    rating,
    content,
    avatar,
    isVerifiedPurchase
  }
`;
