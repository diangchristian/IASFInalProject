import type { UseFormRegisterReturn } from "react-hook-form";
import type { FormEventHandler } from "react";
import { Keyboard, SquareTerminal, Zap, Copy } from "lucide-react";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  inputRegister: UseFormRegisterReturn;
  inputError?: string;
  isHashing: boolean;
  hashResult: string;
  copied: boolean;
  onCopy: () => void;
};

export default function HashInputOutputSection({
  onSubmit,
  inputRegister,
  inputError,
  isHashing,
  hashResult,
  copied,
  onCopy,
}: Props) {
  return (
    <section className="grid items-stretch gap-6 md:grid-cols-2">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary m-0">
            Input Section
          </h2>
          <span className="text-outline text-sm">
            <Keyboard />
          </span>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col justify-between gap-2"
        >
          <div className="space-y-2">
            <label className="text-xs text-outline">
              Enter Text / Password
            </label>
            <textarea
              {...inputRegister}
              className="w-full h-28 resize-none rounded-lg bg-black/40 border border-white/10 p-3 text-sm text-white outline-none focus:border-primary/70 overflow-y-auto m-0"
              placeholder="password123"
            />
            <p className="text-red-500 text-xs min-h-4">{inputError ?? ""}</p>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer h-11 rounded-lg bg-primary text-black text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2"
            disabled={isHashing}
          >
            <span className="">
              <Zap size={"16px"} />
            </span>
            {isHashing ? "Generating..." : "Generate Hash"}
          </button>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary m-0">
            Hash Output
          </h2>
          <span className="text-outline text-sm">
            <SquareTerminal />
          </span>
        </div>

        <div className="space-y-2 flex-1">
          <p className="text-xs text-outline">SHA-256 Digestion</p>
          <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-[11px] text-emerald-300 font-mono break-all w-full h-28 overflow-y-auto">
            {hashResult}
          </div>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="w-full h-11 cursor-pointer rounded-lg bg-white/5 border border-white/10 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2"
        >
          <span className="text-primary">
            <Copy size={"16px"} />
          </span>
          {copied ? "Copied" : "Copy Hash Result"}
        </button>
      </div>
    </section>
  );
}
