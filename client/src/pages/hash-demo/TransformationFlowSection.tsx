import { FileText, Lock} from "lucide-react";  


export default function TransformationFlowSection() {
  return (
    <section className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
      <h3 className="text-xs uppercase tracking-[0.35em] text-outline m-0">
        Data Transformation Flow
      </h3>
      <div className="flex items-center gap-4 mt-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-2 w-32">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <FileText size={16} />
          </div>
          <span className="text-[10px] text-outline">Plaintext Input</span>
        </div>
        <div className="flex-1 relative h-px bg-linear-to-r from-white/5 via-primary/70 to-primary/20">
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_10px_rgba(134,239,172,0.6)] animate-pulse" />
        </div>
        <div className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white animate-pulse">
          SHA-256 Algorithm
        </div>
        <div className="flex-1 relative h-px bg-linear-to-r from-primary/20 via-primary/70 to-emerald-300/60">
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)] animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-2 w-32">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
            <Lock size={16} />
          </div>
          <span className="text-[10px] text-outline">Fixed-Length Hash</span>
        </div>
      </div>
    </section>
  );
}
