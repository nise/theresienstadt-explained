var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 
const Scenes = new Schema({
    title: String,
    number: Number,
    source: String, // Source at German Fedaral Archive
    status: String,
    description: String,
    protagonists: Array,
    locations: String,
    user_id: String,
    length: String,
    start: Number,
    music: String,
    images: Array,
    updated_at: Date
});
mongoose.model('Scenes', Scenes);


//
var Persons = new Schema({
    shortname: String,
    name: String,
    surename: String,
    birth: String,
    death: String,
    birth_place: String,
    death_place: String,
    profession: String,
    bio: String,
    images: Array,
    updated_at: Date
});
mongoose.model('Persons', Persons);


var VideoMetadata = new Schema({
    author: String,
    institution: String,
    title: String,
    category: String,
    abstract: String,
    length: String,
    date: String,
    weight: Number,
    source: String
});
//mongoose.model( 'VideoMetadata', VideoMetadata );


//
var Videos = new Schema({
    video: String,
    id: String,
    metadata: [{
        author: String,
        institution: String,
        title: String,
        category: String,
        tags: Array,
        abstract: String,
        length: String,
        date: String,
        weight: Number,
        thumbnail: String,
        source: String
    }],
    links: [],
    toc: [{
        label: String,
        number: Number,
        start: Number,
        _comment: String,
        date: String,
        note: String
    }],
    tags: [Schema.Types.Mixed],
    highlight: [Schema.Types.Mixed],
    slides: [Schema.Types.Mixed],
    comments: [Schema.Types.Mixed],
    assessmentfillin: [Schema.Types.Mixed],
    assessmentwriting: [Schema.Types.Mixed],
    progress: String,
    updated_at: Date
});
mongoose.model('Videos', Videos);


// 
var Images = new Schema({
    title: String,
    url: String,
    tags: [Schema.Types.Mixed],
    scene: String,
    updated_at: Date
});
mongoose.model('Images', Images);


// 
var Users = new Schema({
    id: Number,
    username: String,
    password: String,
    email: String,
    name: String,
    firstname: String,
    hs: String,
    role: String,
    status: {
        online: Boolean,
        location: String,
        updated_at: Date
    },
    icon: String,
    trace: Boolean,
    experimental: Boolean,
    groups: [Schema.Types.Mixed],
    updated_at: Date
});
mongoose.model('Users', Users);