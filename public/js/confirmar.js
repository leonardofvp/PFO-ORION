function confirmarAccion(mensaje, urlDestino, metodo = 'DELETE') {
  Swal.fire({
    title: '¿Confirmar acción?',
    text: mensaje,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${urlDestino}?_method=${metodo}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}