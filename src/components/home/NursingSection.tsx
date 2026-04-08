import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

/**
 * Inline SVG flat-character illustrations — Care.com style.
 * Zero network requests, instant load, full colour control.
 */
const cards = [
  {
    title: "Physical Therapy",
    description:
      "Personalized therapy programs to restore strength, balance, and mobility in the comfort of your home.",
    bg: "#ddeeff",
    illustration: (
      <svg viewBox="0 0 200 210" fill="none" className="w-full h-full">
        {/* hair */}
        <ellipse cx="100" cy="26" rx="24" ry="16" fill="#2C1A14" />
        {/* head */}
        <circle cx="100" cy="44" r="24" fill="#C68642" />
        {/* eyes */}
        <circle cx="92" cy="44" r="3" fill="#4E342E" />
        <circle cx="108" cy="44" r="3" fill="#4E342E" />
        {/* smile */}
        <path d="M92 53 Q100 61 108 53" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* torso — blue active-wear */}
        <rect x="80" y="70" width="40" height="50" rx="10" fill="#1E88E5" />
        {/* arms raised — exercise pose */}
        <path d="M82 80 L50 52" stroke="#1E88E5" strokeWidth="16" strokeLinecap="round" />
        <path d="M118 80 L150 52" stroke="#1E88E5" strokeWidth="16" strokeLinecap="round" />
        {/* resistance band between hands */}
        <path d="M50 52 Q100 28 150 52" stroke="#FF7043" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="8 4" />
        {/* legs */}
        <path d="M88 120 L82 185" stroke="#1565C0" strokeWidth="18" strokeLinecap="round" />
        <path d="M112 120 L118 185" stroke="#1565C0" strokeWidth="18" strokeLinecap="round" />
        {/* shoes */}
        <ellipse cx="79" cy="185" rx="14" ry="7" fill="#333" />
        <ellipse cx="121" cy="185" rx="14" ry="7" fill="#333" />
      </svg>
    ),
  },
  {
    title: "Occupational Therapy",
    description:
      "Helping patients rebuild daily living skills and regain independence through tailored therapy sessions.",
    bg: "#fde8f0",
    illustration: (
      <svg viewBox="0 0 240 210" fill="none" className="w-full h-full">
        {/* — Elderly patient (left) — */}
        <ellipse cx="78" cy="28" rx="20" ry="12" fill="#9E9E9E" />
        <circle cx="78" cy="44" r="20" fill="#FFBE98" />
        <circle cx="71" cy="44" r="2.5" fill="#4E342E" />
        <circle cx="85" cy="44" r="2.5" fill="#4E342E" />
        <path d="M71 52 Q78 59 85 52" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="60" y="66" width="36" height="44" rx="8" fill="#8D6E63" />
        {/* left arm holds walker */}
        <path d="M62 76 L44 92" stroke="#8D6E63" strokeWidth="14" strokeLinecap="round" />
        {/* walker */}
        <path d="M36 92 L36 175" stroke="#BDBDBD" strokeWidth="5" strokeLinecap="round" />
        <path d="M52 92 L52 175" stroke="#BDBDBD" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 92 L52 92" stroke="#BDBDBD" strokeWidth="5" strokeLinecap="round" />
        <path d="M30 175 L42 175" stroke="#BDBDBD" strokeWidth="5" strokeLinecap="round" />
        <path d="M46 175 L58 175" stroke="#BDBDBD" strokeWidth="5" strokeLinecap="round" />
        {/* right arm */}
        <path d="M94 76 L104 94" stroke="#8D6E63" strokeWidth="14" strokeLinecap="round" />
        {/* legs */}
        <path d="M68 110 L62 178" stroke="#795548" strokeWidth="16" strokeLinecap="round" />
        <path d="M88 110 L94 178" stroke="#795548" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="60" cy="178" rx="12" ry="6" fill="#333" />
        <ellipse cx="96" cy="178" rx="12" ry="6" fill="#333" />

        {/* — Caregiver (right) — */}
        <ellipse cx="170" cy="24" rx="22" ry="14" fill="#4A148C" />
        <circle cx="170" cy="42" r="22" fill="#F0C599" />
        <circle cx="162" cy="42" r="3" fill="#4E342E" />
        <circle cx="178" cy="42" r="3" fill="#4E342E" />
        <path d="M162 51 Q170 59 178 51" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="152" y="66" width="36" height="48" rx="10" fill="#E91E63" />
        {/* left arm reaches toward patient */}
        <path d="M154 76 L126 90" stroke="#E91E63" strokeWidth="14" strokeLinecap="round" />
        {/* right arm */}
        <path d="M186 76 L196 84" stroke="#E91E63" strokeWidth="14" strokeLinecap="round" />
        {/* legs */}
        <path d="M158 114 L152 178" stroke="#880E4F" strokeWidth="16" strokeLinecap="round" />
        <path d="M182 114 L188 178" stroke="#880E4F" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="150" cy="178" rx="13" ry="6" fill="#333" />
        <ellipse cx="190" cy="178" rx="13" ry="6" fill="#333" />
      </svg>
    ),
  },
  {
    title: "Speech Therapy",
    description:
      "Expert speech and language therapy to improve communication and swallowing with compassionate care.",
    bg: "#ede8ff",
    illustration: (
      <svg viewBox="0 0 200 210" fill="none" className="w-full h-full">
        {/* speech bubble */}
        <rect x="112" y="16" width="68" height="46" rx="14" fill="#9C27B0" opacity="0.18" />
        <path d="M120 62 L112 76 L134 62" fill="#9C27B0" opacity="0.18" />
        <circle cx="130" cy="39" r="5" fill="#9C27B0" opacity="0.45" />
        <circle cx="146" cy="39" r="5" fill="#9C27B0" opacity="0.45" />
        <circle cx="162" cy="39" r="5" fill="#9C27B0" opacity="0.45" />
        {/* person */}
        <ellipse cx="88" cy="26" rx="22" ry="15" fill="#1A0A00" />
        <circle cx="88" cy="44" r="23" fill="#A0522D" />
        <circle cx="80" cy="44" r="3" fill="#4E342E" />
        <circle cx="96" cy="44" r="3" fill="#4E342E" />
        <path d="M80 53 Q88 61 96 53" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="70" y="69" width="36" height="50" rx="9" fill="#9C27B0" />
        {/* right arm raised toward bubble */}
        <path d="M104 78 L130 62" stroke="#9C27B0" strokeWidth="15" strokeLinecap="round" />
        {/* left arm */}
        <path d="M72 78 L52 96" stroke="#9C27B0" strokeWidth="15" strokeLinecap="round" />
        {/* legs */}
        <path d="M76 119 L70 182" stroke="#6A1B9A" strokeWidth="17" strokeLinecap="round" />
        <path d="M100 119 L106 182" stroke="#6A1B9A" strokeWidth="17" strokeLinecap="round" />
        <ellipse cx="68" cy="182" rx="13" ry="6" fill="#333" />
        <ellipse cx="108" cy="182" rx="13" ry="6" fill="#333" />
      </svg>
    ),
  },
  {
    title: "IV Therapy",
    description:
      "Safe, professional intravenous therapy administered by licensed nurses in the comfort of your home.",
    bg: "#d8f5f0",
    illustration: (
      <svg viewBox="0 0 200 210" fill="none" className="w-full h-full">
        {/* IV pole */}
        <path d="M158 28 L158 188" stroke="#B0BEC5" strokeWidth="6" strokeLinecap="round" />
        <path d="M142 28 L174 28" stroke="#B0BEC5" strokeWidth="6" strokeLinecap="round" />
        {/* IV bag */}
        <rect x="142" y="28" width="32" height="48" rx="10" fill="#80CBC4" opacity="0.85" />
        <path d="M158 76 L158 88" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" />
        {/* tube to arm */}
        <path d="M158 88 Q140 120 104 124" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* wheels */}
        <circle cx="150" cy="188" r="7" fill="#90A4AE" />
        <circle cx="166" cy="188" r="7" fill="#90A4AE" />
        {/* nurse */}
        <ellipse cx="88" cy="26" rx="22" ry="14" fill="#8D6E63" />
        <circle cx="88" cy="43" r="22" fill="#F0C599" />
        {/* nurse cap */}
        <rect x="70" y="12" width="36" height="12" rx="4" fill="white" />
        <rect x="83" y="8" width="10" height="6" rx="2" fill="#EF5350" />
        <circle cx="80" cy="43" r="3" fill="#4E342E" />
        <circle cx="96" cy="43" r="3" fill="#4E342E" />
        <path d="M80 52 Q88 60 96 52" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* white coat */}
        <rect x="70" y="67" width="36" height="52" rx="9" fill="white" />
        <rect x="75" y="72" width="26" height="42" rx="6" fill="#26A69A" />
        {/* stethoscope */}
        <path d="M78 80 Q72 96 80 102" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="80" cy="104" r="4" fill="#9E9E9E" />
        {/* arms */}
        <path d="M72 76 L54 92" stroke="white" strokeWidth="15" strokeLinecap="round" />
        <path d="M106 76 L128 88" stroke="white" strokeWidth="15" strokeLinecap="round" />
        {/* IV in right arm */}
        <circle cx="124" cy="124" r="5" fill="#EF9A9A" />
        {/* legs */}
        <path d="M76 119 L70 182" stroke="#00695C" strokeWidth="17" strokeLinecap="round" />
        <path d="M100 119 L106 182" stroke="#00695C" strokeWidth="17" strokeLinecap="round" />
        <ellipse cx="68" cy="182" rx="13" ry="6" fill="#333" />
        <ellipse cx="108" cy="182" rx="13" ry="6" fill="#333" />
      </svg>
    ),
  },
  {
    title: "Wound Care",
    description:
      "Advanced wound assessment, dressing changes, and treatment to ensure safe, effective healing.",
    bg: "#e8fbff",
    illustration: (
      <svg viewBox="0 0 200 210" fill="none" className="w-full h-full">
        {/* person */}
        <ellipse cx="100" cy="26" rx="22" ry="15" fill="#3E2723" />
        <circle cx="100" cy="44" r="23" fill="#8D5524" />
        <circle cx="92" cy="44" r="3" fill="#3E2723" />
        <circle cx="108" cy="44" r="3" fill="#3E2723" />
        <path d="M92 53 Q100 61 108 53" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* medical scrubs */}
        <rect x="80" y="68" width="40" height="52" rx="10" fill="#29B6F6" />
        {/* medical cross on chest */}
        <rect x="97" y="76" width="6" height="20" rx="2" fill="white" />
        <rect x="91" y="82" width="18" height="6" rx="2" fill="white" />
        {/* left arm — holds clipboard */}
        <path d="M82 78 L58 90" stroke="#29B6F6" strokeWidth="15" strokeLinecap="round" />
        {/* clipboard */}
        <rect x="36" y="84" width="26" height="36" rx="4" fill="#B0BEC5" />
        <rect x="44" y="78" width="10" height="8" rx="4" fill="#607D8B" />
        <path d="M42 96 L56 96" stroke="white" strokeWidth="2" />
        <path d="M42 104 L56 104" stroke="white" strokeWidth="2" />
        <path d="M42 112 L50 112" stroke="white" strokeWidth="2" />
        {/* right arm */}
        <path d="M118 78 L142 88" stroke="#29B6F6" strokeWidth="15" strokeLinecap="round" />
        {/* bandage on wrist */}
        <rect x="136" y="82" width="20" height="12" rx="6" fill="white" />
        <path d="M140 88 L152 88" stroke="#EF5350" strokeWidth="2" />
        <path d="M146 82 L146 94" stroke="#EF5350" strokeWidth="2" />
        {/* legs */}
        <path d="M88 120 L82 182" stroke="#0277BD" strokeWidth="17" strokeLinecap="round" />
        <path d="M112 120 L118 182" stroke="#0277BD" strokeWidth="17" strokeLinecap="round" />
        <ellipse cx="80" cy="182" rx="13" ry="6" fill="#333" />
        <ellipse cx="120" cy="182" rx="13" ry="6" fill="#333" />
      </svg>
    ),
  },
  {
    title: "Medication Management",
    description:
      "Ensuring correct, timely medication routines with professional oversight from skilled nurses.",
    bg: "#fff4de",
    illustration: (
      <svg viewBox="0 0 200 210" fill="none" className="w-full h-full">
        {/* person */}
        <ellipse cx="95" cy="26" rx="22" ry="15" fill="#4E342E" />
        <circle cx="95" cy="44" r="23" fill="#D4956B" />
        <circle cx="87" cy="44" r="3" fill="#4E342E" />
        <circle cx="103" cy="44" r="3" fill="#4E342E" />
        <path d="M87 53 Q95 61 103 53" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* shirt */}
        <rect x="77" y="68" width="36" height="52" rx="9" fill="#FFA726" />
        {/* left arm — holds bottle */}
        <path d="M79 78 L54 92" stroke="#FFA726" strokeWidth="15" strokeLinecap="round" />
        {/* medicine bottle */}
        <rect x="36" y="84" width="22" height="36" rx="6" fill="#EF5350" />
        <rect x="38" y="76" width="18" height="10" rx="5" fill="#B71C1C" />
        <path d="M42 98 L52 98" stroke="white" strokeWidth="2" />
        <path d="M42 106 L52 106" stroke="white" strokeWidth="2" />
        <path d="M42 114 L48 114" stroke="white" strokeWidth="2" />
        {/* right arm — holds pill */}
        <path d="M111 78 L138 70" stroke="#FFA726" strokeWidth="15" strokeLinecap="round" />
        {/* pill */}
        <ellipse cx="150" cy="68" rx="13" ry="9" fill="white" />
        <path d="M137 68 L163 68" stroke="#FFA726" strokeWidth="2" />
        {/* checklist floating right */}
        <rect x="138" y="88" width="46" height="58" rx="6" fill="white" opacity="0.9" />
        <path d="M146 102 L168 102" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M146 112 L168 112" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M146 122 L160 122" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M142 100 L144 104 L149 96" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M142 110 L144 114 L149 106" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* legs */}
        <path d="M83 120 L77 182" stroke="#E65100" strokeWidth="17" strokeLinecap="round" />
        <path d="M107 120 L113 182" stroke="#E65100" strokeWidth="17" strokeLinecap="round" />
        <ellipse cx="75" cy="182" rx="13" ry="6" fill="#333" />
        <ellipse cx="115" cy="182" rx="13" ry="6" fill="#333" />
      </svg>
    ),
  },
];

