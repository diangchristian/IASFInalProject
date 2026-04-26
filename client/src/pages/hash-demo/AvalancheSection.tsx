import type { FormEventHandler } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  inputARegister: UseFormRegisterReturn;
  inputBRegister: UseFormRegisterReturn;
  inputAError?: string;
  inputBError?: string;
  isComparing: boolean;
  hashA: string;
  hashB: string;
};

export default function AvalancheSection({
  onSubmit,
  inputARegister,
  inputBRegister,
  inputAError,
  inputBError,
  isComparing,
  hashA,
  hashB,
}: Props) {
  return (
    <section className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-primary m-0">
              Avalanche Effect
            </h3>
            <p className="text-xs text-outline">
              See how a tiny change in input creates a massive change in the
              hash.
            </p>
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white"
            disabled={isComparing}
          >
            {isComparing ? "Comparing..." : "Compare Inputs"}
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-outline">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Input A
            </div>
            <input
              {...inputARegister}
              className="w-full h-10 rounded-lg bg-black/40 border border-emerald-500/40 px-3 text-sm text-white outline-none"
              placeholder="password123"
            />
            {inputAError && (
              <p className="text-red-500 text-xs">{inputAError}</p>
            )}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-outline">
                Resulting Hash A
              </p>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-[11px] text-emerald-300 font-mono break-all min-h-[52px]">
                {hashA}
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-outline">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400"></span>
              Input B (Small Change)
            </div>
            <input
              {...inputBRegister}
              className="w-full h-10 rounded-lg bg-black/40 border border-fuchsia-500/40 px-3 text-sm text-white outline-none"
              placeholder="password124"
            />
            {inputBError && (
              <p className="text-red-500 text-xs">{inputBError}</p>
            )}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-outline">
                Resulting Hash B
              </p>
              <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-3 text-[11px] text-fuchsia-200 font-mono break-all min-h-[52px]">
                {hashB}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
