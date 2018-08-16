/*global rxjs */

const { Observable, from, asyncScheduler  } = rxjs;
const { flatMap } = rxjs.operators;

// Returns Observable of Observables
function getDrinks() {
    let beers = from([
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50}
    ], asyncScheduler);

    let softDrinks = from([
        {name: "Coca Cola", country: "USA", price: 1.50},
        {name: "Fanta", country: "USA", price: 1.50},
        {name: "Lemonade", country: "France", price: 2.5}
    ], asyncScheduler);

    // Provide a subscription function as a Observable.create() parameter.
    return Observable.create(observer =>
                             {
                                 observer.next(beers);
                                 observer.next(softDrinks);
                                 observer.complete();
                             });
}

// "Unload" each palette and prinnt each drink.
getDrinks().pipe(
    flatMap(palette => palette)
).subscribe(drink => console.log(`Unloaded drink: ${drink.name}, price: ${drink.price}`),
            null,
            () => console.log("The stream of drinks is over"));

