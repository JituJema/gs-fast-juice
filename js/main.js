/* GS Fast Juice — menu, bilingual UI, cart and WhatsApp checkout. */
"use strict";

const WHATSAPP_NUMBER = "255626035075";
const TZS = (n) => "TSh " + Number(n).toLocaleString("en-US");
let PRODUCTS = [];
let CART = [];
let activeFilter = "all";
let LANG = localStorage.getItem("gsfj-language") === "en" ? "en" : "sw";

const COPY = {
  sw: {
    navMenu:"Menyu", navAbout:"Kuhusu", navLocation:"Mahali Tulipo", navContact:"Mawasiliano",
    cart:"Kikapu", heroEyebrow:"Kigamboni · Kwa Stivin", heroTitle:"Juisi freshi,<br><span class=\"accent\">kamuliwa</span> kwa haraka.",
    heroLead:"Hakuna sukari ya ziada, hakuna vihifadhi — matunda halisi tu. Agiza kwa urahisi kupitia WhatsApp; tunakutengenezea papo hapo.",
    browse:"Ona Menyu →", whatsapp:"Tuma WhatsApp", menuTag:"Menyu Yetu", menuTitle:"Chagua juisi yako ya leo",
    menuLead:"Juisi hutengenezwa baada ya oda yako ili ibaki fresh mpaka mikononi mwako.",
    all:"Zote", single:"Juisi Moja", blend:"Mchanganyiko", healthy:"Healthy", creamy:"Creamy",
    aboutTag:"Kuhusu Sisi", aboutTitle:"Kutoka sokoni hadi glasini yako, fresh kila siku.",
    add:"+ Ongeza", soldOut:"Haipatikani", perGlass:"kwa glasi (500ml)", empty:"Kikapu chako kipo tupu.", choose:"Chagua juisi unayoipenda!",
    cartTitle:"Kikapu Chako", total:"Jumla", checkout:"Maliza Oda kwa WhatsApp", name:"Jina lako", location:"Mahali pa kuletewa (mtaa)", note:"Maelezo ya ziada (hiari)",
    faqTag:"Maswali ya Mara kwa Mara", faqTitle:"Ungependa kujua nini?", faq1:"Juisi inatengenezwa lini?", faq1a:"Tunatengeneza juisi baada ya kupokea oda yako ili iwe fresh.", faq2:"Naweza kuagiza kupitia WhatsApp?", faq2a:"Ndiyo. Ongeza juisi kwenye kikapu kisha tuma oda kupitia WhatsApp.", faq3:"GS Fast Juice ipo wapi?", faq3a:"Tupo Kwa Stivin, karibu na Dady's Pub, Kigamboni, Dar es Salaam.",
    noProducts:"Hakuna juisi kwenye kundi hili kwa sasa.", loading:"Inapakia menyu...", remove:"Ondoa", decrease:"Punguza", increase:"Ongeza",
    aboutNav:"Kuhusu Sisi", locationNav:"Mahali Tulipo"
  },
  en: {
    navMenu:"Menu", navAbout:"About", navLocation:"Find us", navContact:"Contact",
    cart:"Cart", heroEyebrow:"Kigamboni · Kwa Stivin", heroTitle:"Fresh juice,<br><span class=\"accent\">made fresh</span> in a flash.",
    heroLead:"No added sugar, no preservatives — just real fruit. Order easily on WhatsApp and we’ll make it fresh for you.",
    browse:"Explore menu →", whatsapp:"Chat on WhatsApp", menuTag:"Our menu", menuTitle:"Pick your juice for today",
    menuLead:"Every juice is made after you order, so it arrives fresh in your hands.",
    all:"All", single:"Single fruit", blend:"Blends", healthy:"Healthy", creamy:"Creamy",
    aboutTag:"About us", aboutTitle:"From the market to your glass, fresh every day.",
    add:"+ Add", soldOut:"Sold out", perGlass:"per glass (500ml)", empty:"Your cart is empty.", choose:"Pick a juice you love!",
    cartTitle:"Your cart", total:"Total", checkout:"Order on WhatsApp", name:"Your name", location:"Delivery location (street)", note:"Extra notes (optional)",
    faqTag:"Frequently asked questions", faqTitle:"What would you like to know?", faq1:"When is the juice made?", faq1a:"We prepare your juice after receiving your order to keep it fresh.", faq2:"Can I order through WhatsApp?", faq2a:"Yes. Add juice to your cart and send your order through WhatsApp.", faq3:"Where is GS Fast Juice?", faq3a:"We’re at Kwa Stivin, near Dady's Pub, Kigamboni, Dar es Salaam.",
    noProducts:"No juices in this category right now.", loading:"Loading menu...", remove:"Remove", decrease:"Decrease", increase:"Increase",
    aboutNav:"About us", locationNav:"Find us"
  }
};
const tr = (key) => COPY[LANG][key] || COPY.sw[key] || key;
const safe = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

