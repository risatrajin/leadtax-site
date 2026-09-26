import { User } from "lucide-react";
import contact from "../../content/pages/contact.json";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/Dialog.jsx";

const { expertPicker } = contact;

/** "Choose Your Tax Expert" modal opened from the head office card. */
export default function ExpertPickerDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand text-center">{expertPicker.title}</DialogTitle>
          <DialogDescription className="text-center text-gray-600">{expertPicker.description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {expertPicker.experts.map((expert) => (
            <a
              key={expert.url}
              href={expert.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
              className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-brand hover:bg-brand-subtle/20 transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-brand-subtle flex items-center justify-center mb-4 group-hover:bg-brand transition-colors">
                <User className="w-10 h-10 text-brand group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 text-center mb-1">{expert.name}</h3>
              <p className="text-sm text-gray-600 text-center">{expert.role}</p>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
