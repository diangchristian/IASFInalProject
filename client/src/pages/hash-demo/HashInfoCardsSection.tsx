export default function HashInfoCardsSection() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 text-left">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-primary">
          ?
        </div>
        <h4 className="text-sm text-white font-semibold m-0">
          What is Hashing?
        </h4>
        <p className="text-xs text-outline">
          Hashing is the process of converting an input of any size into a
          fixed-size string of characters, which is typically a hexadecimal
          number.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 text-left">
        <div className="w-9 h-9 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-200">
          ↷
        </div>
        <h4 className="text-sm text-white font-semibold m-0">
          One-Way Function
        </h4>
        <p className="text-xs text-outline">
          It is designed to be a one-way street: it is computationally
          impossible to reverse the hash back into the original plaintext input.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 text-left">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
          ✓
        </div>
        <h4 className="text-sm text-white font-semibold m-0">
          Why It's Secure
        </h4>
        <p className="text-xs text-outline">
          Even a 1-bit change in input produces a completely different hash,
          making it ideal for verifying data integrity and storing passwords.
        </p>
      </div>
    </section>
  );
}
