import { useEffect, useState } from 'react';
import Disciplina from './Disciplina.js';
import styles from './DiscPorSemestre.module.css';
import data from '../../data/Disciplinas.json'

function DiscPorSemestre({ nsemestre, dados, setDados }){

    // const [dadosEstudante, setDadosEstudante] = useState(data);
    
    /*
    const discdiv=new Array(9)
    for(let k=0;k<9;k++){
        discdiv.push(k);
    }
    */

    useEffect(() => {
        //console.log("Os dados do estudante mudaram");
        
        //console.log({ dados });
    }, [dados])

    return(
        <>
            <div className={styles.SemestreDiv}>
                {dados['sems' + nsemestre]?.map((disc, index)=> {
                        //console.log({ nsemestre, index})
                        return (   
                            <Disciplina key={index} dados={disc} semsatual={nsemestre} dadosCompletos={dados} setDados={setDados}/>
                        )
                    })
                }
            </div>  
          
        </>
    );
}

export default DiscPorSemestre;