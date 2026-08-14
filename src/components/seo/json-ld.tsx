const SITE_URL = 'https://www.manoj-kumar.me';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: 'Manoj Kumar Chilukoti | Software Engineer',
        mainEntity: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Manoj Kumar Chilukoti',
          alternateName: 'Manoj Kumar',
          url: SITE_URL,
          image: {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#primaryimage`,
            url: `${SITE_URL}/og-image.png`,
            caption: 'Manoj Kumar Chilukoti',
          },
          jobTitle: 'Software Engineer',
          description:
            'Manoj Kumar Chilukoti is a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',
          email: 'mailto:manojkumarchilukoti@gmail.com',
          sameAs: [
            'https://github.com/ManojMJ17',
            'https://www.linkedin.com/in/manoj-kumar-b35ab6348',
            'https://leetcode.com/u/ManojMJ17/',
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Manoj Kumar Chilukoti Portfolio',
        description:
          'Portfolio of Manoj Kumar Chilukoti, a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
