// Cost of Living in Africa calculator. Ghana is free; the other countries unlock after an email is saved to Firebase.
const D = {"Accra":[[700,1300,2200],[350,600,1000],[200,350,700],[130,250,400],[100,300,600],[150,300,600],[100,200,380],[250,900,2200]],"Kumasi":[[150,300,500],[200,320,550],[30,70,200],[80,140,250],[80,200,450],[80,150,300],[60,110,250],[180,450,1200]],"Nairobi":[[550,900,1550],[300,450,700],[150,300,550],[120,180,275],[115,275,550],[150,300,600],[140,320,650],[350,1100,3100]],"Nakuru":[[230,300,465],[200,300,500],[40,70,200],[80,130,220],[90,200,450],[80,150,300],[140,200,450],[110,400,1100]],"Lagos":[[450,800,1600],[300,500,900],[120,300,600],[150,300,650],[30,120,400],[150,350,800],[75,200,450],[400,1200,2700]],"Port Harcourt":[[120,230,550],[280,420,750],[50,150,300],[70,150,350],[30,120,400],[80,160,350],[50,110,250],[80,100,160]],"Kigali":[[600,900,1800],[300,500,850],[60,150,450],[75,120,220],[200,450,800],[150,300,600],[100,200,450],[300,800,2200]],"Rubavu":[[200,350,700],[200,320,550],[30,70,250],[60,100,180],[150,400,800],[70,140,300],[60,110,250],[30,110,250]],"Dakar":[[500,1100,2500],[300,500,850],[100,250,500],[120,220,400],[150,350,700],[150,300,600],[150,250,450],[220,750,2200]],"Saly":[[300,500,1000],[200,320,550],[40,100,250],[80,140,250],[150,350,700],[70,140,300],[100,170,300],[100,250,750]],"Abidjan":[[450,1100,2200],[300,520,900],[100,250,500],[130,230,400],[150,350,700],[150,300,650],[100,200,400],[300,900,2300]],"Grand-Bassam":[[280,450,900],[220,350,600],[40,100,250],[90,160,280],[150,350,700],[80,150,300],[80,150,300],[150,400,1200]],"Kampala":[[450,900,1800],[250,400,700],[60,150,400],[80,130,220],[150,300,600],[100,200,450],[60,120,250],[150,450,1750]],"Jinja":[[150,300,600],[180,280,480],[30,70,200],[50,90,160],[120,250,500],[60,120,250],[50,90,180],[80,250,600]],"Dar es Salaam":[[500,1100,2300],[300,500,850],[100,250,500],[100,180,320],[150,350,700],[120,250,550],[80,150,300],[300,700,2200]],"Arusha":[[230,500,1000],[220,350,600],[40,120,300],[60,110,200],[150,350,700],[80,160,350],[70,130,250],[250,600,1400]]};
const C = [
  ["Accra", "Ghana", "the capital", 1], ["Kumasi", "Ghana", "the Garden City", 0],
  ["Nairobi", "Kenya", "the capital", 1], ["Nakuru", "Kenya", "the calm Rift Valley city", 0],
  ["Lagos", "Nigeria", "the commercial capital", 1], ["Port Harcourt", "Nigeria", "the expat oil city", 0],
  ["Kigali", "Rwanda", "the capital", 1], ["Rubavu", "Rwanda", "the Lake Kivu city", 0],
  ["Dakar", "Senegal", "the capital", 1], ["Saly", "Senegal", "the Petite Côte beach town", 0],
  ["Abidjan", "Côte d'Ivoire", "the economic capital", 1], ["Grand-Bassam", "Côte d'Ivoire", "the historic beach town", 0],
  ["Kampala", "Uganda", "the capital", 1], ["Jinja", "Uganda", "the Source of the Nile town", 0],
  ["Dar es Salaam", "Tanzania", "the commercial capital", 1], ["Arusha", "Tanzania", "the safari gateway", 0]];
const COUNTRIES = ["Ghana", "Kenya", "Nigeria", "Rwanda", "Senegal", "Côte d'Ivoire", "Uganda", "Tanzania"];
const FREE = "Ghana";
const CAT = ["Rent, 2 bedrooms", "Groceries", "Transport", "Power, water, wifi", "Health insurance", "Eating out", "Domestic help", "School fees"];
const UP = [
  [12, "Accra landlords commonly ask 1 to 2 years upfront."], [12, "Ghanaian landlords often ask a year or more upfront; confirm locally."],
  [3, "Plan on a few months upfront; confirm with your agent."], [3, "Plan on a few months upfront; confirm with your agent."],
  [12, "Nigerian rent is paid a year at a time, plus agency and legal fees."], [12, "Nigerian rent is paid a year at a time."],
  [3, "Kigali landlords commonly ask 3 to 6 months upfront."], [3, "Plan on a few months upfront; confirm locally."],
  [3, "Dakar rentals are usually paid monthly with 2 to 3 months' deposit."], [3, "Assume a deposit of a few months; confirm locally."],
  [5, "Newcomers are often asked for several months of deposit and advance; confirm with your agent."], [5, "Assume a deposit plus advance of several months; confirm locally."],
  [3, "Assume a few months upfront; confirm with your agent."], [3, "Assume a few months upfront; confirm locally."],
  [6, "Some Dar es Salaam landlords ask for six months in advance."], [6, "Assume up to six months in advance, as in Dar; confirm locally."]];
