import { useEffect, useMemo, useState } from 'react';
import { ShoppingBasket, Plus, Trash2, Search, Download, RotateCcw, History, X, CheckCircle2, Circle, ChevronDown, ChevronUp, Wallet, Upload } from 'lucide-react';
import { CATEGORIES, createDefaultItems } from './data/catalog';
import { loadData, normalizeData, saveData } from './services/storage';
import { toMoney, sumCents, exportCsv, exportPdf, downloadBlob } from './services/export';

const moneyInput = cents => cents === null ? '' : (cents / 100).toFixed(2).replace('.', ',');
function parseMoney(input) {
  let normalized = input.trim().replace(/\s/g, '').replace(/^R\$/i, '');
  if (!normalized) return null;
  const comma = normalized.lastIndexOf(',');
  const dot = normalized.lastIndexOf('.');
  if (comma !== -1 && dot !== -1) {
    normalized = comma > dot ? normalized.replace(/\./g, '').replace(',', '.') : normalized.replace(/,/g, '');
  } else if (comma !== -1) {
    normalized = normalized.replace(',', '.');
  } else if (dot !== -1 && /^\d{1,3}(\.\d{3})+$/.test(normalized)) {
    normalized = normalized.replace(/\./g, '');
  }
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return null;
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 && n <= 10000000 ? Math.round(n * 100) : null;
}
const freshItem = (name, category) => ({id:crypto.randomUUID(), name:name.trim(), category, selected:true, checked:false, quantity:1, unit:'un', priceCents:null});
const today = () => new Date().toLocaleDateString('pt-BR');
const Count = ({children}) => <span className="counter">{children}</span>;

function ItemRow({item, update, remove}) {
  const [priceDraft, setPriceDraft] = useState(moneyInput(item.priceCents));
  useEffect(() => setPriceDraft(moneyInput(item.priceCents)), [item.priceCents]);
  return <div className={`item ${item.checked?'completed':''}`}>
    <button type="button" className="check-button" aria-label={item.checked?'Desmarcar comprado':'Marcar comprado'} onClick={()=>update(item.id,{checked:!item.checked})}>{item.checked?<CheckCircle2 size={23}/>:<Circle size={23}/>}</button>
    <div className="item-body">
      <div className="item-header"><input className="product-name" aria-label="Nome do produto" value={item.name} maxLength={120} onChange={e=>update(item.id,{name:e.target.value})}/><strong className="item-subtotal">{item.priceCents === null ? 'Sem preço' : toMoney(Math.round(item.quantity * item.priceCents))}</strong></div>
      <div className="item-fields">
        <label><span>Quantidade</span><input type="number" min="0" max="100000" step={item.unit==='un'?'1':'0.01'} value={item.quantity} onChange={e=>update(item.id,{quantity:Math.max(0,Math.min(100000, Number(e.target.value)||0))})}/></label>
        <label><span>Unidade</span><select value={item.unit} onChange={e=>update(item.id,{unit:e.target.value})}><option value="un">un</option><option value="kg">kg</option><option value="L">L</option></select></label>
        <label className="price-field"><span>Preço unitário (R$)</span><input type="text" inputMode="decimal" placeholder="0,00" value={priceDraft} onChange={e=>setPriceDraft(e.target.value)} onBlur={()=>update(item.id,{priceCents:parseMoney(priceDraft)})} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/></label>
        <button className="icon-button delete-button" type="button" aria-label={`Excluir ${item.name}`} title="Excluir produto" onClick={()=>remove(item.id)}><Trash2 size={18}/></button>
      </div>
    </div>
  </div>;
}

function Category({category, items, onUpdate, onRemove, onAdd}) {
  const [open,setOpen] = useState(true);
  const [draft,setDraft] = useState('');
  const bought = items.filter(i=>i.checked).length;
  return <section className="category-card">
    <button className="category-heading" onClick={()=>setOpen(!open)} aria-expanded={open}><span><strong>{category}</strong><Count>{bought}/{items.length}</Count></span>{open?<ChevronUp size={20}/>:<ChevronDown size={20}/>}</button>
    {open && <div className="category-content">
      {items.length===0 && <p className="empty-category">Nenhum item encontrado nesta categoria.</p>}
      {items.map(item=><ItemRow key={item.id} item={item} update={onUpdate} remove={onRemove}/>)}
      <form className="add-item" onSubmit={e=>{e.preventDefault();if(draft.trim()){onAdd(draft,category);setDraft('');}}}><input aria-label={`Novo produto em ${category}`} placeholder="Adicionar produto..." value={draft} maxLength={120} onChange={e=>setDraft(e.target.value)}/><button type="submit" disabled={!draft.trim()}><Plus size={18}/> Adicionar</button></form>
    </div>}
  </section>;
}

