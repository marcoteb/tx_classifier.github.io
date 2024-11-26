document.getElementById('classifyBtn').addEventListener('click', function() {
  const transactionHash = document.getElementById('transactionHash').value.trim();
  const resultDiv = document.getElementById('result');
  const classificationP = document.getElementById('classification');
  const transactionDetailsDiv = document.getElementById('transactionDetails');
  const errorDiv = document.getElementById('error');
  const loadingDiv = document.getElementById('loading');

  resultDiv.style.display = 'none';
  errorDiv.style.display = 'none';
  transactionDetailsDiv.innerHTML = '';

  if (!transactionHash) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Por favor, ingresa un hash de transacción.';
    return;
  }

  if (!/^0x([A-Fa-f0-9]{64})$/.test(transactionHash)) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Por favor, ingresa un hash de transacción válido.';
    return;
  }

  loadingDiv.style.display = 'block';

  fetch('https://3ad6-35-232-232-66.ngrok-free.app/classify_transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ transaction_hash: transactionHash })
  })
  .then(response => response.json())
  .then(data => {
    loadingDiv.style.display = 'none';

    if (data.error) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = data.error;
    } else {
      classificationP.textContent = data.classification;
      resultDiv.style.display = 'block';

      // Mostrar detalles adicionales si tu API los proporciona
      // Por ejemplo:
      // if (data.from_address) {
      //   transactionDetailsDiv.innerHTML += `<p><strong>De:</strong> ${data.from_address}</p>`;
      // }
      // if (data.to_address) {
      //   transactionDetailsDiv.innerHTML += `<p><strong>Para:</strong> ${data.to_address}</p>`;
      // }
      // if (data.value_in_ether) {
      //   transactionDetailsDiv.innerHTML += `<p><strong>Valor:</strong> ${data.value_in_ether} ETH</p>`;
      // }
    }
  })
  .catch(error => {
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Error al conectar con el servidor. Por favor, intenta más tarde.';
    console.error('Error:', error);
  });
});
