import { Component } from 'react';

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    return (
      <header className={css.search__bar}>
        <form className={css.search__form}>
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
