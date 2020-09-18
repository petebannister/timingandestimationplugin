// Move the add hours box next to the comment box
var TandE_MoveAddHours = function(){
  // Couldnt find the comment box, lets just abort
  if ($('#comment').length == 0) return;
  var tbl, hours, colClass, tr, replacement;
  tbl = $('<table style="border:1px solid #D7D7D7;" border="0" cellpadding="3" cellspacing="0"><tbody><tr></tr></tbody></table>');
  $('#comment').parent().parent().after(tbl);
  hours = $('#field-hours');
  colClass = hours.parent().attr("class");
  tr = hours.parent().parent();
  $(tbl[0].rows[0]).append($('.'+colClass, tr));
  replacement = $('<td class="'+colClass+'"></td>');
  tr.prepend(replacement.clone()).prepend(replacement.clone());
};

/*
 * Rewritten by Russ Tyndall when this started failing on Trac 1
 *
 *   Code by Josh Godsiff, for www.oxideinteractive.com.au
 *   Email: josh@oxideinteractive.com.au
 */
$.prototype.cleanupTable = function() {
  // make sure that body
  if($(this).is('table')) {
    var bodies = $(this).children('thead, tbody, tfoot');
  } else if($(this).is('thead, tbody, tfoot')) {
    var bodies = $(this);
  } else {
    return;
  }
  // helper to determine if a table cell has visible content
  var has_contents =function has_contents(it){
    if(!it) return it;
    var t=$(it).text();
    if(t && $.trim(t).length>0 ) return true;
    return false;
  };
  var push = function push(l, k0, k1){
    if(has_contents(k0) || has_contents(k1)) l.push([k0, k1]);
  }
  $(bodies).each(function(bodyIdx, body){
    body = $(body);
    var trs = $(body).children('tr');
    var leftTds=[], rightTds=[];
    $(trs).each(function(ind, val){
      var kids = $(this).children();

      push(leftTds, kids[0], kids[1]);
      push(rightTds, kids[2], kids[3]);
      $(this).detach();
    });
    //console.log('Reordering Fields: \nleft:', leftTds, '\nright:',rightTds);
    while(leftTds.length>0 || rightTds.length>0){
      var tr = $('<tr>');
      var leftContent = leftTds.shift() || rightTds.shift();
      tr.append(leftContent[0]).append(leftContent[1]);
      if($(leftContent[1]).attr('colspan')!="3"){ // dont already have a full row
        var rightContent = rightTds.shift();
        if(rightContent) tr.append(rightContent[0]).append(rightContent[1]);
      }
      $(body).append(tr);
    }
    // console.log('Finished Reordering Fields: \nleft:', leftTds, '\nright:',rightTds);
  });
};

$(document).ready(function() {
  // Give other layout changing functions time to run

  // move add hours input to next to the comment box
  TandE_MoveAddHours();
  // remove add_hours from header
  $('#h_hours,#h_hours + td').empty();

  //remove whitespace caused by the above
  $('#properties table').cleanupTable();
  $('table.properties').cleanupTable();

});
