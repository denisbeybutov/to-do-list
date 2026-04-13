let valueOfNote;

// зачеркивает текст когда чекбокс активен
document.querySelectorAll('.list__checkbox').forEach(check => {
    check.addEventListener('change', function(){
        check.nextElementSibling.classList.toggle('line-through')
    })
})

// удаление заметок по кнопке корзины
document.querySelectorAll('.delete').forEach(function(trash) {
    trash.addEventListener('click', function(){
        const currentTrash = trash.parentElement.parentElement;
        currentTrash.remove();
        console.log( )
        const countOfNotes = document.querySelectorAll('.list__item').length;
        if (countOfNotes === 0) {
            document.querySelector('.empty').classList.remove('hidden');
        }

    })
})

// начать редактирование заметки
document.querySelectorAll('.edit').forEach(function(ed) {
    ed.addEventListener('click', function(){
        
        const input = ed.parentElement.parentElement.querySelector('.list__input-text')
        const length = input.value.length;
        valueOfNote = input.value;
        
        input.removeAttribute('disabled')
        input.focus();
        input.setSelectionRange(length, length)

        ed.parentElement.classList.add('hidden')
        ed.parentElement.nextElementSibling.classList.remove('hidden')
        
        // запретить редактировать другие заметки пока не отредактировали выбранную
        const currentList = ed.parentElement.parentElement;
        document.querySelectorAll('.list__item').forEach(function(list){
            if (list !== currentList) {
                list.querySelector('.list__wrapper-change ').classList.add('hidden')
            }
        })
    })
})

// закончить редактирование и сохранить изменения
document.querySelectorAll('.end-edit').forEach(function(item){
    item.addEventListener('click', function(){
        
        item.parentElement.previousElementSibling.classList.remove('hidden')
        item.parentElement.classList.add('hidden')
        
        item.parentElement.parentElement.querySelector('.list__input-text').setAttribute('disabled','')

        // разрешить редактировать другие заметки
        allowEditingOfNotes(item);
    })
})

// отклонить редактирование и сбросить редактирование

document.querySelectorAll('.reset').forEach(function(res){
    res.addEventListener('click', function(){
        
        res.parentElement.parentElement.querySelector('.list__input-text').value = valueOfNote;
        res.parentElement.parentElement.querySelector('.list__input-text').setAttribute('disabled', '');
        res.parentElement.classList.add('hidden');
        res.parentElement.previousElementSibling.classList.remove('hidden');
        // разрешить редактировать другие заметки
        allowEditingOfNotes(res);

    })
})

// функция разрешить редактировать другие заметки
function allowEditingOfNotes (userItem) {

    const currentList = userItem.parentElement.parentElement;
        
    document.querySelectorAll('.list__item').forEach(function(list){
        if(list !== currentList) list.querySelector('.list__wrapper-change ').classList.remove('hidden');
    })
}