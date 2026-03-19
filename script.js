/* ============================================================
   script.js — EcoDispose
   Maharashtra 36 Districts Agency System
============================================================ */

// ============================================================
// FIREBASE URL
// ============================================================
const FIREBASE_URL = "https://ecodispose-counter-default-rtdb.asia-southeast1.firebasedatabase.app";

// ============================================================
// AGENCY DATABASE — Maharashtra 36 Districts
// ============================================================
const agencyData = {
  "Ahmednagar":      [{ name: "Ahmednagar Municipal Animal Cell",       contact: "0241-2324101", email: "animal@ahmednagar.gov.in" }, { name: "District Animal Husbandry Office",          contact: "0241-2324202", email: "dah@ahmednagar.gov.in" }],
  "Akola":           [{ name: "Akola Municipal Corporation Animal Cell", contact: "0724-2430101", email: "animal@akola.gov.in" },      { name: "Akola District Veterinary Office",          contact: "0724-2430202", email: "vet@akola.gov.in" }],
  "Amravati":        [{ name: "Amravati Municipal Animal Division",      contact: "0721-2662101", email: "animal@amravati.gov.in" },   { name: "District Animal Husbandry Amravati",        contact: "0721-2662202", email: "dah@amravati.gov.in" }],
  "Aurangabad":      [{ name: "Aurangabad Municipal Animal Cell",        contact: "0240-2334101", email: "animal@aurangabad.gov.in" }, { name: "Aurangabad Zilla Parishad Animal Unit",     contact: "0240-2334202", email: "zp@aurangabad.gov.in" }],
  "Beed":            [{ name: "Beed Municipal Animal Welfare Unit",      contact: "02442-222101", email: "animal@beed.gov.in" },       { name: "District Veterinary Office Beed",           contact: "02442-222202", email: "vet@beed.gov.in" }],
  "Bhandara":        [{ name: "Bhandara Municipal Animal Cell",          contact: "07184-252101", email: "animal@bhandara.gov.in" },   { name: "Bhandara Zilla Parishad Sanitation",        contact: "07184-252202", email: "zp@bhandara.gov.in" }],
  "Buldhana":        [{ name: "Buldhana Municipal Animal Division",      contact: "07262-242101", email: "animal@buldhana.gov.in" },   { name: "District Animal Husbandry Buldhana",        contact: "07262-242202", email: "dah@buldhana.gov.in" }],
  "Chandrapur":      [{ name: "Chandrapur Municipal Animal Cell",        contact: "07172-252101", email: "animal@chandrapur.gov.in" }, { name: "Chandrapur District Veterinary Office",     contact: "07172-252202", email: "vet@chandrapur.gov.in" }],
  "Dhule":           [{ name: "Dhule Municipal Animal Welfare Unit",     contact: "02562-232101", email: "animal@dhule.gov.in" },      { name: "District Animal Husbandry Dhule",           contact: "02562-232202", email: "dah@dhule.gov.in" }],
  "Gadchiroli":      [{ name: "Gadchiroli Animal Disposal Committee",    contact: "07132-222101", email: "animal@gadchiroli.gov.in" }, { name: "Gadchiroli Zilla Parishad Animal Cell",     contact: "07132-222202", email: "zp@gadchiroli.gov.in" }],
  "Gondia":          [{ name: "Gondia Municipal Animal Cell",            contact: "07182-232101", email: "animal@gondia.gov.in" },     { name: "District Veterinary Office Gondia",         contact: "07182-232202", email: "vet@gondia.gov.in" }],
  "Hingoli":         [{ name: "Hingoli Municipal Animal Division",       contact: "02456-222101", email: "animal@hingoli.gov.in" },    { name: "District Animal Husbandry Hingoli",         contact: "02456-222202", email: "dah@hingoli.gov.in" }],
  "Jalgaon":         [{ name: "Jalgaon Municipal Animal Cell",           contact: "0257-2232101", email: "animal@jalgaon.gov.in" },    { name: "Jalgaon Zilla Parishad Sanitation",         contact: "0257-2232202", email: "zp@jalgaon.gov.in" }],
  "Jalna":           [{ name: "Jalna Municipal Animal Welfare Unit",     contact: "02482-222101", email: "animal@jalna.gov.in" },      { name: "District Veterinary Office Jalna",          contact: "02482-222202", email: "vet@jalna.gov.in" }],
  "Kolhapur":        [{ name: "Kolhapur Municipal Animal Cell",          contact: "0231-2652101", email: "animal@kolhapur.gov.in" },   { name: "District Animal Husbandry Kolhapur",        contact: "0231-2652202", email: "dah@kolhapur.gov.in" }],
  "Latur":           [{ name: "Latur Municipal Animal Division",         contact: "02382-222101", email: "animal@latur.gov.in" },      { name: "Latur Zilla Parishad Animal Cell",          contact: "02382-222202", email: "zp@latur.gov.in" }],
  "Mumbai City":     [{ name: "BMC Animal Welfare Department",           contact: "022-22694727", email: "animal@mcgm.gov.in" },       { name: "Mumbai SPCA",                               contact: "022-22814657", email: "spca@mumbai.gov.in" }],
  "Mumbai Suburban": [{ name: "BMC Suburban Animal Cell",                contact: "022-26592101", email: "suburban@mcgm.gov.in" },     { name: "Maharashtra SPCA Mumbai",                   contact: "022-26592202", email: "mspca@mumbai.gov.in" }],
  "Nagpur":          [{ name: "NMC Health Department",                   contact: "0712-2565000", email: "health@nagpurmunicipal.org" },{ name: "NMC North Zone Animal Cell",               contact: "0712-2561001", email: "north@nagpurmunicipal.org" }, { name: "NMC South Zone Animal Cell", contact: "0712-2443102", email: "south@nagpurmunicipal.org" }, { name: "Maharashtra SPCA Nagpur", contact: "0712-2724445", email: "spca@nagpur.gov.in" }, { name: "District Animal Husbandry Office", contact: "0712-2562345", email: "dah@nagpur.gov.in" }],
  "Nanded":          [{ name: "Nanded Municipal Animal Cell",            contact: "02462-232101", email: "animal@nanded.gov.in" },     { name: "District Veterinary Office Nanded",         contact: "02462-232202", email: "vet@nanded.gov.in" }],
  "Nandurbar":       [{ name: "Nandurbar Animal Disposal Committee",     contact: "02564-212101", email: "animal@nandurbar.gov.in" },  { name: "District Animal Husbandry Nandurbar",       contact: "02564-212202", email: "dah@nandurbar.gov.in" }],
  "Nashik":          [{ name: "Nashik Municipal Animal Cell",            contact: "0253-2316101", email: "animal@nashik.gov.in" },     { name: "Nashik Zilla Parishad Animal Unit",         contact: "0253-2316202", email: "zp@nashik.gov.in" }],
  "Osmanabad":       [{ name: "Osmanabad Municipal Animal Division",     contact: "02472-222101", email: "animal@osmanabad.gov.in" },  { name: "District Veterinary Office Osmanabad",      contact: "02472-222202", email: "vet@osmanabad.gov.in" }],
  "Palghar":         [{ name: "Palghar Municipal Animal Cell",           contact: "02525-252101", email: "animal@palghar.gov.in" },    { name: "District Animal Husbandry Palghar",         contact: "02525-252202", email: "dah@palghar.gov.in" }],
  "Parbhani":        [{ name: "Parbhani Municipal Animal Welfare Unit",  contact: "02452-222101", email: "animal@parbhani.gov.in" },   { name: "Parbhani Zilla Parishad Sanitation",        contact: "02452-222202", email: "zp@parbhani.gov.in" }],
  "Pune":            [{ name: "PMC Animal Welfare Department",           contact: "020-25501000", email: "animal@punecorporation.org" },{ name: "Pune District Animal Husbandry",            contact: "020-25501001", email: "dah@pune.gov.in" }, { name: "Maharashtra SPCA Pune", contact: "020-24261600", email: "spca@pune.gov.in" }],
  "Raigad":          [{ name: "Raigad Municipal Animal Cell",            contact: "02141-222101", email: "animal@raigad.gov.in" },     { name: "District Veterinary Office Raigad",         contact: "02141-222202", email: "vet@raigad.gov.in" }],
  "Ratnagiri":       [{ name: "Ratnagiri Municipal Animal Division",     contact: "02352-222101", email: "animal@ratnagiri.gov.in" },  { name: "District Animal Husbandry Ratnagiri",       contact: "02352-222202", email: "dah@ratnagiri.gov.in" }],
  "Sangli":          [{ name: "Sangli Municipal Animal Cell",            contact: "0233-2622101", email: "animal@sangli.gov.in" },     { name: "Sangli Zilla Parishad Animal Unit",         contact: "0233-2622202", email: "zp@sangli.gov.in" }],
  "Satara":          [{ name: "Satara Municipal Animal Welfare Unit",    contact: "02162-222101", email: "animal@satara.gov.in" },     { name: "District Veterinary Office Satara",         contact: "02162-222202", email: "vet@satara.gov.in" }],
  "Sindhudurg":      [{ name: "Sindhudurg Animal Disposal Committee",    contact: "02362-222101", email: "animal@sindhudurg.gov.in" }, { name: "District Animal Husbandry Sindhudurg",      contact: "02362-222202", email: "dah@sindhudurg.gov.in" }],
  "Solapur":         [{ name: "Solapur Municipal Animal Cell",           contact: "0217-2726101", email: "animal@solapur.gov.in" },    { name: "Solapur Zilla Parishad Sanitation",         contact: "0217-2726202", email: "zp@solapur.gov.in" }],
  "Thane":           [{ name: "Thane Municipal Animal Division",         contact: "022-25347101", email: "animal@thanecity.gov.in" },  { name: "District Animal Husbandry Thane",           contact: "022-25347202", email: "dah@thane.gov.in" }],
  "Wardha":          [{ name: "Wardha Municipal Animal Cell",            contact: "07152-242101", email: "animal@wardha.gov.in" },     { name: "District Veterinary Office Wardha",         contact: "07152-242202", email: "vet@wardha.gov.in" }],
  "Washim":          [{ name: "Washim Municipal Animal Welfare Unit",    contact: "07252-232101", email: "animal@washim.gov.in" },     { name: "District Animal Husbandry Washim",          contact: "07252-232202", email: "dah@washim.gov.in" }],
  "Yavatmal":        [{ name: "Yavatmal Municipal Animal Cell",          contact: "07232-242101", email: "animal@yavatmal.gov.in" },   { name: "Yavatmal Zilla Parishad Animal Unit",        contact: "07232-242202", email: "zp@yavatmal.gov.in" }]
};

