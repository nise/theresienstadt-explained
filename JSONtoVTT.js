/** Convert Advene JSON tracks to VTT */
const fs = require('fs');

const fetchData = function (path) {
    return new Promise(function (res, rej) {
        fs.readFile(path, (err, data) => {
            res(data);
        });
    });
};

const parsetoVTT = new Promise((res, rej) => {
    fetchData('./ressources/identificationfocus.json').then(function (data) {
        let prodata = findData(data);
        let sample = createVTT(prodata);
        fs.writeFile('./client/src/assets/videos/infomarker/infomarker.de.vtt', sample, () => {
        });
    });
});


const findData = function (rawannodata) {
    let annodata = Object.values(JSON.parse(rawannodata))[0];
    let findName = new RegExp(/name="(\w+)"/g);
    let findX = new RegExp(/x="(\d+)"/g);
    let findY = new RegExp(/y="(\d+)"/g);

    let precue = new Object();
    let precueList = new Array();
    let name, x, y;

    for (let i = 0; i < annodata.length; i++) {
        precue = new Object();
        precue.payload = new Array();

        while (name = findName.exec(annodata[i].content)) {
            payload = new Object();
            precue.id = i;
            precue.begin = annodata[i].begin;
            precue.end = annodata[i].end;
            payload.name = name[1];


            if (x = findX.exec(annodata[i].content)) {
                payload.x = Number.parseInt(x[1]);
            }

            if (y = findY.exec(annodata[i].content)) {
                payload.y = Number.parseInt(y[1]);
            }
            precue.payload.push(payload);
            //precue.payload = payload;


        }
        precueList.push(precue);

        findName.lastIndex = 0;             // reset RegEx iterators
        findX.lastIndex = 0;
        findY.lastIndex = 0;


    }
    return precueList;
}
/**@param precueList type array */
const createVTT = function (precueList) {
    let vttString = `WEBVTT\n\n`;
    for (let i = 0; i < precueList.length; i++) {
        vttString += createCue(precueList[i]) + "\n";
    }
    return vttString;
};

const createCue = function (precue) {
    let id = precue.id;
    let begin = time(precue.begin);
    let end = time(precue.end);
    let cue = `${id}\n${begin} --> ${end}\n`;

    for (let i = 0; i < precue.payload.length; i++) {
        cue += JSON.stringify(precue.payload[i]) + "\n";
    }
    return cue;
};

/**
 * Convert milliseconds to time string (hh:mm:ss:mss).
 *
 * @param Number ms
 *
 * @return String
 */
function time(ms) {
    return new Date(ms).toISOString().slice(11, -1);
}

module.exports = parsetoVTT;

