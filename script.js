const filepath = 'logs/server.log';

$('#filterRegexpBtn').click(function (e) {
  e.preventDefault();

  jQuery.get(filepath, function (data) {
    //alert(data);
    //process text file line by line
    var regexp = $('#filterRegexpText').val();
    var lines = data.split('\n');
    if (regexp) {
      try {
        var strs = regexp.split('/');
        if (strs.length === 1) {
          pattern = strs[0];
          flags = '';
        } else if (strs.length === 3) {
          pattern = strs[1];
          flags = strs[2];
        } else {
          throw 'Input RegExp Error';
        }
        var regex = new RegExp(pattern, flags);
      } catch (error) {
        alert('Error: ' + error);
      }
      var result = filterRegexp(lines, regex);
    } else {
      var result = lines;
    }
    $('#log').html(result.join("<br/>"));
  });
})

function filterRegexp(lines, regex) {
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    //code here using lines[i] which will give you each line
    var found = lines[i].match(regex);
    if (found) {
      result.push(lines[i]);
    }
  }
  return result;
}
