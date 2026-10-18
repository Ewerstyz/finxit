import fs from 'node:fs';
let p='src/App.jsx',s=fs.readFileSync(p,'utf8');
s=s.replace('import { ScrollStory } from "@/components/ScrollStory";','import { ScrollStory } from "@/components/ScrollStory";\nimport { episodes } from "@/episodes";\nimport { OnboardingGuide, RegistrationGuide, ConnectedGuide, moduleDepth } from "@/components/AppGuide";');
s=s.replace('<Product />','<OnboardingGuide />\n        <ScrollStory episode={episodes[1]} />\n        <RegistrationGuide />\n        <Product />\n        <ScrollStory episode={episodes[2]} />\n        <ConnectedGuide />');
s=s.replace('const m = modules[active];','const m = modules[active];\n  const depth = moduleDepth[active];');
s=s.replace('<span className="planned">\n              Funcionalidades previstas no projeto\n            </span>','<span className="planned">Funcionalidades previstas no projeto</span>\n            <dl className="module-depth"><div><dt>O que entra</dt><dd>{depth.input}</dd></div><div><dt>O que o módulo propõe</dt><dd>{depth.output}</dd></div><div><dt>O que você revisa</dt><dd>{depth.review}</dd></div></dl>');
s=s.replace('Conheça a FinxiIT, pensada para quem faz um pequeno negócio acontecer.','Conheça a FinxiIT, pensada para quem faz um pequeno negócio acontecer.');
// Add a direct index for each separate video, without forcing visitors through every pinned scene.
s=s.replace('<ScrollStory />','<nav className="film-index container" aria-label="Vídeos sobre o aplicativo">{episodes.map(e=><a key={e.id} href={`#${e.id}`}><span>{e.number}</span>{e.label}<ArrowUpRight size={16} aria-hidden="true"/></a>)}</nav>\n        <ScrollStory />');
const anchor='[\n                  "Já posso baixar o aplicativo?",';
const extra='["Os três vídeos mostram funções já disponíveis?", "O primeiro apresenta a interface de referência em um filme de produto. Os outros dois são simulações conceituais de registro e planejamento geradas no Google Flow. Eles explicam a proposta e não comprovam que esses recursos estejam implementados."],\n                ["Como os módulos se conectam?", "O documento do projeto prevê uma base de dados compartilhada. Um custo registrado no financeiro pode alimentar as premissas do plano de negócios e contextualizar sugestões de marketing. Essa integração ainda é apresentada como parte do desenvolvimento."],\n                ';
s=s.replace(anchor,extra+anchor);
fs.writeFileSync(p,s);
