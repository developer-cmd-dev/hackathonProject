import { useEffect, useState } from "react";
import type { AuthUser } from "./auth/api";
import { LandingPage } from "./landing-page/LandingPage";
import "./index.css";

const tokenKey = "hackathon_token";
const userKey = "hackathon_user";

export function App() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(userKey);
    return saved ? (JSON.parse(saved) as AuthUser) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(userKey, JSON.stringify(user));
  }, [user]);

  function handleSuccess(token: string, nextUser: AuthUser) {
    localStorage.setItem(tokenKey, token);
    setUser(nextUser);
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setUser(null);
  }

  if (user) {
    return (
      <main className="shell">
        <section className="welcome-card">
          <div className="brand-mark">H</div>
          <p className="eyebrow">ACCOUNT</p>
          <h1>Welcome, {user.name}.</h1>
          <p className="muted">{user.email}</p>
          <div className="profile-row">
            <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
            <span>Signed in with Google</span>
          </div>
          <button className="secondary-button" onClick={logout}>Log out</button>
        </section>
      </main>
    );
  }

  return <LandingPage onAuthenticated={handleSuccess} />;
}

export default App;
