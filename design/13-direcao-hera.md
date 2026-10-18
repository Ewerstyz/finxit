# FinxiIT — direção inspirada no Hera

Referência visual inspecionada no navegador: https://hera.video/ (29/09/2026).
Hero central de tipografia grande, contorno com alças de seleção, barra de interação, demonstrações em destaque e transição de superfície escura para seção branca arredondada. Adaptar essa composição à marca FinxiIT; textos, imagens e identidade são próprios.

## Sistema
- Branco #ffffff: canvas e respiro.
- Tinta #101828: títulos e textos principais.
- Azul Finxi #0649ff: ação e seleção.
- Cinza #f3f6fb: planos de demonstração.
- Escuro #151719: palco dos três filmes.
- Lilás #eeebff: módulo estratégico; azul claro e pêssego distinguem os demais módulos.
- Manrope Variable: títulos 80–96 px no desktop, 44–52 px no celular; corpo 16–18 px.
- Grade: máximo 1240 px, margem 48 px desktop / 20 px celular. Ritmo de 8 px; seções 96–128 px.
- Raio 12 px em exemplos, 24 px na barra, 48 px na transição de seção.

## Composição
```
marca                 três módulos                 conhecer
                Seu negócio merece
                 um próximo passo.
           [pergunta selecionada             ↗]
             financeiro estratégia marketing

      [caixa real]  [plano visual]  [campanha visual]

           Três desafios. Uma visão conectada.
 módulo financeiro: problema → solução + exemplo real
 [filme 1, progresso controlado pelo scroll]
 [detalhes expansíveis]
 módulo estratégia: problema → solução + plano demonstrativo
 [filme 2, captura de dados que alimentam o planejamento]
 [detalhes expansíveis]
 módulo marketing: problema → solução + rascunho demonstrativo
 [filme 3, produto → divulgação]
 [detalhes expansíveis]
              conexão dos três módulos
                    dúvidas
```

## Revisão do plano
A versão anterior fragmentava a explicação em vários blocos de diagnóstico e registros. Agora cada módulo tem um problema, uma solução, um exemplo e detalhes. A galeria usa três visuais diferentes, ligados ao produto; não usar três cartões de benefícios idênticos. O filme de comprovantes demonstra uma entrada de dados para o planejamento, não a tela estratégica pronta. Não transformar os conceitos do documento em promessas de recursos já disponíveis.

## Movimento e ferramentas
Motion: progresso do scroll dirige currentTime dos três MP4 distintos, sem autoplay. Controles de progresso e salto continuam acessíveis. Modo de movimento reduzido exibe imagens e transcrição. shadcn/ui: Tabs e Accordion. Frontend Design: planejamento e crítica visual. Web Design Guidelines e Chrome DevTools MCP: revisão e testes. Magic MCP/21st não está disponível nesta sessão; não alegar integração.
