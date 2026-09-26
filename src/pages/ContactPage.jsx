import { useState } from "react";
import contact from "../content/pages/contact.json";
import { offices } from "../content/offices.json";
import seo from "../content/seo.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import OfficeCard from "../components/ui/OfficeCard.jsx";
import ContactForm from "../sections/contact/ContactForm.jsx";
import ExpertPickerDialog from "../sections/contact/ExpertPickerDialog.jsx";

export default function ContactPage() {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <PageShell
      seo={seo.pages.contact}
      afterMain={<ExpertPickerDialog open={pickerOpen} onOpenChange={setPickerOpen} />}
    >
      <PageHero title={contact.title} text={contact.intro} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {offices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              bookLabel={contact.bookLabel}
              onPickExpert={() => setPickerOpen(true)}
            />
          ))}
        </div>
        <ContactForm />
      </div>
    </PageShell>
  );
}
