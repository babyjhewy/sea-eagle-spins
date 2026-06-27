(()=>{
let last=-1, sparkTimer=null, startTimer=null;
const q=s=>document.querySelector(s);
function count(){let txt=q('#free')?.textContent||'0 / 0';let n=Number(txt.split('/')[0].replace(/[^0-9]/g,''));return Number.isFinite(n)?n:0}
function total(){let txt=q('#free')?.textContent||'0 / 0';let n=Number((txt.split('/')[1]||'0').replace(/[^0-9]/g,''));return Number.isFinite(n)?n:0}
function ribbon(){let r=q('.freeSpinRibbon');if(!r){r=document.createElement('div');r.className='freeSpinRibbon';document.querySelector('#app')?.appendChild(r)}return r}
function panel(){let p=q('.freeSpinStart');if(!p){p=document.createElement('div');p.className='freeSpinStart';document.querySelector('#app')?.appendChild(p)}return p}
function setMode(){let n=count(), t=total();document.body.classList.toggle('freeSpinsActive',n>0);q('#game')?.classList.toggle('freeSpinsActive',n>0);let r=ribbon();if(n>0){r.textContent='⚡ FREE SPINS ACTIVE · '+n+' LEFT';r.classList.add('show')}else{r.classList.remove('show')}if(n>0&&last<=0){let p=panel();p.innerHTML='<b>'+n+' FREE SPINS!</b><span>Bonus mode active. The counter glows until free spins finish.</span>';p.classList.add('show');clearTimeout(startTimer);startTimer=setTimeout(()=>p.classList.remove('show'),1700);try{window.SeaEagleAudio?.sfx?.('bonus')}catch(e){}}if(n>0&&!sparkTimer){spark();sparkTimer=setInterval(spark,1500)}if(n<=0&&sparkTimer){clearInterval(sparkTimer);sparkTimer=null}last=n}
function spark(){let app=q('#app');if(!app)return;for(let i=0;i<4;i++){let s=document.createElement('i');s.className='freeSpark';s.style.left=(12+Math.random()*76)+'%';s.style.top=(45+Math.random()*14)+'%';s.style.animationDelay=(Math.random()*.2)+'s';app.appendChild(s);setTimeout(()=>s.remove(),1300)}}
document.addEventListener('click',e=>{let a=e.target.closest('[data-action]')?.dataset.action||'';if(a==='spin'||e.target.closest('.spin')||a==='auto'){setTimeout(setMode,100);setTimeout(setMode,900);setTimeout(setMode,1800)}},true);
setInterval(setMode,850);setTimeout(setMode,200);
})();