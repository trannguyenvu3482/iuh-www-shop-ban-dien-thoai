export function formatVND(number) {
  if (!number) return 0
  return number.toLocaleString('vi-VN')
}
