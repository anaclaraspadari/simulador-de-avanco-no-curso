import { useState, useEffect, useRef } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineConsoleSql} from 'react-icons/ai'

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

        /*
        novoSemestre.forEach(disc => {
            console.log("dependencias");
            if (disc.dependencia.includes(codTransferido)) {
                //console.log('DISC ' +disc.nome + ' depende da disciplina alterada');
                //disc.cor = 'red';
                //codTransferido = disc.codigo; // PODE TER UM ARRAY DE DEPENDENCIAS
            }
        });
        */
       
        // cada um dos semestres dos dadosCompletos
        for(let i=0;i<Object.keys(dadosCompletos).length;i++){
            const chave = Object.keys(dadosCompletos)[i];
            const semestre = dadosCompletos[chave];
            
            // passando por cada uma das disciplinas do semestre atual
            for (let d = 0; d < semestre.length; d++) {
                
                const disciplina = semestre[d];
                
                // verificar a lista de dependencias
                let todasAntes = true;
                //console.log('AQUUIII')

                for (let dl = 0; dl < disciplina.dependencia.length; dl++){

                    const dependencia = disciplina.dependencia[dl];

                    for(let sp = i; sp < Object.keys(dadosCompletos).length; sp++){
                        const chavep = Object.keys(dadosCompletos)[sp];
                        const semestrePosterior = dadosCompletos[chavep];

                        for (let discSemestre = 0; discSemestre < semestrePosterior.length; discSemestre++) {
                            let temDependenciaParaFrente = semestrePosterior[discSemestre].codigo  === dependencia;
                            if (temDependenciaParaFrente) {
                                todasAntes = false;
                            }
                        }

                    }
                }

                if (todasAntes === false) {
                    console.log('Resultado para a disciplina ')
                    console.log(disciplina.nome + '  ' +  todasAntes);
                    disciplina.cor = 'red';
                }
            }
        }
    }

    useEffect(() => {
        //console.log("USE EFFECT DADOS!");
        validaDependencias();
    }, [dados]);    // toda vez que o dados mudar, ele executa o useEffect
                    // consequentemente chama o valida dependencias

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