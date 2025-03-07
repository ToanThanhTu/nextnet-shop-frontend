import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL

export const config = {
  matcher: ["/api/:path*"],
}

export function middleware(request: NextRequest) {
  const nextUrlPath = request.nextUrl.pathname.substring(4)

  return NextResponse.rewrite(
    new URL(`${API_BASE_URL}${nextUrlPath}${request.nextUrl.search}`)
  )
}
