// Training waitlist: saves name + email to Firestore "leads" with source "earn-training-waitlist".
const $ = (id) => document.getElementById(id);
const form = $("wl-form");
const KEY = "mba-wl-joined";
function done() {
  form.innerHTML = '<p class="wl-done"><strong>You\'re on the list!</strong> I\'ll email you the training dates first. Talk soon, Ada</p>';
}
try { if (localStorage.getItem(KEY) === "1") done(); } catch (e) {}
async function save(name, email) {
  const cfg = window.MBA_FIREBASE;
  if (!cfg || !cfg.apiKey) throw new Error("Firebase not configured");
  const V = "10.12.2";
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const { getFirestore, collection, addDoc, serverTimestamp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const db = getFirestore(initializeApp(cfg, "waitlist"));
  await addDoc(collection(db, "leads"), {
    name: name.slice(0, 80), email: email.slice(0, 200), source: "earn-training-waitlist",
    consent: true, page: location.pathname.slice(0, 200), createdAt: serverTimestamp()
  });
}
form && form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("wl-name").value.trim(), email = $("wl-email").value.trim(), msg = $("wl-msg");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = "Please enter a valid email address."; $("wl-email").focus(); return; }
  if (!$("wl-consent").checked) { msg.textContent = "Please tick the box so I can email you the dates."; return; }
  const btn = $("wl-submit"); btn.disabled = true; msg.textContent = "Adding you to the list...";
  try { await save(name, email); }
  catch (err) { console.error(err); msg.textContent = "Something went wrong. Please try again."; btn.disabled = false; return; }
  try { localStorage.setItem(KEY, "1"); } catch (e2) {}
  if (window.fbq) window.fbq("track", "Lead", { content_name: "Earn in Dollars training waitlist" });
  done();
});
