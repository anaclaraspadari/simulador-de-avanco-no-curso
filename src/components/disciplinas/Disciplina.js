import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados}){
    const transfereDisciplina = () => {
        
        // copia os dados completos
        const novoDado = { ...dadosCompletos }; 

        // REMOVER DISCIPLINA ATUAL DESTE SEMESTRE
        let dadoTransferido=false;
        if(dadoTransferido===false){
            novoDado['sems' + (semsatual+1)].push(dados);
            dadoTransferido=true;
        }
        if (dadoTransferido===true){
            let indexDado=novoDado['sems'+semsatual].indexOf(dados);
            console.log(indexDado);
            novoDado['sems'+semsatual].splice(indexDado, 1);
            
            dadoTransferido=false;
            setDados(novoDado);
        }
        
        // EMPURRAR AS DISCIPLINAS QUE DEPENDEM DESSA PARA O PROXIMO SEMESTRE

        
        
        //console.log({ novoDado });

    }

    return(
        <>
            <div className={styles.DisciplinaDiv} id={'disc'+dados.codigo}>
                <h4>{dados.nome}</h4>    
                <p onClick={() => transfereDisciplina()}><AiOutlineArrowDown/></p>
            </div>  
        </>
    )
}

export default Disciplina;