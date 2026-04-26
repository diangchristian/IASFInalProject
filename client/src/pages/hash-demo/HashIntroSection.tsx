import { AuroraText } from "@/components/ui/aurora-text"

export default function HashIntroSection() {
  return (
    <section className="text-center space-y-3">

        <AuroraText className="text-5xl font-bold font-space-grotesk">
             SHA-256 Hashing Demo
        </AuroraText>
    
    <p className="text-sm text-outline ">
        This demo shows how input text is transformed into a secure hash using a
        cryptographic one-way function.
      </p>
    </section>
  );
}
