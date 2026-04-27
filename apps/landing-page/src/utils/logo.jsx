/**
 * BuildingLogo — Reusable React component for a building/house SVG icon.
 *
 * Usage variants:
 *   <BuildingLogo />                        — default 64×64, black
 *   <BuildingLogo size={32} color="#fff" /> — custom size & colour
 *   <BuildingLogo preset="favicon" />       — 32×32 optimised
 *   <BuildingLogo preset="logo" />          — 200×200 with label
 *   <BuildingLogo preset="splash" />        — 512×512 for splash screens
 *   <BuildingLogo preset="appIcon" />       — 1024×1024 for app store icons
 *
 * Presets map to common platform requirements:
 *   favicon  → 32×32   (browser tab)
 *   logo     → 200×200 (website header / React Native header)
 *   appIcon  → 1024×1024 (iOS / Android app store)
 *   splash   → 512×512  (React Native splash, centred on white)
 */

import React from "react";

// ─── Core path data (original viewBox 0 0 1024 1024) ─────────────────────────
const PATH_D =
    "M 515.281 203.208 C 504.401 212.123, 489.875 224.181, 483 230.003 C 470.929 240.226, 422.876 280.331, 398.766 300.305 L 387.032 310.026 386.766 282.263 L 386.500 254.500 358.727 254.500 L 330.955 254.500 330.952 302.500 C 330.951 328.900, 330.623 350.975, 330.225 351.556 C 329.826 352.137, 315.775 363.634, 299 377.105 C 232.439 430.555, 190.861 464.966, 191.529 466.048 C 191.791 466.471, 194.142 466.792, 196.753 466.760 C 199.364 466.728, 214.661 466.769, 230.747 466.851 L 259.994 467 260.247 627.750 L 260.500 788.500 330.744 788.757 L 400.989 789.014 401.244 704.257 L 401.500 619.500 433.500 619.500 L 465.500 619.500 465.756 704.250 L 466.011 789 531.506 789 L 597 789 597 704 L 597 619 627.494 619 L 657.989 619 658.244 703.750 L 658.500 788.500 730 788.500 L 801.500 788.500 801.753 627.750 L 802.006 467 835.503 467 C 853.926 467, 869 466.719, 869 466.376 C 869 466.033, 867.087 464.079, 864.750 462.035 C 853.139 451.879, 775.603 386.257, 746.994 362.372 C 631.319 265.800, 536.421 187, 535.794 187 C 535.392 187, 526.161 194.294, 515.281 203.208 M 496.375 292.250 C 463.079 318.696, 435.446 340.844, 365.500 397.149 C 356.150 404.676, 340.585 417.109, 330.910 424.779 L 313.321 438.724 312.672 450.112 C 311.846 464.623, 311.778 730.259, 312.600 732.400 C 313.129 733.779, 315.544 734, 330.107 734 L 347 734 347 594.144 L 347 454.289 360.250 443.316 C 367.538 437.280, 379.688 427.085, 387.250 420.659 L 401 408.975 401 486.488 L 401 564 433.500 564 L 466 564 466 523.500 L 466 483 491.500 483 L 517 483 517 608.500 L 517 734 531.500 734 L 546 734 546 608.500 L 546 483 571.500 483 L 597 483 597 523.500 L 597 564 627.500 564 L 658 564 658 487.059 C 658 442.507, 658.379 409.884, 658.901 409.561 C 659.396 409.255, 672.446 419.163, 687.901 431.579 L 716 454.154 716 594.077 L 716 734 733 734 L 750 734 749.970 586.250 L 749.940 438.500 732.720 424.353 C 723.249 416.571, 698.380 396.096, 677.457 378.853 C 584.387 302.152, 571.639 291.643, 554.202 277.250 C 544.041 268.863, 535.442 262, 535.094 262 C 534.746 262, 517.322 275.613, 496.375 292.250 M 484.996 356.229 C 484.993 356.378, 484.881 365.500, 484.746 376.500 L 484.500 396.500 504.500 396.500 L 524.500 396.500 524.500 376.500 L 524.500 356.500 504.750 356.229 C 493.887 356.080, 484.998 356.080, 484.996 356.229 M 537.792 374.344 C 537.631 384.330, 537.645 393.522, 537.822 394.771 L 538.145 397.042 557.822 396.771 L 577.500 396.500 577.500 376.500 L 577.500 356.500 557.792 356.344 L 538.084 356.188 537.792 374.344 M 485.015 409.229 C 485.024 409.928, 484.795 418.439, 484.506 428.143 C 484.217 437.846, 484.215 446.396, 484.501 447.143 C 484.916 448.222, 489.060 448.500, 504.761 448.500 L 524.500 448.500 524.500 428.500 L 524.500 408.500 504.750 408.229 C 489.293 408.017, 485.003 408.234, 485.015 409.229 M 538 428.229 L 538 448.500 555.750 448.383 C 565.513 448.319, 574.522 448.206, 575.771 448.133 L 578.042 448 577.771 428.250 L 577.500 408.500 557.750 408.229 L 538 407.958 538 428.229";

