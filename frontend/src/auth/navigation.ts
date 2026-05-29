type RouteLocation = {
  pathname: string;
  search: string;
  hash: string;
};

export type AuthReturnToState = {
  returnTo?: string;
};

export const DEFAULT_LOGIN_RETURN_TO = "/profile";

export const getAuthReturnTo = ({ pathname, search, hash }: RouteLocation) =>
  `${pathname}${search}${hash}`;

export const sanitizeAuthReturnTo = (
  returnTo?: string,
  fallback = DEFAULT_LOGIN_RETURN_TO
) => {
  if (
    !returnTo ||
    !returnTo.startsWith("/") ||
    returnTo.startsWith("//") ||
    returnTo.startsWith("/auth-callback")
  ) {
    return fallback;
  }

  return returnTo;
};