export default function App() {
  const [data,setData] = useState(null);
  const [loadError,setLoadError] = useState('');
  const [saveError,setSaveError] = useState('');
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState('all');
  const [activeCategory,setActiveCategory] = useState('Todas');
  const [view,setView] = useState('shopping');
  const [exportMenu,setExportMenu] = useState(false);
  const [budgetDraft,setBudgetDraft] = useState('');
  const [confirmAction,setConfirmAction] = useState(null);
  const [notice,setNotice] = useState('');
  const [installPrompt,setInstallPrompt] = useState(null);
  const [installed,setInstalled] = useState(false);
  useEffect(()=>{
    const ready=e=>{e.preventDefault();setInstallPrompt(e);};
    const completed=()=>{setInstalled(true);setInstallPrompt(null);};
    window.addEventListener('beforeinstallprompt',ready);
    window.addEventListener('appinstalled',completed);
    return()=>{window.removeEventListener('beforeinstallprompt',ready);window.removeEventListener('appinstalled',completed);};
  },[]);
  const installApp=async()=>{if (!installPrompt) return;await installPrompt.prompt();await installPrompt.userChoice;setInstallPrompt(null);};
  const requestConfirmation=(title,description,action)=>setConfirmAction({title,description,action});
  const exportHistoryJson=record=>downloadBlob(JSON.stringify(record,null,2),'compra-'+record.date.slice(0,10)+'.json','application/json;charset=utf-8');

  useEffect(()=>{ let current=true; loadData().then(d=>{if(current){setData(d);setBudgetDraft(moneyInput(d.budgetCents));}}).catch(()=>{if(current)setLoadError('Não foi possível abrir os dados locais.');});return()=>{current=false;};},[]);
  useEffect(()=>{if(!data)return;const timer=setTimeout(()=>{saveData(data).then(()=>setSaveError('')).catch(()=>setSaveError('Não foi possível salvar. Exporte um backup e verifique o armazenamento do navegador.'));},400);return()=>clearTimeout(timer);},[data]);
  const update = (id,patch) => setData(current=>({...current,items:current.items.map(i=>i.id===id?{...i,...patch}:i)}));
  const remove = id => setData(current=>({...current,items:current.items.filter(i=>i.id!==id)}));
  const add = (name,category) => setData(current=>({...current,items:[...current.items,freshItem(name,category)]}));
  const selected = useMemo(()=>data?.items.filter(i=>i.selected) ?? [],[data]);
  const total = sumCents(selected);
  const purchased = sumCents(selected.filter(i=>i.checked));
  const count = selected.filter(i=>i.checked).length;
  const filtered = selected.filter(i=>(activeCategory==='Todas'||i.category===activeCategory) && (filter==='all'||(filter==='bought'?i.checked:!i.checked)) && i.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));
  const missingPrice = selected.filter(i=>i.priceCents===null).length;
  const finalize = () => {
    if(!selected.length)return;
    requestConfirmation('Finalizar compra','Salvar esta compra no histórico e preparar a próxima? Os produtos personalizados serão mantidos.',()=>{
      setData(current=>({...current,history:[{id:crypto.randomUUID(),date:new Date().toISOString(),items:current.items.filter(i=>i.selected).map(i=>({...i}))},...current.history].slice(0,100),items:current.items.map(i=>({...i,checked:false,priceCents:null,quantity:1})),notes:''}));
      setView('history');
    });
  };
  const reset = () => requestConfirmation('Reiniciar compra','Limpar preços, quantidades, marcações e observações? Seu catálogo e histórico serão preservados.',()=>{
    setData(current=>({...current,items:current.items.map(i=>({...i,checked:false,quantity:1,priceCents:null})),notes:''}));
  });
  const restoreCatalog=()=>requestConfirmation('Restaurar catálogo original','Substituir os produtos atuais pelos itens padrão? O histórico será preservado, mas as personalizações serão perdidas.',()=>{
    setData(current=>({...current,items:createDefaultItems(),notes:''}));
  });
  const exportBackup = ()=>downloadBlob(JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2),'compras-backup.json','application/json;charset=utf-8');
  const importBackup = async event => {
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    if(file.size>2_000_000){alert('O arquivo ultrapassa 2 MB.');return;}
    try {const imported=normalizeData(JSON.parse(await file.text()));if(window.confirm('Substituir todos os dados atuais por este backup?')){setData(imported);setBudgetDraft(moneyInput(imported.budgetCents));}}catch{alert('Não foi possível importar esse backup. Verifique o arquivo JSON.');}
  };
  if(loadError)return <main className="loading">{loadError}</main>;
  if(!data)return <main className="loading">Carregando lista de compras...</main>;
  return <div className="app-shell">
    <header className="topbar"><div className="brand"><div className="brand-icon"><ShoppingBasket size={24}/></div><div><span className="eyebrow">SEU SUPERMERCADO ORGANIZADO</span><h1>Minhas Compras</h1></div></div><span className="offline-pill">Sem conta · Offline</span></header>
    <main>
      <div className="intro"><div><h2>{view==='shopping'?'Lista de supermercado':'Histórico de compras'}</h2><p>Controle seus produtos, quantidades e gastos em um só lugar.</p></div><div className="top-actions"><button className={`action-button ${view==='shopping'?'selected-action':''}`} onClick={()=>setView('shopping')}><ShoppingBasket size={18}/> Lista</button><button className={`action-button ${view==='history'?'selected-action':''}`} onClick={()=>setView('history')}><History size={18}/> Histórico</button></div></div>
      {saveError&&<p className="warning" role="alert">{saveError}</p>}{notice&&<p className="warning" role="status">{notice} <button className="text-button" onClick={()=>setNotice('')}>Fechar</button></p>}
      {view==='shopping' ? <>
        <section className="summary" aria-label="Resumo da compra"><div className="summary-top"><div><span className="summary-caption">TOTAL ESTIMADO</span><h3>{toMoney(total)}</h3><span className="summary-description">{count} de {selected.length} produtos comprados</span></div><Wallet size={32} opacity={0.6}/></div><div className="progress-track"><div style={{width:`${selected.length?count/selected.length*100:0}%`}}/></div><div className="summary-bottom"><div><span>Comprado</span><strong>{toMoney(purchased)}</strong></div><div><span>Pendente</span><strong>{toMoney(total-purchased)}</strong></div></div>{missingPrice>0&&<p className="missing-price">{missingPrice} produto(s) ainda sem preço. O total pode estar incompleto.</p>}</section>
        {data.budgetCents!==null&&total>data.budgetCents&&<div className="budget-warning" role="alert"><Wallet size={22}/><div><strong>Orçamento excedido em {toMoney(total-data.budgetCents)}</strong><span>Você ultrapassou o limite de {toMoney(data.budgetCents)}. Revise os preços ou ajuste seu orçamento.</span></div></div>}
        <div className="utility-row"><label className="budget-field">Orçamento (R$)<input type="text" inputMode="decimal" placeholder="Opcional" value={budgetDraft} onChange={e=>setBudgetDraft(e.target.value)} onBlur={()=>setData(current=>({...current,budgetCents:parseMoney(budgetDraft)}))}/></label><span className="budget-status">{data.budgetCents===null?'Defina um limite opcional':total>data.budgetCents?`${toMoney(total-data.budgetCents)} acima do limite`:`${toMoney(data.budgetCents-total)} disponíveis`}</span></div>
        {installPrompt&&!installed&&<div className="install-banner"><span>Instale o aplicativo para abrir diretamente pelo seu dispositivo.</span><button className="action-button primary-button" onClick={installApp}>Instalar app</button></div>}
        <div className="toolbar"><div className="export-wrapper"><button className="action-button" onClick={()=>setExportMenu(!exportMenu)} aria-expanded={exportMenu}><Download size={18}/> Exportar <ChevronDown size={14}/></button>{exportMenu&&<div className="export-menu"><button onClick={()=>{exportCsv(selected);setExportMenu(false);}}>Planilha CSV</button><button onClick={async()=>{setExportMenu(false);try{await exportPdf(selected,data.notes);}catch{alert('Falha ao gerar PDF.');}}}>Documento PDF</button><button onClick={()=>{exportBackup();setExportMenu(false);}}>Backup JSON</button><label className="import-label"><Upload size={16}/> Importar backup JSON<input type="file" accept=".json,application/json" onChange={importBackup}/></label></div>}</div><button className="action-button" onClick={reset}><RotateCcw size={17}/> Reiniciar compra</button><button className="action-button" onClick={restoreCatalog}>Restaurar catálogo</button><button className="action-button primary-button" onClick={finalize} disabled={!selected.length}><CheckCircle2 size={17}/> Finalizar compra</button></div>
        <div className="filter-bar"><div className="search"><Search size={19}/><input aria-label="Buscar produtos" placeholder="Buscar produtos..." value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Limpar busca" onClick={()=>setQuery('')}><X size={16}/></button>}</div><select aria-label="Filtrar por categoria" value={activeCategory} onChange={e=>setActiveCategory(e.target.value)}><option>Todas</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select><select aria-label="Filtrar por situação" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Todos</option><option value="pending">Pendentes</option><option value="bought">Comprados</option></select></div>
        <div className="catalog-note"><div><strong>Catálogo de produtos</strong><p>Os produtos padrão já estão na sua lista. Edite os campos conforme compra.</p></div><button className="text-button" onClick={()=>requestConfirmation('Excluir produtos comprados','Excluir permanentemente os produtos marcados? Esta ação não altera o histórico.',()=>setData(current=>({...current,items:current.items.filter(i=>!i.checked)})))}>Excluir comprados</button></div>
        <div className="category-grid">{CATEGORIES.filter(c=>activeCategory==='Todas'||activeCategory===c).map(category=><Category key={category} category={category} items={filtered.filter(i=>i.category===category)} onUpdate={update} onRemove={remove} onAdd={add}/>)}</div>
        <section className="notes-card"><label htmlFor="notes">Observações</label><textarea id="notes" rows={4} placeholder="Anote marcas, promoções ou lembretes..." value={data.notes} onChange={e=>setData(current=>({...current,notes:e.target.value.slice(0,5000)}))}/></section>
      </> : <div className="history-area"><h3>Compras concluídas <Count>{data.history.length}</Count></h3>{data.history.length===0?<div className="empty-history"><History size={36}/><p>Você ainda não finalizou nenhuma compra.</p></div>:data.history.map(record=><article className="history-card" key={record.id}><div><strong>{new Date(record.date).toLocaleDateString('pt-BR')||record.date}</strong><p>{record.items.length} produtos</p></div><div><strong>{toMoney(sumCents(record.items))}</strong><button className="text-button" onClick={()=>exportCsv(record.items)}>CSV</button><button className="text-button" onClick={()=>exportPdf(record.items).catch(()=>setNotice("Não foi possível gerar o PDF."))}>PDF</button><button className="text-button" onClick={()=>exportHistoryJson(record)}>JSON</button><button className="icon-button" aria-label="Excluir registro" onClick={()=>requestConfirmation('Excluir compra do histórico','Esta exclusão é permanente. O catálogo atual não será alterado.',()=>setData(current=>({...current,history:current.history.filter(h=>h.id!==record.id)})))}><Trash2 size={16}/></button></div></article>)}</div>}
      {confirmAction&&<div className="dialog-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setConfirmAction(null);}}><section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description"><h3 id="dialog-title">{confirmAction.title}</h3><p id="dialog-description">{confirmAction.description}</p><div className="dialog-actions"><button className="action-button" autoFocus onClick={()=>setConfirmAction(null)}>Cancelar</button><button className="action-button primary-button" onClick={()=>{confirmAction.action();setConfirmAction(null);}}>Confirmar</button></div></section></div>}
    </main><footer>Seus dados ficam armazenados neste navegador. Faça backups regularmente.</footer>
  </div>;
}
