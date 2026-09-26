import PageHero from "../../components/ui/PageHero.jsx";

/** Service page hero (File Remotely, Drop-off, In Person): the shared inner-page hero. */
export default function ServiceHero({ hero }) {
  return <PageHero title={hero.title} text={hero.text} actions={hero.actions} image={hero.image} />;
}
