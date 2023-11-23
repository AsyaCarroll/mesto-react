import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) { //можно ли объяснить, чем деструктуризация лучше props?
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name, link)
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onAddPlace={props.onAddPlace}>
            <>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    className="popup__input popup__input_type_pic-name"
                    id="place-input" />
                <span className="popup__input-error place-input-error" />
                <input
                    type="url"
                    name="link"
                    value={link}
                    onChange={handleChangeLink}
                    placeholder="Ссылка на картинку"
                    required=""
                    className="popup__input popup__input_type_link"
                    id="link-input" />
                <span className="popup__input-error link-input-error" />
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
