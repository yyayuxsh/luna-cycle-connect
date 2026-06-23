import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createElement } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AccountType = "woman" | "partner";
export type ExperienceMode = "solo" | "couple";

export interface LunaUser {
  id: string;
  name: string;
  email: string;
  accountType: AccountType;
  mode?: ExperienceMode;
  partnerCode?: string | null;
  partnerId?: string | null;
  partnerName?: string | null;
  connectedSince?: string | null;
  togetherSince?: string;
}

const DRAFT = "luna_signup_draft";

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

interface ProfileRow {
  display_name: string | null;
  account_type: string | null;
  experience_mode: string | null;
  avatar_url: string | null;
  partner_code: string | null;
  partner_id: string | null;
  connected_since: string | null;
}

function normalizeAccountType(value: unknown): AccountType | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return normalized === "woman" || normalized === "partner" ? normalized : null;
}

function normalizeExperienceMode(value: unknown): ExperienceMode | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return normalized === "solo" || normalized === "couple" ? normalized : null;
}

function metadataValue(authUser: User, key: string): unknown {
  return authUser.user_metadata?.[key];
}

async function loadLunaUser(authUser: User): Promise<LunaUser> {
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, account_type, experience_mode, avatar_url, partner_code, partner_id, connected_since")
    .eq("id", authUser.id)
    .single();

  if (error) {
    throw new Error(`Unable to load Luna profile: ${error.message}`);
  }

  const profile = data as ProfileRow;
  const accountType =
    normalizeAccountType(profile.account_type) ??
    normalizeAccountType(metadataValue(authUser, "account_type"));

  if (!accountType) {
    throw new Error("Your Luna profile is missing an account type. Please finish account setup.");
  }

  const mode: ExperienceMode =
    normalizeExperienceMode(profile.experience_mode) ??
    normalizeExperienceMode(metadataValue(authUser, "experience_mode")) ??
    (accountType === "partner" ? "couple" : "solo");

  let partnerName: string | null = null;
  if (profile.partner_id) {
    const { data: p } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", profile.partner_id)
      .maybeSingle();
    partnerName = p?.display_name ?? null;
  }

  return {
    id: authUser.id,
    name: profile.display_name ?? authUser.user_metadata?.display_name ?? authUser.email ?? "Luna",
    email: authUser.email ?? "",
    accountType,
    mode,
    partnerCode: profile.partner_code ?? null,
    partnerId: profile.partner_id ?? null,
    partnerName,
    connectedSince: profile.connected_since ?? null,
    togetherSince: profile.connected_since ?? undefined,
  };
}

interface LunaUserContextValue {
  user: LunaUser | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const LunaUserContext = createContext<LunaUserContextValue | null>(null);

function useLunaUserState(): LunaUserContextValue {
  const [user, setUser] = useState<LunaUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async (authUser: User) => {
      const currentRequest = ++requestId.current;
      setLoading(true);
      setError(null);
      try {
        const u = await loadLunaUser(authUser);
        if (!cancelled && currentRequest === requestId.current) {
          setUser(u);
        }
      } catch (err) {
        if (!cancelled && currentRequest === requestId.current) {
          setUser(null);
          setError(err instanceof Error ? err.message : "Unable to load Luna profile.");
        }
      } finally {
        if (!cancelled && currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    };

    const sync = async () => {
      setLoading(true);
      setError(null);
      const { data, error: authError } = await supabase.auth.getUser();
      if (cancelled) return;
      if (authError || !data.user) {
        setUser(null);
        setError(authError?.message ?? null);
        setLoading(false);
        return;
      }
      void hydrate(data.user);
    };
    sync();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session?.user) {
        requestId.current += 1;
        setUser(null);
        setError(null);
        setLoading(false);
        return;
      }
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        void hydrate(session.user);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [version]);

  return { user, loading, error, refresh: () => setVersion((v) => v + 1) };
}

export function LunaUserProvider({ children }: { children: ReactNode }) {
  const value = useLunaUserState();
  return createElement(LunaUserContext.Provider, { value }, children);
}

export function useLunaUser(): LunaUserContextValue {
  const ctx = useContext(LunaUserContext);
  if (ctx) return ctx;
  throw new Error("useLunaUser must be used inside LunaUserProvider");
}

export async function signOut() {
  await supabase.auth.signOut();
}