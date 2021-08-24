import getProvider from "eth/provider";
import { Contract, ethers } from "ethers";
import abi from "./abi.json";

const address = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
let uni!: ethers.Contract;

export async function getContract(): Promise<ethers.Contract> {
    if (uni !== undefined) return uni;

    uni = new Contract(address, abi, getProvider());
    return uni;
}

export const firstBlock = 10861674;
