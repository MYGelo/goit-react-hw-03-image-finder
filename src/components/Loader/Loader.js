// Компонент спинера, отображется пока идет загрузка изобаржений. Используй любой готовый компонент, например react-loader-spinner или любой другой.

import css from './Loader.module.css';
import { TailSpin } from 'react-loader-spinner';

export const Loader = () => (
  <div className={css.loader}>
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);
