import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarProfile(props) {
    const [avatar, setAvatar] = React.useState("");
    const input = React.useRef();

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(input.current.value);
    }

    return (
        <PopupWithForm
            name="patch-avatar"
            title="Обновить аватар"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <>
                <input type="url" name="avatar" value={avatar} ref={input} onChange={handleChangeAvatar} placeholder="Ссылка" required="" className="popup__input popup__input_type_link" id="avatar-input" />
                <span className="popup__input-error avatar-input-error" />
            </>
        </PopupWithForm>
    )
}

export default EditAvatarProfile;