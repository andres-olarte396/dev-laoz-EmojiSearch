document.addEventListener('DOMContentLoaded', function () {
  const emojiSearch = document.getElementById('emojiSearch')
  const emojiResults = document.getElementById('emojiResults')

  // Cargar los emojis desde el archivo JSON
  fetch('emojis.json')
    .then(response => response.json())
    .then(data => {
      // Evento para capturar la búsqueda en tiempo real
      emojiSearch.addEventListener('input', function () {
        const query = emojiSearch.value.toLowerCase()

        // Filtrar los emojis que coincidan con la búsqueda
        const filteredEmojis = data.filter(
          emoji =>
            emoji.description && emoji.description.toLowerCase().includes(query)
        )

        // Limpiar los resultados anteriores
        emojiResults.innerHTML = ''

        // Mostrar los resultados filtrados en tarjetas
        if (filteredEmojis.length > 0) {
          filteredEmojis.forEach(emoji => {
            const card = document.createElement('div')
            card.classList.add('emoji-card')

            card.innerHTML = `<div class="card-name">${emoji.id}</div>
                            <div class="card-code">${emoji.code}</div>
                            <div class="emoji">${emoji.emoji}</div>
                            <div class="card-description">${emoji.description}</div>`
            emojiResults.appendChild(card)
          })
        } else {
          emojiResults.innerHTML = '<p>No se encontraron emojis.</p>'
        }
      })
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error)
    })
})
