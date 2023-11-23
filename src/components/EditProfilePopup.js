import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm
            name="edit-prof"
            title="Редактировать профиль"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <>
                <input type="text" name="name" value={name || ''} onChange={handleChangeName} placeholder="Имя" required="" minLength={2} maxLength={40} className="popup__input popup__input_type_name" id="name-input" />
                <span className="popup__input-error name-input-error" />
                <input type="text" name="about" value={description || ''} onChange={handleChangeDescription} placeholder="Описание" required="" minLength={2} maxLength={200} className="popup__input popup__input_type_description" id="desc-input" />
                <span className="popup__input-error desc-input-error" />
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