const cardKeys = [
  "nursingCard1",
  "nursingCard2",
  "nursingCard3",
  "nursingCard4",
  "nursingCard5",
  "nursingCard6",
] as const;

const NursingSection = () => {
  const { siteImages } = useAdmin();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.22em] mb-3">
            Specialized Care
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
            Skilled nursing for every stage of life
          </h2>
        </AnimatedSection>

        {/* Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {cards.map((card, idx) => {
              const customImg = siteImages[cardKeys[idx]];
              return (
                <Link
                  key={card.title}
                  to="/services"
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
                >
                  {/* Title */}
                  <div className="flex items-start justify-between px-4 pt-5 pb-3 gap-2 flex-shrink-0">
                    <span className="font-sans font-semibold text-sm text-foreground leading-snug">
                      {card.title}
                    </span>
                    <ArrowRight className="h-[18px] w-[18px] text-foreground/40 flex-shrink-0 mt-0.5 group-hover:translate-x-1 group-hover:text-primary transition-all duration-200" />
                  </div>

                  {/* Illustration / hover-description area */}
                  <div
                    className="relative mx-3 mb-3 rounded-xl overflow-hidden flex-1 min-h-[160px] sm:min-h-[200px] lg:min-h-[230px]"
                    style={{ backgroundColor: card.bg }}
                  >
                    {/* Illustration */}
                    <div className="absolute inset-0 flex items-end justify-center pb-1 transition-opacity duration-300 group-hover:opacity-0">
                      {customImg ? (
                        <img src={customImg} alt={card.title} className="w-full h-full object-cover" />
                      ) : (
                        card.illustration
                      )}
                    </div>

                    {/* Description — fades in on hover */}
                    <div
                      className="absolute inset-0 flex items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: card.bg }}
                    >
                      <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mt-10" delay={0.15}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-sans font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            View All Services <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NursingSection;
