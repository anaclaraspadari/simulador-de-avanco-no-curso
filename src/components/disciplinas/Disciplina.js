import { useState } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados}){
        
    // copia os dados completos
    const novoDado = { ...dadosCompletos };
    const [disciplinas, setDisciplinas]=useState({});

    const transfereDisciplina = () => {

        // REMOVER DISCIPLINA ATUAL DESTE SEMESTRE
        let dadoTransferido=false;
        if(dadoTransferido===false){
            novoDado['sems' + (semsatual+1)].push(dados);
            dadoTransferido=true;
        }

        if (dadoTransferido===true){

            let indexDado=novoDado['sems'+semsatual].indexOf(dados);
            novoDado['sems'+semsatual].splice(indexDado, 1);

            for(let key of Object.keys(novoDado)){
                console.log(novoDado[key]);    
                setDisciplinas(novoDado);
                console.log(disciplinas);
            }
            dadoTransferido=false;
            setDados(novoDado);
        }
    }

    
    // EMPURRAR AS DISCIPLINAS QUE DEPENDEM DESSA PARA O PROXIMO SEMESTRE



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