function applyLanguage() {
  document.documentElement.lang = LANG;
  const toggle = document.getElementById("langToggle");
  if (toggle) { toggle.textContent = LANG === "sw" ? "EN" : "SW"; toggle.setAttribute("aria-label", LANG === "sw" ? "Switch to English" : "Badili kwenda Kiswahili"); }
  const textMap = {
    ".nav-links a[href='#menu']":"navMenu", ".nav-links a[href='#kuhusu']":"navAbout",
    ".nav-links a[href='#mahali']":"navLocation", ".nav-links a[href='#mawasiliano']":"navContact",
    ".cart-btn":"cart", ".hero .eyebrow":"heroEyebrow", ".hero .lede":"heroLead",
    ".hero-ctas .btn-primary":"browse", ".hero-ctas .btn-ghost":"whatsapp",
    "#menu .section-tag":"menuTag", "#menu h2":"menuTitle", "#menu .section-head p":"menuLead",
    "#kuhusu .section-tag":"aboutTag", "#kuhusu h2":"aboutTitle",
    "#cartTitle":"cartTitle", ".cart-total-row span:first-child":"total", "#checkoutBtn":"checkout",
    "#custName":"name", "#custLocation":"location", "#custNote":"note",
    ".faq-wrap .section-tag":"faqTag", ".faq-wrap h2":"faqTitle"
  };
  Object.entries(textMap).forEach(([selector,key]) => {
    const el = document.querySelector(selector); if (!el) return;
    if (["#custName","#custLocation","#custNote"].includes(selector)) el.placeholder = tr(key);
    else if (selector === ".cart-btn") {
      const count = document.getElementById("cartCount");
      el.textContent = "🧺 " + tr(key) + " ";
      if (count) el.append(count);
    } else if (selector === ".hero .eyebrow") el.textContent = tr(key);
    else if (selector === ".hero-ctas .btn-primary" || selector === ".hero-ctas .btn-ghost" || selector === "#checkoutBtn") el.textContent = tr(key);
    else if (selector === "#kuhusu h2" || selector === "#menu h2" || selector === ".faq-wrap h2") el.textContent = tr(key);
    else el.textContent = tr(key);
  });
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) heroTitle.innerHTML = tr("heroTitle");
  const aboutParagraph = document.querySelector("#kuhusu .about-copy > p");
  if (aboutParagraph) aboutParagraph.textContent = LANG === "en"
    ? "GS Fast Juice is based in Kigamboni with one simple goal: serve real, fresh fruit juice. We prepare each order fresh, with fruit flavours to suit your taste."
    : "GS Fast Juice ipo Kigamboni kwa lengo moja: kukuletea juisi halisi na freshi. Tunatengeneza kila oda ikiwa fresh, kwa ladha za matunda unazopenda.";
  const locationHours = document.querySelector(".location-item:nth-child(3) span:last-child");
  if (locationHours) locationHours.textContent = LANG === "en" ? "Please contact us to confirm today’s opening hours." : "Wasiliana nasi kuthibitisha muda wa kufunguliwa leo.";
  document.querySelectorAll(".filter-btn").forEach(btn => {
    const key = btn.dataset.filter === "all" ? "all" : btn.dataset.filter;
    btn.textContent = tr(key);
  });
  const faq = document.querySelectorAll(".faq-wrap details");
  [["faq1","faq1a"],["faq2","faq2a"],["faq3","faq3a"]].forEach(([q,a],i) => {
    if (faq[i]) { faq[i].querySelector("summary").textContent = tr(q); faq[i].querySelector("p").textContent = tr(a); }
  });
  const empty = document.querySelector(".cart-empty");
  if (empty) empty.innerHTML = '<span>🧺</span>' + safe(tr("empty")) + '<br>' + safe(tr("choose"));
  renderMenu();
  renderCart();
}

