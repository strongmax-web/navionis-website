import { NextResponse } from "next/server";
import { z } from "zod";

import { WAITLIST_ROLES } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/server";

const roleValues = WAITLIST_ROLES.map((role) => role.value);

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email is required").max(320),
  role: z.enum(roleValues as [string, ...string[]]),
  message: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("waitlist").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      message: parsed.data.message || null,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 },
        );
      }

      console.error("Waitlist insert error:", error);
      return NextResponse.json(
        { error: "Unable to save your submission. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Waitlist route error:", error);
    return NextResponse.json(
      { error: "Unable to save your submission. Please try again." },
      { status: 500 },
    );
  }
}
