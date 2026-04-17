import { useEffect, useState } from 'react'
import '../App.css'
import { GetShuffledTeams } from '../util/GetShuffledTeams'
import GetFlags from '../util/GetFlags'
import { calcularClassificacao, gerarPartidas, simularResultados } from '../util/SimulationFunctions'
import { useNavigate } from 'react-router-dom'

export default function Groups() {
  const [groups, setGroups] = useState([])
  const [groupTables, setGroupTables] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    async function initSimulacao() {
      const teams = await GetShuffledTeams()
      setGroups(teams)


      const tables = teams.map(group => {
        const matches = gerarPartidas(group)
        const matchesComPlacar = simularResultados(matches)
        return calcularClassificacao(group, matchesComPlacar)
      })

      setGroupTables(tables)
    }
    initSimulacao()
  }, [])



  return (
    <div className="container">
      <h1 className="title">Simulador Mundial 2026</h1>

      <div className="grid-groups">
        {groupTables.map((table, idx) => (
          <div key={idx} className="group-card">
            <div className="group-header">GRUPO {String.fromCharCode(65 + idx)}</div>
            <table className="group-table">
              <thead>
                <tr>
                  <th align="left">Seleção</th>
                  <th>P</th>
                  <th>SG</th>
                </tr>
              </thead>
              <tbody>
                {table.map((team, pos) => (
                  <tr key={team.token} className={pos < 2 ? 'classificado' : ''}>
                    <td className="team-name-col">
                      <img src={GetFlags(team.token)} alt="" className="mini-flag" />
                      {team.nome}
                    </td>
                    <td>{team.pts}</td>
                    <td>{team.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <button
          disabled={!groupTables.length}
          onClick={() => navigate('/mata-mata', { state: { groupTables } })}
        >
          Ir para o Mata-Mata
        </button>
      </div>
    </div>
  )
}
