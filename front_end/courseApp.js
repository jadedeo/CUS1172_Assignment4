var updateView = async(button) => {
    //console.log(button.dataset.querytype);
    if(button.dataset.querytype == 'by_name'){
        let queryValue = document.querySelector("#nameQuery").value;
        api = `http://localhost:3000/api/by_instructor/${queryValue}`;

        const data = await fetch(api);
        const model = await data.json();
        renderView(model);
    }

    
}

var renderView = (model) => {
    var source = document.querySelector("#resultsView").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);

    document.querySelector("#results").innerHTML = html;
}