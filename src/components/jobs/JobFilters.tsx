import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { FilterOption } from "@/types/job";
import { employmentTypes } from "@/data/jobs";

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export function JobFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}: JobFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 mb-8"
    >
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by job title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 h-10 border-border/50 focus:border-accent/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Employment Type Filters */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Filter by type
        </p>
        <Tabs value={selectedFilter} onValueChange={(value) => onFilterChange(value as FilterOption)}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
            {employmentTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="text-xs md:text-sm px-3 py-2 rounded-lg border border-border/50 bg-background data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </motion.div>
  );
}
