import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, DollarSign, CheckCircle2 } from "lucide-react";
import { Job } from "@/types/job";

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyClick: (job: Job) => void;
}

export function JobDetailModal({ job, isOpen, onOpenChange, onApplyClick }: JobDetailModalProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-accent/15 text-accent border-accent/30">{job.employmentType}</Badge>
            {job.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Featured</Badge>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</p>
                <p className="text-sm text-foreground font-medium">{job.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</p>
                <p className="text-sm text-foreground font-medium">{job.employmentType}</p>
              </div>
            </div>
            {job.salaryRange && (
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Salary</p>
                  <p className="text-sm text-foreground font-medium">
                    ${(job.salaryRange.min / 1000).toFixed(0)}K - ${(job.salaryRange.max / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">About the Role</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{job.fullDescription}</p>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/70">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/70">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 rounded-full font-semibold"
              style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
              onClick={() => {
                onApplyClick(job);
                onOpenChange(false);
              }}
            >
              Apply Now
            </Button>
            <Button
              size="lg"
              className="flex-1 rounded-full font-medium text-foreground hover:text-primary transition-colors glass-btn"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
