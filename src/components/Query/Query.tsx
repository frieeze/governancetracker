import { Box, LinearProgress, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { chart } from "./chart";
import { useStyles } from "./queryStyle";
import classNames from "classnames";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
    selectAddress,
    selectStatus,
    setAddress,
    getDelegationsHistory,
    selectDelegation,
} from "./querySlice";
import ErrorIcon from "@material-ui/icons/Error";

export default function SingleAddress() {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    let params: { address: string } = useParams();

    const query = useAppSelector(selectAddress);
    const status = useAppSelector(selectStatus);
    const delegation = useAppSelector(selectDelegation);

    useEffect(() => {
        if (params.address !== undefined && params.address !== "") {
            dispatch(setAddress(params.address));
            dispatch(getDelegationsHistory({ address: params.address }));
        }
    }, [params, dispatch]);

    useEffect(() => {
        if (status === "idle") {
            chart(delegation, query);
        }
    }, [status, delegation, query]);

    const display = () => {
        if (status === "loading" && delegation.length === 0) {
            return <LinearProgress />;
        }
        if (status === "failed") {
            return (
                <Box className={classNames(classes.error, classes.vertical)}>
                    <ErrorIcon fontSize="large" />
                    <Typography variant="h5">Oops !</Typography>
                    <Typography>Something went wrong</Typography>
                </Box>
            );
        }
        if (delegation.length !== 0) {
            return (
                <Box className={classNames(classes.root, classes.vertical)}>
                    <Box id="chartdiv" className={classes.graph}></Box>
                </Box>
            );
        }
        return <Box></Box>;
    };

    return display();
}
