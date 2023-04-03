const ToTitleCase = (str) => {
  if (str === undefined) return
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default ToTitleCase
