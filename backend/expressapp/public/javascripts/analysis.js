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
    if (res.result.sentiment.label == 'POSITIVE') {
      $('#result-text').text('😀 Positive!');
    } else if (res.result.sentiment.label == 'NEGATIVE') {
      $('#result-text').text('😐 Negative.');
    }
    
    // show and animate the result background-box
    $('#result-wrapper').removeClass('hide');
    $('#result-wrapper').addClass('result-wrapper-animation');
    
    // remove rounded edges between background-boxes
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