import { FileUp } from "lucide-react";
import copy from "../../content/dropoff.json";
import DropoffFrame from "../../components/ui/DropoffFrame.jsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../components/ui/Dialog.jsx";

/** "Submit your documents" dialog: a short header, then the client's drop-off form (DropoffFrame). */
export default function DropoffModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-5 sm:max-w-3xl sm:p-8">
        <div className="flex items-center gap-3 pr-8">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
            <FileUp aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{copy.title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">{copy.text}</DialogDescription>
          </div>
        </div>
        <DropoffFrame title={copy.title} fallbackLabel={copy.fallbackLabel} loadingLabel={copy.loadingLabel} className="mt-2" />
      </DialogContent>
    </Dialog>
  );
}
