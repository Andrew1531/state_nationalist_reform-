function scrollToContact(){const element=document.getElementById("contact-form-section");if(element)element.scrollIntoView({behavior:"smooth"});}

let fundingChartInstance=null;
function initCharts(){const chartEl=document.getElementById("fundingChart");if(!chartEl||!window.Chart)return;if(fundingChartInstance)fundingChartInstance.destroy();fundingChartInstance=new window.Chart(chartEl.getContext("2d"),{type:"bar",data:{labels:["Liquidity","Real Estate","Equities","Privacy"],datasets:[{label:"Public Status (Exposed)",data:[65,80,55,10],backgroundColor:"#1E293B"},{label:"SNR Trust (Insulated)",data:[95,100,90,100],backgroundColor:"#B91C1C"}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:"y",plugins:{legend:{position:"bottom",labels:{font:{weight:"bold",size:10}}}},scales:{x:{beginAtZero:true,max:100}}}});}

function renderStandingFlow(){const target=document.getElementById("standingSankey");if(!target||!window.Plotly)return;const data=[{type:"sankey",orientation:"h",node:{pad:20,thickness:30,line:{color:"black",width:0.5},label:["FEDERAL RESERVES","STATE COURTS","PUBLIC NEXUS (LIABILITY)","NATIONAL REFORM PROTOCOL","PRIVATE EQUITY","PROTECTED ASSETS"],color:["#0F172A","#0F172A","#64748B","#B91C1C","#B91C1C","#B91C1C"]},link:{source:[0,1,2,2,3,4],target:[2,2,1,3,4,5],value:[100,100,150,100,100,100],color:["#cbd5e1","#cbd5e1","#fee2e2","#fecaca","#ef4444","#b91c1c"]}}];const layout={font:{size:12,family:"Oswald",color:"#0F172A"},paper_bgcolor:"rgba(0,0,0,0)",plot_bgcolor:"rgba(0,0,0,0)",margin:{l:20,r:20,b:20,t:20}};window.Plotly.newPlot(target,data,layout,{displayModeBar:false,responsive:true});}

window.scrollToContact=scrollToContact;

function initPageVisuals(){if(document.getElementById("fundingChart"))initCharts();if(document.getElementById("standingSankey"))renderStandingFlow();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initPageVisuals,{once:true});else initPageVisuals();
