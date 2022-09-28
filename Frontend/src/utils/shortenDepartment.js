export function shortenDepartment(department) {
  if (!department.includes(" ")) {
    return department.slice(0, 2).toUpperCase() + "S";
  } else {
    const words = department.split(" ");
    let newWord = "";
    words.forEach((word) => {
      console.log(word);
      newWord = newWord + word.slice(0, 1);
    });
    return newWord;
  }
}
