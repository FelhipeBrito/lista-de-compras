import { Children, useState } from "react";
import Checked from "./Checked";

function MarketItens(props) {

  const listaInicialbebidas = [
    {name:"Água",buy: false},
    {name:"Suco",buy:false},
    {name:"Refrigerante",buy:false},
    {name:"Cerveja",buy:false}];

  const mercearia = [
    "Feijão",
    "Óleo de soja",
    "Sal",
    "Açúcar",
    "Café",
    "Molho de tomate",
    "Macarrão",
    "Milho",
    "Farinha de trigo",
    "Farinha de mandioca",
    "Chá",
    "Fermento Químico",
    "Azeite",
    "Pães",
    "Bolos",
    "Pão de forma",
    "Granola",
    "Biscoito Doce",
    "Biscoito de Sal",
    "Adoçantes",
    "Ketchup",
    "Maionese",
  ];
  const proteinas = [
    "Carnes boi",
    "Linguiça",
    "Peixes",
    "Ovos",
    "Frango Peito",
    "Frango Coxa",
    "Frango Sobrecoxa",
    "Frango Tulipa",
    "Farinha de trigo",
    "Presunto",
    "Sardinha",
    "Salsicha",
    "Bacon",
    "Costelinha",
  ];
  const higiene = [
    "Absorventes",
    "Água oxigenada",
    "Algodão",
    "Barbeador",
    "Curativos",
    "Creme dental",
    "Desodorante",
    "Escova de dente",
    "Esparadrapo",
    "Fio dental",
    "Gaze",
    "Hastes flexíveis",
    "Papel higiênico",
    "Sabonete",
    "Shampoo",
    "Condicionador",
  ];

  const limpeza = [
    "Água Sanitária",
    "Álcool em gel",
    "Amaciante",
    "Desinfetante",
    "Detergente",
    "Esponja de aço",
    "Esponja de pia",
    "Flanelas",
    "Inseticida",
    "Lustra-móveis",
    "Luvas plásticas",
    "Sabão em barra",
    "Sabão em pó",
    "Sacos de lixo",
    "Álcool 90%",
  ];
  const laticinios = [
    "Leite",
    "Manteiga",
    "Iogurte",
    "Margarina",
    "Queijo",
    "Requeijão",
    "Creme de leite",
    "Leite Condensado",
  ];
  const utilidades = [
    "Fósforo",
    "Guardanapo",
    "Lâmpadas",
    "Papel Alumínio",
    "Papel Filme",
    "Papel toalha",
    "Protetor de fogão",
    "Vela",
  ];


  
  function iteM(index){
    const beer = listaInicialbebidas[index].name
    return(
      beer
    )
  }
  
  

  return (
    <h1>{props.children}</h1>
  )
}

export default MarketItens;
