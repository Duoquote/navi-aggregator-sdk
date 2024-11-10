import { Router, SwapOptions } from '../types';
/**
 * Fetches the optimal swap route between two coins using the provided parameters.
 *
 * @param {string} fromCoin - The coin type to swap from.
 * @param {string} toCoin - The coin type to swap to.
 * @param {number | string | bigint} amountIn - The amount of the input coin to swap.
 * @param {SwapOptions} [swapOptions] - Optional parameters for the swap operation.
 * @returns {Promise<Router>} - Returns a promise that resolves to the router object containing swap routes.
 * @throws {Error} - Throws an error if the API base URL is not set or if no data is returned from the API.
 */
export declare function getRoute(fromCoin: string, toCoin: string, amountIn: number | string | bigint, swapOptions?: SwapOptions): Promise<Router>;
