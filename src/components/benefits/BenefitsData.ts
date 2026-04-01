import { LucideIcon } from "lucide-react";
import {
  DollarSign,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefitsData: Benefit[] = [
  {
    id: "compensation",
    icon: DollarSign,
    title: "Competitive Compensation",
    description:
      "We offer competitive pay that reflects your skills, dedication, and the quality care you provide.",
  },
  {
    id: "location",
    icon: MapPin,
    title: "Easy Location",
    description:
      "Conveniently located in New Jersey to make your commute simple and stress-free every day.",
  },
  {
    id: "scheduling",
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Balance your work and personal life with our flexible shift options built around your needs.",
  },
  {
    id: "environment",
    icon: Users,
    title: "Supportive Work Environment",
    description:
      "Work alongside compassionate professionals in the industry and build strong, lasting networks.",
  },
  {
    id: "development",
    icon: GraduationCap,
    title: "Ongoing Training & Development",
    description:
      "Get resources for developing your skills and knowledge to advance your healthcare career.",
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth & Advancement",
    description:
      "Get recognized and rewarded for your hard work, dedication, and outstanding performance.",
  },
];
