type Props = {
  onLogout: () => void;
};

export default function HashDemoHeader({ onLogout }: Props) {
  return (
    <header className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-[0.3em] text-white">
            HashIn
          </span>
          <span className="text-xs text-primary/90 border-b-2 border-primary/70 pb-1">
            SHA-256 Hashing Demo
          </span>
        </div>
        <div className="flex items-center gap-3">
          
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white cursor-pointer "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
