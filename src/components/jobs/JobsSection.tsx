import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { JobCard } from "./JobCard";
import { FeaturedJobCard } from "./FeaturedJobCard";
import { JobFilters } from "./JobFilters";
import { Job, FilterOption } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { activeJobsWithSlugs, applyUrl, jobUrl, positionToJob } from "@/data/careers";

interface JobsSectionProps {
  title?: string;
  subtitle?: string;
}

export function JobsSection({
  title = "Join Our Team",
  subtitle = "Discover rewarding nursing career opportunities",
}: JobsSectionProps) {
  const { jobPositions } = useAdmin();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");

  // Convert active admin job positions to Job format (each with its page slug)
  const jobsData: Job[] = useMemo(
    () => activeJobsWithSlugs(jobPositions).map(({ position, slug }) => ({ ...positionToJob(position), slug })),
    [jobPositions]
  );

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
  }, [jobsData, searchQuery, selectedFilter]);

  // Separate featured and regular jobs
  const featuredJobs = filteredJobs.filter((job) => job.featured);
  const regularJobs = filteredJobs.filter((job) => !job.featured);

  // Each job has its own page; "Apply Now" opens the application form with that job selected.
  const handleJobSelect = (job: Job) => navigate(jobUrl(job.slug!));
  const handleApply = (job: Job) => navigate(applyUrl(job.slug));

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="el-eyebrow mb-5">Career Opportunities</div>
          <h2 className="heading-h2 mb-4 text-balance">
            {title}
          </h2>
          <p className="body-text text-muted-foreground">{subtitle}</p>
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
                className="el-btn-outline"
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Featured Jobs */}
              {featuredJobs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">
                    ⭐ Featured Positions
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                      Other Positions
                    </p>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <p className="text-muted-foreground mb-5">
            Don't see a position that fits? We're always looking for talented healthcare professionals.
          </p>
          <Link
            to={applyUrl()}
            className="el-btn-primary"
          >
            Send a General Application
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
