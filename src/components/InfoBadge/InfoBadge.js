import styles from './InfoBadge.module.css'

const InfoBadge = props => {

  let difficultyIcon = 'difficulty_easy_icon.svg';

  const renderBadge = () => {
    if (props.for === 'cooking_time') {
      return (
        <div className={styles.info_badge}>
          <img src='/images/icons/duration_icon.svg' alt='Arbeitszeit' className={styles.icon} />
          <p>{`${props.info} Min`}</p>
        </div>
      )
    }
    else if (props.for === 'difficulty') {
      if (props.info === 'Einfach') difficultyIcon = 'difficulty_easy_icon.svg';
      else if (props.info === 'Normal') difficultyIcon = 'difficulty_medium_icon.svg';
      else if (props.info === 'Schwer') difficultyIcon = 'difficulty_hard_icon.svg';

      return (
        <div className={styles.info_badge}>
          <img src={`/images/icons/${difficultyIcon}`} alt='Schwierigkeitsgrad' className={styles.icon} />
          <p>{`${props.info}`}</p>
        </div>
      )
    }
    else if (props.for === 'category') {
      return (
        <div className={styles.info_badge}>
          <p>{`${props.info}`}</p>
        </div>
      )
    }
    else if (props.for === 'creationDate' && props.info !== undefined) {
      return (
        <div className={styles.info_badge}>
          <img src='/images/icons/calendar_icon.svg' alt='Erstellungsdatum' className={styles.icon} />
          <p>{`${props.info}`}</p>
        </div>
      )
    }
    else if (props.for === 'from_user' && props.info !== undefined) {
      return (
        <div className={styles.info_badge}>
          <img src='/images/icons/user_icon.svg' alt='Nutzer' className={styles.icon} />
          <p>{`${props.info}`}</p>
        </div>
      )
    }

  }

  return (
    <>
      {renderBadge()}
    </>
  )
}

export default InfoBadge;