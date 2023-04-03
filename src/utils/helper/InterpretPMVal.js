export const interpretPMVal = (val) => {
  switch (true) {
    case val > 300:
      return 'Berbahaya'
    case val > 200:
      return 'Sangat tidak sehat'
    case val > 100:
      return 'Tidak sehat'
    case val > 50:
      return 'Sedang'
    case val > 0:
      return 'Aman'
    default:
      return 'Value is not correct!'
  }
}
