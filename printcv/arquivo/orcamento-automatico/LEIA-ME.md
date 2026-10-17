# Orçamento automático e /admin (arquivado)

Retirado do site em 2026-10-17, quando o frontend deixou o Strapi e passou para
a Vercel. Dependia de duas coisas que a Vercel não tem:

- o **Strapi** (lia e gravava os `orcamentos`);
- o **servidor de slice** (`files/server.js`) a correr no PC, em `localhost:3001`,
  com o Bambu Studio.

Para voltar a pô-lo no ar, é preciso um backend com base de dados e um servidor
de slice acessível a partir da internet. Antes de mover estes ficheiros de volta
para `printcv/frontend/`, corrigir:

1. **`ADMIN_PASSWORD` em falta** devolve 401 como se a password estivesse
   errada. Deve responder 503 com "ADMIN_PASSWORD não configurada".
2. **Autorização repetida em três rotas.** Juntar num helper (`lib/adminAuth.ts`),
   comparar em tempo constante (`crypto.timingSafeEqual`) e limitar as tentativas.
3. **`id` e `pedidoId` vão para a URL do Strapi sem validação.** Aceitar só um
   `documentId` alfanumérico. O PUT de `pedidos` só deve aceitar uma lista
   fechada de campos (ex.: `status`).
4. **`req.json()` antes da autorização e sem try/catch** em `calcular`: um
   corpo inválido dá 500 a quem não está autenticado.
5. **Respostas do Strapi não verificadas** (`res.ok`): um 4xx/5xx passa como
   sucesso e o painel mostra "orçado" sem nada gravado.
6. **`AdminPanel.entrar()`** só trata o 401: qualquer outro erro conta como
   login feito.
