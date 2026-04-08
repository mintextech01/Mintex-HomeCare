import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { JobCard } from "./JobCard";
import { FeaturedJobCard } from "./FeaturedJobCard";
import { JobFilters } from "./JobFilters";
import { JobDetailModal } from "./JobDetailModal";
import { jobsData } from "@/data/jobs";
import { Job, FilterOption } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

interface JobsSectionProps {
  title?: string;
  subtitle?: string;
}

export function JobsSection({
  title = "Join Our Team",
  subtitle = "Discover rewarding nursing career opportunities",
}: JobsSectionProps) {
  const { contactInfo } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter jobs based on search and employment type
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "full-time" && job.employmentType === "Full-time") ||
        (selectedFilter === "part-time" && job.employmentType === "Part-time") ||
        (selectedFilter === "per-diem" && job.employmentType === "Per Diem");

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Separate featured and regular jobs
  const featuredJobs = filteredJobs.filter((job) => job.featured);
  const regularJobs = filteredJobs.filter((job) => !job.featured);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleApply = (_job: Job) => {
    // TODO: open apply form or redirect to application page
  };

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative theme-color blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/6 pointer-events-none blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent/6 pointer-events-none blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-label mb-3">Career Opportunities</p>
          <h2 className="heading-h2 mb-4 text-balance">
            {title}
          </h2>
          <p className="body-text text-foreground/70">{subtitle}</p>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.1} className="mb-8">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </AnimatedSection>

        {/* Jobs Grid */}
        <AnimatedSection delay={0.15}>
          {filteredJobs.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 px-4"
            >
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
              <p className="text-foreground/70 mb-6">
                Try adjusting your search or filter criteria to find more opportunities.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="rounded-full font-medium text-foreground hover:text-primary transition-colors glass-btn"
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Featured Jobs */}
              {featuredJobs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider">
                    ⭐ Featured Positions
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredJobs.map((job) => (
                      <FeaturedJobCard
                        key={job.id}
                        job={job}
                        onDetailsClick={handleJobSelect}
                        onApplyClick={handleApply}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Jobs */}
              {regularJobs.length > 0 && (
                <div>
                  {featuredJobs.length > 0 && (
                    <p className="text-xs font-semibold text-primary/70 mb-4 uppercase tracking-wider">
                      Other Positions
                    </p>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularJobs.map((job, idx) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onDetailsClick={handleJobSelect}
                        onApplyClick={handleApply}
                        delay={idx * 0.05}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.2} className="text-center mt-12">
          <p className="text-foreground/70 mb-4">
            Don't see a position that fits? We're always looking for talented healthcare professionals.
          </p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/20"
          >
            Send Your Resume
          </a>
        </AnimatedSection>
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onApplyClick={handleApply}
      />
    </section>
  );
}
