import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form
                    action="#"
                    className={`popup__form popup__${props.name}`}
                    name={props.name}
                    onSubmit={props.onSubmit}
                >
                    <h2 className="popup__edit-title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__submit">{props.button}</button>
                </form>
                <button type="button" aria-label="закрыть" className="popup__close" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default PopupWithForm;