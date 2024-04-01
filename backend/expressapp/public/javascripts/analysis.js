const form = document.getElementById("form");
const sentenceField = document.getElementById("sentence-field");
const submitField = document.getElementById("submit-field");
const resultText = document.getElementById("result-text");
const result = document.getElementById("result");

$(form).submit( () => {
  fetch("/model", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sentence: sentenceField.value
    })
  })
  .then( (res) => res.json())
  .then( (res) => { 
    resultText.innerText = res['result'];
    result.classList.remove("hide");
    console.log('response JSON', res);
    console.log('result', res['result']);
  });
  return false; // return false to not reload page
});