const BLURB = [
  "Ghana's coastal capital, with the biggest returnee scene and the widest choice of schools.",
  "Ghana's Garden City and Asante cultural capital, with its own international airport and Lake Bosomtwe half an hour away.",
  "East Africa's business and diplomatic hub, with international schools and a large global community.",
  "A national park at the end of its streets and rhinos ten minutes from the centre; Nairobi's airports are 2 to 3 hours away.",
  "Nigeria's largest city: the most opportunity, the highest rents, the hardest traffic.",
  "Nigeria's oil and gas capital, with a ready-made expat community, international schools and its own airport.",
  "Rwanda's capital: clean, orderly and compact.",
  "On the shore of Lake Kivu, with flights to Kigali and gorilla country about an hour and a half away.",
  "Senegal's capital on the Atlantic: prime areas like Almadies and Mermoz price rent like Europe, while the market down the road stays cheap.",
  "Senegal's beach resort town about 80 km south of Dakar, popular with retirees and remote workers; serious medical care and international schools are in Dakar.",
  "Côte d'Ivoire's economic capital on the lagoon, with fast growth, French-speaking business life and expat areas like Cocody and Zone 4.",
  "A UNESCO-listed colonial town on the beach, about 40 km from Abidjan; rents run roughly 20 to 30% below central Abidjan.",
  "Uganda's green, hilly capital: one of East Africa's more affordable capitals, with expat areas like Kololo, Naguru and Muyenga.",
  "Uganda's second city at the source of the Nile, about two hours from Kampala: river life, quieter streets and much cheaper rent.",
  "Tanzania's biggest city on the Indian Ocean; expat rents in Masaki and Oyster Bay are often quoted in dollars.",
  "A cooler highland city at the foot of Mount Meru and the gateway to the northern safari parks and Kilimanjaro."];
