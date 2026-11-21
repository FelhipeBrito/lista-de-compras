export const CATEGORY_SEEDS = {
  Mercearia: ['Feijão','Óleo de soja','Sal','Açúcar','Café','Molho de tomate','Macarrão','Milho','Farinha de trigo','Farinha de mandioca','Chá','Fermento Químico','Azeite','Pães','Bolos','Pão de forma','Granola','Biscoito Doce','Biscoito de Sal','Adoçantes','Ketchup','Maionese'],
  Proteínas: ['Carnes boi','Linguiça','Peixes','Ovos','Frango Peito','Frango Coxa','Frango Sobrecoxa','Frango Tulipa','Farinha de trigo','Presunto','Sardinha','Salsicha','Bacon','Costelinha'],
  Bebidas: ['Água','Suco','Refrigerante','Cerveja'],
  Utilidades: ['Fósforo','Guardanapo','Lâmpadas','Papel Alumínio','Papel Filme','Papel toalha','Protetor de fogão','Vela'],
  Limpeza: ['Água Sanitária','Álcool em gel','Amaciante','Desinfetante','Detergente','Esponja de aço','Esponja de pia','Flanelas','Inseticida','Lustra-móveis','Luvas plásticas','Sabão em barra','Sabão em pó','Sacos de lixo','Álcool 90%'],
  Higiene: ['Absorventes','Água oxigenada','Algodão','Barbeador','Curativos','Creme dental','Desodorante','Escova de dente','Esparadrapo','Fio dental','Gaze','Hastes flexíveis','Papel higiênico','Sabonete','Shampoo','Condicionador'],
  Laticínios: ['Leite','Manteiga','Iogurte','Margarina','Queijo','Requeijão','Creme de leite','Leite Condensado'],
};
export const CATEGORIES = Object.keys(CATEGORY_SEEDS);
export function createDefaultItems() {
  return Object.entries(CATEGORY_SEEDS).flatMap(([category, names]) => names.map((name, index) => ({
    id: `seed-${category}-${index}`, name, category, selected: true, checked: false,
    quantity: 1, unit: 'un', priceCents: null,
  })));
}
