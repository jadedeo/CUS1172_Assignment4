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
    else if(numQueries == 2){
        console.log("combined query");

        let queryName = nameQ;
        let queryLevel = levelQ;
        let queryTitle = titleQ;
        let queryCode = codeQ;
        
        api =``;

        if(queryName.length > 0 && queryLevel.length > 0) {
            console.log("NAME & LEVEL");
            queryName = "n" + nameQ;
            queryLevel = "l" + levelQ;
            api = `http://localhost:3000/api/combined_query/${queryName}/${queryLevel}`;
        }
        else if(queryName.length > 0 && queryCode.length > 0) {
            console.log("NAME & CODE");
            queryName = "n" + nameQ;
            queryCode = "c" + codeQ;
            api = `http://localhost:3000/api/combined_query/${queryName}/${queryCode}`;
        }
        else if(queryName.length > 0 && queryTitle.length > 0) {
            console.log("NAME & TITLE");
            queryName = "n" + nameQ;
            queryTitle = "t" + titleQ;
            api = `http://localhost:3000/api/combined_query/${queryName}/${queryTitle}`;
        }
        else if(queryCode.length > 0 && queryLevel.length > 0) {
            console.log("CODE & LEVEL");
            queryCode = "c" + codeQ;
            queryLevel = "l" + levelQ;
            api = `http://localhost:3000/api/combined_query/${queryCode}/${queryLevel}`;
        }
        else if(queryCode.length > 0 && queryTitle.length > 0) {
            console.log("CODE & TITLE");
            queryCode = "c" + codeQ;
            queryTitle = "t" + titleQ;
            api = `http://localhost:3000/api/combined_query/${queryCode}/${queryTitle}`;
        }
        else if(queryLevel.length > 0 && queryTitle.length > 0) {
            console.log("LEVEL & TITLE");
            queryLevel = "l" + levelQ;
            queryTitle = "t" + titleQ;
            api = `http://localhost:3000/api/combined_query/${queryLevel}/${queryTitle}`;
        }

        const data = await fetch(api);
        const model = await data.json();
        renderView(model);
    }
    else{
        if(nameQ.length > 0){
            console.log("name query");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = nameQ;
                api = `http://localhost:3000/api/by_instructor/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        } 

        if(codeQ.length > 0){
            console.log("code query");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = codeQ;
                api = `http://localhost:3000/api/by_course_code/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        }

        if(levelQ.length > 0){
            console.log("level query");
            //if(button.dataset.querytype == 'by_name'){
                let queryValue = levelQ;
                api = `http://localhost:3000/api/by_level/${queryValue}`;
        
                const data = await fetch(api);
                const model = await data.json();
                renderView(model);
            //}
        }

        if(titleQ.length > 0){
            console.log("title query");
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


var clearFields = () => {
    document.querySelector("#nameQuery").value = "";
    document.querySelector("#codeQuery").value = "";
    document.querySelector("#levelQuery").value = "";
    document.querySelector("#titleQuery").value = "";
}