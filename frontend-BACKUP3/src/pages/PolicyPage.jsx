import { useState } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineTruck,
  HiOutlineSparkles,
  HiOutlineHomeModern,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

import PolicyCard from "../components/policy/PolicyCard";
import Slider from "../components/ui/Slider";
import Toggle from "../components/ui/Toggle";
import SegmentedControl from "../components/ui/SegmentedControl";
import Button from "../components/ui/Button";

/**
 * PolicyPage — fully designed control surface for future policy levers.
 *
 * Deliberately NOT wired to any backend: every control below is local
 * component state only. This page exists so the interaction design and
 * layout are ready the moment the simulation engine can actually accept
 * policy changes — at that point, "Apply changes" starts doing something
 * real instead of being disabled, and nothing else about this page
 * should need to change.
 */
export default function PolicyPage() {
  const [propertyTax, setPropertyTax] = useState(2.1);
  const [transitBudget, setTransitBudget] = useState(4.2);
  const [greenInvestment, setGreenInvestment] = useState(35);
  const [housingPolicy, setHousingPolicy] = useState("balanced");
  const [industrialRegulation, setIndustrialRegulation] = useState(true);

  return (
    <div className="city-lights h-full overflow-y-auto p-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="font-display text-lg text-text-primary">Policy Panel</h1>
          <p className="text-xs text-text-tertiary mt-0.5">
            Design-ready controls for the next simulation engine milestone. Nothing here is connected yet.
          </p>
        </div>
        <Button variant="secondary" size="sm" disabled title="Not yet connected to the simulation engine">
          Apply changes
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 max-w-4xl">
        <PolicyCard
          icon={HiOutlineBanknotes}
          title="Property Tax"
          description="City-wide residential and commercial tax rate."
          impact={`Projected: ${propertyTax > 2.5 ? "↓ demand in high-rent zones" : "neutral effect on demand"}`}
        >
          <Slider label="Tax rate" value={propertyTax} min={0} max={5} step={0.1} unit="%" onChange={setPropertyTax} />
        </PolicyCard>

        <PolicyCard
          icon={HiOutlineTruck}
          title="Transit Budget"
          description="Annual investment in public transit expansion."
          impact={`Projected: ${transitBudget > 5 ? "↓ average commute time" : "maintains current coverage"}`}
        >
          <Slider label="Annual budget" value={transitBudget} min={0} max={10} step={0.1} unit="M" onChange={setTransitBudget} />
        </PolicyCard>

        <PolicyCard
          icon={HiOutlineSparkles}
          title="Green Investment"
          description="Share of budget directed to parks and green infrastructure."
          impact={`Projected: ${greenInvestment > 50 ? "↑ happiness, ↓ pollution" : "modest environmental effect"}`}
        >
          <Slider label="Investment level" value={greenInvestment} min={0} max={100} step={5} unit="%" onChange={setGreenInvestment} />
        </PolicyCard>

        <PolicyCard
          icon={HiOutlineHomeModern}
          title="Housing Policy"
          description="Zoning stance for new residential development."
        >
          <SegmentedControl
            options={[
              { value: "restrictive", label: "Restrictive" },
              { value: "balanced", label: "Balanced" },
              { value: "permissive", label: "Permissive" },
            ]}
            value={housingPolicy}
            onChange={setHousingPolicy}
          />
        </PolicyCard>

        <PolicyCard
          icon={HiOutlineBuildingOffice2}
          title="Industrial Regulation"
          description="Enforcement level for industrial zone emissions."
        >
          <Toggle
            label="Strict enforcement"
            description={industrialRegulation ? "Lower output, lower pollution" : "Higher output, higher pollution"}
            checked={industrialRegulation}
            onChange={setIndustrialRegulation}
          />
        </PolicyCard>
      </div>
    </div>
  );
}
