'use client';

export default function SubscribeForm() {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2">
        Subscribe for product updates and health tips:
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg w-full sm:w-auto text-white focus:outline-none focus:ring-2 focus:ring-teal-400 border-amber-50"
        />
        <button className="bg-white text-teal-700 font-semibold px-4 py-2 rounded-lg hover:bg-teal-100 transition-all">
          Subscribe
        </button>
      </div>
    </div>
  );
}
