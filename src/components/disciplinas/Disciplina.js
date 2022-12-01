import { useState, useEffect, useRef } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados}){

    const novoDado = { ...dadosCompletos };
    let dadoTransferido=false;
    let indexDado=novoDado['sems'+semsatual].indexOf(dados);
    const [dependencias, setDependencias]=useState({});
    const [discTransferida, setDiscTransferida] = useState(null);

    const transfereDisciplina = () => {
        if(dadoTransferido===false){
            dados.cor = '#172496'
            dados.semestre = semsatual + 1;
            novoDado['sems' + (semsatual+1)].push(dados);
            dadoTransferido=true;
            armazenaDependencias();
        }
        if (dadoTransferido===true){
            novoDado['sems'+semsatual].splice(indexDado, 1);
            setDados(novoDado);
        }
    }

    useRef(()=>{
        dadoTransferido=false;
        indexDado=novoDado['sems'+semsatual].indexOf(dados);
    })

    const armazenaDependencias=()=>{
        console.log("chamou a função armazenaDependencias");
        let discdep=[]
        console.log({ novoDado })
        
        // const pegaDiscs=Object.values(novoDado);
        console.log('A disciplina transferida foi: ');
        console.log({
            dados
        })

        let codTransferido = dados.codigo;


        //for (let semestreVerificar = 0; semestreVerificar < 10; semestreVerificar++){
        let semestreVerificar = dados.semestre

        const novoSemestre = novoDado['sems' + (semestreVerificar)];
        console.log({
            novoSemestre
        })

        novoSemestre.forEach(disc => {
            if (disc.dependencia.includes(codTransferido)) {
                console.log('DISC ' +disc.nome + ' depende da disciplina alterada');
                disc.cor = 'red';
                codTransferido = disc.codigo; // PODE TER UM ARRAY DE DEPENDENCIAS
                
            }
        })

        
        //}
        
        setDados(novoDado);

    }



    useEffect(()=>{
        setDependencias({nomedisc: undefined, discdependencias: []});
    },[]);


    return(
        <>
            <div className={styles.DisciplinaDiv} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} id={'disc'+dados.codigo}>
                <h4>{dados.nome}</h4>    
                <p onClick={() => transfereDisciplina()}><AiOutlineArrowDown/></p>
            </div>  
        </>
    )
}

export default Disciplina;