const R = {
  "Ghana": [["Coming to visit", "ECOWAS citizens enter visa-free. Since 25 May 2026 all African passport holders get Ghana's e-visa free, but still apply online. Others apply on the e-visa platform."], ["If you have roots here", "Right of Abode lets people of African descent in the diaspora live in Ghana without a visa. Ghana recognises dual citizenship."], ["Coming to retire", "No dedicated retirement visa. Long stays run on a residence permit from Ghana Immigration Service."], ["Coming to work", "Work and residence permits through Ghana Immigration Service, usually employer-backed. Official site: gis.gov.gh"]],
  "Kenya": [["Coming to visit", "Since July 2025 most African and Caribbean nationals enter with no travel authorisation and no fee. Others apply for an eTA before travel, about US$30. An eTA never gives the right to work."], ["If you have roots here", "Kenya allows dual citizenship, and former citizens can apply to regain it."], ["Coming to retire", "Class K permit: at least 35 years old and an assured income of at least US$24,000 a year. No work of any kind is allowed on it."], ["Coming to work", "Class D for a Kenyan employer, Class G for investors, a nomad permit for people employed abroad. Official site: immigration.go.ke"]],
  "Nigeria": [["Coming to visit", "Visa on arrival ended on 1 May 2025. Apply online for an e-visa (about 48 hours, 30 or 90 days, not extendable). ECOWAS citizens enter visa-free. Fill the online landing card 72 hours before boarding."], ["If you have roots here", "Nigeria allows dual citizenship. Dual citizens also complete the online landing and exit cards."], ["Coming to retire", "No dedicated retirement visa. Long stays need a longer-term visa and a residence permit through the Nigeria Immigration Service."], ["Coming to work", "Employer-backed work visa and residence permit. Overstays cost $15 a day, with entry bans after 3 months. Official site: immigration.gov.ng"]],
  "Rwanda": [["Coming to visit", "Visa on arrival for every nationality: 30 days, about US$50. Or apply online through Irembo. African nationals enter free."], ["If you have roots here", "Rwanda allows dual citizenship."], ["Coming to retire", "Class K retirement permit: a retirement certificate, a Rwandan bank statement and local medical insurance. Most permits cost about RWF 150,000 (US$100)."], ["Coming to work", "Work permits must be filed within 15 working days of arrival. Official site: migration.gov.rw"]],
  "Senegal": [["Coming to visit", "ECOWAS citizens and travellers from more than 60 countries enter visa-free for up to 90 days. A reciprocal e-visa plan has been announced but not dated, so check before you fly."], ["If you have roots here", "Senegalese citizens enter on their Senegalese passport or ID. If you hold another passport too, check your status with a Senegalese consulate before you plan a long stay."], ["Coming to retire", "There is no separate retirement visa. To stay beyond 90 days, apply for a residence card (Carte d'Identité d'Étranger) from the police in Dakar. Residence checks were tightened in September 2026."], ["Coming to work", "Work beyond 90 days needs a work permit backed by an employment contract, plus a residence permit."]],
  "Côte d'Ivoire": [["Coming to visit", "ECOWAS citizens enter visa-free for up to 90 days. Most others need an e-visa: pre-enrol online on the official SNEDAI site, then complete biometric enrolment at Abidjan airport. Embassies no longer issue visas on passports."], ["If you have roots here", "Ivorian citizens enter on their Ivorian passport or ID. If you hold another passport too, check your status with an Ivorian consulate before a long stay."], ["Coming to retire", "There is no dedicated retirement visa. After entry, long stays move to a residence permit (carte de séjour) through the immigration authority."], ["Coming to work", "A work-based residence permit needs employer sponsorship and a work contract. Official visa site: snedai.com"]],
  "Uganda": [["Coming to visit", "Get an approved e-visa before you travel: visa on arrival has ended. A single-entry tourist visa is US$50 for up to 90 days; the East Africa Tourist Visa (US$100) covers Uganda, Kenya and Rwanda. EAC citizens enter visa-free."], ["If you have roots here", "Uganda allows dual citizenship, so Ugandans abroad can keep or regain their Ugandan citizenship."], ["Coming to retire", "A Retirement Permit is available to foreign nationals over 60 who can show retirement and financial self-sufficiency."], ["Coming to work", "Employer-sponsored work permits through the immigration directorate. Official site: visas.immigration.go.ug"]],
  "Tanzania": [["Coming to visit", "Apply online for an e-visa: US$50 single entry, though US citizens get only the US$100 multiple-entry visa. EAC citizens enter visa-free. The East Africa Tourist Visa does not cover Tanzania."], ["If you have roots here", "Tanzania does not allow dual citizenship. If you hold another passport, you enter and stay as a foreigner unless you keep only Tanzanian citizenship."], ["Coming to retire", "A retirement residence permit is available for people living on their own income; budget for the fees and renewals."], ["Coming to work", "A work permit plus a residence permit, usually employer-backed. Investors need a registered business and proof of investment."]]};

const $ = (id) => document.getElementById(id);
const usd = (n) => "$" + Math.round(n).toLocaleString("en-US");
const LV = ["careful", "comfortable", "generous"];
const KEY = "mba-col-unlocked";
let city = 1, lvl = 1, kids = 0, unlocked = false;
try { unlocked = localStorage.getItem(KEY) === "1"; } catch (e) {}

const tot = (c, l, k) => D[C[c][0]].slice(0, 7).reduce((s, r) => s + r[l], 0) + D[C[c][0]][7][l] * k;
const open = (i) => unlocked || C[i][1] === FREE;

$("col-cities").innerHTML = COUNTRIES.map((n, g) => `<div class="col-ctry"><b>${n}</b>${[0, 1].map((j) => {
  const i = g * 2 + j;
  return `<button type="button" class="col-chip" data-c="${i}">${C[i][0]}<small>${C[i][2]}</small></button>`;
}).join("")}</div>`).join("");

function showGate(focus) {
  const g = $("col-gate");
  g.classList.remove("hidden");
  if (focus) { g.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => $("col-email").focus({ preventScroll: true }), 400); }
}

