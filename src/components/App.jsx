import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import fetchImages from '../services/Api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { InfinitySpin } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Notification';
import NotificationError from './Notification/NotificationError';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query === '') return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        setError('');
        const { totalImages, images } = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);

        if (totalImages.length < 1) {
          toast.error('Nothing was found for your request');
          return;
        }
      } catch (error) {
        toast.error('Oops, something went wrong');
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const setQueryFunc = fetchQuery => {
    if (query === fetchQuery) {
      toast.error('Enter new request');
    }
    setQuery(fetchQuery);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  return (
    <>
      <SearchBar onSubmit={setQueryFunc} />

      {images.length === 0 ? (
        <Notification />
      ) : (
        <ImageGallery images={images} />
      )}

      {totalImages !== images.length && !isLoading && (
        <Button onClickLoadMore={handleLoadMore} />
      )}

      {isLoading && <InfinitySpin width="200" color="#3f51b5" />}

      {error && <NotificationError />}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="colored"
        closeOnClick
      />
    </>
  );
}