// ─── Preset configurations ────────────────────────────────────────────────────
const PRESETS = {
    favicon:  { size: 32,   showLabel: false, padding: 0 },
    logo:     { size: 48,  showLabel: false, padding: 0.1 },
    appIcon:  { size: 1024, showLabel: false, padding: 0.1  },
    splash:   { size: 512,  showLabel: false, padding: 0.2  },
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function BuildingLogo({
                                         // Core customisation
                                         size    = 64,
                                         color   = "currentColor",
                                         // Preset overrides everything above if provided
                                         preset,
                                         // Extra SVG props forwarded to the root element
                                         ...rest
                                     }) {
    const cfg = preset ? PRESETS[preset] : null;
    const resolvedSize  = cfg ? cfg.size  : size;

    // Padding shrinks the icon inside the viewBox to give breathing room
    const pad    = cfg ? cfg.padding * 1024 : 0;
    const vbSize = 1024;
    const viewBox = `${pad} ${pad} ${vbSize - pad * 2} ${vbSize - pad * 2}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
    width={resolvedSize}
    height={resolvedSize}
    viewBox={viewBox}
    aria-label="Building logo"
    role="img"
    {...rest}
>
    <path d={PATH_D} fill={color} fillRule="evenodd" stroke="none" />
        </svg>
);
}

// ─── Named preset helpers (convenience wrappers) ──────────────────────────────

/** 32×32 — drop straight into <link rel="icon"> as an inline SVG data URI */
export function FaviconLogo(props) {
    return <BuildingLogo preset="favicon" {...props} />;
}

/** 200×200 — website header / navigation bar logo */
export function WebsiteLogo(props) {
    return <BuildingLogo preset="logo" {...props} />;
}

/** 1024×1024 — iOS / Android app-store icon */
export function AppIconLogo(props) {
    return <BuildingLogo preset="appIcon" {...props} />;
}

/** 512×512 — React Native splash screen centrepiece */
export function SplashLogo(props) {
    return <BuildingLogo preset="splash" {...props} />;
}

// ─── Favicon data-URI helper (Web only) ──────────────────────────────────────
/**
 * Returns a data URI string you can assign to a <link rel="icon"> href.
 *
 * @param {string} [color="#000000"]
 * @returns {string}  "data:image/svg+xml;base64,..."
 */
export function getFaviconDataUri(color = "#000000") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path d="${PATH_D}" fill="${color}" fill-rule="evenodd"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Injects (or updates) a <link rel="icon"> tag in the document <head>.
 * Call once on app boot, e.g. in index.js / main.jsx.
 *
 * @param {string} [color="#000000"]
 */
export function injectFavicon(color = "#000000") {
    if (typeof document === "undefined") return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = getFaviconDataUri(color);
}