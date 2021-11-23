export default function starCount(starCount: number) {
  return starCount > 999
    ? (Math.floor(starCount / 100) * 0.1).toFixed(1) + "k"
    : starCount
}
