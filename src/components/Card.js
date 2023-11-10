import trash from '../images/trash.svg'

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="element">
            <div src="#" alt="#" className="element__pic" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} />
            <button className="element__trash" type="button">
                <img src={trash} alt="удалить" />
            </button>
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__container">
                    <button type="button" className="element__like" aria-label="Нравится" />
                    <p className="element__count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;