function draw() {
  document.querySelectorAll(".col-chip").forEach((b) => {
    const i = +b.dataset.c;
    b.setAttribute("aria-pressed", i === city);
    b.classList.toggle("locked", !open(i));
    b.setAttribute("aria-label", C[i][0] + (open(i) ? "" : ", locked: unlock free with your email"));
  });
  document.querySelectorAll("#col-seg button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.l === lvl));
  $("col-kids").textContent = kids;
  $("col-gate").classList.toggle("hidden", unlocked);
  const t = tot(city, lvl, kids), c = C[city];
  $("col-where").textContent = `${c[0]}, ${c[1]} · ${LV[lvl]} life${kids ? ` · ${kids} in school` : ""}`;
  $("col-total").innerHTML = `${usd(t)}<small> / month</small>`;
  $("col-year").textContent = usd(t * 12);
  $("col-range").textContent = `${usd(tot(city, 0, kids))} to ${usd(tot(city, 2, kids))}`;
  $("col-blurb").textContent = BLURB[city];
  const rows = D[c[0]].map((r, i) => [CAT[i], i === 7 ? r[lvl] * kids : r[lvl]]).filter((r, i) => i < 7 || kids);
  const mx = Math.max(...rows.map((r) => r[1]), 1);
  $("col-bars").innerHTML = rows.map((r, i) => `<div class="col-bar"><span>${r[0]}</span><i class="${i === 0 ? "rent" : ""}" style="width:${Math.max(2, r[1] / mx * 100)}%"></i><span>${usd(r[1])}</span></div>`).join("");
  const cap = city - (city % 2), calm = cap + 1, a = tot(cap, lvl, kids), b = tot(calm, lvl, kids);
  $("col-pairtxt").textContent = `Same country, a slower pace. Here is ${C[cap][0]} against ${C[calm][0]} for the same lifestyle.`;
  $("col-vs").innerHTML = [cap, calm].map((i) => `<div class="col-card ${i === city ? "on" : ""}"><h3>${C[i][0]}</h3><div class="n">${usd(tot(i, lvl, kids))}</div><span class="col-fine">a month, ${C[i][2]}</span></div>`).join("");
  $("col-save").innerHTML = `${C[calm][0]} saves about <b>${usd(a - b)} a month</b>, or <b>${usd((a - b) * 12)} a year</b>: ${Math.round((a - b) / a * 100)}% less than ${C[cap][0]}. For retirement, the calm city is not the compromise. It is the strategy.`;
  const all = C.map((x, i) => [i, tot(i, 1, 0)]).sort((p, q) => q[1] - p[1]), m2 = all[0][1];
  $("col-rank").innerHTML = all.map(([i, v]) => `<button type="button" class="col-rk ${C[i][3] ? "" : "calm"} ${i === city ? "sel" : ""} ${open(i) ? "" : "locked"}" data-c="${i}"><span>${C[i][0]}</span><i style="width:${v / m2 * 100}%"></i><span>${open(i) ? usd(v) : "Locked"}</span></button>`).join("");
  const rent = D[c[0]][0][lvl], m = UP[city][0];
  $("col-chqlab").textContent = `Upfront rent in ${c[0]}, ${LV[lvl]} lifestyle`;
  $("col-chq").textContent = usd(rent * m);
  $("col-chqtxt").textContent = `About ${m} months of rent before you get the keys. ${UP[city][1]} The monthly number is kind. The first cheque is the one to plan for.`;
  $("col-rulesh").textContent = `Getting in and staying: ${c[1]}`;
  $("col-rules").innerHTML = R[c[1]].map((r, i) => `<details ${i === 0 ? "open" : ""}><summary>${r[0]}</summary><p>${r[1]}</p></details>`).join("");
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-c],[data-l]");
  if (!b) return;
  if (b.dataset.c !== undefined) {
    const i = +b.dataset.c;
    if (!open(i)) { showGate(true); return; }
    city = i;
    if (b.classList.contains("col-rk")) document.querySelector(".col-tool").scrollIntoView({ behavior: "smooth" });
  } else lvl = +b.dataset.l;
  draw();
});
$("col-minus").onclick = () => { kids = Math.max(0, kids - 1); draw(); };
$("col-plus").onclick = () => { kids = Math.min(5, kids + 1); draw(); };

async function saveLead(name, email) {
  const cfg = window.MBA_FIREBASE;
  if (!cfg || !cfg.apiKey) { console.warn("Firebase is not configured yet: email not saved."); return; }
  const V = "10.12.2";
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const { getFirestore, collection, addDoc, serverTimestamp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const db = getFirestore(initializeApp(cfg));
  await addDoc(collection(db, "leads"), {
    name: name.slice(0, 80), email: email.slice(0, 200), source: "cost-of-living-calculator",
    consent: true, page: location.pathname.slice(0, 200), createdAt: serverTimestamp()
  });
}

$("col-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("col-name").value.trim(), email = $("col-email").value.trim(), msg = $("col-msg");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = "Please enter a valid email address."; $("col-email").focus(); return; }
  if (!$("col-consent").checked) { msg.textContent = "Please tick the box so we can email you."; return; }
  const btn = $("col-submit");
  btn.disabled = true; msg.textContent = "Unlocking...";
  try {
    await saveLead(name, email);
  } catch (err) {
    console.error(err);
    msg.textContent = "Something went wrong saving your email. Please try again.";
    btn.disabled = false;
    return;
  }
  unlocked = true;
  try { localStorage.setItem(KEY, "1"); } catch (e2) {}
  if (window.fbq) window.fbq("track", "Lead", { content_name: "Cost of Living calculator" });
  draw();
  document.querySelector(".col-tool").scrollIntoView({ behavior: "smooth" });
});

draw();
