const myTuple: [string, number] = ["seungkyoo", 170];

function printMyInfo(label: string, info: [string, number]): void {
  console.log(`[${label}]`, ...info);
}

myTuple.push("hhhh", 2);

printMyInfo("튜플 테스트", myTuple);
