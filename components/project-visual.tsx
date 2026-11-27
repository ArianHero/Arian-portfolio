import type { VisualType } from "@/lib/projects";

type Props = {
  visual: VisualType;
  compact?: boolean;
};

const workPreviews: Partial<Record<VisualType, { label: string; title: string }>> = {
  "traffic-study": { label: "Literature review", title: "Traffic behavior" },
  "water-study": { label: "Conference paper", title: "Water waste" },
  "incident-report": { label: "App in progress", title: "Report a violation" }
};

export default function ProjectVisual({ visual, compact = false }: Props) {
  const workPreview = workPreviews[visual];

  return (
    <div className={`project-visual visual-${visual}${compact ? " is-compact" : ""}`}>
      {workPreview && (
        <div className="work-preview" aria-hidden="true">
          <div className="work-preview-pattern" />
          <div className="work-preview-copy">
            <span>{workPreview.label}</span>
            <strong>{workPreview.title}</strong>
          </div>
        </div>
      )}
      {visual === "storefront" && (
        <div className="mock-browser shop-browser">
          <div className="mock-browser-top">
            <span className="browser-dots"><i /><i /><i /></span>
            <span className="browser-address">tehran / online shop</span>
            <span className="browser-menu">MENU</span>
          </div>
          <div className="shop-masthead">
            <span>TEHRAN ONLINE SHOP</span>
            <span>DIGITAL STOREFRONT</span>
          </div>
          <div className="shop-layout">
            <div className="shop-copy">
              <small>NEW SEASON · 2026</small>
              <strong>Find your<br />everyday essential.</strong>
              <span className="shop-link">EXPLORE COLLECTION ↗</span>
            </div>
            <div className="shop-products">
              <div className="shop-product product-a"><span>01</span><i /></div>
              <div className="shop-product product-b"><span>02</span><i /></div>
              <div className="shop-product product-c"><span>03</span><i /></div>
            </div>
          </div>
          <div className="shop-bottom"><span>OBJECTS WITH PURPOSE</span><span>01 — 04</span></div>
        </div>
      )}

      {visual === "time" && (
        <div className="time-stage">
          <div className="time-topline"><span>NOWASTEDTIME</span><span>PERSONAL PLANNER</span></div>
          <div className="time-orbit" aria-hidden="true">
            <div className="time-ring time-ring-one" />
            <div className="time-ring time-ring-two" />
            <div className="time-core"><small>PLAN YOUR DAY</small><strong>NOW.</strong><span>TASKS · HABITS · WORKOUTS</span></div>
            <i className="time-marker marker-one" /><i className="time-marker marker-two" /><i className="time-marker marker-three" />
          </div>
          <div className="time-bottom"><span>NOWASTEDTIME.IR</span><span>LIVE WEBSITE ↗</span></div>
        </div>
      )}

      {visual === "trading" && (
        <div className="trading-stage">
          <div className="trading-topline"><span>MARKET RESEARCH / 001</span><span>MODEL IN DEVELOPMENT</span></div>
          <div className="trading-heading"><small>FORMULA DEVELOPMENT</small><strong>READ THE<br /><em>MARKET.</em></strong></div>
          <div className="trading-chart" aria-hidden="true">
            <div className="trading-chart-grid" />
            <svg viewBox="0 0 440 150" role="presentation" focusable="false"><path className="trading-area" d="M0 119 C30 108 43 90 68 100 S103 125 129 88 S164 35 190 61 S226 105 251 71 S291 44 315 57 S350 90 374 42 S414 30 440 8 L440 150 L0 150 Z" /><path className="trading-line" d="M0 119 C30 108 43 90 68 100 S103 125 129 88 S164 35 190 61 S226 105 251 71 S291 44 315 57 S350 90 374 42 S414 30 440 8" /></svg>
            <span className="chart-label chart-label-a">INPUTS</span><span className="chart-label chart-label-b">SIGNALS</span><span className="chart-label chart-label-c">TESTING</span>
          </div>
          <div className="trading-bottom"><span>RESEARCH IN PROGRESS</span><span>ILLUSTRATIVE CHART</span></div>
        </div>
      )}

      {visual === "billiards" && (
        <div className="billiards-stage">
          <div className="billiards-wordmark">THE<br /><em>GAME</em><br />ROOM.</div>
          <div className="pool-table">
            <div className="table-rail"><div className="table-felt" />
              <span className="pool-ball ball-white" /><span className="pool-ball ball-purple" />
              <span className="pool-ball ball-yellow" /><span className="pool-ball ball-red" />
              <span className="pool-ball ball-blue" /><span className="pool-ball ball-orange" />
            </div>
          </div>
          <div className="billiards-meta"><span>PRECISION IN EVERY DETAIL</span><span>EST. 2026</span></div>
        </div>
      )}

      {visual === "basketball" && (
        <div className="nba-stage">
          <div className="nba-topline"><span>COURTSIDE / IQ</span><span>CHALLENGE 001</span></div>
          <div className="nba-question">
            <span>QUESTION 01 / 05</span>
            <strong>How long is a regulation<br />NBA quarter?</strong>
            <div className="nba-options"><i>A&nbsp; 10 minutes</i><i>B&nbsp; 12 minutes</i><i>C&nbsp; 15 minutes</i></div>
          </div>
          <div className="nba-bottom"><span>NBA RULES & HISTORY</span><span>PLAYABLE DEMO</span></div>
        </div>
      )}

      {visual === "bottle" && (
        <div className="bottle-stage">
          <div className="bottle-glow" />
          <div className="bottle-object">
            <div className="bottle-lid">
              <span className="bottle-screen">680 <small>ml</small></span>
            </div>
            <div className="bottle-neck" />
            <div className="bottle-body">
              <div className="bottle-reflection" />
            </div>
            <div className="bottle-base" />
          </div>
          <div className="bottle-label label-left">01 / MEASURE</div>
          <div className="bottle-label label-right">02 / HYDRATE</div>
          <div className="bottle-footnote">A BETTER SIGNAL FOR A DAILY HABIT</div>
        </div>
      )}
    </div>
  );
}
