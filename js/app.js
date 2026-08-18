(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");
  const KEY_STATES = "claimmap-states";
  const KEY_WEEK = "claimmap-week";

  function nav(path) {
    if (!path.startsWith("#/")) path = "#/" + path.replace(/^#?\/?/, "");
    if (location.hash !== path) location.hash = path;
    else route();
  }
  window.cmGo = nav;

  function scoreClass(s) { return s >= 4 ? "" : s >= 3 ? "mid" : "low"; }

  function headerOn(id) {
    document.querySelectorAll(".tabs a, .bottom a").forEach((a) => {
      a.classList.toggle("on", a.dataset.nav === id);
    });
  }

  function home() {
    headerOn("home");
    app.innerHTML = `
      <div class="kicker">Original app · not a $27 PDF</div>
      <h1>Find the money that is actually yours.</h1>
      <p class="lede">Official government doors. Honest scores. No “I bought their life for $100.” Educational only — not legal, tax, or financial advice.</p>
      <div class="pills">
        <span class="pill">23 methods</span>
        <span class="pill">50-state official doors</span>
        <span class="pill">US + Hong Kong</span>
        <span class="pill">Reel vs reality</span>
      </div>
      <div class="cta-row">
        <a class="cta" href="#/start">Start with where you’ve lived</a>
        <a class="cta ghost" href="#/finder">Browse all methods</a>
      </div>
      <div class="row2">
        <div class="box bad">
          <h3>The $27 reel funnel we beat</h3>
          <ul>
            <li>First-person fiction, copy-paste chapter mockups</li>
            <li>Static PDF. No official doors. US-only.</li>
            <li>Sells you a link that USA.gov already gives away</li>
          </ul>
        </div>
        <div class="box good">
          <h3>Claimmap</h3>
          <ul>
            <li>Personalized state + HK doors from the NAUPA list</li>
            <li>Reality score on every method. Closed tools marked closed.</li>
            <li>This-week checklist stays on your device. We never ask for SSN.</li>
          </ul>
        </div>
      </div>`;
  }

  function start() {
    headerOn("start");
    const saved = new Set(JSON.parse(localStorage.getItem(KEY_STATES) || "[]"));
    const chips = CM_STATES.us.map((s) => `
      <label class="${saved.has(s.id) ? "on" : ""}">
        <input type="checkbox" value="${s.id}" ${saved.has(s.id) ? "checked" : ""}/> ${s.name}
      </label>`).join("");
    app.innerHTML = `
      <div class="kicker">Takes two minutes</div>
      <h1>Where have you lived or worked?</h1>
      <p class="lede">Unclaimed property is reported to the holder’s state — often not the state you live in now. Check every one. Then we open the official doors. We do not store this on a server.</p>
      <p class="meta">Tap every US state or territory. Add Hong Kong if you had an MPF job.</p>
      <div class="states" id="state-box">${chips}
        <label class="${saved.has("HK") ? "on" : ""}"><input type="checkbox" value="HK" ${saved.has("HK") ? "checked" : ""}/> Hong Kong</label>
      </div>
      <div class="cta-row">
        <button class="cta" id="save-states">Build my official doors</button>
        <button class="cta ghost" id="clear-states">Clear</button>
      </div>`;
    const box = $("#state-box");
    box.addEventListener("change", (e) => {
      const lab = e.target.closest("label");
      if (lab) lab.classList.toggle("on", e.target.checked);
    });
    $("#save-states").onclick = () => {
      const ids = [...box.querySelectorAll("input:checked")].map((i) => i.value);
      localStorage.setItem(KEY_STATES, JSON.stringify(ids));
      nav("#/doors");
    };
    $("#clear-states").onclick = () => {
      localStorage.removeItem(KEY_STATES);
      start();
    };
  }

  function doors() {
    headerOn("start");
    const ids = JSON.parse(localStorage.getItem(KEY_STATES) || "[]");
    if (!ids.length) {
      app.innerHTML = `<div class="kicker">Nothing selected</div><h1>Pick at least one place.</h1>
        <a class="cta" href="#/start">Go back</a>`;
      return;
    }
    const us = CM_STATES.us.filter((s) => ids.includes(s.id));
    const hk = ids.includes("HK");
    app.innerHTML = `
      <div class="kicker">Your official doors</div>
      <h1>Search these. Do not pay a finder.</h1>
      <p class="lede">Always start with the multi-state search, then hit each official site. USA.gov: there is no single national database.</p>
      <div class="links">
        <a href="https://missingmoney.com/" target="_blank" rel="noopener">MissingMoney (multi-state)</a>
        <a class="ghost" href="https://unclaimed.org/search/" target="_blank" rel="noopener">NAUPA directory</a>
        <a class="ghost" href="https://www.usa.gov/unclaimed-money" target="_blank" rel="noopener">USA.gov index</a>
      </div>
      <div class="grid" style="margin-top:18px">
        ${us.map((s) => `<a class="card" href="${s.url}" target="_blank" rel="noopener">
          <span class="tag claim">${s.id}</span><h3>${s.name}</h3>
          <p>Official program listed by NAUPA. Confirm you are on a .gov / state site before you type a name.</p>
        </a>`).join("")}
        ${hk ? `<a class="card" href="https://www.mpfa.org.hk/en" target="_blank" rel="noopener">
          <span class="tag claim">HK</span><h3>Hong Kong MPF</h3>
          <p>Search MPFA / old trustees. Not a Facebook claim agent.</p>
        </a>` : ""}
      </div>
      <div class="cta-row">
        <a class="cta" href="#/week">Open this-week checklist</a>
        <a class="cta ghost" href="#/start">Edit places</a>
      </div>`;
  }

  function finder() {
    headerOn("finder");
    app.innerHTML = `
      <div class="kicker">Browse</div>
      <h1>Methods, scored for reality.</h1>
      <p class="lede">Claim = money that may already be yours. Warn = skip. Everything else is work, tax, or capital — not a loophole.</p>
      <div class="filters">
        <input id="q" placeholder="Search methods…" />
        <select id="region">
          <option value="all">Any region</option>
          <option value="us">United States</option>
          <option value="hk">Hong Kong / Macau</option>
          <option value="intl">International</option>
        </select>
        <select id="capital">
          <option value="all">Any capital</option>
          <option value="0">$0</option>
          <option value="100">Under $100</option>
          <option value="1000">Under $1,000</option>
        </select>
        <select id="kind">
          <option value="all">All types</option>
          <option value="claim">Already-yours claims</option>
          <option value="tax">Tax / Treasury</option>
          <option value="work">Work / contracts</option>
          <option value="property">Property (hard)</option>
          <option value="income">Income (work)</option>
          <option value="warn">Warn / skip</option>
        </select>
        <select id="honest">
          <option value="all">Any reality score</option>
          <option value="4">4+ only</option>
          <option value="3">3+</option>
        </select>
      </div>
      <p class="meta" id="count"></p>
      <div class="grid" id="grid"></div>`;
    const draw = () => {
      const q = $("#q").value.toLowerCase();
      const region = $("#region").value;
      const capital = $("#capital").value;
      const kind = $("#kind").value;
      const honest = $("#honest").value;
      const rows = CM_METHODS.filter((m) => {
        if (q && !(m.name + m.blurb).toLowerCase().includes(q)) return false;
        if (region !== "all" && m.region !== region) return false;
        if (capital !== "all" && m.capital > Number(capital)) return false;
        if (kind !== "all" && m.kind !== kind) return false;
        if (honest !== "all" && m.score < Number(honest)) return false;
        return true;
      }).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
      $("#count").textContent = rows.length + " methods · sorted by reality score";
      $("#grid").innerHTML = rows.map((m) => `
        <a class="card" href="#/m/${m.id}">
          <span class="tag ${m.kind}">${m.kind}</span>
          <h3>${m.name}</h3>
          <p>${m.blurb}</p>
          <div class="stat"><span>${m.cost}</span><span class="score ${scoreClass(m.score)}">Reality ${m.score}/5</span></div>
        </a>`).join("");
    };
    ["q", "region", "capital", "kind", "honest"].forEach((id) => {
      $("#" + id).addEventListener("input", draw);
      $("#" + id).addEventListener("change", draw);
    });
    draw();
  }

  function method(id) {
    headerOn("finder");
    const m = CM_METHODS.find((x) => x.id === id);
    if (!m) { nav("#/finder"); return; }
    document.title = m.name + " — Claimmap";
    app.innerHTML = `
      <div class="kicker"><a href="#/finder">← All methods</a></div>
      <span class="tag ${m.kind}">${m.kind}</span>
      <h1>${m.name}</h1>
      <p class="lede">${m.blurb}</p>
      <div class="facts">
        <div class="fact"><b>Capital</b>${m.cost}</div>
        <div class="fact"><b>Time</b>${m.time}</div>
        <div class="fact"><b>Region</b>${m.region.toUpperCase()}</div>
        <div class="fact"><b>Reality</b>${m.score}/5</div>
      </div>
      <div class="${m.score <= 2 ? "warnbox" : "box"}"><b>Legal reality.</b> ${m.legal}</div>
      <h2 style="margin-top:22px">Steps</h2>
      <ol>${m.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      <div class="links">${m.links.map((l) => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")}
        <a class="ghost" href="#/reels">See reel vs reality</a>
      </div>`;
  }

  function reels() {
    headerOn("reels");
    app.innerHTML = `
      <div class="kicker">Their flaws, corrected</div>
      <h1>Reel hook vs the official story.</h1>
      <p class="lede">We watched the public Wealthivora / copycat scripts. We did not buy their PDF. The one true claim — state unclaimed property — is already free.</p>
      ${CM_REELS.map((r) => `
        <article class="reel">
          <span class="tag ${r.score >= 4 ? "claim" : r.score >= 3 ? "work" : "warn"}">${r.verdict} · ${r.score}/5</span>
          <q>${r.hook}</q>
          <p>${r.truth}</p>
        </article>`).join("")}`;
  }

  function week() {
    headerOn("week");
    const saved = JSON.parse(localStorage.getItem(KEY_WEEK) || "{}");
    app.innerHTML = `
      <div class="kicker">Do this before any hustle</div>
      <h1>This week’s official sweep.</h1>
      <p class="lede">Free. No capital. If nothing hits, you lost an afternoon — not $27 and a week of paperwork theater.</p>
      <div id="checks">${CM_WEEK.map(([id, label, href]) => `
        <label class="check">
          <input type="checkbox" data-id="${id}" ${saved[id] ? "checked" : ""}/>
          <span>${label}<br><a href="${href}" target="_blank" rel="noopener">Open official site</a></span>
        </label>`).join("")}</div>`;
    app.addEventListener("change", (e) => {
      if (!e.target.matches("input[data-id]")) return;
      const cur = JSON.parse(localStorage.getItem(KEY_WEEK) || "{}");
      cur[e.target.dataset.id] = e.target.checked;
      localStorage.setItem(KEY_WEEK, JSON.stringify(cur));
    });
  }

  function sources() {
    headerOn("sources");
    app.innerHTML = `
      <div class="kicker">Start here, not on a reel</div>
      <h1>Official indexes</h1>
      <p class="lede">USA.gov is explicit: there is no single place to look. Never pay a finder an upfront fee to claim your own money.</p>
      <table>
        <thead><tr><th>Door</th><th>What it is</th><th>Link</th></tr></thead>
        <tbody>${CM_SOURCES.map((s) => `<tr><td>${s[0]}</td><td>${s[1]}</td><td><a href="${s[2]}" target="_blank" rel="noopener">${s[2].replace(/^https?:\/\//,"")}</a></td></tr>`).join("")}</tbody>
      </table>`;
  }

  function about() {
    headerOn("about");
    app.innerHTML = `
      <div class="kicker">About</div>
      <h1>Why this exists</h1>
      <p class="lede">A faceless Instagram account sold a $27, 109-page PDF of “45 legal ways.” Public preview pages pasted the same four bullets on every chapter. The reels invented first-person windfalls. The one true method — unclaimed property — is already free on .gov sites.</p>
      <div class="box">
        <h3>What we will not do</h3>
        <ul>
          <li>Copy their book, title, cover, or artwork.</li>
          <li>Ask for your SSN. Official sites do that, not us.</li>
          <li>Call tax rules or gig work “unclaimed money.”</li>
          <li>Sell aged corporations, credit stacking, or kitchen-table offshore theater.</li>
        </ul>
      </div>
      <p class="meta" style="margin-top:18px">Claimmap is independent. Not affiliated with Wealthivora, Gumroad, NAUPA, or any government. Educational only. Programs change — verify on the official site. State URLs sourced from NAUPA’s public directory on 19 Aug 2026.</p>`;
  }

  function route() {
    document.title = "Claimmap — Official doors. Honest numbers.";
    const h = (location.hash || "#/").replace(/^#/, "") || "/";
    const parts = h.split("/").filter(Boolean);
    app.className = "page on";
    if (!parts.length) return home();
    if (parts[0] === "start") return start();
    if (parts[0] === "doors") return doors();
    if (parts[0] === "finder") return finder();
    if (parts[0] === "m" && parts[1]) return method(parts[1]);
    if (parts[0] === "reels") return reels();
    if (parts[0] === "week") return week();
    if (parts[0] === "sources") return sources();
    if (parts[0] === "about") return about();
    home();
  }

  window.addEventListener("hashchange", route);
  route();
})();
