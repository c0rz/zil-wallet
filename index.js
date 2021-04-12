const fs = require("fs");
const readlineSync = require("readline-sync");
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require("@zilliqa-js/crypto");

const { generatePrivateKey } = require("@zilliqa-js/crypto/dist/schnorr");

(async () => {
  try {
    const jml = readlineSync.question("[>] how much : ");
    for (var i = 0; i < jml; i++) {
      const getPk = generatePrivateKey();
      const getAddress = getAddressFromPrivateKey(getPk);
      console.log(
        `Private Key: ${getPk}\nAddress: ${toBech32Address(getAddress)}\n`
      );
      fs.appendFileSync("list.txt", `${toBech32Address(getAddress)}\n`);
      fs.appendFileSync(
        "address.txt",
        `${toBech32Address(getAddress)}|${getPk}` + "\r\n"
      );
    }
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }
})();
