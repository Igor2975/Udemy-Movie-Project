/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    let block = document.querySelectorAll('.promo__adv img');
    let poster = document.querySelector('.promo__bg ');
    let genre = poster.querySelector('.promo__genre');
    let movieList = document.querySelector('.promo__interactive-list');
    let form = document.querySelector('form.add');
    let formInput = form.querySelector('.adding__input');
    let checkbox = form.querySelector('[type = checkbox]');

    //убираем рекламу
    const addBlock = (arr) => {
        arr.forEach((item) => {
            item.remove();
        });
    }



    const changeBlock = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")'
    }

    //сортируем список
    const sort = (arr) => {
        arr.sort();
    };




    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilms = formInput.value;
        let favorit = checkbox.checked;

        if (newFilms) {
            if (newFilms.length > 21) {
                newFilms = `${newFilms.substring(0,22)}...`
            }
            movieDB.movies.push(newFilms);
            sort(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }
        if (favorit) {
            console.log('Добавляем любимый фильм')
        }

        form.reset();
    })


    //создаем новый список
    const createMovieList = (films, parent) => {
        parent.innerHTML = '';
        sort(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
        <ul class="promo__interactive-list">
            <li class="promo__interactive-item">${i + 1}.${film}
                <div class="delete"></div>
            </li>
        </ul>
        `
        });

        //удаление элементов 
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(movieDB.movies, movieList);
            })
        })
    }

    addBlock(block);
    changeBlock();
    createMovieList(movieDB.movies, movieList);

});