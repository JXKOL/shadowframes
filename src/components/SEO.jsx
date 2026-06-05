import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "ShadowFrames";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = "ShadowFrames is the premier AI-powered anime wallpaper platform. Discover and generate high-fidelity cyberpunk art and futuristic anime wallpapers.";
  const defaultKeywords = "anime wallpaper, AI art, cyberpunk wallpaper, futuristic anime, AI anime generator, ShadowFrames, digital art";
  const defaultImage = "https://shadowframes.art/og-image.png"; // Placeholder for actual OG image
  const siteUrl = "https://shadowframes.art";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="ShadowFrames" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={url || siteUrl} />
    </Helmet>
  );
};

export default SEO;
