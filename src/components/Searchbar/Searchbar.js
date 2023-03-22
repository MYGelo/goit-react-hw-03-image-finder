import { Component } from 'react';
import css from './Searchbar.module.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export class Searchbar extends Component {
  state = {
    inputSearch: '',
    images: [],
  };

  handleChange = e => {
    this.setState({ inputSearch: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputSearch.trim() === '') {
      alert('Write correct word');
      return;
    } else {
      this.reset();
      this.props.onSubmit(this.state.inputSearch);
      // console.log('searchBar', this.state);
    }
    e.target.reset();
  };

  reset = () => {
    this.setState({ inputSearch: '' });
  };

  render() {
    return (
      <header className={css.search__bar}>
        <form className={css.search__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.searchForm__buttonLabel}>Search</span>
            <HiMagnifyingGlass></HiMagnifyingGlass>
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
