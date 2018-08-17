/*global rxjs */

const { interval } = rxjs;
const { take, switchMap, map } = rxjs.operators;

// We never see the last inner item in the first outer iteration,
// bacause it arrives too late (400 * 3 = 1.2s), in terms the next outer loop starts before it arrives.

let outer$ = interval(1000).pipe(
    take(2)
);

let flattened$ = outer$.pipe(
    switchMap(outerObservItem =>
              {
                  return interval(400).pipe(
                      take(3),
                      map(y => `outer ${outerObservItem}: inner ${y}`)
                  );
              })
);

flattened$.subscribe(innerObservItem => console.log(innerObservItem));
