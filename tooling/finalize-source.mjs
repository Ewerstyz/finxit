import fs from "node:fs/promises";
const file = "src/App.jsx";
let app = await fs.readFile(file, "utf8");
const start = app.indexOf("function ScrollStory(){");
const end = app.indexOf("function Product(){");
if (start < 0 || end < 0) throw Error("Expected source structure missing");
app = app.slice(0, start) + app.slice(end);
app = app.replace(
  "import { useEffect, useRef, useState }",
  "import { useEffect, useState }",
);
app = app.replace(
  "motion, MotionConfig, useReducedMotion, useScroll, useTransform",
  "motion, MotionConfig, useReducedMotion",
);
app = app.replace(
  "import { Button } from '@/components/ui/button';",
  `import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ScrollStory } from '@/components/ScrollStory';
import { HeroFilm } from '@/components/HeroFilm';`,
);
app = app.replace("<ScrollStory/>", "<ScrollStory><Phone lazy/></ScrollStory>");
app = app.replace("function Phone(){", "function Phone({lazy=false}){");
app = app.replace(
  '<img src="/assets/app-financeiro.jpeg"',
  '<img loading={lazy?"lazy":"eager"} fetchPriority={lazy?"auto":"high"} src="/assets/app-financeiro.jpeg"',
);
app = app.replace(
  '<section className="hero container" id="inicio">',
  '<section className="hero container" id="inicio"><HeroFilm/>',
);
// The official Radix-backed shadcn tabs own keyboard navigation and ARIA IDs.
const tabStart = app.indexOf('<div className="module-tabs"');
const panelStart = app.indexOf('<div className="module-panel"', tabStart);
const panelInner = app.indexOf('<div className="module-copy">', panelStart);
app =
  app.slice(0, tabStart) +
  `<Tabs value={String(active)} onValueChange={v=>select(Number(v))}><TabsList className="module-tabs" aria-label="Módulos do produto">{modules.map((item,i)=><TabsTrigger value={String(i)} key={item.name} className={active===i?'selected':''}><item.icon size={18} aria-hidden="true"/>{item.name}</TabsTrigger>)}</TabsList><TabsContent value={String(active)} className="module-panel">` +
  app.slice(panelInner);
app = app.replace(
  "</div></div></div></section>}",
  "</div></div></TabsContent></Tabs></section>}",
);
app = app.replace(
  '<div className="faqs">',
  '<Accordion type="single" collapsible className="faqs">',
);
app = app.replace(
  ".map(([q,a])=><details key={q}><summary>{q}<Plus size={19}/></summary><p>{a}</p></details>)}</div>",
  ".map(([q,a])=><AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent><p>{a}</p></AccordionContent></AccordionItem>)}</Accordion>",
);
// Preserve explicit demonstration disclosure while simplifying visitor-facing copy.
app = app
  .replace(
    "INTELIGÊNCIA PARA QUEM EMPREENDE",
    "Inteligência para quem empreende",
  )
  .replace("UM NEGÓCIO. TUDO CONECTADO.", "Um negócio. Tudo conectado.")
  .replace("DA SUA ROTINA PARA A SUA EVOLUÇÃO", "Da rotina à evolução")
  .replace("SEM COMPLICAÇÃO", "Suas dúvidas, com clareza")
  .replace(
    "O FUTURO COMEÇA NO PRÓXIMO PASSO",
    "O futuro começa no próximo passo",
  );
app = app.replace(
  "SIMPLES DE VER. FÁCIL DE ENTENDER.",
  "Simples de ver. Fácil de entender.",
);
app = app.replace(
  "Resposta de exemplo, sem conexão com IA.",
  "Conversa ilustrativa. Nenhum dado é enviado.",
);
app = app.replace(
  '<a className="brand"',
  '<a translate="no" className="brand"',
);
// Decorative icons are not announced separately by screen readers.
app = app.replace(
  /<(ArrowUpRight|ArrowRight|Sparkles|Wallet|ChartNoAxesCombined|Menu|X|Check|Mic|ScanLine|Keyboard|Plus|CalendarDays|Target|MoveDown)(?=[\s/>])/g,
  '<$1 aria-hidden="true"',
);
await fs.writeFile(file, app);
for (const name of ["tabs", "accordion"]) {
  const p = `src/components/ui/${name}.jsx`;
  let content = await fs.readFile(p, "utf8");
  content = content
    .replace('from "cn"', 'from "@/lib/utils"')
    .replaceAll("transition-all", "transition-colors");
  if (name === "accordion")
    content = content.replace(
      "<ChevronDownIcon ",
      '<ChevronDownIcon aria-hidden="true" ',
    );
  await fs.writeFile(p, content);
}
