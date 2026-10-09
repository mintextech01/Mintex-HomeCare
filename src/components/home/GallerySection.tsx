import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";

const GallerySection = () => {
  const { gallery } = useAdmin();

  if (gallery.length === 0) return null;

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-12">
          <div className="el-eyebrow mb-5">Our Gallery</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Moments of Care
          </h2>
        </AnimatedSection>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {gallery.map((img, i) => (
            <AnimatedSection key={img.id} delay={(i % 6) * 0.05}>
              <figure className="break-inside-avoid el-card p-2 group">
                <div className="rounded-[14px] overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.caption || "Gallery image"}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                {img.caption && (
                  <figcaption className="px-3 pt-3 pb-2 text-sm text-muted-foreground font-sans">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
