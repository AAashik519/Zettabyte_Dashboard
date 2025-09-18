import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Add error handling to debug the issue
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
