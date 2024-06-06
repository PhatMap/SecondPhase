const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatToVND = (number) => vndFormatter.format(number);

export const formatToVNDWithSymbol = (number, symbol = "VND") => {
  const formatted = vndFormatter.formatToParts(number);
  const parts = formatted.map((part) => {
    if (part.type === "currency") {
      return symbol;
    }
    return part.value;
  });

  return parts.join("");
};

export const formatToVNDWithVND = (number) =>
  formatToVNDWithSymbol(number, "VNĐ");
export const formatToVNDWithDong = (number) =>
  formatToVNDWithSymbol(number, "đồng");
