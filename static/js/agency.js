document.addEventListener('DOMContentLoaded', function() {
    // Find all the tab buttons and content panes
    const tabLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    const tabPanes = document.querySelectorAll('.tab-content .tab-pane');

    // This function handles the logic of switching tabs
    function switchTab(tabButton) {
        if (!tabButton) return; // Exit if the button doesn't exist

        // Get the ID of the content pane to show from the button's data attribute
        const targetPaneId = tabButton.getAttribute('data-bs-target');
        
        // Deactivate all tab buttons
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Deactivate all content panes
        tabPanes.forEach(pane => {
            pane.classList.remove('show', 'active');
        });

        // Activate the clicked tab button
        tabButton.classList.add('active');

        // Activate the corresponding content pane
        const targetPane = document.querySelector(targetPaneId);
        if (targetPane) {
            targetPane.classList.add('show', 'active');
        }
    }

    // Add a click listener to each tab button for manual switching
    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            switchTab(this);
        });
    });

    // --- NEW, ROBUST METHOD ---
    // Read the submission status from a data attribute on the main container
    const container = document.querySelector('.container');
    const packageSubmitted = container.dataset.packageSubmitted === 'True';

    if (packageSubmitted) {
        const addPackageTabButton = document.getElementById('add-package-tab');
        // Programmatically switch to the "Add Package" tab on page load
        switchTab(addPackageTabButton);
    }
});
