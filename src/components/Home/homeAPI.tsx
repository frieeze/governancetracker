import { BoardroomVoters, SybilList, Voter } from "types";

export async function getVoters(protocol: string): Promise<Voter[]> {
    const res = await fetch(
        `https://api.boardroom.info/v1/protocols/${protocol}/voters`
    );
    const data = await res.json();

    return data.data
        .map((bv: BoardroomVoters) => {
            let power = bv.protocols.find((elt) => elt.protocol === protocol);

            // const voter: Voter =
            return {
                address: bv.address,
                power: power !== undefined ? power.lastCastPower : 0,
            };
            // return voter;
        })
        .sort((a: Voter, b: Voter) => b.power - a.power);
}

export async function getTwitterLinks(): Promise<SybilList> {
    const res = await fetch(
        "https://raw.githubusercontent.com/Uniswap/sybil-list/master/verified.json"
    );
    return await res.json();
}
