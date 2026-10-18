# Conteúdo institucional e evidências — 2 de outubro de 2026

## Escopo

O texto de `src/content/company.js` apresenta FinxiIT e o aplicativo com base no documento fornecido e no código local Android. Não houve execução do app, chamadas aos provedores, compilação, leitura de arquivos de credenciais nem alteração do projeto Android.

Missão, visão e valores são **formulações editoriais propostas**, derivadas dos objetivos do plano. Não foram encontradas declarações institucionais formalmente aprovadas. Não foram inventados história, fundadores, endereço, CNPJ, clientes, métricas, certificações ou parceiros.

## Fontes locais

1. `referência/projeto-texto.txt`: democratização da inteligência de negócios; linguagem acessível; módulos financeiro, estratégico e marketing; contexto unificado; acessibilidade; humano no controle.
2. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/docs/PRODUCT_VISION.md`: organização de clientes, catálogo, vendas, tarefas e caixa; Quests como contexto comum; revisão antes de exportar/compartilhar; não movimenta dinheiro, não oferece crédito e não publica campanhas automaticamente.
3. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/README.md`: funcionalidades descritas como implementadas; dados locais; duas edições; chamadas de serviços a partir do Android.
4. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/PRODUCT_MODEL.md`: núcleo comum e contexto BusinessProfile/BusinessAiContext; sem sincronização entre aparelhos; preferências de apresentação não alteram dados ou provedores.
5. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/app/src/main/java/com/finxi_it/app/core/ai/DirectAiOrchestrator.kt`: implementação confirmada da coordenação no aparelho, modos especializados, contexto aprovado, metadados de modelo/provedor, pesquisa específica e instruções para não inventar números ou resultados.
6. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/app/src/main/java/com/finxi_it/app/core/ai/providers/TextProviders.kt`: rotas Groq/NVIDIA e alternativas em caso de falha; participação só de provedores configurados.
7. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/app/src/main/java/com/finxi_it/app/core/ai/ProviderConfig.kt`: nomes públicos padrão, sem leitura de BuildConfig gerado, `.env` ou credenciais reais.
8. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/docs/IA_E_APIS_RECOMENDADAS.md`: documentação atualizada em 27/09/2026; prevalece sobre tabela de provedores desatualizada do README.
9. `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/docs/APKS.md`: live/demo e distribuição com assinatura própria.

## O que se pode afirmar

- O **código** contém organização financeira, contexto do negócio, modos de assistência e integração com diferentes provedores. Isso não equivale a comprovar o funcionamento de uma edição distribuída ou das APIs no momento.
- O conceito de IA central e especialistas pode ser apresentado como coordenação de especialidades. A implementação não prova uma rede de agentes autônomos independentes nem modelos treinados exclusivamente pela FinxiIT.
- O app coordena APIs no Android. Não afirmar que existe um servidor Finxi central, um modelo proprietário ou sincronização remota de todos os dados.
- Perfil, dados do negócio e snapshot financeiro alimentam o contexto. A base compartilhada no diagrama deve representar esse contexto local, sem prometer sincronização em tempo real entre aparelhos.
- Os serviços configurados podem operar conforme rede, cotas e acesso. A inspeção não acessou configurações reais e não certifica nenhum serviço como ativo.

## Modelos padrão no código, não promessa de disponibilidade

| Uso | Serviço / padrão no código |
|---|---|
| Texto rápido | Groq / `openai/gpt-oss-120b` |
| Texto, diagnóstico e plano | NVIDIA / `deepseek-ai/deepseek-v4.1-flash` |
| Alternativa de texto NVIDIA | `nvidia/nemotron-3.5-lightning-30b-a3b` |
| Pesquisa | Gemini / `gemini-3.5-flash-lite`, exclusivo de pesquisa com fontes |
| Notícias e busca alternativa | Tavily |
| Imagens | Cloudflare Workers AI / `@cf/leonardo/lucid-origin` |

Estes são identificadores **encontrados no projeto**, não validação externa do catálogo dos serviços. Modelos são configuráveis e podem diferir no APK. Por isso, o texto principal explica tarefas e provedores; não cristaliza nomes específicos como garantia de execução.

## Download Android

Foi encontrado `C:/Users/Prisciani/AndroidStudioProjects/FinxiIT2/entrega/FinxiIT-inicio-2026-09-26-debug.apk`, com 70.470.544 bytes, modificado em 26/09/2026. Nenhum link `play.google.com/store` ou `market://details` foi encontrado nas pastas docs e app/src/main examinadas.

O APK **debug não foi copiado nem disponibilizado**. O README Android alerta que valores de credenciais podem ser compilados no APK e extraídos. Um arquivo existente não é evidência de autorização para distribuição pública com essas condições. É necessária uma versão adequada à distribuição ou um canal oficial confirmado. Não gerar um endereço da Play Store a partir do applicationId e apresentá-lo como publicado.

O usuário informou nesta etapa que fornecerá o link de download depois. O objeto `company.download` mantém `url: null` como estado editorial; a configuração de execução será `androidDownloadUrl` em `public/site-config.json`, inicialmente vazia. O CTA deve informar brevemente a indisponibilidade enquanto essa configuração estiver vazia, sem simular download. Ao receber o endereço fornecido pelo responsável, o mesmo CTA pode encaminhar para o canal configurado.

## Tratamento editorial

Os exemplos de R$ 50 em embalagens e da terça-feira com pouco movimento são demonstrativos. Os valores do screenshot pertencem à referência; não são métricas da empresa. A apresentação evita afirmações sobre economia de tempo, retorno, número de clientes ou melhoria de receita sem evidência.

O plano original contém OCR, voz e previsão como intenções; a documentação Android mais recente descreve implementações dessas funções. A copy pode apresentar os recursos do projeto, acompanhada da nota de que disponibilidade depende da versão e das integrações. Não afirmar homologação, teste atual em dispositivo ou entrega publicada.
