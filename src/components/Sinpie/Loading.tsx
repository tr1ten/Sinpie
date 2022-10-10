// this will display a cool loading animation
import LoadingGIF from "../../../assets/ghost.gif";
export default function Loading() {
    return (
        <div>
            <div class="divLoader flex flex-col">
        <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="25em">
          <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#ff6723" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
      <span class="text-xl relative bottom-14 italic">Loading Content, Please Wait...</span>
      </div>
        </div>
    );
}