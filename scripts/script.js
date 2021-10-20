async function getData(url) {
    let result = await fetch(url);
    let data = await result.json();
    
    console.log( data, 'data' );
    return data;
}


let timerId;

function debounce(e,container) {
    e.preventDefault();

    let query = document.getElementById('query');
    console.log( query.value );

    if(query.length < 3)  return false;
    else 
    {
        if( timerId ) clearTimeout(timerId);
        
        timerId = setTimeout( () => {
            
            let result = getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`);
            result.then((res) => {
                // console.log(res);
                getDataByID(res.meals, container);
            });
        },1000)
    }
}


function getDataByID( data, container ){
    let cont = document.getElementById(`${container}`);
    cont.innerHTML = "";

    if( !data ) { alert('item not found'); return; }
    
    data.forEach( async ({ idMeal }) => {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        let data = await res.json();
        append(data.meals, container)
    })
}


function append( mealList,container) {
    // console.log( mealList ); 
    let cont = document.getElementById(`${container}`);

    mealList.forEach(({strMeal, strMealThumb}) => {
        console.log( strMeal );

        let div = document.createElement('div');

        let img = document.createElement('img');
        img.src = strMealThumb;

        let mealName = document.createElement('p');
        mealName.innerText = strMeal;

        div.append( img, mealName );
        cont.append( div );
    })
}

export {debounce,getData,append};