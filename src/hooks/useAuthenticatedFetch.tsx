import { message } from "antd";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/useAuthStore";

export default function useAuthenticatedFetch() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function getToken(): Promise<string | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(`Errore nel recupero della sessione: ${error.message}`);
    }
    return data.session?.access_token ?? null;
  }

  function handleTokenExpired() {
    clearAuth();
    message.error("Session expired");
    window.location.href = "/login";
  }

  async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      const token = await getToken();
      if (!token) {
        handleTokenExpired();
        throw new Error("No token available");
      }
      const defaultHeaders: Record<string, string> = {};
      if (!(options.body instanceof FormData)) {
        defaultHeaders["Content-Type"] = "application/json";
      }
      defaultHeaders.Authorization = `Bearer ${token}`;
      const headers = {
        ...defaultHeaders,
        ...options.headers,
      };
      const response = await fetch(url, {
        ...options,
        headers,
      });
      if (response.status === 401) {
        handleTokenExpired();
        throw new Error("Unauthorized: Token expired or invalid");
      }
      return response;
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  return { authenticatedFetch };
}
