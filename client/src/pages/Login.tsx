import { Link } from "react-router-dom";
import LoginForm from "../components/LogInForm";
import { ShineBorder } from "@/components/ui/shine-border"

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-on-surface font-sans relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* CARD */}
      <div className="w-[440px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden relative">
        {/* HEADER */}
        <div className="p-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <span className="tracking-widest font-bold text-sm">HASH IN</span>
          </div>

          <h1 className="text-2xl font-bold text-white">Secure Login System</h1>

          <p className="text-sm text-outline">
            SHA-256 Hashing for data integrity
          </p>
        </div>

        <div className="">
          <ShineBorder 
            shineColor="#a4e6ff #00fc92"
            borderWidth={2}
            />
          <LoginForm />
        </div>

        <div className="text-center pb-6">
          <p className="text-sm text-outline">
            No account yet?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
    </div>
  );
}
