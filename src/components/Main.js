import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    const getUserInfo = () => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
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

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__avatar-container">
                            <div
                                className="profile__avatar"
                                style={{ backgroundImage: `url(${userAvatar})` }}
                            />
                            <div alt="редактировать аватар" className="profile__avatar-edit" onClick={props.onEditAvatar} />
                        </div>
                        <div className="profile__info">
                            <div className="profile__name-options">
                                <h1 className="profile__name">{userName}</h1>
                                <button
                                    type="button"
                                    aria-label="редактировать"
                                    className="profile__edit-button"
                                    onClick={props.onEditProfile}
                                />
                            </div>
                            <p className="profile__description">{userDescription}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="profile__add-button"
                        onClick={props.onAddPlace} />
                </section>
                <section className="elements" aria-label="фотографии">
                    <template id="element" />
                </section>
            </main>
            <section className="elements" aria-label="фотографии">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </>
    );
}

export default Main;