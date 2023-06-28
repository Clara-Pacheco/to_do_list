import styles from './Tasks.module.css'

import clipBoard from '../../assets/Clipboard.svg'

import { Task } from '../Task/Task'
import { ITask } from '../../App'


interface Props {
 tasks: ITask[];
 onDelete: (taskId:string) => void;
 onComplete:(taskId:string) => void
}

export function Tasks({ tasks, onDelete, onComplete }: Props){
  const tasksQuantity =  tasks.length
  const completedTasks = tasks.filter(task=>task.isCompleted === true).length

  {/* Com const completedTasks = tasks.filter(task=>task.isCompleted === true)
retornamos todas as tasks que estão completas, ao colocarmos .lenght, retornamos
a quantidade das tarefas que estão completas.
*/}

  return (
    <section className={styles.mainContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.createdTasks}>
          <p>Tarefas Criadas</p>
          <span>{tasksQuantity}</span>
        </div>
        <div className={styles.concludedTasks}>
          <p>Concluídas</p>
          <span>{completedTasks} de {tasksQuantity}</span>
        </div>
      </header>
      <hr/>
      <main className={styles.mainContainer}>
        {tasks.length <= 0 && (
            <>
            <img src={clipBoard} alt='Clipboard image' />
            <div className={styles.text}>
              <p className={styles.boldText}>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
            </>
        )}
        <div className={styles.list}>
         {tasks.map((task)=>{
          return (
            <Task 
              key={task.id} 
              task={task} 
              onDelete={onDelete}
              onComplete ={onComplete}
              
            />
          )
         })}
        </div>
      </main>
      
    </section>
  )
}