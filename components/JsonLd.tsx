export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://enovixtech.in/#organization',
        name: 'EnovixTech',
        alternateName: [
          'Enovix Tech',
          'enovixtech',
          'enovixtech.in',
          'Enovix',
          'Enovix Technologies',
        ],
        url: 'https://enovixtech.in',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://enovixtech.in/#logo',
          url: 'https://enovixtech.in/enovix_logo.png',
          caption: 'EnovixTech Logo',
        },
        image: 'https://enovixtech.in/banner-1-latest.png',
        description:
          'EnovixTech (Enovix Tech) is a digital product studio and software development team based in Kerala, India. We engineer scalable web applications, mobile apps (iOS & Android), AI integrations, and enterprise business management systems.',
        email: 'contact.enovix@gmail.com',
        telephone: '+91 95269 52719',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        sameAs: ['https://instagram.com/enovix.tech'],
        knowsAbout: [
          'Web Development',
          'Mobile App Development',
          'Android Development',
          'iOS Development',
          'Product Engineering',
          'AI Integration',
          'Next.js Development',
          'Flutter Development',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://enovixtech.in/#website',
        url: 'https://enovixtech.in',
        name: 'EnovixTech',
        alternateName: ['Enovix Tech', 'enovixtech', 'enovixtech.in'],
        publisher: {
          '@id': 'https://enovixtech.in/#organization',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://enovixtech.in/#service',
        name: 'EnovixTech - Digital Product Studio',
        url: 'https://enovixtech.in',
        image: 'https://enovixtech.in/banner-1-latest.png',
        priceRange: '₹₹',
        telephone: '+91 95269 52719',
        email: 'contact.enovix@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Worldwide',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Application Development',
                description:
                  'Custom business applications, SaaS platforms, enterprise solutions, and API integrations.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Development & Management',
                description:
                  'High-performance websites, custom web applications, and ongoing maintenance.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Development',
                description:
                  'Native and cross-platform mobile apps for iOS and Android built with Flutter.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Integration & Automated Workflows',
                description:
                  'Practical AI capabilities, transcription engines, and automated business workflows.',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
