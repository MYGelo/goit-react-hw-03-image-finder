// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими. Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. Если массив изображений пуст, кнопка не рендерится.

import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Btn = ({ onClick }) => (
  <div className={css.btnContainer}>
    <button className={css.button} type="button" onClick={onClick}>
      Load More
    </button>
  </div>
);

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// export class Button extends Component {
//   render() {
//     return (
//       <button className={css.button} type="Button">
//         Load More
//       </button>
//     );
//   }
// }
