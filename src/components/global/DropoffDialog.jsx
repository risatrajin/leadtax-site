import { lazy, Suspense, useEffect, useState } from "react";
import { DROPOFF_EVENT } from "../../lib/links.js";

// The dialog's code loads the first time someone asks for it.
const DropoffModal = lazy(() => import("../../sections/dropoff/DropoffModal.jsx"));

/** Opens the document drop-off dialog whenever a "dropoff" link fires DROPOFF_EVENT (openDropoff). */
export default function DropoffDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const show = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(DROPOFF_EVENT, show);
    return () => window.removeEventListener(DROPOFF_EVENT, show);
  }, []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <DropoffModal open={open} onOpenChange={setOpen} />
    </Suspense>
  );
}
