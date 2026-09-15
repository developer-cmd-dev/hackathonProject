import { useEffect, useRef, useState } from "react";
import { loginWithGoogle } from "./api";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(options: { client_id: string; callback: (response: { credential: string }) => void }): void;
          renderButton(element: HTMLElement, options: { theme: string; size: string; width: number }): void;
        };
      };
    };
  }
}

type Props = {
  onSuccess: (token: string, user: Awaited<ReturnType<typeof loginWithGoogle>>["user"]) => void;
};

export function GoogleButton({ onSuccess }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const configuredClientId = import.meta.env?.BUN_PUBLIC_GOOGLE_CLIENT_ID as string | undefined;
  const clientId = configuredClientId || "358294701145-uuiibpdfeo5t0sq9bapglpbg2ktheve5.apps.googleusercontent.com";

  useEffect(() => {
    if (!clientId || !container.current) return;
    const render = () => {
      if (!window.google || !container.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          try {
            const result = await loginWithGoogle(credential);
            onSuccess(result.token, result.user);
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Google login failed");
          }
        },
      });
      window.google.accounts.id.renderButton(container.current, {
        theme: "outline",
        size: "large",
        width: Math.min(container.current.clientWidth || 298, 400),
      });
    };

    if (window.google) render();
    else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = render;
      document.head.appendChild(script);
    }
  }, [clientId, onSuccess]);

  if (!clientId) return <p className="google-note">Configure BUN_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in.</p>;

  return <div className="google-area"><div ref={container} />{message && <p className="error">{message}</p>}</div>;
}
