import styles from './SemsIngresso.module.css'

function SemsIngresso({semsvet, trocaSems}){
    semsvet=[1,2];
    return(
        <div className={styles.SemsIngressoDiv}>
            <h3>Semestre de Ingresso</h3>
            <select name="SemsIngressoSelect" onChange={(v) => {
                console.log('PASSEI AQUI... ' + v.target.value)
                trocaSems(v.target.value)
            }}>
                <option value="Sems" selected>Semestre</option>
                {semsvet.map((sems, index)=>(
                    <option key={index} value={sems}>{sems+"º Semestre"}</option>
                ))}
            </select>
        </div>
    )
}

export default SemsIngresso