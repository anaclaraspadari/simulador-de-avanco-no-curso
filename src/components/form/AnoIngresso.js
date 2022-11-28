import styles from './AnoIngresso.module.css';


function AnoIngresso({anosvet, trocaAno}){
    anosvet=[2015,2016,2017,2018,2019,2020,2021,2022]
    return(
        <div className={styles.AnoIngressoDiv}>
            <h3>Ano de Ingresso</h3>
            <select name="AnoIngressoSelect" onChange={(v) => {
                console.log('PASSEI AQUI... ' + v.target.value)
                trocaAno(v.target.value)
            }}>
                <option value="Ano" selected>Ano</option>
                {anosvet.map((ano, index)=>(
                    <option key={index} value={ano}>{ano}</option>
                ))}
            </select>
        </div>
    )
}

export default AnoIngresso