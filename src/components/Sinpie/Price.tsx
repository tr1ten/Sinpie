// this component show the price of a product
export default function Price(props:{price:number}){
    return <p class="amount">
    <span class="amount-symbol">$</span>
    {props.price}
</p>
}