let container = document.getElementById('container');

function navbar(){
    return `<h3><a href = './home.html'> Home </a> </h3>
    
    <div id = 'options'>
    <h3><a href = './recepieOfTheDay.html'>Recepie of the day</a></h3>
    <h3><a href = './latestRecepie.html'>Show latest recepie</a></h3>
    </div>`
}


async function getData(url) {
    let result = await fetch(url);
    let data = await result.json();
    
    // console.log( data, 'data' );
    return data;
}


export default navbar;