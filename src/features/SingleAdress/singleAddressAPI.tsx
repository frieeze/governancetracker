import { getContract, firstBlock } from "eth/contracts/uni/uni";
import { Delegation } from "types";

const QUERY_DELEGATE = "0x2B1Ad6184a6B0fac06bD225ed37C2AbC04415fF4";

export async function getDelegations(address: string): Promise<Delegation[]> {
    const contract = await getContract();
    let fromFilter = contract.queryFilter(
        contract.filters.DelegateChanged(null, address),
        firstBlock
    );
    let toFilter = contract.queryFilter(
        contract.filters.DelegateChanged(null, null, address),
        firstBlock
    );

    const [fromEvents, toEvents] = await Promise.all([fromFilter, toFilter]);

    console.log("to events: ", toEvents.length);
    console.log("from events: ", fromEvents.length);
    let delegated: Delegation[] = [];
    for (let to of toEvents) {
        if (to.args === undefined) continue;

        let ok = true;
        for (let from of fromEvents) {
            if (
                from.args !== undefined &&
                from.args["delegator"] === to.args["delegator"]
            ) {
                ok = false;
                break;
            }
        }
        if (ok) {
            delegated.push({
                delegator: String(to.args["delegator"]).toLowerCase(),
                reducedDelegator: reduceString(
                    String(to.args["delegator"]).toLowerCase()
                ),
                from: String(to.args["fromDelegate"]).toLowerCase(),
                reducedFrom: "",
                blockNumber: to.blockNumber,
                txnHash: to.transactionHash.toLowerCase(),
                reducedTxnHash: "",
                amount: 0,
            });
        }
    }

    const delegatedFilter = await contract.queryFilter(
        contract.filters.DelegateVotesChanged(QUERY_DELEGATE),
        firstBlock
    );

    const filteredDelegated: Delegation[] = [];
    for (let d of delegatedFilter) {
        if (d.args === undefined) continue;

        const elt = delegated.find((del) => del.txnHash === d.transactionHash);
        if (elt === undefined) continue;

        elt.amount = d.args["newBalance"] - d.args["previousBalance"];
        filteredDelegated.push(elt);
    }
    return filteredDelegated;
}

export function reduceString(str: string): string {
    return str.substring(0, 5).concat("...", str.substring(str.length - 4));
}
