import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import { ImSearch } from 'react-icons/im';
import { Header, Form, ButtonSearch, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    inputData: '',
  };

  onChangeInput = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.inputData.trim();
    if (!query) {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state.inputData;

    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit">
            <ImSearch size={25} />
          </ButtonSearch>

          <Input
            name="inputData"
            value={inputData}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
