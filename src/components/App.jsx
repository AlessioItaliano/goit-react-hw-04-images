// import { useEffect, useState } from 'react';

// import Searchbar from 'components/searchbar';
// import ImageGallery from 'components/imageGallery';
// import Loader from 'components/loader';
// import Button from 'components/button';

// import fetchImg from './services/fetchImg';
// import Notiflix from 'notiflix';
// import { AppContainer, Message } from './App.styled.jsx';

// const App = () => {
//   const [inputData, setInputData] = useState('');
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const [status, setStatus] = useState('idle');
//   const [totalHits, setTotalHits] = useState(0);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setStatus('pending');
//         const { totalHits, hits } = await fetchImg(inputData, page);
//         if (!totalHits) {
//           setStatus('idle');
//           Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }
//         setItems(prevItems => [...prevItems, ...hits]);
//         setStatus('resolved');
//         setTotalHits(totalHits);
//       } catch (error) {
//         setStatus('rejected');
//       }
//     };

//     fetchImages();
//   }, [page, inputData]);

//   const handleSubmit = inputData => {
//     setItems([]);
//     setInputData(inputData);
//     setTotalHits(0);
//     setPage(1);
//   };

//   const onNextPage = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   if (status === 'idle') {
//     return (
//       <AppContainer>
//         <Searchbar onSubmit={handleSubmit} />
//       </AppContainer>
//     );
//   }
//   if (status === 'pending') {
//     return (
//       <AppContainer>
//         <Searchbar onSubmit={handleSubmit} />
//         <ImageGallery page={page} items={items} />
//         <Loader />
//       </AppContainer>
//     );
//   }
//   if (status === 'rejected') {
//     return (
//       <AppContainer>
//         <Searchbar onSubmit={handleSubmit} />
//         <Message>Something went wrong, please try again later</Message>
//       </AppContainer>
//     );
//   }
//   if (status === 'resolved') {
//     return (
//       <AppContainer>
//         <Searchbar onSubmit={handleSubmit} />
//         <ImageGallery page={page} items={items} />
//         {totalHits && items.length && <Button onClick={onNextPage} />}
//       </AppContainer>
//     );
//   }
// };

// export default App;

import { useEffect, useState } from 'react';

import Searchbar from 'components/searchbar';
import ImageGallery from 'components/imageGallery';
import Loader from 'components/loader';
import Button from 'components/button';

import fetchImg from './services/fetchImg';
import Notiflix from 'notiflix';
import { AppContainer, Message } from './App.styled.jsx';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImg(inputData, page);
        if (!totalHits) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Вибачте, не знайдено зображень, що відповідають вашому запиту. Спробуйте ще раз.'
          );
          return;
        }
        setItems(prevItems => [...prevItems, ...hits]);
        setStatus('resolved');
        setTotalHits(totalHits);
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchImages();
  }, [page, inputData]);

  const handleSubmit = inputData => {
    setItems([]);
    setInputData(inputData);
    setTotalHits(0);
    setPage(1);
  };

  const onNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
      </AppContainer>
    );
  }
  if (status === 'pending') {
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
      </AppContainer>
    );
  }
  if (status === 'rejected') {
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        <Message>Щось пішло не так, спробуйте пізніше</Message>
      </AppContainer>
    );
  }
  if (status === 'resolved') {
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits && items.length && <Button onClick={onNextPage} />}
      </AppContainer>
    );
  }
};

export default App;
