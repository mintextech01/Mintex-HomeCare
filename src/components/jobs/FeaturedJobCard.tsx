import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { Job } from "@/types/job";

interface FeaturedJobCardProps {
  job: Job;
  onDetailsClick: (job: Job) => void;
  onApplyClick: (job: Job) => void;
}

export function FeaturedJobCard({ job, onDetailsClick, onApplyClick }: FeaturedJobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="md:col-span-2 lg:col-span-2"
    >
      <Card
        className="h-full overflow-hidden border-primary/25 bg-gradient-to-br from-primary/5 via-background to-accent/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer shadow-md"
        onClick={() => onDetailsClick(job)}
      >
        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Left: Job Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Badge className="text-xs px-3 py-1 bg-accent/15 text-accent border-accent/30 hover:bg-accent/25">
                  {job.employmentType}
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl leading-tight mb-3 text-foreground">
                {job.title}
              </CardTitle>
              <CardDescription className="text-base text-foreground/70 line-clamp-4 mb-4">
                {job.fullDescription || job.description}
              </CardDescription>
            </div>

            {/* Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
                <span>{job.location}</span>
              </div>
              {job.salaryRange && (
                <div className="flex items-center gap-2 text-sm text-foreground/70 font-semibold">
                  <Clock className="h-4 w-4 flex-shrink-0 text-accent" />
                  <span>
                    ${(job.salaryRange.min / 1000).toFixed(0)}K - ${(job.salaryRange.max / 1000).toFixed(0)}K/yr
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Key Benefits & CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Key Benefits</h4>
              <ul className="space-y-2 mb-4">
                {job.benefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full rounded-full font-semibold text-base"
                  style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyClick(job);
                  }}
                >
                  Apply Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="rounded-full font-medium text-foreground hover:text-primary transition-colors glass-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDetailsClick(job);
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
