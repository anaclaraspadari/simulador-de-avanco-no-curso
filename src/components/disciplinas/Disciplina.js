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
        console.log("chamou a função armazenaDependencias");
        let discdep=[]
        
        console.log(novoDado)
            console.log("chamou a função armazenaDependencias pela 2 vez");
            const pegaDiscs=Object.values(novoDado);

                console.log("chamou a função armazenaDependencias pela 3 vez");

                console.log("pegaDiscs:")
                console.log(pegaDiscs);

                for(let i=0;i<pegaDiscs.length;i++){

                    console.log("chamou a função armazenaDependencias pela 4 vez");
                    const percorreDiscs=Object.values(pegaDiscs[i])
                    console.log("percorreDiscs:")
                    console.log(percorreDiscs);

                    for(let j=0; j<percorreDiscs.length;j++){
                        console.log("chamou a função armazenaDependencias pela 5 vez");
                        const percorreCadaDisc=Object.entries(percorreDiscs[j])
                        console.log("percorreCadaDisc:")
                        console.log(percorreCadaDisc);
                    }

                }



                // for(let j of Object.keys(novoDado[i])){

                

                //     for(let k of novoDado[i+1][j+1].dependencia){

                //         //tentando pegar as dependencias
                //         console.log("novoDado[i][j].dependencias:")
                //         console.log(novoDado[i+1][j+1].dependencia[k]);
                        
                //         if(novoDado[i+1][j+1].dependencia[k]===indexDado){
                //             discdep=novoDado[i+1][j+1].dependencia[k];
                //         }
                //     }
                }
            
            //(setDependencias({nomedisc: novoDado[indexDado], discdependencias: discdep}));

    //console.log(dependencias);

    useEffect(()=>{
        setDependencias({nomedisc: undefined, discdependencias: []});
    },[]);


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