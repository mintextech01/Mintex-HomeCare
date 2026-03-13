import {
  Clock, Home, Stethoscope, Dumbbell, Building2, HeartHandshake,
  Syringe, Bath, ShoppingBag, CalendarCheck, Users, Timer,
  Pill, SprayCan, Shirt, UtensilsCrossed,
  Heart, Bandage, Brain, Footprints, MessageSquare, Hand,
  HelpCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Clock, Home, Stethoscope, Dumbbell, Building2, HeartHandshake,
  Syringe, Bath, ShoppingBag, CalendarCheck, Users, Timer,
  Pill, SprayCan, Shirt, UtensilsCrossed,
  Heart, Bandage, Brain, Footprints, MessageSquare, Hand,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || HelpCircle;
export const iconNames = Object.keys(iconMap);
