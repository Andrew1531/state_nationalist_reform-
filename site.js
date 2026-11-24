// State Nationalist Reform — site script

// Mobile navigation
function initNav(){
  const toggle=document.querySelector(".nav-toggle");
  const nav=document.getElementById("main-nav");
  if(!toggle||!nav)return;
  toggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded",String(open));
    toggle.textContent=open?"Close":"Menu";
  });
}

// Funding chart (illustration)
function initChart(){
  const el=document.getElementById("fundingChart");
  if(!el||!window.Chart)return;
  new window.Chart(el.getContext("2d"),{
    type:"bar",
    data:{
      labels:["Liquidity","Real Estate","Equities","Privacy"],
      datasets:[
        {label:"Public status (illustrative)",data:[65,80,55,10],backgroundColor:"#0b2148",borderRadius:3},
        {label:"Private trust — stated goal (illustrative)",data:[95,100,90,100],backgroundColor:"#c8102e",borderRadius:3}
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:"y",
      plugins:{legend:{position:"bottom",labels:{font:{family:"Inter",weight:"bold",size:11},color:"#1c2433"}}},
      scales:{x:{beginAtZero:true,max:100,grid:{color:"#e6e9ef"}},y:{grid:{display:false},ticks:{font:{family:"Inter",weight:"bold"}}}}
    }
  });
}

// Standing: stepper + inspector
const STAGES=[
 {
  "id": "reserves",
  "title": "Federal Reserves",
  "kind": "Starting label",
  "claim": "The diagram lists “Federal Reserves” as a starting point and links it to personal liability through a “public nexus.”",
  "law": "The Federal Reserve System is the central bank of the United States. It conducts monetary policy, supervises and regulates banks, and provides payment services. It does not hold claims against individuals' property, and no statute or court decision links it to a person's liability or to how a private trust is treated.",
  "src": [
   "Federal Reserve: What is the purpose of the Federal Reserve System?",
   "https://www.federalreserve.gov/faqs/about_12594.htm"
  ]
 },
 {
  "id": "courts",
  "title": "State Courts",
  "kind": "Starting label",
  "claim": "The diagram lists “State Courts” as a starting point connected to liability.",
  "law": "Most state trial courts are courts of general jurisdiction: they hear contract, debt, family, probate and trust disputes. Trusts are created and governed under state law, and state courts enforce trust terms, creditor rights and trustee duties. Moving property into a trust does not take it outside a state court's reach.",
  "src": [
   "U.S. Courts: Comparing Federal & State Courts",
   "https://www.uscourts.gov/about-federal-courts/court-role-and-structure/comparing-federal-state-courts"
  ]
 },
 {
  "id": "nexus",
  "title": "Public Nexus (Liability)",
  "kind": "Claimed connection",
  "claim": "The diagram says a “public nexus” ties a person to liability, implying that a change of status can sever it.",
  "law": "“Public nexus” is not a recognized legal doctrine. Legal liability comes from specific sources — contracts, torts, statutes, taxes and court judgments — not from a person's status. Federal courts consistently reject the argument that a declared status puts a person beyond their jurisdiction: “Regardless of an individual's claimed status of descent, be it as a ‘sovereign citizen,’ a ‘secured-party creditor,’ or a ‘flesh-and-blood human being,’ that person is not beyond the jurisdiction of the courts.” United States v. Benabe, 654 F.3d 753, 767 (7th Cir. 2011).",
  "src": [
   "United States v. Benabe (7th Cir. 2011), as cited by the Third Circuit",
   "https://www2.ca3.uscourts.gov/opinarch/163906np.pdf"
  ]
 },
 {
  "id": "protocol",
  "title": "National Reform Protocol",
  "kind": "Proposed method",
  "claim": "The diagram presents the National Reform Protocol as the step that keeps the government from reaching or controlling a person's assets.",
  "law": "No statute, regulation or court decision recognizes a “National Reform Protocol.” A trust is a legitimate legal tool, but its tax and creditor treatment is set by law, not by the trust's label or wording. The IRS applies substance over form, and states that transferring assets to a trust gives the person who transfers them no additional tax benefit. It also notes that the Tax Court and other federal courts have been virtually unanimous in ruling for the IRS where trusts were created to avoid income taxes.",
  "src": [
   "IRS: Abusive trust tax evasion schemes — talking points",
   "https://www.irs.gov/businesses/small-businesses-self-employed/abusive-trust-tax-evasion-schemes-talking-points"
  ]
 },
 {
  "id": "equity",
  "title": "Private Equity",
  "kind": "Asset step",
  "claim": "The diagram shows assets moving into “private equity” held by the trust.",
  "law": "In ordinary financial usage, “private equity” means investment in companies that are not publicly traded; it is not a legal status for personal property. Who owns trust assets depends on the trust documents and on actually retitling each asset. Property in a revocable trust remains subject to the settlor's creditors during the settlor's lifetime, and a transfer made with intent to hinder, delay or defraud a creditor can be undone under state voidable-transfer law. A U.S. person who transfers property to a foreign trust with a U.S. beneficiary is generally treated as its owner for income tax (26 U.S.C. § 679) and must file IRS Forms 3520 and 3520-A.",
  "src": [
   "IRS: Foreign trust reporting requirements and tax consequences",
   "https://www.irs.gov/node/6112"
  ]
 },
 {
  "id": "assets",
  "title": "Protected Assets",
  "kind": "Intended outcome",
  "claim": "The diagram ends with “Protected Assets” — complete insulation from government and creditors.",
  "law": "Trusts can provide real but limited benefits. A properly funded revocable living trust can avoid probate, but its assets are still included in the taxable estate (26 U.S.C. § 2038) and remain reachable by the settlor's creditors. Some irrevocable trusts with spendthrift terms, and domestic asset protection trusts in the states that allow them, can limit creditor access — subject to strict requirements and voidable-transfer law. No trust removes a person's obligation to pay taxes owed, and no trust structure guarantees “complete” protection.",
  "src": [
   "Uniform Trust Code § 505 as enacted (Maine)",
   "https://legislature.maine.gov/statutes/18-B/title18-Bsec505.html"
  ]
 }
];

function initStanding(){
  const list=document.getElementById("flowList");
  const panel=document.getElementById("inspector");
  if(!list||!panel)return;
  list.innerHTML=STAGES.map((s,i)=>`<li><button type="button" class="flow-step" data-i="${i}" aria-pressed="false" aria-controls="inspector">
    <span class="flow-num">${i+1}</span><span><span class="flow-kind">${s.kind}</span><span class="flow-title">${s.title}</span></span><span class="flow-arrow" aria-hidden="true">›</span></button></li>`).join("");
  const $=sel=>panel.querySelector(sel);
  const buttons=[...list.querySelectorAll(".flow-step")];
  let current=0;
  function show(i){
    current=(i+STAGES.length)%STAGES.length;
    const s=STAGES[current];
    buttons.forEach((b,j)=>b.setAttribute("aria-pressed",String(j===current)));
    $("[data-kind]").textContent=s.kind;
    $("[data-title]").textContent=s.title;
    $("[data-claim]").textContent=s.claim;
    $("[data-evidence]").textContent=s.law;
    const a=$("[data-src]");a.textContent=s.src[0];a.href=s.src[1];
    $("[data-pos]").textContent=`Stage ${current+1} of ${STAGES.length}`;
  }
  list.addEventListener("click",e=>{const b=e.target.closest(".flow-step");if(b)show(+b.dataset.i);});
  $("[data-prev]").addEventListener("click",()=>show(current-1));
  $("[data-next]").addEventListener("click",()=>show(current+1));
  show(0);
}

function init(){initNav();initChart();initStanding();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
