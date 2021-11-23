import colors from "constants/colors"

interface Language {
  [key: string]: number
}

type ResultType = {
  name: string
  value: number
  colorValue?: any
}

export default function languagesCount(obj: Language): ResultType[] {
  const Total: number = Object.values(obj).reduce(
    (a: number, b: number) => a + b,
    0
  )
  let result: ResultType[] = []

  for (var i in obj) {
    result = [
      ...result,
      {
        name: i,
        value: Number(((obj[i] / Total) * 100).toFixed(2)),
        colorValue: colors[i as keyof typeof colors].color,
      },
    ]
  }

  return result
}
