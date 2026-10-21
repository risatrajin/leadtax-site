import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import home from "../../content/homepage.json";
import enquiry from "../../content/enquiry.json";
import { headOfficeEmail, officeLocationOptions } from "../../lib/offices.js";
import { openMailDraft } from "../../lib/links.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../components/ui/Dialog.jsx";
import { SelectField, TextAreaField, TextField } from "../../components/ui/FormFields.jsx";

const { note } = home.hero;
const SERVICES = enquiry.form.services;
const LOCATIONS = officeLocationOptions(enquiry.form.locationAny);

/**
 * "Ask a quick question" modal from the hero images: name, email, mobile, what the question is
 * about, preferred location, and the question.
 * No backend yet, so sending opens an email draft to the head office.
 */
export default function QuickQuery({ open, onOpenChange }) {
  const [status, setStatus] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    openMailDraft(headOfficeEmail, fill(note.subject, values), fill(note.body, values));
    setStatus(fill(note.status, { email: headOfficeEmail }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setStatus("");
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-6 sm:max-w-2xl sm:p-8">
        {/* Light blue banner: title and line on the left, illustration on the right. */}
        <div className="relative overflow-hidden rounded-2xl bg-[#cee3ff] px-6 py-7 sm:px-8 sm:py-8">
          <img src={note.image} alt="" width="550" height="264" className="pointer-events-none absolute bottom-0 right-0 hidden h-32 w-auto sm:block" />
          <div className="relative sm:max-w-[46%]">
            <DialogTitle className="text-3xl font-semibold tracking-tight text-gray-900">{note.title}</DialogTitle>
            <DialogDescription className="mt-2 text-gray-600">{note.text}</DialogDescription>
          </div>
        </div>

        <form onSubmit={submit} className="mt-2 space-y-4">
          <TextField name="name" label={note.fields.name} autoComplete="name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="email" label={note.fields.email} type="email" autoComplete="email" />
            <TextField name="phone" label={note.fields.phone} type="tel" autoComplete="tel" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField name="service" label={note.fields.service} options={SERVICES} defaultValue={SERVICES.at(-1)} />
            <SelectField name="location" label={note.fields.location} options={LOCATIONS} />
          </div>
          <TextAreaField name="question" label={note.fields.question} placeholder={note.fields.questionPlaceholder} required />
          <Button type="submit" size="block" className="group gap-2">
            {note.submitLabel}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="flex gap-2.5 text-sm text-gray-600">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
            {note.privacyNote}
          </p>
          {status && (
            <p role="status" className="rounded-xl bg-brand-subtle/50 p-3 text-sm text-brand">
              {status}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
