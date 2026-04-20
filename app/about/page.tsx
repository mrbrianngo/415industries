import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - 415 Industries',
  description: 'About 415 Industries - A minimalist ecommerce experience.',
};

export default function AboutPage() {
  return (
    <div className="mt-12 space-y-12 font-mono max-w-[700px] mx-auto">
      <h1 className="text-xl">ABOUT</h1>

      <section className="space-y-4">
        <h2 className="text-lg">415 Industries</h2>
        <p className="leading-relaxed">
          415 Industries is a streetwear brand by Brian Ngo. This website will serve as a
          portfolio of past collections.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg">TECHNOLOGY</h2>
        <p className="leading-relaxed">
          Built using Next.js App Router, TypeScript, and Tailwind CSS, 415 Industries
          represents a modern approach to ecommerce, prioritizing performance
          and user experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg">CREDIT</h2>
        <p className="leading-relaxed">
          All credit for the site design and inspiration goes to the original
          Yeezy team and designers.
        </p>
      </section>
    </div>
  );
}
