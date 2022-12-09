import { useEffect, useState } from 'react';
import Disciplina from './Disciplina.js';
import styles from './DiscPorSemestre.module.css';
import data from '../../data/Disciplinas.json'

function DiscPorSemestre({ nsemestre, dados, setDados, discRed, setDiscRed, transferida, setTransferida }){

    // useEffect(() => {
    // }, [dados])

    return(
        <>
            <div className={styles.SemestreDiv}>
                {dados['sems' + nsemestre]?.map((disc, index)=> {
                        //console.log({ nsemestre, index})
                        return (   
                            <Disciplina 
                                key={index} 
                                dados={disc} 
                                semsatual={nsemestre} 
                                dadosCompletos={dados} 
                                setDados={setDados}
                                discRed = { discRed }
                                setDiscRed = { setDiscRed }
                                transferida={transferida}
                                setTransferida={setTransferida}
                            />
                        )
                    })
                }
            </div>  
          
        </>
    );
}

export default DiscPorSemestre;