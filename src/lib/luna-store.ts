import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  account_type: AccountType | null;
  experience_mode: ExperienceMode | null;
  avatar_url: string | null;
}

async function loadLunaUser(authUser: User): Promise<LunaUser> {
  const { data } = await supabase
    .from("profiles")
    .select("display_name, account_type, experience_mode, avatar_url")
    .eq("id", authUser.id)
    .maybeSingle();

  const profile = (data ?? null) as ProfileRow | null;
  const accountType: AccountType = profile?.account_type ?? "woman";
  const mode: ExperienceMode =
    profile?.experience_mode ?? (accountType === "partner" ? "couple" : "solo");

  return {
    name: profile?.display_name ?? authUser.email ?? "Luna",
    email: authUser.email ?? "",
    accountType,
    mode,
  };
}

export function useLunaUser() {
  const [user, setUser] = useState<LunaUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!data.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      const u = await loadLunaUser(data.user);
      if (!cancelled) {
        setUser(u);
        setLoading(false);
      }
    };
    sync();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session?.user) {
        setUser(null);
        return;
      }
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        loadLunaUser(session.user).then((u) => setUser(u));
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export async function signOut() {
  await supabase.auth.signOut();
}