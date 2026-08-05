export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Manoj Kumar',
    url: 'https://www.manoj-kumar.me',
    image: 'https://www.manoj-kumar.me/og-image.png',
    jobTitle: 'Software Engineer',
    description:
      'Software Engineer specializing in Java, Spring Boot, React, Next.js, Microservices, and Full-Stack Development.',

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
