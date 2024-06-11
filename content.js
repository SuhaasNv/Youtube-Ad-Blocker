// Content script to remove YouTube ads
(function() {
    'use strict';

    // Function to remove ads
    function removeAds() {
        // Remove video ads
        const videoAds = document.querySelectorAll('.ad-showing, .ytp-ad-overlay-container, .ytp-ad-image-overlay');
        videoAds.forEach(ad => {
            ad.style.display = 'none';
            showNotification('Ad blocked');
        });
    }

    // Function to show a notification when an ad is blocked
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'ad-block-notification';
        notification.textContent = message;

        // Create a close button for the notification
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'close-btn';
        closeButton.onclick = () => notification.remove();

        notification.appendChild(closeButton);
        document.body.appendChild(notification);

        // Show the notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Automatically remove the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Create a MutationObserver to monitor for new ads being added to the page
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeAds();
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial ad removal
    window.addEventListener('load', removeAds);
})();
