import Button from "../../components/ui/Button.jsx";
import { actionProps } from "./ServiceHero.jsx";

const STYLES = {
  remote: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-brand to-brand-highlight",
    text: "text-xl text-brand-subtle mb-8 max-w-2xl mx-auto",
    button: { variant: "inverseTint", className: "inline-block text-lg" },
  },
  local: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-brand",
    text: "text-xl text-white/90 mb-8",
    button: { variant: "inverse", className: "inline-block text-lg font-medium" },
  },
};

/** Closing call-to-action band. */
export default function ServiceCta({ variant, cta }) {
  const style = STYLES[variant];
  return (
    <section className={style.section}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">{cta.title}</h2>
        <p className={style.text}>{cta.text}</p>
        <Button {...actionProps(cta.action)} size="xl" {...style.button}>
          {cta.action.label}
        </Button>
      </div>
    </section>
  );
}
