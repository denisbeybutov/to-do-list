// запоминаем значение заметки перед ее рдактированием
let valueOfNote;

// функция разрешить редактировать другие заметки
function allowEditingOfNotes (userItem) {

    const currentList = userItem.parentElement.parentElement;
        
    document.querySelectorAll('.list__item').forEach(function(list){
        if(list !== currentList) list.querySelector('.list__wrapper-change ').classList.remove('hidden');
    })
}

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

// добавить заметку

document.querySelector('.footer__button').addEventListener('click', function(){
    document.querySelector('.wrapper-modal').classList.remove('hidden')
})

// выйти из модального окна
function exitFromModalWindow() {
    document.querySelector('.modal__button-cancel').addEventListener('click', function(){
        document.querySelector('.wrapper-modal').classList.add('hidden')
    })
}

exitFromModalWindow();

// значение из модального окна в новую заметку
let newNote;
document.querySelector('.modal__button-apply').addEventListener('click', function(){
    console.log('click', document.querySelector('.modal__header-input').value);
    newNote = document.querySelector('.modal__header-input').value;
    
    // exitFromModalWindow();
    const newLiElement = document.createElement('li')
    newLiElement.setAttribute('class', 'list__item')
    newLiElement.innerHTML = 
    `
                    <div class="list__wrapper-note">
                        
                        <input class="list__checkbox" type="checkbox" id="checkbox1">
                        
                        <input class="list__input-text" type="text" value="${newNote}" disabled>
                    </div>
                    <div class="list__wrapper-change">
                        <img class="list__icon edit" src="./icons/change.svg" alt="" width="13px">
                        <img class="list__icon delete" src="./icons/trash.svg" alt="" width="18px">
                    </div>
                    <div class="list__wrapper-edit hidden">
                        <img class="list__icon end-edit" src="./icons/check2.svg" width="17px" alt="">
                        <img class="list__icon reset" src="./icons/close.svg" width="17px" alt="">
                    </div>
                `;
    document.querySelector('.list__item').insertAdjacentElement("beforebegin", newLiElement)
    
    
    document.querySelector('.wrapper-modal').classList.add('hidden')
    
})