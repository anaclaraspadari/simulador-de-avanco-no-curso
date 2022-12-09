import React, { useState, useEffect } from 'react';
import {Collapse, Alert} from '@mui/material';
import './App.css';
import DiscPorSemestre from './components/disciplinas/DiscPorSemestre';
import Menu from './components/menu/Menu';
import data from './data/Disciplinas.json';

function App() {

    const [ano, setAno] = useState(null);
    const [sems, setSemestre] = useState(null);
    const [dadosEstudante, setDadosEstudante] = useState(data);
    const [loader, setLoader] = useState(false);
    const [discRed, setDiscRed] = useState([]);
    const [transferida, setTransferida]=useState(false);
    const [alert, setAlert]=useState(true);

    const titulosdiv=[]
    let contador=10;
    for(let i=0;i<contador;i++){
        titulosdiv.push(i);
    }

    let anoescolhido=parseInt(ano);

    useEffect(() => {
        console.log("Os dados do estudante mudaram");
        setLoader(false);
    }, [dadosEstudante])

    return (
        <div className="App">
            {(transferida===true) &&
                <Collapse in={alert}>
                    <Alert variant='filled' severity='error' onClose={()=>{setAlert(false)}}>As disciplinas em vermelho dependem da aprovação na disciplina transferida</Alert>
                </Collapse>
            }
            <h1>Quando é que eu me formo?</h1>
            <Menu 
                fnAno={setAno}
                fnSemestre={setSemestre}
            />
            {(sems!==null && ano!==null) &&
                titulosdiv.map((semestre, index)=>(
                  <>
                        { (sems==='1')? 
                            <h2 key={index}>{parseInt((index/2)+anoescolhido)}/{(semestre = index % 2 === 0 ? '1' : '2')+"º Semestre"}</h2>
                        : 
                            <h2 key={index}>{parseInt((index/2)+anoescolhido+0.5)}/{(semestre = index % 2 === 0 ? '2' : '1')+"º Semestre"}</h2>
                        }
                        <DiscPorSemestre key={index} 
                            nsemestre={index} 
                            dados={dadosEstudante} 
                            setDados={setDadosEstudante} 
                            discRed = {discRed}
                            setDiscRed = { setDiscRed }
                            transferida={transferida}        
                            setTransferida={setTransferida}
                        />  
                    </>
                ))
            }
        </div>
    );
}

export default App;
