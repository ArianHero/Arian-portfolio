import type { VisualType } from "@/lib/projects";

type Props = {
  visual: VisualType;
  compact?: boolean;
};

export default function ProjectVisual({ visual, compact = false }: Props) {
  return (
    <div className={`project-visual visual-${visual}${compact ? " is-compact" : ""}`}>
      {visual === "storefront" && (
        <div className="mock-browser shop-browser">
          <div className="mock-browser-top">
            <span className="browser-dots"><i /><i /><i /></span>
            <span className="browser-address">tehran.shop / collection</span>
            <span className="browser-menu">MENU</span>
          </div>
          <div className="shop-masthead">
            <span>TEHRAN / OBJECTS</span>
            <span>CURATED FOR EVERYDAY</span>
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
          <div className="nba-scoreboard">
            <div className="nba-team"><span className="team-mark mark-one">L</span><small>LOS ANGELES</small><strong>108</strong></div>
            <div className="nba-vs"><span>FINAL</span><i>VS</i><span>Q4 · 00:00</span></div>
            <div className="nba-team"><span className="team-mark mark-two">B</span><small>BOSTON</small><strong>104</strong></div>
          </div>
          <div className="nba-question">
            <span>QUESTION 04 / 10</span>
            <strong>Who holds the record<br />for most career assists?</strong>
            <div className="nba-options"><i>A&nbsp; Magic Johnson</i><i className="option-active">B&nbsp; John Stockton <b>✓</b></i><i>C&nbsp; Chris Paul</i></div>
          </div>
          <div className="nba-bottom"><span>YOUR KNOWLEDGE. YOUR GAME.</span><span>04 / 10</span></div>
        </div>
      )}

      {visual === "bottle" && (
        <div className="bottle-stage">
          <div className="bottle-glow" />
          <div className="bottle-object">
            <div className="bottle-lid"><span /></div>
            <div className="bottle-neck" />
            <div className="bottle-body">
              <div className="bottle-screen"><small>HYDRATION</small><strong>680<span>ml</span></strong><i><b /></i><small>68% OF DAILY GOAL</small></div>
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
