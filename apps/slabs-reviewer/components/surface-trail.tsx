import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

export function SurfaceTrail({
  segments,
}: {
  segments: Array<{
    label: string;
    active?: boolean;
    href?: string;
  }>;
}) {
  return (
    <div className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.58)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
        Current surface
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {segments.map((segment, index) => (
          <div className="flex items-center gap-2" key={`${segment.label}-${index}`}>
            {index > 0 ? (
              <CaretRight
                className="text-[rgba(78,66,53,0.42)]"
                size={14}
                weight="bold"
              />
            ) : null}
            {segment.href ? (
              <Link
                className={`inline-flex rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98] ${
                  segment.active
                    ? "bg-[rgba(15,118,110,0.12)] text-[rgb(15,118,110)]"
                    : "bg-[rgba(15,23,42,0.05)] text-[var(--muted)]"
                }`}
                href={segment.href}
              >
                {segment.label}
              </Link>
            ) : (
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] ${
                  segment.active
                    ? "bg-[rgba(15,118,110,0.12)] text-[rgb(15,118,110)]"
                    : "bg-[rgba(15,23,42,0.05)] text-[var(--muted)]"
                }`}
              >
                {segment.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
