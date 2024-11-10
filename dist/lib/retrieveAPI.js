"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoute = getRoute;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
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
function getRoute(fromCoin_1, toCoin_1, amountIn_1) {
    return __awaiter(this, arguments, void 0, function* (fromCoin, toCoin, amountIn, swapOptions = { referer: 'https://www.navi.ag/', dexList: [], byAmountIn: true, depth: 3 }) {
        if (!config_1.config.BASE_URL) {
            throw new Error("API base URL is not set");
        }
        // Construct query parameters for the API request
        const params = new URLSearchParams({
            from: fromCoin,
            target: toCoin,
            amount: (typeof amountIn === 'bigint' ? Number(amountIn) : amountIn).toString(),
            by_amount_in: (swapOptions === null || swapOptions === void 0 ? void 0 : swapOptions.byAmountIn) !== undefined ? swapOptions.byAmountIn.toString() : 'true',
            depth: (swapOptions === null || swapOptions === void 0 ? void 0 : swapOptions.depth) !== undefined ? swapOptions.depth.toString() : '3',
        }).toString();
        // Construct dex provider string if dexList is provided
        let dexString = '';
        if ((swapOptions === null || swapOptions === void 0 ? void 0 : swapOptions.dexList) && swapOptions.dexList.length > 0) {
            dexString = swapOptions.dexList.map(dex => `providers=${dex}`).join('&');
        }
        // Combine parameters and dexString for the full API request
        const fullParams = dexString ? `${params}&${dexString}` : params;
        try {
            // Make the API request to fetch the swap route
            const { data } = yield axios_1.default.get(`${config_1.config.BASE_URL}?${fullParams}`, {
                headers: {
                    'referer': swapOptions.referer
                }
            });
            if (!data) {
                throw new Error('No data returned from the API.');
            }
            // Set the from and target properties in the returned data
            data.data.from = fromCoin;
            data.data.target = toCoin;
            return data.data;
        }
        catch (error) {
            throw error;
        }
    });
}
