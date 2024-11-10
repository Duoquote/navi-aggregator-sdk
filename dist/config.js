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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.updateConfig = updateConfig;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.config = {
    BASE_URL: process.env.NAVI_DEX_AGGREGATOR_API_BASE_URL || "https://aggregator-api.naviprotocol.io/find_routes",
    AGGREGATORCONTRACT: "0x88dfe5e893bc9fa984d121e4d0d5b2e873dc70ae430cf5b3228ae6cb199cb32b",
    CETUSPACKAGEID: "0x70968826ad1b4ba895753f634b0aea68d0672908ca1075a2abdf0fc9e0b2fc6a",
    CETUSCONFIGID: "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f",
    TURBOSPACKAGEID: "0x1a3c42ded7b75cdf4ebc7c7b7da9d1e1db49f16fcdca934fac003f35f39ecad9",
    KRIYA_V3_VERSION: "0xf5145a7ac345ca8736cf8c76047d00d6d378f30e81be6f6eb557184d9de93c78",
    KRIYA_V3_PACKAGEID: "0xbd8d4489782042c6fafad4de4bc6a5e0b84a43c6c00647ffd7062d1e2bb7549e",
    KRIYA_V2_PACKAGEID: "0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66",
    CLOCK_ADDRESS: "0x6",
    AFTERMATH_PACKAGEID: "0xc4049b2d1cc0f6e017fda8260e4377cecd236bd7f56a54fee120816e72e2e0dd",
    AFTERMATH_POOLREGISTRY: "0xfcc774493db2c45c79f688f88d28023a3e7d98e4ee9f48bbf5c7990f651577ae",
    AFTERMATH_FEEVAULT: "0xf194d9b1bcad972e45a7dd67dd49b3ee1e3357a00a50850c52cd51bb450e13b4",
    AFTERMATH_TREASURY: "0x28e499dff5e864a2eafe476269a4f5035f1c16f338da7be18b103499abf271ce",
    AFTERMATH_INSURANCE_FUND: "0xf0c40d67b078000e18032334c3325c47b9ec9f3d9ae4128be820d54663d14e3b",
    AFTERMATH_REFERRAL_VAULT: "0x35d35b0e5b177593d8c3a801462485572fc30861e6ce96a55af6dc4730709278",
};
function updateConfig(newConfig) {
    Object.assign(exports.config, newConfig);
}