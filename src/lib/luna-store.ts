import { useEffect, useState } from "react";

export type AccountType = "woman" | "partner";
export type ExperienceMode = "solo" | "couple";

export interface LunaUser {
  name: string;
  email: string;
  accountType: AccountType;
  mode?: ExperienceMode;
  partnerName?: string;
  togetherSince?: string;
}

const KEY = "luna_user";
const DRAFT = "luna_signup_draft";

export function getUser(): LunaUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LunaUser) : null;
  } catch {
    return null;
  }
}

export function setUser(u: LunaUser | null) {
  if (typeof window === "undefined") return;
  if (!u) localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, JSON.stringify(u));
  window.dispatchEvent(new Event("luna:user"));
}

export function getDraft(): Partial<LunaUser> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(DRAFT);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setDraft(patch: Partial<LunaUser>) {
  if (typeof window === "undefined") return;
  const next = { ...getDraft(), ...patch };
  localStorage.setItem(DRAFT, JSON.stringify(next));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT);
}

export function useLunaUser() {
  const [user, setUserState] = useState<LunaUser | null>(null);
  useEffect(() => {
    setUserState(getUser());
    const h = () => setUserState(getUser());
    window.addEventListener("luna:user", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("luna:user", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}