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

        

        for(let i=0;i<Object.keys(novoDado).length;i++){
            for(let j=0; j<Object.values(novoDado['sems'+i]).length;j++){
                listadiscs.push(j);
            }
        }

        // console.log("listasdiscs");
        // console.log(listadiscs);

        let ndiscs=listadiscs.length-1;
        //console.log("ndiscs: "+ndiscs);

        
        for (let semestreVerificar = 0; semestreVerificar < Object.keys(novoDado).length; semestreVerificar++){

            const novoSemestre = novoDado['sems' + (semestreVerificar)];
            // console.log({
            //     novoSemestre
            // });

            // console.log("novoSemestre[0].dependencia");
            // console.log(novoSemestre[0].dependencia);

            // const percorreNovoSemestre=Object.values(novoSemestre);
            // console.log("percorreNovoSemestre:");
            // console.log({percorreNovoSemestre});

            // console.log(`${semestreVerificar} < ${dados['sems'+semsatual][indexDado].semestre}`);
            // let disciplinaAdiantada = semestreVerificar < dados['sems'+semsatual][indexDado].semestre;

            

            
            for(let i=0;i<Object.values(novoSemestre).length;i++){
                // console.log("Object.values(novoSemestre)[i]")
                // console.log(Object.values(novoSemestre)[i]);
                let codTransferido = dados.codigo;
                novoSemestre.forEach(disc => {
                    // console.log("dependencias de "+disc.nome);
                    // console.log(disc.dependencia);
                    if (disc.dependencia.includes(codTransferido)) {
                        //console.log('DISC ' +disc.nome + ' depende da disciplina alterada');
                        disc.cor = 'red';
                        codTransferido = disc.codigo; // PODE TER UM ARRAY DE DEPENDENCIAS
                    }
                });
            }
        }
        
        // setDados(novoDado);

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