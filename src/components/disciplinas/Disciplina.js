import { useState, useEffect, useRef } from 'react';
import styles from './DiscPorSemestre.module.css';
import {AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineConsoleSql} from 'react-icons/ai'

function Disciplina({dados, semsatual, dadosCompletos, setDados, discRed, setDiscRed }){

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

        const emVermelho = [];

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
       
        const copiaDados = JSON.parse(JSON.stringify(dadosCompletos));

        // cada um dos semestres dos dadosCompletos
        for(let i=0;i<Object.keys(copiaDados).length;i++){
            const chave = Object.keys(copiaDados)[i];
            const semestre = copiaDados[chave];
            
            // passando por cada uma das disciplinas do semestre atual
            for (let d = 0; d < semestre.length; d++) {
                
                const disciplina = semestre[d];
                
                // verificar a lista de dependencias
                let todasAntes = true;
                //console.log('AQUUIII')

                for (let dl = 0; dl < disciplina.dependencia.length; dl++){

                    const dependencia = disciplina.dependencia[dl];

                    for(let sp = i; sp < Object.keys(copiaDados).length; sp++){
                        const chavep = Object.keys(copiaDados)[sp];
                        const semestrePosterior = copiaDados[chavep];

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
                    // disciplina.cor = 'red';
                    emVermelho.push(disciplina.codigo)
                    // setDados(copiaDados)
                }
            }
        }

        console.log('Disciplinas em vermelho serao');
        console.log(emVermelho)
        
        // SÓ FAZER ISSO SE O EM VERMELHO FOR DIFERENTE DO discRed
        setDiscRed(emVermelho)
    }

    useEffect(() => {
        //console.log("USE EFFECT DADOS!");
        validaDependencias();
    }, [dados]);    // toda vez que o dados mudar, ele executa o useEffect
                    // consequentemente chama o valida dependencias

    return(
        <>
            <div className={styles.DisciplinaDiv} style={{backgroundColor: discRed.includes(dados.codigo) ? 'red' : '#172496'}} id={'disc'+dados.codigo}>
                <h4>{dados.nome}</h4>    
                <button className={styles.transfereDisc} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} onClick={() => transfereDisciplinaParaBaixo()}><AiOutlineArrowDown/></button>
                <button className={styles.transfereDisc} style={{backgroundColor: dados?.cor ? dados.cor : '#172496'}} onClick={() => transfereDisciplinaParaCima()}><AiOutlineArrowUp/></button>
            </div>  
        </>
    )
}

export default Disciplina; 