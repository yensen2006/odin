import styled from "styled-components";
import cytoscape from "cytoscape";
import theme from "src/shared/theme";

const priorityColors = {
    1: theme.colors["secondary-neutral"],
    2: theme.colors["accent-light"],
    3: theme.colors["accent"]
}

type priorityColorsKey = keyof typeof priorityColors;

export const GraphContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const GraphStyle = [
    {
        selector: "node",
        style: {
            label: "data(label)",
            color: theme.colors.secondary,
            width: (node: cytoscape.NodeSingular) =>
                (node.data("priority") * 10 + 10) + "px",
            height: (node: cytoscape.NodeSingular) =>
                (node.data("priority") * 10 + 10) + "px",
            "background-color": (node: cytoscape.NodeSingular) =>
                priorityColors[node.data("priority") as priorityColorsKey],
            "font-size": "16px",
        },
    },
    {
        selector: "edge",
        style: {
            "line-color": (edge: cytoscape.EdgeSingular) =>
                priorityColors[edge.target().data('priority') as priorityColorsKey],
            "target-arrow-color": theme.colors["secondary-neutral"],
            "target-arrow-shape": "triangle",
        },
    },
    {
        selector: "node:selected",
        style: {
            width: (node: cytoscape.NodeSingular) => "25px",
            height: (node: cytoscape.NodeSingular) => "25px",
            "background-color": theme.colors["accent"],
            "border-width": "2px",
            "border-color": theme.colors["secondary-neutral"],
        },
    },
    {
        selector: "node:hover",
        style: {
            "cursor": "pointer",
        },
    },
]