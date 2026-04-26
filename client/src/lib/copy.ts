import { toast } from "sonner"


export async function copyHashResult(
  value: string,
  setCopied: (copied: boolean) => void,
  resetDelayMs = 1500
): Promise<void> {
  if (!value) return;
  await navigator.clipboard.writeText(value);
  setCopied(true);
  window.setTimeout(() => setCopied(false), resetDelayMs);
  toast.success("Hash copied to clipboard!");
}
