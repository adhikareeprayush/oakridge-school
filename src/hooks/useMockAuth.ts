import { useContext } from "react";
import { MockAuthContext, type MockAuthContextValue } from "../context/mockAuthContext";

export function useMockAuth(): MockAuthContextValue {
  const ctx = useContext(MockAuthContext);
  if (!ctx) {
    throw new Error("useMockAuth must be used within MockAuthProvider");
  }
  return ctx;
}
