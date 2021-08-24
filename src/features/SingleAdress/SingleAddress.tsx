import { Box, IconButton, TextField } from "@material-ui/core";
import { ChangeEventHandler, useState } from "react";
import { chart } from "./chart";
import { getDelegations } from "./singleAddressAPI";
import { useStyles } from "./singleAddressStyle";
import SearchIcon from "@material-ui/icons/Search";
import classNames from "classnames";

export default function SingleAddress() {
    const classes = useStyles();
    const [query, setQuery] = useState(
        "0x2B1Ad6184a6B0fac06bD225ed37C2AbC04415fF4"
    );
    const [displayChart, setDisplayChart] = useState(false);

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuery(e.currentTarget.value);
    };

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        const del = await getDelegations(query);
        console.log(del);
        setDisplayChart(true);
        chart(del, query);
    };
    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" className={classNames(classes.query)}>
                <form onSubmit={handleOnSubmit}>
                    <TextField
                        label="Query"
                        value={query}
                        onChange={handleQueryChange}
                        className={classNames(classes.field)}
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </form>
            </Box>
            {displayChart && (
                <Box
                    id="chartdiv"
                    className={classNames(classes.root, classes.graph)}
                ></Box>
            )}
        </Box>
    );
}
