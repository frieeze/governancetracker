import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        graph: {
            height: "150%",
        },
        error: {
            margin: theme.spacing(10, 0, 0, 0),
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    })
);
