import React from 'react';
import LandingCard from './LandingCard';

const contents = [
  {
    title: 'Simplicity',
    description:
      'A user-friendly interface ensures a smooth experience for all users.',
  },
  {
    title: 'Reliability',
    description:
      'Built with robust security measures to prioritize data security and user privacy.',
  },
  {
    title: 'Flexibility',
    description:
      'Customizable features to adapt to the unique needs of your educational institution.',
  },
];

export default function KeyFeatures() {
  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl text-center">Key Features</h2>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
        {contents.map((content, index) => (
          <LandingCard
            title={content.title}
            description={content.description}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
