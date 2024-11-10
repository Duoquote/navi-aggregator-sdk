import { DryRunTransactionBlockResponse, SuiClient } from "@mysten/sui/dist/cjs/client";
import { TransactionResult } from "@mysten/sui/transactions";
import { Transaction } from "@mysten/sui/transactions";
export declare function getCoins(client: SuiClient, address: string, coinType?: any): Promise<import("@mysten/sui/dist/cjs/client").PaginatedCoins>;
export declare function getCoinPTB(address: string, coin: string, amountIn: number | string | bigint, txb: Transaction, client: SuiClient): Promise<TransactionResult>;
export declare function parseSwapTransactionResult(result: DryRunTransactionBlockResponse): Promise<{
    status: "success" | "failure";
    balanceChanges: import("@mysten/sui/dist/cjs/client").BalanceChange[];
}>;
