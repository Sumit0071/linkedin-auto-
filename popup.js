document.getElementById( 'start' ).addEventListener( 'click', function () {
    let company = document.getElementById( 'company' ).value;
    let designation = document.getElementById( 'designation' ).value;
    let message = document.getElementById( 'message' ).value;

    chrome.storage.local.set( { company, designation, message }, function () {
        console.log( 'Settings saved' );
    } );

    // Open LinkedIn search results in a new tab
    chrome.tabs.create( { url: 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent( company + ' ' + designation ) }, function ( tab ) {
        chrome.tabs.onUpdated.addListener( function ( tabId, changeInfo, tab ) {
            if ( tabId === tab.id && changeInfo.status === 'complete' ) {
                // Inject content script once the tab is fully loaded
                chrome.scripting.executeScript( {
                    target: { tabId: tab.id },
                    files: ['content.js']
                } );
            }
        } );
    } );
} );
