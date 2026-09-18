import Image from "next/image";
import InstrumentBackdrop from "@/components/InstrumentBackdrop";
import ReductionStrip from "@/components/ReductionStrip";

export default function Home() {
  return (
    <main className="stage">
      <InstrumentBackdrop />

      <div className="core">
        <div className="emblem">
          <Image
            src="/images/navionis_mark.png"
            alt="Navionis"
            width={376}
            height={376}
            priority
          />
        </div>
        <h1>NAVIONIS</h1>
        <p className="tagline">Celestial Navigation. Certainty at Sea.</p>
        <div className="rule" />
        <p className="status">Landing Soon</p>
      </div>

      <div className="footwrap">© 2026 Navionis</div>

      <ReductionStrip />
    </main>
  );
}
