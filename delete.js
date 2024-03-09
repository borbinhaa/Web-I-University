const VALUE = 'items';

function removeValueOnLocalStorage(id) {
  let list = JSON.parse(localStorage.getItem(VALUE));

  if (list != null && list.length > 0) {
    const oldLength = list.length;
    list = list.filter((data) => data.id != id);
    const newLength = list.length;

    if (oldLength !== newLength) {
      localStorage.setItem(VALUE, JSON.stringify(list));
      return true;
    }
  }

  return false;
}

$(function () {
  $('#delete-form-button').click(() => {
    const deleteId = $('#delete-id').val();

    if (deleteId.trim() === '' || isNaN(deleteId)) {
      $('#final-message').text('O valor digitado precisa ser um número.');
      return;
    }

    $.ajax({
      url: `https://dummy.restapiexample.com/api/v1/delete/${deleteId}`,
      type: 'DELETE',
      success: function (response) {
        const wasRemoved = removeValueOnLocalStorage(response.data);

        if (wasRemoved) {
          $('#final-message').text('Valor removido com sucesso.');
          window.location.href = 'index.html';
        } else {
          $('#final-message').text('Valor não encontrado, favor informar um id de uma pessoa existente.');
        }
      },
      error: function (xhr, status, error) {
        $('#final-message').text('Erro ao deletar valor, favor tente novamente.');
      },
    });
  });
});
