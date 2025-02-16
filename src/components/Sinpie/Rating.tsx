import { FaSolidStar, FaRegularStar } from "solid-icons/fa";
import { createSignal, Show } from "solid-js";

type RatingProps = {
    rating: number;
    onSelect?: (rating: number) => void;
    readonly?: boolean;
};

export default function Rating({ rating, onSelect, readonly = true }: RatingProps) {
    const [hoverRating, setHoverRating] = createSignal(0);
    const [selectedRating, setSelectedRating] = createSignal(rating);

    const handleMouseMove = (index: number) => {
        if (readonly) return;
        setHoverRating(index + 1);
    };

    const handleClick = (index: number) => {
        if (readonly) return;
        const newRating = index + 1;
        setSelectedRating(newRating);
        onSelect?.(newRating);
    };

    const handleMouseLeave = () => {
        if (readonly) return;
        setHoverRating(0);
    };

    const getStarRating = (index: number) => {
        if (readonly) return index < rating;
        return index < (hoverRating() || selectedRating());
    };

    return (
        <div 
            class="flex flex-row pt-1 pb-1"
            onMouseLeave={handleMouseLeave}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <div
                    class={`inline-block ${!readonly ? 'cursor-pointer' : ''}`}
                    onMouseMove={() => handleMouseMove(i)}
                    onClick={() => handleClick(i)}
                >
                    <Show
                        when={getStarRating(i)}
                        fallback={
                            <FaRegularStar 
                                class="r-icon" 
                                size="1.5rem"
                            />
                        }
                    >
                        <FaSolidStar 
                            class="r-icon" 
                            size="1.5rem"
                        />
                    </Show>
                </div>
            ))}
        </div>
    );
}