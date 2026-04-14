// types/index.ts
export interface IHeaderLinkItem {
	name: string;
	path: string;
}

export interface IHeaderLinkItemExtended extends IHeaderLinkItem {
	bh5Only?: boolean;
}
