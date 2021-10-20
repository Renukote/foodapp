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

function rpOfTheDay(mealList,container) {
    let cont = document.getElementById(`${container}`);

    mealList.forEach((meal) => {
        console.log( meal );
        let div = document.createElement('div');

        let img = document.createElement('img');
        img.src = meal.strMealThumb;

        let mealName = document.createElement('p');
        mealName.innerHTML = `<b>${meal.strMeal}`;

        let category  = document.createElement('p');
        category.innerHTML = `<b>Category: </b?\> ${meal.strCategory}`;

        let area  = document.createElement('p');
        area.innerHTML = `<b>Area: </b> ${meal.strArea}`;

        let inst  = document.createElement('p');
        inst.innerHTML = `${meal.strInstructions}`;

        let source = document.createElement('a');
        source.innerHTML = `<b>Source: <b> ${meal.strSource}<br/>`;
        source.href = meal.strSource;

        let yt  = document.createElement('a');
        yt.innerHTML = `<b>Youtube: </b> ${meal.strYoutube}`;
        yt.href = meal.strYoutube;

        let tags  = document.createElement('p');
        tags.innerText= meal.strTags;

        div.append( img, mealName, category, area, inst, source, yt, tags );
        cont.append( div );
    })
}

export {debounce,getData,append,rpOfTheDay};