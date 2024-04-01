import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import React, { useEffect, useState } from'react';

function App() {

const produto = {
  codigo : 0,
  nome : '',
  marca : ''
}

const [btnCadastrar, setBtnCadastrar] = useState(true);
const [produtos, setProdutos] = useState([])
const [objProduto, setObjProduto] = useState(produto);

useEffect(() => {
  fetch('http://localhost:8080/listar')
 .then(res => res.json())
 .then(returnConvert => setProdutos(returnConvert));
}, []);

const aoDigitar = (e) => {
  setObjProduto({...objProduto, [e.target.name]:e.target.value})
}

//Função para cadastrar produtos
const cadastrar = () => {
  fetch('http://localhost:8080/cadastrar', {
    method: 'post',
    body: JSON.stringify(objProduto),
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(returnConvert => {
    if (returnConvert.mensagem !== undefined) {
      alert(returnConvert.mensagem);
    }else{
      setProdutos([...produtos, returnConvert]);
      alert('Produto cadastrado com sucesso!');
      limparFormulario();
    }
  });
}

//Limpar caixas de texto do Formulario
const limparFormulario = () => {
  setObjProduto(produto)
  setBtnCadastrar(false)
}

//Selecionar produto para edição
const selecionarProduto = (index) => {
  setObjProduto(produtos[index]);
  setBtnCadastrar(false);
}


  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto}></Formulario>
      <Tabela vetor={produtos} selecionar={selecionarProduto}></Tabela>
    </div>
  );
}

export default App;
