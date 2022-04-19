import styles from './divider.module.css'

/* eslint-disable-next-line */
export interface DividerProps {}

export function Divider(props: DividerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Divider!</h1>
    </div>
  )
}

export default Divider
