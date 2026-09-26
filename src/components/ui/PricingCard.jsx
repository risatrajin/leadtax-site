import Button from "./Button.jsx";
import Card from "./Card.jsx";

/** Package card with photo, name, description, price and a "Get Started" link. */
export default function PricingCard({ tier, perReturnLabel, ctaLabel }) {
  return (
    <Card className="shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={tier.image} alt={tier.imageAlt} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl text-gray-900 mb-2">{tier.title}</h3>
        <p className="text-sm md:text-base text-gray-600 mb-4">{tier.description}</p>
        <div className="mt-auto mb-6">
          <span className="text-2xl md:text-3xl text-brand">{tier.price}</span>
          <span className="text-gray-600">{perReturnLabel}</span>
        </div>
        <Button
          href={tier.url}
          variant="outline"
          size="block"
          className="w-full mt-auto font-medium text-center block"
        >
          {ctaLabel}
        </Button>
      </div>
    </Card>
  );
}
