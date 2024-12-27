const unitTexts = [
  "",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];

const scaleTexts = [
  "",
  "nghìn",
  "triệu",
  "tỷ",
  "nghìn tỷ",
  "triệu tỷ",
  "tỷ tỷ",
];

function readNumber(number) {
  let result = "";
  let scaleIndex = 0;
  const lastScaleIndex = Math.floor(String(number).length / 3);

  if (number === 0) return "không đồng";

  do {
    const hasScale = scaleIndex !== lastScaleIndex;
    const threeDigits = readThreeDigits(number % 1000, hasScale);

    if (threeDigits) {
      result = `${threeDigits} ${scaleTexts[scaleIndex]} ${result}`;
    }

    number = Math.floor(number / 1000);
    scaleIndex++;
  } while (number > 0);

  const output = result.trim() + " đồng";

  return output[0].toUpperCase() + output.slice(1);
}

function readThreeDigits(number, hasScale = false) {
  const hundreds = Math.floor(number / 100);
  const remainder = number % 100;
  const tens = Math.floor(remainder / 10);
  const units = remainder % 10;

  let result = "";

  if (hundreds > 0) {
    result += unitTexts[hundreds] + " trăm ";
  } else if (hasScale && (tens > 0 || units > 0)) {
    result += "không trăm ";
  }

  if (tens > 1) {
    result += unitTexts[tens] + " mươi ";
  } else if (tens === 1) {
    result += "mười ";
  } else if (hasScale && units > 0) {
    result += "lẻ ";
  }

  if (tens > 1 && units === 1) {
    result += "mốt";
  } else if (tens > 0 && units === 5) {
    result += "lăm";
  } else if (units > 0) {
    result += unitTexts[units];
  }

  return result.trim();
}

console.log("========== Read Number +++++++");

console.log(readNumber(0));
console.log(readNumber(1));
console.log(readNumber(5));
console.log(readNumber(10));
console.log(readNumber(11));
console.log(readNumber(15));
console.log(readNumber(21));
console.log(readNumber(100));
console.log(readNumber(123));
console.log(readNumber(234));
console.log(readNumber(1000));
console.log(readNumber(1001));
console.log(readNumber(1200));
console.log(readNumber(325567676));
