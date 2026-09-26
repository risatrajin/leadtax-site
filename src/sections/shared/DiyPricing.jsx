import { useState } from "react";
import home from "../../content/home.json";
import pricing from "../../content/pricing.json";
import PricingCard from "../../components/ui/PricingCard.jsx";

/**
 * DIY package cards (id="pricing", the target of the hero's "Get Started").
 * The online/expert toggle was never built: its container is empty, so the
 * expert tiers are unreachable. Kept as-is.
 */
export default function DiyPricing() {
  const [mode] = useState("online");
  const tiers = mode === "online" ? pricing.diyTiers : pricing.expertTiers;

  return (
    <section id="pricing" className="bg-gray-50 px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900">{home.pricing.title}</h2>
          <p className="text-lg md:text-xl text-gray-600">{home.pricing.text}</p>
        </div>
        <div className="flex justify-center mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.title}
              tier={tier}
              perReturnLabel={pricing.perReturnLabel}
              ctaLabel={pricing.ctaLabel}
            />
          ))}
        </div>
        <div className="text-center mt-8" />
      </div>
    </section>
  );
}
