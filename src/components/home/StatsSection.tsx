import { Users, Clock, ShieldCheck, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Families Served" },
  { icon: Clock, value: 24, suffix: "/7", label: "Care Available" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Licensed & Bonded Caregivers" },
  { icon: Heart, value: 100, suffix: "%", label: "Personalized Care Plans" },
];

const StatsSection = () => (
  <section className="pb-16 md:pb-20">
    <div className="container mx-auto px-6 md:px-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="el-card flex flex-col justify-between gap-8 p-5 md:p-7 min-h-[170px] md:min-h-[200px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-none">{stat.value}{stat.suffix}</div>
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-sm md:text-base font-semibold text-foreground/80 font-sans leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
