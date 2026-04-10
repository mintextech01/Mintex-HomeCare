import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { motion } from "framer-motion";

const GallerySection = () => {
  const { gallery } = useAdmin();

  if (gallery.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-hero-bg">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-3 text-center">
            Our Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-10">
            Moments of Care
          </h2>
        </AnimatedSection>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {gallery.map((img, i) => (
            <AnimatedSection key={img.id} delay={i * 0.05} from={i % 3 === 0 ? "depth" : i % 3 === 1 ? "flip3d" : "rotateUp"}>
              <motion.div
                className="break-inside-avoid rounded-xl overflow-hidden shadow-md group"
                whileHover={{
                  scale: 1.03,
                  rotateY: 2,
                  rotateX: -1,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(38,104,188,0.06)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <p className="px-4 py-2 text-sm text-muted-foreground font-sans bg-card">
                    {img.caption}
                  </p>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;