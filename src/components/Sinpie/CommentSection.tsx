// this shows all comments and a comment box

import { createSignal, createEffect, For, Show, createMemo } from "solid-js";
import { useParams } from "@solidjs/router";
import { API_ENDPOINT } from "../../utils/auth";
import Rating from "./Rating";
import { Button, Form } from "solid-bootstrap";
import { FaSolidXmark, FaSolidPencil, FaSolidTrash } from "solid-icons/fa";

type Review = {
    id: string;
    comment: string;
    rating: number;
    images: string[];
    createdAt: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
};

const MAX_IMAGES = 5;

export function CommentSection() {
    const params = useParams();
    const [reviews, setReviews] = createSignal<Review[]>([]);
    const [comment, setComment] = createSignal("");
    const [rating, setRating] = createSignal(5);
    const [images, setImages] = createSignal<string[]>([]);
    const [loading, setLoading] = createSignal(false);
    const [editingReview, setEditingReview] = createSignal<Review | null>(null);

    const userReview = createMemo(() => {
        if (!window.user()) return null;
        return reviews().find(review => review.user.id === window.user()?.id);
    });

    createEffect(() => {
        fetchReviews();
    });

    createEffect(() => {
        const review = editingReview();
        if (review) {
            setComment(review.comment);
            setRating(review.rating);
            setImages(review.images || []);
        }
    });

    const resetForm = () => {
        setComment("");
        setRating(5);
        setImages([]);
        setEditingReview(null);
    };

    const fetchReviews = async () => {
        const res = await fetch(`${API_ENDPOINT}/${params.pid}/reviews`);
        const data = await res.json();
        setReviews(data.reviews);
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!window.user()) {
            window.location.href = '/auth';
            return;
        }

        setLoading(true);
        try {
            const endpoint = editingReview() 
                ? `${API_ENDPOINT}/${params.pid}/review/${editingReview().id}`
                : `${API_ENDPOINT}/${params.pid}/review`;

            const method = editingReview() ? 'PUT' : 'POST';

            // Filter out invalid images and ensure proper format
            const validImages = images().filter(img => {
                if (!img) return false;
                if (img.startsWith('data:image/')) {
                    return img.includes(';base64,') && img.split(',')[1].length > 0;
                }
                return img.length > 0; // For already stored base64 strings
            });

            await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    comment: comment(),
                    rating: rating(),
                    images: validImages
                })
            });
            
            resetForm();
            await fetchReviews();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const compressImage = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Check if image is empty
                    if (width === 0 || height === 0) {
                        reject(new Error('Invalid image'));
                        return;
                    }
                    
                    // Max dimension
                    const MAX_SIZE = 800;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Compress image to JPEG with 0.7 quality
                    const compressed = canvas.toDataURL('image/jpeg', 0.7);
                    
                    // Verify the base64 string is valid
                    if (compressed.length < 23 || !compressed.startsWith('data:image/jpeg;base64,')) {
                        reject(new Error('Invalid image data'));
                        return;
                    }
                    
                    resolve(compressed);
                };
                img.onerror = reject;
                img.src = event.target?.result as string || '';
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (!files) return;

        if (images().length + files.length > MAX_IMAGES) {
            alert(`You can only upload up to ${MAX_IMAGES} images`);
            return;
        }

        setLoading(true);
        try {
            const validImages: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    const compressedImage = await compressImage(file);
                    if (compressedImage && compressedImage.length > 23) {
                        validImages.push(compressedImage);
                    }
                } catch (error) {
                    console.error('Error processing image:', error);
                }
            }
            setImages(prev => [...prev, ...validImages]);
        } catch (error) {
            console.error('Error processing images:', error);
        }
        setLoading(false);
    };

    const getImageUrl = (base64: string) => {
        if (!base64) return '';
        if (base64.startsWith('data:image/')) return base64;
        return `data:image/jpeg;base64,${base64}`;
    };

    const handleDelete = async (review: Review) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${API_ENDPOINT}/${params.pid}/review/${review.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            
            if (res.ok) {
                await fetchReviews();
                resetForm();
            } else {
                throw new Error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
        setLoading(false);
    };

    return (
        <div class="flex flex-col p-4">
            <h2 class="text-2xl mb-4">Reviews</h2>
            
            <Show 
                when={!userReview() || editingReview()?.id === userReview()?.id} 
                fallback={
                    <div class="mb-4 p-4 bg-gray-100 rounded">
                        <p>You have already submitted a review. You can edit your review below.</p>
                    </div>
                }
            >
                <Form onSubmit={handleSubmit} class="mb-6">
                    <h3 class="text-xl mb-3">
                        {editingReview() ? 'Edit Your Review' : 'Write a Review'}
                    </h3>
                    
                    <Form.Group class="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <div class="flex items-center">
                            <Rating 
                                rating={rating()} 
                                onSelect={setRating}
                                readonly={false}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group class="mb-3">
                        <Form.Label>Your Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={comment()}
                            onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group class="mb-3">
                        <Form.Label>Upload Images ({images().length}/{MAX_IMAGES})</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            disabled={images().length >= MAX_IMAGES}
                        />
                        <small class="text-gray-500">
                            You can upload up to {MAX_IMAGES} images. Images will be compressed.
                        </small>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <For each={images()}>
                                {(image, index) => (
                                    <div class="relative">
                                        <img 
                                            src={image.startsWith('data:image/') ? image : getImageUrl(image)} 
                                            alt="Preview" 
                                            class="w-24 h-24 object-cover rounded" 
                                        />
                                        <button
                                            type="button"
                                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            onClick={() => setImages(images().filter((_, i) => i !== index()))}
                                        >
                                            <FaSolidXmark size={16} />
                                        </button>
                                    </div>
                                )}
                            </For>
                        </div>
                    </Form.Group>

                    <div class="flex gap-2">
                        <Button 
                            type="submit" 
                            disabled={loading()} 
                            class="bg-red-600 hover:bg-red-700"
                        >
                            {editingReview() ? 'Update Review' : 'Submit Review'}
                        </Button>
                        
                        <Show when={editingReview()}>
                            <Button 
                                type="button"
                                onClick={resetForm}
                                class="bg-gray-500 hover:bg-gray-600"
                            >
                                Cancel Edit
                            </Button>
                        </Show>
                    </div>
                </Form>
            </Show>

            <Show when={reviews().length > 0} fallback={<p>No reviews yet. Be the first to review!</p>}>
                <For each={reviews()}>
                    {(review) => (
                        <div class="border-b py-4">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <span class="font-bold">{review.user.firstName} {review.user.lastName}</span>
                                    <Rating rating={review.rating} />
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                    <Show when={
                                        window.user() &&
                                        review.user.id === window.user()?.id
                                    }>
                                        <div class="flex gap-2">
                                            <button
                                                onClick={() => setEditingReview(review)}
                                                class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                                                title="Edit review"
                                            >
                                                <FaSolidPencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review)}
                                                class="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                                                disabled={loading()}
                                                title="Delete review"
                                            >
                                                <FaSolidTrash size={16} />
                                            </button>
                                        </div>
                                    </Show>
                                </div>
                            </div>
                            <p class="mb-2">{review.comment}</p>
                            <Show when={review.images?.length > 0}>
                                <div class="flex gap-2 flex-wrap">
                                    <For each={review.images}>
                                        {(image) => (
                                            <Show when={image}>
                                                <img 
                                                    src={getImageUrl(image)} 
                                                    alt="Review" 
                                                    class="w-24 h-24 object-cover rounded" 
                                                    loading="lazy"
                                                />
                                            </Show>
                                        )}
                                    </For>
                                </div>
                            </Show>
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
}