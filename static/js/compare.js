document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const existingIds = params.get('ids') ? params.get('ids').split(',') : [];

    // --- Handle ADDING a package ---
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const packageIdToAdd = button.dataset.packageIdAdd;

            if (existingIds.includes(packageIdToAdd)) {
                alert('This package is already in the comparison.');
                return;
            }

            if (existingIds.length >= 3) {
                alert('You can only compare up to 3 packages. Please remove one first.');
                return;
            }

            const newIds = [...existingIds, packageIdToAdd];
            params.set('ids', newIds.join(','));
            window.location.href = `${currentUrl.pathname}?${params.toString()}`;
        });
    });

    // --- Handle REMOVING a package ---
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const packageIdToRemove = button.dataset.packageIdRemove;

            const newIds = existingIds.filter(id => id !== packageIdToRemove);

            if (newIds.length > 0) {
                params.set('ids', newIds.join(','));
            } else {
                params.delete('ids');
            }
            
            window.location.href = `${currentUrl.pathname}?${params.toString()}`;
        });
    });

    // --- NEW: Handle SEARCH filtering ---
    const searchInput = document.querySelector('.search-bar input');
    const packageCards = document.querySelectorAll('.add-grid .add-card');

    if (searchInput && packageCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            packageCards.forEach(card => {
                const titleElement = card.querySelector('h4');
                const locationElement = card.querySelector('p');

                const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                const location = locationElement ? locationElement.textContent.toLowerCase() : '';

                // Show the card if the search term is found in the title or location
                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
