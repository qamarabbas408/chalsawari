export function hexToLottieColor(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [Math.round(r * 1000) / 1000, Math.round(g * 1000) / 1000, Math.round(b * 1000) / 1000, 1];
}

export function recolorLottie(source: any, targetHex: string) {
  const target = hexToLottieColor(targetHex);
  const clone = JSON.parse(JSON.stringify(source));

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      if (obj.length === 4 && obj.every((v: any) => typeof v === 'number') && obj[3] === 1) {
        obj[0] = target[0];
        obj[1] = target[1];
        obj[2] = target[2];
        obj[3] = target[3];
        return;
      }
      obj.forEach(walk);
    } else {
      Object.values(obj).forEach(walk);
    }
  }

  walk(clone);
  return clone;
}
