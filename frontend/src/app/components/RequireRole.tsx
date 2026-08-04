import { ReactNode } from "react";
import { Navigate } from "react-router";
import { getRole, type DemoRole } from "../auth";

/** Route guard for the demo-gated dashboards — bounces to /login if the
 * session role doesn't match what this route needs. */
export const RequireRole = ({ role, children }: { role: DemoRole; children: ReactNode }) => {
  if (getRole() !== role) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
