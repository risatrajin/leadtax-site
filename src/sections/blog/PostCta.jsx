import Button from "../../components/ui/Button.jsx";

/** End-of-article banner. Actions are router paths (`to`) or URLs and "app:" refs (`href`). */
export default function PostCta({ cta }) {
  return (
    <div className="mt-16 pt-12 border-t-2 border-gray-200">
      <div className="bg-gradient-to-br from-brand to-brand-strong rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{cta.title}</h3>
        <p className="text-brand-subtle mb-8 max-w-2xl mx-auto">{cta.text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {cta.actions.map((action) => (
            <Button key={action.label} to={action.to} href={action.href} variant={action.variant}>
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
