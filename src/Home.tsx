import { GameCard } from "./components/GameCard";


export const Home: React.FC = () =>{
    return<div style={{display:'flex',gap:10,flexWrap:'wrap',width:'-webkit-fill-available',justifyContent:'center'}}>
        <GameCard
            image="/range.png"
            title="Guess Number in Range"
            description=""
            navigationPage="/guess-in-range"
          />
        <GameCard
            image="/length.png"
            title="Guess with Length"
            description=""
            navigationPage="/guess-with-length"
          />
    </div>;
}