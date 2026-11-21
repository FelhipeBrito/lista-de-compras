import { get, set } from 'idb-keyval';
import { createDefaultItems, CATEGORIES } from '../data/catalog';

const KEY = 'shopping-v2';
const isNumber = n => typeof n === 'number' && Number.isFinite(n);
export function sanitizeItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (typeof raw.name !== 'string' || !raw.name.trim()) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : crypto.randomUUID(),
    name: raw.name.trim().slice(0, 120),
    category: CATEGORIES.includes(raw.category) ? raw.category : 'Utilidades',
    selected: raw.selected !== false,
    checked: Boolean(raw.checked),
    quantity: isNumber(raw.quantity) && raw.quantity >= 0 ? Math.min(raw.quantity, 100000) : 1,
    unit: ['un', 'kg', 'L'].includes(raw.unit) ? raw.unit : 'un',
    priceCents: Number.isSafeInteger(raw.priceCents) && raw.priceCents >= 0 ? Math.min(raw.priceCents, 1000000000) : null,
  };
}
export function normalizeData(data) {
  if (!data || !Array.isArray(data.items)) throw new Error('Backup inválido.');
  const seen = new Set();
  const items = data.items.slice(0, 3000).map(sanitizeItem).filter(item => {
    if (!item) return false;
    if (seen.has(item.id)) item.id = crypto.randomUUID();
    seen.add(item.id);
    return true;
  });
  const history = Array.isArray(data.history) ? data.history.slice(0, 100).filter(x => x && typeof x === 'object').map(x => ({
    id: typeof x.id === 'string' ? x.id : crypto.randomUUID(),
    date: typeof x.date === 'string' ? x.date.slice(0, 30) : '',
    items: Array.isArray(x.items) ? x.items.slice(0, 3000).map(sanitizeItem).filter(Boolean) : [],
  })) : [];
  return {version: 2, items, history, budgetCents: Number.isSafeInteger(data.budgetCents) && data.budgetCents >= 0 ? data.budgetCents : null, notes: typeof data.notes === 'string' ? data.notes.slice(0, 5000) : ''};
}
export async function loadData() {
  try {
    const stored = await get(KEY);
    if (stored) return normalizeData(stored);
  } catch (error) { console.error('Não foi possível ler os dados locais:', error); }
  const defaults = createDefaultItems();
  // The former app used the same localStorage key for all categories. Import only
  // unambiguous extra products; the built-in category edits were never persisted.
  try {
    const old = JSON.parse(localStorage.getItem('itens') || '[]');
    if (Array.isArray(old)) old.forEach((item) => {
      if (typeof item?.texto === 'string' && item.texto.trim()) defaults.push({
        id: crypto.randomUUID(), name: item.texto.trim().slice(0, 120), category: 'Utilidades',
        selected: true, checked: Boolean(item.marcado), quantity: 1, unit: 'un', priceCents: null,
      });
    });
  } catch { /* Legacy data may not be valid JSON. */ }
  return {version: 2, items: defaults, history: [], budgetCents: null, notes: ''};
}
export async function saveData(data) { await set(KEY, normalizeData(data)); }
