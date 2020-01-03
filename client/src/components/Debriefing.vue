<template>
    <div class="container">
        <!-- Anzeige eines Fehlers, falls vorhanden -->
        <div class="alert alert-danger" role="alert" v-if="error">
            Fehler: {{this.error}}
        </div>
        <h1>Schlussbesprechung</h1>
        <p>Unten sind die Veränderungen der Markierungen von der Individualanalyse zur Gruppenanalyse dargestellt. Diese sollten in der Klasse besprochen werden. Beim Schweben über den Daten der Grafik erscheint ein Fenster. Über dieses Fenster kann zur jeweiligen Stelle im Video gesprungen werden.</p>
        <hr>
        <!-- Videoplayer oberes Ende der Seite -->
        <div class="row">
            <div class="video col-md-12 d-flex justify-content-center">
                <video-player ref="videoPlayer" :options="videoOptions"/>
            </div>
        </div>
        <!-- Chart mit Darstellung Markierungen im Zeitverlauf für Gruppen- und Individualanalyse -->
        <div class="row">
            <div class="chart col-md-12">
                <highcharts :options="chartOptions" ref="heatmap"></highcharts>
            </div>
        </div>
    </div>
</template>

<script>
//Vuex Import
import { mapState } from 'vuex';
//Videojs Import
import VideoPlayer from "./VideoPlayer.vue";
//Annotation Service Import
import AnnotationService from '../../AnnotationService';

