import { writeFileSync } from "fs";

function paths(variant, s) {
  if (variant === "flat") {
    const d = s * 0.28;
    return [
      `M${-s / 2} ${-s / 2} L${s / 2} ${-s / 2} L${s / 2} ${s / 2} L${-s / 2} ${s / 2} Z`,
      `M${-s / 2} ${-s / 2} L${-s / 2 + d} ${-s / 2 - d} L${s / 2 + d} ${-s / 2 - d} L${s / 2} ${-s / 2}`,
      `M${s / 2} ${-s / 2} L${s / 2 + d} ${-s / 2 - d} L${s / 2 + d} ${s / 2 - d} L${s / 2} ${s / 2}`,
    ];
  }
  if (variant === "oblique") {
    const d = s * 0.45;
    return [
      `M${-s / 2} ${-s / 2} L${s / 2} ${-s / 2} L${s / 2} ${s / 2} L${-s / 2} ${s / 2} Z`,
      `M${s / 2} ${-s / 2} L${s / 2 + d} ${-s / 2 - d * 0.55} L${s / 2 + d} ${s / 2 - d * 0.55} L${s / 2} ${s / 2}`,
      `M${-s / 2} ${-s / 2} L${-s / 2 + d} ${-s / 2 - d * 0.55} L${s / 2 + d} ${-s / 2 - d * 0.55} L${s / 2} ${-s / 2}`,
    ];
  }
  if (variant === "corner") {
    const w = s * 0.62;
    const h = s * 0.28;
    const d = s * 0.55;
    return [
      `M0 ${-h} L${w} 0 L0 ${h} L${-w} 0 Z`,
      `M${-w} 0 L${-w} ${d} L0 ${h + d} L0 ${h}`,
      `M${w} 0 L${w} ${d} L0 ${h + d} L0 ${h}`,
      `M0 ${-h} L0 ${h}`,
    ];
  }
  const h = s * 0.58;
  const w = s * 0.5;
  return [
    `M0 ${-h} L${w} ${-h * 0.5} L${w} ${h * 0.5} L0 ${h} L${-w} ${h * 0.5} L${-w} ${-h * 0.5} Z`,
    `M0 ${-h} L0 0`,
    `M${-w} ${-h * 0.5} L0 0 L${w} ${-h * 0.5}`,
    `M0 0 L0 ${h}`,
  ];
}

const W = 1400;
const H = 4000;

const cubes = [
  { y: 0.05, x: 0.03, size: 92, rotate: -14, opacity: 0.14, variant: "iso", sw: 1.35 },
  { y: 0.31, x: 0.94, size: 78, rotate: -24, opacity: 0.13, variant: "oblique", sw: 1.3 },
  { y: 0.62, x: 0.04, size: 86, rotate: 11, opacity: 0.15, variant: "corner", sw: 1.4 },
  { y: 0.88, x: 0.93, size: 70, rotate: -18, opacity: 0.12, variant: "flat", sw: 1.25 },
  { y: 0.09, x: 0.93, size: 58, rotate: 26, opacity: 0.09, variant: "corner" },
  { y: 0.16, x: 0.08, size: 48, rotate: 41, opacity: 0.08, variant: "flat" },
  { y: 0.24, x: 0.88, size: 64, rotate: -36, opacity: 0.1, variant: "iso" },
  { y: 0.36, x: 0.05, size: 54, rotate: 8, opacity: 0.085, variant: "oblique" },
  { y: 0.42, x: 0.9, size: 72, rotate: -42, opacity: 0.1, variant: "corner" },
  { y: 0.49, x: 0.11, size: 46, rotate: 19, opacity: 0.09, variant: "iso" },
  { y: 0.55, x: 0.95, size: 60, rotate: 33, opacity: 0.095, variant: "flat" },
  { y: 0.68, x: 0.89, size: 52, rotate: -9, opacity: 0.085, variant: "oblique" },
  { y: 0.74, x: 0.07, size: 68, rotate: 27, opacity: 0.1, variant: "iso" },
  { y: 0.81, x: 0.91, size: 44, rotate: -51, opacity: 0.08, variant: "corner" },
  { y: 0.95, x: 0.06, size: 56, rotate: 15, opacity: 0.09, variant: "flat" },
  { y: 0.03, x: 0.2, size: 34, rotate: 52, opacity: 0.035, variant: "flat" },
  { y: 0.13, x: 0.02, size: 40, rotate: -7, opacity: 0.04, variant: "iso" },
  { y: 0.18, x: 0.95, size: 110, rotate: 6, opacity: 0.035, variant: "oblique" },
  { y: 0.27, x: 0.15, size: 32, rotate: -58, opacity: 0.045, variant: "corner" },
  { y: 0.34, x: 0.84, size: 38, rotate: 14, opacity: 0.04, variant: "flat" },
  { y: 0.4, x: 0.02, size: 100, rotate: -21, opacity: 0.03, variant: "iso" },
  { y: 0.46, x: 0.96, size: 36, rotate: 48, opacity: 0.045, variant: "oblique" },
  { y: 0.53, x: 0.19, size: 42, rotate: -15, opacity: 0.035, variant: "corner" },
  { y: 0.59, x: 0.85, size: 50, rotate: 4, opacity: 0.04, variant: "iso" },
  { y: 0.65, x: 0.16, size: 30, rotate: 62, opacity: 0.045, variant: "flat" },
  { y: 0.71, x: 0.96, size: 94, rotate: -30, opacity: 0.032, variant: "oblique" },
  { y: 0.77, x: 0.02, size: 40, rotate: 21, opacity: 0.04, variant: "iso" },
  { y: 0.84, x: 0.84, size: 36, rotate: -40, opacity: 0.038, variant: "corner" },
  { y: 0.9, x: 0.15, size: 48, rotate: 9, opacity: 0.042, variant: "flat" },
  { y: 0.97, x: 0.88, size: 34, rotate: -25, opacity: 0.04, variant: "iso" },
];

const groups = cubes
  .map((c) => {
    const cx = c.x * W;
    const cy = c.y * H;
    const d = paths(c.variant, c.size)
      .map((p) => `<path d="${p}"/>`)
      .join("");
    return `<g transform="translate(${cx} ${cy}) rotate(${c.rotate})" opacity="${c.opacity}" fill="none" stroke="#ebe6e0" stroke-width="${c.sw || 1}">${d}</g>`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none">
${groups}
</svg>
`;

writeFileSync("public/cubes-backdrop.svg", svg);
console.log("wrote public/cubes-backdrop.svg");
