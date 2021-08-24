/* Imports */
import {
    useTheme as am4Theme,
    create as am4Create,
} from "@amcharts/amcharts4/core";
import * as forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Delegation } from "types";
import { reduceString } from "./singleAddressAPI";

/* Chart code */
// Themes begin
am4Theme(am4themes_animated);
// Themes end

export const chart = (data: Delegation[], query: string) => {
    let chart = am4Create("chartdiv", forceDirected.ForceDirectedTree);
    let networkSeries = chart.series.push(
        new forceDirected.ForceDirectedSeries()
    );

    chart.data = [
        {
            delegator: query,
            reducedDelegator: reduceString(query),
            children: data,
            amount: data.reduce((acc, cur) => acc + cur.amount, 0),
        },
    ];

    networkSeries.dataFields.value = "amount";
    networkSeries.dataFields.name = "delegator";
    networkSeries.dataFields.children = "children";
    networkSeries.nodes.template.tooltipText = "{delegator}\n{amount}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{reducedDelegator}";
    networkSeries.fontSize = 10;
    networkSeries.minRadius = 20;
    networkSeries.maxRadius = 70;

    networkSeries.links.template.strokeWidth = 1;

    let hoverState = networkSeries.links.template.states.create("hover");
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on("over", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = true;
        });
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = true;
        }
    });

    networkSeries.nodes.template.events.on("out", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = false;
        });
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = false;
        }
    });
};
