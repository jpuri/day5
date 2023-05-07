const input = Deno.readTextFileSync("input.txt")
  .split("\n\n")
  .filter((line) => line !== "");

const cratesStrArr = input[0].split("\n");
const crates = cratesStrArr[cratesStrArr.length - 1]
  .split("   ")
  .reduce((result: string[][]) => {
    result.push([]);
    return result;
  }, []);

for (let i = cratesStrArr.length - 2; i >= 0; i--) {
  for (let j = 0; j < crates.length; j++) {
    const crateStr = cratesStrArr[i]
      .replaceAll("     ", " [-] ")
      .replaceAll("    [", "[-] [")
      .replaceAll("]    ", "] [-]")
      .split(" ");
    if (crateStr[j][1] && crateStr[j][1] !== "-") {
      crates[j].push(crateStr[j][1]);
    }
  }
}

const steps = input[1].split("\n").map((dat: string) => {
  const inputArr = dat.split(" ");
  return {
    move: parseInt(inputArr[1]),
    from: parseInt(inputArr[3]),
    to: parseInt(inputArr[5]),
  };
});

steps.forEach((step) => {
  const { move, from, to } = step;
  for (let i = 0; i < move; i++) {
    const val = crates[from - 1].pop();
    if (val) {
      crates[to - 1].push(val);
    }
  }
});

console.log(
  crates
    .map((crateArr) => crateArr[crateArr.length - 1])
    .reduce((result, val) => `${result}${val ? val : ""}`, "")
);