export default {
    name: "Debriefing",
    components: {
		VideoPlayer
    },
    data() {
        return {
            annotations: null,
            error: null,
            heatmap: null,
            videoPlayer: null,
            heatmap: null,
            //Optionen für Heatmap
            chartOptions: {
                chart: {
                    //Typ des Charts festlegen
                    type: 'heatmap'
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                //Helper, um auf this Objekt zuzugreifen fürs Springen zur Zeit im Video
                                helper: {
                                    functionHelper: this.jumpToTimeInVideo
                                },
                                //ausgelöst, wenn Datensatz angeklickt wird
                                click() {
                                    //bei Klick auf Datenpunkt zur Stelle im Video springen
                                    //Umrechnen X zu Zeitpunkt im Video -> geteilt durch 1000, weil this.x in Milisekunden
                                    var timeToJump = this.x/1000;
                                    this.events.helper.functionHelper(timeToJump);
                                }
                            }
                        }
                    }
                },
                xAxis: {
                    title: 'Videolaufzeit',
                    //Typ datetime zur Darstellung in MM:SS
                    type: 'datetime',
                    //Anzeige in MM:SS und ohne Jahr, etc.
                    dateTimeLabelFormats: {
						year:  '%M:%S',
						month:  '%M:%S',
                        day: '%M:%S'
                    },           
                },
                yAxis: {
                    //Kategorien Gruppen- und Individualanalyse -> Individualanalyse ist y = 0 und Gruppenanalyse y = 1
                    categories: ['Individualanalyse', 'Gruppenanalyse'],
                    title: null,
                    //Darstellung Individualanalyse oben statt unten
                    reversed: true
                },
                colorAxis: {
                    //Festlegen der Farben der Farbachse
                    min: 0,
                    minColor: '#DFF3F9',
                    maxColor: '#5bc0de'
                },
                series: [{
                    //Anzeige in Minuten = 1/3600 eines Tages = 36e5
                    colsize: (1/3600)*36e5,
                    name: 'Anzahl der Markierungen',
                    //Daten werden in der Funktion befüllt
                    data: [],
                }],
                subtitle: {
                    text: 'Markierungen im Zeitverlauf mm:ss in Individual- oder Gruppenanalyse',
                    align: 'left',
                    x: 40
                },
                tooltip: {
                    //Nutzung von HTML in Tooltip für erweiterte Darstellungsunktionen
                    useHTML: true,
                    formatter: function () {
                        //"Umrechnen" der Zeit in Milisekunden zur Anzeige in (HH:)MM:SS
                        var hours   = Math.floor((this.point.x/1000) / 3600);
                        var minutes = Math.floor(((this.point.x/1000) - (hours * 3600)) / 60);
                        var seconds = (this.point.x/1000) - (hours * 3600) - (minutes * 60);
                        var timeInMMSS;
                        if (hours   < 10) {hours   = "0"+hours;}
                        if (minutes < 10) {minutes = "0"+minutes;}
                        if (seconds < 10) {seconds = "0"+seconds;}
                        if (hours > 0) {
                            timeInMMSS = hours+':'+minutes+':'+seconds;
                        } else {
                            timeInMMSS = minutes+':'+seconds;
                        }
                        //wenn Punkt gleich 1, dann Anzeige Markierung
                        if (this.point.value === 1) {
                            return 'Zeit im Video: <b>' + timeInMMSS + '</b><br>'+ '<b>' + this.point.value +  '</b> Markierung<br>Auf Datenpunkt klicken, um zur Stelle im Video zu gelangen';
                        //wenn Punkt größer 1, dann Anzeige Markierungen
                        } else {
                            return 'Zeit im Video: <b>' + timeInMMSS + '</b><br>'+ '<b>' + this.point.value +  '</b> Markierungen<br>Auf Datenpunkt klicken, um zur Stelle im Video zu gelangen';
                        }
                    }
                }
            },
            //Optionen für video.js VideoPlayer
            videoOptions: {
                autoplay: false,
                controls: true,
                width: "480",
                controlBar: {
                    //kein Vollbild-Button
                    fullscreenToggle: false
                },
                sources: [
                    {
                        src: "/theresienstadt.mp4",
                        type: "video/mp4"
                    }
                ]
            }
        }
    },
    //Vuex Store
    computed: {
        ...mapState({
        studentId: "studentId",
        sessionId: "sessionId"
        })
    },
    mounted() {
        this.videoPlayer = this.$refs.videoPlayer.player;
    },
    async created() {
        try {
        //hole alle Markierungen der Session aus der Datenbank
        this.annotations = await AnnotationService.getAnnotationsForSession(this.sessionId);
        } catch (err) {
            this.error = err.message;
        }
        //befülle aus den Markierungen die Heatmap -> erstelle pro markierter Sekunde einen Datensatz oder erhöhe ihn für Individualanalyse oder Gruppenanalyse
        this.fillHeatmap(this.annotations);
    },
    methods: {
        //befülle Heatmap auf Basis übergebener Annotations; für jede Sekunde ein Datensatz in der Heatmap
        fillHeatmap(annotationsToFill) {
            //für jede Markierung im Array
            annotationsToFill.forEach(annotation => {
                //ermittle ob es sich um eine Markierung der Gruppenanalyse oder Individualanalyse handelt; wenn Gruppenanalyse, dann 1, sonst 0
                let groupAnalysisCheck;
                if (annotation.phase === 'Gruppenanalyse') {
                    groupAnalysisCheck = 1;
                } else {
                    groupAnalysisCheck = 0;
                }
                //für jede Sekunde pro Markierung einmal
                for (let i=annotation.annotationStartTime; i<=annotation.annotationEndTime; i++) {
                    //wenn für aktuelle Sekunde noch kein Datensatz im Array der Heatmap vorhanden ist
                    if (this.checkForDataForSecond(Date.UTC(1970,0,1, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)), this.showTimeInSeconds(i, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)))), groupAnalysisCheck) === false) {
                        //lege neuen Datensatz an und setze Wert für Anzahl Markierungen auf 1
                        //Nutzung des Standard UTC Datetime Formats, damit im Format mm:ss angezeigt
                        let newData = [Date.UTC(1970,0,1, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)), this.showTimeInSeconds(i, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)))), groupAnalysisCheck, 1]
                        this.chartOptions.series[0].data.push(newData);
                    } else { //wenn bereits Datensatz vorhanden ist
                        //ermittle Index des gesuchten Datensatzes
                        let index = this.getDataIndex(Date.UTC(1970,0,1, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)), this.showTimeInSeconds(i, this.showTimeInHours(i), this.showTimeInMinutes(i, this.showTimeInHours(i)))), groupAnalysisCheck);
                        //erhöhe Anzahl der Vorkomnisse um 1
                        let dataToIncrease = this.chartOptions.series[0].data[index];
                        this.chartOptions.series[0].data[index] = [dataToIncrease[0], dataToIncrease[1], dataToIncrease[2] + 1];
                    }
                }
            });
        },
        //gibt true zurück, wenn für die übergebene Sekunde schon ein Datensatz existiert für Gruppen- oder Individualanalyse, sonst false
        checkForDataForSecond(second, groupAnalysis) {
            //wenn nichts gefunden, dann false
            let feedback = false;
            //durchlaufe alle Arrays in Data
            this.chartOptions.series[0].data.forEach(array => {
                //wenn erster Wert = Sekunde gleich der übergebenen Sekunde, dann true
                if (array[0] === second && array[1] === groupAnalysis) {
                    feedback = true;
                }
            })
            return feedback;
        },
        //gibt Index für Element mit Suchkriterien second und groupAnalysis zurück
        getDataIndex(second, groupAnalysis) {
            let feedback;
            this.chartOptions.series[0].data.forEach(function (array, index) {
                if (array[0] === second && array[1] === groupAnalysis) {
                    feedback = index;
                }
            })
            return feedback;
        },
        //erhält Zeit in Sekunden und gibt Stunden zurück
        showTimeInHours(time) {
            var hours   = Math.floor(time / 3600);
            return hours;
        },
        //erhält Zeit in Sekunden und gibt Minuten nach Abzug Stunden zurück
        showTimeInMinutes(time, hours) {
            var minutes = Math.floor((time - (hours * 3600)) / 60);
            return minutes;
        },
        //erhält Zeit in Sekunden und gibt Sekunden nach Abzug Stunden und Minuten zurück
        showTimeInSeconds(time, hours, minutes) {
            var seconds = time - (hours * 3600) - (minutes * 60);
            return seconds;
        },
        //springt zu Stelle in Video; Übergabeparameter time ist Spielzeit in Sekunden
        jumpToTimeInVideo(time) {
            this.videoPlayer.currentTime(time);
            this.videoPlayer.play();
        }
    },
}
</script>