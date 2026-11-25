import { Users, Clock, ShieldCheck, Heart } from "lucide-react";
import StatsRow from "@/components/StatsRow";

const stats = [
  { icon: Users, value: "500+", label: "Families served" },
  { icon: Clock, value: "Mon–Fri", label: "Office hours, 9 AM – 5 PM" },
  { icon: ShieldCheck, value: "100%", label: "Licensed & bonded caregivers" },
  { icon: Heart, value: "100%", label: "Personalized care plans" },
];

const StatsSection = () => (
  <section className="pb-12 md:pb-14">
    <div className="container mx-auto px-6 md:px-10">
      <StatsRow stats={stats} />
    </div>
  </section>
);

export default StatsSection;
