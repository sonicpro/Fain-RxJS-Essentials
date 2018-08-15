/*global rxjs */

const { Subject } = rxjs;

const mySubject = new Subject;

const subscription1 = mySubject.subscribe(value => console.log(`Subscriber 1 got ${value}`));
const subscription2 = mySubject.subscribe(value => console.log(`Subscriber 2 got ${value}`));

mySubject.next(123);
subscription2.unsubscribe();

mySubject.next(567);

