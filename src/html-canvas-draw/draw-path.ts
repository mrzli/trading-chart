import { ensureNever } from '@gmjs/assert';
import { DrawItemPath, DrawPathCommand, FillStrokeType } from '../types';

export function drawPath(c: CanvasRenderingContext2D, p: DrawItemPath): void {
  const { fillStrokeType, commands } = p;

  executeDrawPathCommands(c, commands);
  executeFillStroke(c, fillStrokeType);
}

export function executeDrawPathCommands(
  c: CanvasRenderingContext2D,
  commands: readonly DrawPathCommand[],
): void {
  c.beginPath();

  for (const command of commands) {
    switch (command.kind) {
      case 'move-to': {
        const { x, y } = command;
        c.moveTo(x, y);
        break;
      }
      case 'line-to': {
        const { x, y } = command;
        c.lineTo(x, y);
        break;
      }
      case 'arc-to': {
        const { x1, y1, x2, y2, radius } = command;
        c.arcTo(x1, y1, x2, y2, radius);
        break;
      }
      case 'bezier-curve-to': {
        const { cp1x, cp1y, cp2x, cp2y, x, y } = command;
        c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        break;
      }
      case 'quadratic-curve-to': {
        const { cpx, cpy, x, y } = command;
        c.quadraticCurveTo(cpx, cpy, x, y);
        break;
      }
      case 'rect': {
        const { x, y, width, height } = command;
        c.rect(x, y, width, height);
        break;
      }
      case 'round-rect-single-radius': {
        const { x, y, width, height, radius } = command;
        c.roundRect(x, y, width, height, radius);
        break;
      }
      case 'round-rect-multi-radius': {
        const { x, y, width, height, radii } = command;
        c.roundRect(x, y, width, height, radii);
        break;
      }
      case 'ellipse': {
        const { x, y, radiusX, radiusY, rotation, startAngle, endAngle } =
          command;
        c.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
        break;
      }
      case 'arc': {
        const { x, y, radius, startAngle, endAngle, counterClockwise } =
          command;
        c.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        break;
      }
      case 'close-path': {
        c.closePath();
        break;
      }
      default: {
        return ensureNever(command);
      }
    }
  }
}

function executeFillStroke(
  c: CanvasRenderingContext2D,
  t: FillStrokeType,
): void {
  switch (t) {
    case 'fill': {
      c.fill();
      break;
    }
    case 'stroke': {
      c.stroke();
      break;
    }
    case 'both': {
      c.fill();
      c.stroke();
      break;
    }
    default: {
      return ensureNever(t);
    }
  }
}
