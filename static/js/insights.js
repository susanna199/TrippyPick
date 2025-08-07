document.addEventListener('DOMContentLoaded', function() {
    // Select tab links and panes specific to the insights page
    const tabLinks = document.querySelectorAll('#insights-page .insights-tabs .tab-link');
    const tabPanes = document.querySelectorAll('#insights-page .tab-pane');

    // Exit if the necessary elements aren't on the page
    if (tabLinks.length === 0 || tabPanes.length === 0) {
        return;
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const tabId = this.dataset.tab;

            // Deactivate all links and panes
            tabLinks.forEach(item => item.classList.remove('active'));
            tabPanes.forEach(item => item.classList.remove('active'));

            // Activate the clicked link and its corresponding pane
            this.classList.add('active');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
});
