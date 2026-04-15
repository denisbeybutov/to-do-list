//-------определение функций и переменных--------------

// запоминаем значение заметки перед ее рдактированием
let valueOfNote;
// значение из модального окна в новую заметку
let newNote;
// переменная для тэга списка задач
const list = document.querySelector('.list');
// массив задач
let arrOfNotes = [];

// функция разрешить редактировать другие заметки
function allowEditingOfNotes (userItem) {

    const currentList = userItem.parentElement.parentElement;
        
    document.querySelectorAll('.list__item').forEach(function(list){
        if(list !== currentList) list.querySelector('.list__wrapper-change ').classList.remove('hidden');
    })
}

// функция зачеркивает текст когда чекбокс активен
function crossOutText(){
    list.addEventListener('change', function(event){
        const currentCheckElemenet = event.target;
        if(currentCheckElemenet.classList.contains('list__checkbox')) {
            currentCheckElemenet.nextElementSibling.classList.toggle('line-through')
        }

    })
}

// удаление заметок по кнопке корзины
function deleteNote(){
    list.addEventListener('click', function(event){
        //элемент на котором произошел клик
        const currentClick = event.target;
        //текущая задача
        const currentItemOfList = currentClick.parentElement.parentElement;
        

        // нажали на кнопку корзины
        if(currentClick.classList.contains('delete')) {

            //таймер для отображения на кнопке undo
            const undoCount = document.querySelector('.footer__button-undo-count');
            const undoProgress = document.querySelector('.footer__button-undo-progress');
            undoProgress.setAttribute('style',`width:100%`);
            undoCount.innerHTML = `5`
            let sec = 5;
            let count = setInterval(()=>{
                sec--;
                if(sec === 0) clearInterval(count)
                else {
                    undoCount.innerHTML = `${sec}`
                    undoProgress.setAttribute('style',`width:${sec*20}%`);
                    
                }            
            },1000)      

            // скрываем текущую задачу на 5 секунд
            currentItemOfList.classList.add('hidden');
            //показываем кнопку undo
            const undo = document.querySelector('.footer__button-undo');
            undo.classList.remove('hidden')
            //через 5 секунд скрвыаем undo и удаляем задачу
            let setTimeoutId = setTimeout(()=>{
                undo.classList.add('hidden');
                currentItemOfList.remove();
            }, 5000)
            
            //при нажатии на undo открываем задачу, скрываем кнопку и сбрасываем функции интервалов
            undo.addEventListener('click', function(){
                currentItemOfList.classList.remove('hidden');
                undo.classList.add('hidden')
                clearTimeout(setTimeoutId);
                clearInterval(count);
            })
        }

          

        // показываем картинку пустую - не работает потому что уадление через 5 секунд, а до этого задача просто скрыта
        const countOfNotes = document.querySelectorAll('.list__item').length;
            if (countOfNotes === 0) {
                document.querySelector('.empty').classList.remove('hidden');
            }
        
    })
}

// начать редактирование заметки
function editNote(){
    list.addEventListener('click', function(event){
        const currentEdit = event.target;
        if(currentEdit.classList.contains('edit')) {
            const currentInput = currentEdit.parentElement.previousElementSibling.querySelector('.list__input-text');
            const lengthInput = currentInput.value.length;
            
            valueOfNote = currentInput.value;

            currentInput.removeAttribute('disabled');
            currentInput.focus();
            currentInput.setSelectionRange(lengthInput, lengthInput);

            currentEdit.parentElement.classList.add('hidden');
            currentEdit.parentElement.nextElementSibling.classList.remove('hidden')

            // запретить редактировать другие заметки пока не отредактировали выбранную
            const currentList = currentEdit.parentElement.parentElement;
            document.querySelectorAll('.list__item').forEach(function(list){
                if (list !== currentList) {
                    list.querySelector('.list__wrapper-change ').classList.add('hidden')
                }
            })


        }
    })
}

// закончить редактирование и сохранить изменения
function saveChangesInNote() {
    list.addEventListener('click', function(event){
        const currentOk = event.target;
        
        if(currentOk.classList.contains('end-edit')) {
            currentOk.parentElement.previousElementSibling.classList.remove('hidden');
            currentOk.parentElement.classList.add('hidden');
            currentOk.parentElement.parentElement.querySelector('.list__input-text').setAttribute('disabled','')

            // разрешить редактировать другие заметки
            allowEditingOfNotes(currentOk);
        }
        
    })
}

// отклонить редактирование и сбросить редактирование
function resetChangesInNote() {
    list.addEventListener('click', function(event){
        const currentReset = event.target;
        if (currentReset.classList.contains('reset')) {
            currentReset.parentElement.parentElement.querySelector('.list__input-text').value = valueOfNote;
            currentReset.parentElement.parentElement.querySelector('.list__input-text').setAttribute('disabled', '');
            currentReset.parentElement.classList.add('hidden');
            currentReset.parentElement.previousElementSibling.classList.remove('hidden');

            // разрешить редактировать другие заметки
            allowEditingOfNotes(currentReset);

        }
    })
}

// все изменения заметок кроме добавления
function allChangesWithNotes(){
    crossOutText(); //зачеркнуть
    deleteNote(); // удалить заметку
    editNote(); // начало редактировая заметки
    saveChangesInNote(); // сохранить изменения в заметке
    resetChangesInNote(); //сбросить изменения в заметке
}

