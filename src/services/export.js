const two = number => (number / 100).toFixed(2).replace('.', ',');
export const toMoney = cents => cents === null || cents === undefined ? '—' : new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(cents / 100);
export const sumCents = items => items.reduce((sum, item) => sum + (item.priceCents === null ? 0 : Math.round(item.priceCents * item.quantity)), 0);
export function downloadBlob(text, filename, type) {
  const url = URL.createObjectURL(new Blob([text], {type}));
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function exportCsv(items) {
  const quote = value => `"${String(value ?? '').replaceAll('"','""')}"`;
  const rows = [['Categoria','Produto','Quantidade','Unidade','Preço unitário (R$)','Subtotal (R$)','Comprado'], ...items.map(i => [i.category,i.name,String(i.quantity).replace('.',','),i.unit,i.priceCents === null ? '' : two(i.priceCents),i.priceCents === null ? '' : two(Math.round(i.priceCents * i.quantity)),i.checked?'Sim':'Não'])];
  downloadBlob('\uFEFF' + rows.map(row => row.map(quote).join(';')).join('\r\n'), 'lista-de-compras.csv','text/csv;charset=utf-8');
}
export async function exportPdf(items, notes) {
  const {jsPDF} = await import('jspdf');
  const pdf = new jsPDF(); let y = 20;
  pdf.setFontSize(18); pdf.text('Lista de compras', 14, y); y += 9;
  pdf.setFontSize(10); pdf.text(new Date().toLocaleDateString('pt-BR'),14,y); y += 11;
  for (const i of items) {
    if (y > 271) { pdf.addPage(); y = 18; }
    const text = `${i.checked ? '[X]' : '[ ]'} ${i.name} (${i.quantity} ${i.unit})  ${i.priceCents === null ? 'sem preco' : toMoney(Math.round(i.priceCents * i.quantity))}`;
    const lines = pdf.splitTextToSize(text, 176);
    pdf.text(lines, 14, y); y += lines.length * 5 + 3;
  }
  if (y > 255) {pdf.addPage(); y = 20;}
  y += 4; pdf.setFontSize(12); pdf.text(`Total: ${toMoney(sumCents(items))}`,14,y); y += 10;
  pdf.setFontSize(10);
  if (notes?.trim()) {
    const lines = pdf.splitTextToSize(`Observacoes: ${notes}`,175);
    for (const line of lines) { if(y > 278){pdf.addPage();y=20;} pdf.text(line,14,y);y+=6; }
  }
  pdf.save('lista-de-compras.pdf');
}
