import { interval } from "rxjs"

function doSomething() {
    console.log("I ignore the supplied value every one second");
}

const obs$ = interval(1000);

const subscription = obs$.subscribe(() => doSomething(),
    null,
    console.log.bind(null, "The stream has completed"));

setTimeout(() => subscription.unsubscribe(), 10000);