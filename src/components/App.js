// import './App.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-prof"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <>
          <input type="text" name="name" placeholder="Имя" required="" minLength={2} maxLength={40} className="popup__input popup__input_type_name" id="name-input" />
          <span className="popup__input-error name-input-error" />
          <input type="text" name="about" placeholder="Описание" required="" minLength={2} maxLength={200} className="popup__input popup__input_type_description" id="desc-input" />
          <span className="popup__input-error desc-input-error" />
        </>
      </PopupWithForm>
      <PopupWithForm
        name="add-place"
        title="Новое место"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <>
          <input type="text" name="name" placeholder="Название" required="" minLength={2} maxLength={30} className="popup__input popup__input_type_pic-name" id="place-input" />
          <span className="popup__input-error place-input-error" />
          <input type="url" name="link" placeholder="Ссылка на картинку" required="" className="popup__input popup__input_type_link" id="link-input" />
          <span className="popup__input-error link-input-error" />
        </>
      </PopupWithForm>
      <PopupWithForm
        name="patch-avatar"
        title="Обновить аватар"
        button="Создать"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <>
          <input type="url" name="avatar" placeholder="Ссылка" required="" className="popup__input popup__input_type_link" id="avatar-input" />
          <span className="popup__input-error avatar-input-error" />
        </>
      </PopupWithForm>
      <PopupWithForm
        name="delete-place"
        title="Вы уверены?"
        button="Да">
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={selectedCard._id !== undefined}
        onClose={closeAllPopups} />
    </div>
  );
}

export default App;