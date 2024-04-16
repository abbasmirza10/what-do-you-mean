// The function is called when the form is submitted.
// This can be trigger by pressing ENTER in the textbox.
$(form).submit( () => {
  fetch('/model', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sentence: $('#text-input').val()
    })
  })
  .then( (res) => res.json())
  .then( (res) => {
    // calculate positivity
    var positivity = Math.round(res.analysis.sentiment.score * 100);
    if (res.analysis.sentiment.label == 'NEGATIVE') {
      positivity = 100 - positivity;
    }
    // Update sentiment bar
    $('#sentiment-bar').attr('value', 5 + positivity * 0.9);

    // Update sentiment score
    score_text = positivity.toString() + '%';
    if (positivity < 10) {
      score_text = ' ' + score_text;
    }
    $('#sentiment-score').text(score_text);
    return res;

  }).then( (res) => {
    // calculate sarcasm
    var sarcasm = Math.round(res.analysis.sarcasm.score * 100);
    if (res.analysis.sarcasm.label == 'NO') {
      sarcasm = 100 - sarcasm;
    }
    // Update sarcasm bar
    $('#sarcasm-bar').attr('value', 5 + sarcasm * 0.9);

    // Update sarcasm score
    score_text = sarcasm.toString() + '%';
    $('#sarcasm-score').text(score_text);
    return res;

  }).then( (res) => {
    // Show and animate the result background-box
    $('#result-wrapper').removeClass('hide');
    $('#result-wrapper').addClass('result-wrapper-animation');
    
    // Remove rounded edges between background-boxes
    $('#text-input-wrapper').css('border-bottom-left-radius', '0px');
    $('#text-input-wrapper').css('border-bottom-right-radius', '0px');
    $('#result-wrapper').css('border-top-left-radius', '0px');
    $('#result-wrapper').css('border-top-right-radius', '0px');

    console.log('response JSON', res);
  });
  return false; // return false to not reload page
});

document.getElementById('result-wrapper').addEventListener('animationend', () => {
  $('#result-content').removeClass('hide');
})