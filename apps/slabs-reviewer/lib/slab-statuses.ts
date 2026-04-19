export const EDITABLE_SLAB_STATUSES = [
  "Backlog",
  "Ready",
  "Active",
  "Blocked",
  "Done",
] as const;

export const LEGACY_SLAB_STATUSES = ["Superseded"] as const;

export const ALL_SLAB_STATUSES = [
  ...EDITABLE_SLAB_STATUSES,
  ...LEGACY_SLAB_STATUSES,
] as const;

export type EditableSlabStatus = (typeof EDITABLE_SLAB_STATUSES)[number];
export type SlabStatus = (typeof ALL_SLAB_STATUSES)[number];

export function isEditableSlabStatus(
  value: unknown,
): value is EditableSlabStatus {
  return (
    typeof value === "string" &&
    EDITABLE_SLAB_STATUSES.includes(value as EditableSlabStatus)
  );
}

export function isStoredSlabStatus(value: unknown): value is SlabStatus {
  return typeof value === "string" && ALL_SLAB_STATUSES.includes(value as SlabStatus);
}

export function toEditableSlabStatus(status: SlabStatus): EditableSlabStatus {
  return status === "Superseded" ? "Done" : status;
}
