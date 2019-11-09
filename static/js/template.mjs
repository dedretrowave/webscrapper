const template = (search, posts) => {
    let template = `
            <h2 style="text-align: center">${search}</h2>
            <div class="row">`;

    if(posts) {
        for (let post of posts) {
            template += `
            <div class="col s4">
                <div class="card">
                    <div class="card-image">
                        <a href="${post[1]}"><img src="${post[3]}" alt=""></a>
                    </div>
                    <div class="card-content">
                        <p>${post[0]}</p>
                    </div>
                    <div class="card-action">
                        <a href="${post[1]}">View listing: Price ${post[2]}</a>
                    </div>
                </div>
            </div>`
        }
    } else {
        template += `
            <div class="container">
                <h2 style="text-align: center">Nothing Found for ${search} :(</h2>
            </div>
        </div>`
    }
    return template};