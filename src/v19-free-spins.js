(()=>{
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
let lastFree=-1, sparkTimer=null, startTimer=null;
function freeCount(){let txt=q('#free')?.textContent||'0 / 0';let n=Number(txt.split('/')[0].replace(/[^0-9]/g,''));return isNaN(n)?0:n}
function totalFree(){let txt=q('#free')?.textContent||'0 / 0';let n=Number((txt.split('/')[1]||'0').replace(/[^0-9]/g,''));return isNaN(n)?0:n}
function ribbon(){let r=q('.freeSpinRibbon');if(!r){r=document.createElement('div');r.className='freeSpinRibbon';q('#app')?.appendChild(r)}return r}
function startPanel(){let p=q('.freeSpinStart');if(!p){p=document.createElement('div');p.className='freeSpinStart';q('#app')?.appendChild(p)}return p}
function bonusSound(){try{window.SeaEagleAudio?.sfx?.('bonus')}catch(e){}}
function updateRibbon(n,t){let r=ribbon();if(n>0){r.innerHTML='⚡ FREE SPINS ACTIVE <b>'+n+'</b> LEFT · MULTIPLIER LOCKED';r.classList.add('show')}else r.classList.remove('show')}
function spark(){let app=q('#app');if(!app)return;for(let i=0;i<5;i++){let s=document.createElement('i');s.className='freeSpark';s.style.left=(10+Math.random()*80)+'%';s.style.top=(44+Math.random()*16)+'%';s.style.animationDelay=(Math.random()*.25)+'s';app.appendChild(s);setTimeout(()=>s.remove(),1500)}}
function bigStart(n){let p=startPanel();p.innerHTML='<b>'+n+' FREE SPINS!</b><span>Bonus mode is active — reels glow until the free spins run out.</span>';p.classList.add('show');bonusSound();clearTimeout(startTimer);startTimer=setTimeout(()=>p.classList.remove('show'),1800)}
function setMode(){let n=freeCount(), t=totalFree();document.body.classList.toggle('freeSpinsActive',n>0);q('#game')?.classList.toggle('freeSpinsActive',n>0);updateRibbon(n,t);if(n>0&&lastFree<=0)bigStart(n);if(n>0&&!sparkTimer){spark();sparkTimer=setInterval(spark,1400)}if(n<=0&&sparkTimer){clearInterval(sparkTimer);sparkTimer=null}lastFree=n}
function hideBuriedBonus(){let toast=q('#toast');let win=q('#winPopup');let modal=q('#modal');if(win?.classList.contains('show')||modal?.classList.contains('show')){if(toast&&/BONUS|FREE SPINS|LEVEL UP/i.test(toast.textContent||''))toast.classList.remove('show')}}
function forceFreeSpinCopy(){let fp=q('#focusWinPanel');if(fp&&/BONUS/i.test(fp.textContent||'')){let text=fp.textContent.replace(/\s+/g,' ');fp.classList.remove('show');fp.style.display='none';let n=freeCount();if(n>0)bigStart(n);let tray=q('.resultTray');if(tray){tray.innerHTML='<div><b>BONUS TRIGGERED</b><span>Free spins are active. Watch the glowing free-spin counter.</span></div>';setTimeout(()=>{if(!q('#winPopup')?.classList.contains('show')&&!q('#modal')?.classList.contains('show'))tray.classList.add('show')},1550)}}}
const mo=new MutationObserver(()=>{setMode();hideBuriedBonus();forceFreeSpinCopy()});
mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,characterData:true,attributeFilter:['class']});
document.addEventListener('click',e=>{let a=e.target.closest('[data-action]')?.dataset.action||'';if(a==='spin'||e.target.closest('.spin')){setTimeout(setMode,80);setTimeout(setMode,900);setTimeout(setMode,1800)}},true);
setInterval(()=>{setMode();hideBuriedBonus()},500);setMode();
})();