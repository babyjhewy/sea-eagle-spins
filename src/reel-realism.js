(()=>{
function mark(){document.querySelectorAll('#reels .cell').forEach((c,i)=>c.dataset.col=String((i%5)+1))}
function fx(){let r=document.querySelector('#reels');if(!r)return;mark();if(r.classList.contains('spinning')&&!r.classList.contains('reelFx')){r.classList.add('reelFx');['stop1','stop2','stop3','stop4','stop5'].forEach(c=>r.classList.remove(c));[1,2,3,4,5].forEach((n,i)=>setTimeout(()=>r.classList.add('stop'+n),520+i*130))}if(!r.classList.contains('spinning')&&r.classList.contains('reelFx')){setTimeout(()=>{r.classList.remove('reelFx','stop1','stop2','stop3','stop4','stop5')},420)}}
const obs=new MutationObserver(fx);obs.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
setInterval(mark,1200);mark();
})();