import { FaSolidStar,FaSolidStarHalf } from "solid-icons/fa";
// this component displays a ratings bar for a given rating
export default function Rating({rating}:{rating:number}){
    const stars = [];
    while(rating>=1){
            stars.push(<FaSolidStar class="r-icon" size="1rem" />);
            rating-=1;
    }
    if(rating>=0.5){
        stars.push(<FaSolidStarHalf class="r-icon" size="1rem" />);
        rating-=0.5;
    }
    return <div class="flex flex-row pt-1 pb-1">{stars}</div>
}