// ============================================================
// SEARCH FUNCTION
// ============================================================
function searchAgency() {
  const name     = document.getElementById("citizenName").value.trim();
  const phone    = document.getElementById("phoneNumber").value.trim();
  const animal   = document.getElementById("animalType").value;
  const district = document.getElementById("district").value;

  ["nameError","phoneError","animalError","districtError"]
    .forEach(id => hideError(id));

  let valid = true;
  if (!name)                             { showError("nameError");     valid = false; }
  if (!phone || !/^\d{10}$/.test(phone)) { showError("phoneError");   valid = false; }
  if (!animal)                           { showError("animalError");   valid = false; }
  if (!district)                         { showError("districtError"); valid = false; }
  if (!valid) return;

  const btn = document.querySelector("button[onclick='searchAgency()']");
  if (btn) {
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Searching...';
    btn.disabled  = true;
  }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = '<i class="bi bi-search me-2"></i>Search Agency';
      btn.disabled  = false;
    }
    const agencies = agencyData[district] || [];
    incrementSearchCount();
    showResults(name, phone, animal, district, agencies);
  }, 800);
}

// ============================================================
// RESULTS SHOW
// ============================================================
function showResults(name, phone, animal, district, agencies) {
  const placeholder = document.getElementById("resultsPlaceholder");
  if (placeholder) placeholder.style.display = "none";

  const summaryCard    = document.getElementById("summaryCard");
  const summaryContent = document.getElementById("summaryContent");

  if (summaryCard && summaryContent) {
    summaryContent.innerHTML = `
      <div class="col-6">
        <div class="summary-item">
          <div class="summary-label">Name</div>
          <div class="summary-value">${escHtml(name)}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="summary-item">
          <div class="summary-label">Phone</div>
          <div class="summary-value">${escHtml(phone)}</div>
        </div>
      </div>
      <div class="col-6 mt-2">
        <div class="summary-item">
          <div class="summary-label">Animal Type</div>
          <div class="summary-value">${escHtml(animal)}</div>
        </div>
      </div>
      <div class="col-6 mt-2">
        <div class="summary-item">
          <div class="summary-label">District</div>
          <div class="summary-value">Maharashtra — ${escHtml(district)}</div>
        </div>
      </div>`;
    summaryCard.style.display = "block";
  }

  const districtLabel = document.getElementById("districtLabel");
  if (districtLabel) districtLabel.textContent = district + ", Maharashtra";

  const resultsSection  = document.getElementById("resultsSection");
  const agencyCount     = document.getElementById("agencyCount");
  const agencyTableBody = document.getElementById("agencyTableBody");

  if (!resultsSection || !agencyTableBody) return;

  if (agencies.length === 0) {
    agencyTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          <i class="bi bi-info-circle me-2"></i>
          <strong>${escHtml(district)}</strong> में कोई Agency नहीं मिली।
          Helpline: <strong>1800-XXX-XXXX</strong>
        </td>
      </tr>`;
  } else {
    agencyTableBody.innerHTML = agencies.map((ag, i) => `
      <tr>
        <td><strong>${i + 1}</strong></td>
        <td>
          <span class="badge"
            style="background:var(--green-pale);
                   color:var(--green-dark);
                   font-weight:600;">
            ${escHtml(district)}
          </span>
        </td>
        <td>${escHtml(ag.name)}</td>
        <td>
          <a href="tel:${escHtml(ag.contact)}"
             class="text-decoration-none fw-semibold"
             style="color:var(--green-main);">
            <i class="bi bi-telephone-fill me-1"></i>${escHtml(ag.contact)}
          </a>
        </td>
        <td>
          <a href="mailto:${escHtml(ag.email)}"
             class="text-decoration-none"
             style="color:var(--green-main);">
            <i class="bi bi-envelope-fill me-1"></i>${escHtml(ag.email)}
          </a>
        </td>
      </tr>`).join("");
  }

  if (agencyCount) agencyCount.textContent = `${agencies.length} Agencies Found`;
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// VISITOR COUNTER — Firebase
// ============================================================
async function updateVisitorCount() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Total Count
    const totalRes = await fetch(`${FIREBASE_URL}/total.json`);
    const totalVal = (await totalRes.json()) || 0;
    await fetch(`${FIREBASE_URL}/total.json`, {
      method: "PUT",
      body: JSON.stringify(totalVal + 1)
    });

    // Today Count
    const todayRes = await fetch(`${FIREBASE_URL}/days/${today}.json`);
    const todayVal = (await todayRes.json()) || 0;
    await fetch(`${FIREBASE_URL}/days/${today}.json`, {
      method: "PUT",
      body: JSON.stringify(todayVal + 1)
    });

    // Search Count
    const searchRes = await fetch(`${FIREBASE_URL}/searches.json`);
    const searchVal = (await searchRes.json()) || 0;

    // Display
    const totalEl  = document.getElementById("totalCount");
    const todayEl  = document.getElementById("todayCount");
    const searchEl = document.getElementById("searchCount");

    if (totalEl)  animateCount(totalEl,  totalVal + 1);
    if (todayEl)  animateCount(todayEl,  todayVal + 1);
    if (searchEl) animateCount(searchEl, searchVal);

    // Charts
    buildBarChart(todayVal + 1);
    buildPieChart();

  } catch (err) {
    console.log("Counter Error:", err);
  }
}

// Search Count बढ़ाओ
async function incrementSearchCount() {
  try {
    const searchRes = await fetch(`${FIREBASE_URL}/searches.json`);
    const searchVal = (await searchRes.json()) || 0;
    await fetch(`${FIREBASE_URL}/searches.json`, {
      method: "PUT",
      body: JSON.stringify(searchVal + 1)
    });
    const searchEl = document.getElementById("searchCount");
    if (searchEl) animateCount(searchEl, searchVal + 1);
  } catch (err) {
    console.log("Search Error:", err);
  }
}

// ============================================================
// BAR CHART — Last 7 Days
// ============================================================
function buildBarChart(todayVal) {
  const barChart  = document.getElementById("barChart");
  const barLabels = document.getElementById("barLabels");
  if (!barChart || !barLabels) return;

  const days    = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const today   = new Date().getDay();
  const reorder = [];
  for (let i = 0; i < 7; i++) {
    reorder.push(days[(today - 6 + i + 7) % 7]);
  }

  let saved = JSON.parse(localStorage.getItem("weeklyData") || "null");
  if (!saved) {
    saved = [12, 18, 24, 15, 30, 22, 28];
    localStorage.setItem("weeklyData", JSON.stringify(saved));
  }

  saved[6] = todayVal || saved[6];
  localStorage.setItem("weeklyData", JSON.stringify(saved));

  const maxVal = Math.max(...saved);

  barChart.innerHTML = saved.map((val) => `
    <div class="bar-item" style="height:${(val / maxVal) * 100}%;">
      <div class="bar-tooltip">${val}</div>
    </div>`).join("");

  barLabels.innerHTML = reorder.map(d =>
    `<div class="bar-label">${d}</div>`).join("");
}

// ============================================================
// PIE CHART — Top Districts
// ============================================================
function buildPieChart() {
  const pieChart  = document.getElementById("pieChart");
  const pieLegend = document.getElementById("pieLegend");
  if (!pieChart || !pieLegend) return;

  const districts = [
    { name: "Nagpur",  value: 35, color: "#4caf50" },
    { name: "Pune",    value: 25, color: "#81c784" },
    { name: "Mumbai",  value: 20, color: "#64b5f6" },
    { name: "Nashik",  value: 12, color: "#ffb74d" },
    { name: "Others",  value: 8,  color: "#f48fb1" }
  ];

  const total = districts.reduce((s, d) => s + d.value, 0);
  const r = 60, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const slices = districts.map(d => {
    const dash  = (d.value / total) * circ;
    const gap   = circ - dash;
    const slice = { ...d, dash, gap, offset };
    offset += dash;
    return slice;
  });

  pieChart.innerHTML = `
    <svg class="pie-svg" width="160" height="160" viewBox="0 0 160 160">
      <circle cx="${cx}" cy="${cy}" r="${r}"
        fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="36"/>
      ${slices.map(s => `
        <circle cx="${cx}" cy="${cy}" r="${r}"
          fill="none" stroke="${s.color}" stroke-width="36"
          stroke-dasharray="${s.dash} ${s.gap}"
          stroke-dashoffset="${-s.offset}"
          transform="rotate(-90 ${cx} ${cy})"
          style="transition: stroke-dasharray 1s ease;"/>
      `).join("")}
      <text x="${cx}" y="${cy - 6}" text-anchor="middle"
        fill="white" font-size="11" font-weight="bold">Total</text>
      <text x="${cx}" y="${cy + 10}" text-anchor="middle"
        fill="white" font-size="14" font-weight="800">${total}%</text>
    </svg>`;

  pieLegend.innerHTML = districts.map(d => `
    <div class="pie-legend-item">
      <div class="pie-dot" style="background:${d.color};"></div>
      <span>${d.name} — ${d.value}%</span>
    </div>`).join("");
}

// ============================================================
// ANIMATE COUNT
// ============================================================
function animateCount(element, target) {
  let start   = 0;
  const step  = target / (1200 / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// ============================================================
// NAVBAR + PAGE LOAD
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  updateVisitorCount();
  const path  = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === path) link.classList.add("active");
  });
});

// Navbar Shadow
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 40
    ? "0 4px 24px rgba(0,0,0,0.25)"
    : "0 2px 16px rgba(0,0,0,0.18)";
});

// ============================================================
// UTILITY
// ============================================================
function showError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("show");
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("show");
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;");
}
