import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from '../services/Api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { InfinitySpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Notification';
// import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalImages: 0,
    isLoading: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.getImages();
      // this.onScrollToBottom();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true, error: '' });
      const { totalImages, images } = await fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        totalImages,
      }));
      // if (page !== 1) {
      //   this.onScrollToBottom();
      // }

      if (totalImages.length < 1) {
        toast.error('Nothing was found for your request');
        return;
      }
    } catch (error) {
      toast.error('Oops, something went wrong');
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setQuery = query => {
    if (query === this.state.query) {
      toast.error('Enter new request');
    }
    this.setState({
      query,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // onScrollToBottom = () => {
  //   window.scrollTo({
  //     bottom: 0,
  //     behavior: 'smooth',
  //   });
  // };

  render() {
    const { images, totalImages, isLoading } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.setQuery} />

        {images.length === 0 ? (
          <Notification />
        ) : (
          <ImageGallery images={images} />
        )}

        {totalImages !== images.length && !isLoading && (
          <Button onClickLoadMore={this.handleLoadMore} />
        )}

        {isLoading && <InfinitySpin width="200" color="#3f51b5" />}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
          closeOnClick
        />
      </>
    );
  }
}
