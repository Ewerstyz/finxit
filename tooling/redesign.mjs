import fs from 'node:fs';
const p='src/App.jsx'; let old=fs.readFileSync(p,'utf8');
let prefix=old.slice(0,old.indexOf('function App()'));
prefix=prefix.replace('import { HeroFilm } from "@/components/HeroFilm";','');
prefix=prefix.replace(/function Reveal\([\s\S]*?\nfunction Phone/, 'function Reveal({children,className=""}) { return <div className={className}>{children}</div>; }\nfunction Phone');
prefix=prefix.replace('<p className="eyebrow">Um negócio. Tudo conectado.</p>','<p className="section-label">A proposta FinxiIT</p>').replace('Menos complicação.','As contas, as ideias,').replace('Mais visão do todo.','o próximo passo.').replace('<p className="eyebrow">{m.tag}</p>','');
fs.writeFileSync(p,prefix+`function App() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') { setMenu(false); document.getElementById('menu-toggle')?.focus(); } };
    if(menu) window.addEventListener('keydown',close);
    return () => window.removeEventListener('keydown',close);
  },[menu]);
  return <MotionConfig reducedMotion="user">
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className="header"><div className="container nav"><Brand />
      <nav id="navigation" className={menu?'navigation open':'navigation'} aria-label="Navegação principal">
        <a href="#experiencia" onClick={()=>setMenu(false)}>O aplicativo</a><a href="#produto" onClick={()=>setMenu(false)}>A proposta</a><a href="#duvidas" onClick={()=>setMenu(false)}>Dúvidas</a>
      </nav>
      <a className="nav-link" href="#produto">Conheça a FinxiIT <ArrowUpRight size={18} aria-hidden="true" /></a>
      <button id="menu-toggle" className="menu-toggle" aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>
    </div></header>
    <main id="conteudo">
      <section className="intro container" id="inicio">
        <div className="intro-title"><h1>Seu negócio,<br/>na sua mão.</h1><span className="intro-stamp">FinxiIT</span></div>
        <div className="intro-copy"><p>Você cuida de tudo.<br/>Quem ajuda a olhar o todo?</p><p className="intro-description">Do caixa de hoje aos planos de amanhã. Conheça a FinxiIT, pensada para quem faz um pequeno negócio acontecer.</p><a className="round-link" href="#experiencia"><span className="round-icon"><MoveDown size={22} aria-hidden="true"/></span>Explore o aplicativo</a></div>
      </section>
      <ScrollStory />
      <section className="daily" id="rotina"><div className="container daily-layout">
        <div className="daily-copy"><p className="section-label">Feita para a sua rotina</p><h2>A venda entra.<br/>A conta chega.<br/>Você enxerga.</h2><p>Empreender já exige muito. Entender o dinheiro do seu negócio precisa ser simples.</p><p>Saldo, registros e resumo financeiro reunidos em uma visão que cabe no seu dia.</p><a className="light-link" href="#produto">Veja o que a FinxiIT propõe <ArrowUpRight size={20} aria-hidden="true"/></a></div>
        <div className="real-interface"><div className="interface-title"><span>Uma visão do seu caixa</span><span>Interface de referência</span></div><Phone lazy/><p>Imagem original do aplicativo · valores ilustrativos</p></div>
      </div></section>
      <Product />
      <section className="routine container" id="como-funciona"><div><p className="section-label">Menos trabalho para registrar</p><h2>Do seu jeito.<br/>No seu tempo.</h2><p>A proposta começa com uma conversa sobre o seu negócio e continua na sua rotina.</p><span className="planned">Recursos previstos no projeto</span></div><div className="input-list">
        {[[Mic,'Fale.','Uma venda entre um atendimento e outro. A proposta é registrar por voz.'],[ScanLine,'Fotografe.','Um comprovante em mãos. A leitura de imagem ajuda a trazer os dados.'],[Keyboard,'Digite.','Prefere conferir cada detalhe? O registro manual também tem seu lugar.']].map(([Icon,t,d])=><div key={t}><Icon size={28} aria-hidden="true"/><div><h3>{t}</h3><p>{d}</p></div></div>)}
      </div></section>
      <section className="faq-section container" id="duvidas"><div><p className="section-label">Antes de seguir</p><h2>Vamos deixar<br/>tudo claro.</h2></div><Accordion type="single" collapsible className="faqs">{[
        ['Para quem a FinxiIT foi pensada?','Para micro e pequenos empreendedores que querem entender as finanças, organizar a rotina e planejar os próximos passos em uma linguagem acessível.'],
        ['Já posso baixar o aplicativo?','Esta página apresenta a proposta e uma interface de referência. A disponibilidade para download ainda precisa ser confirmada.'],
        ['A inteligência artificial já funciona neste site?','As conversas aqui são exemplos com respostas pré-definidas. Voz, leitura de comprovantes, projeções e consultoria fazem parte do plano de desenvolvimento.'],
        ['Preciso saber de finanças?','A proposta é traduzir os números para a linguagem do dia a dia, com informações fáceis de ler e ações simples.']
      ].map(([q,a])=><AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent><p>{a}</p></AccordionContent></AccordionItem>)}</Accordion></section>
      <section className="closing"><div className="container"><img src="/assets/finxi_brand.webp" width="80" height="80" alt=""/><h2>Você faz acontecer.<br/>A clareza vai junto.</h2><a className="closing-link" href="#experiencia">Explore a FinxiIT <MoveDown size={22} aria-hidden="true"/></a></div></section>
    </main>
    <footer className="container footer"><Brand/><span>Inteligência para quem empreende.</span><a href="#inicio">Voltar ao início</a><p>© ${new Date().getFullYear()} FinxiIT. Apresentação do projeto.</p></footer>
  </MotionConfig>;
}
export default App;
`);
let main=fs.readFileSync('src/main.jsx','utf8').replace('import "./final.css";',''); fs.writeFileSync('src/main.jsx',main);
