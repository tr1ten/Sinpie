import { FaSolidStar, FaSolidStarHalf, FaRegularStar } from "solid-icons/fa";

type RatingProps = {
    rating: number;
    onSelect?: (rating: number) => void;
    readonly?: boolean;
};

export default function Rating({ rating, onSelect, readonly = true }: RatingProps) {
    const handleClick = (index: number) => {
        if (!readonly && onSelect) {
            onSelect(index + 1);
        }
    };

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars.push(
                <FaSolidStar 
                    class={`r-icon ${!readonly ? 'cursor-pointer' : ''}`} 
                    size="1.5rem" 
                    onClick={() => handleClick(i)}
                />
            );
        } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            stars.push(
                <FaSolidStarHalf 
                    class={`r-icon ${!readonly ? 'cursor-pointer' : ''}`} 
                    size="1.5rem" 
                    onClick={() => handleClick(i)}
                />
            );
        } else {
            stars.push(
                <FaRegularStar 
                    class={`r-icon ${!readonly ? 'cursor-pointer' : ''}`} 
                    size="1.5rem" 
                    onClick={() => handleClick(i)}
                />
            );
        }
    }
    return <div class="flex flex-row pt-1 pb-1">{stars}</div>;
}