async function loadProducts() {
  const grid = document.getElementById("menuGrid");
  try {
    const res = await fetch("data/products.json", {cache:"no-store"});
    if (!res.ok) throw new Error("Products request failed");
    const data = await res.json();
    PRODUCTS = Array.isArray(data.products) ? data.products.filter(p => p && p.id && p.name && Number.isFinite(Number(p.price))) : [];
  } catch (error) {
    console.error("Unable to load menu data.", error);
    if (grid) grid.textContent = "Menyu haijapatikana kwa sasa. Tafadhali jaribu tena baadaye.";
    return;
  }
  renderMenu();
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  const list = PRODUCTS.filter(p => activeFilter === "all" || p.category === activeFilter);
  if (!list.length) { grid.textContent = tr("noProducts"); return; }
  grid.innerHTML = list.map(p => {
    const priceLabel = p.priceMax && Number(p.priceMax) !== Number(p.price)
      ? safe((Number(p.price)/1000)+"k–"+(Number(p.priceMax)/1000)+"k")
      : safe(TZS(p.price));
    const image = p.image ? '<img class="juice-photo" src="'+safe(p.image)+'" alt="'+safe(LANG==="en" ? p.name : p.nameSw || p.name)+'" loading="lazy" decoding="async" width="600" height="400" onerror="this.hidden=true">' : "";
    return '<article class="juice-card '+(p.available ? "" : "unavailable")+'">'+
      (!p.available ? '<span class="badge-soldout">'+safe(tr("soldOut"))+'</span>' : "")+
      '<div class="sticker-price"><b>'+priceLabel+'</b><small>TSh</small></div>'+
      '<div class="juice-glass" style="background:linear-gradient(160deg,'+safe(p.color1 || "#ffbd45")+','+safe(p.color2 || "#e23a55")+');">'+image+'<span class="emoji">'+safe(p.emoji || "🥤")+'</span></div>'+
      '<div class="juice-name">'+safe(LANG==="en" ? p.name : p.nameSw || p.name)+'</div>'+
      '<div class="juice-name-sw">'+safe(LANG==="en" ? p.nameSw || p.name : p.name)+'</div>'+
      '<p class="juice-desc">'+safe(p.desc || "")+'</p>'+
      '<div class="card-footer"><div class="price-tag">'+safe(TZS(p.price))+'<br><small>'+safe(tr("perGlass"))+'</small></div>'+
      '<button class="add-btn" '+(p.available ? "" : "disabled")+' data-id="'+safe(p.id)+'">'+safe(tr("add"))+'</button></div></article>';
  }).join("");
  grid.querySelectorAll(".add-btn").forEach(btn => btn.addEventListener("click", () => addToCart(btn.dataset.id)));
}

document.addEventListener("click", e => {
  const fb = e.target.closest(".filter-btn");
  if (fb) {
    document.querySelectorAll(".filter-btn").forEach(b => { b.classList.toggle("active", b === fb); b.setAttribute("aria-pressed", b === fb ? "true" : "false"); });
    activeFilter = fb.dataset.filter || "all";
    renderMenu();
  }
});

