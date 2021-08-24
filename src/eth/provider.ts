import { ethers } from "ethers";

const network = "mainnet";
const api = "6bd687a793ba47039da4651af80f3d69";

let provider!: ethers.providers.InfuraProvider;

const connect = () => {
    provider = new ethers.providers.InfuraProvider(network, api);
};

export default function getProvider(): ethers.providers.InfuraProvider {
    if (provider !== undefined) return provider;
    connect();
    return provider;
}
