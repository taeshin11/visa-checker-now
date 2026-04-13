import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const middleware = createMiddleware(routing);

export function proxy(request: Parameters<typeof middleware>[0]) {
  return middleware(request);
}

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
