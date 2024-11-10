export declare const config: {
    BASE_URL: string;
    AGGREGATORCONTRACT: string;
    CETUSPACKAGEID: string;
    CETUSCONFIGID: string;
    TURBOSPACKAGEID: string;
    KRIYA_V3_VERSION: string;
    KRIYA_V3_PACKAGEID: string;
    KRIYA_V2_PACKAGEID: string;
    CLOCK_ADDRESS: string;
    AFTERMATH_PACKAGEID: string;
    AFTERMATH_POOLREGISTRY: string;
    AFTERMATH_FEEVAULT: string;
    AFTERMATH_TREASURY: string;
    AFTERMATH_INSURANCE_FUND: string;
    AFTERMATH_REFERRAL_VAULT: string;
};
export declare function updateConfig(newConfig: Partial<typeof config>): void;
