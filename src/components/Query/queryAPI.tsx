import { getContract, firstBlock } from "eth/contracts/uni/uni";
import { Delegation } from "types";
import { providers } from "ethers";
// import { formatEther } from "ethers/lib/utils";

export async function getDelegations(
    address: string,
    beginBlock?: providers.BlockTag,
    stopBlock?: providers.BlockTag
): Promise<Delegation[]> {
    console.log("address", address);

    if (beginBlock === undefined) {
        beginBlock = firstBlock;
    }
    const contract = await getContract();
    let fromFilter = contract.queryFilter(
        contract.filters.DelegateChanged(null, address),
        beginBlock,
        stopBlock
    );
    let toFilter = contract.queryFilter(
        contract.filters.DelegateChanged(null, null, address),
        beginBlock,
        stopBlock
    );

    const [fromEvents, toEvents] = await Promise.all([fromFilter, toFilter]);

    console.log("to events: ", toEvents.length);
    console.log(toEvents);
    console.log("from events: ", fromEvents.length);
    console.log(fromEvents);

    let delegated: Delegation[] = [];
    for (let to of toEvents) {
        if (to.args === undefined) continue;

        let ok = true;
        if (to.args["fromDelegate"] !== to.args["toDelegate"]) {
            for (let from of fromEvents) {
                if (
                    from.args !== undefined &&
                    from.args["delegator"] === to.args["delegator"]
                ) {
                    ok = false;
                    break;
                }
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
    console.log("allo ?");

    const delegatedFilter = await contract.queryFilter(
        contract.filters.DelegateVotesChanged(address),
        firstBlock
    );
    console.log("nb of events", delegatedFilter.length);
    console.log(delegatedFilter);

    for (let d of delegatedFilter) {
        if (d.args === undefined) continue;
        let elt = delegated.find(
            (del) => del.txnHash === d.transactionHash.toLowerCase()
        );
        if (elt !== undefined) {
            elt.amount += d.args["newBalance"] - d.args["previousBalance"];
            // parseInt(formatEther(d.args["newBalance"])) -
            // parseInt(formatEther(d.args["previousBalance"]));
        } else {
            //  if (d.args["newBalance"] < d.args["previousBalance"]) {
            const transaction = await d.getTransaction();

            if (transaction === undefined) continue;
            elt = delegated.find(
                (del) => del.delegator === transaction.from.toLowerCase()
            );
            if (elt !== undefined) {
                elt.amount += d.args["newBalance"] - d.args["previousBalance"];
                // parseInt(formatEther(d.args["newBalance"])) -
                // parseInt(formatEther(d.args["previousBalance"]));
                //
                // elt.amount.add(
                //     BigNumber.from(d.args["newBalance"]).sub(
                //         BigNumber.from(d.args["previousBalance"])
                //     )
                // );
            }
        }
    }
    console.log(delegated);
    return delegated.filter((del) => del.amount >= 0); // del.amount.gt(0));
}

export function reduceString(str: string): string {
    return str.substring(0, 5).concat("...", str.substring(str.length - 4));
}
