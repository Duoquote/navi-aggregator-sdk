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
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapRoutePTB = swapRoutePTB;
const cetus_1 = require("./cetus");
const turbos_1 = require("./turbos");
const config_1 = require("../config");
const kriyaV3_1 = require("./kriyaV3");
const aftermath_1 = require("./aftermath");
const KriyaV2_1 = require("./KriyaV2");
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
function swapRoutePTB(userAddress_1, minAmountOut_1, txb_1, coinIn_1, router_1) {
    return __awaiter(this, arguments, void 0, function* (userAddress, minAmountOut, txb, coinIn, router, referral = 0) {
        if (!router.routes || router.routes.length === 0) {
            throw new Error("No routes found in data");
        }
        const tokenA = router.from;
        const tokenB = router.target;
        const allPaths = JSON.parse(JSON.stringify(router.routes));
        if (Number(router.amount_in) !==
            router.routes.reduce((sum, route) => sum + Number(route.amount_in), 0)) {
            throw new Error("Outer amount_in does not match the sum of route amount_in values");
        }
        const finalCoinB = txb.moveCall({
            target: "0x2::coin::zero",
            typeArguments: [tokenB],
        });
        for (let i = 0; i < allPaths.length; i++) {
            const path = allPaths[i];
            const pathCoinAmountIn = Math.floor(path.amount_in);
            const pathCoinAmountOut = path.amount_out;
            let pathTempCoin = txb.splitCoins(coinIn, [pathCoinAmountIn]);
            for (let j = 0; j < path.path.length; j++) {
                const route = path.path[j];
                const poolId = route.id;
                const provider = route.provider;
                const tempTokenA = route.from;
                const tempTokenB = route.target;
                const a2b = route.a2b;
                const typeArguments = route.info_for_ptb.typeArguments;
                let amountInPTB;
                let tuborsVersion;
                if (provider === "turbos") {
                    tuborsVersion = route.info_for_ptb.contractVersionId;
                }
                amountInPTB = txb.moveCall({
                    target: "0x2::coin::value",
                    arguments: [pathTempCoin],
                    typeArguments: [tempTokenA],
                });
                if (provider === "cetus") {
                    let toSwapBalance = txb.moveCall({
                        target: "0x2::coin::into_balance",
                        arguments: [pathTempCoin],
                        typeArguments: [tempTokenA],
                    });
                    const { receiveCoin, leftCoin } = yield (0, cetus_1.makeCETUSPTB)(txb, poolId, true, toSwapBalance, amountInPTB, a2b, typeArguments);
                    txb.transferObjects([leftCoin], userAddress);
                    pathTempCoin = receiveCoin;
                }
                else if (provider === "turbos") {
                    pathTempCoin = txb.makeMoveVec({
                        elements: [pathTempCoin],
                    });
                    const { turbosCoinB, turbosCoinA } = yield (0, turbos_1.makeTurbosPTB)(txb, poolId, true, pathTempCoin, amountInPTB, a2b, typeArguments, userAddress, tuborsVersion);
                    txb.transferObjects([turbosCoinA], userAddress);
                    pathTempCoin = turbosCoinB;
                }
                else if (provider === "kriyaV2") {
                    pathTempCoin = yield (0, KriyaV2_1.makeKriyaV2PTB)(txb, poolId, true, pathTempCoin, amountInPTB, a2b, typeArguments);
                }
                else if (provider === "kriyaV3") {
                    pathTempCoin = yield (0, kriyaV3_1.makeKriyaV3PTB)(txb, poolId, true, pathTempCoin, amountInPTB, a2b, typeArguments);
                }
                else if (provider === "aftermath") {
                    const amountLimit = route.info_for_ptb.amountLimit;
                    pathTempCoin = yield (0, aftermath_1.makeAftermathPTB)(txb, poolId, pathTempCoin, amountLimit, a2b, typeArguments);
                }
            }
            txb.mergeCoins(finalCoinB, [pathTempCoin]);
        }
        txb.transferObjects([coinIn], userAddress);
        txb.moveCall({
            target: `${config_1.config.AGGREGATORCONTRACT}::slippage::check_slippage_v2`,
            arguments: [
                finalCoinB, // output coin object
                txb.pure.u64(Math.floor(minAmountOut)), // min amount out
                txb.pure.u64(router.amount_in), // amount in
                txb.pure.u64(referral), // refferal id
            ],
            typeArguments: [tokenA, tokenB],
        });
        return finalCoinB;
    });
}
