import PageHero from "../../components/ui/PageHero.jsx";
import { crossBorderAction } from "./links.js";

export default function CrossBorderHero({ hero }) {
  const actions = hero.actions.map((action) => ({ label: action.label, props: crossBorderAction(action) }));
  return <PageHero title={hero.title} text={hero.text} actions={actions} image={hero.image} />;
}
