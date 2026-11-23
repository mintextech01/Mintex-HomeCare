import type { LucideIcon } from "lucide-react";
import {
  ArrowsClockwise, FirstAidKit, Bank, Barbell, Bathtub, Brain, Briefcase, Buildings, Calculator, CalendarBlank, CalendarCheck,
  CalendarDots, Chats, ChatCircle, ClipboardText, Clock, ClockCountdown, Coffee, CreditCard, CurrencyDollar, DeviceMobile,
  Envelope, Eye, FileSearch, FileText, Flask, GraduationCap, Hand, HandHeart, Handshake, Heart, Heartbeat, Hospital, House,
  Info, ListChecks, ListNumbers, MagnifyingGlass, MapPin, Medal, Money, Moon, NavigationArrow, Newspaper, Phone, PhoneCall,
  PiggyBank, Pill, Pulse, Question, Quotes, Receipt, Scales, SealCheck, ShieldCheck, Sparkle, Star, Stethoscope, Syringe,
  Target, ThumbsUp, TrendUp, UserCheck, UsersThree, Wallet, Wheelchair, type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

/**
 * Site icon in one consistent two-tone style: Mintex-blue outline with a light blue tint inside
 * (Phosphor "duotone" icons). Pages keep passing their lucide icon; it is swapped for the matching Phosphor
 * icon by name. An icon without a match falls back to a plain blue lucide outline.
 */
const DUOTONE: Record<string, PhosphorIcon> = {
  Accessibility: Wheelchair, Activity: Pulse, Award: Medal, BadgeCheck: SealCheck, Bandage: FirstAidKit, Banknote: Money,
  Bath: Bathtub, Brain, Briefcase, Building2: Buildings, Calculator, CalendarCheck, CalendarClock: ClockCountdown,
  CalendarDays: CalendarDots, CalendarRange: CalendarBlank, ClipboardCheck: ClipboardText, ClipboardList: ClipboardText,
  Clock, Coffee, CreditCard, DollarSign: CurrencyDollar, Dumbbell: Barbell, Eye, FileSearch, FileText,
  FlaskConical: Flask, GraduationCap, Hand, HeartHandshake: HandHeart, Handshake, Heart, HeartPulse: Heartbeat,
  HelpCircle: Question, Home: House, Hospital, Info, Landmark: Bank, ListChecks, ListOrdered: ListNumbers, Mail: Envelope,
  MapPin, MessageCircle: ChatCircle, MessagesSquare: Chats, Moon, Navigation: NavigationArrow, Newspaper, Phone, PhoneCall,
  PiggyBank, Pill, Quote: Quotes, Receipt, RefreshCw: ArrowsClockwise, Scale: Scales, Search: MagnifyingGlass, ShieldCheck,
  Smartphone: DeviceMobile, Sparkles: Sparkle, Star, Stethoscope, Syringe, Target, ThumbsUp, TrendingUp: TrendUp,
  UserCheck, Users: UsersThree, Wallet,
};

const SIZES = { xs: "h-7 w-7", sm: "h-9 w-9", md: "h-12 w-12", lg: "h-[60px] w-[60px]" } as const;

// Phosphor draws the duotone layer as a path with opacity="0.2" in the icon colour. Every icon gets the same
// Mintex-blue outline and the same light blue tint, so icons with big fill areas (clock, heart) and small ones
// (house, stethoscope) look balanced. (A solid fill made some icons heavy blue blobs and others look empty.)
const FILL = "[&_[opacity]]:fill-primary [&_[opacity]]:opacity-[0.18]";
const FILL_ON_DARK = "[&_[opacity]]:fill-primary [&_[opacity]]:opacity-60";

export const FeatureIcon = ({ icon, size = "lg", onDark = false, className = "" }: {
  icon: LucideIcon; size?: keyof typeof SIZES; onDark?: boolean; className?: string;
}) => {
  const line = onDark ? "text-background/90" : "text-primary";
  const Duo = DUOTONE[icon.displayName ?? ""];
  if (Duo) {
    return <Duo aria-hidden="true" weight="duotone" className={`block shrink-0 ${SIZES[size]} ${line} ${onDark ? FILL_ON_DARK : FILL} ${className}`} />;
  }
  const Icon = icon;
  return <Icon aria-hidden="true" className={`block shrink-0 ${SIZES[size]} ${line} ${className}`} strokeWidth={1.5} />;
};

export default FeatureIcon;
