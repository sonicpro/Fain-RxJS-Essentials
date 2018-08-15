/*global rxjs */

const { from, asyncScheduler } = rxjs;
const { filter, map } = rxjs.operators;

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

from(beers, asyncScheduler).pipe(
    filter(beer => beer.price < 8),
    map(beer => beer.name + ": $" + beer.price)
).subscribe(beer => console.log(beer),
            null,
            () => console.log("Streaming is over")
           );

console.log("This is the last line in the script");
