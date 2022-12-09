import styles from './AnoIngresso.module.css';
import data from '../../data/Ano.json'


function AnoIngresso({anosvet, trocaAno}){
    anosvet=[]
    for(let i=0;i<Object.keys(data).length;i++){
        anosvet.push(Object.values(data)[i].ano);
    }
    console.log(anosvet)
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