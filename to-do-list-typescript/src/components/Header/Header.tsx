import imgLogo from '../../assets/Logo.svg'

import styles from './Header.module.css'

export function Header(){
  return(
    <header className={styles.header} >
      <img src={imgLogo} alt='App logo' />
    </header>
  )
}