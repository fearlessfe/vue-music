function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 数组随机排列
export function shuffle (arr) {
  let array = [...arr]
  for (let i = 0; i < array.length; i++) {
    let j = getRandomInt(0, i)
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
  return array
}

// 节流
export function debounce (func, delay) {
  let timer

  return function (...argv) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, argv)
    }, delay)
  }
}
