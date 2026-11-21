# Minhas Compras — versão 2.0

Lista de supermercado com catálogo pré-preenchido, preços, quantidades, totais, histórico, orçamento, busca, filtros, exportação CSV/PDF/JSON e modo offline (PWA).

## Instalação

```bash
npm install
npm run dev
```

Para conferir a build: `npm run build`. Para validar o código: `npm run lint`.

## Sem backend

Os dados são armazenados localmente em IndexedDB, usando `idb-keyval`. Não há conta, API ou sincronização entre aparelhos. Faça backups JSON regularmente: **Exportar → Backup JSON**; para restaurar, **Exportar → Importar backup JSON**.

## Como funciona

- O catálogo original é carregado na primeira visita e pode ser editado.
- Edite quantidade, unidade (un/kg/L) e preço unitário de cada produto; o preço aceita ponto ou vírgula como separador decimal (ex.: 12.90 ou 12,90).
- Um produto sem preço não participa da soma e é sinalizado no resumo.
- **Finalizar compra** cria um registro no histórico, abre o histórico e reinicia quantidade, marcação e preço, preservando o catálogo. Cada compra histórica pode ser exportada em CSV, PDF ou JSON.
- **Reiniciar compra** prepara uma nova compra sem criar histórico. **Restaurar catálogo** substitui os produtos personalizados pelos itens padrão, preservando o histórico.
- **Exportar** produz CSV (planilhas), PDF e JSON (backup completo).
- O orçamento excedido aparece em destaque, e ações destrutivas do catálogo e do histórico usam confirmação personalizada.
- Os dados da versão anterior em `localStorage.itens` são importados como itens adicionais de Utilidades quando possível. Como a versão antiga não persistia os produtos predefinidos, alterações antigas neles não podem ser restauradas.

## Deploy

Hospedagem estática gratuita na Vercel, com build `npm run build` e diretório de saída `dist`. Para PWA, instale em HTTPS após publicar. O manifesto possui ícones PNG de 192 e 512 pixels. Em navegadores compatíveis, a opção **Instalar app** aparece quando a instalação é disponibilizada; em outros, use a opção do menu do navegador.

## Limitações

Os dados podem ser apagados ao limpar o armazenamento do navegador. A exportação PDF é gerada no navegador e não envia dados a servidores. A aplicação não é compartilhada nem sincronizada entre dispositivos. A moeda padrão é BRL.
