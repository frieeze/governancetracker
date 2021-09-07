import { Avatar, Box, InputBase, Typography } from "@material-ui/core";
import { ChangeEventHandler, useState } from "react";
import { useStyles } from "./navbarStyle";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();

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
            </Box>
        </Box>
    );
}
