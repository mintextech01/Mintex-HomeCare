import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin, Clock } from "lucide-react";
import { Job, formatPay } from "@/types/job";
import { Link } from "react-router-dom";
import { jobUrl } from "@/data/careers";

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
        className="h-full flex flex-col overflow-hidden rounded-[24px] border-0 shadow-none bg-surface hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-300 cursor-pointer"
        onClick={() => onDetailsClick(job)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge
              variant="outline"
              className="text-xs px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground border-transparent hover:bg-accent"
            >
              {job.employmentType}
            </Badge>
            {job.featured && (
              <Badge
                className="text-xs px-2.5 py-0.5 rounded-full bg-foreground text-background border-transparent"
                variant="outline"
              >
                Featured
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg leading-tight line-clamp-2 text-foreground hover:text-primary transition-colors">
            {/* A real link so the job page is crawlable; the whole card is clickable too. */}
            {job.slug
              ? <Link to={jobUrl(job.slug)} onClick={e => e.stopPropagation()}>{job.title}</Link>
              : job.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-4">
          {/* Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>{job.location}</span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                <span>
                  {formatPay(job.salaryRange)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">{job.description}</p>

          {/* CTA Buttons */}
          <div className="flex gap-2 pt-2 mt-auto">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                className="w-full rounded-full font-semibold bg-foreground text-background hover:bg-foreground/85"
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
                className="rounded-full font-medium bg-background text-foreground hover:bg-accent transition-colors"
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
