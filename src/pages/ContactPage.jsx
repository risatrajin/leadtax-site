import { useState } from "react";
import contact from "../content/pages/contact.json";
import { offices } from "../content/offices.json";
import seo from "../content/seo.json";
import PageShell from "../components/layout/PageShell.jsx";
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4">{contact.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{contact.intro}</p>
        </div>
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
