"use client";

// Shared open/close state for the lead capture modal, so any CTA anywhere
// in the tree (Nav, Hero, Pricing CTA, Final CTA, Mobile Action Bar) can
// trigger the same form without prop-drilling. `source` records which CTA
// opened it — stored on the lead row (`source_page`) so Phase 2 can measure
// which CTA position actually converts, per the audit's H1/analytics gap.
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LeadFormContext = createContext(null);

export function LeadFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const openLeadForm = useCallback((sourceLabel = "unknown") => {
    setSource(sourceLabel);
    setIsOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, source, openLeadForm, closeLeadForm }),
    [isOpen, source, openLeadForm, closeLeadForm]
  );

  return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return ctx;
}
