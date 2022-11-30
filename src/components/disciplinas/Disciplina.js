import { useState, useEffect, useRef } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados}){

    const novoDado = { ...dadosCompletos };
    let dadoTransferido=false;
    let indexDado=novoDado['sems'+semsatual].indexOf(dados);
    const [dependencias, setDependencias]=useState({});

    const transfereDisciplina = () => {
        if(dadoTransferido===false){
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
        transfereDisciplina().then((discdep)=>{
            for(let i of novoDado){

                console.log("novoDado[i]:")
                console.log(novoDado[i])

                for(let j of novoDado[i]){

                    console.log("novoDado[i][j]:")
                    console.log(novoDado[i+1][j+1])

                    for(let k of novoDado[i+1][j+1].dependencia){

                        //tentando pegar as dependencias
                        console.log("novoDado[i][j].dependencias:")
                        console.log(novoDado[i+1][j+1].dependencia[k]);
                        
                        if(novoDado[i+1][j+1].dependencia[k]===indexDado){
                            discdep=novoDado[i+1][j+1][k];
                            setDependencias({nomedisc: novoDado[indexDado], discdependencias: discdep});
                        }
                    }
                }
            }
        });
    }    
    console.log(dependencias);

    useEffect(()=>{
        setDependencias({nomedisc: undefined, discdependencias: []});
    },[])


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