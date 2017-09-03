const pathYCache = {}

export default function getPathYFromX(x, path, name, error) {
  const key = `${name}-${x}`;

  if (key in pathYCache) {
      return pathYCache[key];
  }

  error = error || 0.01;

  const maxIterations = 100;

  let lengthStart = 0;
  let lengthEnd = path.getTotalLength();
  let point = path.getPointAtLength((lengthEnd + lengthStart) / 2);
  let iterations = 0;

  while (x < point.x - error || x > point.x + error) {
      const midpoint = (lengthStart + lengthEnd) / 2;

      point = path.getPointAtLength(midpoint);

      if (x < point.x) {
          lengthEnd = midpoint;
      } else {
          lengthStart = midpoint;
      }

      iterations += 1;
      if (maxIterations < iterations) {
          break;
      }
  }

  pathYCache[key] = point.y

  return pathYCache[key]
}
