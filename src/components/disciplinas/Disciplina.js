import { useState, useEffect, useRef } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados}){

    const novoDado = { ...dadosCompletos };
    let dadoTransferido=false;
    let indexDado=novoDado['sems'+semsatual].indexOf(dados);
    const [dependencias, setDependencias]=useState({});
    const [discTransferida, setDiscTransferida] = useState(null);

    const transfereDisciplinaParaBaixo = () => {
        if(dadoTransferido===false){
            dados.cor = '#172496'
            dados.semestre = semsatual + 1;
            novoDado['sems' + (semsatual+1)].push(dados);
            dadoTransferido=true;
            validaDependencias();
        }
        if (dadoTransferido===true){
            novoDado['sems'+semsatual].splice(indexDado, 1);
            setDados(novoDado);
        }
    }

    const transfereDisciplinaParaCima = () => {
        if(dadoTransferido===false){
            dados.cor = '#172496'
            dados.semestre = semsatual - 1;
            novoDado['sems' + (semsatual-1)].push(dados);
            dadoTransferido=true;
            validaDependencias();
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

    const validaDependencias=()=>{
        console.log("chamou a função validaDependencias");
        let listasems=[];
        let listadiscs=[];
        console.log({ novoDado });
        
        // const pegaDiscs=Object.values(novoDado);
        console.log('A disciplina transferida foi: ');
        console.log({
            dados
        });


        const novoSemestre = novoDado['sems' + (semsatual+1)];
        console.log({
            novoSemestre
        });

        let codTransferido = dados.codigo;
        novoSemestre.forEach(disc => {
            console.log("dependencias de "+disc.nome);
            console.log(disc.dependencia);
            if (disc.dependencia.includes(codTransferido)) {
                //console.log('DISC ' +disc.nome + ' depende da disciplina alterada');
                disc.cor = 'red';
                codTransferido = disc.codigo; // PODE TER UM ARRAY DE DEPENDENCIAS
            }
        });

    }



    useEffect(()=>{
        setDependencias({nomedisc: undefined, discdependencias: []});
    },[]);


    return(
        <>
            <div className={styles.DisciplinaDiv} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} id={'disc'+dados.codigo}>
                <h4>{dados.nome}</h4>    
                <button className={styles.transfereDisc} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} onClick={() => transfereDisciplinaParaBaixo()}><AiOutlineArrowDown/></button>
                <button className={styles.transfereDisc} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} onClick={() => transfereDisciplinaParaCima()}><AiOutlineArrowUp/></button>
            </div>  
        </>
    )
}

export default Disciplina;