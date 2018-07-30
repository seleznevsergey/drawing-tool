function drawCanvas([], w, h) {
  return Array(h + 2)
    .fill(' ')
    .map((field, i) => {
      if (i === 0 || i === h + 1) {
        return Array(w + 2).fill('-');
      }
      const body = Array(w + 2).fill(' ');
      body[0] = '|';
      body[w + 1] = '|';
      return body;
    });
}

function drawLine(canvas, x1, y1, x2, y2) {
  if (canvas.length === 0) {
    throw Error('Canvas has not been created');
  }

  if (x1 !== x2 && y1 !== y2) {
    throw Error('Lines should be only horizontal or vertical!');
  }

  if (x1 === x2) {
    const endOfLine = canvas;
    for (let j = y1; j <= y2; j++) {
      canvas[j][x1] = 'x';
    }
  }

  if (y1 === y2) {
    for (let i = x1; i <= x2; i++) {
      canvas[y1][i] = 'x';
    }
  }
  return canvas;
}

function drawRect(canvas, x1, y1, x2, y2) {
  if (canvas.length === 0) {
    throw Error('Canvas has not been created');
  }
  drawLine(canvas, x1, y1, x1, y2);
  drawLine(canvas, x2, y1, x2, y2);
  drawLine(canvas, x1, y1, x2, y1);
  drawLine(canvas, x1, y2, x2, y2);
  return canvas;
}

function fillBucket(canvas, x, y, c) {
  if (canvas.length === 0) {
    throw Error('Canvas has not been created');
  }
  const oldColor = canvas[y][x];
  fillLinkedRegion(canvas, x, y, c, oldColor);
  return canvas;
}

function fillLinkedRegion(canvas, x, y, c, oldColor) {
  if (isPointOnCanvas(canvas, x, y) && isPointShoudBePainted(canvas, x, y, c, oldColor)) {
    canvas[y][x] = c;
    fillLinkedRegion(canvas, x, y + 1, c, oldColor);
    fillLinkedRegion(canvas, x, y - 1, c, oldColor);
    fillLinkedRegion(canvas, x + 1, y, c, oldColor);
    fillLinkedRegion(canvas, x - 1, y, c, oldColor);
  }
}

function isPointOnCanvas(canvas, x, y) {
  return y > 0 && y < canvas.length && x > 0 && x < canvas[y].length;
}

function isPointShoudBePainted(canvas, x, y, c, oldColor) {
  return canvas[y][x] == oldColor && canvas[y][x] !== c;
}

module.exports = {
  C: drawCanvas,
  L: drawLine,
  R: drawRect,
  B: fillBucket,
};
