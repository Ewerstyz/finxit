import fs from 'node:fs';
let p='tooling/review-redesign.mjs',s=fs.readFileSync(p,'utf8');
s=s.replace("filePath:'design/qa/redesign-desktop.png'","filePath:reduced?'design/qa/redesign-reduced.png':'design/qa/redesign-desktop.png'");
s=s.replace("await evaluate(()=>{document.querySelector('.question').click();document.querySelector('.faqs button').click();return", "await evaluate(async()=>{document.querySelector('.question').click();document.querySelector('.faqs button').click();await new Promise(r=>setTimeout(r,150));return");
s=s.replace("await evaluate(()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('#menu-toggle').click();return", "await evaluate(async()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('#menu-toggle').click();await new Promise(r=>setTimeout(r,100));return");
fs.writeFileSync(p,s);
p='index.html';s=fs.readFileSync(p,'utf8').replace('FinxiIT — Seu próximo passo mais certo','FinxiIT — Seu negócio, na sua mão.');fs.writeFileSync(p,s);
p='src/App.jsx';s=fs.readFileSync(p,'utf8').replace('motion, MotionConfig, useReducedMotion','motion, MotionConfig').replace('import { Button } from "@/components/ui/button";\n','');fs.writeFileSync(p,s);
