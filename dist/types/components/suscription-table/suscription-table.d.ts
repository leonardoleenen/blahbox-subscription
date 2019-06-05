export declare class SuscriptionTable {
    plans: {
        standar: {
            price: number;
        };
        advance: {
            price: number;
        };
        premium: {
            price: number;
        };
    };
    monthlyBilling: boolean;
    togglingBillingMonthly(value: any): void;
    co(): void;
    componentWillLoad(): void;
    calculatePrice(plan: any): any;
    render(): any;
}
