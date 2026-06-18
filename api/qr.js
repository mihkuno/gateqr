
const QRCode = require("qrcode");

const token = '1';

QRCode.toFile("vehicle.png", token, {
    errorCorrectionLevel: "H",
    margin: 2,
    scale: 24
});

console.log(token);