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
exports.getCoins = getCoins;
exports.getCoinPTB = getCoinPTB;
exports.parseSwapTransactionResult = parseSwapTransactionResult;
const PTB_1 = require("navi-sdk/dist/libs/PTB");
function getCoins(client_1, address_1) {
    return __awaiter(this, arguments, void 0, function* (client, address, coinType = "0x2::sui::SUI") {
        const coinAddress = coinType.address ? coinType.address : coinType;
        const coinDetails = yield client.getCoins({
            owner: address,
            coinType: coinAddress,
        });
        return coinDetails;
    });
}
function getCoinPTB(address, coin, amountIn, txb, client) {
    return __awaiter(this, void 0, void 0, function* () {
        let coinA;
        if (coin === '0x2::sui::SUI') {
            coinA = txb.splitCoins(txb.gas, [txb.pure.u64(amountIn)]);
        }
        else {
            const coinInfo = yield getCoins(client, address, coin);
            // Check if user has enough balance for tokenA
            if (!coinInfo.data[0]) {
                throw new Error('Insufficient balance for this coin');
            }
            // Merge coins if necessary, to cover the amount needed
            const mergedCoin = (0, PTB_1.returnMergedCoins)(txb, coinInfo);
            coinA = txb.splitCoins(mergedCoin, [txb.pure.u64(amountIn)]);
        }
        return coinA;
    });
}
function parseSwapTransactionResult(result) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = result.effects.status.status;
        const balanceChanges = result.balanceChanges;
        return { status, balanceChanges };
    });
}
