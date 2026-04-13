// зачеркивает текст когда чекбокс активен
document.querySelectorAll('.list__checkbox').forEach(check => {
    check.addEventListener('change', function(){
        check.nextElementSibling.classList.toggle('line-through')
    })
})

// удаление заметок по кнопке корзины
document.querySelectorAll('.delete').forEach(function(trash) {
    trash.addEventListener('click', function(){
        console.log('delete', trash.parentElement.parentElement)
        trash.parentElement.parentElement.remove();
    })
})

// редактирование заметки
document.querySelectorAll('.edit').forEach(function(ed) {
    ed.addEventListener('click', function(){
        
        const input = ed.parentElement.parentElement.querySelector('.list__input-text')
        const length = input.value.length;
        input.removeAttribute('disabled')
        input.focus();
        input.setSelectionRange(length, length)

        ed.parentElement.classList.add('hidden')
        ed.parentElement.nextElementSibling.classList.remove('hidden')
        
    })
})

// принять редактирование
document.querySelectorAll
