import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import { getRole, getEmployeeId, type DemoRole } from "../auth";
import { useAppContext } from "../context";
import { AUDIT_ACTIONS } from "../auditLog";

/** Route guard for the demo-gated dashboards — bounces to /login if the
 * session role doesn't match what this route needs, and leaves an audit
 * trail of the denied attempt. */
export const RequireRole = ({ role, children }: { role: DemoRole; children: ReactNode }) => {
  const { employees, logAudit } = useAppContext();
  const authorized = getRole() === role;

  useEffect(() => {
    if (authorized) return;
    const employee = employees.find((e) => e.id === getEmployeeId());
    logAudit({
      actorId: employee?.id ?? null,
      actorName: employee?.name ?? "Sessão não autenticada",
      action: AUDIT_ACTIONS.ACCESS_DENIED,
      details: `Tentativa de acessar uma rota que exige o papel "${role}" sem sessão válida.`,
      severity: "critical",
    });
    // Só deve reagir a mudanças de autorização, não a cada re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  if (!authorized) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
