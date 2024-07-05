chrome.storage.local.get( ['company', 'designation', 'message'], function ( items ) {
    let message = items.message;
    console.log( 'Retrieved from storage:', items );

    function sendConnectionRequest( profile ) {
        profile.click();
        console.log( 'Profile clicked:', profile );
        setTimeout( () => {
            let connectButton = document.querySelector( 'button.pv-s-profile-actions--connect' );
            console.log( 'Connect button:', connectButton );
            if ( connectButton ) {
                connectButton.click();
                setTimeout( () => {
                    let addNoteButton = document.querySelector( 'button[aria-label="Add a note"]' );
                    console.log( 'Add note button:', addNoteButton );
                    if ( addNoteButton && message ) {
                        addNoteButton.click();
                        setTimeout( () => {
                            let messageBox = document.querySelector( 'textarea[name="message"]' );
                            console.log( 'Message box:', messageBox );
                            if ( messageBox ) {
                                messageBox.value = message;
                                let sendButton = document.querySelector( 'button[aria-label="Send now"]' );
                                console.log( 'Send button:', sendButton );
                                if ( sendButton ) {
                                    sendButton.click();
                                    console.log( 'Message sent' );
                                }
                            }
                        }, 1000 );
                    } else {
                        let sendButton = document.querySelector( 'button[aria-label="Send now"]' );
                        console.log( 'Send button without note:', sendButton );
                        if ( sendButton ) {
                            sendButton.click();
                            console.log( 'Connection request sent without note' );
                        }
                    }
                }, 1000 );
            } else {
                if ( message ) {
                    let messageButton = document.querySelector( 'button[aria-label="Message"]' );
                    console.log( 'Message button:', messageButton );
                    if ( messageButton ) {
                        messageButton.click();
                        setTimeout( () => {
                            let messageBox = document.querySelector( 'textarea' );
                            console.log( 'Message box for direct message:', messageBox );
                            if ( messageBox ) {
                                messageBox.value = message;
                                let sendButton = document.querySelector( 'button[aria-label="Send now"]' );
                                console.log( 'Send button for direct message:', sendButton );
                                if ( sendButton ) {
                                    sendButton.click();
                                    console.log( 'Direct message sent' );
                                }
                            }
                        }, 1000 );
                    }
                }
            }
        }, 2000 );
    }

    function waitForProfilesAndSendRequests() {
        let profiles = document.querySelectorAll( 'a.search-result__result-link' );
        console.log( 'Profiles found:', profiles );

        if ( profiles.length === 0 ) {
            // Retry if profiles are not loaded yet
            setTimeout( waitForProfilesAndSendRequests, 1000 );
            return;
        }

        profiles.forEach( ( profile, index ) => {
            setTimeout( () => {
                sendConnectionRequest( profile );
            }, index * 5000 ); // Adjust the delay as needed
        } );
    }

    // Initial call to start the process
    waitForProfilesAndSendRequests();
} );
