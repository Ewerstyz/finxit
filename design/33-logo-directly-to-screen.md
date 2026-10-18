# Correção: logo diretamente à tela do app

Solicitação: retirar a apresentação de hardware com marca FinxiIT. A abertura deve mostrar a identidade e passar diretamente à interface real com blend e motion, sem criar recursos ou telas.

Foi enviado ao Flow o comando exato de `design/flow-logo-screen-v2.txt`, reutilizando a logo e a captura do app como referências. A geração falhou com **“We noticed some unusual activity”**, sem cobrança. O Flow também exibia falha de conexão com reCAPTCHA. Não foi tentado resolver o desafio, modificar o navegador ou contornar a restrição. Registro: `design/qa/flow-logo-screen-v2-failed.png`.

## Resultado instalado

Foi criada uma composição nova com os arquivos originais locais, sem usar o clipe bloqueado de marca/hardware e sem baixar novos conteúdos. Não se trata de uma geração nova do Flow.

- 0–3 s: ícone original FinxiIT, escala suave de até 4%, fundo marinho.
- 3–5,3 s: blend por alpha entre o ícone original e a captura original, mantendo alinhamento.
- 5,3–8,8 s: captura original completa, frontal e plana, sem borda, carcaça ou dispositivo. Zoom suave de até 3%.
- 8,8–10 s: cross-dissolve de 1,2 s para o trecho já disponível do Flow com pessoas usando celulares comuns.
- Continuação: o mesmo filme local de pessoas/Brasil, preservando a expansão original do Flow. Seus primeiros 3,5 s foram retirados para excluir a apresentação isolada do smartphone.

Não foram criados menus, números, texto ou símbolo. Os valores da captura são os dados fictícios fornecidos pelo usuário. Os atores e a conexão nacional continuam sendo cenas ilustrativas; não representam clientes nem cobertura comprovada.

Arquivo final: `public/media/finxi-logo-screen-journey.mp4`, aproximadamente 20,3 s, 1280×720, 24 fps, H.264, sem áudio, faststart, quadros-chave a cada seis frames. Fontes e estado constam em `src/cinematic/opening-media.json`. O filme inteiro acompanha a rolagem desde o primeiro frame, nos dois sentidos. Os textos acompanham as entradas e saídas pelo Motion. O início do capítulo Brasil foi sincronizado em 78%.

Reprodução:

```powershell
& 'C:/Users/Prisciani/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' tooling/compose-logo-screen.py
node node_modules/vite/bin/vite.js build
node tooling/qa-brand-opening.mjs
node tooling/qa-brand-opening.mjs --reduced
```

Composição original dos primeiros dez segundos preservada em `referência/videos/brand-opening/logo-screen-original-motion.mp4`. Folha de contato: `design/qa/logo-screen-journey-contact.jpg`. A versão anterior está em `archive/finxi-before-logo-screen-v2/`.

O estado anterior de espera por download manual descrito em `design/31-flow-brand-opening.md` e `design/32-full-flow-film.md` pertence ao histórico. O site atual já possui uma abertura completa em vídeo, feita com composição local das referências originais e os trechos locais disponíveis do Flow.

Validação concluída: build Vite; Chrome DevTools MCP em 1440×1000, 768×1024, 390×844 e 320×740. Tempo do filme correto em avanço e retorno, pausado sem autoplay; entradas/saídas dos textos reversíveis; nenhuma barra, imagem ausente, colisão de texto, transbordamento ou erro de console. Mapa inferior e demonstração do app preservados. Após o acabamento do enquadramento e da sombra no celular, os dois tamanhos móveis e movimento reduzido foram revisados novamente. Pôsteres e folha de contato conferidos visualmente. Relatórios: `design/qa/brand-opening.json`, `brand-opening-mobile.json` e `brand-opening-reduced.json`.
