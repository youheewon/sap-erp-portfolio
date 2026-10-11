const routes={
  about:{title:"About Me",file:"pages/about.html"},
  certifications:{title:"Certifications",file:"pages/certifications.html"},
  projects:{title:"Projects",file:"pages/projects.html"},
  "projects/nongshim-e2e":{title:"농심 E2E",file:"pages/projects/nongshim-e2e.html"},
  "projects/transys-e2e":{title:"현대트랜시스 E2E",file:"pages/projects/transys-e2e.html"},
  "projects/rap-sd-o2c":{title:"RAP SD O2C",file:"pages/projects/rap-sd-o2c.html"},
  "projects/abap-rental":{title:"ABAP Rental",file:"pages/projects/abap-rental.html"},
  "projects/kt-safeline":{title:"KT SafeLine",file:"pages/projects/kt-safeline.html"}
};
const content=document.getElementById("content");
const crumb=document.getElementById("current-crumb");
const menu=document.getElementById("navigator");
const toggle=document.getElementById("menu-toggle");
const backdrop=document.getElementById("nav-backdrop");
let requestSerial=0;
function currentRoute(){return decodeURIComponent(location.hash.replace(/^#\/?/,""))||"about";}
function closeMenu(){menu.classList.remove("is-open");backdrop.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");backdrop.hidden=true;}
function setMenu(open){menu.classList.toggle("is-open",open);backdrop.classList.toggle("is-open",open);backdrop.hidden=!open;toggle.setAttribute("aria-expanded",String(open));}
async function render(){
 const key=currentRoute(), route=routes[key], serial=++requestSerial;
 if(!route){location.replace("#/about");return;}
 document.title=route.title+" | SAP ERP Portfolio";
 crumb.textContent=route.title;
 document.querySelectorAll("[data-route]").forEach(a=>{
  const active=a.dataset.route===key;a.classList.toggle("active",active);
  if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
 });
 content.innerHTML='<p class="loading">페이지를 불러오는 중입니다.</p>';
 try{
  const response=await fetch(route.file,{cache:"no-cache"});
  if(!response.ok)throw new Error("HTTP "+response.status);
  const markup=await response.text();if(serial!==requestSerial)return;
  content.innerHTML=markup;
  content.querySelectorAll(".capture-image").forEach(img=>{
    const onError=()=>{img.hidden=true;const fallback=img.parentElement.querySelector(".capture-fallback");if(fallback)fallback.hidden=false;};
    img.addEventListener("error",onError);
    if(img.complete&&img.naturalWidth===0)onError();
  });
 }catch(error){
  if(serial!==requestSerial)return;
  content.innerHTML='<h1 class="page-title">페이지를 불러오지 못했습니다.</h1><p>GitHub Pages 배포 여부를 확인해 주세요.</p><a class="action-link" href="#/about">About Me로 이동 →</a>';
 }
 closeMenu();window.scrollTo({top:0,behavior:"instant"});
}
toggle.addEventListener("click",()=>setMenu(!menu.classList.contains("is-open")));
backdrop.addEventListener("click",closeMenu);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
window.addEventListener("hashchange",render);
render();
content.addEventListener("click",event=>{
 const target=event.target.closest("[data-scroll-to]");
 if(!target)return;
 const id=target.dataset.scrollTo;
 const section=document.getElementById(id);
 if(!section)return;
 event.preventDefault();
 section.scrollIntoView({behavior:"smooth",block:"start"});
 content.querySelectorAll(".chapter-link").forEach(button=>button.classList.toggle("is-current",button.dataset.scrollTo===id));
});

/* Copy Toss MiniApp link directly from the KT project detail page. */
content.addEventListener("click", async event=>{
 const button=event.target.closest("button[data-copy-url]");
 if(!button)return;
 const url=button.dataset.copyUrl;
 const feedback=button.closest(".kt-result-panel")?.querySelector(".kt-copy-feedback");
 const originalLabel="링크 복사";
 button.disabled=true;
 try{
  if(navigator.clipboard?.writeText){
   await navigator.clipboard.writeText(url);
  }else{
   const input=document.createElement("textarea");
   input.value=url;
   input.setAttribute("readonly","");
   input.style.position="fixed";
   input.style.left="-9999px";
   document.body.appendChild(input);
   input.select();
   let copied=false;
   try{copied=document.execCommand("copy");}finally{input.remove();}
   if(!copied)throw new Error("Clipboard copy unavailable");
  }
  button.textContent="복사 완료 ✓";
  if(feedback)feedback.textContent="링크를 복사했어요. 모바일에서 붙여넣어 확인해주세요.";
 }catch(error){
  button.textContent=originalLabel;
  if(feedback)feedback.textContent="복사하지 못했습니다. 보러가기 링크를 직접 복사해주세요.";
 }finally{button.disabled=false;}
});
