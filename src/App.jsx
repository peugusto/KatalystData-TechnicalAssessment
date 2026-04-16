import { useEffect, useState } from 'react'
import './App.css'
import { GetShuffledTeams } from './util/GetShuffledTeams'
import GetFlags from './util/GetFlags'

function App() {
  const [groups, setGroups] = useState([])
  const [groupTables, setGroupTables] = useState([]) 

  useEffect(() => {
    async function initSimulacao() {
        const teams = await GetShuffledTeams()
        setGroups(teams)
      

        const tables = teams.map(group => {
        const matches = gerarPartidas(group)
        const matchesComPlacar = simularResultados(matches)
        console.log(matches)
        return calcularClassificacao(group, matchesComPlacar)
      })
      
      setGroupTables(tables)
    }
    initSimulacao()
  }, [])


  const gerarPartidas = (group) => {
    const [t1, t2, t3, t4] = group
    return [
      { home: t1, away: t2 }, { home: t3, away: t4 }, 
      { home: t1, away: t3 }, { home: t2, away: t4 }, 
      { home: t1, away: t4 }, { home: t2, away: t3 }  
    ]
  }

  
  const simularResultados = (matches) => {
    return matches.map(m => ({
      ...m,
      golsHome: Math.floor(Math.random() * 5),
      golsAway: Math.floor(Math.random() * 5)
    }))
  }

 
  const calcularClassificacao = (group, matches) => {
    let stats = group.map(team => ({
      ...team,
      pts: 0, sg: 0, gp: 0
    }))

    matches.forEach(m => {
      const h = stats.find(t => t.token === m.home.token)
      const a = stats.find(t => t.token === m.away.token)

      h.gp += m.golsHome
      h.sg += (m.golsHome - m.golsAway)
      a.gp += m.golsAway
      a.sg += (m.golsAway - m.golsHome)

      if (m.golsHome > m.golsAway) h.pts += 3
      else if (m.golsAway > m.golsHome) a.pts += 3
      else { h.pts += 1; a.pts += 1 }
    })

    return stats.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      if (b.sg !== a.sg) return b.sg - a.sg
      return Math.random() - 0.5 
    })
  }

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
      </div>
    </div>
  )
}

export default App