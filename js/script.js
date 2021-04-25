$(document).ready(function () {
    let recognition;
    if ('speechSynthesis' in window) {
        // new speech recognition object
        const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        // Recognition start event handler
        recognition.onstart = () => {
            // Show alert
            $("#alert-placeholder").html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Voice recognition started. Try speaking into the microphone.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `);
            console.log('Voice recognition started. Try speaking into the microphone.');
            // Add animation
            $('main').addClass('speaking');
        }
        recognition.onresult = function (event) {
            // Get the text spoken
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
            recognition.stop();
            $('#stop-listening').prop('disabled', true);
            $('#start-listening').prop('disabled', true);
            $('main').removeClass('speaking');
            // Delay required before starting to listen again
            setTimeout(function () {
                $('#start-listening').prop('disabled', false);
            }, 400);
            $('#output').empty();
            $("#alert-placeholder").empty();
            $('#output').html(`<h1 class="display-4">${transcript}</h1>`);
            transcript.split(' ').forEach(element => {
                let html = `
                    <div class="row">
                        <h1>${element}</h1>
                `;
                $('#output').append('');
                for (let i = 0; i < element.length; i++) {
                    const character = element.charAt(i);
                    let image;
                    if (character.toLowerCase() != character.toUpperCase()) {
                        image = `<img src="Alphabets/${character.toLowerCase()}.png" alt="${character}">`
                    } else {
                        image = `<img src="Alphabets/default.png" alt="${character}">`
                    }
                    html += '<div class="col-md-2">' + image + '</div>';
                }
                html += '</div>';
                $('#output').append(html);
            });

        };

    } else {
        console.log('Speech recognition not supported 😢');
        alert('Speech recognition not supported 😢');
        $('#start-listening').prop('disabled', true);
    }
    $('#stop-listening').prop('disabled', true);
    $('#start-listening').click(function () {
        // start recognition
        recognition.start();
        $('#stop-listening').prop('disabled', false);
    });
    $('#stop-listening').click(function () {
        // stop recognition
        recognition.stop();
        $('main').removeClass('speaking');
        $('#stop-listening').prop('disabled', true);
        $("#alert-placeholder").empty();
        $("#alert-placeholder").html(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                No words detected. Please try again.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
    });
});