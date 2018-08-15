/*global rxjs */

const { from } = rxjs;
const { map, reduce } = rxjs.operators;

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

from(beers).pipe(
    map(beer => beer.price),
    reduce((agg, curr) => agg + curr, 0)
).subscribe(totalPrice => console.log(`Total price: ${totalPrice}`));
