import { useState, type FormEventHandler } from "react";
import { useStore } from "../store/store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { hashDemoRequest } from "../api/hashDemo-api";
import { copyHashResult } from "../lib/copy";
import { Toaster } from "@/components/ui/sonner"
import HashDemoHeader from "./hash-demo/HashDemoHeader";
import HashIntroSection from "./hash-demo/HashIntroSection";
import HashInputOutputSection from "./hash-demo/HashInputOutputSection";
import TransformationFlowSection from "./hash-demo/TransformationFlowSection";
import AvalancheSection from "./hash-demo/AvalancheSection";
import HashInfoCardsSection from "./hash-demo/HashInfoCardsSection";
// import HashDemoFooter from "./hash-demo/HashDemoFooter";


const hashInputSchema = z.object({
  input: z.string().min(1, "Input is required"),
});

const compareInputSchema = z.object({
  inputA: z.string().min(1, "Input A is required"),
  inputB: z.string().min(1, "Input B is required"),
});

type HashInputFormData = z.infer<typeof hashInputSchema>;
type CompareInputFormData = z.infer<typeof compareInputSchema>;
type HashItem = { hashedOutput: string };

export default function HashDemo() {
  const [hashResult, setHashResult] = useState("");
  const [compareHashResult, setCompareHashResult] = useState<HashItem[]>([]);
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const signOut = useStore((state) => state.signOut);
  const {
    register: registerHash,
    handleSubmit: handleHashSubmit,
    formState: { errors: hashErrors },
  } = useForm<HashInputFormData>({
    resolver: zodResolver(hashInputSchema),
  });

  const {
    register: registerCompare,
    handleSubmit: handleCompareSubmit,
    formState: { errors: compareErrors },
  } = useForm<CompareInputFormData>({
    resolver: zodResolver(compareInputSchema),
  });

  const onSubmit: SubmitHandler<HashInputFormData> = async (data) => {
    setIsHashing(true);
    try {
      const hashResponse = await hashDemoRequest(data.input);
      if (!hashResponse) throw new Error("Failed to generate hash");
      setHashResult(hashResponse.hashes?.[0]?.hashedOutput ?? "");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsHashing(false);
    }
  };

  const onSubmitCompareTwoHashes: SubmitHandler<CompareInputFormData> = async (data) => {
    setIsComparing(true);
    try {
      const [hashResponseA, hashResponseB] = await Promise.all([
        hashDemoRequest(data.inputA),
        hashDemoRequest(data.inputB),
      ]);

      setCompareHashResult([
        { hashedOutput: hashResponseA?.hashes?.[0]?.hashedOutput ?? "" },
        { hashedOutput: hashResponseB?.hashes?.[0]?.hashedOutput ?? "" },
      ]);
    } catch (error) {
      console.error("Error submitting compare form:", error);
    } finally {
      setIsComparing(false);
    }
  };

  const handleLogout = () => signOut();

  const handleCopy = async (): Promise<void> => {
    await copyHashResult(hashResult, setCopied);
  };

  const handleHashFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    void handleHashSubmit(onSubmit)(e);
  };

  const handleCompareFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    void handleCompareSubmit(onSubmitCompareTwoHashes)(e);
  };

  return (
    <div className="bg-background">
      <HashDemoHeader onLogout={handleLogout} />
      <Toaster position="top-right"/>

      <div className="max-w-7xl mx-auto">
     

        <main className="px-6 py-10 space-y-10">
          <HashIntroSection />

          <HashInputOutputSection
            onSubmit={handleHashFormSubmit}
            inputRegister={registerHash("input")}
            inputError={hashErrors.input?.message}
            isHashing={isHashing}
            hashResult={hashResult}
            copied={copied}
            onCopy={handleCopy}
          />

          <TransformationFlowSection />

          <AvalancheSection
            onSubmit={handleCompareFormSubmit}
            inputARegister={registerCompare("inputA")}
            inputBRegister={registerCompare("inputB")}
            inputAError={compareErrors.inputA?.message}
            inputBError={compareErrors.inputB?.message}
            isComparing={isComparing}
            hashA={compareHashResult[0]?.hashedOutput ?? ""}
            hashB={compareHashResult[1]?.hashedOutput ?? ""}
          />

          <HashInfoCardsSection />
        </main>
      </div>
    </div>
  );
}
