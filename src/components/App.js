import React from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditPropfilePopup';
import EditAvatarProfile from './EditAvatarProfile';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  function getUserInfo() {
    api.getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getCards = () => {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  React.useEffect(() => {
    getCards();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(name, about) {
    api.setUserInfo(name, about)
      .then((res) => {
        currentUser.name = res.name;
        currentUser.about = res.about;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((res) => {
        currentUser.avatar = res.avatar;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarProfile
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete-place"
          title="Вы уверены?"
          button="Да">
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard._id !== undefined}
          onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
