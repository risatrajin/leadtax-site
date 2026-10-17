import home from "../../content/pages/file-online.json";
import Button from "../../components/ui/Button.jsx";
import CtaBanner from "../../components/ui/CtaBanner.jsx";

const { finalCta } = home;

export default function FinalCta() {
  return (
    <CtaBanner
      sectionClassName="bg-white"
      media="bg-gradient-to-br from-promo-from to-promo-to flex items-center justify-center"
      image={{ ...finalCta.image, className: "w-full h-full object-cover rounded-2xl shadow-lg" }}
      bodyClassName="bg-brand text-white p-8 md:p-12 flex flex-col justify-center"
      title={finalCta.title}
      text={finalCta.text}
      textClassName="text-lg text-brand-subtle mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {finalCta.actions.map((action) => (
          <Button key={action.label} href={action.href} variant={action.variant} className="text-center">
            {action.label}
          </Button>
        ))}
      </div>
    </CtaBanner>
  );
}
