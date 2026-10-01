import { useContext } from "react";
import { SyncContext } from "./SyncContext";
import type { SyncApi } from "./SyncContext";

export function useSync(): SyncApi {
  const ctx = useContext(SyncContext);
  if (!ctx) throw new Error("useSync must be used inside SyncProvider");
  return ctx;
}
