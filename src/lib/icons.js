import {
  Calculator,
  Check,
  Download,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Linkedin,
  Lock,
  Shield,
  ShieldCheck,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import TikTokIcon from "../components/ui/TikTokIcon.jsx";

/** Icons referenced by name from content JSON. */
const icons = {
  Calculator,
  Check,
  Download,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Linkedin,
  Lock,
  Shield,
  ShieldCheck,
  TikTok: TikTokIcon,
  Twitter,
  Youtube,
  Zap,
};

export function getIcon(name) {
  const Icon = icons[name];
  if (!Icon) throw new Error(`Unknown icon "${name}" — add it to src/lib/icons.js`);
  return Icon;
}
