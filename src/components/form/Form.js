import styles from './Form.module.css';
import AnoIngresso from './AnoIngresso';
import SemsIngresso from './SemsIngresso';
//import Button from './Button';

function Form(props){
    return(
        <div className={styles.FormIngresso}>
            
            <AnoIngresso trocaAno={props.fnAno} />
            <SemsIngresso trocaSems={props.fnSemestre}/>
        </div>
    )
}

export default Form