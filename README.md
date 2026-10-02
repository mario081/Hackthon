# Voz Segura

Plataforma de comunicação acessível para relatos de violência por pessoas com barreiras de comunicação, usando Comunicação Aumentativa e Alternativa (CAA) com pictogramas.

MVP de hackathon — apenas frontend, com dados simulados.

## Duas frentes

| Frente | Rotas | Para quem |
|---|---|---|
| **App da pessoa atendida** (mobile/tablet) | `/`, `/relato`, `/enviado/:id`, `/acompanhar`, `/ajuda`, `/acessibilidade` | Quem precisa fazer o relato |
| **Painel institucional** (desktop) | `/painel`, `/painel/casos`, `/painel/casos/:id`, `/painel/encaminhamentos` | Profissionais da rede de proteção |

### App da pessoa atendida
- Início com 4 caminhos: *Quero denunciar*, *Estou em perigo*, *Falar sobre alguém*, *Dar um depoimento*
- Relato guiado em 7 passos com pictogramas (sobre quem, quem fez, o que, onde, quando, sentimentos, revisão)
- Revisão com **Editar** por passo e campo de texto livre opcional
- Protocolo do caso e página de **acompanhamento** (só mostra andamento, nunca anotações internas)
- **Estou em perigo**: telefones de emergência (190, 180, 100, 192, 188) e relato urgente
- **Sair rapidamente**: apaga o rascunho e troca a página sem deixar o app no histórico
- Acessibilidade: texto maior e leitura em voz alta (Web Speech API)

### Painel institucional
- Dashboard com contagens, relatos por dia e tipos de situação
- Casos: abas por status, filtros (tipo, prioridade, período, origem), busca, ordenação e paginação
- Detalhe do caso: status, prioridade, responsável, iniciar atendimento, encaminhar, anotações, linha do tempo
- Separação das camadas: **relato original** (escolhas da pessoa) · **resumo assistido por IA** (rotulado) · **anotações profissionais**

## Rodar

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # vitest
npm run lint    # oxlint
npm run build
```

## Login do painel

O painel (`/painel/...`) exige login com o usuário **admin**. Para definir a senha:

```bash
npm run senha -- SuaSenhaForte   # mínimo 8 caracteres
npm run senha                    # ou gera uma aleatória (fica anotada em .env.local)
```

Depois reinicie o `npm run dev`. O `.env.local` (ignorado pelo git) guarda só o hash SHA-256 da senha. A sessão vale até fechar a aba (máx. 8h) e após 5 erros o login trava por 30s.

> ⚠️ Como não há backend, esta proteção roda no navegador: impede o acesso casual na demonstração, mas não é segurança real. Em produção o login e os dados precisam ficar num servidor.

## Notas

- Estado só em memória: recarregar a página volta aos dados simulados. Nada do relato é gravado no aparelho da pessoa.
- O "resumo assistido por IA" é gerado localmente a partir das escolhas (`src/lib/reports.js`), sem chamada a API.
- A prioridade é **sugerida** a partir das escolhas e pode ser alterada pelo profissional.

## Créditos

Pictogramas: Sergio Palao / [ARASAAC](https://arasaac.org), Governo de Aragão — licença CC BY-NC-SA. As imagens ficam em `public/pictograms` (servidas localmente, sem enviar a terceiros quais pictogramas a pessoa vê).
