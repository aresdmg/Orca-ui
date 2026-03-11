import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublic = path === "/" || path === "/auth/sign-in";
    const token = request.cookies.get("orcaSessionToken")?.value || ""

    if (isPublic && token) {
        return NextResponse.redirect(new URL("/console", request.nextUrl))
    }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl))
    }
}


export const config = {
    matcher: [
        "/",
        "/auth/sign-in",
        "/console",
    ],
}