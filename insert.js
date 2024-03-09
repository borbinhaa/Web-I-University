const VALUE = 'items';

function addValueOnLocalStorage(data) {
    const localStorageItem = localStorage.getItem(VALUE);

    if (localStorageItem == null) {
        localStorage.setItem(VALUE, '[]');
    }

    const list = JSON.parse(localStorage.getItem(VALUE));
    list.push(data);

    localStorage.setItem(VALUE, JSON.stringify(list));
} 

$(function () {
  $('#insert-form-button').click(() => {
    const name = $('#name').val();
    const salary = $('#salary').val();
    const age = $('#age').val();

    if (name.trim() === '' || salary.trim() === '' || age.trim() === '') {
        $('#final-message').text('Todos os campos do formulário precisam estar preenchidos.');
        return;
    }
    
    if (salary < 0) {
        $('#final-message').text('Salário precisa ser maior ou igual a 0.');
        return;
    }

    if (age < 1 || age > 150) {
        $('#final-message').text('Idade tem que ser maior que 0 e menor que 150.');
        return;
    }

    $.post('https://dummy.restapiexample.com/api/v1/create', { name, salary, age }, function(response) {
        addValueOnLocalStorage(response.data);
        $('#final-message').text('Valor inserido com sucesso.');
        window.location.href = "index.html";
    }, 'json')
    .fail(function(xhr, status, error) {
        $('#final-message').text('Erro ao inserir valor, favor tente novamente.');
    });
  });
});

