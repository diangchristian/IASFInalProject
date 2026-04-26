import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import {Lock} from "lucide-react"




const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const logIn = useStore((state) => state.logIn);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
    try {
      await logIn(data);
      navigate("/demo");
    } catch (error) {
      console.error("Login failed", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-8 pb-8 space-y-5 flex flex-col items-stretch text-left"
    >
      
       
      <div>
        <label className="block text-xs uppercase text-outline tracking-widest mb-2">
          Email
        </label>
        <input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="e.g, john.doe@example.com"
          className="w-full h-12 bg-surface-container-highest/50 border border-white/10 px-4 rounded-lg focus:border-primary outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase text-outline tracking-widest mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          placeholder="••••••••"
          className="w-full h-12 bg-surface-container-highest/50 border border-white/10 px-4 rounded-lg focus:border-primary outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 p-3 rounded-lg text-sm text-blue/80">
        <span><Lock size={24}/></span>
        <p>
          Your password will be securely hashed using SHA-256 before
          transmission.
        </p>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-primary-container text-black font-bold rounded-lg hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] transition active:scale-[0.98]"
      >
        Login
      </button>
    </form>
  );
}
