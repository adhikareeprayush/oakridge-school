/**
 * Hash-aware active state for dashboard sidebar links.
 */
export function isDashboardNavActive(pathname: string, hash: string, to: string): boolean {
  const [path, fragment] = to.split("#");
  if (pathname !== path) return false;
  if (!fragment) return hash === "" || hash === "#";
  return hash === `#${fragment}`;
}
