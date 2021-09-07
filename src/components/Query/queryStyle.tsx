import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "150%",
        },
        vertical: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: theme.spacing(0, 0, 1, 0),
            "& > *": {
                margin: theme.spacing(0, 0, 1, 0),
            },
        },
        graph: {
            height: "100%",
        },
        error: {
            margin: theme.spacing(10, 0, 0, 0),
            width: "100%",
            justifyContent: "center",
        },
    })
);
