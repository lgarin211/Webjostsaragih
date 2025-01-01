jQuery(function ($) {
    'use strict';
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
            ]
        });

        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://lgarin211.github.io/Webjostsaragih/garinpoin.com/music/',
            extension = '',
            tracks = [
                {
                    "track": 1,
                    "name": "Ondos Ganupan Bani Tuhan - Jost Saragih & Kevin Sijabat",
                    "duration": "4:30",
                    "file": "Ondos_Ganupan_Bani_Tuhan"
                },
                {
                    "track": 2,
                    "name": "AUT BOI NIAN - Jost Saragih FT Kevin Sijabat",
                    "duration": "5:00",
                    "file": "AUT_BOI_NIAN"
                },
                {
                    "track": 3,
                    "name": "Maru - Jost Saragih Ft Tohpati",
                    "duration": "6:00",
                    "file": "Maru"
                },
                {
                    "track": 4,
                    "name": "Bai Ganupan Sidalananmu In - Jost Saragih FT Chrisfany Pasaribu",
                    "duration": "4:30",
                    "file": "Bai_Ganupan_Sidalananmu_In"
                },
                {
                    "track": 5,
                    "name": "Nothing's Gonna Change My Love For You - Jost Saragih Sax",
                    "duration": "3:30",
                    "file": "Nothings_Gonna_Change_My_Love_For_You"
                },
                {
                    "track": 6,
                    "name": "Masihol Au Inong - Jost Saragih feat Eed Kribo",
                    "duration": "3:12",
                    "file": "Masihol_Au_Inong"
                },
                {
                    "track": 7,
                    "name": "Borit Do Tongon - Jost Saragih feat Stella Sinaga",
                    "duration": "3:45",
                    "file": "Borit_Do_Tongon"
                },
                {
                    "track": 8,
                    "name": "Bai Ganupan Sidalananmu In - Jost Saragih feat Chrisfany Pasaribu",
                    "duration": "4:00",
                    "file": "Bai_Ganupan_Sidalananmu_In"
                },
                {
                    "track": 9,
                    "name": "Ho do Tuhan - Dorman Manik, arranged by Jost Dklar Saragih",
                    "duration": "5:30",
                    "file": "Ho_do_Tuhan"
                }
            ];

        var buildPlaylist = $.each(tracks, function(key, value) {
            var trackNumber = value.track,
                trackName = value.name,
                trackDuration = value.duration;
            if (trackNumber.toString().length === 1) {
                trackNumber = '0' + trackNumber;
            }
            $('#plList').append('<li> \
                <div class="plItem"> \
                    <span class="plNum">' + trackNumber + '.</span> \
                    <span class="plTitle">' + trackName + '</span> \
                    <span class="plLength">' + trackDuration + '</span> \
                </div> \
            </li>');
        });

        var trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };

        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index); // Load the first track

        // Add a 3-second delay before starting the music
        setTimeout(function() {
            audio.play(); // Play the first track after a 3-second delay
        }, 5000); // 3000 milliseconds = 3 seconds
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
