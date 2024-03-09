const VALUE = 'items';

const getPageParameter = () => {
    let parameter = window.location.search.replace('?page=', '');
    return parameter === '' ? 1 : parameter;
}

const createTable = (list, parameter) => {
    let tableList = list.slice((parameter * 10) - 10, parameter * 10)
    if (tableList.length < 1) {
        $('#message').text('Pagina inválida.');
        return;
    }
    

    let table = $("<table></table>").addClass("table", "caption-top");
    addCaption(table);
    addThead(table);
    addTbody(table, tableList);

    $("#main-content").append(table);

    if (list.length > 10) {
        let pagination = createPagination(list, parameter);
        $("#main-content").append(pagination);
    }
}

const addTbody = (table, tableList) => {
    let tbody = $("<tbody></tbody>");

    tableList.forEach((person) => {
        let row = $("<tr></tr>");
        row.append(`<td class=\"justify-content-end\">${person.id}</td>`);
        row.append(`<td>${person.name}</td>`);
        row.append(`<td>${person.salary}</td>`);
        row.append(`<td>${person.age}</td>`);
        tbody.append(row);
    });
    
    table.append(tbody);
}

const addThead = (table) => {
    let thead = $("<thead></thead>");
    let headerRow = $("<tr></tr>");
    headerRow.append("<th scope=\"col\">Id</th>");
    headerRow.append("<th scope=\"col\">Nome</th>");
    headerRow.append("<th scope=\"col\">Salário</th>");
    headerRow.append("<th scope=\"col\">Idade</th>");
    thead.append(headerRow);
    table.append(thead);
}

const addCaption = (table) => {
    let caption = $("<caption class=\"caption-top\">Lista de pessoas</caption>");
    table.append(caption);
}

const createPagination = (list, parameter) => {
    let navbar = $("<navbar></navbar>");
    let ul = $("<ul class=\"pagination justify-content-end\"></ul>");
    let lastPage = Math.ceil(list.length / 10);

    if (list.length <= 50) {
        for (let index = 1; index < lastPage + 1; index++) {
            let listItem = createListItem(index, index == parameter, false);
            ul.append(listItem);
        } 
    } else {
        let listItem1;
        let listItem2;
        let listItem3;
        let listItem4;
        let listItem5;

        parameter = parseInt(parameter);

        if (parameter === 1) {
            listItem1 = createListItem(1, true, false);
            listItem2 = createListItem(2, false, false);
            listItem3 = createListItem(3, false, false);
            listItem4 = createListItem('...', false, true);
            listItem5 = createListItem(lastPage, false, false);
        } else if (parameter === lastPage) {
            listItem1 = createListItem(1, false, false);
            listItem2 = createListItem('...', false, true);
            listItem3 = createListItem(parameter - 2, false, false);
            listItem4 = createListItem(parameter - 1, false, false);
            listItem5 = createListItem(lastPage, true, false);
        } else if (parameter == lastPage - 1) {
            listItem1 = createListItem(1, false, false);
            listItem2 = createListItem('...', false, true);
            listItem3 = createListItem(parameter - 1, false, false);
            listItem4 = createListItem(parameter, true, false);
            listItem5 = createListItem(lastPage, false, false);
        } else {
            listItem1 = createListItem(parameter - 1, false, false);
            listItem2 = createListItem(parameter, true, false);
            listItem3 = createListItem(parameter + 1, false, false);
            listItem4 = createListItem('...', false, true);
            listItem5 = createListItem(lastPage, false, false);
        }

        ul.append(listItem1)
        ul.append(listItem2)
        ul.append(listItem3)
        ul.append(listItem4)
        ul.append(listItem5)
    }

    navbar.append(ul);
    return navbar;
}

const createListItem = (index, isCurrentPage, isDisabled) => {
    let listItem = $("<li></li>").addClass("page-item");
    let link = $("<a></a>").addClass('page-link').attr('href', `index.html?page=${index}`).text(index);

    if (isCurrentPage) {
        listItem.addClass("active");
    }
    
    if (isDisabled) {
        listItem.addClass("disabled");
    }

    listItem.append(link);
    return listItem;
}

$(function () {
    let list = JSON.parse(localStorage.getItem(VALUE));
    
    if (list == null || list.length == 0) {
        $('#message').text('Você não possui nenhuma pessoa cadastrada.');
        return;
    }
    
    let parameter = getPageParameter();
    createTable(list, parameter)
    // $.get('https://dummy.restapiexample.com/api/v1/employees', function(response) {
    // }, 'json')
    // .fail(function(xhr, status, error) {
    //     $('#message').text('Erro ao buscar os dados, favor tente novamente.');
    // });
});