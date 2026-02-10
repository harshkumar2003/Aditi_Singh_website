import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

type TestimonialPayload = {
  name: string;
  role?: string;
  testimonial: string;
  avatar_url?: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : null;

    let query = supabaseServer
      .from("testimonials")
      .select("id, name, role, testimonial, avatar_url, created_at")
      .order("created_at", { ascending: false });

    if (limit && Number.isFinite(limit)) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, testimonials: data || [] });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TestimonialPayload;
    if (!body?.name || !body?.testimonial) {
      return NextResponse.json(
        { error: "name and testimonial are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("testimonials")
      .insert({
        name: body.name.trim(),
        role: body.role?.trim() || null,
        testimonial: body.testimonial.trim(),
        avatar_url: body.avatar_url?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, testimonial: data });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
