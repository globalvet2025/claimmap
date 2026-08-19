/* Visual map + SVG seals. Photos: Unsplash, stored locally. */
window.CM_VISUAL = {
  state: { icon: "cash", img: "/img/cash.jpg" },
  irs: { icon: "file", img: "/img/tax.jpg" },
  pbgc: { icon: "shield", img: "/img/desk.jpg" },
  hud: { icon: "house", img: "/img/house.jpg" },
  banks: { icon: "bank", img: "/img/bank.jpg" },
  va: { icon: "flag", img: "/img/flag.jpg" },
  courts: { icon: "scale", img: "/img/capitol.jpg" },
  bonds: { icon: "file", img: "/img/tax.jpg" },
  iim: { icon: "pin", img: "/img/cabin.jpg" },
  ibonds: { icon: "coins", img: "/img/cash.jpg" },
  tips: { icon: "coins", img: "/img/desk.jpg" },
  augusta: { icon: "house", img: "/img/house.jpg" },
  sam: { icon: "building", img: "/img/capitol.jpg" },
  lodge: { icon: "cabin", img: "/img/cabin.jpg" },
  taxsale: { icon: "key", img: "/img/keys.jpg" },
  car: { icon: "car", img: "/img/car.jpg" },
  drive: { icon: "car", img: "/img/highway.jpg" },
  media: { icon: "rain", img: "/img/rain.jpg" },
  liq: { icon: "box", img: "/img/warehouse.jpg" },
  geo: { icon: "globe", img: "/img/bank.jpg" },
  aged: { icon: "warn", img: "/img/keys.jpg" },
  hkmpf: { icon: "globe", img: "/img/hongkong.jpg" },
  hkor: { icon: "scale", img: "/img/hongkong.jpg" }
};

window.CM_REEL_VISUAL = [
  "/img/house.jpg",
  "/img/car.jpg",
  "/img/rain.jpg",
  "/img/capitol.jpg",
  "/img/bank.jpg",
  "/img/cabin.jpg",
  "/img/keys.jpg",
  "/img/highway.jpg",
  "/img/house.jpg",
  "/img/cash.jpg"
];

window.CM_ICON = function (name) {
  const s = {
    cash: '<path d="M4 8h16v10H4z"/><path d="M4 11h16M12 8v10"/><circle cx="12" cy="13" r="2"/>',
    house: '<path d="M3 11 12 4l9 7"/><path d="M6 10.5V20h12v-9.5"/><path d="M10 20v-6h4v6"/>',
    car: '<path d="M4 14h16l-1.5-5H5.5L4 14z"/><path d="M6.5 14v2.5M17.5 14v2.5"/><circle cx="7.5" cy="17.5" r="1.4"/><circle cx="16.5" cy="17.5" r="1.4"/><path d="M8 9h8"/>',
    rain: '<path d="M8 10a4 4 0 0 1 8 0h1a3 3 0 1 1 0 6H7a3 3 0 0 1 0-6h1z"/><path d="M9 18.5 8 21M12 18.5 11 21M15 18.5 14 21"/>',
    building: '<path d="M4 20h16M6 20V6h12v14"/><path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2"/>',
    scale: '<path d="M12 4v16M8 20h8"/><path d="M12 7l-6 7h5L12 7l1 7h5l-6-7z"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
    shield: '<path d="M12 3 5 6v6c0 5 3.2 7.8 7 9 3.8-1.2 7-4 7-9V6l-7-3z"/>',
    warn: '<path d="M12 4 21 20H3L12 4z"/><path d="M12 10v5M12 17.5h.01"/>',
    globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.8 3.8 5.6 3.8 8S14.5 17.2 12 20c-2.5-2.8-3.8-5.6-3.8-8S9.5 6.8 12 4z"/>',
    box: '<path d="M4 8h16v12H4z"/><path d="M4 8l8-4 8 4M12 4v16"/>',
    key: '<circle cx="8" cy="12" r="3"/><path d="M11 12h9l-2 2 2 2"/>',
    flag: '<path d="M6 4v16"/><path d="M6 5h12l-2.5 3.5L18 12H6"/>',
    bank: '<path d="M3 10h18M5 10v10h14V10M3 20h18M12 6 4 10h16L12 6z"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    coins: '<ellipse cx="10" cy="9" rx="6" ry="3"/><path d="M4 9v4c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/><ellipse cx="15" cy="12" rx="5" ry="2.4"/><path d="M10 12v3.4c1 .4 2.2.6 3.5.6 2.5 0 4.5-1 4.5-2.4V12"/>',
    cabin: '<path d="M3 12 12 5l9 7"/><path d="M6 11v9h12v-9"/><path d="M10 20v-5h4v5"/>'
  }[name] || '<circle cx="12" cy="12" r="7"/>';
  return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`;
};

window.CM_SHOT = function (id) {
  const v = (window.CM_VISUAL || {})[id] || { icon: "pin", img: "/img/desk.jpg" };
  return v;
};
