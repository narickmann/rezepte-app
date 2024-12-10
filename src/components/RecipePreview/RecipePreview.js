import styles from './RecipePreview.module.css';
import { Link } from 'react-router-dom';

import InfoBadge from '../InfoBadge/InfoBadge.js';

const RecipePreview = props => {

  return (
    <>
      <Link to={`/recipe/${props.id}`} className={styles.link}>
        <figure className={styles.recipe_preview}>
          <img
            src={props.image ? `http://localhost:5000/${props.image}` : '/images/Platzhalter.webp'}
            alt={`Bild: ${props.title}`}
            className={styles.recipe_img}
          />
          <figcaption>
            <div>
              <h2>{props.title}</h2>
              <small>{props.description}</small>
            </div>

            <div className={styles.short_infos}>
              <InfoBadge
                info={props.cooking_time}
                for={'cooking_time'}
              />
              <InfoBadge
                info={props.difficulty}
                for={'difficulty'}
              />
            </div>
          </figcaption>
        </figure>
      </Link>
    </>
  )
}

export default RecipePreview;