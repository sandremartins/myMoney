import React, { useState } from 'react'
const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  //gestao form
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }
  const salvarMovimentacao = async() => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
      //console.log(valor, descricao)
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0.0)
    }
  }
  return(
    <tr>
      <td>
        <input type='text' value={descricao} onChange={onChangeDescricao}/>
      </td>
      <td>
        <input type='text' value={valor} onChange={onChangeValor}/>
        <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
      </td>
    </tr>
  )
}
export default AdicionarMovimentacao