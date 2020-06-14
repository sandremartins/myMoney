import React from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacoesApi } from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({ match }) => {
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacoesApi(match.params.data)

  const salvarMovimentacao = async(dados) => {
      await salvarNovaMovimentacao(dados)
      movimentacoes.refetch()
      await sleep(1000)
      //infoMes.refetch()
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  const removerMovimentacaoClick = async(id) => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)
    movimentacoes.refetch()
    await sleep(1000)
    //infoMes.refetch()
  }

  //return <pre>{JSON.stringify(data.error === 'Permission denied')}</pre>

  if(movimentacoes.error === 'Permission denied'){
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h1>Movimentações</h1>
      <InfoMes data={match.params.data} />
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            { movimentacoes.data &&
              Object
                .keys(movimentacoes.data)
                .map(movimentacao => {
                  return (
                    <tr key={movimentacao}>
                      <td>{movimentacoes.data[movimentacao].descricao}</td>
                      <td className='text-right'>
                        {movimentacoes.data[movimentacao].valor} {' '}
                        <button className='btn btn-danger' onClick={() => removerMovimentacaoClick(movimentacao)}>-</button>
                      </td>
                    </tr>
                  )
                })
            }
            <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao}/>
          </tbody>
        </table>
    </div>
  )
}

export default Movimentacoes