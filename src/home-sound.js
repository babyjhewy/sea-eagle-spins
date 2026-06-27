(()=>{
let ctx,gain,armed=false,loop=null,step=0;const notes=[196,246.94,293.66,329.63,392,493.88,587.33];
function saveSoundOn(){try{let s=JSON.parse(localStorage.getItem('seaEagleSpinsV11')||'{}');s.sound=true;localStorage.setItem('seaEagleSpinsV11',JSON.stringify(s))}catch(e){}}
function make(){ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(!gain){gain=ctx.createGain();gain.gain.value=.55;gain.connect(ctx.destination)}return ctx}
function tone(f,d=.11,type='triangle',v=.22,delay=0){try{make();ctx.resume&&ctx.resume();let t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(gain);o.start(t);o.stop(t+d+.03)}catch(e){}}
function fanfare(){saveSoundOn();make();ctx.resume&&ctx.resume();[392,523.25,659.25,783.99,1046.5].forEach((n,i)=>tone(n,.09,'triangle',.24,i*.07));badge('SOUND ON');armed=true;startLoop();hidePill()}
function startLoop(){if(loop)return;loop=setInterval(()=>{if(!armed||document.hidden)return;let n=notes[step%notes.length];tone(n/2,.08,'triangle',.035);if(step%3===0)tone(notes[(step+2)%notes.length],.055,'sine',.025,.03);step++},520)}
function pill(){let p=document.querySelector('.soundUnlock');if(!p){p=document.createElement('button');p.type='button';p.className='soundUnlock show';p.textContent='TAP FOR SOUND';document.querySelector('#app')?.appendChild(p);p.addEventListener('pointerup',e=>{e.preventDefault();fanfare()},{passive:false});p.addEventListener('click',e=>{e.preventDefault();fanfare()})}return p}
function hidePill(){let p=document.querySelector('.soundUnlock');if(p)p.classList.remove('show')}
function badge(m){let b=document.querySelector('.audioBadge');if(!b){b=document.createElement('div');b.className='audioBadge';document.querySelector('#app')?.appendChild(b)}b.textContent=m;b.classList.add('show');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('show'),1600)}
['pointerdown','touchend','click'].forEach(ev=>document.addEventListener(ev,()=>{if(!armed){saveSoundOn();make();ctx.resume&&ctx.resume();armed=true;startLoop()}},{once:true,passive:true}));
document.addEventListener('click',e=>{let a=e.target.closest('[data-action]')?.dataset.action||'';if(a==='spin'){tone(160,.07,'sawtooth',.28);tone(230,.06,'square',.18,.06)}if(a==='testSound'||a==='sound'){setTimeout(fanfare,60)}},true);
setTimeout(()=>{if(!armed)pill()},650);
window.SeaEagleHomeSound={fanfare};
})();