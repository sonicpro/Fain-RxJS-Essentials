/*global rxjs */

const { Observable, empty } = rxjs;
const { catchError, map } = rxjs.operators;

// Unevitable throws an error after supplying the fifth item (counter > [0..4.9999]).
function getData() {
    let beers = [
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50},
        {name: "Brooklyn Lager", country: "USA", price: 8.00},
        {name: "Sapporo", country: "Japan", price: 7.50}
    ];

    return Observable.create(observer =>
                             {
                                 let counter = 0;
                                 beers.forEach(b =>
                                               {
                                                   observer.next(b);
                                                   counter++;

                                                   if (counter > Math.random()*5) {
                                                       observer.error({
                                                           status: 500,
                                                           description: "Beer stream error"
                                                       });
                                                   }
                                               });

                                 // We never got here in case of the error.
                                 // GOTCHA: In this demo forEach() method in line 17 actually calls next() for every item in "beers".
                                 // Try to comment the line #50 to see this in action.
                                 observer.complete();
                             });
}
    
// Failover observable:
function getCachedData() {
    let beers = [
        {name: "Leffe Blonde", country: "Belgium", price: 9.50},
        {name: "Miller Light", country: "USA", price: 8.50},
        {name: "Corona", country: "Mexico", price: 8.00},
        {name: "Asahi", country: "Japan", price: 7.50}
    ];

    return Observable.create(observer =>
                             {
                                 beers.forEach(b => observer.next(b));
                                 observer.complete();
                             });
}

// catchError substitute the failed observable with the new one.
const mapped$ = getData().pipe(
    catchError(err => {
        console.error(`Got ${err.status}: ${err.description}`);

        // For status 500 fall back to failover data source.
        if (err.status === 500) {
            console.error(">>> Retrieving cached data");
            return getCachedData();
        } else {
            return empty();
        }
    }),
    map(b => b.name + ", " + b.country)
);

const subscription = mapped$.subscribe(beerDescription => console.log("Subscriber got " + beerDescription),
                                       err => console.error(err), // It won't fire, because the error is caught.
                                       () => console.log("The stream is over")
                                      );

subscription.unsubscribe();
                                       
