(()=>{
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
let lastResult='', pendingTimer=null, winOpen=false, modalOpen=false;
function bodyState(){modalOpen=!!q('#modal')?.classList.contains('show');winOpen=!!q('#winPopup')?.classList.contains('show');document.body.classList.toggle('modalActive',modalOpen);document.body.classList.toggle('winActive',winOpen);q('#game')?.classList.toggle('modalActive',modalOpen);q('#game')?.classList.toggle('winActive',winOpen)}
function tidyText(t){return String(t||'').replace(/\s+/g,' ').replace(/WINNING SYMBOLS ARE GLOWING/,'').trim()}
function tray(title,msg,ms=3000){if(modalOpen||winOpen)return;let r=q('.resultTray');if(!r){r=document.createElement('div');r.className='resultTray';q('#app')?.appendChild(r)}r.innerHTML='<div><b>'+title+'</b><span>'+msg+'</span></div>';r.classList.remove('blocked');r.classList.add('show');clearTimeout(r._t);r._t=setTimeout(()=>r.classList.remove('show'),ms)}
function hideTray(){q('.resultTray')?.classList.add('blocked');q('.resultTray')?.classList.remove('show')}
function hideStack(){q('#focusWinPanel')?.classList.remove('show');hideTray();if(modalOpen){q('#winPopup')?.classList.remove('show');qa('.cell').forEach(c=>c.classList.remove('dimmed','payWin'));q('.payline')?.classList.remove('flash')}}
function captureFocus(){let fp=q('#focusWinPanel');if(!fp)return;let text=tidyText(fp.textContent);if(text&&text!==lastResult)lastResult=text;fp.classList.remove('show');fp.style.display='none'}
function afterWin(){clearTimeout(pendingTimer);pendingTimer=setTimeout(()=>{bodyState();if(!modalOpen&&!winOpen&&lastResult){let msg=lastResult.replace(/·\s*\+([0-9,]+)/,'· paid +$1');tray('WHAT HAPPENED',msg+' · glowing symbols paid',3200)}},450)}
function watch(){bodyState();captureFocus();if(modalOpen){hideStack();return}if(winOpen){hideTray();q('#commentary')?.classList.remove('show');afterWin();return}afterWin()}
const mo=new MutationObserver(watch);mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
document.addEventListener('click',e=>{let a=e.target.closest('[data-action]')?.dataset.action||'';if(a&&a.includes('challenge'))setTimeout(()=>{bodyState();hideStack()},40);if(a==='spin'||e.target.closest('.spin')){lastResult='';hideTray();q('#commentary')?.classList.remove('show')}},true);
setInterval(watch,500);watch();
})();