export interface BaseObject extends Object {
}

export interface Stock extends BaseObject {
    price: number;
}

export interface CompanyProfile extends BaseObject {
    symbol: string;
    name: string;
    description: string;
    CEO: string;
    sectory: string;
    industry: string;
}

export interface CompanyLogo extends BaseObject {
    url: string;
}

export interface StockNews extends BaseObject {
    link: string;
    description: string;
    title: string;
    pubDate: string;
}