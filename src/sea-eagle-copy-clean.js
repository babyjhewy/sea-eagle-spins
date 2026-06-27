(()=>{
'use strict';
const replacements=[
[/fake family game coins/gi,'family game coins'],[/fake coins/gi,'coins'],[/fake coin/gi,'coin'],[/fake money/gi,'coins'],[/fake pokies/gi,'Sea Eagle spins'],[/Dads fake pokies tour/gi,'Dads Sea Eagle tour'],[/Dad's fake pokies tour/gi,"Dad's Sea Eagle tour"],[/No real money\.?/gi,'Coins added.'],[/No money charged\.?/gi,'Added to balance.'],[/real cash/gi,'bonus coins'],[/no prizes or cash value/gi,'made for Craig'],[/cash value/gi,'game value'],[/This is not gambling, this is /gi,'This is '],[/not gambling/gi,'just spinning'],[/\bfake\b/gi,''],[/\s{2,}/g,' ']
];
function cleanText(t){let out=t;for(const [a,b] of replacements)out=out.replace(a,b);return out.trimStart()}
function walk(n){if(!n)return;if(n.nodeType===3){const v=cleanText(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;return}if(n.nodeType!==1||n.tagName==='SCRIPT'||n.tagName==='STYLE')return;for(const c of [...n.childNodes])walk(c)}
function scrub(){walk(document.body)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scrub,{once:true});else scrub();
new MutationObserver(()=>scrub()).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
setInterval(scrub,1200);
})();