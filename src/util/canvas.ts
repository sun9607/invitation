import { FRAME_HEIGHT, FRAME_WIDTH } from "@/common/constants";
import { Frame } from "@/types/types";
import { RefObject } from "react";

export const drawFrame = (
  menu: string,
  layout: number,
  frameRef: RefObject<HTMLCanvasElement>
) => {
  const frame = frameRef.current;
  if (!frame) return;

  const frameContext = frame.getContext("2d");
  if (!frameContext) return;

  frameContext.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);

  const frameImage = new Image();
  frameImage.src = `/static/intro/${menu}/intro${layout}.png`;

  frameImage.onload = () => {
    frameContext.drawImage(frameImage, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
  };
};

export const drawImage = (
  imageRef: RefObject<HTMLCanvasElement>,
  hiddenRef: RefObject<HTMLImageElement>,
  frameData: Frame,
  imageUrl: string
) => {
  if (!imageRef.current || !frameData) return;

  const context = imageRef.current.getContext("2d");
  if (!context) return;

  const {
    x,
    y,
    width = 0,
    height = 1,
    radius = 0,
  } = frameData;

  context.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);

  const image = new Image();
  image.crossOrigin = "anonymous";

  image.onload = () => {
    context.save();

    if (radius) {
      // ✅ HTML border-radius 같은 클리핑
      roundedRectPath(context, x, y, width, height, radius);
      context.clip();
    }

    context.drawImage(image, x, y, width, height);
    context.restore();
  };

  image.src = imageUrl;
};

// 모서리 둥근 사각형 함수
function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}


export const toXPercent = (x: number) => {
  return `${(x / FRAME_WIDTH) * 100}%`;
};

export const toYPercent = (y: number) => {
  return `${(y / FRAME_HEIGHT) * 100}%`;
};
