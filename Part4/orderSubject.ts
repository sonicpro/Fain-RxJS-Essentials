// Subject is like an observer and Observable at once. It has next() metod that pushes values to all subscribers.
// On the other hand, we can subscribe to Subject.
// Whenever Traders places an order, it is pushed to both "stock exchange" and "trade commission" subscribers.

import { Subject } from "rxjs";

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

let orders = new Subject<Order>();

class Trader {
    constructor(private traderId: number, private traderNumber: string){}

    public PlaceOrder(order: Order) {
        orders.next(order);
    }
}

let stockExchange = orders.subscribe(ord => console.log(`Sending to stock exchange the order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));
let tradeCommission = orders.subscribe(ord => console.log(`Reporting to trade commission the order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));

let trader = new Trader(1, "Joe");
let order1 = new Order(1, 1, "IBM", 100, Action.Buy);
let order2 = new Order(2, 1, "AAPL", 100, Action.Sell);

trader.PlaceOrder(order1);
trader.PlaceOrder(order2);

stockExchange.unsubscribe();
tradeCommission.unsubscribe();