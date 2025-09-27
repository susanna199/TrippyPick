document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const addGrid = document.querySelector('.add-grid');

    // --- Handle ADDING a package using EVENT DELEGATION ---
    // This single listener on the parent handles clicks for any "+ Add" button,
    // even ones created dynamically by the search.
    if (addGrid) {
        addGrid.addEventListener('click', function(event) {
            if (event.target && event.target.matches('.btn-add')) {
                event.preventDefault();
                const button = event.target;
                const packageIdToAdd = button.dataset.packageIdAdd;
                const existingIds = params.get('ids') ? params.get('ids').split(',') : [];

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
            }
        });
    }

    // --- Handle REMOVING a package ---
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const packageIdToRemove = button.dataset.packageIdRemove;
            const existingIds = params.get('ids') ? params.get('ids').split(',') : [];
            const newIds = existingIds.filter(id => id !== packageIdToRemove);

            if (newIds.length > 0) {
                params.set('ids', newIds.join(','));
            } else {
                params.delete('ids');
            }
            window.location.href = `${currentUrl.pathname}?${params.toString()}`;
        });
    });

    // --- Handle DYNAMIC SEARCH filtering ---
    const searchInput = document.querySelector('.search-bar input');
    let debounceTimeout;

    // A helper function to create the HTML for a single package card
    function createPackageCardHTML(pkg) {
        const priceHTML = pkg.cost_per_package ? `<strong>₹${parseInt(pkg.cost_per_package).toLocaleString()}</strong>` : '';
        const imageHTML = pkg.destination_img ? `<img src="/static/${pkg.destination_img.replace('static/', '')}" alt="${pkg.package_name}">` : '<span>🖼️</span>';

        return `
            <div class="add-card">
                <div class="add-card-image">${imageHTML}</div>
                <div class="add-card-info">
                    <h4>${pkg.package_name}</h4>
                    <p>${pkg.destination}</p>
                    <div class="add-card-price">${priceHTML}</div>
                </div>
                <button class="btn-add" data-package-id-add="${pkg.package_id}">+ Add</button>
            </div>
        `;
    }

    if (searchInput && addGrid) {
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimeout);
            const searchTerm = this.value.toLowerCase().trim();

            // Use a debounce to prevent sending a request on every keystroke
            debounceTimeout = setTimeout(() => {
                if (searchTerm.length < 2) {
                    // Don't search if the query is too short
                    return;
                }

                const excludeIds = params.get('ids') || '';

                // Fetch search results from the new API endpoint
                fetch(`/api/search_packages?q=${searchTerm}&exclude_ids=${excludeIds}`)
                    .then(response => response.json())
                    .then(data => {
                        addGrid.innerHTML = ''; // Clear current results
                        if (data && data.length > 0) {
                            data.forEach(pkg => {
                                addGrid.innerHTML += createPackageCardHTML(pkg);
                            });
                        } else {
                            addGrid.innerHTML = '<p>No packages found matching your search.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching search results:', error);
                        addGrid.innerHTML = '<p>Error searching for packages.</p>';
                    });

            }, 300); // 300ms delay
        });
    }
});
