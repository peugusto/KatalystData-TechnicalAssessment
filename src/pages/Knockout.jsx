import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import './Knockout.css';
import GetFlags from '../util/GetFlags';
function Knockout() {
  const { state } = useLocation();
  const groupTables = state?.groupTables;


  
  const simularPartidaMataMata = (t1, t2) => {
    let g1 = Math.floor(Math.random() * 5);
    let g2 = Math.floor(Math.random() * 5);

    let penaltis = null;
    let winner = null;

    if (g1 > g2) {
      winner = t1;
    } else if (g2 > g1) {
      winner = t2;
    } else {

      const p1 = Math.floor(Math.random() * 3) + 3;
      let p2 = Math.floor(Math.random() * 3) + 3;
      
  
      if (p1 === p2) p2 = p1 > 4 ? p1 - 1 : p1 + 1;
      
      penaltis = { p1, p2 };
      winner = p1 > p2 ? t1 : t2;
    }

    return { t1, t2, g1, g2, penaltis, winner };
  };
  
  const resultados = useMemo(() => {
    if (!groupTables) return null;

    const classificados = groupTables.map(group => ({
      first: group[0],
      second: group[1]
    }));


    const oit = [
      simularPartidaMataMata(classificados[0].first, classificados[1].second),
      simularPartidaMataMata(classificados[2].first, classificados[3].second),
      simularPartidaMataMata(classificados[4].first, classificados[5].second),
      simularPartidaMataMata(classificados[6].first, classificados[7].second),
      simularPartidaMataMata(classificados[1].first, classificados[0].second),
      simularPartidaMataMata(classificados[3].first, classificados[2].second),
      simularPartidaMataMata(classificados[5].first, classificados[4].second),
      simularPartidaMataMata(classificados[7].first, classificados[6].second)
    ];


    const qua = [
      simularPartidaMataMata(oit[0].winner, oit[1].winner),
      simularPartidaMataMata(oit[2].winner, oit[3].winner),
      simularPartidaMataMata(oit[4].winner, oit[5].winner),
      simularPartidaMataMata(oit[6].winner, oit[7].winner)
    ];

  
    const semi = [
      simularPartidaMataMata(qua[0].winner, qua[1].winner),
      simularPartidaMataMata(qua[2].winner, qua[3].winner)
    ];


    const fin = simularPartidaMataMata(semi[0].winner, semi[1].winner);

    return { oitavas: oit, quartas: qua, semifinal: semi, final: fin };
  }, [groupTables]);

  if (!resultados) {
    return <div className="error-message">Volte e gere os grupos primeiro</div>;
  }

  const { oitavas, quartas, semifinal, final } = resultados;

  const json = {
    "equiepA":final.t1,
    "equiepB":final.t2,
    "golsEquipeA": final.g1, 
    "golsEquipeB": final.g2,
    "golsPenaltyTimeA": final.penaltis ? final.penaltis.p1 : 0,
    "golsPenaltyTimeA": final.penaltis ? final.penaltis.p2 : 0,
  }

  const renderMatch = (m) => (
    <div className="match-card">
      <div className={`team-row ${m.winner === m.t1 ? 'is-winner' : ''}`}>
        <span className="team-name">{<img src={GetFlags(m.t1.token)}/>}{m.t1.nome.substring(0,3)}</span>
        <div className="score-area">
          {m.penaltis && <span className="penalty-score">({m.penaltis.p1})</span>}
          <span className="team-score">{m.g1}</span>
        </div>
      </div>
      <div className={`team-row ${m.winner === m.t2 ? 'is-winner' : ''}`}>
        <span className="team-name">{<img src={GetFlags(m.t2.token)}/>}{m.t2.nome.substring(0,3)}</span>
        <div className="score-area">
          {m.penaltis && <span className="penalty-score">({m.penaltis.p2})</span>}
          <span className="team-score">{m.g2}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bracket-layout">
      <section className="bracket-side">
        <div className="round-col oitavas">
          <h4 className="round-title">OITAVAS</h4>
          {renderMatch(oitavas[0])}
          {renderMatch(oitavas[1])}
          {renderMatch(oitavas[2])}
          {renderMatch(oitavas[3])}
        </div>

        <div className="round-col quartas">
          <h4 className="round-title">QUARTAS</h4>
          
         {renderMatch(quartas[0])}
          {renderMatch(quartas[1])}
        
        </div>

        <div className="round-col semis">
          <h4 className="round-title">SEMIFINAL</h4>
          {renderMatch(semifinal[0])}
        </div>
      </section>


      <section className="bracket-center">
        <div className="final-stage">
          <h4 className="round-title">FINAL</h4>
          {renderMatch(final)}
          <div className="trophy-display">
            <p>FIFA WORLD CUP</p>
            <h2 className="champion-label">🏆 CAMPEÃO</h2>
            <h1 className="champion-name"><img src={GetFlags(final.winner.token)}/></h1>
          </div>
        </div>
      </section>


      <section className="bracket-side">
        <div className="round-col semis">
          <h4 className="round-title">SEMIFINAL</h4>
          {renderMatch(semifinal[1])}
        </div>

        <div className="round-col quartas">
          <h4 className="round-title">QUARTAS</h4>
          {renderMatch(quartas[2])}
          {renderMatch(quartas[3])}
        </div>

        <div className="round-col oitavas">
          <h4 className="round-title">OITAVAS</h4>
          {renderMatch(oitavas[4])}
          {renderMatch(oitavas[5])}
          {renderMatch(oitavas[6])}
          {renderMatch(oitavas[7])}
        </div>
      </section>
    </div>
  );
}

export default Knockout;