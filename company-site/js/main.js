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
    faqTag:"Maswali ya Mara kwa Mara", faqTitle:"Ungependa kujua nini?"¶»§q«^