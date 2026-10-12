function scrollToContact(){const element=document.getElementById("contact-form-section");if(element)element.scrollIntoView({behavior:"smooth"});}

let fundingChartInstance=null;
function initCharts(){const chartEl=document.getElementById("fundingChart");if(!chartEl||!window.Chart)return;if(fundingChartInstance)fundingChartInstance.destroy();fundingChartInstance=new window.Chart(chartEl.getContext("2d"),{type:"bar",data:{labels:["Liquidity","Real Estate","Equities","Privacy"],datasets:[{label:"Public Status (Exposed)",data:[65,80,55,10],backgroundColor:"#1E293B"},{label:"SNR Trust (Insulated)",data:[95,100,90,100],backgroundColor:"#B91C1C"}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:"y",plugins:{legend:{position:"bottom",labels:{font:{weight:"bold",size:10}}}},scales:{x:{beginAtZero:true,max:100}}}});}

function renderStandingFlow(){
    const target=document.getElementById("standingSankey");
    const detail=document.getElementById("standingNodeDetail");
    if(!target||!detail)return;
    const sources=[
        {id:"reserves",title:"FEDERAL RESERVES",kind:"Starting label",summary:"Named in the original graphic; no specific asset, transaction, or rule is identified.",claim:"The source graphic places “Federal Reserves” among the starting labels and links it to Public Nexus (Liability).",evidence:"This page supplies no specific asset, transaction, or legal rule that explains that connection."},
        {id:"courts",title:"STATE COURTS",kind:"Starting label",summary:"Shown as connected to liability; no case, jurisdiction, or rule is supplied.",claim:"The source graphic places “State Courts” among the starting labels and links it to Public Nexus (Liability).",evidence:"This page does not identify a case, jurisdiction, judgment, or legal rule establishing the depicted link."}
    ];
    const stages=[
        {id:"nexus",title:"PUBLIC NEXUS (LIABILITY)",kind:"Claimed connection",summary:"A bridge between the source labels and liability is asserted, but not defined or sourced here.",linkLabel:"The original graphic asserts a connection",claim:"The diagram treats “Public Nexus (Liability)” as the connection between the starting labels and the rest of its proposed flow.",evidence:"This page does not define “public nexus” or cite authority showing that this label creates a legal liability."},
        {id:"protocol",title:"NATIONAL REFORM PROTOCOL",kind:"Proposed method",summary:"Presented as the step that changes the claimed relationship; its legal effect is not demonstrated here.",linkLabel:"The page presents a proposed response",claim:"The diagram places the National Reform Protocol after the claimed liability nexus, implying that it changes that relationship.",evidence:"This page does not provide a statute, court ruling, filing, or other authority establishing that effect."},
        {id:"equity",title:"PRIVATE EQUITY",kind:"Asset step",summary:"Shown as the asset-holding stage; actual title and control depend on documents and applicable law.",linkLabel:"The graphic depicts an asset path",claim:"The diagram depicts private equity as the next stage after the protocol.",evidence:"This page does not identify the assets, legal owner, trustee, beneficiaries, or trust instrument needed to show an actual transfer."},
        {id:"assets",title:"PROTECTED ASSETS",kind:"Intended outcome",summary:"This is the stated goal in the graphic, not a result it proves or guarantees.",linkLabel:"The stated goal—not a guaranteed result",claim:"The final label presents “Protected Assets” as the intended outcome of the illustrated path.",evidence:"The diagram does not establish that a trust or private-capacity label places assets beyond courts or creditors."}
    ];
    const allNodes=[...sources,...stages];
    const nodeMarkup=node=>`<button type="button" class="flow-node" data-node="${node.id}" aria-pressed="false" aria-label="${node.title}. ${node.summary}"><span class="flow-node-kind">${node.kind}</span><span class="flow-node-title">${node.title}</span><span class="flow-node-summary">${node.summary}</span></button>`;
    const stageMarkup=stages.map(stage=>`<div class="flow-stage"><div class="flow-link" aria-hidden="true"><span>${stage.linkLabel}</span></div>${nodeMarkup(stage)}</div>`).join("");
    target.innerHTML=`<div class="standing-flow">
        <div class="flow-source-group">
            <p class="flow-group-title">Starting labels in the original graphic</p>
            <div class="flow-source-grid">${sources.map(nodeMarkup).join("")}</div>
        </div>
        ${stageMarkup}
    </div>`;
    const resetDetails=()=>{
        detail.classList.remove("has-selection");
        detail.querySelector(".standing-detail-label").textContent="Whole-graphic reading";
        detail.querySelector('[data-detail="claim"]').textContent="The original graphic depicts a path from public institutions through a claimed liability nexus and protocol to private equity and protected assets.";
        detail.querySelector('[data-detail="evidence"]').textContent="This page does not cite authority or provide transaction documents establishing that path as a legal result.";
    };
    target.addEventListener("click",event=>{
        const button=event.target.closest(".flow-node");
        if(!button)return;
        const selected=button.getAttribute("aria-pressed")==="true";
        target.querySelectorAll(".flow-node").forEach(node=>{
            node.setAttribute("aria-pressed","false");
            node.classList.remove("is-selected");
        });
        if(selected){resetDetails();return;}
        const node=allNodes.find(item=>item.id===button.dataset.node);
        if(!node)return;
        button.setAttribute("aria-pressed","true");
        button.classList.add("is-selected");
        detail.classList.add("has-selection");
        detail.querySelector(".standing-detail-label").textContent=node.title;
        detail.querySelector('[data-detail="claim"]').textContent=node.claim;
        detail.querySelector('[data-detail="evidence"]').textContent=node.evidence;
    });
}

window.scrollToContact=scrollToContact;

function initPageVisuals(){if(document.getElementById("fundingChart"))initCharts();if(document.getElementById("standingSankey"))renderStandingFlow();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initPageVisuals,{once:true});else initPageVisuals();
