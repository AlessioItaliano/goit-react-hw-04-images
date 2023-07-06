import { Component } from 'react';

import Searchbar from 'components/searchbar';
import ImageGallery from 'components/imageGallery';
import Loader from 'components/loader';
import Button from 'components/button';

import fetchImg from './services/fetchImg';
import Notiflix from 'notiflix';
import { AppContainer, Message } from './App.styled.jsx';

class App extends Component {
  state = {
    inputData: '',
    items: [],
    page: 1,
    status: 'idle',
    totalHits: 0,
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, inputData } = this.state;
    if (page !== prevState.page || inputData !== prevState.inputData) {
      this.fetchImages();
    }
  };

  handleSubmit = async inputData => {
    this.setState({
      items: [],
      inputData,
      totalHits: 0,
      page: 1,
    });
  };

  onNextPage = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = async () => {
    const { inputData, page } = this.state;
    this.setState({ status: 'pending' });
    try {
      const { totalHits, hits } = await fetchImg(inputData, page);
      if (!totalHits) {
        this.setState({ status: 'idle' });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { totalHits, status, items, page } = this.state;

    if (status === 'idle') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
        </AppContainer>
      );
    }
    if (status === 'pending') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
        </AppContainer>
      );
    }
    if (status === 'rejected') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <Message />
          Something wrong, try later
        </AppContainer>
      );
    }
    if (status === 'resolved') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits && items.length && <Button onClick={this.onNextPage} />}
        </AppContainer>
      );
    }
  }
}

export default App;
