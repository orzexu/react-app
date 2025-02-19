import { Link } from 'react-router-dom';

export const CardListRender = ({ items, title, path, nameField = 'title' }) => {
  return (
    <div className={`imp${title}`}>
      <h1 className={`post__${title.toLowerCase()}`}>{title}</h1>
      {items.length > 0 ? (
        <ul className="post__ul">
          {items.map(item => (
            <li className="post__adv-card" key={item.id}>
              <h2 className="itemsCard__name">{item[nameField]}</h2>
              <img
                className="post__adv-img"
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item[nameField]}
              />
              <Link to={`/${path}/${item.id}`}>
                <button className="postBtn">See More</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()} available</p>
      )}
    </div>
  );
};