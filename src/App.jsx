import { useEffect, useState } from 'react'
import './App.css'
import { GetShuffledTeams } from './util/GetShuffledTeams'
import GetFlags from './util/GetFlags'

function App() {
  const [groups, setGroups] = useState([])
  // Estado para armazenar as posições: { indexDoGrupo: [token1, token2, token3] }
  const [standings, setStandings] = useState({})

  useEffect(() => {
    async function fetchData() {
      // Chama sua função utilitária que busca da API e embaralha
      const data = await GetShuffledTeams()
      setGroups(data)
    }
    fetchData()
  }, [])

  const handleTeamClick = (groupIndex, teamToken) => {
    setStandings((prev) => {
      const currentGroupStanding = prev[groupIndex] || []

      // Se o time já foi clicado, remove ele (toggle para desfazer)
      if (currentGroupStanding.includes(teamToken)) {
        return {
          ...prev,
          [groupIndex]: currentGroupStanding.filter((token) => token !== teamToken),
        }
      }

      // Limita a seleção aos 3 primeiros lugares
      if (currentGroupStanding.length >= 3) return prev

      // Adiciona o time na próxima posição disponível do grupo
      return {
        ...prev,
        [groupIndex]: [...currentGroupStanding, teamToken],
      }
    })
  }

  return (
    <div className="container">
      <h1 className="title">Mundial de Seleções 2026</h1>

      <div className="grid-groups">
        {groups.map((group, index) => (
          <div key={index} className="group-card">
            <div className="group-header">
              GRUPO {String.fromCharCode(65 + index)}
            </div>

            <div className="team-list">
              {group.map((team) => {
                const flagUrl = GetFlags(team.token)
                
                // Verifica a posição do time no ranking do grupo
                const groupStanding = standings[index] || []
                const positionIndex = groupStanding.indexOf(team.token)
                const position = positionIndex !== -1 ? positionIndex + 1 : null

                return (
                  <div 
                    key={team.token} 
                    className={`team-row ${position ? 'selected' : ''}`}
                    onClick={() => handleTeamClick(index, team.token)}
                  >
                    <div className="flag-box">
                      {flagUrl ? (
                        <img src={flagUrl} alt={team.nome} className="flag-img" />
                      ) : (
                        <span>🏳️</span>
                      )}
                    </div>
                    
                    <span className="team-name">{team.nome}</span>

                    {position && (
                      <div className="position-badge">
                        {position}º
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App