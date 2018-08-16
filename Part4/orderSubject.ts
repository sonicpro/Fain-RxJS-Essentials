// Subject is like an observer. It has next() metod that pushes values to all subscribers.
// Whenever Traders places an order, it is pushed to both "stock exchange" and "trade commission" subscribers.

import { Subject } from "rxjs";

enum Action {
    Buy = "BUY",
    Sell = "SELL"
}

class Order {
    constructor(public OrderId: number,
        public TradeId: number,
        public Stock: string,
        public Shares: number,
        public Action: Action)
    {}
}

let orders = new Subject<Order>();

class Trader {
    constructor(private traderId: number, private traderNumber: string){}

    public PlaceOrder(order: Order) {
        orders.next(order);
    }
}

let stockExchange = orders.subscribe(ord => console.log(`Sending to stock exchange the order to ${ord.Action} ${ord.Shares} shares of ${ord.Stock}`));
let tradeCommission = orders.subscribe(ord => console.log(`Reporting to trade commission the order to ${ord.Action} ${ord.Shares} shares of ${ord.Stock}`));

let trader = new Trader(1, "Joe");
let order1 = new Order(1, 1, "IBM", 100, Action.Buy);
let order2 = new Order(2, 1, "AAPL", 100, Action.Sell);

trader.PlaceOrder(order1);
trader.PlaceOrder(order2);
