import { Component, Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { isConfigured } from "../config/siteConfig";

const Spline = lazy(() => import("@splinetool/react-spline"));
const LOAD_TIMEOUT_MS = 15000;

class SplineBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Renders a Spline scene on top of `fallback`. The fallback is always mounted underneath,
 * so if the URL is missing, blocked, slow or throws, the visitor still sees a complete visual.
 */
export default function SplineScene({ url, fallback, className = "" }) {
  const reduce = useReducedMotion();
  const enabled = isConfigured(url) && !reduce;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || loaded || failed) return undefined;
    const timer = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [enabled, loaded, failed]);

  const showScene = enabled && !failed;

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 transition-opacity duration-700 ${showScene && loaded ? "opacity-0" : "opacity-100"}`}>{fallback}</div>
      {showScene && (
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 [@media(hover:hover)]:pointer-events-auto ${loaded ? "opacity-100" : "opacity-0"}`}>
          <SplineBoundary onFail={() => setFailed(true)}>
            <Suspense fallback={null}>
              <Spline scene={url} onLoad={() => setLoaded(true)} style={{ width: "100%", height: "100%" }} />
            </Suspense>
          </SplineBoundary>
        </div>
      )}
    </div>
  );
}
