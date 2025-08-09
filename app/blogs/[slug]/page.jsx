"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

const blogContent = {
  "boost-immunity": {
    title: "5 Foods That Boost Immunity",
    date: "June 2025",
    image: "/food.png",
    content: `
      <p>Maintaining a strong immune system is crucial, especially during seasonal changes. Here are five powerful foods that can help you stay resilient and energized:</p>

      <ul class='list-disc ml-6'>
        <li><strong>Citrus fruits</strong> – rich in Vitamin C that increases white blood cell production.</li>
        <li><strong>Ginger</strong> – known for reducing inflammation and boosting immunity.</li>
        <li><strong>Spinach</strong> – packed with antioxidants and beta carotene.</li>
        <li><strong>Yogurt</strong> – provides probiotics that support gut health.</li>
        <li><strong>Almonds</strong> – a great source of Vitamin E for immune function.</li>
      </ul>

      <p>Adding these to your diet can significantly improve your overall well-being.</p>
    `
  },
  "sleep-better": {
    title: "How to Sleep Better Naturally",
    date: "May 2025",
    image: "/sleep.png",
    content: `
      <p>Good sleep is the cornerstone of good health. Here are a few tips for improving sleep quality naturally:</p>

      <ul class='list-decimal ml-6'>
        <li>Stick to a consistent sleep schedule, even on weekends.</li>
        <li>Avoid caffeine and heavy meals before bedtime.</li>
        <li>Create a calming bedtime routine — warm bath, reading, or soft music.</li>
        <li>Limit screen time and blue light exposure in the evening.</li>
        <li>Keep your sleep environment cool, quiet, and dark.</li>
      </ul>

      <p>These habits can help reset your body clock and improve sleep quality over time.</p>
    `
  },
  "digital-detox": {
    title: "Digital Detox: A Weekend Guide",
    date: "April 2025",
    image: "/weekend.jpg",
    content: `
      <p>Technology overload can contribute to anxiety and fatigue. A weekend digital detox can restore mental clarity and energy. Try this:</p>

      <ul class='list-inside list-disc ml-6'>
        <li>Turn off push notifications on your devices.</li>
        <li>Replace scrolling with mindful activities — journaling, yoga, or nature walks.</li>
        <li>Plan tech-free social time with family or friends.</li>
        <li>Use that time to declutter your space or start a new hobby.</li>
      </ul>

      <p>Your mind will thank you, and you’ll return to the week more refreshed and focused.</p>
    `
  }
};

export default function BlogSlugPage() {
  const { slug } = useParams();
  const blog = blogContent[slug];

  if (!blog) {
    return (
      <div className="py-20 text-center text-white">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
        <p className="text-muted-foreground">The article you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-white">
      <div className="mb-8">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1000}
          height={600}
          className="rounded-xl w-full max-h-[400px] object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-teal-300 mb-8">{blog.date}</p>
      <div
        className="prose prose-invert prose-lg text-gray-300"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
}
