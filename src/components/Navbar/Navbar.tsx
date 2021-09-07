import {
    Avatar,
    Box,
    InputBase,
    Typography,
    Switch,
    Grid,
} from "@material-ui/core";
import { ChangeEventHandler, useState } from "react";
import { useStyles } from "./navbarStyle";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
    selectTwitterFilter,
    switchTwitterFilter,
} from "components/Home/homeSlice";

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const verifiedFilter = useAppSelector(selectTwitterFilter);

    const [query, setQuery] = useState("");

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuery(e.currentTarget.value);
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        history.push(`/details/${query.replaceAll(" ", "")}`);
    };

    const handleHeaderClick = () => {
        history.push("/");
    };

    const handleVerifiedChange = () => {
        dispatch(switchTwitterFilter());
    };

    return (
        <Box className={classes.root}>
            <Box
                className={classNames(classes.head, "clickable")}
                onClick={handleHeaderClick}
            >
                <Avatar
                    className={classes.logo}
                    src="/assets/Uniswap_Logo.svg"
                    alt="uniswap logo"
                />
                <Typography variant="h3">Uniswap Delegation Graph</Typography>
            </Box>
            <Box className={classes.head}>
                <Typography className={classes.delegates}>Delegates</Typography>
                <Box className={classes.search}>
                    <form
                        className={classes.searchInput}
                        noValidate
                        onSubmit={handleOnSubmit}
                    >
                        <InputBase
                            className={classes.searchInput}
                            placeholder="Search by wallet address"
                            onChange={handleQueryChange}
                            value={query}
                        />
                    </form>
                </Box>
                <Box>
                    <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>all</Grid>
                        <Grid item>
                            <Switch
                                checked={verifiedFilter}
                                onChange={handleVerifiedChange}
                                name="checkedC"
                            />
                        </Grid>
                        <Grid item>verified</Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
