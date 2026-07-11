import { useNavigate } from "react-router-dom";
import { HiOutlineCubeTransparent, HiOutlineBolt, HiOutlineMapPin, HiOutlineChartBar } from "react-icons/hi2";
import Button from "../components/ui/Button";
import heroSkyline from "../assets/hero-skyline.jpg";

const SHOCK_EXAMPLES = [
  { icon: HiOutlineBolt, label: "Raise property tax", detail: "in a single district" },
  { icon: HiOutlineMapPin, label: "Add a metro line", detail: "connecting two zones" },
  { icon: HiOutlineChartBar, label: "Rezone a district", detail: "industrial → mixed use" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent/30 to-data/10 border border-white/10 flex items-center justify-center">
            <HiOutlineCubeTransparent className="text-accent" size={16} />
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight">Genesis</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          rounded="rounded-full"
          onClick={() => navigate("/dashboard")}
        >
          Open dashboard
        </Button>
      </header>

      {/* Hero — your reference photo as the actual background, with a
          gradient overlay so headline/body text stay legible over it. */}
      <section className="city-lights relative overflow-hidden" style={{ paddingBottom: 380 }}>
        <img
          src={heroSkyline}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay: darkens the photo and blends its edges into the rest
            of the page so panels/text below don't hard-cut against it. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,5,10,0.55) 0%, rgba(8,5,10,0.25) 35%, rgba(8,5,10,0.75) 75%, #08050A 100%)",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center relative z-10">
          <div className="glass inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse" />
            <span className="text-[11px] text-text-secondary font-mono">42,180 agents simulating</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-5 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            A synthetic city that{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#FB7185] via-[#E11D48] to-[#F0335C] bg-clip-text text-transparent">
              reacts
            </span>
            <br />
            to the policies you write.
          </h1>

          <p className="text-text-secondary text-base max-w-xl mx-auto mb-9 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Genesis simulates thousands of autonomous households, businesses, and
            commuters. Inject a policy shock and watch the ripple move through
            rent, employment, and traffic in real time.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button variant="primary" size="md" rounded="rounded-full" onClick={() => navigate("/dashboard")}>
              Start simulation
            </Button>
            <Button
              variant="ghost"
              size="md"
              rounded="rounded-full"
              onClick={() => document.getElementById("shocks")?.scrollIntoView({ behavior: "smooth" })}
            >
              How it works
            </Button>
          </div>
        </div>
      </section>

      {/* Policy shocks explainer */}
      <section id="shocks" className="max-w-4xl mx-auto px-6 pb-28 relative z-10">
        <p className="text-center text-[11px] uppercase tracking-widest text-text-tertiary mb-4">
          How a shock propagates
        </p>
        <div className="dotted-panel rounded-2xl p-6 bg-surface/40">
          <div className="grid sm:grid-cols-3 gap-4">
            {SHOCK_EXAMPLES.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="glass rounded-xl border border-border bg-surface p-5 shadow-lg shadow-black/20 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent/25 to-data/10 border border-white/10 flex items-center justify-center mb-4">
                  <Icon className="text-accent" size={17} />
                </div>
                <p className="text-sm text-text-primary mb-1">{label}</p>
                <p className="text-xs text-text-tertiary">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-text-tertiary mt-8 font-mono">
          every shock ripples through the city — visibly, live, on the map
        </p>
      </section>
    </div>
  );
}
