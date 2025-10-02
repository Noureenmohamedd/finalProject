import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const apiBase = process.env.ECOM_API_URL ?? "https://ecommerce.routemisr.com/api/v1";
    try {
        const resp = await fetch(`${apiBase}/products`, { cache: "no-store" });
        const data = await resp.json();
        return NextResponse.json(data, { status: resp.ok ? 200 : resp.status });
    } catch {
        return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
    }
}