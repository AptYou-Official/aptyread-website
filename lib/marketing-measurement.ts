/** Keep development and local previews out of production marketing reports. */
export function marketingMeasurementEnabled(): boolean {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_DISABLE_MEASUREMENT === "true" ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const hostname = window.location.hostname
    .toLowerCase()
    .replace(/^\[|\]$/g, "")
    .replace(/\.$/, "");

  return !(
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    /^127(?:\.\d{1,3}){3}$/.test(hostname) ||
    hostname === "::1"
  );
}
