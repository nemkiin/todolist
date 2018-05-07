$(function(){
// new to-do
$('input.new-todo').keypress(function(a){
    let inpValue = $('input.new-todo').val();
    if(a.charCode === 13  && inpValue != ''){
        //add new <li>
        $('ul.todo-list').append('<li><div class="view"><input class="toggle" type="checkbox"><label>' + inpValue + '</label><button class="destroy"></button></div><input class="edit" value= "' + inpValue +' "></li>');
        //delete input place
        $('input.new-todo').val(''); 
        updateCounters();
    }
  
})

// cheked -- uncheked
$('body').on('change','input.toggle' , function(event){
    let toggle = event.target;
    if(toggle.checked){
        $(toggle).parents('li').addClass('completed');
    }else{
        $(toggle).parents('li').removeClass('completed');
    }
    updateCounters();
})
//function destroy to-do
$('body').on('click','button.destroy', function(event){
    $(event.target).parents('li').remove();
    updateCounters();

})

//mark all as completed
$('input.toggle-all').change(function(event){
    if(event.target.checked){
    $('ul.todo-list li').addClass('completed');
    $('ul.todo-list input.toggle').prop('checked', true);
    }else{
    $('ul.todo-list li').removeClass('completed');
    $('ul.todo-list input.toggle').prop('checked', false);
}
updateCounters();
})


//filters all/active/completed---------

$('a[href="#/"').click(function(){
    $('.todo-list li').hide();
    $('.todo-list li').show();
    $('li a').removeClass('selected');
    $('a[href="#/"').addClass('selected');


});
$('a[href="#/active"]').click(function(){
    $('.todo-list li').hide();
    $('.todo-list li').show();
    $('li.completed').hide();
    $('li a').removeClass('selected');
    $('a[href="#/active"]').addClass('selected');


})
$(' a[href="#/completed"]').click(function(){
    $('.todo-list li').hide();
    $('li.completed').show();
    $('li a').removeClass('selected');
    $('a[href="#/completed"]').addClass('selected');    
})


//button clear compleated-------------------
$('button.clear-completed').click(function(event){
    $('li.completed').remove();
    $('button.clear-completed').hide();
    updateCounters()
})



//yuriy code----------------------------------------
$('body').on('blur', 'ul.todo-list input.edit', function (event) {
    console.log("faas");
    if (event.target.value.length > 0) {
    $(event.target).parents('li').removeClass('editing');
    $(event.target).parents('li').find('label').html(event.currentTarget.value);
    }else if ($(event.target).parents('li').hasClass('completed')){
    $(event.target).parents('li').remove();    
    }})
//---------------------------------------------------


$('body').keypress(function (event) {
    console.log(event);
    if (event.charCode === 13) {
        $('ul.todo-list li.editing').removeClass('editing');
    }
})


//editing function-----------------------------------
$('body').on('dblclick', 'ul.todo-list li', function(event){  
    $(event.currentTarget).addClass('editing'); 
    $(event.currentTarget).find('input').focus();
    updateCounters();
 
})

//counter-----------------------------
   $('body').change(updateCounters);

function updateCounters() {
    let allLi = $('ul.todo-list li').length;
        let compledLi = $('.completed').length;
        let aciveLi =  allLi -compledLi;
        let countText = '<strong>' + aciveLi + '</strong> item left'
        $('span.todo-count').html(countText);
        //delete button "clear compleated"
        if(compledLi == 0){
            $('button.clear-completed').hide();
        }else{
            $('button.clear-completed').show();
        }
        if(allLi == 0){
            $('footer').css('display', 'none');
        }else{
            $('footer').css('display', 'block');
        }
}
updateCounters();
});