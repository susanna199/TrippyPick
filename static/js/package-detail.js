document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const viewProfileButton = document.querySelector('.btn-view-profile');
    const reviewsTabLink = document.querySelector('.tab-link[data-tab="reviews"]');

    // Main tab switching logic
    function activateTab(tabId) {
        // Deactivate all links and panes
        tabLinks.forEach(item => item.classList.remove('active'));
        tabPanes.forEach(item => item.classList.remove('active'));

        // Activate the correct link and pane
        const linkToActivate = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        const paneToActivate = document.getElementById(tabId);

        if (linkToActivate) {
            linkToActivate.classList.add('active');
        }
        if (paneToActivate) {
            paneToActivate.classList.add('active');
        }
    }

    // Add click listeners to the main tab buttons
    if (tabLinks.length > 0 && tabPanes.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const tabId = this.dataset.tab;
                activateTab(tabId);
            });
        });
    }

    // Add click listener for the "View Profile" button
    if (viewProfileButton && reviewsTabLink) {
        viewProfileButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Activate the 'reviews' tab
            activateTab('reviews');
            // Optional: Smoothly scroll to the tabs section
            const tabsElement = document.querySelector('.content-tabs');
            if (tabsElement) {
                tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});
