import {useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "../store/store";


const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})


type SignupFormData = z.infer<typeof signUpSchema>;


export default function SignupForm() {

  const signUp = useStore((state) => state.signUp);
  const { register, handleSubmit,  formState: { errors }, } = useForm<SignupFormData>({
      resolver: zodResolver(signUpSchema),
    });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log(data)
    try {
      await signUp(data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-8 pb-8 space-y-5 flex flex-col items-stretch"
    >
      {/* Username */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] uppercase text-outline tracking-[0.2em] mb-1">
          Namede
        </label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {  
              value: 2,
              message: "Name must be at least 2 characters long"
            }
          })}
          placeholder="Enter username"
          className="w-full h-12 bg-surface-container-highest/50 border border-white/10 px-4 rounded-lg outline-none focus:border-primary"
        />
         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] uppercase text-outline tracking-[0.2em] mb-1">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address"
            }
          })}

          placeholder="johndoe@exmaple.com"
          className="w-full h-12 bg-surface-container-highest/50 border border-white/10 px-4 rounded-lg outline-none focus:border-primary"
        />
         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] uppercase text-outline tracking-[0.2em] mb-1">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long"
            }
          })}
          type="password"
          placeholder="••••••••"
          className="w-full h-12 bg-surface-container-highest/50 border border-white/10 px-4 rounded-lg outline-none focus:border-primary"
        />
         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

  
      {/* Button */}
      <button
        type="submit"
        className="w-full h-12 bg-primary-container text-black font-bold rounded-lg hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] transition active:scale-[0.98]"
      >
        Sign Up
      </button>
    </form>
  );
}
