import { useState } from "react";
import { GoogleButton } from "../auth/GoogleButton";
import type { AuthUser } from "../auth/api";
import "./landing-page.css";

type LandingPageProps = {
  onAuthenticated: (token: string, user: AuthUser) => void;
};

export function LandingPage({ onAuthenticated }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main className="landing">
      <header className="nav">
        <a className="wordmark" href="/">Test<span>/</span>kit</a>
        <nav className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#workflow">Workflow</a>
          <a href="#about">About</a>
        </nav>
        <button className="nav-cta" onClick={() => setShowAuth(true)}>Start Testing <span>↗</span></button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="status-pill"><span className="status-dot" />Test Your App in Few Seconds</div>
          <h1>Small tools.<br /><em>Big momentum.</em></h1>
          <p className="hero-text">Small Tool But Times Saving You Can Save Your Time And Get Effeciency.</p>
          <div className="hero-actions">
            <button className="hero-button" onClick={() => setShowAuth(true)}>Start Testing <span>→</span></button>
            <a className="text-link" href="#tools">Explore the toolkit <span>↓</span></a>
          </div>
          <p className="trusted">No clutter · No setup · Just useful tools</p>
        </div>
        <div className="terminal-card" aria-label="Developer tools preview">
          <div className="terminal-top"><span className="window-dot red" /><span className="window-dot yellow" /><span className="window-dot green" /><span className="terminal-label">devkit / playground</span></div>
          <div className="terminal-body">
            <p><span className="line-number">01</span><span className="code-purple">const</span> <span className="code-blue">momentum</span> = <span className="code-orange">true</span></p>
            <p><span className="line-number">02</span></p>
            <p><span className="line-number">03</span><span className="code-purple">export</span> <span className="code-purple">default</span> <span className="code-blue">build</span>({"{"}</p>
            <p><span className="line-number">04</span> &nbsp; tools: [<span className="code-green">'json'</span>, <span className="code-green">'regex'</span>, <span className="code-green">'api'</span>],</p>
            <p><span className="line-number">05</span> &nbsp; friction: <span className="code-orange">0</span></p>
            <p><span className="line-number">06</span>{"}"})</p>
            <p className="terminal-cursor"><span className="line-number">07</span>▌</p>
          </div>
          <div className="terminal-footer"><span>● All systems operational</span><span>⌘ K to explore</span></div>
        </div>
      </section>

      <section className="tool-strip" id="tools">
        <div className="section-label">THE TOOLKIT</div>
        <div className="tool-grid">
          <article className="tool-item"><span className="tool-icon purple">⌘</span><div><h3>Format & transform</h3><p>Make messy data make sense.</p></div><span className="tool-arrow">↗</span></article>
          <article className="tool-item"><span className="tool-icon orange">/</span><div><h3>Test & inspect</h3><p>See what your code is really doing.</p></div><span className="tool-arrow">↗</span></article>
          <article className="tool-item"><span className="tool-icon green">{"{ }"}</span><div><h3>Build & ship</h3><p>From idea to working, faster.</p></div><span className="tool-arrow">↗</span></article>
        </div>
      </section>

      <footer className="landing-footer"><span>dev/kit — your developer sidekick</span><span>Made for focused work <span className="heart">♥</span></span></footer>

      {showAuth && <div className="auth-overlay" role="dialog" aria-modal="true" onClick={() => setShowAuth(false)}>
        <section className="auth-card" onClick={(event) => event.stopPropagation()}>
          <button className="close-button" onClick={() => setShowAuth(false)} aria-label="Close">×</button>
          <p className="intro">YOUR WORKSPACE AWAITS</p>
          <h2>Welcome back</h2>
          <p className="muted">Sign in securely with your Google account.</p>
          <GoogleButton onSuccess={onAuthenticated} />
        </section>
      </div>}
    </main>
  );
}
