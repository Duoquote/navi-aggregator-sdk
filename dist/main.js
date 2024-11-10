"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dex = exports.getRoute = exports.swapRoutePTB = void 0;
exports.swapPTB = swapPTB;
exports.swap = swap;
const PTB_1 = require("navi-sdk/dist/libs/PTB");
const transactions_1 = require("@mysten/sui/transactions");
const utils_1 = require("./utils");
var lib_1 = require("./lib");
Object.defineProperty(exports, "swapRoutePTB", { enumerable: true, get: function () { return lib_1.swapRoutePTB; } });
var retrieveAPI_1 = require("./lib/retrieveAPI");
Object.defineProperty(exports, "getRoute", { enumerable: true, get: function () { return retrieveAPI_1.getRoute; } });
var types_1 = require("./types");
Object.defineProperty(exports, "Dex", { enumerable: true, get: function () { return types_1.Dex; } });
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
function swapPTB(address_1, txb_1, fromCoin_1, toCoin_1, coin_1, amountIn_1, minAmountOut_1) {
    return __awaiter(this, arguments, void 0, function* (address, txb, fromCoin, toCoin, coin, amountIn, minAmountOut, swapOptions = { referer: 'https://www.navi.ag/', dexList: [], byAmountIn: true, depth: 3 }) {
        // Get the output coin from the swap route and transfer it to the user
        const router = yield Promise.resolve().then(() => __importStar(require('./lib/retrieveAPI'))).then(module => module.getRoute(fromCoin, toCoin, amountIn, swapOptions));
        const finalCoinB = yield Promise.resolve().then(() => __importStar(require('./lib'))).then(module => module.swapRoutePTB(address, minAmountOut, txb, coin, router));
        return finalCoinB;
    });
}
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
function swap(address_1, client_1, fromCoin_1, toCoin_1, amountIn_1, minAmountOut_1) {
    return __awaiter(this, arguments, void 0, function* (address, client, fromCoin, toCoin, amountIn, minAmountOut, swapOptions = { referer: 'https://www.navi.ag/', dexList: [], byAmountIn: true, depth: 3, isDryRun: true, keypair: undefined }) {
        const txb = new transactions_1.Transaction();
        txb.setSender(address);
        const coinA = yield (0, utils_1.getCoinPTB)(address, fromCoin, amountIn, txb, client);
        const finalCoinB = yield swapPTB(address, txb, fromCoin, toCoin, coinA, amountIn, minAmountOut, swapOptions);
        txb.transferObjects([finalCoinB], address);
        if (swapOptions.isDryRun) {
            const dryRunTxBytes = yield txb.build({
                client: client
            });
            const response = yield client.dryRunTransactionBlock({ transactionBlock: dryRunTxBytes });
            const { status, balanceChanges } = yield (0, utils_1.parseSwapTransactionResult)(response);
            return { status, balanceChanges };
        }
        else {
            if (swapOptions.keypair) {
                const response = yield (0, PTB_1.SignAndSubmitTXB)(txb, client, swapOptions.keypair);
                return response;
            }
            else {
                throw new Error('Keypair is required for signing and submitting the transaction');
            }
        }
    });
}
