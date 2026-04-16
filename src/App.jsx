import { useEffect, useState } from 'react'
import './App.css'
import { GetShuffledTeams } from './util/GetShuffledTeams'
import GetFlags from './util/GetFlags'

function App() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await GetShuffledTeams()
      setGroups(data)
    }
    fetchData()
  }, [])

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
              const flagUrl = GetFlags(team.token);
              return (
                <div key={team.token} className="team-row">
                  <div className="flag-box">
                    {flagUrl ? (
                      <img src={flagUrl} alt="" className="flag-img" />
                    ) : (
                      <span>🏳️</span>
                    )}
                  </div>
                  <span className="team-name">{team.nome}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default App