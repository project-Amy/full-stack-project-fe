import { supabase } from "../lib/supabaseClient";

export default function useAuthenticatedFetch() {
  async function getToken(): Promise<string | null> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(`Errore nel recupero della sessione: ${error.message}`);
    }

    return session?.access_token ?? null;
  }

  async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      const token = await getToken();
      const defaultHeaders: Record<string, string> = {};
      // Non impostare Content-Type per FormData, lascia che il browser lo gestisca
      if (!(options.body instanceof FormData)) {
        defaultHeaders["Content-Type"] = "application/json";
      }
      if (token) {
        defaultHeaders.Authorization = `Bearer ${token}`;
      }
      const headers = {
        ...defaultHeaders,
        ...options.headers,
      };
      return fetch(url, {
        ...options,
        headers,
      });
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  return { authenticatedFetch };
}
