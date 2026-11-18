export function getAssetSrc(asset) {
  if (!asset) {
    return undefined;
  }
  if (typeof asset === "string") {
    return asset;
  }
  return asset.src;
}
