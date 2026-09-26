import { Navigate, useLocation } from "react-router";

/**
 * Client-side redirect that keeps the query string and hash (e.g. /home-v2#offices → /#offices).
 * A static host should also answer the old path with a 301; see docs/rebuild-map.md.
 */
export default function RedirectTo({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
}