// добавить заметку открыть модальное окно
function openWindowForInputNewNote(){
    document.querySelector('.footer__button').addEventListener('click', function(){
        document.querySelector('.wrapper-modal').classList.remove('hidden')
        document.querySelector('.modal__header-input').value = '';
        document.querySelector('.modal__header-input').focus();
    })
    
    exitFromModalWindow(); // выйти из модального окна
    createNewNoteFromInput(); // создаем новую заметку из воода пользователя 
}

// выйти из модального окна
function exitFromModalWindow() {
    document.querySelector('.modal__button-cancel').addEventListener('click', function(){
        document.querySelector('.wrapper-modal').classList.add('hidden')
    })
}

// создаем новую заметку из ввода пользователя
function createNewNoteFromInput() {
    document.querySelector('.modal__button-apply').addEventListener('click', function(){
        
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

        const currentItem = document.querySelector('.list__item')
        if(!currentItem) {
            document.querySelector('.empty').classList.add('hidden')
        }
        const list = document.querySelector('.list');
        list.insertAdjacentElement("afterbegin", newLiElement)

        

        document.querySelector('.wrapper-modal').classList.add('hidden')
        //слушаем все изменения в добавленных заметках
        // allChangesWithNotes();
    })
}

// открыть меню выбора заметок
function openMenu (){
    const btnChoose = document.querySelector('.main__button-choose');
    btnChoose.addEventListener('click', function(){
        this.querySelector('.button-choose__list').classList.toggle('hidden');
        this.querySelector('.top').classList.toggle('hidden');
        this.querySelector('.bottom').classList.toggle('hidden');
    })

    //показать несделанные задачи
    showIncompleteNotes();

    // показать сделанные задачи
    showCompleteNotes();

    // показать все задачи
    showAll();

}

// показать сделанные задачи
function showCompleteNotes(){
    
    document.querySelector('.complete').addEventListener('click', function(){
        showAllNotes();
        list.querySelectorAll('.list__checkbox').forEach(function(item){
            if(item.checked === false) item.parentElement.parentElement.classList.add('hidden');
        })
    });
}
// показать несделанные задачи
function showIncompleteNotes(){
    
    document.querySelector('.incomplete').addEventListener('click', function(){
        showAllNotes();
        list.querySelectorAll('.line-through').forEach(function(item){
            item.parentElement.parentElement.classList.add('hidden')
        })
    })
}

// показать все задачи при нажатии на кноку all в списке
function showAll(){
    document.querySelector('.all').addEventListener('click', showAllNotes)
}

// показать все задачи, вспомогательная функция
function showAllNotes(){
    list.querySelectorAll('.list__item').forEach(function(item){
        item.classList.remove('hidden');
    })
}

// поиск 
function search(){
    document.querySelector('.main__input').addEventListener('input', function(event){
        showAllNotes();
        const searchString = event.target.value.toLowerCase();
        list.querySelectorAll('.list__input-text').forEach(function(text){
            
            if(!text.value.toLowerCase().includes(searchString)) {
                text.parentElement.parentElement.classList.add('hidden')
            }
        })

    })
}


function saveNotesInLocalStorage() {

    arrOfNotes = JSON.parse(localStorage.getItem('arrOfNotes'))
    
    if(arrOfNotes === null) saveArrOfNotes();     
    const inputText = document.querySelectorAll('.list__input-text');
    for(let i = 0;i<(arrOfNotes.length - inputText.length);i++) {
       
       document.querySelector('.list').innerHTML += `
                           <li class="list__item">
                       <div class="list__wrapper-note">
                           
                           <input class="list__checkbox" type="checkbox" id="checkbox1">
                           
                           <input class="list__input-text" type="text" value="new obj" disabled>
                       </div>
                       <div class="list__wrapper-change">
                           <img class="list__icon edit" src="./icons/change.svg" alt="" width="13px">
                           <img class="list__icon delete" src="./icons/trash.svg" alt="" width="18px">
                       </div>
                       <div class="list__wrapper-edit hidden">
                           <img class="list__icon end-edit" src="./icons/check2.svg" width="17px" alt="">
                           <img class="list__icon reset" src="./icons/close.svg" width="17px" alt="">
                       </div>
                   </li>
                       `
    }
    //вставляем значения из массива в разметку
    document.querySelectorAll('.list__input-text').forEach(function(text,index){
       text.value = arrOfNotes[index].text;
       text.previousElementSibling.checked = arrOfNotes[index].checked;
       if(arrOfNotes[index].checked === true) text.classList.add('line-through');
    })
    
    
    //сохранить данные по кнопке save в локальном хранилище
    function saveArrOfNotes(){
       arrOfNotes = [];
       document.querySelectorAll('.list__input-text').forEach(function(textOfNote){
           arrOfNotes.push({
               text: textOfNote.value,
               checked: textOfNote.previousElementSibling.checked
           });
       })    
    //    console.log(arrOfNotes)
       localStorage.setItem('arrOfNotes', JSON.stringify(arrOfNotes))
       
       
    }
    
    document.querySelector('.save').addEventListener('click', saveArrOfNotes)
    }
    
//----------начало программы---------

allChangesWithNotes(); //удаление редактирование зачеркивание заметок
openWindowForInputNewNote(); //окрыть модальное окно для ввода новой заметки
openMenu(); //открыть меню выбора заметок
search(); //поиск
saveNotesInLocalStorage(); //сохранение данных в локальном хранилище





// недоделки

// пустую картинку если при поиске нет ничего
// крестик в строке поиска чтобы удалить ввод
// пустую картинку если выбираешь сделанные и не сдалнные задачи а там ничего не нашлось
// поиск сбрасывает фильтр по седеланным и не сделанным - надо запоминать состояние всех элеметов перед вводом и искать только среди тех что показываются 