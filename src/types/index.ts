export type Delegation = {
    delegator: string;
    reducedDelegator: string;
    from: string;
    reducedFrom: string;
    blockNumber: number;
    txnHash: string;
    reducedTxnHash: string;
    amount: number;
};

export type Voter = {
    address: string;
    power: number;
};

export type BoardroomVoters = {
    address: string;
    firstVoteCast: number;
    lastVoteCast: number;
    totalVotesCast: number;
    protocols: {
        protocol: string;
        totalVotesCast: number;
        lastVoteCast: number;
        firstVoteCast: number;
        totalPowerCast: number;
        lastCastPower: number;
    }[];
};

export type TwitterLink = {
    twitter: {
        timestamp: number;
        tweetID: string;
        handle: string;
    };
};

export type SybilList = {
    [key: string]: TwitterLink;
};
