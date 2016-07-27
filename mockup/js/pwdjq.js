$(document).ready(function(){
    var placeholder = "";
    
    $('#pwd').keyup(function(){
     
        placeholder = $(this).val().replace(/./g, "•")
        $(this).val(placeholder);
        
    });

    $('#repwd').keyup(function(){
     
        placeholder = $(this).val().replace(/./g, "•")
        $(this).val(placeholder);
        
    });
    
});