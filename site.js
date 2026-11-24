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
  {id:"reserves",title:"Federal Reserves",kind:"Starting label",
   claim:"The source graphic places “Federal Reserves” among the starting labels and links it to Public Nexus (Liability).",
   evidence:"The Federal Reserve System is the U.S. central bank. This page supplies no specific asset, transaction, or legal rule that explains the depicted connection."},
  {id:"courts",title:"State Courts",kind:"Starting label",
   claim:"The source graphic places “State Courts” among the starting labels and links it to Public Nexus (Liability).",
   evidence:"State courts are established by each state's constitution and laws. This page does not identify a case, jurisdiction, judgment, or legal rule establishing the depicted link."},
  {id:"nexus",title:"Public Nexus (Liability)",kind:"Claimed connection",
   claim:"The diagram treats “Public Nexus (Liability)” as the connection between the starting labels and the rest of its proposed flow.",
   evidence:"This page does not define “public nexus” or cite authority showing that this label creates a legal liability."},
  {id:"protocol",title:"National Reform Protocol",kind:"Proposed method",
   claim:"The diagram places the National Reform Protocol after the claimed liability nexus, presenting it as a way to keep the government from reaching or controlling assets.",
   evidence:"This is a stated aim, not a proven result. The page provides no statute, court ruling, or filing establishing that effect; legal effect depends on applicable law and the facts."},
  {id:"equity",title:"Private Equity",kind:"Asset step",
   claim:"The diagram depicts private equity as the asset-holding stage after the protocol.",
   evidence:"This page does not identify the assets, legal owner, trustee, beneficiaries, or trust instrument needed to show an actual transfer. Title depends on documents and applicable law."},
  {id:"assets",title:"Protected Assets",kind:"Intended outcome",
   claim:"The final label presents “Protected Assets” as the intended outcome of the illustrated path.",
   evidence:"This is the stated goal, not a guaranteed result. The diagram does not establish that a trust or private-capacity label places assets beyond courts or creditors."}
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
    $("[data-evidence]").textContent=s.evidence;
    $("[data-pos]").textContent=`Stage ${current+1} of ${STAGES.length}`;
  }
  list.addEventListener("click",e=>{const b=e.target.closest(".flow-step");if(b)show(+b.dataset.i);});
  $("[data-prev]").addEventListener("click",()=>show(current-1));
  $("[data-next]").addEventListener("click",()=>show(current+1));
  show(0);
}

function init(){initNav();initChart();initStanding();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
