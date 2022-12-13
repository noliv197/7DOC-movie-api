export function model(id,url,titulo,ano,nota,descricao, ehFavorito) { 
    let favorito = atribuiFavorito(ehFavorito)
    return `
        <div class="card">
            <div class="card-container" data-id=${id}>
                <img src="https://image.tmdb.org/t/p/w154/${url}" alt="${titulo}">
                <div class="card-info">
                    <h2>${titulo} (${ano})</h2>
                    <span>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        ${nota}
                    </span>                    
                    <span id='curtir' data-favorito=${ehFavorito}>
                        ${favorito}
                    </span>
                </div>
            </div>
            <div class = "card-descricao">
                <p>${descricao}</p>
            </div>
        </div>
`}

export function atribuiFavorito(ehFavorito){
    if(ehFavorito){
        return `
            <i class="fa fa-heart" aria-hidden="true"></i>
            Favoritar
        `
    }
    else{
        return `
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            Favoritar
        `
    }
} 
