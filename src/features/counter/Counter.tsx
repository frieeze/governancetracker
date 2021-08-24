import React, { useState, ChangeEventHandler } from "react";

import { useAppSelector, useAppDispatch } from "app/hooks";
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from "./counterSlice";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./counterStyle";

export function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState(2);
    const classes = useStyles();

    const handleIncrementChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIncrementAmount(Number(e.currentTarget.value) || 0);
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </Button>
                <span>{count}</span>
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </Button>
            </Box>
            <Box display="flex">
                <TextField
                    label="Set increment amount"
                    type="number"
                    variant="outlined"
                    value={incrementAmount}
                    onChange={handleIncrementChange}
                />
                <Button
                    color="primary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => dispatch(incrementByAmount(incrementAmount))}
                >
                    Add Amount
                </Button>
                <Button
                    color="primary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => dispatch(incrementAsync(incrementAmount))}
                >
                    Add Async
                </Button>
                <Button
                    color="primary"
                    variant="outlined"
                    className={classes.btn}
                    onClick={() => dispatch(incrementIfOdd(incrementAmount))}
                >
                    Add If Odd
                </Button>
            </Box>
        </Box>
    );
}
