export const WAITLIST_ROLES = [
  { label: "Yacht crew", value: "yacht_crew" },
  { label: "OOW student", value: "oow_student" },
  { label: "Master student", value: "master_student" },
  { label: "Merchant navy", value: "merchant_navy" },
  { label: "Sailing / cruising", value: "sailing_cruising" },
  { label: "Instructor", value: "instructor" },
  { label: "Other", value: "other" },
] as const;

export type WaitlistRole = (typeof WAITLIST_ROLES)[number]["value"];
