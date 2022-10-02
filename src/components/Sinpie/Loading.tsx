// this will display a cool loading animation
import LoadingGIF from "../../../assets/ghost.gif";
export default function Loading() {
    return (
       <div class="w-full flex" style={{height:"50vh"}}>
        <img class="m-auto h-1/12" src={LoadingGIF} />
       </div>
    );
}