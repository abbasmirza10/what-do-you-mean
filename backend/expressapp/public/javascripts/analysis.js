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
    // Update sentiment bar
    var positivity = 0;
    if (res.result.sentiment.label == 'POSITIVE') {
      positivity = res.result.sentiment.score;
    } else if (res.result.sentiment.label == 'NEGATIVE') {
      positivity = 1 - res.result.sentiment.score;
    }
    $('#result-bar').attr('value', 0.05 + positivity * 0.9);
    $('#result-score').text(Math.round(positivity * 100).toString() + '%');
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