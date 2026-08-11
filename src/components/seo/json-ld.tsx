const SITE_URL = 'https://www.manoj-kumar.me';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Manoj Kumar Chilukoti',
        alternateName: 'Manoj Kumar',
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        jobTitle: 'Software Engineer',
        description:
          'Manoj Kumar Chilukoti is a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',

        email: 'mailto:manojkumarchilukoti@gmail.com',

        sameAs: [
          'https://github.com/ManojMJ17',
          'https://www.linkedin.com/in/manoj-kumar-b35ab6348',
          'https://leetcode.com/u/ManojMJ17/',
        ],

        knowsAbout: [
          'Java',
          'Spring Boot',
          'Spring Security',
          'Microservices',
          'Docker',
          'React',
          'Next.js',
          'React Native',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Express.js',
          'PostgreSQL',
          'MongoDB',
          'REST APIs',
          'OpenFeign',
          'API Gateway',
          'Eureka',
        ],

        mainEntityOfPage: SITE_URL,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Manoj Kumar Chilukoti Portfolio',
        description:
          'Portfolio of Manoj Kumar Chilukoti, a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',
        inLanguage: 'en-US',
        author: { '@id': `${SITE_URL}/#person` },
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
