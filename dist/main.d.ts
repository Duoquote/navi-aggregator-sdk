import { Transaction, TransactionResult } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/dist/cjs/client';
import { SwapOptions } from './types';
export { swapRoutePTB } from './lib';
export { getRoute } from './lib/retrieveAPI';
export { Dex, Router, SwapOptions } from './types';
/**
 * Executes a swap transaction using the provided parameters.
 *
 * @param {string} address - The user's address.
 * @param {Transaction} txb - The transaction object.
 * @param {string} fromCoin - The coin to swap from.
 * @param {string} toCoin - The coin to swap to.
 * @param {TransactionResult} coin - The transaction result object.
 * @param {number | string | bigint} amountIn - The amount of the input coin.
 * @param {number} minAmountOut - The minimum amount of the output coin.
 * @param {SwapOptions} [swapOptions] - Optional swap options.
 * @returns {Promise<TransactionResult>} - The final transaction object.
 */
export declare function swapPTB(address: string, txb: Transaction, fromCoin: string, toCoin: string, coin: TransactionResult, amountIn: number | string | bigint, minAmountOut: number, swapOptions?: SwapOptions): Promise<TransactionResult>;
/**
 * Executes a swap operation between two coins.
 *
 * @param {string} address - The user's address initiating the swap.
 * @param {SuiClient} client - The Sui client instance for blockchain interaction.
 * @param {string} fromCoin - The coin type to swap from.
 * @param {string} toCoin - The coin type to swap to.
 * @param {number | string | bigint} amountIn - The amount of the input coin to swap.
 * @param {number} minAmountOut - The minimum acceptable amount of the output coin.
 * @param {SwapOptions} [swapOptions] - Optional parameters for the swap operation.
 * @returns {Promise<Object>} - Returns a promise that resolves to the transaction result or dry run result.
 * @throws {Error} - Throws an error if keypair is not provided for non-dry run transactions.
 */
export declare function swap(address: string, client: SuiClient, fromCoin: string, toCoin: string, amountIn: number | string | bigint, minAmountOut: number, swapOptions?: SwapOptions): Promise<any>;
