import { ChangeEvent, useState, useRef, useEffect } from 'react'

import styles from './App.module.css'

import plusIcon from './assets/plus.svg'

import { Header } from './components/Header/Header'
import { Tasks } from './components/Tasks/Tasks'

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const[title,setTitle] = useState("")

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(saved){
      setTasks(JSON.parse(saved))
    }
  }

  {/*Essa função será chamada uma vez que a página carregar; para isso, usaremos um
useEffect, passando uma array vazia, para carregar somente 1 vez. */}

  useEffect(()=>{
    loadSavedTasks()
  },[])

  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    setTitle(event.target.value)
  }

  
  function addTask(title:string){
    event?.preventDefault()
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: title,
        isCompleted: false
      }
    ])
    setTitle('')
    // textInput.current.value =''
  }

  const textInput = useRef<HTMLInputElement>(null)

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasksAndSave(newTasks)
  }

  function toggleTaskCompletedByID(taskId: string){
    const newTasks = tasks.map((task)=> {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted
          }
        }
      
      return task
    })
    setTasksAndSave(newTasks)
  }

{/* Exemplo: a tarefa com id: 1 é igual ao id que estamos recebendo como parâmetro?
Se sim, pega essa tarefa e inverta o valor da propriedade isCompleted, mantendo as
demais propriedades inalteradas. Se o id da tarefa que está sendo verificada naquele
loop do map não for igual ao id recebido como parâmetro, ignore e retorne a tarefa
com os valores originais.   */}

{/*Agora no browser existe a possibilidade de criar um id sem biblioteca,
através do crypto.randomUUID(). Atenção pois não são todos os navegadores que 
suportam essa nova feature. */}
 
 return (
  <div>
    <Header />
    <form className={styles.newTaskForm}>
      <input
       ref={textInput}
       className= {styles.input}
       placeholder='Adicione uma tarefa'
       onChange={handleInputChange}
       value={title}
      />
      <button
       className={styles.button}
       onClick={()=>addTask(title)}
       >
        Criar
        <img src={plusIcon} alt='plus icon' />
      </button>
    </form>
    <Tasks
      tasks={tasks}
      onDelete={deleteTaskById}
      onComplete={toggleTaskCompletedByID} />

    <footer> Made with 💜 by Clara </footer>
  </div>
 )
}

