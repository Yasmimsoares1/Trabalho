document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    // Carregar itens do localStorage
    loadItems();

    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            addItem(itemText);
            itemInput.value = '';
        }
    });

    function addItem(text) {
        const li = document.createElement('li');
        li.textContent = text;

        // Botão para remover item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            itemList.removeChild(li);
            saveItems();
        });

        // Marcar item como comprado
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveItems();
        });

        li.appendChild(removeButton);
        itemList.appendChild(li);
        saveItems();
    }

    function saveItems() {
        const items = [];
        itemList.querySelectorAll('li').forEach(li => {
            items.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('items', JSON.stringify(items));
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;
            if (item.completed) {
                li.classList.add('completed');
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                itemList.removeChild(li);
                saveItems();
            });

            li.appendChild(removeButton);
            itemList.appendChild(li);
        });
    }
});
