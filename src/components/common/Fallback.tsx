// this is fallback component

import { JSX } from "solid-js/web/types/jsx"
const FallBack = ()=>{
    return <div class="fallback">
        <div class="fallback-container flex items-center m-3">
            <div class="fallback-icon w-9">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v4a1 1 0 11-2 0V6a1 1 0 011-1z" clip-rule="evenodd" />
                    <path d="M10 13a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
            </div>
            <div class="fallback-text">
                <h1>Oops! Something went wrong</h1>
                <p>It seems like we are having some issues. Please try again later.</p>
            </div>
        </div>
    </div>
}
export default FallBack;