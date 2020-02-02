$(document).ready(function(){    
  //all products
  $.getJSON('../data/data.json', function(data){  
      var arr = []; 
      for (var i = 0; i < data.length; i++){
        arr.push('<li><img src="' + data[i].img +'"/><span>' + data[i].name +'</span><span>' + data[i].price +'</span></li>');
      }
      for (var i = 0; i < 8; i++){
        $('#result').append(arr[i]);
      }
  });
  // plagination 
  $('#result').html('');
  $.getJSON('../data/data.json', function(data){         
    $.each(data, function(key, value){   
      var $sumData = data.length;
      var $page = Math.ceil($sumData/8);           
      var plagin = '';
      for (var i = 0; i < $page; i++){           
        var roundNumber = (i + 1);           
        plagin += '<li><a href="' + roundNumber + '">' + roundNumber + '</a></li>';
      }
      $('.nav-products').html(plagin);
      $('.nav-products li a').click(function(e){ 
        $('#result').html('');               
        e.preventDefault();                
        var $eventPlagination = Number($(this).attr('href'));               
        var item = $eventPlagination * 8 - 1;   
        for (var i = 0; i < 8; i++){           
          $('#result').append('<li><img src="' + data[item - i].img +'"/><span>' + data[item - i].name +'</span><span>' + data[item - i].price + '</span></li>'); 
        }               
      });                             
    });
  });
  //filter
  $('#search').keyup(function(){       
    $('#result').html(''); 
    var serchField = $('#search').val();   
    var expression = new RegExp(serchField, 'i'); 
    var arr = [];  
    $.getJSON('../data/data.json', function(data){ 
      $.each(data, function(key, value){
        if(value.name.search(expression) != -1 ){                                       
          arr.push('<li><img src="' + value.img +'"/><span>' + value.name +'</span><span>' + value.price +'</span></li>');
        }            
        $('#result').html('');
        for (var i = 0; i < 8; i++){
          $('#result').append(arr[i]);
        }
        var $sumData = arr.length;
        $('.nav-products').html('');
        var $page = Math.ceil($sumData/8);                         
        var plagin = '';
        for (var i = 0; i < $page; i++) {           
          var roundNumber = (i + 1);          
          $('.nav-products').append('<li><a href="' + roundNumber + '">' + roundNumber + '</a></li>'); 
        }   
        $('.nav-products li a').click(function(e){ 
          $('#result').html('');               
          e.preventDefault();                
          var $eventPlagin = Number($(this).attr('href'));               
          var item = $eventPlagin * 8 - 1;  
          for (var i = 0; i < 8; i++){           
            $('#result').append(arr[item - i]);
          }        
        });                            
      });
    });
  });  
});