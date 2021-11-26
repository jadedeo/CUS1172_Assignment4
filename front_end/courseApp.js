var updateView = async(button) => {
    //console.log(button.dataset.querytype);
    let numQueries  = 0;
    let nameQ = document.querySelector("#nameQuery").value;
    let codeQ = document.querySelector("#codeQuery").value;
    let levelQ = document.querySelector("#levelQuery").value;
    let titleQ = document.querySelector("#titleQuery").value;

    if(nameQ.length > 0){
        numQueries++;
    }
    if(codeQ.length > 0){
        numQueries++;
    }
    if(levelQ.length > 0){
        numQueries++;
    }
    if(titleQ.length > 0){
        numQueries++;
    }

    if(numQueries == 0){
        alert("Please enter a query.");
    }
    else if(numQueries > 2){
        alert("Please enter only a max of 2 queries.");
    }
    else{
        if(nameQ.length > 0){
            console.log("name is not empty");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = nameQ;
                api = `http://localhost:3000/api/by_instructor/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        } 

        if(codeQ.length > 0){
            console.log("code is not empty");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = codeQ;
                api = `http://localhost:3000/api/by_course_code/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        }

        if(levelQ.length > 0){
            console.log("level is not empty");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = levelQ;
                api = `http://localhost:3000/api/by_level/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        }

        if(titleQ.length > 0){
            console.log("title is not empty");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = titleQ;
                api = `http://localhost:3000/api/by_title/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        }
    }  
}

var renderView = (model) => {
    var source = document.querySelector("#resultsView").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);

    document.querySelector("#results").innerHTML = html;
}