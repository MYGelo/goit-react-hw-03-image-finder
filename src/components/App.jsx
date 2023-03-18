import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    inputSearch: '',
  };

  handleSearchSubmit = inputSearch => {
    this.setState({ inputSearch });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <div
          style={{
            height: '100vh',
            fontSize: 40,
            color: '#010101',
          }}
        >
          <ImageGallery inputSearch={this.state.inputSearch} />
        </div>
      </div>
    );
  }
}
