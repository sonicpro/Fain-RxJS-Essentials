/*global rxjs */

const { of } = rxjs;

of(1, 2, 3).subscribe(value => console.log(value),
                                 null,
                                 () => console.log("The stream has completed"));
