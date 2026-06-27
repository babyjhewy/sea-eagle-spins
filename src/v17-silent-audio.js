(()=>{
const SAVE='seaEagleSpinsV11';
let ctx, master, html, armed=false, loop=null, beat=0, lastWinSound=0;
const notes=[146.83,196,246.94,293.66,392,493.88,587.33];
function forceOn(){try{let s=JSON.parse(localStorage.getItem(SAVE)||'{}');s.sound=true;localStorage.setItem(SAVE,JSON.stringify(s));localStorage.setItem('seaEagleAudioUnlocked','1')}catch(e){}}
function makeWav(freq=880,dur=.14){const rate=11025,len=Math.floor(rate*dur),buf=new ArrayBuffer(44+len*2),v=new DataView(buf);let o=0;function str(s){for(let i=0;i<s.length;i++)v.setUint8(o++,s.charCodeAt(i))}function u32(x){v.setUint32(o,x,true);o+=4}function u16(x){v.setUint16(o,x,true);o+=2}str('RIFF');u32(36+len*2);str('WAVE');str('fmt ');u32(16);u16(1);u16(1);u32(rate);u32(rate*2);u16(2);u16(16);str('data');u32(len*2);for(let i=0;i<len;i++){let t=i/rate,env=1-i/len,s=Math.sin(2*Math.PI*freq*t)*env*.7;v.setInt16(o,Math.max(-1,Math.min(1,s))*32767,true);o+=2}let bin='',a=new Uint8Array(buf);for(let i=0;i<a.length;i++)bin+=String.fromCharCode(a[i]);return 'data:audio/wav;base64,'+btoa(bin)}
function htmlBeep(){if(!html){html=new Audio(makeWav());html.preload='auto';html.playsInline=true;html.volume=1}try{html.currentTime=0;let p=html.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
function makeCtx(){ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(!master){master=ctx.createGain();master.gain.value=.85;master.connect(ctx.destination)}return ctx}
function tone(f=440,d=.09,type='triangle',vol=.32,delay=0){try{makeCtx();ctx.resume&&ctx.resume();let t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.04)}catch(e){}}
function unlock(){forceOn();try{makeCtx();ctx.resume&&ctx.resume()}catch(e){} htmlBeep(); if(!armed){armed=true;music()}}
function music(){if(loop)return;loop=setInterval(()=>{if(document.hidden||!armed)return;let n=notes[beat%notes.length];tone(n,.055,'triangle',.035);if(beat%4===0)tone(n*2,.04,'sine',.025,.02);beat++},620)}
function sfx(kind='tap'){unlock(); if(kind==='spin'){htmlBeep(); tone(150,.075,'sawtooth',.4);tone(230,.065,'square',.25,.06);tone(310,.055,'square',.18,.12)}else if(kind==='win'){htmlBeep();[392,523,659,784,1046,1318].forEach((f,i)=>tone(f,.1,'triangle',.42,i*.06))}else if(kind==='bonus'){htmlBeep();[330,494,659,988,1318].forEach((f,i)=>tone(f,.12,'triangle',.46,i*.07))}else if(kind==='challenge'){tone(520,.08,'sine',.34);tone(780,.08,'sine',.24,.08)}else{tone(520,.045,'square',.22)}}
function hideSoundUi(){document.querySelectorAll('.soundUnlock,.soundMaster,.audioBadge,.pwaSoundGate').forEach(el=>el.remove())}
function handle(e){let a=e.target.closest('[data-action]')?.dataset.action||'';unlock();hideSoundUi();if(a==='spin'||e.target.closest('.spin'))sfx('spin');else if(a==='auto')sfx('spin');else if(a&&a.includes('challenge'))sfx('challenge');else if(a==='topup'||a.startsWith('pack')||a==='daily')sfx('bonus');else sfx('tap')}
['pointerdown','touchstart','click'].forEach(ev=>document.addEventListener(ev,handle,true));
document.addEventListener('visibilitychange',()=>{if(!document.hidden){unlock();hideSoundUi()}else armed=false});
const obs=new MutationObserver(()=>{hideSoundUi();let w=document.querySelector('#winPopup');if(w&&w.classList.contains('show')&&Date.now()-lastWinSound>1200){lastWinSound=Date.now();sfx('win')}let f=document.querySelector('#focusWinPanel');if(f&&f.classList.contains('show')&&Date.now()-lastWinSound>1200){lastWinSound=Date.now();sfx(f.textContent.includes('BONUS')?'bonus':'win')}});
obs.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
window.SeaEagleAudio={start:unlock,sfx};
window.SeaEagleHomeSound={fanfare:()=>sfx('win')};
window.SeaEagleSoundTest=()=>sfx('win');
forceOn();setInterval(hideSoundUi,700);
})();