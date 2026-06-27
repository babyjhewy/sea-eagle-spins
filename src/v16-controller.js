(()=>{
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)], pick=a=>a[Math.floor(Math.random()*a.length)];
const funny=[
['Dad, Coco says the jackpot is lonely.','Come back and press spin before David starts auditing it.'],
['Daily Sea Eagle update','Craig has one job today: complete quests and pretend it was skill.'],
['Shebba report','Coffee is pending. Bonus spins are strongly recommended.'],
['Zach plaster check','The reels need a smooth finish. Lilah and Stella are judging.'],
['Coco alert','Snack commission overdue. Spin immediately.'],
['Brookie weather report','Chance of fake coins, family roasting and Dad yelling at the screen.'],
['David warning','If Dad wins again, he will explain it like a business strategy.']
];
let ctx,gain,loop,beat=0;
function make(){ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(!gain){gain=ctx.createGain();gain.gain.value=.85;gain.connect(ctx.destination)}return ctx}
function tone(f,d=.12,type='triangle',v=.35,delay=0){try{make();ctx.resume&&ctx.resume();let t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(gain);o.start(t);o.stop(t+d+.03)}catch(e){}}
function loud(){[220,330,440,660,880,1320].forEach((f,i)=>tone(f,.12,'triangle',.42,i*.07));motivate('SOUND CHECK','If this is silent, turn off iPhone silent mode and raise volume.');startMusic()}
function tap(){tone(460,.045,'square',.23)}
function startMusic(){if(loop)return;loop=setInterval(()=>{if(document.hidden||!ctx)return;let n=[146,196,246,293,392][beat%5];tone(n,.06,'triangle',.045);if(beat%3===0)tone(n*2,.045,'sine',.03,.03);beat++},620)}
function ensure(){try{make();ctx.resume&&ctx.resume();startMusic()}catch(e){}}
function motivate(title,msg,ms=3600){let m=q('.dadMotivation');if(!m){m=document.createElement('div');m.className='dadMotivation';q('#app')?.appendChild(m)}m.innerHTML='<b>'+title+'</b><span>'+msg+'</span>';m.classList.add('show');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('show'),ms)}
function tray(title,msg,ms=3000){let r=q('.resultTray');if(!r){r=document.createElement('div');r.className='resultTray';q('#app')?.appendChild(r)}r.innerHTML='<div><b>'+title+'</b><span>'+msg+'</span></div>';r.classList.add('show');clearTimeout(r._t);r._t=setTimeout(()=>r.classList.remove('show'),ms)}
function hideWinExplain(){q('#focusWinPanel')?.classList.add('modalHidden');q('#winPopup')?.classList.remove('show');q('.payline')?.classList.remove('flash');qa('.cell').forEach(c=>c.classList.remove('dimmed','payWin'))}
function observeModal(){let mo=new MutationObserver(()=>{let open=q('#modal')?.classList.contains('show');document.body.classList.toggle('modalActive',!!open);if(open)hideWinExplain()});let m=q('#modal');if(m)mo.observe(m,{attributes:true,attributeFilter:['class']})}
function observeWin(){let p=q('#focusWinPanel');if(!p)return;let last='';new MutationObserver(()=>{if(p.classList.contains('show')&&p.textContent.trim()!==last){last=p.textContent.trim();let txt=last.replace(/\s+/g,' ');let a=txt.split('WINNING SYMBOLS ARE GLOWING');if(a.length>1)tray('WHAT HAPPENED',a[0].trim()+' · glowing tiles are the paying line');else tray('WHAT HAPPENED',txt)}}).observe(p,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
function soundButton(){let b=q('.soundMaster');if(!b){b=document.createElement('button');b.type='button';b.className='soundMaster';b.textContent='🔊 SOUND CHECK';q('#app')?.appendChild(b);b.addEventListener('pointerup',e=>{e.preventDefault();loud()},{passive:false});b.addEventListener('click',e=>{e.preventDefault();loud()})}return b}
function injectSettings(){let h=q('#pageContent h1');if(!h||h.textContent.trim()!=='MORE')return;let list=q('#pageContent .list');if(!list)return;if(!list.querySelector('[data-action="notifyDad"]')){let btn=document.createElement('button');btn.className='tile';btn.dataset.action='notifyDad';btn.innerHTML='<div class="symbolTile bonus"><div class="symbolArt">📣</div><div class="symbolName">DAD</div></div><b>DAD MOTIVATIONS</b><span>Funny daily reminders and comeback messages</span>';list.insertBefore(btn,list.firstChild)}if(!list.querySelector('[data-action="masterSound"]')){let btn=document.createElement('button');btn.className='tile';btn.dataset.action='masterSound';btn.innerHTML='<div class="symbolTile wild"><div class="symbolArt">🔊</div><div class="symbolName">LOUD</div></div><b>LOUD SOUND CHECK</b><span>Unlock iPhone audio and play a test fanfare</span>';list.insertBefore(btn,list.firstChild)}}
function askNotify(){let line=pick(funny);motivate(line[0],line[1],4500);if(!('Notification'in window)){tray('IPHONE NOTE','This browser does not allow game notifications here.');return}Notification.requestPermission().then(p=>{if(p==='granted'){new Notification(line[0],{body:line[1],tag:'sea-eagle-dad'});tray('DAD MOTIVATIONS ON','Funny updates will appear when iPhone allows them.')}else tray('NOTIFICATIONS OFF','Allowed only after iPhone permission is granted.')}).catch(()=>tray('NOTIFICATION BLOCKED','Use Home Screen app and allow notifications.'))}
function daily(){let key='seaEagleDadMotivationDay',day=new Date().toISOString().slice(0,10);if(localStorage.getItem(key)!==day){localStorage.setItem(key,day);let f=pick(funny);setTimeout(()=>motivate(f[0],f[1],4200),1200)}}
function hiddenNudge(){let f=pick(funny);if('Notification'in window&&Notification.permission==='granted'){setTimeout(()=>{try{if(document.hidden)new Notification(f[0],{body:f[1],tag:'sea-eagle-return'})}catch(e){}},8000)}}
['pointerdown','touchstart','click'].forEach(ev=>document.addEventListener(ev,ensure,{once:true,passive:true}));
document.addEventListener('click',e=>{let a=e.target.closest('[data-action]')?.dataset.action||'';if(a==='masterSound'||a==='testSound'||a==='sound'){e.preventDefault();setTimeout(loud,60)}else if(a==='notifyDad'){e.preventDefault();askNotify()}else if(a==='spin'){tap()}else if(a==='payouts')tray('PAYS HELP','Scroll the pay table. Wins pay left-to-right and winning icons glow.')},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)hiddenNudge();else{ensure();let f=pick(funny);setTimeout(()=>motivate(f[0],f[1],3200),600)}});
new MutationObserver(()=>injectSettings()).observe(document.documentElement,{childList:true,subtree:true});
setInterval(()=>{let fp=q('#focusWinPanel');if(q('#modal')?.classList.contains('show')&&fp)hideWinExplain()},500);
function boot(){soundButton();observeModal();setTimeout(observeWin,900);daily();injectSettings();tray('HOW TO READ WINS','Winning icons glow. Non-paying icons dim. The panel explains the line.',3600)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();