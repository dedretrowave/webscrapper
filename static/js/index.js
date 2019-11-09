const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const inputValue = document.querySelector('.input').value,
        csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    let data = new FormData(),
        headers = new Headers();

    const csrftoken = document.cookie.split(';')[0];
    headers.append('X-CSRFToken', csrftoken);

    data.append('search', inputValue);
    data.append('csrfmiddlewaretoken', csrfToken);

    document.querySelector('.main').innerHTML += '<div class="loading"></div>';
    fetch('/new_search', {
        method: 'POST',
        body: data,
        headers: headers,
    }).then((data) => {
        return data.json();
    }).then(({search, final_postings}) => {
        document.querySelector('.loading').remove();
        document.querySelector('.main').innerHTML += template(search, final_postings);
    }).catch(err => {
        console.log(err);
    })
});