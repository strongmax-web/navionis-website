import Image from "next/image";
import BackgroundWatermarks from "@/components/BackgroundWatermarks";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <BackgroundWatermarks />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-16 sm:py-24">
      <Image
        src="/images/Navionis_logo.png"
        alt="Navionis"
        width={280}
        height={280}
        priority
        className="mb-8 h-auto w-48 sm:w-56"
      />

      <p className="mb-2 text-sm font-semibold tracking-[0.35em] text-brass">NAVIONIS</p>
      <p className="mb-12 text-center text-steel-grey">
        Celestial Navigation. Certainty at Sea.
      </p>

      <section className="mb-16 w-full text-center">
        <p className="text-sm font-semibold tracking-[0.4em] text-brass sm:text-base">
          COMING SOON
        </p>
      </section>

      <section className="w-full rounded-xl border border-steel-grey/25 bg-charcoal p-6 sm:p-8">
        <h2 className="mb-6 text-center text-xl font-semibold text-ivory">Join the Waitlist</h2>
        <div className="flex justify-center">
          <WaitlistForm />
        </div>
      </section>
      </main>
    </>
  );
}
