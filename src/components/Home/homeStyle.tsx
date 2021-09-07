import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

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
        link: {
            color: theme.palette.common.black,
        },
        verifiedIcon: {
            color: lightBlue[400],
        },
    })
);
