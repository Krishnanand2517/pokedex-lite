import { DetectedObject } from "@tensorflow-models/coco-ssd";

export const renderPredictions = async (
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const isSmallScreen = window.innerWidth <= 768;

  const fontSize = isSmallScreen ? "24px" : "16px";
  const font = `${fontSize} sans-serif`;
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    // bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // fill the rect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(x, y, width, height);

    // label background
    ctx.fillStyle = "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(fontSize, 10); // consider base 10 when parsing
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // label
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
};
