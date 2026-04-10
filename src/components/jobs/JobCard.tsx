import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin, Clock } from "lucide-react";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onDetailsClick: (job: Job) => void;
  onApplyClick: (job: Job) => void;
  delay?: number;
}

export function JobCard({ job, onDetailsClick, onApplyClick, delay = 0 }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card
        className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
        onClick={() => onDetailsClick(job)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 bg-accent/10 text-accent border-accent/30 hover:bg-accent/20"
            >
              {job.employmentType}
            </Badge>
            {job.featured && (
              <Badge
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/30"
                variant="outline"
              >
                Featured
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg leading-tight line-clamp-2 text-foreground hover:text-primary transition-colors">
            {job.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-4">
          {/* Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
              <span>{job.location}</span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0 text-accent" />
                <span>
                  ${(job.salaryRange.min / 1000).toFixed(0)}K - ${(job.salaryRange.max / 1000).toFixed(0)}K/yr
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed flex-1">{job.description}</p>

          {/* CTA Buttons */}
          <div className="flex gap-2 pt-2 mt-auto">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                className="w-full rounded-full font-semibold"
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
                size="sm"
                className="rounded-full font-medium text-foreground hover:text-primary transition-colors glass-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDetailsClick(job);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
