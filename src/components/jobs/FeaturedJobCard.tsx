import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { jobUrl } from "@/data/careers";
import { ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { Job, formatPay } from "@/types/job";

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
        className="h-full overflow-hidden rounded-[28px] border-0 shadow-none bg-accent hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-300 cursor-pointer"
        onClick={() => onDetailsClick(job)}
      >
        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Left: Job Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-foreground fill-foreground" />
                <Badge className="text-xs px-3 py-1 rounded-full bg-background text-foreground border-transparent hover:bg-background">
                  {job.employmentType}
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl leading-tight mb-3 text-foreground">
                {job.slug
                  ? <Link to={jobUrl(job.slug)} onClick={e => e.stopPropagation()} className="hover:text-primary transition-colors">{job.title}</Link>
                  : job.title}
              </CardTitle>
              <CardDescription className="text-base text-accent-foreground/75 line-clamp-4 mb-4">
                {job.fullDescription || job.description}
              </CardDescription>
            </div>

            {/* Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              {job.salaryRange && (
                <div className="flex items-center gap-2 text-sm text-foreground/70 font-semibold">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {formatPay(job.salaryRange)}
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
                    <span className="text-foreground font-bold mt-0.5">•</span>
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
                  className="w-full rounded-full font-semibold text-base bg-foreground text-background hover:bg-foreground/85"
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
                  className="rounded-full font-medium bg-background text-foreground hover:bg-background/80 transition-colors"
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
