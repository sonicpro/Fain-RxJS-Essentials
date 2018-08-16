import { Subject, from } from "rxjs";
import { flatMap } from "rxjs/operators";

enum Action {
    Buy = "BUY",
    Sell = "SELL"
}

class Order {
    constructor(public orderId: number,
        public traderId: number,
        public stock: string,
        public shares: number,
        public action: Action)
    {}
}

// Unlike orderSubject.ts demo, this demo doe not have Trader.PlaceOrder() method. Instead, Trader has "orders" filed, which is a Subject.
// We can "next" Trader.orders pushing orders to its subscribers.

class Trader {
    public orders = new Subject<Order>();
    constructor(private traderId: number, public traderNumber: string){}
}

let trader1 = new Trader(1, "Joe");
let trader2 = new Trader(2, "Mary");
let traders = [ trader1, trader2 ];
// Flaten observable of traders to the observable of orders.
let ordersSubscription = from(traders).pipe(
    flatMap(trader => trader.orders)
).subscribe(ord => console.log(`Got orders from trader ${ord.traderId} to ${ord.action} ${ord.shares} shares of ${ord.stock}`));

// Define two orders for the first trader and one for the second. Then push orders to respective Trader's "orders" subjects.
let order1 = new Order(1, 1, "IBM", 100, Action.Buy);
let order2 = new Order(2, 1, "AAPL", 200, Action.Sell);
let order3 = new Order(3, 2, "MSFT", 500, Action.Buy);

trader1.orders.next(order1);
trader1.orders.next(order2);
trader2.orders.next(order3);

ordersSubscription.unsubscribe();
