import { BoardroomVoters, SybilList, Voter } from "types";

async function getTwitterLinks(): Promise<SybilList> {
    const res = await fetch(
        "https://raw.githubusercontent.com/Uniswap/sybil-list/master/verified.json"
    );
    return await res.json();
}

export async function getVoters(protocol: string): Promise<Voter[]> {
    const p_twiLnks = getTwitterLinks();

    const res = await fetch(
        `https://api.boardroom.info/v1/protocols/${protocol}/voters`
    );
    const p_data = res.json();

    const [data, twiLinks] = await Promise.all([p_data, p_twiLnks]);

    return data.data
        .map((bv: BoardroomVoters) => {
            let power = bv.protocols.find((elt) => elt.protocol === protocol);

            return {
                address: bv.address,
                power: power !== undefined ? power.lastCastPower : 0,
                twitter: twiLinks[bv.address],
            };
        })
        .sort((a: Voter, b: Voter) => b.power - a.power);
}
