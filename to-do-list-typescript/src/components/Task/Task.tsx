import styles from './Task.module.css'

import trashIcon from '../../assets/trash.svg'
import { ITask } from '../../App'

import checkIcon from '../../assets/check.svg'

interface Props {
  task: ITask;
  onDelete:(taskID:string)=> void;
  onComplete:(taskID:string)=> void;
  
}

export function Task( { task,onDelete,onComplete }: Props){

  return (
    <div className={styles.task}>
      <button
       className={styles.checkContainer}
       onClick={()=>onComplete(task.id)}
      >
        {task.isCompleted ? <img src={checkIcon}  />  : <div />}
      </button>
      <p className= {task.isCompleted ? styles.textCompleted : ""}>
       {task.title}
      </p>

      {/*Classe dinâmica. Se a prop 'isCompleted' tiver valor true, será
      aplicado a classe de estilização textCompleted, do contrário, não será
      adicionado nada. */}
      <button
       className={styles.trashIconButton}
       onClick={() => onDelete(task.id) }
      >
        <img src={trashIcon} alt='Trash Ico' />
      </button>
    </div>



  )
}