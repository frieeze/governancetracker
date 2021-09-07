import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        container: {
            margin: theme.spacing(2),
        },
        row: {
            display: "flex",
            alignItems: "center",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    })
);
