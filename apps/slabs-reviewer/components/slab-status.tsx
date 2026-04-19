import type { SlabStatus } from "@/lib/slab-statuses";

function getStatusTone(status: SlabStatus) {
  switch (status) {
    case "Done":
      return "border-[rgba(15,118,110,0.12)] bg-[rgba(15,118,110,0.08)] text-[rgb(15,118,110)]";
    case "Active":
      return "border-[rgba(190,24,93,0.14)] bg-[rgba(190,24,93,0.08)] text-[rgb(157,23,77)]";
    case "Ready":
      return "border-[rgba(59,130,246,0.14)] bg-[rgba(59,130,246,0.08)] text-[rgb(37,99,235)]";
    case "Blocked":
      return "border-[rgba(202,138,4,0.16)] bg-[rgba(202,138,4,0.09)] text-[rgb(161,98,7)]";
    case "Superseded":
      return "border-[rgba(107,114,128,0.14)] bg-[rgba(107,114,128,0.08)] text-[rgb(75,85,99)]";
    default:
      return "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.05)] text-[var(--muted)]";
  }
}

export function StatusPill({
  status,
  className = "",
}: {
  status: SlabStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] ${getStatusTone(
        status,
      )} ${className}`.trim()}
    >
      {status}
    </span>
  );
}
