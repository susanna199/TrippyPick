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

            // Check if the package is already being compared
            if (existingIds.includes(packageIdToAdd)) {
                alert('This package is already in the comparison.');
                return;
            }

            // Check if there is space to add a new package
            if (existingIds.length >= 3) {
                alert('You can only compare up to 3 packages. Please remove one first.');
                return;
            }

            // Add the new ID and reload the page
            const newIds = [...existingIds, packageIdToAdd];
            params.set('ids', newIds.join(','));
            // CORRECTED LINE
            window.location.href = `${currentUrl.pathname}?${params.toString()}`;
        });
    });

    // --- Handle REMOVING a package ---
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const packageIdToRemove = button.dataset.packageIdRemove;

            // Filter out the ID to be removed
            const newIds = existingIds.filter(id => id !== packageIdToRemove);

            // Update the URL parameter
            if (newIds.length > 0) {
                params.set('ids', newIds.join(','));
            } else {
                // If no IDs are left, remove the parameter entirely
                params.delete('ids');
            }
            
            // Reload the page with the updated URL
            // CORRECTED LINE
            window.location.href = `${currentUrl.pathname}?${params.toString()}`;
        });
    });
});