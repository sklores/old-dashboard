import React, { useEffect, useMemo, useState } from "react";
import Sky from "./topbar/Sky";
import Peninsula from "./topbar/Peninsula";
import Waves from "./topbar/Waves";

/** DC-ish coords */
const LAT = 38.9, LON = -77.04;

/* ---- helpers ---- */
function labelFromCode(code: number): string {
  const map: Record<number, string> = {
    0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Fog", 51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
    61: "Rain", 63: "Rain", 65: "Heavy rain",
    71: "Snow", 73: "Snow", 75: "Snow",
    80: "Showers", 81: "Showers", 82: "Showers",
  };
  return map[code] ?? "—";
}

function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)); }

/** Robust-ish scraper: finds the KPI tile labeled “SALES” and pulls the $ value. */
function useSalesFromDashboard(pollMs = 3000) {
  const [sales, setSales] = useState<number | null>(null);

  useEffect(() => {
    const readOnce = () => {
      try {
        // 1) Prefer explicit hooks if the app added them
        const explicit = document.querySelector('[data-kpi="sales"], [data-kpi="SALES"]');
        if (explicit) {
          const m = explicit.textContent?.replace(/[, ]/g, "").match(/\$?(-?\d+(\.\d+)?)/i);
          if (m) return setSales(Number(m[1]));
        }
        // 2) General search: find a node that says “SALES”, then nearest $number
        const all = Array.from(document.querySelectorAll("*")) as HTMLElement[];
        const labelNode = all.find(n => /sales/i.test(n.textContent ?? ""));
        if (labelNode) {
          // look within the same tile/card for a $number
          const card = labelNode.closest("[class*='card'],[class*='tile'],div");
          const scope = (card ?? labelNode);
          const txt = scope.textContent ?? "";
          const m = txt.replace(/[, ]/g, "").match(/\$(-?\d+(\.\d+)?)/);
          if (m) return setSales(Number(m[1]));
        }
      } catch { /* ignore */ }
      // couldn’t find it
      setSales(null);
    };

    readOnce();
    const t = setInterval(readOnce, pollMs);
    return () => clearInterval(t);
  }, [pollMs]);

  return sales;
}

function useFirstWorkingImage(cands: string[]) {
  const [src, setSrc] = useState<string | null>(null);
  const list = useMemo(() => cands.filter(Boolean), [cands]);
  useEffect(() => {
    let cancel = false;
    (async () => {
      for (const u of list) {
        try {
          await new Promise<void>((ok, fail) => {
            const i = new Image();
            i.onload = () => ok();
            i.onerror = fail;
            i.src = u;
          });
          if (!cancel) setSrc(u);
          break;
        } catch {}
      }
    })();
    return () => { cancel = true; };
  }, [list]);
  return src;
}

/* ---- component ---- */
export default function TopBar() {
  const gcdc = "/gcdc.jpg";
  const innovue = useFirstWorkingImage([
    "/innovue.svg", "/innovue.png", "/innovue-logo.png",
    "/assets/innovue.svg", "/assets/innovue.png"
  ]);

  const sales = useSalesFromDashboard(2500); // poll dashboard for SALES

  // day/night
  const [isDay, setIsDay] = useState(() => {
    const h = new Date().getHours();
    return h >= 6 && h < 18;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const h = new Date().getHours();
      setIsDay(h >= 6 && h < 18);
    }, 60_000);
    return () => clearInterval(t);
  }, []);

  // weather (temp only)
  const [tempF, setTempF] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=auto`;
        const r = await fetch(url);
        const j = await r.json();
        if (!alive) return;
        setTempF(Math.round(j.current.temperature_2m));
        // labelFromCode(Number(j.current.weather_code)) // available if you want it again
      } catch {}
    })();
    return () => { alive = false; };
  }, []);

  // map SALES → wave intensity
  // $0 => 0.35   …   $3000+ => 1.20
  const intensity = useMemo(() => {
    const val = clamp((sales ?? 1000) / 3000, 0, 1);
    return 0.35 + val * (1.20 - 0.35);
  }, [sales]);

  return (
    <>
      <div className="topbar">
        {/* Z order: sky(1) waves(2) peninsula(3) UI grid(4) */}
        <Sky isDay={isDay} tempF={tempF} />

        <Waves intensity={intensity} />

        <Peninsula innovueLogo={innovue} />

        {/* Foreground grid */}
        <div className="tb-grid">
          {/* left spacer */}
          <div />

          {/* centered brand */}
          <div className="brand">
            <img src={gcdc} alt="GCDC" />
            <span>GCDC</span>
          </div>

          {/* right: (empty—temp is inside Sky) */}
          <div />
        </div>
      </div>

      <style>{`
        .topbar {
          position: relative;
          width: 100%;
          height: 132px;
          color: #fff;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        @media (max-width: 640px) { .topbar { height: 120px; } }

        .tb-grid {
          position: absolute;
          inset: 0 0 0 0;
          z-index: 4;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          padding: 10px 12px 0;
          pointer-events: none;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.18);
          padding: 6px 12px;
          border-radius: 999px;
          pointer-events: auto;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,.25);
        }
        .brand img {
          width: 24px; height: 24px;
          border-radius: 6px; object-fit: cover;
        }
        .brand span {
          font-weight: 800; font-size: 16px;
          text-shadow: 0 1px 2px rgba(0,0,0,.35);
        }
      `}</style>
    </>
  );
}