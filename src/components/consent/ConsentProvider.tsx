"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { getStoredConsent, setStoredConsent, type ConsentStatus } from "@/lib/consent";

type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): ConsentStatus | null {
  return getStoredConsent();
}

function getServerSnapshot(): ConsentStatus | null {
  return null;
}

function emitChange() {
  for (const listener of listeners) listener();
}

interface ConsentContextValue {
  status: ConsentStatus | null;
  setStatus: (status: ConsentStatus) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setStatus(next: ConsentStatus) {
    setStoredConsent(next);
    emitChange();
  }

  return <ConsentContext.Provider value={{ status, setStatus }}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used within a ConsentProvider");
  return context;
}
