import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { Router } from "../types";
/**
 * Executes a swap route using the provided parameters.
 *
 * @param {string} userAddress - The user's address.
 * @param {number} minAmountOut - The minimum amount of the output coin.
 * @param {Transaction} txb - The transaction object.
 * @param {TransactionResult} coinIn - The input coin transaction result.
 * @param {Router} router - The router object containing swap routes.
 * @returns {Promise<TransactionResult>} - The final output coin transaction result.
 * @throws {Error} - Throws an error if no routes are found or if the outer amount_in does not match the sum of route amount_in values.
 */
export declare function swapRoutePTB(userAddress: string, minAmountOut: number, txb: Transaction, coinIn: TransactionResult, router: Router, referral?: number): Promise<TransactionResult>;
