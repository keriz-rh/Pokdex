// Se obtienen los elementos HTML del DOM a través de sus clases
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon_image');

// Se obtienen los elementos HTML del formulario de búsqueda y botones de navegación
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');

// Se inicializa la variable searchPokemon con el valor 1 para cargar el primer pokémon
let searchPokemon = 1;

// Función asíncrona que realiza una petición HTTP GET a la API de PokeAPI para obtener los datos de un pokémon por su ID
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    
    // Si la respuesta de la API es satisfactoria, se devuelve un objeto JSON con los datos del pokémon
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    } 
}

// Función asíncrona que renderiza los datos del pokémon en la interfaz gráfica
const renderPokemon = async (pokemon) => {

    // Se muestra el mensaje de "Cargando" mientras se realizan las operaciones
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    // Se obtienen los datos del pokémon a través de la función fetchPokemon
    const data = await fetchPokemon(pokemon);

    // Si existen datos, se actualizan los elementos HTML con la información del pokémon
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    } else {
        // Si no se encuentran datos del pokémon, se muestra un mensaje de error
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found, :c';
        pokemonNumber.innerHTML = '';
    }
}

// Se agrega un listener al evento submit del formulario de búsqueda para ejecutar la función renderPokemon con el valor del input del usuario
form.addEventListener(`submit`, (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase());
});

// Se agrega un listener al evento click del botón "Anterior" para mostrar el pokémon anterior en la lista
buttonPrev.addEventListener(`click`, () => {
    if (searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon);
    }
}); 

// Se agrega un listener al evento click del botón "Siguiente" para mostrar el pokémon siguiente en la lista
buttonNext.addEventListener(`click`, () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
});

// Se carga el primer pokémon al cargar la página
renderPokemon(searchPokemon)
