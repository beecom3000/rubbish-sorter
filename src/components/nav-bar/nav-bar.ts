import { ICustomElementViewModel } from '@aurelia/runtime-html';
import { inject, EventAggregator, IDisposable } from 'aurelia';

// @inject(ApiService, EventAggregator, AuthService)
export class NavBar implements ICustomElementViewModel {
    // private cartTotal = 0;
    //
    // private cartAddSubscription: IDisposable;
    // private cartRemoveSubscription: IDisposable;
    //
    // constructor(private api: ApiService,
    //             private ea: EventAggregator,
    //             private auth: AuthService) {
    //
    // }
    //
    // /**
    //  * Component Life Cycle
    //  *
    //  * beforeBind vs bind -
    //  *      This method happens after binding occurs, but before the DOM
    //  *      attachment. This is where the DataBinding engine binds
    //  *      the contents of the View.
    //  * afterAttach vs attached
    //  *      This method gets called when the View is attached to the DOM.
    //  *      Here is where you will do your DOM manipulation, wrap elements
    //  *      in jQuery objects or whatever you like. All work with the DOM
    //  *      (especially plugins) should be done within this method.
    //  * afterDetach vs detached
    //  *      This method is called when the View is detached from the DOM.
    //  *      If you registered events in the attached method, you would
    //  *      probably unbind them in here. This is your chance to free up
    //  *      some memory and clean the slate.
    //  *
    //  * Router Life cycle
    //  * canEnter vs canActivate
    //  * enter vs activate
    //  * canLeave vs canDeactivate
    //  * leave vs deactivate
    //  */
    //
    // binding(): void {
    //     this.cartTotal = this.api.getCartTotal();
    //
    //     this.cartAddSubscription = this.ea.subscribe('cart:add', () => {
    //         this.cartTotal = this.api.getCartTotal();
    //     });
    //
    //     this.cartRemoveSubscription = this.ea.subscribe('cart:remove', () => {
    //         this.cartTotal = this.api.getCartTotal();
    //     });
    // }
    //
    // logout(): void {
    //     this.auth.logout('home');
    // }
    //
    // showSearch(): void {
    //     this.ea.publish('search:open');
    // }
}
