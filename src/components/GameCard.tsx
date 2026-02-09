import { useNavigate } from "react-router-dom";

interface props{
    image:string;
    title:string;
    description:string;
    navigationPage: string;
}

export const GameCard:React.FC<props> = ({ image, title, description,navigationPage }) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate(navigationPage);
    }
  return (
    <div className="game-card">
      <img src={image} alt={title} className="card-image" />

      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>

        <button className="primary-btn" onClick={handleClick}>
          ▶ Start Challenge
        </button>
      </div>
    </div>
  );
}
