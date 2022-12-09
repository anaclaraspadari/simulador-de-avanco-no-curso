import styles from './Menu.module.css';
import AnoIngresso from './AnoIngresso';
import SemsIngresso from './SemsIngresso';
//import Button from './Button';

function Menu(props){
    return(
        <div className={styles.MenuIngresso}>
            
            <AnoIngresso trocaAno={props.fnAno} />
            <SemsIngresso trocaSems={props.fnSemestre}/>
        </div>
    )
}

export default Menu