import {
    createStyles,
    Theme,
    makeStyles,
    alpha,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(5, 0, 5, 7),
            display: "flex",
            flexDirection: "column",
        },
        head: {
            display: "flex",
            alignItems: "center",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        logo: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        delegates: {
            color: "#FE3994",
        },
        search: {
            padding: theme.spacing(0, 2),
            width: "50%",
            borderRadius: theme.typography.fontSize,
            backgroundColor: alpha(theme.palette.common.black, 0.15),
            "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.25),
            },
        },
        searchInput: {
            width: "100%",
        },
    })
);
