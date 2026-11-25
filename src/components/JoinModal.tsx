import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import {
  BEDROCK_SERVER_ADDRESS,
  BEDROCK_SERVER_IP,
  BEDROCK_SERVER_PORT,
  JAVA_SERVER_ADDRESS,
  JAVA_SERVER_IP,
  JAVA_SERVER_PORT,
  SERVER_NAME,
} from "../config/server";

interface JoinModalProps {
  edition: "java" | "bedrock" | null;
  onClose: () => void;
}

export function JoinModal({ edition, onClose }: JoinModalProps) {
  const [copied, setCopied] = useState(false);

  if (!edition) return null;

  const isJava = edition === "java";
  const address = isJava ? JAVA_SERVER_ADDRESS : BEDROCK_SERVER_ADDRESS;
  const host = isJava ? JAVA_SERVER_IP : BEDROCK_SERVER_IP;
  const port = isJava ? JAVA_SERVER_PORT : BEDROCK_SERVER_PORT;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#12151C] border border-[#F59E0B]/40 p-6 sm:p-7 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FACC15]">
              {isJava ? "🟨 Java Edition" : "🟩 Bedrock Edition"}
            </p>
            <h3
              id="join-modal-title"
              className="font-display font-bold text-2xl text-white mt-1"
            >
              Join {SERVER_NAME}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close join dialog"
            className="w-9 h-9 rounded-lg bg-[#1A1F2B] hover:bg-[#242B3B] text-[#CBD5E1] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-[#CBD5E1] leading-relaxed">
          {isJava
            ? "If your Minecraft launcher did not open automatically, launch Minecraft Java Edition, go to Multiplayer → Add Server, and paste the Server Address below."
            : "Minecraft Bedrock should prompt to launch automatically on supported devices. You can also add the server manually under Servers → Add Server:"}
        </p>

        <div className="rounded-xl bg-[#0A0C10] border border-white/10 p-4 space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#94A3B8]">Server Name</span>
            <span className="font-medium text-white">{SERVER_NAME}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#94A3B8]">Server IP</span>
            <span className="font-mono text-[#FACC15] font-semibold break-all">
              {host}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#94A3B8]">Port</span>
            <span className="font-mono text-white font-semibold tabular-nums">
              {port}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#1A1F2B] hover:bg-[#242B3B] text-white text-sm font-medium transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] text-sm font-bold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Address!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy {address}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
