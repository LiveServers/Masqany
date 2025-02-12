import { Metrics } from "./metrics";

export const DIMENSIONS = {
    metrics: {
        gridSize: Metrics.gridSize,
    },
    spacing: {
        xxs: Metrics.gridSize * 0.25,
        xs: Metrics.gridSize * 0.5,
        s: Metrics.gridSize,
        m: Metrics.gridSize * 2,
        l: Metrics.gridSize * 3,
        xl: Metrics.gridSize * 4,
        xxl: Metrics.gridSize * 5
    },
    borderRadius: {
        xs: Metrics.gridSize * 0.5,
        s: Metrics.gridSize * 0.75,
        m: Metrics.gridSize,
        l: Metrics.gridSize * 1.25,
        max: 9999
    }
}