function addToCart(id) {
  const p = PRODUCTS.find(item => item.id === id && item.available);
  if (!p) return;
  const existing = CART.find(c => c.id === id);
  if (existing) existing.qty += 1; else CART.push({id,qty:1});
  renderCart(); openCart(); pulseCartBtn();
}
function changeQty(id, delta) {
  const item = CART.find(c => c.id === id); if (!item) return;
  item.qty += delta; if (item.qty <= 0) CART = CART.filter(c => c.id !== id);
  renderCart();
}
function removeFromCart(id) { CART = CART.filter(c => c.id !== id); renderCart(); }
function cartTotal() { return CART.reduce((sum,c) => { const p=PRODUCTS.find(x=>x.id===c.id); return sum+(p ? Number(p.price)*c.qty : 0); },0); }
function cartCount() { return CART.reduce((sum,c)=>sum+c.qty,0); }
function pulseCartBtn() {
  const el=document.getElementById("cartCount"); if (!el) return;
  el.style.transform="scale(1.25)"; setTimeout(()=>{el.style.transform="scale(1)";},180);
}
function renderCart() {
  const countEl=document.getElementById("cartCount"), itemsEl=document.getElementById("cartItems"), footEl=document.getElementById("cartFoot");
  if (countEl) countEl.textContent=cartCount(); if (!itemsEl) return;
  if (!CART.length) {
    itemsEl.innerHTML='<div class="cart-empty"><span>🧺</span>'+safe(tr("empty"))+'<br>'+safe(tr("choose"))+'</div>';
    if (footEl) footEl.style.display="none"; return;
  }
  if (footEl) footEl.style.display="block";
  itemsEl.innerHTML=CART.map(c=>{
    const p=PRODUCTS.find(x=>x.id===c.id); if (!p) return "";
    return '<div class="cart-row"><div class="thumb" style="background:linear-gradient(160deg,'+safe(p.color1 || "#ffbd45")+','+safe(p.color2 || "#e23a55")+')">'+safe(p.emoji || "🥤")+'</div>'+
      '<div class="info"><b>'+safe(LANG==="en" ? p.name : p.nameSw || p.name)+'</b><span>'+safe(TZS(p.price))+' × '+c.qty+'</span>'+
      '<div class="qty-ctrl"><button aria-label="'+safe(tr("decrease"))+'" data-act="dec" data-id="'+safe(p.id)+'">−</button><span>'+c.qty+'</span>'+
      '<button aria-label="'+safe(tr("increase"))+'" data-act="inc" data-id="'+safe(p.id)+'">+</button>'+
      '<button class="remove" data-act="rm" data-id="'+safe(p.id)+'">'+safe(tr("remove"))+'</button></div></div></div>';
  }).join("");
  const totalEl=document.getElementById("cartTotal"); if(totalEl) totalEl.textContent=TZS(cartTotal());
  itemsEl.querySelectorAll("[data-act]").forEach(btn=>btn.addEventListener("click",()=>{
    if(btn.dataset.act==="inc") changeQty(btn.dataset.id,1);
    if(btn.dataset.act==="dec") changeQty(btn.dataset.id,-1);
    if(btn.dataset.act==="rm") removeFromCart(btn.dataset.id);
  }));
}
function openCart() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
  document.getElementById("cartDrawer")?.setAttribute("aria-modal","true");
}
function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.getElementById("cartDrawer")?.removeAttribute("aria-modal");
  document.getElementById("cartBtn")?.focus();
}
function buildWhatsAppMessage() {
  const name=document.getElementById("custName")?.value.trim()||"";
  const location=document.getElementById("custLocation")?.value.trim()||"";
  const note=document.getElementById("custNote")?.value.trim()||"";
  const lines=[LANG==="en" ? "Hello GS Fast Juice! I'd like to order:" : "Habari GS Fast Juice! Nataka kuagiza:",""];
  CART.forEach(c=>{const p=PRODUCTS.find(x=>x.id===c.id);if(p) lines.push("• "+(p.nameSw||p.name)+" ("+p.name+") x"+c.qty+" — "+TZS(Number(p.price)*c.qty));});
  lines.push("",(LANG==="en" ? "Total: " : "Jumla: ")+TZS(cartTotal()));
  if(name) lines.push((LANG==="en" ? "Name: " : "Jina: ")+name);
  if(location) lines.push((LANG==="en" ? "Location: " : "Mahali: ")+location);
  if(note) lines.push((LANG==="en" ? "Notes: " : "Maelezo: ")+note);
  return lines.join("\n");
}
function sendToWhatsApp() {
  if(!CART.length) return;
  const url="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(buildWhatsAppMessage());
  const popup=window.open(url,"_blank","noopener,noreferrer");
  if(!popup) window.location.href=url;
}
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("cartBtn")?.addEventListener("click",openCart);
  document.getElementById("cartClose")?.addEventListener("click",closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click",closeCart);
  document.getElementById("checkoutBtn")?.addEventListener("click",sendToWhatsApp);
  document.getElementById("langToggle")?.addEventListener("click",()=>{
    LANG=LANG==="sw" ? "en" : "sw"; localStorage.setItem("gsfj-language",LANG); applyLanguage();
  });
  document.getElementById("menuToggle")?.addEventListener("click",()=>{
    const nav=document.querySelector(".nav-links"); if (!nav) return;
    const open=nav.classList.toggle("mobile-open");
    document.getElementById("menuToggle")?.setAttribute("aria-expanded",String(open));
  });
  document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav-links")?.classList.remove("mobile-open")));
  applyLanguage(); loadProducts(); renderCart();
});
