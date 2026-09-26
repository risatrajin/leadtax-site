import home from "../../content/home-legacy.json";
import Button from "../../components/ui/Button.jsx";
import CtaBanner from "../../components/ui/CtaBanner.jsx";

const { expertCta } = home;

export default function ExpertHelpCta() {
  return (
    <CtaBanner
      sectionClassName="bg-gray-50"
      frameClassName="bg-gradient-to-br from-brand to-brand-fade"
      gridClassName="grid md:grid-cols-2 items-center"
      media="h-full"
      image={{ ...expertCta.image, className: "w-full h-full object-cover min-h-[250px] md:min-h-[400px]" }}
      bodyClassName="p-8 md:p-12 text-white"
      title={expertCta.title}
      text={expertCta.text}
      textClassName="text-lg mb-6 text-blue-50"
    >
      <Button to={expertCta.cta.to} variant="inverse" className="inline-block">
        {expertCta.cta.label}
      </Button>
    </CtaBanner>
  );
}
