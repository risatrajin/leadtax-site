import { useState } from "react";
import home from "../../content/homepage.json";
import LeadFormFrame from "../../components/ui/LeadFormFrame.jsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../components/ui/Dialog.jsx";

const { note } = home.hero;

/**
 * "Quick question" modal from the hero images: the banner, then the client's enquiry form
 * (LeadFormFrame). Once the form is sent the banner goes, leaving the thank-you message.
 */
export default function QuickQuery({ open, onOpenChange }) {
  const [sent, setSent] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setSent(false);
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-6 sm:max-w-2xl sm:p-8">
        {/* Light blue banner: title and line on the left, illustration on the right. */}
        <div className={sent ? "sr-only" : "relative overflow-hidden rounded-2xl bg-[#cee3ff] px-6 py-7 sm:px-8 sm:py-8"}>
          <img src={note.image} alt="" width="550" height="264" className="pointer-events-none absolute bottom-0 right-0 hidden h-32 w-auto sm:block" />
          <div className="relative sm:max-w-[46%]">
            <DialogTitle className="text-3xl font-semibold tracking-tight text-gray-900">{note.title}</DialogTitle>
            <DialogDescription className="mt-2 text-gray-600">{note.text}</DialogDescription>
          </div>
        </div>
        <LeadFormFrame title={note.title} fallbackLabel={note.formLabel} loadingLabel={note.loadingLabel} onSent={() => setSent(true)} className={sent ? "" : "mt-2"} />
      </DialogContent>
    </Dialog>
  );
}
