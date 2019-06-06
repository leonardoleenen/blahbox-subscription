export declare class SuscriptionTable {
    plans: {
        standar: {
            id: string;
            price: number;
        };
        advance: {
            id: string;
            price: number;
        };
        premium: {
            id: string;
            price: number;
        };
    };
    nickName: string;
    email: string;
    userId: string;
    callbackUrl: string;
    monthlyBilling: boolean;
    togglingBillingMonthly(value: any): void;
    co(plan: any): void;
    componentWillLoad(): void;
    calculatePrice(plan: any): any;
    render(): any;
}
