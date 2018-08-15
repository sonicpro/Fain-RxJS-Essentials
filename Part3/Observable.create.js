/*global rxjs */

const { Observable } = rxjs;

const beerObservable$ = Observable.create(observer =>
                                          {
                                              let subscribed = true;
                                              // Each subscriber got its own copy of producer (i.e. "beers" array) - cold observable.
                                              let beers = [
                                                  {name: "Stella", country: "Belgium", price: 9.50},
                                                  {name: "Sam Adams", country: "USA", price: 8.50},
                                                  {name: "Bud Light", country: "USA", price: 6.50},
                                                  {name: "Brooklyn Lager", country: "USA", price: 8.00},
                                                  {name: "Sapporo", country: "Japan", price: 7.50}
                                              ];

                                              beers.forEach(b =>
                                                            {
                                                                if (subscribed) {
                                                                    observer.next(b);
                                                                }
                                                            });

                                              observer.complete();
                                              
                                              return function () {
                                                  subscribed = false;
                                              };
                                          });

const beerObserver = {
    next: function(beer) { console.log("Subscriber got " + beer.name); },
    error: function(err) { console.error(err); },
    complete: function() { console.log("The stream is over"); }
};

const sub = beerObservable$.subscribe(beerObserver);
